import { RequestHandler } from "express";
import { ApiError } from "../../utils/ApiError";
import { prisma } from "../../config/prisma";
import { successResponse } from "../../utils/successResponse";
import { sendMail } from "../../services/sendMail";
import { env } from "../../config/envConfig";
import path from "path";
import renderTemplate from "../../utils/templateRenderer";

export const createContact: RequestHandler = async (req, res) => {
  const { name, email, message, phone } = req.body;
  if (!name || !email || !message) {
    throw new ApiError(400, "Name, email and message are required");
  }

  await prisma.contact.create({
    data: {
      name,
      email,
      message,
      phone,
    },
  });

  // Render HTML templates (premium design)
  const adminTemplatePath = path.join(
    __dirname,
    "../../templates/contact-admin.html",
  );
  const userTemplatePath = path.join(
    __dirname,
    "../../templates/contact-user.html",
  );

  const templateVars = {
    name,
    email,
    phone: phone || "N/A",
    message,
  };

  try {
    const [adminHtml, userHtml] = await Promise.all([
      renderTemplate(adminTemplatePath, templateVars),
      renderTemplate(userTemplatePath, templateVars),
    ]);

    await Promise.all([
      sendMail({
        to: env.ADMIN_EMAIL,
        subject: `New contact from ${name}`,
        html: adminHtml,
      }),
      sendMail({
        to: email,
        subject: `Thanks for contacting us, ${name}`,
        html: userHtml,
      }),
    ]);
  } catch (err) {
    // don't fail the request because email failed; log and continue
    console.error("Failed to send contact emails", err);
  }

  successResponse(res, "Contact created successfully", 201);
};

export const getContacts: RequestHandler = async (req, res) => {
  const { page = 1, limit = 10, search } = req.query;
  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);
  const searchStr = typeof search === "string" ? search : undefined;

  const whereClause =
    searchStr && searchStr.length > 0
      ? {
          OR: [
            { name: { contains: searchStr, mode: "insensitive" as const } },
            { email: { contains: searchStr, mode: "insensitive" as const } },
            { message: { contains: searchStr, mode: "insensitive" as const } },
          ],
        }
      : {};

  const [contacts, total] = await Promise.all([
    prisma.contact.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      skip: (pageNumber - 1) * limitNumber,
      take: limitNumber,
    }),
    prisma.contact.count({ where: whereClause }),
  ]);

  successResponse(res, "Contacts retrieved successfully", 200, {
    contacts,
    pagination: {
      total,
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(total / limitNumber),
    },
  });
};

export const getContactById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const contactId = Number(id);

  if (!Number.isInteger(contactId) || contactId <= 0) {
    throw new ApiError(400, "Valid contact ID is required");
  }
  const contact = await prisma.contact.findUnique({
    where: {
      id: contactId,
    },
  });
  if (!contact) {
    throw new ApiError(404, "Contact not found");
  }
  successResponse(res, "Contact retrieved successfully", 200, contact);
};

export const deleteContactById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const contactId = Number(id);
  const isExist = await prisma.contact.findUnique({
    where: {
      id: contactId,
    },
  });
  if (!isExist) {
    throw new ApiError(404, "Contact not found");
  }
  const contact = await prisma.contact.delete({
    where: {
      id: contactId,
    },
  });
  if (!contact) {
    throw new ApiError(404, "Contact not found");
  }
  successResponse(res, "Contact deleted successfully", 200, contact);
};

export const replyContact: RequestHandler = async (req, res) => {};

export const markContactAsRead: RequestHandler = async (req, res) => {};
