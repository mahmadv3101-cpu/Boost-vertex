import { apiRequest, clearAdminSession } from "./apiClient";

export interface AdminSession {
  _id: string;
  name: string;
  email: string;
  token: string;
  role?: string;
}

export interface AdminProfile {
  _id: string;
  name: string;
  email: string;
  role?: string;
}

type AuthResponse = AdminSession | { token?: string; admin?: AdminProfile; user?: AdminProfile; data?: AdminProfile & { token?: string } };

function normalizeSession(response: AuthResponse): AdminSession {
  if ("_id" in response && "token" in response && typeof response.token === "string") return response as AdminSession;
  const token = "token" in response && typeof response.token === "string" ? response.token : response.data?.token;
  const profile = response.admin || response.user || response.data;
  if (!token || !profile?._id || !profile.email) throw new Error("The login response did not contain the expected admin session.");
  return { _id: profile._id, name: profile.name || "Admin User", email: profile.email, role: profile.role, token };
}

function normalizeProfile(response: AdminProfile | { admin?: AdminProfile; user?: AdminProfile; data?: AdminProfile }): AdminProfile {
  if ("_id" in response) return response as AdminProfile;
  const profile = response.admin || response.user || response.data;
  if (!profile) throw new Error("The profile response was empty.");
  return profile;
}

export const authService = {
  async login(email: string, password: string) {
    const session = normalizeSession(await apiRequest<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }));
    window.localStorage.setItem("adminToken", session.token);
    window.localStorage.setItem("adminProfile", JSON.stringify({ _id: session._id, name: session.name, email: session.email, role: session.role }));
    return session;
  },
  async me() {
    return normalizeProfile(await apiRequest<AdminProfile | { admin?: AdminProfile; user?: AdminProfile; data?: AdminProfile }>("/auth/me"));
  },
  forgotPassword(email: string) {
    return apiRequest<{ message?: string }>("/auth/forgot-password", { method: "POST", body: JSON.stringify({ email }) });
  },
  resetPassword(token: string, password: string) {
    return apiRequest<{ message?: string }>("/auth/reset-password", { method: "POST", body: JSON.stringify({ token, password }) });
  },
  logout() { clearAdminSession(); },
};
