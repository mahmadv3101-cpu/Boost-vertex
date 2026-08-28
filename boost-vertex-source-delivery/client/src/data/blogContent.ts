import type { BlogDetailContent, BlogPostContent } from "@/services/contentService";

export const blogCategories = ["All", "Meta Ads", "Lead Generation", "Google Ads", "SEO", "Strategy"] as const;

export const blogPosts: BlogPostContent[] = [
  { id: "qualified-meta-leads", slug: "how-to-generate-qualified-leads-with-meta-ads", category: "Meta Ads", title: "How to Generate Qualified Leads with Meta Ads", summary: "A practical guide to building Meta Ads campaigns around qualification, relevance, and conversion potential.", image: "/assets/managed/blog-server-analytics_d5f377c9.jpg", readTime: "6 min read" },
  { id: "facebook-vs-instagram", slug: "facebook-ads-vs-instagram-ads", category: "Meta Ads", title: "Facebook Ads vs Instagram Ads: Which Works Better for Your Business?", summary: "A channel-planning guide for business owners comparing audience context, creative, and campaign goals.", image: "/assets/managed/blog-network-intelligence_60ef5be6.jpg", readTime: "5 min read" },
  { id: "lead-quality", slug: "why-lead-quality-matters-more-than-lead-volume", category: "Lead Generation", title: "Why Lead Quality Matters More Than Lead Volume", summary: "Why relevance, intent, and commercial fit should shape lead-generation decisions more than form-fill volume.", image: "/assets/managed/blog-architecture-ai_9cd12371.jpg", readTime: "5 min read" },
  { id: "google-vs-meta", slug: "google-ads-vs-meta-ads-choosing-the-right-channel", category: "Google Ads", title: "Google Ads vs Meta Ads: Choosing the Right Channel", summary: "A business-focused comparison of high-intent search demand and paid social customer acquisition.", image: "/assets/managed/blog-performance-device_46fb9e21.jpg", readTime: "6 min read" },
  { id: "lead-generation-mistakes", slug: "common-lead-generation-mistakes-businesses-make", category: "Lead Generation", title: "Common Lead Generation Mistakes Businesses Make", summary: "A practical guide to avoiding lead-generation mistakes that reduce relevance and conversion potential.", image: "/assets/managed/blog-mountain-workspace_ddbe37f6.svg", readTime: "5 min read" },
  { id: "linkedin-lead-generation", slug: "how-businesses-can-use-linkedin-for-lead-generation", category: "Strategy", title: "How Businesses Can Use LinkedIn for Lead Generation", summary: "How LinkedIn content, positioning, and conversations can support relevant business opportunities.", image: "/assets/managed/blog-hero-workspace_a899b027.jpg", readTime: "6 min read" },
];

function createDetail(post: BlogPostContent): BlogDetailContent {
  return {
    ...post,
    eyebrow: `${post.category.toUpperCase()} · ${(post.readTime ?? "6 min read").toUpperCase()}`,
    publishedDate: "Boost Vertex Editorial Series",
    author: { name: "Boost Vertex Editorial Team", role: "Performance Marketing Insights", bio: "The Boost Vertex editorial team shares practical guidance on Meta Ads, lead generation, paid advertising, and growth systems." },
    leadImage: post.image,
    intro: post.summary,
    sections: [
      { id: "context", title: "Start with the Business Goal", paragraphs: ["Strong marketing decisions start with a clear commercial objective, the right audience context, and a definition of what a relevant lead or conversion looks like.", "Boost Vertex focuses on measurable business outcomes rather than vanity metrics, so every campaign decision can be evaluated against a useful standard."] },
      { id: "strategy", title: "Build the Right Campaign Structure", paragraphs: ["Campaign structure should connect audience targeting, messaging, creative, landing-page or lead-capture experience, and conversion tracking.", "The right approach depends on the market, sales process, and the signals that indicate genuine commercial intent."] },
      { id: "quality", title: "Prioritize Relevance and Lead Quality", paragraphs: ["A large number of enquiries is not automatically valuable. The quality of a lead depends on relevance, intent, and its fit with the business.", "Lead-quality feedback should guide targeting, creative testing, and optimization instead of treating every form submission as equal."], bullets: ["Agree qualification criteria with the business", "Track the signals that connect campaigns to meaningful outcomes", "Use feedback to refine targeting and capture journeys"] },
      { id: "optimization", title: "Keep Testing and Optimizing", paragraphs: ["Campaigns are never set and forget. Ongoing testing helps teams learn which audiences, creative, channels, and conversion journeys deserve more investment.", "Clear reporting makes that learning visible and keeps the next decision grounded in performance data."] },
    ],
    keyTakeaways: ["Define the business outcome and lead-quality criteria before campaign activity begins.", "Connect targeting, creative, capture experience, and conversion tracking into one performance system.", "Use ongoing feedback and optimization to improve relevance over time."],
    faqs: [{ question: "Which channel is right for my business?", answer: "The right channel depends on the target audience, the customer journey, the offer, and the type of demand the business needs to capture." }, { question: "How do you measure campaign performance?", answer: "The most useful measurement connects campaign activity to agreed business outcomes and the quality of the leads or conversions generated." }],
    relatedSlugs: blogPosts.filter((item) => item.slug !== post.slug).slice(0, 3).map((item) => item.slug),
  };
}

export function getBlogDetail(slug?: string): BlogDetailContent {
  const post = blogPosts.find((item) => item.slug === slug) ?? blogPosts[0];
  return createDetail(post);
}
