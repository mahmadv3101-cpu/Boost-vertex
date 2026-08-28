import { useState } from "react";
import { Link } from "wouter";
import { approvedContact } from "@/data/marketingContent";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";

// Marketing chrome style contract: compact obsidian navigation, electric-lime conversion accents,
// Chivo display typography, accessible mobile routing, and route-scoped footer variants that preserve approved pages.

type ActiveRoute = "services" | "case-studies" | "about" | "blog" | "contact" | "privacy" | "thank-you" | "industry";

function normalizePhone(value?: string) {
  if (!value) return "";
  const digits = value.replace(/\D/g, "");
  if (digits.startsWith("0")) return `+92${digits.slice(1)}`;
  return value.startsWith("+") ? value : `+${digits}`;
}

function useContactActions() {
  const { settings } = useSiteSettings();
  const rawPhone = settings?.whatsapp || settings?.phone;
  const e164 = normalizePhone(rawPhone) || approvedContact.phoneE164;
  const whatsappUrl = rawPhone ? `https://wa.me/${e164.replace(/\D/g, "")}` : approvedContact.whatsappUrl;
  return {
    email: settings?.salesEmail || settings?.email || approvedContact.email,
    phoneDisplay: settings?.phone || approvedContact.phoneDisplay,
    phoneE164: e164,
    whatsappUrl,
    linkedin: settings?.socialLinks?.linkedin || approvedContact.linkedin,
  };
}

export function MarketingHeader({ active }: { active?: ActiveRoute }) {
  const [isOpen, setIsOpen] = useState(false);
  const contact = useContactActions();

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="mv-header">
      <div className="mv-header__inner">
        <Link href="/" className="mv-brand" aria-label="Boost Vertex home"><span className="mv-brand__mark" aria-hidden="true"><img src="/assets/managed/boost-vertex-logo-2026_bf191d1a.jpeg" alt="" /></span><span>BOOST VERTEX</span></Link>
        <nav className="mv-nav" aria-label="Primary navigation">
          <Link href="/services" aria-current={active === "services" ? "page" : undefined}>Services</Link>
          <Link href="/industries/industries" aria-current={active === "industry" ? "page" : undefined}>Industries</Link>
          <Link href="/case-studies" aria-current={active === "case-studies" ? "page" : undefined}>Case Studies</Link>
          <Link href="/blog" aria-current={active === "blog" ? "page" : undefined}>Blog</Link>
          <Link href="/about" aria-current={active === "about" ? "page" : undefined}>About</Link>
          <Link href="/contact" aria-current={active === "contact" ? "page" : undefined}>Contact</Link>
        </nav>
        <div className="mv-header__actions">
          <span>Pakistan · UAE · Saudi Arabia</span>
          <a href={contact.whatsappUrl} className="mv-button mv-button--compact" data-action="free-consultation-whatsapp" target="_blank" rel="noreferrer">Get a Free Consultation</a>
        </div>
        <button className="mv-menu-toggle" type="button" aria-label="Toggle primary navigation" aria-expanded={isOpen} onClick={() => setIsOpen((open) => !open)}>
          <span /><span /><span />
        </button>
      </div>
      <nav className={`mv-mobile-nav ${isOpen ? "is-open" : ""}`} aria-label="Mobile primary navigation">
        <Link href="/" onClick={closeMenu}>Home</Link>
        <Link href="/services" onClick={closeMenu}>Services</Link>
        <Link href="/industries/industries" onClick={closeMenu}>Industries</Link>
        <Link href="/case-studies" onClick={closeMenu}>Case Studies</Link>
        <Link href="/blog" onClick={closeMenu}>Blog</Link>
        <Link href="/about" onClick={closeMenu}>About</Link>
        <Link href="/contact" onClick={closeMenu}>Contact</Link>
        <a href={contact.whatsappUrl} className="mv-button" data-action="free-consultation-whatsapp" target="_blank" rel="noreferrer" onClick={closeMenu}>Get a Free Consultation</a>
      </nav>
    </header>
  );
}

