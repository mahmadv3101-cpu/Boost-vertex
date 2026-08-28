/**
 * Lead-capture adapters using the documented POST /api/leads contract.
 */

import { apiRequest } from "./apiClient";
import type { BackendLeadSubmission, BackendLeadSubmissionResponse, ContactRequest, GrowthPlanLead, NewsletterSubscription } from "@/types/api";

function submitLead(payload: BackendLeadSubmission) {
  return apiRequest<BackendLeadSubmissionResponse>("/leads", { method: "POST", body: JSON.stringify(payload) });
}

export const contactService = {
  submitGrowthPlan(payload: GrowthPlanLead) {
    return submitLead({
      name: `${payload.firstName} ${payload.lastName}`.trim(),
      email: payload.workEmail,
      company: payload.companyWebsite,
      message: "Growth plan request from website hero form.",
      source: "website",
    });
  },

  subscribe(payload: NewsletterSubscription) {
    return Promise.reject(new Error(`Newsletter subscription is not available in the supplied backend API contract for ${payload.email}.`));
  },

  submitContactRequest(payload: ContactRequest) {
    return submitLead({
      name: payload.fullName,
      email: payload.emailAddress,
      phone: payload.phoneNumber,
      company: payload.company,
      serviceInterest: payload.serviceInterest,
      monthlyBudget: payload.monthlyBudget,
      message: payload.strategicQuery,
      source: "website",
      recaptchaToken: payload.recaptchaToken,
    });
  },
};
