import { RequestHandler } from "express";
import { ApiError } from "../../utils/ApiError";
import { uploadToCloudinary, destroyFromCloudinary } from "../../services/CloudinaryService";
import { prisma } from "../../config/prisma";
import { successResponse } from "../../utils/successResponse";

export const createProject: RequestHandler = async (req, res) => {
  const { title, description, liveUrl, githubUrl, order } = req.body;

  if (!title || !description) {
    throw new ApiError(400, "title and description are required");
  }
  if (!req.file) {
    throw new ApiError(400, "Project image is required");
  }

  const uploaded = await uploadToCloudinary(req.file, "portfolio/projects");

  const project = await prisma.project.create({
    data: {
      title,
      description,
      imageUrl: uploaded.secure_url,
      liveUrl: liveUrl ?? null,
      githubUrl: githubUrl ?? null,
      order: order ? Number(order) : 0,
    },
  });

  successResponse(res, "Project created successfully", 201, { project });
};

export const getProjects: RequestHandler = async (req, res) => {
  const projects = await prisma.project.findMany({
    where: { isVisible: true },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
  successResponse(res, "Projects retrieved successfully", 200, { projects });
};

export const getAllProjects: RequestHandler = async (req, res) => {
  const projects = await prisma.project.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
  successResponse(res, "Projects retrieved successfully", 200, { projects });
};

export const updateProject: RequestHandler = async (req, res) => {
  const id = Number(req.params.id);
  const { title, description, liveUrl, githubUrl, order, isVisible } = req.body;

  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing) throw new ApiError(404, "Project not found");

  let imageUrl = existing.imageUrl;
  if (req.file) {
    const publicId = existing.imageUrl.split("/").slice(-2).join("/").split(".")[0];
    await destroyFromCloudinary(publicId).catch(() => {});
    const uploaded = await uploadToCloudinary(req.file, "portfolio/projects");
    imageUrl = uploaded.secure_url;
  }

  const project = await prisma.project.update({
    where: { id },
    data: {
      title: title ?? existing.title,
      description: description ?? existing.description,
      imageUrl,
      liveUrl: liveUrl !== undefined ? liveUrl : existing.liveUrl,
      githubUrl: githubUrl !== undefined ? githubUrl : existing.githubUrl,
      order: order !== undefined ? Number(order) : existing.order,
      isVisible: isVisible !== undefined ? isVisible === "true" || isVisible === true : existing.isVisible,
    },
  });

  successResponse(res, "Project updated successfully", 200, { project });
};

export const deleteProject: RequestHandler = async (req, res) => {
  const id = Number(req.params.id);
  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing) throw new ApiError(404, "Project not found");

  const publicId = existing.imageUrl.split("/").slice(-2).join("/").split(".")[0];
  await destroyFromCloudinary(publicId).catch(() => {});

  await prisma.project.delete({ where: { id } });
  successResponse(res, "Project deleted successfully", 200);
};

export const likeProject: RequestHandler = async (req, res) => {
  const id = Number(req.params.id);
  const project = await prisma.project.update({
    where: { id },
    data: { likes: { increment: 1 } },
  });
  successResponse(res, "Project liked", 200, { likes: project.likes });
};
