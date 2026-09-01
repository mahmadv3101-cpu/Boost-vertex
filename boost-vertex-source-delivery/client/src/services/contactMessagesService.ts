import { adminService, type BackendLead } from "./adminService";

export interface ContactMessageRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  subject: string;
  preview: string;
  message: string;
  createdAt: string;
  unread: boolean;
  source?: string;
}

export function mapLeadToContactMessage(lead: BackendLead): ContactMessageRecord {
  const service = lead.serviceInterest?.trim() || "General Inquiry";
  const message = lead.message?.trim() || "No message was provided.";
  return {
    id: lead._id,
    name: lead.name || "Unknown sender",
    email: lead.email || "—",
    phone: lead.phone || "—",
    company: lead.company || "—",
    service,
    subject: service,
    preview: message.length > 120 ? `${message.slice(0, 117)}...` : message,
    message,
    createdAt: lead.createdAt,
    unread: !lead.isRead,
    source: lead.source,
  };
}

export const contactMessagesService = {
  async list(params: Record<string, string | number | boolean | undefined> = {}) {
    const response = await adminService.leads(params);
    return { ...response, data: response.data.map(mapLeadToContactMessage) };
  },
  async markRead(id: string, isRead = true) {
    const response = await adminService.updateLeadReadState(id, isRead);
    return mapLeadToContactMessage(response.lead);
  },
  supportsDelete: false as const,
};
