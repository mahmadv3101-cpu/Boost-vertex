import { FormEvent, useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import { blogCategories, blogPosts } from "@/data/blogContent";
import { approvedContact } from "@/data/marketingContent";
import { MarketingFooter, MarketingHeader, MobileFastTrack } from "@/components/MarketingChrome";
import { Cloud, HeartPulse, Truck } from "lucide-react";
import { mergeBlogPost } from "@/lib/contentFallback";
import { contentService, type BlogPostContent } from "@/services/contentService";
import { engagementService } from "@/services/engagementService";

// Blog List style contract: desktop retains paired evidence cards; mobile shifts to a short image-led hero and single-column editorial card flow from the Figma frame.

const fastTrack = [
  ["Call", `tel:${approvedContact.phoneE164}`],
  ["Chat", approvedContact.whatsappUrl],
  ["Book", "#book-unavailable"],
  ["Inquiry", "/contact"],
] as const;

const trustedBrands = [
  { name: "MOVEPRO PAKISTAN", Icon: Truck },
  { name: "DR. WAQAS AHMAD", Icon: HeartPulse },
  { name: "WHIZPOOL", Icon: Cloud },
] as const;

export default function BlogList() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [posts, setPosts] = useState<BlogPostContent[]>(blogPosts);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    let active = true;
    contentService.listBlogPosts().then((response) => {
      if (!active || !response.data.length) return;
      setPosts(response.data.map((item) => {
        const fallback = blogPosts.find((post) => post.slug === item.slug) ?? {
          id: item.id || `blog-${Math.random().toString(36).slice(2)}`,
          slug: item.slug || "insight",
          category: item.category || "Insights",
          title: item.title || "Boost Vertex Insight",
          summary: item.summary || "Practical performance marketing guidance from Boost Vertex.",
          image: item.image || blogPosts[0].image,
          readTime: item.readTime || "",
        };
        return mergeBlogPost(fallback, item);
      }));
    }).catch(() => {
      if (active) setPosts(blogPosts);
    });
    return () => { active = false; };
  }, []);

  const categories = useMemo(() => Array.from(new Set(["All", ...blogCategories.filter((category) => category !== "All"), ...posts.map((post) => post.category)])), [posts]);

  const visiblePosts = useMemo(
    () => activeCategory === "All" ? posts : posts.filter((post) => post.category === activeCategory),
    [activeCategory, posts],
  );

  const subscribe = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setMessage("Enter a valid work email to subscribe.");
      return;
    }
    setIsSubscribing(true);
    try {
      const response = await engagementService.subscribeNewsletter({ email: email.trim(), source: "website" });
      setMessage(response.message || "You have been subscribed to the Vertex Brief.");
      setEmail("");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to subscribe right now. Please try again.");
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <main className="mv-blog-page">
      <MarketingHeader active="blog" />
      <section className="mv-blog-hero" aria-label="Boost Vertex blogs">
        <div className="mv-blog-hero__image" role="img" aria-label="Dark executive workspace overlooking a mountain valley" />
        <div className="mv-blog-hero__scrim" />
        <p className="mv-blog-hero__eyebrow">OUR BLOGS</p>
      </section>

      <section className="mv-blog-editorial mv-wrap" data-page-reveal>
        <div className="mv-blog-trust" aria-label="Confirmed client experience">
          <p>CONFIRMED CLIENT EXPERIENCE</p>
          <div>{trustedBrands.map(({ name, Icon }) => <span key={name}><Icon aria-hidden="true" />{name}</span>)}</div>
        </div>
        <aside className="mv-blog-fast-track" aria-label="Fast Track actions">
          <span>Fast Track</span>
          {fastTrack.map(([label, href]) => (
            <a key={label} href={href} aria-label={`${label} Boost Vertex`} data-action={`blog-fast-track-${label.toLowerCase()}`} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} onClick={(event) => {
              if (href === "#book-unavailable") {
                event.preventDefault();
                setMessage("Book a Call is currently unavailable. Please contact Boost Vertex on WhatsApp or use the enquiry form.");
              }
            }}>
              <img src={label === "Call" ? "/46-537.svg" : label === "Chat" ? "/46-542.svg" : label === "Book" ? "/46-547.svg" : "/46-552.svg"} alt="" />
            </a>
          ))}
        </aside>
        <div className="mv-blog-intro">
          <h1>Insights &amp; Growth Strategies</h1>
          <p>Practical guidance on Meta Ads, lead generation, SEO, and paid advertising for growth-focused businesses.</p>
        </div>

        <div className="mv-blog-filters" role="tablist" aria-label="Blog categories">
          {categories.map((category) => (
            <button key={category} type="button" role="tab" aria-selected={activeCategory === category} className={activeCategory === category ? "is-active" : ""} onClick={() => setActiveCategory(category)} data-action={`blog-filter-${category.toLowerCase().replaceAll(" ", "-")}`}>
              {category}
            </button>
          ))}
        </div>

        <div className="mv-blog-grid" aria-live="polite">
          {visiblePosts.map((post) => (
            <article className="mv-blog-card" key={post.id}>
              <img src={post.image} alt="" />
              <div>
                <div className="mv-blog-card__meta"><p>{post.category}</p><small>{post.readTime}</small></div>
                <h2>{post.title}</h2>
                <span>{post.summary}</span>
                <button type="button" data-action={`read-blog-${post.slug}`} onClick={() => setLocation(`/blog/${post.slug}`)}><span className="mv-blog-read-desktop">Read More</span><span className="mv-blog-read-mobile">Read Article</span> <b>→</b></button>
              </div>
            </article>
          ))}
        </div>

        <button type="button" className="mv-blog-load" data-action="load-more-posts" onClick={() => setMessage("More posts will load from the backend content service.")}>LOAD MORE ARTICLES <span>↓</span></button>
      </section>

      <section className="mv-blog-newsletter" data-page-reveal>
        <div className="mv-wrap mv-blog-newsletter__inner">
          <div><h2>Get smarter about<br />growth.</h2><span>Receive future Boost Vertex insights on customer acquisition, lead quality, and performance marketing.</span></div>
          <form onSubmit={subscribe} noValidate>
            <label className="mv-sr-only" htmlFor="blog-email">Work email</label>
            <div className="mv-blog-newsletter__fields"><input id="blog-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter your work email" disabled={isSubscribing} /><button type="submit" data-action="subscribe-vertex-brief" disabled={isSubscribing}>{isSubscribing ? "Subscribing..." : "Subscribe"}</button></div>
            <small>We respect your inbox. Unsubscribe at any time.</small>
          </form>
        </div>
      </section>

      <section className="mv-blog-conversion" data-page-reveal>
        <div className="mv-wrap"><h2>Ready to discuss your growth goals?</h2><p>Tell us about your business, your audience, and the customer-acquisition outcome you want to work toward.</p><a href={approvedContact.whatsappUrl} className="mv-button" data-action="blog-free-consultation" target="_blank" rel="noreferrer">Get a Free Consultation <span>→</span></a></div>
      </section>
      <MarketingFooter />
      <MobileFastTrack />
      <p className="mv-sr-status" aria-live="polite">{message}</p>
      <div className={`mv-action-feedback ${message ? "is-visible" : ""}`} role="status" aria-live="polite">{message}</div>
    </main>
  );
}
