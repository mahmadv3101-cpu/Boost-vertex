import { apiRequest } from "./apiClient";

export interface NewsletterSubscriptionRequest {
  email: string;
  source?: string;
}

export interface BlogCommentRequest {
  name: string;
  email: string;
  comment: string;
}

export const engagementService = {
  subscribeNewsletter(payload: NewsletterSubscriptionRequest) {
    return apiRequest<{ message?: string }>("/newsletter/subscribe", { method: "POST", body: JSON.stringify(payload) });
  },
  submitBlogComment(blogId: string, payload: BlogCommentRequest) {
    return apiRequest<{ message?: string }>(`/blog-comments/${blogId}`, { method: "POST", body: JSON.stringify(payload) });
  },
  listBlogComments(blogId: string) {
    return apiRequest<{ data?: unknown[] }>(`/blog-comments/${blogId}`);
  },
};
