import { RequestHandler } from "express";
import { ApiError } from "../../utils/ApiError";
import { uploadToCloudinary } from "../../services/CloudinaryService";
import { prisma } from "../../config/prisma";
import { successResponse } from "../../utils/successResponse";

export const createTech: RequestHandler = async (req, res) => {
  const { name, description } = req.body;

  if (!name || typeof name !== "string") {
    throw new ApiError(400, "Tech name is required and must be a string");
  }
  if (!description || typeof description !== "string") {
    throw new ApiError(
      400,
      "Tech description is required and must be a string",
    );
  }

  const image = req.file;
  if (!image) {
    throw new ApiError(400, "Tech logo image is required");
  }
  const logoUrl = await uploadToCloudinary(image, "tech-logos");

  const tech = await prisma.tech.create({
    data: {
      name,
      description,
      logo: logoUrl.secure_url,
    },
  });

  successResponse(res, "Tech created successfully", 201, { tech });
};

export const getTechs: RequestHandler = async (req, res) => {
  const techs = await prisma.tech.findMany({
    orderBy: {
      createdAt: "desc",
    }
  });
  successResponse(res, "Techs retrieved successfully", 200, { techs });
};
