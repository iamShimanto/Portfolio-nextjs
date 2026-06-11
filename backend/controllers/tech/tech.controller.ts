import { RequestHandler } from "express";
import { ApiError } from "../../utils/ApiError";
import { prisma } from "../../config/prisma";
import { successResponse } from "../../utils/successResponse";

export const createTech: RequestHandler = async (req, res) => {
  const { name, description, icon, iconColor, order } = req.body;

  if (!name || typeof name !== "string") {
    throw new ApiError(400, "name is required");
  }
  if (!description || typeof description !== "string") {
    throw new ApiError(400, "description is required");
  }
  if (!icon || typeof icon !== "string") {
    throw new ApiError(400, "icon is required");
  }

  const tech = await prisma.tech.create({
    data: {
      name,
      description,
      icon,
      iconColor: iconColor ?? "#ffffff",
      order: order ? Number(order) : 0,
    },
  });

  successResponse(res, "Tech created successfully", 201, { tech });
};

export const getTechs: RequestHandler = async (req, res) => {
  const techs = await prisma.tech.findMany({
    where: { isVisible: true },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
  successResponse(res, "Techs retrieved successfully", 200, { techs });
};

export const getAllTechs: RequestHandler = async (req, res) => {
  const techs = await prisma.tech.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
  successResponse(res, "Techs retrieved successfully", 200, { techs });
};

export const updateTech: RequestHandler = async (req, res) => {
  const id = Number(req.params.id);
  const { name, description, icon, iconColor, order, isVisible } = req.body;

  const existing = await prisma.tech.findUnique({ where: { id } });
  if (!existing) throw new ApiError(404, "Tech not found");

  const tech = await prisma.tech.update({
    where: { id },
    data: {
      name: name ?? existing.name,
      description: description ?? existing.description,
      icon: icon ?? existing.icon,
      iconColor: iconColor ?? existing.iconColor,
      order: order !== undefined ? Number(order) : existing.order,
      isVisible:
        isVisible !== undefined
          ? isVisible === "true" || isVisible === true
          : existing.isVisible,
    },
  });

  successResponse(res, "Tech updated successfully", 200, { tech });
};

export const deleteTech: RequestHandler = async (req, res) => {
  const id = Number(req.params.id);
  const existing = await prisma.tech.findUnique({ where: { id } });
  if (!existing) throw new ApiError(404, "Tech not found");

  await prisma.tech.delete({ where: { id } });
  successResponse(res, "Tech deleted successfully", 200);
};
