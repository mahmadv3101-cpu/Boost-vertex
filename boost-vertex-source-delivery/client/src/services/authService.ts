import { apiRequest, clearAdminSession } from "./apiClient";

export interface AdminSession {
  _id: string;
  name: string;
  email: string;
  token: string;
}

export interface AdminProfile {
  _id: string;
  name: string;
  email: string;
  role?: string;
}

export const authService = {
  async login(email: string, password: string) {
    const session = await apiRequest<AdminSession>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    window.localStorage.setItem("adminToken", session.token);
    window.localStorage.setItem("adminProfile", JSON.stringify({ _id: session._id, name: session.name, email: session.email }));
    return session;
  },
  me() {
    return apiRequest<AdminProfile>("/auth/me");
  },
  forgotPassword(email: string) {
    return apiRequest<{ message?: string }>("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },
  resetPassword(token: string, password: string) {
    return apiRequest<{ message?: string }>("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ token, password }),
    });
  },
  logout() {
    clearAdminSession();
  },
};
