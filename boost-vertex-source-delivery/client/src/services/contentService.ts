// Content-service contract: new Figma routes render local design content today and can swap to these typed backend requests without changing page UI.

import { apiRequest } from "./apiClient";
import type { ApiEnvelope, ApiListResponse } from "@/types/api";

type ApiResourceResponse<T> = T | ApiEnvelope<T>;

function unwrapResource<T>(response: ApiResourceResponse<T>) {
  return typeof response === "object" && response !== null && "data" in response ? response.data : response;
}

export interface ServiceCardContent {
  id: string;
  slug: string;
  title: string;
  summary: string;
  icon?: string;
  outcomes: string[];
  metricValue?: string;
  metricLabel?: string;
  accented?: boolean;
}

export interface ServiceDetailContent extends ServiceCardContent {
  eyebrow: string;
  heroTitle: string;
  heroEmphasis?: string;
  heroCopy: string;
  serviceCategory: string;
  outcomeHeadline: string;
  outcomeCopy: string;
  whyMatters: Array<{ title: string; description: string }>;
  problems: Array<{ index: string; title: string; description: string }>;
  capabilities: Array<{ index: string; name: string; description: string }>;
  approachSteps: Array<{ index: string; title: string; description: string }>;
  workflowSummary: string;
  proofPoints: Array<{ client: string; metric: string; description: string }>;
  standards: Array<{ title: string; description: string }>;
  faqs: Array<{ question: string; answer: string }>;
}

export interface CaseStudyCardContent {
  id: string;
  slug: string;
  clientName: string;
  industry: string;
  metricValue: string;
  metricLabel: string;
  summary: string;
  services: string[];
}

export interface CaseStudyDetailContent extends CaseStudyCardContent {
  projectName?: string;
  eyebrow: string;
  heroTitle: string;
  heroEmphasis: string;
  heroCopy: string;
  overview: Array<{ label: string; value: string }>;
  challenge: Array<{ title: string; description: string }>;
  process: Array<{ index: string; title: string; description: string }>;
  execution: Array<{ title: string; description: string }>;
  impact: Array<{ value: string; label: string; accented?: boolean }>;
  insight: string;
  proof: { text: string; author?: string; role?: string };
  furtherReading: Array<{ category: string; title: string; tone: "network" | "servers" | "abstract" }>;
  relatedSlugs: string[];
}

export interface CaseStudyPage {
  items: CaseStudyCardContent[];
  page: number;
  limit: number;
  total: number;
  hasNextPage: boolean;
}

export interface BlogPostContent {
  id: string;
  slug: string;
  category: string;
  title: string;
  summary: string;
  image: string;
  readTime?: string;
}

export interface BlogArticleSection {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  stat?: { primary: string; primaryLabel: string; secondary: string; secondaryLabel: string };
}

export interface BlogDetailContent extends BlogPostContent {
  eyebrow: string;
  publishedDate: string;
  author: { name: string; role: string; bio: string; image?: string };
  leadImage: string;
  intro: string;
  sections: BlogArticleSection[];
  keyTakeaways: string[];
  faqs: Array<{ question: string; answer: string }>;
  relatedSlugs: string[];
}

export interface BlogPostPage {
  items: BlogPostContent[];
  page: number;
  limit: number;
  total: number;
  hasNextPage: boolean;
}

export interface TestimonialContent {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating?: number;
  image?: string;
}

export interface IndustryLandingContent {
  id: string;
  slug: string;
  name: string;
  eyebrow: string;
  heroTitle: string;
  heroCopy: string;
  heroImage: string;
  reality: { title: string; copy: string; image: string; points: Array<{ title: string; description: string }> };
  advantages: Array<{ title: string; description: string }>;
  friction: Array<{ title: string; description: string }>;
  protocol: Array<{ index: string; title: string; description: string; highlighted?: boolean }>;
  solutions: Array<{ title: string; description: string; icon: string }>;
  outcomes: Array<{ client: string; metric: string; label: string; image: string }>;
  standards: Array<{ title: string; description: string }>;
  formTitle: string;
}

export interface SiteSettingsContent {
  companyName: string;
  address?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  workingHours?: string;
  preferredContactMethod?: string;
  salesEmail?: string;
  secondaryContactMethod?: string;
  websiteUrl?: string;
  bookingUrl?: string | null;
  socialLinks?: Record<string, string>;
  seoDefaults?: { siteTitle?: string; metaDescription?: string; canonicalUrl?: string };
}

export interface SiteContentResource {
  type?: string;
  content?: Record<string, unknown>;
  isPublished?: boolean;
}

export const contentService = {
  listServices() {
    return apiRequest<ApiListResponse<ServiceCardContent>>("/services");
  },
  async getService(slug: string) {
    return unwrapResource(await apiRequest<ApiResourceResponse<ServiceDetailContent>>(`/services/${slug}`));
  },
  listCaseStudies(query = "") {
    return apiRequest<ApiListResponse<CaseStudyCardContent>>(`/case-studies${query}`);
  },
  async getCaseStudy(slug: string) {
    return unwrapResource(await apiRequest<ApiResourceResponse<CaseStudyDetailContent>>(`/case-studies/${slug}`));
  },
  getCaseStudySummary() {
    return apiRequest<ApiEnvelope<{ adSpendManaged: string; averageRoi: string; clientRetention: string }>>("/case-studies/summary");
  },
  listBlogPosts(query = "") {
    return apiRequest<ApiListResponse<BlogPostContent>>(`/blogs${query}`);
  },
  async getBlogPost(slug: string) {
    return unwrapResource(await apiRequest<ApiResourceResponse<BlogDetailContent>>(`/blogs/${slug}`));
  },
  listTestimonials() {
    return apiRequest<ApiListResponse<TestimonialContent>>("/testimonials");
  },
  async getIndustry(slug: string) {
    return unwrapResource(await apiRequest<ApiResourceResponse<IndustryLandingContent>>(`/industries/${slug}`));
  },
  getSiteSettings() {
    return apiRequest<SiteSettingsContent>("/site-settings");
  },
  async getSiteContent(type: "homepage" | "about") {
    return unwrapResource<SiteContentResource>(await apiRequest<ApiResourceResponse<SiteContentResource>>(`/site-content/${type}`));
  },
};
