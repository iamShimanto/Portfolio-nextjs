import { apiFetch } from "@/app/lib/api";

export function createContact(payload) {
  return apiFetch("/v1/contact/create", {
    method: "POST",
    body: payload,
  });
}

export function getContacts(page = 1, limit = 10, search = "") {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...(search && { search }),
  });

  return apiFetch(`/v1/contact/get?${params.toString()}`, {
    method: "GET",
  });
}

export function getContactById(id) {
  return apiFetch(`/v1/contact/get/${id}`, {
    method: "GET",
  });
}

export function deleteContact(id) {
  return apiFetch(`/v1/contact/delete/${id}`, {
    method: "DELETE",
  });
}

export function replyContact(id, message) {
  return apiFetch(`/v1/contact/reply/${id}`, {
    method: "POST",
    body: { message },
  });
}

export function markContactAsRead(id) {
  return apiFetch(`/v1/contact/mark-read/${id}`, {
    method: "POST",
  });
}
