import type { ApiErrorPayload } from "@/types/api";

export const API_BASE_URL = (import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || "/api").replace(/\/$/, "");
const DEFAULT_TIMEOUT_MS = Number(import.meta.env.VITE_API_TIMEOUT_MS || 20000);

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

function combineSignals(external: AbortSignal | null | undefined, timeoutController: AbortController) {
  if (!external) return timeoutController.signal;
  if (external.aborted) timeoutController.abort(external.reason);
  else external.addEventListener("abort", () => timeoutController.abort(external.reason), { once: true });
  return timeoutController.signal;
}

export async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  const isMultipart = typeof FormData !== "undefined" && init.body instanceof FormData;
  if (!isMultipart && init.body !== undefined && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  headers.set("Accept", headers.get("Accept") || "application/json");

  if (import.meta.env.VITE_NGROK_SKIP_BROWSER_WARNING === "true") headers.set("ngrok-skip-browser-warning", "1");

  const token = getAdminToken();
  if (token && !headers.has("Authorization")) headers.set("Authorization", `Bearer ${token}`);

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(new DOMException("Request timed out", "TimeoutError")), DEFAULT_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers,
      signal: combineSignals(init.signal, controller),
    });
  } catch (error) {
    if (controller.signal.aborted) throw new ApiRequestError("The backend did not respond in time. Make sure the local API is running on port 5000.", 0, null);
    throw new ApiRequestError(error instanceof Error ? error.message : "Unable to reach the backend API.", 0, null);
  } finally {
    window.clearTimeout(timeout);
  }

  const contentType = response.headers.get("content-type") || "";
  let body: unknown = null;
  if (response.status !== 204 && response.status !== 205) {
    if (contentType.includes("application/json")) body = await response.json().catch(() => null);
    else body = await response.text().catch(() => null);
  }

  if (!response.ok) {
    const payload = body && typeof body === "object" ? body as ApiErrorPayload : null;
    const responseMessage = payload?.message || (typeof body === "string" ? body : "");
    const message = response.status === 429
      ? responseMessage || "Too many requests were sent. Please wait a moment and try again."
      : responseMessage || `The request could not be completed (${response.status}).`;

    if (response.status === 401 || response.status === 403) {
      clearAdminSession();
      if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("boostvertex:unauthorized"));
    }
    throw new ApiRequestError(message, response.status, payload);
  }

  return body as T;
}
