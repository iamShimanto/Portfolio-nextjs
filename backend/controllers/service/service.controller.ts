import { RequestHandler } from "express";
import { ApiError } from "../../utils/ApiError";
import { prisma } from "../../config/prisma";
import { successResponse } from "../../utils/successResponse";

export const createService: RequestHandler = async (req, res) => {
  const { icon, title, description, order } = req.body;

  if (!icon || !title || !description) {
    throw new ApiError(400, "icon, title, and description are required");
  }

  const service = await prisma.service.create({
    data: { icon, title, description, order: order ? Number(order) : 0 },
  });

  successResponse(res, "Service created successfully", 201, { service });
};

export const getServices: RequestHandler = async (req, res) => {
  const services = await prisma.service.findMany({
    where: { isVisible: true },
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });
  successResponse(res, "Services retrieved successfully", 200, { services });
};

export const getAllServices: RequestHandler = async (req, res) => {
  const services = await prisma.service.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });
  successResponse(res, "Services retrieved successfully", 200, { services });
};

export const updateService: RequestHandler = async (req, res) => {
  const id = Number(req.params.id);
  const { icon, title, description, order, isVisible } = req.body;

  const existing = await prisma.service.findUnique({ where: { id } });
  if (!existing) throw new ApiError(404, "Service not found");

  const service = await prisma.service.update({
    where: { id },
    data: {
      icon: icon ?? existing.icon,
      title: title ?? existing.title,
      description: description ?? existing.description,
      order: order !== undefined ? Number(order) : existing.order,
      isVisible: isVisible !== undefined ? isVisible === "true" || isVisible === true : existing.isVisible,
    },
  });

  successResponse(res, "Service updated successfully", 200, { service });
};

export const deleteService: RequestHandler = async (req, res) => {
  const id = Number(req.params.id);
  const existing = await prisma.service.findUnique({ where: { id } });
  if (!existing) throw new ApiError(404, "Service not found");

  await prisma.service.delete({ where: { id } });
  successResponse(res, "Service deleted successfully", 200);
};