export function MarketingFooter({ variant = "default" }: { variant?: "default" | "services" | "privacy" }) {
  const isServices = variant === "services";
  const isPrivacy = variant === "privacy";
  const contact = useContactActions();

  return (
    <footer className={`mv-footer ${isServices ? "mv-footer--services" : ""} ${isPrivacy ? "mv-footer--privacy" : ""}`} data-page-reveal>
      <div className="mv-wrap mv-footer__grid">
        <div className="mv-footer__brand">
          <Link href="/">BOOST VERTEX</Link>
          <p>Performance marketing built around Meta Ads, qualified leads, and measurable business outcomes.</p>
        </div>
        <div>
          <h2>SERVICES</h2>
          <Link href="/services/meta-ads-management">Meta Ads Management</Link>
          <Link href="/services/lead-generation">Lead Generation</Link>
          <Link href="/services/google-ads">Google Ads</Link>
          <Link href="/services/youtube-ads">YouTube Ads</Link>
          <Link href="/services/seo">SEO</Link>
          <Link href="/services/web-development">Web Development</Link>
          {isServices && <div className="mv-footer__mobile-copy"><span>Meta Ads Management</span><span>Lead Generation</span><span>Google Ads</span><span>YouTube Ads</span><span>SEO</span><span>Web Development</span></div>}
        </div>
        <div>
          <h2>COMPANY</h2>
          <Link href="/about">About Us</Link>
          <Link href="/case-studies">Case Studies</Link>
          <Link href="/blog">Resources</Link>
          <Link href="/contact">Contact</Link>
          {isServices && <div className="mv-footer__mobile-copy"><Link href="/about">About Us</Link><a href="/#careers">Careers</a><Link href="/case-studies">Case Studies</Link><Link href="/contact">Contact</Link></div>}
        </div>
        <div>
          <h2>CONNECT</h2>
          <a className={isPrivacy ? "mv-footer__privacy-standard-link" : undefined} href={`mailto:${contact.email}`}>{contact.email}</a>
          <a className={isPrivacy ? "mv-footer__privacy-standard-link" : undefined} href={`tel:${contact.phoneE164}`}>{contact.phoneDisplay}</a>
          <a className={isPrivacy ? "mv-footer__privacy-standard-link" : undefined} href={contact.whatsappUrl} target="_blank" rel="noreferrer">WhatsApp Boost Vertex</a>
          <a className={isPrivacy ? "mv-footer__privacy-standard-link" : undefined} href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          {isPrivacy && <><Link className="mv-footer__privacy-mobile-link" href="/privacy-policy">Privacy Policy</Link><a className="mv-footer__privacy-mobile-link" href="#terms" onClick={(event) => event.preventDefault()}>Terms of Service</a></>}
        </div>
      </div>
      <div className="mv-wrap mv-footer__legal">© 2026 Boost Vertex Digital. All rights reserved.{isServices && <span className="mv-footer__mobile-legal-links"><a href="/#privacy">Privacy Policy</a><a href="/#terms">Terms of Service</a></span>}</div>
    </footer>
  );
}

export function MobileFastTrack() {
  const [active, setActive] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const contact = useContactActions();
  const fastTrackActions = [
    { label: "Call", icon: "/46-537.svg", href: `tel:${contact.phoneE164}` },
    { label: "Chat", icon: "/46-542.svg", href: contact.whatsappUrl },
    { label: "Book", icon: "/46-547.svg", href: null },
    { label: "Inquiry", icon: "/46-552.svg", href: "/contact" },
  ] as const;

  return (
    <>
      <aside className="mv-mobile-fast-track" aria-label="Fast Track actions">
        {fastTrackActions.map((item) => (
          <button
            key={item.label}
            type="button"
            aria-label={`${item.label} Boost Vertex`}
            aria-pressed={active === item.label}
            data-action={`mobile-fast-track-${item.label.toLowerCase()}`}
            onClick={() => {
              setActive(item.label);
              if (item.href) {
                window.location.assign(item.href);
                return;
              }
              setMessage("Book a Call is currently unavailable. Please contact us on WhatsApp or use the enquiry form.");
            }}
          >
            <img src={item.icon} alt="" aria-hidden="true" />
            <span>{item.label.toUpperCase()}</span>
          </button>
        ))}
      </aside>
      <p className="mv-sr-status" aria-live="polite">{message}</p>
      <div className={`mv-action-feedback ${message ? "is-visible" : ""}`} role="status" aria-live="polite">{message}</div>
    </>
  );
}
