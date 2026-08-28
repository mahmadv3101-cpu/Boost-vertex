import type { CaseStudyCardContent, CaseStudyDetailContent, IndustryLandingContent, ServiceCardContent, ServiceDetailContent } from "@/services/contentService";

export const approvedContact = {
  email: "boostvertex@gmail.com",
  phoneDisplay: "03032799987",
  phoneE164: "+923032799987",
  whatsappUrl: "https://wa.me/923032799987",
  address: "Blue Area, Islamabad, Pakistan",
  hours: "Monday–Saturday, 10:00 AM–7:00 PM",
  facebook: "https://www.facebook.com/adswithboostvertex",
  instagram: "https://www.instagram.com/boostvertex",
  linkedin: "https://www.linkedin.com/company/boost-vertex-pk/",
} as const;

export const approvedClientReferences = [
  "MovePro Pakistan",
  "Dr. Waqas Ahmad / Homoeopathic Centre Medicare",
  "Whizpool",
  "AH Interior",
  "Mr. Ali — Software Company",
] as const;

export const approvedFounderStory = "Boost Vertex was founded by Tayyab Riaz with a simple goal: to help businesses turn digital marketing into real business opportunities. Starting with a strong focus on Meta Ads and Lead Generation, Boost Vertex helps businesses reach the right audiences and generate relevant leads. The agency has since expanded its capabilities to include Google Ads, YouTube Ads, SEO, and Web Development. Today, Boost Vertex works with businesses across Pakistan, the UAE, and Saudi Arabia, with a focus on lead quality, practical execution, and measurable performance. Our belief is simple: digital marketing should contribute to business growth—not just generate clicks and impressions.";

export const services: ServiceCardContent[] = [
  { id: "service-meta-ads", slug: "meta-ads-management", title: "Meta Ads Management", summary: "Facebook and Instagram advertising built for customer acquisition — from audience research to conversion tracking.", outcomes: ["Audience research and targeting", "Creative testing", "Conversion tracking"], metricValue: "PRIMARY SPECIALTY", metricLabel: "Meta Ads", accented: true },
  { id: "service-leads", slug: "lead-generation", title: "Lead Generation", summary: "Qualified lead-generation campaigns focused on relevance and conversion potential, not just volume.", outcomes: ["Lead qualification logic", "Landing-page and WhatsApp capture", "Lead-quality optimization"], metricValue: "PRIMARY SPECIALTY", metricLabel: "lead quality", accented: true },
  { id: "service-google", slug: "google-ads", title: "Google Ads", summary: "Search advertising targeting high-intent customers actively searching for your product or service.", outcomes: ["Keyword research", "Conversion-tracked campaigns", "Landing-page alignment"], metricValue: "HIGH-INTENT", metricLabel: "search demand" },
  { id: "service-youtube", slug: "youtube-ads", title: "YouTube Ads", summary: "Video advertising campaigns built for awareness, consideration, and conversion.", outcomes: ["Audience targeting", "Funnel-stage strategy", "Creative optimization"], metricValue: "FULL-FUNNEL", metricLabel: "video campaigns" },
  { id: "service-seo", slug: "seo", title: "SEO", summary: "Search engine optimization focused on organic visibility that supports conversion, not just rankings.", outcomes: ["Technical SEO", "Content strategy", "Local SEO"], metricValue: "ORGANIC", metricLabel: "growth foundation" },
  { id: "service-web", slug: "web-development", title: "Web Development", summary: "Conversion-focused websites and landing pages built to support marketing campaigns.", outcomes: ["Conversion-ready landing pages", "Marketing integrations", "SEO-ready structure"], metricValue: "CONVERSION-READY", metricLabel: "web experiences" },
];

export const caseStudies: CaseStudyCardContent[] = [
  { id: "case-movepro", slug: "movepro-pakistan", clientName: "MovePro Pakistan", industry: "Transport & Logistics", metricValue: "HIGH-QUALITY", metricLabel: "relevant leads", summary: "A Meta Ads and lead-generation strategy focused on serious, business-ready prospects for a logistics and relocation business.", services: ["Meta Ads", "Lead Generation"] },
  { id: "case-waqas", slug: "dr-waqas-ahmad", clientName: "Dr. Waqas Ahmad / Homoeopathic Centre Medicare", industry: "Healthcare", metricValue: "RELEVANT", metricLabel: "business leads", summary: "A targeted lead-generation strategy designed to help the business reach more relevant prospects.", services: ["Lead Generation"] },
  { id: "case-whizpool", slug: "whizpool", clientName: "Whizpool", industry: "Technology / Software", metricValue: "ORGANIC", metricLabel: "LinkedIn leads", summary: "Social media management, LinkedIn content, and Meta Ads support designed to strengthen online presence and create better digital opportunities.", services: ["Social Media Management", "LinkedIn Content", "Meta Ads"] },
];

