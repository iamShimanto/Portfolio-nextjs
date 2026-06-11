import { RequestHandler } from "express";
import { ApiError } from "../../utils/ApiError";
import { uploadToCloudinary, destroyFromCloudinary } from "../../services/CloudinaryService";
import { prisma } from "../../config/prisma";
import { successResponse } from "../../utils/successResponse";

export const getProfile: RequestHandler = async (req, res) => {
  const profile = await prisma.profile.findFirst();
  successResponse(res, "Profile retrieved successfully", 200, { profile });
};

export const upsertProfile: RequestHandler = async (req, res) => {
  const { name, title, bio, roles, resumeUrl } = req.body;

  if (!name || !title || !bio) {
    throw new ApiError(400, "name, title, and bio are required");
  }

  const parsedRoles: string[] =
    typeof roles === "string" ? JSON.parse(roles) : roles ?? [];

  const existing = await prisma.profile.findFirst();

  let avatarUrl = existing?.avatarUrl;

  if (req.file) {
    if (existing?.avatarUrl) {
      const publicId = existing.avatarUrl.split("/").slice(-2).join("/").split(".")[0];
      await destroyFromCloudinary(publicId).catch(() => {});
    }
    const uploaded = await uploadToCloudinary(req.file, "portfolio/profile");
    avatarUrl = uploaded.secure_url;
  }

  const profile = existing
    ? await prisma.profile.update({
        where: { id: existing.id },
        data: { name, title, bio, roles: parsedRoles, avatarUrl, resumeUrl },
      })
    : await prisma.profile.create({
        data: { name, title, bio, roles: parsedRoles, avatarUrl, resumeUrl },
      });

  successResponse(res, "Profile saved successfully", 200, { profile });
};
