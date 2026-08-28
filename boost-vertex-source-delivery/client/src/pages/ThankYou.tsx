import { BarChart3, BookOpen, Check, Mail, Rocket } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { MarketingHeader, MobileFastTrack } from "@/components/MarketingChrome";
import { approvedContact } from "@/data/marketingContent";

// Thank You style contract: centered confirmation ritual, restrained dark utility cards, a concentrated electric-lime call band, and a compact conversion-aware footer.

const waitCards = [
  { title: "Case Studies", copy: "Explore confirmed client work across transport and logistics, healthcare, and technology.", mobileTitle: "Case Studies", mobileCopy: "Explore confirmed Boost Vertex client work.", href: "/case-studies", Icon: BarChart3 },
  { title: "Services", copy: "Explore Meta Ads, lead generation, Google Ads, YouTube Ads, SEO, and web development.", mobileTitle: "Services", mobileCopy: "Explore our performance marketing services.", href: "/services", Icon: Rocket },
  { title: "Insights", copy: "Read practical guidance on Meta Ads, lead quality, SEO, and channel strategy.", mobileTitle: "Latest Insights", mobileCopy: "Read our latest performance marketing insights.", href: "/blog", Icon: BookOpen },
] as const;

const fastTrack = [
  { label: "Call", icon: "/46-537.svg", href: `tel:${approvedContact.phoneE164}` },
  { label: "Chat", icon: "/46-542.svg", href: approvedContact.whatsappUrl },
  { label: "Book", icon: "/46-547.svg", href: "#book-unavailable" },
  { label: "Inquiry", icon: "/46-552.svg", href: "/contact" },
] as const;

export default function ThankYou() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <main className="mv-thank-page">
      <MarketingHeader active="thank-you" />

      <section className="mv-thank-hero" aria-labelledby="thank-you-title">
        <div className="mv-wrap mv-thank-hero__inner">
          <div className="mv-thank-check" aria-hidden="true"><Check /></div>
          <h1 id="thank-you-title"><span className="mv-thank-desktop-copy">Thank You—We’ve Got<br />Your Request.</span><span className="mv-thank-mobile-copy">Thank You — We’ve Got Your Request.</span></h1>
          <p><span className="mv-thank-desktop-copy">Your request has been captured. For a faster response, contact Boost Vertex directly on WhatsApp at {approvedContact.phoneDisplay}.</span><span className="mv-thank-mobile-copy">For a faster response, contact us on WhatsApp.</span></p>
          <div className="mv-thank-hero__actions">
            <Link href="/" className="mv-button mv-button--compact" data-action="thank-you-back-home">Back to Home <span>→</span></Link>
            <Link href="/services" className="mv-thank-outline-button" data-action="thank-you-explore-services">Explore Our Services <span>→</span></Link>
          </div>
        </div>
        <aside className="mv-thank-fast-track" aria-label="Fast Track actions">
          <span>Fast Track</span>
          {fastTrack.map((item) => <a key={item.label} href={item.href} aria-label={`${item.label} Boost Vertex`} data-action={`thank-you-fast-track-${item.label.toLowerCase()}`} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined} onClick={(event) => { if (item.href === "#book-unavailable") { event.preventDefault(); setMessage("Book a Call is currently unavailable. Please contact Boost Vertex on WhatsApp or use the enquiry form."); } }}><img src={item.icon} alt="" /></a>)}
        </aside>
      </section>

      <section className="mv-thank-wait mv-wrap" aria-labelledby="while-you-wait-title">
        <h2 id="while-you-wait-title">While You Wait</h2>
        <div className="mv-thank-wait__grid">
          {waitCards.map(({ title, copy, mobileTitle, mobileCopy, href, Icon }) => (
            <Link key={title} href={href} className="mv-thank-wait__card" data-action={`thank-you-${title.toLowerCase().replaceAll(" ", "-")}`}>
              <Icon aria-hidden="true" />
              <h3><span className="mv-thank-desktop-copy">{title}</span><span className="mv-thank-mobile-copy">{mobileTitle}</span></h3>
              <p><span className="mv-thank-desktop-copy">{copy}</span><span className="mv-thank-mobile-copy">{mobileCopy}</span></p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mv-thank-callout" aria-label="Immediate call option">
        <div className="mv-thank-callout__inner">
          <div><h2><span className="mv-thank-desktop-copy">Ready to discuss your growth goals?</span><span className="mv-thank-mobile-copy">Ready to discuss your goals?</span></h2><p><span className="mv-thank-desktop-copy">Use the contact form to share your industry, required service, and the customer-acquisition outcome you want to work toward.</span><span className="mv-thank-mobile-copy">Share your business goals through the contact form.</span></p></div>
          <a href={approvedContact.whatsappUrl} className="mv-thank-callout__button" data-action="thank-you-free-consultation" target="_blank" rel="noreferrer"><span className="mv-thank-desktop-copy">Get a Free Consultation</span><span className="mv-thank-mobile-copy">WhatsApp Boost Vertex ↗</span></a>
        </div>
      </section>

      <footer className="mv-thank-footer" data-page-reveal>
        <div className="mv-wrap mv-thank-footer__grid">
          <div className="mv-thank-footer__brand">
            <Link href="/">Boost Vertex</Link>
            <p>Performance marketing built around Meta Ads, qualified leads, and measurable business outcomes.</p>
            <form onSubmit={(event) => { event.preventDefault(); setMessage(email.includes("@") ? "Subscription request is ready for backend connection." : "Enter a valid work email to subscribe."); }} noValidate>
              <label htmlFor="thank-you-email">Subscribe to our insights</label>
              <div><input id="thank-you-email" type="email" placeholder="Email address" value={email} onChange={(event) => setEmail(event.target.value)} /><button type="submit" data-action="thank-you-subscribe">Join</button></div>
            </form>
          </div>
          <div><h2>Services</h2><span>Meta Ads Management</span><span>Lead Generation</span><span>Google Ads</span><span>YouTube Ads</span><span>SEO</span><span>Web Development</span></div>
          <div><h2>Company</h2><Link href="/about">About Us</Link><Link href="/case-studies">Case Studies</Link><Link href="/blog">Insights</Link><Link href="/contact">Contact</Link></div>
          <div><h2>Connect</h2><a href={`mailto:${approvedContact.email}`}><Mail aria-hidden="true" /> {approvedContact.email}</a><a href={approvedContact.whatsappUrl} target="_blank" rel="noreferrer">WhatsApp: {approvedContact.phoneDisplay}</a><a href={approvedContact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></div>
        </div>
        <div className="mv-wrap mv-thank-footer__legal"><span>© 2024 Boost Vertex Digital. All rights reserved.</span><span><Link href="/privacy-policy">Privacy Policy</Link><a href="#terms" onClick={(event) => event.preventDefault()}>Terms of Service</a></span></div>
      </footer>

      <MobileFastTrack />
      <p className="mv-sr-status" aria-live="polite">{message}</p>
      <div className={`mv-action-feedback ${message ? "is-visible" : ""}`} role="status" aria-live="polite">{message}</div>
    </main>
  );
}
