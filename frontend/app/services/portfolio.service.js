import { apiFetch } from "@/app/lib/api";

// ─── api helper for multipart/form-data (no Content-Type header) ──────────────
async function apiFormData(endpoint, method, formData) {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    credentials: "include",
    body: formData,
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.message || "Something went wrong");
  return data;
}

// ─── Profile ──────────────────────────────────────────────────────────────────
export const getProfile        = ()            => apiFetch("/v1/profile/get");
export const upsertProfile     = (fd)          => apiFormData("/v1/profile/upsert", "POST", fd);

// ─── Projects ─────────────────────────────────────────────────────────────────
export const getProjects       = ()            => apiFetch("/v1/project/get");
export const getAllProjects     = ()            => apiFetch("/v1/project/all");
export const createProject     = (fd)          => apiFormData("/v1/project/create", "POST", fd);
export const updateProject     = (id, fd)      => apiFormData(`/v1/project/update/${id}`, "PUT", fd);
export const deleteProject     = (id)          => apiFetch(`/v1/project/delete/${id}`, { method: "DELETE" });
export const likeProject       = (id)          => apiFetch(`/v1/project/like/${id}`, { method: "POST" });

// ─── Services ─────────────────────────────────────────────────────────────────
export const getServices       = ()            => apiFetch("/v1/service/get");
export const getAllServices     = ()            => apiFetch("/v1/service/all");
export const createService     = (payload)     => apiFetch("/v1/service/create", { method: "POST", body: payload });
export const updateService     = (id, payload) => apiFetch(`/v1/service/update/${id}`, { method: "PUT", body: payload });
export const deleteService     = (id)          => apiFetch(`/v1/service/delete/${id}`, { method: "DELETE" });

// ─── Tech ─────────────────────────────────────────────────────────────────────
export const getTechs          = ()            => apiFetch("/v1/tech/get");
export const getAllTechs        = ()            => apiFetch("/v1/tech/all");
export const createTech        = (payload)     => apiFetch("/v1/tech/create", { method: "POST", body: payload });
export const updateTech        = (id, payload) => apiFetch(`/v1/tech/update/${id}`, { method: "PUT", body: payload });
export const deleteTech        = (id)          => apiFetch(`/v1/tech/delete/${id}`, { method: "DELETE" });

// ─── Socials ──────────────────────────────────────────────────────────────────
export const getSocials        = ()            => apiFetch("/v1/social/get");
export const getAllSocials      = ()            => apiFetch("/v1/social/all");
export const createSocial      = (payload)     => apiFetch("/v1/social/create", { method: "POST", body: payload });
export const updateSocial      = (id, payload) => apiFetch(`/v1/social/update/${id}`, { method: "PUT", body: payload });
export const deleteSocial      = (id)          => apiFetch(`/v1/social/delete/${id}`, { method: "DELETE" });
