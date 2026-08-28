import type { ApiListResponse } from "@/types/api";
import { apiRequest } from "./apiClient";

export interface MediaRecord {
  _id: string;
  url: string;
  publicId: string;
  resourceType: "image" | "video";
  mimeType: string;
  originalName: string;
  altText?: string;
  folder: string;
  bytes?: number;
  width?: number;
  height?: number;
  format?: string;
  createdAt?: string;
}

export const mediaService = {
  list(params: Record<string, string | number | undefined> = {}) {
    const search = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== "") search.set(key, String(value));
    });
    const suffix = search.toString() ? `?${search}` : "";
    return apiRequest<ApiListResponse<MediaRecord>>(`/media/admin/list${suffix}`);
  },
  upload(file: File, metadata: { folder?: string; altText?: string } = {}) {
    const body = new FormData();
    body.append("file", file);
    if (metadata.folder?.trim()) body.append("folder", metadata.folder.trim());
    if (metadata.altText?.trim()) body.append("altText", metadata.altText.trim());
    return apiRequest<{ message?: string; media: MediaRecord }>("/media", { method: "POST", body });
  },
  remove(id: string) {
    return apiRequest<{ message?: string }>(`/media/${id}`, { method: "DELETE" });
  },
};