const industryProfile: IndustryLandingContent = {
  id: "industry-01", slug: "industries", name: "Industries", eyebrow: "INDUSTRIES WE SERVE", heroTitle: "Performance Marketing for Growth-Focused Businesses", heroCopy: "Boost Vertex helps businesses across Pakistan, the UAE and Saudi Arabia acquire customers through Meta Ads, lead generation, and data-driven paid advertising.", heroImage: "/assets/managed/industry-figma-hero-industrial-clean_9d332308.jpg",
  reality: { title: "Growth Needs an Industry-Aware Approach", copy: "Every market has a different buyer journey, lead-quality signal, and path to conversion. We tailor campaigns around the commercial context that matters to your business.", image: "/assets/managed/industry-figma-reality-bitcoin_b80dc94e.jpg", points: [
    { title: "Transport & Logistics", description: "Meta Ads and lead generation for businesses moving beyond unpredictable referral-led growth." },
    { title: "Healthcare", description: "Targeted digital campaigns designed to help practices reach relevant patient and client leads." },
    { title: "Technology / Software", description: "Social media management, LinkedIn content, and Meta Ads support designed to strengthen digital visibility and lead opportunities." },
  ] },
  advantages: [{ title: "Lead Quality First", description: "We focus on prospects who are genuinely likely to convert, not simply the lowest-cost form submissions." }, { title: "Measurable Performance", description: "Campaign decisions are connected to qualification, conversion tracking, and business outcomes." }, { title: "Continuous Optimization", description: "Testing and performance feedback keep campaigns moving instead of being left on autopilot." }],
  friction: [{ title: "Unpredictable Lead Flow", description: "Referral-led acquisition and disconnected campaigns can leave growth inconsistent." }, { title: "Low-Quality Enquiries", description: "High volume is not useful when prospects do not match your business, budget, or intent." }, { title: "Missing Conversion Insight", description: "Without proper tracking, teams cannot see what is creating qualified opportunities." }],
  protocol: [{ index: "PHASE 01", title: "Understand the Opportunity", description: "Define business goals, the ideal customer profile, lead criteria, and the current campaign baseline." }, { index: "PHASE 02", title: "Build the Strategy", description: "Plan the channel mix, targeting, creative direction, capture journey, and tracking setup." }, { index: "PHASE 03", title: "Launch and Learn", description: "Activate campaigns with structured monitoring and a focus on response quality, not just lead volume." }, { index: "PHASE 04", title: "Optimize and Scale", description: "Refine the parts of the system producing relevant, commercially valuable opportunities.", highlighted: true }],
  solutions: [{ title: "Meta Ads Management", description: "Facebook and Instagram campaigns built around customer acquisition and conversion tracking.", icon: "target" }, { title: "Lead Generation", description: "Lead-capture systems that prioritize relevance and conversion potential over volume.", icon: "file" }, { title: "Google Ads", description: "High-intent search campaigns that capture people actively looking for your service.", icon: "search" }, { title: "SEO and Web Development", description: "Organic foundations and conversion-ready landing pages that support campaign performance.", icon: "chart" }],
  outcomes: [{ client: "MovePro Pakistan", metric: "HIGH-QUALITY", label: "relevant leads", image: "/assets/managed/industry-figma-outcome-cloudscale_ec36f40f.jpg" }, { client: "Dr. Waqas Ahmad", metric: "RELEVANT", label: "patient leads", image: "/assets/managed/industry-figma-outcome-nexus_7b934a4e.jpg" }],
  standards: [{ title: "Results", description: "We measure success by business outcomes, not impressions." }, { title: "Transparency", description: "Clear reporting shows what is working and what needs improvement." }, { title: "Accountability", description: "We take ownership of campaign performance and continuous optimization." }],
  formTitle: "Tell us about your growth goals",
};

export function getIndustryLanding(slug?: string): IndustryLandingContent {
  if (!slug || slug === industryProfile.slug) return industryProfile;
  const name = slug.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
  return { ...industryProfile, slug, name, eyebrow: `${name.toUpperCase()} MARKETING`, heroTitle: `Performance Marketing for ${name}` };
}

