import type { BlogDetailContent, BlogPostContent, CaseStudyCardContent, CaseStudyDetailContent, ServiceCardContent, ServiceDetailContent, TestimonialContent } from "@/services/contentService";

type UnknownRecord = Record<string, unknown>;

function record(value: unknown): UnknownRecord {
  return value && typeof value === "object" ? value as UnknownRecord : {};
}

function text(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function pickText(source: UnknownRecord, keys: string[], fallback: string) {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return fallback;
}

function list(value: unknown, fallback: string[]) {
  if (typeof value === "string" && value.trim()) return value.split("/").map((item) => item.trim()).filter(Boolean);
  if (!Array.isArray(value)) return fallback;
  const values = value.map((item) => typeof item === "string" ? item.trim() : "").filter(Boolean);
  return values.length ? values : fallback;
}

function objectList(value: unknown) {
  return Array.isArray(value) ? value.map(record).filter((item) => Object.keys(item).length) : [];
}

function detailCards(items: string[], fallback: Array<{ index: string; title: string; description: string }>) {
  if (!items.length) return fallback;
  return items.map((item, index) => ({ index: String(index + 1).padStart(2, "0"), title: item, description: "Included in this performance marketing engagement." }));
}

function image(source: UnknownRecord, fallback: string) {
  const candidate = source.imageUrl ?? source.image ?? source.coverImage ?? source.heroImage ?? source.featuredImage;
  if (typeof candidate === "string" && candidate.trim()) return candidate.trim();
  const nested = record(candidate);
  return pickText(nested, ["url", "secureUrl", "src"], fallback);
}

function category(source: UnknownRecord, fallback: string) {
  const value = source.category;
  if (typeof value === "string") return text(value, fallback);
  return pickText(record(value), ["name", "title", "label"], fallback);
}

export function mergeServiceCard(fallback: ServiceCardContent, value: unknown): ServiceCardContent {
  const source = record(value);
  return {
    ...fallback,
    id: pickText(source, ["_id", "id"], fallback.id),
    slug: pickText(source, ["slug"], fallback.slug),
    title: pickText(source, ["title", "name"], fallback.title),
    summary: pickText(source, ["summary", "shortDescription", "excerpt", "description"], fallback.summary),
    outcomes: list(source.outcomes ?? source.features ?? source.deliverables ?? source.capabilities, fallback.outcomes),
    metricValue: pickText(source, ["metricValue", "metric", "result"], fallback.metricValue ?? ""),
    metricLabel: pickText(source, ["metricLabel", "resultLabel"], fallback.metricLabel ?? ""),
  };
}

export function mergeServiceDetail(fallback: ServiceDetailContent, value: unknown): ServiceDetailContent {
  const source = record(value);
  const basic = mergeServiceCard(fallback, source);
  const features = list(source.features ?? source.deliverables, []);
  const approach = list(source.approach, []);
  const problems = list(source.problemsWeSolve, []);
  const faqs = objectList(source.faqs).map((faq) => ({ question: pickText(faq, ["question", "q"], ""), answer: pickText(faq, ["answer", "a"], "") })).filter((faq) => faq.question && faq.answer);
  return {
    ...fallback,
    ...basic,
    eyebrow: pickText(source, ["eyebrow"], fallback.eyebrow),
    heroTitle: pickText(source, ["heroTitle", "title", "name"], fallback.heroTitle),
    heroEmphasis: pickText(source, ["heroEmphasis", "tagline"], fallback.heroEmphasis ?? ""),
    heroCopy: pickText(source, ["heroCopy", "summary", "shortDescription", "description"], fallback.heroCopy),
    serviceCategory: pickText(source, ["serviceCategory", "category"], fallback.serviceCategory),
    outcomeHeadline: pickText(source, ["outcomeHeadline", "headline", "title"], fallback.outcomeHeadline),
    outcomeCopy: pickText(source, ["outcomeCopy", "description", "summary"], fallback.outcomeCopy),
    workflowSummary: pickText(source, ["workflowSummary", "description", "summary"], fallback.workflowSummary),
    whyMatters: features.length ? features.slice(0, 3).map((title) => ({ title, description: "A focused part of the service designed to support measurable growth." })) : fallback.whyMatters,
    problems: detailCards(problems, fallback.problems),
    capabilities: detailCards(list(source.deliverables ?? source.features, []), fallback.capabilities.map((item) => ({ index: item.index, title: item.name, description: item.description }))).map((item) => ({ index: item.index, name: item.title, description: item.description })),
    approachSteps: approach.length ? approach.map((title, index) => ({ index: String(index + 1).padStart(2, "0"), title, description: "A deliberate stage in the service delivery workflow." })) : fallback.approachSteps,
    faqs: faqs.length ? faqs : fallback.faqs,
  };
}

export function mergeCaseStudyCard(fallback: CaseStudyCardContent, value: unknown): CaseStudyCardContent {
  const source = record(value);
  const client = record(source.client);
  const firstResult = objectList(source.results)[0] ?? {};
  return {
    ...fallback,
    id: pickText(source, ["_id", "id"], fallback.id),
    slug: pickText(source, ["slug"], fallback.slug),
    clientName: pickText(source, ["clientName", "title", "name"], pickText(client, ["name", "title"], fallback.clientName)),
    industry: pickText(source, ["industry"], fallback.industry),
    metricValue: pickText(source, ["metricValue", "result", "headlineMetric"], pickText(firstResult, ["metric", "value"], fallback.metricValue)),
    metricLabel: pickText(source, ["metricLabel", "resultLabel"], pickText(firstResult, ["label"], fallback.metricLabel)),
    summary: pickText(source, ["summary", "excerpt", "description", "challenge"], fallback.summary),
    services: list(source.services ?? source.serviceNames ?? source.service, fallback.services),
  };
}

export function mergeCaseStudyDetail(fallback: CaseStudyDetailContent, value: unknown): CaseStudyDetailContent {
  const source = record(value);
  const basic = mergeCaseStudyCard(fallback, source);
  const results = objectList(source.results).map((item) => ({ value: pickText(item, ["metric", "value"], "Known outcome"), label: pickText(item, ["description", "label"], "Confirmed client result") }));
  const service = pickText(source, ["service"], basic.services.join(", "));
  const challenge = pickText(source, ["challenge"], "");
  const solution = pickText(source, ["solution", "whatWeDid"], "");
  return {
    ...fallback,
    ...basic,
    projectName: pickText(source, ["projectName", "title"], fallback.projectName ?? fallback.clientName),
    eyebrow: pickText(source, ["eyebrow"], fallback.eyebrow),
    heroTitle: pickText(source, ["heroTitle", "title"], fallback.heroTitle),
    heroEmphasis: pickText(source, ["heroEmphasis"], fallback.heroEmphasis),
    heroCopy: pickText(source, ["heroCopy", "summary", "description", "solution"], fallback.heroCopy),
    insight: pickText(source, ["insight", "summary", "description", "solution"], fallback.insight),
    overview: [
      { label: "Client", value: basic.clientName },
      { label: "Industry", value: basic.industry },
      { label: "Service", value: service || "Boost Vertex engagement" },
    ],
    challenge: challenge ? [{ title: "The Challenge", description: challenge }] : fallback.challenge,
    process: solution ? [{ index: "01", title: "Strategy", description: solution }] : fallback.process,
    execution: solution ? [{ title: "What We Did", description: solution }] : fallback.execution,
    impact: results.length ? results.map((result, index) => ({ ...result, accented: index !== 1 })) : fallback.impact,
    proof: results.length ? { text: results[0].label, author: basic.clientName, role: basic.industry } : fallback.proof,
  };
}

export function mergeBlogPost(fallback: BlogPostContent, value: unknown): BlogPostContent {
  const source = record(value);
  const minutes = typeof source.readTime === "number" ? `${source.readTime} min read` : undefined;
  return {
    ...fallback,
    id: pickText(source, ["_id", "id"], fallback.id),
    slug: pickText(source, ["slug"], fallback.slug),
    category: category(source, fallback.category),
    title: pickText(source, ["title", "name"], fallback.title),
    summary: pickText(source, ["summary", "excerpt", "description"], fallback.summary),
    image: image(source, fallback.image),
    readTime: pickText(source, ["readTime", "readingTime"], minutes ?? fallback.readTime ?? ""),
  };
}

export function mergeBlogDetail(fallback: BlogDetailContent, value: unknown): BlogDetailContent {
  const source = record(value);
  const basic = mergeBlogPost(fallback, source);
  const author = typeof source.author === "string" ? { name: source.author } : record(source.author);
  const content = pickText(source, ["content", "body"], "");
  const paragraphs = content.split(/\n\s*\n/).map((item) => item.trim()).filter(Boolean);
  const updatedAt = pickText(source, ["publishedDate", "publishedAt", "date", "updatedAt", "createdAt"], fallback.publishedDate);
  return {
    ...fallback,
    ...basic,
    eyebrow: pickText(source, ["eyebrow"], fallback.eyebrow),
    publishedDate: updatedAt.includes("T") ? new Date(updatedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : updatedAt,
    leadImage: image(source, fallback.leadImage),
    intro: pickText(source, ["intro", "summary", "excerpt", "description"], fallback.intro),
    author: {
      ...fallback.author,
      name: pickText(author, ["name"], fallback.author.name),
      role: pickText(author, ["role", "title"], fallback.author.role),
      bio: pickText(author, ["bio", "description"], fallback.author.bio),
      image: image(author, fallback.author.image ?? "") || fallback.author.image,
    },
    sections: paragraphs.length ? [{ id: "article", title: "Article", paragraphs }] : fallback.sections,
    keyTakeaways: list(source.keyTakeaways ?? source.tags, fallback.keyTakeaways),
  };
}

export function mergeTestimonial(fallback: TestimonialContent, value: unknown): TestimonialContent {
  const source = record(value);
  return {
    ...fallback,
    id: pickText(source, ["_id", "id"], fallback.id),
    name: pickText(source, ["name", "clientName"], fallback.name),
    role: pickText(source, ["role", "designation", "company"], fallback.role),
    quote: pickText(source, ["quote", "testimonial", "content", "message"], fallback.quote),
    image: image(source, fallback.image ?? "") || fallback.image,
  };
}
