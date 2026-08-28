import { useEffect, useState } from "react";
import { Link } from "wouter";
import { MarketingFooter, MarketingHeader, MobileFastTrack } from "@/components/MarketingChrome";
import { legalService, type LegalDocumentContent } from "@/services/legalService";

const policySections = [
  { id: "status", heading: "1. Policy Status", paragraphs: ["Boost Vertex’s formal Privacy Policy and related legal notices will be supplied by the client before public release. This page is a temporary placeholder and does not constitute a published legal policy."] },
  { id: "website-forms", heading: "2. Website Forms", paragraphs: ["Until the final policy and live backend are connected, website forms are presented for interface review. Do not rely on this temporary page for privacy, retention, or data-processing terms."] },
  { id: "updates", heading: "3. Updates", paragraphs: ["The final legal content, effective date, official privacy contact, and any applicable regional disclosures will be added when client-approved materials are provided."] },
] as const;

const fastTrack = [
  { label: "Call", icon: "/46-537.svg", href: "/contact" },
  { label: "Chat", icon: "/46-542.svg", href: "/contact" },
  { label: "Book", icon: "/46-547.svg", href: "/contact" },
  { label: "Inquiry", icon: "/46-552.svg", href: "/contact" },
] as const;

export default function PrivacyPolicy() {
  const [message, setMessage] = useState("");
  const [document, setDocument] = useState<LegalDocumentContent | null>(null);
  useEffect(() => {
    let active = true;
    legalService.getPublished("privacy-policy").then((response) => {
      if (active) setDocument(response);
    }).catch(() => {
      if (active) setDocument(null);
    });
    return () => { active = false; };
  }, []);
  const documentParagraphs = document?.content.split(/\n{2,}/).map((paragraph) => paragraph.trim()).filter(Boolean) || [];
  const effectiveDate = document?.effectiveDate ? new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(new Date(document.effectiveDate)) : null;
  return <main className="mv-privacy-page">
    <MarketingHeader active="privacy" />
    <section className="mv-privacy-hero" aria-labelledby="privacy-title"><div className="mv-wrap mv-privacy-hero__panel"><h1 id="privacy-title">{document?.title || "Privacy Policy"}</h1><p>{document ? `Version ${document.version}` : "Client-approved legal content is pending publication."}</p><time>{document ? `Effective ${effectiveDate || "date not specified"}` : "Policy text to be provided by Boost Vertex"}</time></div></section>
    <section className="mv-privacy-body mv-wrap" aria-label="Boost Vertex privacy policy status"><div className="mv-privacy-layout">
      <aside className="mv-privacy-toc" aria-label="Privacy policy table of contents"><p>TABLE OF CONTENTS</p><nav>{document ? <><a href="#published-policy">Published Policy</a><a href="#contact-privacy">Contact</a></> : <>{policySections.map((section) => <a key={section.id} href={`#${section.id}`}>{section.heading}</a>)}<a href="#contact-privacy">4. Contact</a></>}</nav></aside>
      <article className="mv-privacy-article">{document ? <section id="published-policy"><h2>{document.title}</h2>{documentParagraphs.map((paragraph, index) => <p key={`${index}-${paragraph.slice(0, 24)}`}>{paragraph}</p>)}</section> : policySections.map((section) => <section id={section.id} key={section.id}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}<section className="mv-privacy-contact" id="contact-privacy"><div><h2>{document ? "Privacy Contact" : "Contact Details Pending"}</h2><p>{document ? "For privacy questions or requests, please contact the Boost Vertex team through the approved contact form." : "Official privacy and legal contact details will be added when the client provides them."}</p><Link href="/contact">Open the contact form</Link></div><Link href="/contact" className="mv-button mv-button--compact" data-action="contact-privacy-team">Contact Boost Vertex <span>→</span></Link></section></article>
    </div><aside className="mv-privacy-fast-track" aria-label="Fast Track actions"><span>Fast Track</span>{fastTrack.map((item) => <Link key={item.label} href={item.href} aria-label={`${item.label} Boost Vertex`} data-action={`privacy-fast-track-${item.label.toLowerCase()}`} onClick={() => setMessage(`${item.label} opens the contact form.`)}><img src={item.icon} alt="" /></Link>)}</aside></section>
    <MarketingFooter variant="privacy" /><MobileFastTrack /><p className="mv-sr-status" aria-live="polite">{message}</p><div className={`mv-action-feedback ${message ? "is-visible" : ""}`} role="status" aria-live="polite">{message}</div>
  </main>;
}
