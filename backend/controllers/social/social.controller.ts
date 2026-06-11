import { RequestHandler } from "express";
import { ApiError } from "../../utils/ApiError";
import { prisma } from "../../config/prisma";
import { successResponse } from "../../utils/successResponse";

export const createSocial: RequestHandler = async (req, res) => {
  const { icon, name, url, order } = req.body;

  if (!icon || !name || !url) {
    throw new ApiError(400, "icon, name, and url are required");
  }

  const social = await prisma.social.create({
    data: { icon, name, url, order: order ? Number(order) : 0 },
  });

  successResponse(res, "Social link created successfully", 201, { social });
};

export const getSocials: RequestHandler = async (req, res) => {
  const socials = await prisma.social.findMany({
    where: { isVisible: true },
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });
  successResponse(res, "Social links retrieved successfully", 200, { socials });
};

export const getAllSocials: RequestHandler = async (req, res) => {
  const socials = await prisma.social.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });
  successResponse(res, "Social links retrieved successfully", 200, { socials });
};

export const updateSocial: RequestHandler = async (req, res) => {
  const id = Number(req.params.id);
  const { icon, name, url, order, isVisible } = req.body;

  const existing = await prisma.social.findUnique({ where: { id } });
  if (!existing) throw new ApiError(404, "Social link not found");

  const social = await prisma.social.update({
    where: { id },
    data: {
      icon: icon ?? existing.icon,
      name: name ?? existing.name,
      url: url ?? existing.url,
      order: order !== undefined ? Number(order) : existing.order,
      isVisible: isVisible !== undefined ? isVisible === "true" || isVisible === true : existing.isVisible,
    },
  });

  successResponse(res, "Social link updated successfully", 200, { social });
};

export const deleteSocial: RequestHandler = async (req, res) => {
  const id = Number(req.params.id);
  const existing = await prisma.social.findUnique({ where: { id } });
  if (!existing) throw new ApiError(404, "Social link not found");

  await prisma.social.delete({ where: { id } });
  successResponse(res, "Social link deleted successfully", 200);
};
