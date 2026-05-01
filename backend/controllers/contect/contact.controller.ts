import { RequestHandler } from "express";
import { ApiError } from "../../utils/ApiError";
import { prisma } from "../../config/prisma";
import { successResponse } from "../../utils/successResponse";
import { sendMail } from "../../services/sendMail";
import {
  enqueueContactNotificationEmails,
  sendContactNotificationEmails,
} from "../../services/contactMailQueue";

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
      isRead: false,
    },
  });

  const emailPayload = {
    name,
    email,
    message,
    phone,
  };

  // Fire-and-forget: queue email in background without blocking response
  void (async () => {
    try {
      const queued = await enqueueContactNotificationEmails(emailPayload);

      if (!queued) {
        await sendContactNotificationEmails(emailPayload);
      }
    } catch (err) {
      console.error("Failed to queue contact emails", err);
    }
  })();

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

export const replyContact: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;
  const contactId = Number(id);

  if (!Number.isInteger(contactId) || contactId <= 0) {
    throw new ApiError(400, "Valid contact ID is required");
  }
  if (!message || typeof message !== "string") {
    throw new ApiError(400, "Reply message is required");
  }

  const contact = await prisma.contact.findUnique({
    where: {
      id: contactId,
    },
  });
  if (!contact) {
    throw new ApiError(404, "Contact not found");
  }

  // Update isRead status immediately
  await prisma.contact.update({
    where: { id: contactId },
    data: { isRead: true },
  });

  // Fire-and-forget: send reply email in background
  void (async () => {
    try {
      await sendMail({
        to: contact.email,
        subject: `Reply to your message`,
        text: message,
      });
    } catch (err) {
      console.error("Failed to send reply email", err);
    }
  })();

  successResponse(res, "Reply sent successfully", 200);
};

export const markContactAsRead: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const contactId = Number(id);

  if (!Number.isInteger(contactId) || contactId <= 0) {
    throw new ApiError(400, "Valid contact ID is required");
  }

  const contact = await prisma.contact.findUnique({
    where: { id: contactId },
  });

  if (!contact) {
    throw new ApiError(404, "Contact not found");
  }

  const updatedContact = await prisma.contact.update({
    where: { id: contactId },
    data: { isRead: true },
  });

  successResponse(res, "Contact marked as read successfully", 200, updatedContact);
};