const studyProfiles: Record<string, Pick<CaseStudyDetailContent, "projectName" | "eyebrow" | "heroTitle" | "heroEmphasis" | "heroCopy" | "overview" | "challenge" | "process" | "execution" | "impact" | "insight" | "proof" | "furtherReading" | "relatedSlugs">> = {
  "movepro-pakistan": {
    projectName: "MovePro Pakistan", eyebrow: "CASE STUDY: MOVEPRO PAKISTAN", heroTitle: "Generating relevant prospects for a logistics business.", heroEmphasis: "relevant", heroCopy: "Boost Vertex built a Meta Ads lead-generation strategy focused on serious, business-ready prospects rather than unpredictable referral-led leads.",
    overview: [{ label: "Client", value: "MovePro Pakistan" }, { label: "Industry", value: "Transport & Logistics" }, { label: "Services", value: "Meta Ads · Lead Generation" }, { label: "Status", value: "Client experience confirmed" }],
    challenge: [{ title: "Unpredictable acquisition", description: "The business needed a more reliable source of relevant prospects than referral-based growth alone." }, { title: "Lead relevance", description: "Campaign activity needed to attract serious prospects instead of random form submissions." }],
    process: [{ index: "01", title: "Target", description: "Identify relevant audience signals for the relocation and logistics business." }, { index: "02", title: "Structure", description: "Build Meta campaign and lead-generation structure around prospect relevance." }, { index: "03", title: "Launch", description: "Run Facebook and Instagram campaigns with ongoing monitoring." }, { index: "04", title: "Optimize", description: "Refine targeting and campaign decisions around lead quality." }],
    execution: [{ title: "Meta Ads Strategy", description: "Built a lead-generation strategy using relevant audience targeting and campaign management." }, { title: "Ongoing Optimization", description: "Campaigns were monitored and optimized with a continuous focus on lead relevance." }],
    impact: [{ value: "HIGH-QUALITY", label: "mature leads", accented: true }, { value: "RELEVANT", label: "business prospects" }, { value: "META ADS", label: "managed campaigns" }, { value: "ONGOING", label: "optimization", accented: true }],
    insight: "The documented outcome was stronger lead relevance: serious, mature prospects instead of random form-fills.", proof: { text: "Client-approved testimonial wording and detailed campaign evidence will be added when supplied." },
    furtherReading: [{ category: "Lead Generation", title: "How to Generate Qualified Leads with Meta Ads", tone: "network" }, { category: "Paid Media", title: "Why Lead Quality Matters More Than Lead Volume", tone: "servers" }, { category: "Strategy", title: "Google Ads vs Meta Ads: Choosing the Right Channel", tone: "abstract" }], relatedSlugs: ["dr-waqas-ahmad", "whizpool"],
  },
  "dr-waqas-ahmad": {
    projectName: "Dr. Waqas Ahmad / Homoeopathic Centre Medicare", eyebrow: "CASE STUDY: DR. WAQAS AHMAD", heroTitle: "A lead-generation strategy for a healthcare business.", heroEmphasis: "lead-generation", heroCopy: "Boost Vertex implemented targeted digital campaigns to help the business generate more relevant leads.",
    overview: [{ label: "Client", value: "Dr. Waqas Ahmad / Homoeopathic Centre Medicare" }, { label: "Industry", value: "Healthcare" }, { label: "Service", value: "Lead Generation" }, { label: "Status", value: "Client experience confirmed" }],
    challenge: [{ title: "Consistent digital leads", description: "The business needed a consistent way to generate relevant leads through digital advertising." }],
    process: [{ index: "01", title: "Understand", description: "Define the target audience and lead journey for the business." }, { index: "02", title: "Plan", description: "Create a lead-generation approach tailored to that audience." }, { index: "03", title: "Run", description: "Launch targeted campaigns designed to generate relevant enquiries." }, { index: "04", title: "Optimize", description: "Use campaign feedback to keep improving lead relevance." }],
    execution: [{ title: "Targeted Lead Generation", description: "Implemented a lead-generation strategy tailored to the business’s target audience." }, { title: "Campaign Optimization", description: "Campaigns were run and optimized to generate leads for the business." }],
    impact: [{ value: "RELEVANT", label: "business leads", accented: true }, { value: "TARGETED", label: "digital campaigns" }, { value: "HEALTHCARE", label: "audience focus" }, { value: "ONGOING", label: "optimization", accented: true }],
    insight: "A focused lead-generation approach can create a more consistent route to relevant enquiries.", proof: { text: "Client feedback and performance evidence will be published only after final exact-wording approval and supporting assets are provided." },
    furtherReading: [{ category: "Lead Generation", title: "Why Lead Quality Matters More Than Lead Volume", tone: "network" }, { category: "Meta Ads", title: "How to Optimize Meta Ads Campaigns for Better ROI", tone: "servers" }, { category: "Strategy", title: "How to Generate Qualified Leads with Meta Ads", tone: "abstract" }], relatedSlugs: ["movepro-pakistan", "whizpool"],
  },
  whizpool: {
    projectName: "Whizpool", eyebrow: "CASE STUDY: WHIZPOOL", heroTitle: "Building a stronger digital presence for better opportunities.", heroEmphasis: "digital presence", heroCopy: "Boost Vertex supported Whizpool with social media management, LinkedIn content, and Meta Ads to create better opportunities through its digital channels.",
    overview: [{ label: "Client", value: "Whizpool" }, { label: "Industry", value: "Technology / Software" }, { label: "Services", value: "Social Media Management · LinkedIn Content · Meta Ads" }, { label: "Status", value: "Client experience confirmed" }],
    challenge: [{ title: "Stronger online presence", description: "Whizpool needed social media management, LinkedIn content, and Meta Ads support to create stronger digital opportunities." }],
    process: [{ index: "01", title: "Understand", description: "Clarify the digital priorities and relevant audience opportunities." }, { index: "02", title: "Plan", description: "Develop a social media, LinkedIn content, and Meta Ads approach." }, { index: "03", title: "Publish", description: "Create and publish content as part of the engagement." }, { index: "04", title: "Optimize", description: "Refine visibility and campaign activity around relevant opportunities." }],
    execution: [{ title: "Social Media Management", description: "Supported ongoing digital presence and channel management." }, { title: "LinkedIn Content and Meta Ads", description: "Developed LinkedIn content and Meta Ads activity to create better digital opportunities." }],
    impact: [{ value: "ORGANIC", label: "LinkedIn leads", accented: true }, { value: "SOCIAL", label: "media management" }, { value: "META ADS", label: "campaign support" }, { value: "LINKEDIN", label: "content strategy", accented: true }],
    insight: "The engagement supported a stronger online presence and created better opportunities through Whizpool’s digital channels.", proof: { text: "Client feedback and supporting evidence will be published only after final exact-wording approval and assets are provided." },
    furtherReading: [{ category: "Content", title: "How to Generate Qualified Leads with Meta Ads", tone: "network" }, { category: "Strategy", title: "Google Ads vs Meta Ads: Choosing the Right Channel", tone: "servers" }, { category: "Growth", title: "Why Lead Quality Matters More Than Lead Volume", tone: "abstract" }], relatedSlugs: ["movepro-pakistan", "dr-waqas-ahmad"],
  },
};

