import { apiRequest } from "./apiClient";

export interface LegalDocumentContent {
  _id: string;
  type: "privacy-policy" | "terms" | "cookie-policy" | "disclaimer";
  title: string;
  content: string;
  version: string;
  effectiveDate?: string | null;
  isPublished: boolean;
}

export const legalService = {
  getPublished(type: LegalDocumentContent["type"]) {
    return apiRequest<LegalDocumentContent>(`/legal/${type}`);
  },
};
