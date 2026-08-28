import type { ApiErrorPayload } from "@/types/api";

export const API_BASE_URL = (import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || "/api").replace(/\/$/, "");

export class ApiRequestError extends Error {
  status: number;
  payload: ApiErrorPayload | null;

  constructor(message: string, status: number, payload: ApiErrorPayload | null = null) {
    super(message);
    this.name = "ApiRequestError";
    this.status = status;
    this.payload = payload;
  }
}

export function getAdminToken() {
  return typeof window === "undefined" ? null : window.localStorage.getItem("adminToken");
}

export function clearAdminSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem("adminToken");
  window.localStorage.removeItem("adminProfile");
}

export async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  const isMultipart = typeof FormData !== "undefined" && init.body instanceof FormData;
  if (!isMultipart && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  if (import.meta.env.VITE_NGROK_SKIP_BROWSER_WARNING === "true") {
    headers.set("ngrok-skip-browser-warning", "1");
  }
  const token = getAdminToken();
  if (token && !headers.has("Authorization")) headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers,
  });

  const body = (await response.json().catch(() => null)) as T | ApiErrorPayload | null;
  if (!response.ok) {
    const responseMessage = body && typeof body === "object" && "message" in body ? body.message : "";
    const message = response.status === 429 ? responseMessage || "Too many requests were sent. Please wait a moment and try again." : responseMessage || "The request could not be completed.";
    if (response.status === 401 || response.status === 403) {
      clearAdminSession();
      if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("boostvertex:unauthorized"));
    }
    throw new ApiRequestError(message, response.status, body as ApiErrorPayload | null);
  }

  return body as T;
}
