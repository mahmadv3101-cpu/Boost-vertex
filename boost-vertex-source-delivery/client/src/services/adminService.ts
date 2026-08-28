import { API_BASE_URL, apiRequest, getAdminToken } from "./apiClient";
import type { ApiListResponse } from "@/types/api";

export interface BackendLead {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  serviceInterest?: string;
  monthlyBudget?: string;
  message?: string;
  source?: string;
  status: string;
  isRead: boolean;
  createdAt: string;
}

export interface DashboardSummary {
  totalPublishedContent: number;
  services: { published: number; unpublished: number; total: number };
  blogs: { published: number; unpublished: number; total: number };
  caseStudies: { published: number; unpublished: number; total: number };
  testimonials: { published: number; unpublished: number; total: number };
  leads: { total: number; unread: number; byStatus: Record<string, number> };
}

export interface DashboardResponse { summary: DashboardSummary; recentLeads: BackendLead[] }

export interface LeadMutationResponse {
  message?: string;
  lead: BackendLead;
}

export interface AnalyticsResponse {
  message?: string;
  analytics?: {
    totalRequests?: number;
    averageResponseTime?: string;
    endpoints?: Array<{ endpoint: string; requestCount: number; errorCount: number; errorRate: string; averageTime: string }>;
  };
}

export type CmsResource = "services" | "industries" | "blogs" | "case-studies" | "testimonials";

export interface AdminContentRecord {
  _id?: string;
  id?: string;
  title?: string;
  name?: string;
  slug?: string;
  summary?: string;
  description?: string;
  excerpt?: string;
  content?: string;
  clientName?: string;
  industry?: string;
  service?: string;
  challenge?: string;
  solution?: string;
  category?: string;
  author?: string;
  isPublished?: boolean;
  status?: string;
  updatedAt?: string;
  createdAt?: string;
}

export const adminService = {
  dashboard() {
    return apiRequest<DashboardResponse>("/admin/dashboard");
  },
  analytics() {
    return apiRequest<AnalyticsResponse>("/admin/analytics");
  },
  leads(params: Record<string, string | number | boolean | undefined> = {}) {
    const search = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => { if (value !== undefined && value !== "") search.set(key, String(value)); });
    const suffix = search.toString() ? `?${search}` : "";
    return apiRequest<ApiListResponse<BackendLead>>(`/leads${suffix}`);
  },
  updateLeadStatus(id: string, status: string) {
    return apiRequest<LeadMutationResponse>(`/leads/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) });
  },
  updateLeadReadState(id: string, isRead: boolean) {
    return apiRequest<LeadMutationResponse>(`/leads/${id}/read`, { method: "PATCH", body: JSON.stringify({ isRead }) });
  },
  async exportLeads(params: Record<string, string | number | boolean | undefined> = {}) {
    const search = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => { if (value !== undefined && value !== "") search.set(key, String(value)); });
    const headers = new Headers({ Accept: "text/csv" });
    if (import.meta.env.VITE_NGROK_SKIP_BROWSER_WARNING === "true") headers.set("ngrok-skip-browser-warning", "1");
    const token = getAdminToken();
    if (token) headers.set("Authorization", `Bearer ${token}`);
    const response = await fetch(`${API_BASE_URL}/leads/export${search.toString() ? `?${search}` : ""}`, { headers });
    if (!response.ok) {
      const body = await response.json().catch(() => null) as { message?: string } | null;
      throw new Error(body?.message || "Unable to export leads.");
    }
    const disposition = response.headers.get("Content-Disposition") || "";
    const match = disposition.match(/filename="?([^";]+)"?/i);
    return { blob: await response.blob(), filename: match?.[1] || "boost-vertex-leads.csv" };
  },
  contentList(resource: CmsResource, params: Record<string, string | number | boolean | undefined> = {}) {
    const search = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => { if (value !== undefined && value !== "") search.set(key, String(value)); });
    const suffix = search.toString() ? `?${search}` : "";
    return apiRequest<ApiListResponse<AdminContentRecord>>(`/${resource}/admin/list${suffix}`);
  },
  createContent(resource: CmsResource, payload: Record<string, unknown>) {
    return apiRequest<AdminContentRecord>(`/${resource}`, { method: "POST", body: JSON.stringify(payload) });
  },
  updateContent(resource: CmsResource, id: string, payload: Record<string, unknown>) {
    return apiRequest<AdminContentRecord>(`/${resource}/${id}`, { method: "PUT", body: JSON.stringify(payload) });
  },
  deleteContent(resource: CmsResource, id: string) {
    return apiRequest<void>(`/${resource}/${id}`, { method: "DELETE" });
  },
  updateSiteSettings(payload: Record<string, unknown>) {
    return apiRequest<Record<string, unknown>>("/site-settings", { method: "PUT", body: JSON.stringify(payload) });
  },
};
