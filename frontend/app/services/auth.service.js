import { apiFetch } from "@/app/lib/api";

export function loginAdmin(payload) {
  return apiFetch("/v1/auth/login", {
    method: "POST",
    body: payload,
  });
}

export function getProfile() {
  return apiFetch("/v1/auth/me", {
    method: "GET",
  });
}

export function logout() {
  return apiFetch("/v1/auth/logout", {
    method: "POST",
  });
}
