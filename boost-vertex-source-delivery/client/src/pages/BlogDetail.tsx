import { ArrowLeft, ArrowRight, ChevronDown, Clock3, Mail, Share2 } from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRoute } from "wouter";
import { MarketingFooter, MarketingHeader, MobileFastTrack } from "@/components/MarketingChrome";
import { blogPosts, getBlogDetail } from "@/data/blogContent";
import { approvedContact } from "@/data/marketingContent";
import { mergeBlogDetail } from "@/lib/contentFallback";
import { contentService, type BlogDetailContent } from "@/services/contentService";
import { engagementService } from "@/services/engagementService";
import "./BlogDetail.css";

// Blog Detail Figma contract: dark editorial reading room, lime technical markers, pinned contents rail, sparse data callouts, and contained conversion modules.

const fastTrackActions = [
  { label: "Call", icon: "/46-537.svg", href: `tel:${approvedContact.phoneE164}` },
  { label: "Chat", icon: "/46-542.svg", href: approvedContact.whatsappUrl },
  { label: "Book", icon: "/46-547.svg", href: "/contact" },
  { label: "Inquiry", icon: "/46-552.svg", href: "/contact" },
] as const;

export default function BlogDetail() {
  const [, params] = useRoute("/blog/:slug");
  const fallbackPost = useMemo(() => getBlogDetail(params?.slug), [params?.slug]);
  const [post, setPost] = useState<BlogDetailContent>(fallbackPost);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [tocOpen, setTocOpen] = useState(false);
  const [comment, setComment] = useState({ text: "", name: "", email: "", website: "", saveDetails: false });
  const [isSubmittingNewsletter, setIsSubmittingNewsletter] = useState(false);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const relatedPosts = useMemo(() => post.relatedSlugs.map((slug) => blogPosts.find((item) => item.slug === slug)).filter((item): item is (typeof blogPosts)[number] => Boolean(item)), [post.relatedSlugs]);

  useEffect(() => {
    let active = true;
    setPost(fallbackPost);
    if (!params?.slug) return () => { active = false; };
    contentService.getBlogPost(params.slug).then((response) => {
      if (active) setPost(mergeBlogDetail(fallbackPost, response));
    }).catch(() => {
      if (active) setPost(fallbackPost);
    });
    return () => { active = false; };
  }, [fallbackPost, params?.slug]);

  const submitNewsletter = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setMessage("Enter a valid work email to receive the briefing.");
      return;
    }
    setIsSubmittingNewsletter(true);
    try {
      const response = await engagementService.subscribeNewsletter({ email: email.trim(), source: "website" });
      setEmail("");
      setMessage(response.message || "You have been subscribed to the Vertex Brief.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to subscribe right now. Please try again.");
    } finally {
      setIsSubmittingNewsletter(false);
    }
  };

  const submitComment = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!comment.text.trim() || !comment.name.trim() || !comment.email.includes("@")) {
      setMessage("Please add a comment, your name, and a valid email address.");
      return;
    }
    if (!post.id) {
      setMessage("This article is not available for comments right now.");
      return;
    }
    setIsSubmittingComment(true);
    try {
      const response = await engagementService.submitBlogComment(post.id, { name: comment.name.trim(), email: comment.email.trim(), comment: comment.text.trim() });
      setComment({ text: "", name: "", email: "", website: "", saveDetails: false });
      setMessage(response.message || "Your comment has been submitted for moderation.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to submit your comment right now. Please try again.");
    } finally {
      setIsSubmittingComment(false);
    }
  };

  return (
    <main className="mv-blog-detail-page">
      <MarketingHeader active="blog" />

      <section className="mv-blog-detail-hero" data-page-reveal>
        <div className="mv-wrap">
          <a href="/blog" className="mv-blog-detail-back"><ArrowLeft aria-hidden="true" /> All Articles</a>
          <p>{post.eyebrow}</p>
          <h1>{post.title}</h1>
          <div className="mv-blog-detail-meta">{post.author.image ? <img src={post.author.image} alt="" /> : <i aria-hidden="true" />}<div><strong>{post.author.name}</strong><span>{post.author.role}</span></div><i /><div><strong>{post.publishedDate}</strong><span><Clock3 aria-hidden="true" /> {post.readTime}</span></div></div>
        </div>
      </section>

      <section className="mv-blog-detail-mobile-toc" aria-label="Table of Contents">
        <button type="button" aria-expanded={tocOpen} onClick={() => setTocOpen(!tocOpen)} data-action="blog-mobile-table-of-contents"><span>Table of Contents</span><ChevronDown aria-hidden="true" /></button>
        {tocOpen && <nav>{post.sections.map((section) => <a key={section.id} href={`#${section.id}`} onClick={() => setTocOpen(false)}>{section.title.replace(/^Phase \d: /, "")}</a>)}<a href="#takeaways" onClick={() => setTocOpen(false)}>Key Takeaways</a></nav>}
      </section>

      <section className="mv-blog-detail-lead mv-wrap" data-page-reveal>
        <img src={post.leadImage} alt="Abstract electric-green network representing connected SaaS systems" />
      </section>

      <section className="mv-blog-detail-shell mv-wrap">
        <aside className="mv-blog-detail-rail" aria-label="Article contents">
          <small>IN THIS ARTICLE</small>
          {post.sections.map((section, index) => <a key={section.id} href={`#${section.id}`} className={index === 0 ? "is-active" : ""}>{section.title.replace(/^Phase \d: /, "")}</a>)}
          <a href="#takeaways">Key Takeaways</a>
          <button type="button" onClick={() => setMessage("Share action is ready for backend connection.")} data-action="share-blog-post"><Share2 aria-hidden="true" /> Share Article</button>
        </aside>

        <article className="mv-blog-detail-article">
          <p className="mv-blog-detail-article__intro">{post.intro}</p>
          {post.sections.map((section) => (
            <section id={section.id} key={section.id} data-page-reveal>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets && <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}
              {section.stat && <div className="mv-blog-detail-stat"><div><strong>{section.stat.primary}</strong><span>{section.stat.primaryLabel}</span></div><div><strong>{section.stat.secondary}</strong><span>{section.stat.secondaryLabel}</span></div></div>}
            </section>
          ))}
        </article>
      </section>

      <section id="takeaways" className="mv-blog-detail-takeaways" data-page-reveal>
        <div className="mv-wrap"><h2>Key Takeaways</h2><div>{post.keyTakeaways.map((item) => <p key={item}>{item}</p>)}</div></div>
      </section>

      <section className="mv-blog-detail-solutions" data-page-reveal>
        <div className="mv-wrap"><h2>Related Solutions</h2><div>{[{ title: "Meta Ads Management", href: "/services/meta-ads-management" }, { title: "Lead Generation", href: "/services/lead-generation" }, { title: "Google Ads", href: "/services/google-ads" }].map((solution) => <a key={solution.title} href={solution.href} data-action={`blog-solution-${solution.title.toLowerCase().replaceAll(" ", "-")}`}>{solution.title}<ArrowRight aria-hidden="true" /></a>)}</div></div>
      </section>

      <section className="mv-blog-detail-comment mv-wrap" data-page-reveal>
        <form onSubmit={submitComment} noValidate><h2>Leave a Comment</h2><p>Your email address will not be published. Required fields are marked *</p><label>Comment<textarea value={comment.text} onChange={(event) => setComment({ ...comment, text: event.target.value })} placeholder="Type here..." required disabled={isSubmittingComment} /></label><div className="mv-blog-detail-comment__row"><label>Name*<input value={comment.name} onChange={(event) => setComment({ ...comment, name: event.target.value })} required disabled={isSubmittingComment} /></label><label>Email*<input type="email" value={comment.email} onChange={(event) => setComment({ ...comment, email: event.target.value })} required disabled={isSubmittingComment} /></label></div><label>Website (Optional)<input value={comment.website} onChange={(event) => setComment({ ...comment, website: event.target.value })} disabled={isSubmittingComment} /></label><label className="mv-blog-detail-comment__checkbox"><input type="checkbox" checked={comment.saveDetails} onChange={(event) => setComment({ ...comment, saveDetails: event.target.checked })} disabled={isSubmittingComment} /> <span>Save my name, email, and website in this browser for the next time I comment.</span></label><button type="submit" data-action="blog-post-comment" disabled={isSubmittingComment}>{isSubmittingComment ? "Submitting..." : "Post Comment"}</button></form>
      </section>

      <section className="mv-blog-detail-newsletter mv-wrap" data-page-reveal>
        <div><p>THE VERTEX BRIEF</p><h2>Get smarter about growth.</h2><span>Weekly strategy teardowns and practical marketing insight for ambitious operators.</span></div>
        <form onSubmit={submitNewsletter} noValidate><label className="mv-sr-only" htmlFor="blog-detail-email">Work email</label><div><input id="blog-detail-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter your work email" disabled={isSubmittingNewsletter} /><button type="submit" data-action="blog-detail-subscribe" disabled={isSubmittingNewsletter}>{isSubmittingNewsletter ? "Subscribing..." : "Subscribe"} <Mail aria-hidden="true" /></button></div><small>We respect your inbox. Unsubscribe at any time.</small></form>
      </section>

      <section className="mv-blog-detail-related mv-wrap" data-page-reveal>
        <div className="mv-blog-detail-related__head"><div><p>KEEP READING</p><h2>Related Articles</h2></div><a href="/blog">View All <ArrowRight aria-hidden="true" /></a></div>
        <div>{relatedPosts.map((related) => <a key={related.id} href={`/blog/${related.slug}`} className="mv-blog-detail-related__card" data-action={`related-blog-${related.slug}`}><img src={related.image} alt="" /><span>{related.category}</span><h3>{related.title}</h3><small>{related.readTime}</small></a>)}</div>
      </section>

      <section className="mv-blog-detail-convert mv-wrap" data-page-reveal><div><h2>Ready to discuss your project?</h2><p>Tell us about your business requirement and the customer-acquisition outcome you want to work toward.</p></div><a href={approvedContact.whatsappUrl} className="mv-button mv-button--dark" data-action="blog-detail-free-consultation" target="_blank" rel="noreferrer">Get a Free Consultation <ArrowRight aria-hidden="true" /></a></section>

      <MarketingFooter />
      <MobileFastTrack />
      <p className="mv-sr-status" aria-live="polite">{message}</p>
      <div className={`mv-action-feedback ${message ? "is-visible" : ""}`} role="status" aria-live="polite">{message}</div>
    </main>
  );
}
