import { API_BASE_URL, apiRequest, getAdminToken } from "./apiClient";
import type { ApiListResponse, ApiPagination } from "@/types/api";

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
export interface LeadMutationResponse { message?: string; lead: BackendLead }
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
  [key: string]: unknown;
}

export interface SiteSettingsRecord {
  _id?: string;
  companyName?: string;
  websiteUrl?: string;
  address?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  workingHours?: string;
  preferredContactMethod?: string;
  salesEmail?: string;
  secondaryContactMethod?: string;
  bookingUrl?: string | null;
  socialLinks?: Record<string, string>;
  seoDefaults?: Record<string, string | undefined>;
  [key: string]: unknown;
}

type AnyRecord = Record<string, unknown>;

function buildQuery(params: Record<string, string | number | boolean | undefined>) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => { if (value !== undefined && value !== "") search.set(key, String(value)); });
  return search.toString();
}

function defaultPagination(total: number, page = 1, limit = Math.max(total, 1)): ApiPagination {
  const totalPages = total === 0 ? 0 : Math.max(1, Math.ceil(total / Math.max(limit, 1)));
  return { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPrevPage: page > 1 };
}

function normalizeList<T>(response: unknown, params: Record<string, string | number | boolean | undefined> = {}): ApiListResponse<T> {
  if (Array.isArray(response)) {
    const data = response as T[];
    return { data, pagination: defaultPagination(data.length, Number(params.page || 1), Number(params.limit || data.length || 1)) };
  }
  if (response && typeof response === "object") {
    const record = response as AnyRecord;
    const data = Array.isArray(record.data) ? record.data as T[] : Array.isArray(record.items) ? record.items as T[] : [];
    const pagination = record.pagination && typeof record.pagination === "object"
      ? record.pagination as ApiPagination
      : defaultPagination(data.length, Number(params.page || 1), Number(params.limit || data.length || 1));
    return { data, pagination };
  }
  return { data: [], pagination: defaultPagination(0, Number(params.page || 1), Number(params.limit || 1)) };
}

const resourceKeys: Record<CmsResource, string[]> = {
  services: ["service", "data"],
  industries: ["industry", "data"],
  blogs: ["blog", "data"],
  "case-studies": ["caseStudy", "case-study", "data"],
  testimonials: ["testimonial", "data"],
};

function unwrapMutation(resource: CmsResource, response: unknown): AdminContentRecord {
  if (!response || typeof response !== "object") return {};
  const record = response as AnyRecord;
  for (const key of resourceKeys[resource]) {
    const value = record[key];
    if (value && typeof value === "object" && !Array.isArray(value)) return value as AdminContentRecord;
  }
  return record as AdminContentRecord;
}

export const adminService = {
  dashboard() { return apiRequest<DashboardResponse>("/admin/dashboard"); },
  analytics() { return apiRequest<AnalyticsResponse>("/admin/analytics"); },

  async leads(params: Record<string, string | number | boolean | undefined> = {}) {
    const query = buildQuery(params);
    return normalizeList<BackendLead>(await apiRequest<unknown>(`/leads${query ? `?${query}` : ""}`), params);
  },
  updateLeadStatus(id: string, status: string) {
    return apiRequest<LeadMutationResponse>(`/leads/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) });
  },
  updateLeadReadState(id: string, isRead: boolean) {
    return apiRequest<LeadMutationResponse>(`/leads/${id}/read`, { method: "PATCH", body: JSON.stringify({ isRead }) });
  },
  async exportLeads(params: Record<string, string | number | boolean | undefined> = {}) {
    const query = buildQuery(params);
    const headers = new Headers({ Accept: "text/csv" });
    if (import.meta.env.VITE_NGROK_SKIP_BROWSER_WARNING === "true") headers.set("ngrok-skip-browser-warning", "1");
    const token = getAdminToken();
    if (token) headers.set("Authorization", `Bearer ${token}`);
    const response = await fetch(`${API_BASE_URL}/leads/export${query ? `?${query}` : ""}`, { headers });
    if (!response.ok) {
      const body = await response.json().catch(() => null) as { message?: string } | null;
      throw new Error(body?.message || "Unable to export leads.");
    }
    const disposition = response.headers.get("Content-Disposition") || "";
    const match = disposition.match(/filename="?([^";]+)"?/i);
    return { blob: await response.blob(), filename: match?.[1] || "boost-vertex-leads.csv" };
  },

  async contentList(resource: CmsResource, params: Record<string, string | number | boolean | undefined> = {}) {
    const query = buildQuery(params);
    const response = await apiRequest<unknown>(`/${resource}/admin/list${query ? `?${query}` : ""}`);
    return normalizeList<AdminContentRecord>(response, params);
  },
  async createContent(resource: CmsResource, payload: Record<string, unknown>) {
    return unwrapMutation(resource, await apiRequest<unknown>(`/${resource}`, { method: "POST", body: JSON.stringify(payload) }));
  },
  async updateContent(resource: CmsResource, id: string, payload: Record<string, unknown>) {
    return unwrapMutation(resource, await apiRequest<unknown>(`/${resource}/${id}`, { method: "PUT", body: JSON.stringify(payload) }));
  },
  deleteContent(resource: CmsResource, id: string) {
    return apiRequest<unknown>(`/${resource}/${id}`, { method: "DELETE" });
  },

  siteSettings() { return apiRequest<SiteSettingsRecord>("/site-settings"); },
  async updateSiteSettings(payload: Record<string, unknown>) {
    const response = await apiRequest<unknown>("/site-settings", { method: "PUT", body: JSON.stringify(payload) });
    if (response && typeof response === "object") {
      const record = response as AnyRecord;
      if (record.settings && typeof record.settings === "object") return record.settings as SiteSettingsRecord;
      if (record.data && typeof record.data === "object") return record.data as SiteSettingsRecord;
      return record as SiteSettingsRecord;
    }
    return {} as SiteSettingsRecord;
  },
};
