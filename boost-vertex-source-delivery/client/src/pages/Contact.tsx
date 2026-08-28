import { FormEvent, useCallback, useEffect, useState } from "react";
import { BarChart3, Globe2, Headphones, Mail, MapPin, Phone, Search, TrendingUp } from "lucide-react";
import { MarketingFooter, MarketingHeader, MobileFastTrack } from "@/components/MarketingChrome";
import { approvedContact } from "@/data/marketingContent";
import { contactService } from "@/services/contactService";
import { contentService, type SiteSettingsContent } from "@/services/contentService";
import { RecaptchaCheckbox } from "@/components/RecaptchaCheckbox";

// Contact style contract: an olive technical desktop system and a compact mobile operations flow; desktop asymmetry and mobile single-column evidence hierarchy are kept intentionally distinct.

const fastTrack = [
  ["Call", `tel:${approvedContact.phoneE164}`, "/46-537.svg"],
  ["Chat", approvedContact.whatsappUrl, "/46-542.svg"],
  ["Book", "#book-unavailable", "/46-547.svg"],
  ["Inquiry", "#contact-form", "/46-552.svg"],
] as const;

const initialForm = { fullName: "", phoneOrWhatsApp: "", emailAddress: "", company: "", requiredService: "", monthlyBudget: "", projectDetails: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [siteSettings, setSiteSettings] = useState<SiteSettingsContent | null>(null);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [recaptchaError, setRecaptchaError] = useState("");
  const [recaptchaResetKey, setRecaptchaResetKey] = useState(0);

  useEffect(() => {
    let isCurrent = true;
    contentService.getSiteSettings().then((settings) => {
      if (isCurrent) setSiteSettings(settings);
    }).catch(() => {
      if (isCurrent) setSiteSettings(null);
    });
    return () => { isCurrent = false; };
  }, []);

  const contact = {
    email: siteSettings?.salesEmail || siteSettings?.email || approvedContact.email,
    phoneDisplay: siteSettings?.phone || approvedContact.phoneDisplay,
    address: siteSettings?.address || approvedContact.address,
    hours: siteSettings?.workingHours || approvedContact.hours,
  };

  const update = (key: keyof typeof initialForm, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const handleRecaptchaToken = useCallback((token: string) => {
    setRecaptchaToken(token);
    if (token) setRecaptchaError("");
  }, []);
  const handleRecaptchaError = useCallback((value: string) => setRecaptchaError(value), []);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.fullName.trim() || !form.phoneOrWhatsApp.trim() || !form.emailAddress.includes("@") || !form.company.trim() || !form.requiredService || !form.projectDetails.trim()) {
      setMessage("Please complete your name, email, phone or WhatsApp, company, required service, and project details.");
      return;
    }
    if (recaptchaError) {
      setMessage(recaptchaError);
      return;
    }
    if (import.meta.env.VITE_RECAPTCHA_SITE_KEY && !recaptchaToken) {
      setMessage("Please complete the security verification before submitting your enquiry.");
      return;
    }
    setIsSubmitting(true);
    try {
      await contactService.submitContactRequest({
        fullName: form.fullName.trim(),
        phoneNumber: form.phoneOrWhatsApp.trim(),
        emailAddress: form.emailAddress.trim(),
        company: form.company.trim(),
        serviceInterest: form.requiredService,
        monthlyBudget: form.monthlyBudget || undefined,
        strategicQuery: form.projectDetails.trim(),
        recaptchaToken: recaptchaToken || undefined,
      });
      setMessage("Thank you. Your project enquiry has been submitted successfully.");
      setForm(initialForm);
      setRecaptchaToken("");
      setRecaptchaError("");
      setRecaptchaResetKey((current) => current + 1);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Your enquiry could not be sent. Please try again or contact us on WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="mv-contact-page">
      <MarketingHeader active="contact" />
      <section className="mv-contact-hero" aria-labelledby="contact-title">
        <div className="mv-contact-hero__wash" aria-hidden="true" />
        <div className="mv-wrap mv-contact-hero__copy">
          <p className="mv-eyebrow">CONTACT</p>
          <h1 id="contact-title">Contact Us</h1>
          <p>Tell us about your business goals, the customers you want to acquire, and the service you need.</p>
        </div>
        <aside className="mv-contact-fast-track" aria-label="Fast Track actions">
          <span>Fast Track</span>
          {fastTrack.map(([label, href, icon]) => <a key={label} href={href} aria-label={`${label} Boost Vertex`} data-action={`contact-fast-track-${label.toLowerCase()}`} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} onClick={(event) => {
            if (href === "#contact-form") { event.preventDefault(); document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" }); }
            if (href === "#book-unavailable") { event.preventDefault(); setMessage("Book a Call is currently unavailable. Please contact Boost Vertex on WhatsApp or by phone."); }
          }}><img src={icon} alt="" /></a>)}
        </aside>
      </section>

      <section className="mv-contact-intake mv-wrap" data-page-reveal>
        <div className="mv-contact-intake__copy">
          <h2>Tell Us About Your Goals</h2>
          <i aria-hidden="true" />
          <p>Boost Vertex helps businesses across Pakistan, the UAE and Saudi Arabia acquire customers through Meta Ads, lead generation, and data-driven paid advertising.</p>
          <p>Share the context that matters: your industry, required service, current goal, and the type of customer you want to reach.</p>
          <p className="mv-contact-intake__mobile-copy">Complete the form or contact us directly through WhatsApp for the fastest response.</p>
          <div className="mv-contact-channel-list"><div><span><BarChart3 aria-hidden="true" /></span><div><strong>PERFORMANCE MARKETING</strong><small>Meta Ads and qualified lead generation</small></div></div><div><span><Headphones aria-hidden="true" /></span><div><strong>PREFERRED CONTACT</strong><small>WhatsApp: {contact.phoneDisplay}</small></div></div></div>
        </div>
        <form id="contact-form" className="mv-contact-form" onSubmit={submit} noValidate>
          <h2>Discuss Your Project</h2>
          <div className="mv-contact-form__two"><label><span>FULL NAME</span><input value={form.fullName} onChange={(event) => update("fullName", event.target.value)} placeholder="Enter full name" /></label><label><span>PHONE / WHATSAPP</span><input value={form.phoneOrWhatsApp} onChange={(event) => update("phoneOrWhatsApp", event.target.value)} placeholder="Enter phone or WhatsApp" /></label></div>
          <label><span>EMAIL ADDRESS</span><input type="email" value={form.emailAddress} onChange={(event) => update("emailAddress", event.target.value)} placeholder="Enter email address" /></label>
          <label><span>COMPANY</span><input value={form.company} onChange={(event) => update("company", event.target.value)} placeholder="Enter company name" /></label>
          <div className="mv-contact-form__two"><label><span>REQUIRED SERVICE</span><select value={form.requiredService} onChange={(event) => update("requiredService", event.target.value)}><option value="">Select a service</option><option>Meta Ads Management</option><option>Lead Generation</option><option>Google Ads</option><option>YouTube Ads</option><option>SEO</option><option>Web Development</option></select></label><label><span>MONTHLY MARKETING BUDGET</span><select value={form.monthlyBudget} onChange={(event) => update("monthlyBudget", event.target.value)}><option value="">Select a budget range</option><option>Under PKR 50,000</option><option>PKR 50,000–100,000</option><option>PKR 100,000–250,000</option><option>PKR 250,000–500,000</option><option>PKR 500,000+</option></select></label></div>
          <label><span>MESSAGE / BUSINESS REQUIREMENT</span><textarea value={form.projectDetails} onChange={(event) => update("projectDetails", event.target.value)} placeholder="Tell us about your business requirement" /></label>
          <RecaptchaCheckbox onTokenChange={handleRecaptchaToken} onLoadError={handleRecaptchaError} resetKey={recaptchaResetKey} />
          <button type="submit" data-action="initialize-contact" disabled={isSubmitting}><span className="mv-contact-submit__desktop">{isSubmitting ? "SENDING..." : "INITIALIZE CONTACT"}</span><span className="mv-contact-submit__mobile">{isSubmitting ? "SENDING..." : "SEND"}</span><i className="mv-contact-submit__desktop-icon" aria-hidden="true">→</i></button>
          <small><span className="mv-contact-form__desktop-note">For a faster response, contact Boost Vertex directly on WhatsApp at {contact.phoneDisplay}.</span><span className="mv-contact-form__mobile-note">WhatsApp is the preferred contact method.</span></small>
        </form>
      </section>

      <section className="mv-contact-status" data-page-reveal>
        <div className="mv-wrap">
          <h2>Contact Details</h2><p>GET IN TOUCH WITH BOOST VERTEX</p>
          <div className="mv-contact-status__grid">
            <div><span><Mail aria-hidden="true" /></span><p><strong>EMAIL</strong><small>{contact.email}</small></p></div>
            <div><span><Phone aria-hidden="true" /></span><p><strong>PHONE / WHATSAPP</strong><small>{contact.phoneDisplay}</small></p></div>
            <div><span><MapPin aria-hidden="true" /></span><p><strong>ADDRESS & HOURS</strong><small>{contact.address} · {contact.hours}</small></p></div>
          </div>
        </div>
      </section>

      <section className="mv-contact-protocol mv-wrap" data-page-reveal>
        <h2>Protocol: Next Steps</h2>
        <div className="mv-contact-protocol__grid">
          <article><span><Search aria-hidden="true" /></span><h3>01. Data Review</h3><p><span className="mv-contact-protocol__desktop-copy">Our analysts parse your current performance signals and establish a clear benchmark.</span><span className="mv-contact-protocol__mobile-copy">Our analysts parse your initial submission against our performance benchmarks within 24 hours.</span></p></article>
          <article><span><Headphones aria-hidden="true" /></span><h3>02. Alignment Call</h3><p><span className="mv-contact-protocol__desktop-copy">We align priorities, operating constraints, and the commercial context behind your goals.</span><span className="mv-contact-protocol__mobile-copy">A 30-minute high-density strategic briefing to confirm viability and scope.</span></p></article>
          <article><span><TrendingUp aria-hidden="true" /></span><h3>03. Growth Plan</h3><p><span className="mv-contact-protocol__desktop-copy">Deployment of a custom performance architecture designed for measurable momentum.</span><span className="mv-contact-protocol__mobile-copy">Deployment of a custom, phased tactical architecture designed for immediate impact.</span></p></article>
        </div>
      </section>
      <section className="mv-contact-operations" data-page-reveal aria-label="Global Operations Center">
        <div>
          <span><Globe2 aria-hidden="true" /></span>
          <strong>GLOBAL OPERATIONS CENTER</strong>
          <p>Interactive mapping module offline. Connect via secure<br />protocols above to schedule an on-site briefing.</p>
        </div>
      </section>
      <MarketingFooter />
      <MobileFastTrack />
      <p className="mv-sr-status" aria-live="polite">{message}</p>
      <div className={`mv-action-feedback ${message ? "is-visible" : ""}`} role="status" aria-live="polite">{message}</div>
    </main>
  );
}