export function getCaseStudyDetail(slug?: string): CaseStudyDetailContent {
  const base = caseStudies.find((study) => study.slug === slug) ?? caseStudies[0];
  return { ...base, ...studyProfiles[base.slug] };
}

const serviceProfiles = {
  "meta-ads-management": { category: "META ADS MANAGEMENT", headline: "META ADS BUILT FOR CUSTOMER ACQUISITION.", copy: "Facebook and Instagram campaigns designed to generate relevant leads and conversions, supported by audience research, creative testing, and conversion tracking.", problems: ["Wasted ad spend", "Low-quality leads", "Missing conversion tracking", "Campaigns left on autopilot"], approach: ["Audience research and targeting strategy", "Campaign structure planning", "Creative development and testing", "Meta Pixel and Conversions API tracking", "Launch and monitoring", "Ongoing optimization"], faqs: [{ question: "Do you manage both Facebook and Instagram ads?", answer: "Yes. Campaigns are typically run across both placements as part of one Meta Ads strategy." }, { question: "How do you track results?", answer: "Through Meta Pixel and Conversions API integration tied to actual business outcomes, not just clicks." }, { question: "Do you create the ad creatives too?", answer: "Yes. Creative development and testing are part of the service." }] },
  "lead-generation": { category: "LEAD GENERATION", headline: "LEAD GENERATION THAT PRIORITIZES QUALITY OVER VOLUME.", copy: "Lead-generation systems built around Meta Ads and landing pages to capture prospects who are genuinely relevant to the business.", problems: ["Low-quality leads", "High volume with low conversion", "No qualification process", "Inconsistent lead flow"], approach: ["Define the ideal customer profile", "Build targeting around qualification", "Set up landing pages or WhatsApp capture", "Test from lead-quality feedback", "Optimize continuously"], faqs: [{ question: "How do you define a qualified lead?", answer: "The criteria are agreed with the business — budget, intent, and relevance — rather than a generic form submission." }, { question: "Can leads come through WhatsApp?", answer: "Yes, where it fits the business’s sales process." }] },
  "google-ads": { category: "GOOGLE ADS", headline: "GOOGLE ADS FOR HIGH-INTENT CUSTOMERS.", copy: "Search campaigns built around high-intent keyword targeting, conversion-tracked ad copy, and landing-page alignment.", problems: ["Missed high-intent search traffic", "Poor keyword targeting", "Weak ad-to-page alignment"], approach: ["Keyword research", "Campaign structure", "Ad copywriting", "Conversion tracking", "Landing-page alignment", "Remarketing and optimization"], faqs: [{ question: "Do you handle Search and remarketing?", answer: "Yes. Both are part of a full Google Ads strategy." }] },
  "youtube-ads": { category: "YOUTUBE ADS", headline: "YOUTUBE ADS FOR AWARENESS AND CONVERSION.", copy: "Video advertising campaigns covering audience targeting, funnel-stage strategy, creative direction, and conversion-focused optimization.", problems: ["Underused video channel", "No full-funnel video strategy"], approach: ["Audience targeting", "Funnel-stage planning", "Creative strategy", "Launch", "Optimization"], faqs: [{ question: "How can YouTube Ads support performance marketing?", answer: "Video can build awareness, support consideration, and feed conversions alongside Meta and Google campaigns." }] },
  seo: { category: "SEO", headline: "SEO FOR LONG-TERM ORGANIC GROWTH.", copy: "Organic visibility work covering keyword research, technical SEO, content strategy, internal linking, and local SEO.", problems: ["Low organic visibility", "Weak technical SEO foundations", "No content strategy"], approach: ["Keyword research", "Technical audit", "On-page optimization", "Content strategy", "Internal linking", "Local SEO"], faqs: [{ question: "Do you guarantee rankings?", answer: "No. The service focuses on stronger organic foundations and visibility over time, without promising specific rankings." }] },
  "web-development": { category: "WEB DEVELOPMENT", headline: "WEBSITES BUILT TO CONVERT.", copy: "Conversion-focused websites and landing pages built to support marketing campaigns, lead generation, and SEO-ready growth foundations.", problems: ["Weak websites", "Outdated landing pages", "Campaign traffic that does not convert"], approach: ["Requirements gathering", "Design", "Development", "SEO-ready setup", "Marketing tool integration"], faqs: [{ question: "Can you build landing pages for paid campaigns?", answer: "Yes. Web development is a supporting capability for businesses that need conversion-ready pages for their campaigns." }] },
} as const;

