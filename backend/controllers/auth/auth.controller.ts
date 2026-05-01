import { RequestHandler } from "express";
import { ApiError } from "../../utils/ApiError";
import { prisma } from "../../config/prisma";
import bcrypt from "bcrypt";
import { successResponse } from "../../utils/successResponse";
import { generateToken } from "../../utils/token";

export const signup: RequestHandler = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new ApiError(400, "Name, email and password are required");
  }

  const isExistingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (isExistingUser) {
    throw new ApiError(409, "User with this email already exists");
  }

  const hasheedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hasheedPassword,
    },
  });

  successResponse(res, "User created successfully", 201);
};

export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  const accessToken = generateToken(user.id);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  successResponse(res, "Login successful", 200);
};

export const logout: RequestHandler = async (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  successResponse(res, "Logout successful", 200);
};

export const getMe: RequestHandler = async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  successResponse(res, "User fetched successfully", 200, {
    id: user.id,
    name: user.name,
    email: user.email,
  });
};

export const changePassword: RequestHandler = async (req, res) => {
  const userId = req.userId;
  if (!userId) throw new ApiError(401, "Unauthorized");
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new ApiError(400, "Current password and new password are required");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const checkPassword = await bcrypt.compare(currentPassword, user.password);
  if (!checkPassword) {
    throw new ApiError(401, "Current password is incorrect");
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password: hashedNewPassword,
    },
  });

  successResponse(res, "Password changed successfully", 200);
};
