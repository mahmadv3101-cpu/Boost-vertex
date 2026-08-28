/**
 * Shared frontend contracts for the future backend/API integration.
 * Keep these payloads stable when the real service layer is connected.
 */

export interface GrowthPlanLead {
  firstName: string;
  lastName: string;
  workEmail: string;
  companyWebsite: string;
}

export interface NewsletterSubscription {
  email: string;
}

export interface ContactRequest {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  company: string;
  serviceInterest: string;
  monthlyBudget?: string;
  strategicQuery: string;
  recaptchaToken?: string;
}

export type FastTrackAction = "call" | "chat" | "book" | "inquiry";

export interface ApiEnvelope<T> {
  data: T;
  message?: string;
  requestId?: string;
}

export interface ApiPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ApiListResponse<T> {
  data: T[];
  pagination: ApiPagination;
}

export interface BackendLeadSubmission {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  serviceInterest?: string;
  monthlyBudget?: string;
  message?: string;
  source: "website";
  recaptchaToken?: string;
}

export interface BackendLeadSubmissionResponse {
  message: string;
  lead: { _id: string; name: string; email: string };
}

export interface ApiErrorPayload {
  message: string;
  code?: string;
  requestId?: string;
}