export function getServiceDetail(slug?: string): ServiceDetailContent {
  const service = services.find((item) => item.slug === slug) ?? services[0];
  const profile = serviceProfiles[service.slug as keyof typeof serviceProfiles];
  return {
    ...service, eyebrow: "SERVICE DETAIL", heroTitle: service.title, heroEmphasis: "Built around qualified growth.", heroCopy: service.summary, serviceCategory: profile.category, outcomeHeadline: profile.headline, outcomeCopy: profile.copy,
    whyMatters: service.outcomes.map((title) => ({ title, description: `A focused ${service.title.toLowerCase()} capability connected to measurable business outcomes.` })),
    problems: profile.problems.map((title, index) => ({ index: String(index + 1).padStart(2, "0"), title, description: `A common ${service.title.toLowerCase()} challenge that requires a structured, data-informed response.` })),
    capabilities: service.outcomes.map((name, index) => ({ index: String(index + 1).padStart(2, "0"), name, description: `A ${service.title.toLowerCase()} capability designed around the goals and qualification criteria of the business.` })),
    approachSteps: profile.approach.map((title, index) => ({ index: String(index + 1).padStart(2, "0"), title, description: "Executed as part of a connected performance marketing workflow." })),
    workflowSummary: profile.copy, proofPoints: [{ client: service.title.toUpperCase(), metric: service.metricValue ?? "MEASURABLE GROWTH", description: profile.copy }, { client: "BOOST VERTEX", metric: "CONTINUOUS OPTIMIZATION", description: "Campaign and conversion decisions are continually improved using performance feedback." }],
    standards: [{ title: "Results", description: "We measure success by business outcomes, not impressions." }, { title: "Accountability", description: "We take ownership of campaign performance." }, { title: "Transparency", description: "Clear reporting shows what is working and what is not." }, { title: "Data-driven decisions", description: "Every optimization is backed by data." }, { title: "Continuous optimization", description: "Campaigns are never set and forget." }], faqs: [...profile.faqs],
  };
}
