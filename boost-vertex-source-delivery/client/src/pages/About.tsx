import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { approvedContact, approvedFounderStory } from "@/data/marketingContent";
import { contentService } from "@/services/contentService";

// Boost Vertex About Page style contract: obsidian editorial canvas, electric-lime conversion accents,
// Chivo display hierarchy, grayscale people photography, asymmetric hero, and compact data-led cards.

const team = [{ name: "Tayyab Riaz", role: "Founder, Boost Vertex", summary: "Boost Vertex was founded to help businesses turn digital marketing into real business opportunities." }];

const principles = [
  {
    icon: "◎",
    title: "Outcomes Over Activity",
    mobileTitle: "Data-Driven Precision",
    copy: "We don’t just execute tasks. Every action is tied to a measurable goal.",
  },
  {
    icon: "↯",
    title: "Strategy Before Spend",
    copy: "Deep analysis precedes execution. We align campaigns with your overarching business objectives first.",
  },
  {
    icon: "◉",
    title: "Transparent Reporting",
    copy: "Clear, accessible dashboards show exactly where your budget is going and the returns it generates.",
  },
  {
    icon: "↗",
    title: "Continuous Optimization",
    copy: "The market changes, and so do we. Constant A/B testing and refinement ensure peak performance.",
  },
];

const process = [
  {
    number: "01",
    title: "Strategy First",
    copy: "We start with business goals, audience insight, and the right growth opportunity.",
  },
  {
    number: "02",
    title: "Test & Learn",
    copy: "We continuously test campaigns, creative, messaging, and channels.",
  },
  {
    number: "03",
    title: "Transparent Reporting",
    copy: "Clear reporting keeps decisions focused on what actually matters.",
  },
  {
    number: "04",
    title: "Shared Accountability",
    copy: "We work as an extension of the client team and stay focused on outcomes.",
  },
];

const heroRail = [
  { label: "Call", icon: "/46-537.svg", href: `tel:${approvedContact.phoneE164}` },
  { label: "Chat", icon: "/46-542.svg", href: approvedContact.whatsappUrl },
  { label: "Book", icon: "/46-547.svg", href: null },
  { label: "Inquiry", icon: "/46-552.svg", href: "/contact" },
];

const trustedBrands = [
  { name: "MOVEPRO PAKISTAN", mark: "cube", mobileSymbol: "◉" },
  { name: "DR. WAQAS AHMAD", mark: "bank", mobileSymbol: "♜" },
  { name: "WHIZPOOL", mark: "cloud", mobileSymbol: "☁" },
] as const;

const mobileTrustedBrands = [{ name: "MOVEPRO PAKISTAN", mark: "acme" }, { name: "DR. WAQAS AHMAD", mark: "globex" }, { name: "WHIZPOOL", mark: "initech" }] as const;

function TrustMark({ mark }: { mark: (typeof trustedBrands)[number]["mark"] }) {
  if (mark === "cube") return <svg className="about-trust__mark" viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 8 4.6v9.1L12 22 4 15.7V6.6L12 2Z" /><path d="m4 6.6 8 4.7 8-4.7M12 11.3V22" /></svg>;
  if (mark === "bank") return <svg className="about-trust__mark" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9 12 3l9 6M4 10h16M5 10v8m4-8v8m6-8v8m4-8v8M3 21h18" /></svg>;
  if (mark === "cloud") return <svg className="about-trust__mark" viewBox="0 0 24 24" aria-hidden="true"><path d="M7.2 18.5h10.1a4.2 4.2 0 0 0 .7-8.3A6.3 6.3 0 0 0 6 8.1a5.2 5.2 0 0 0 1.2 10.4Z" /></svg>;
  if (mark === "chart") return <svg className="about-trust__mark" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20V12m5 8V8m5 12v-6m5 6V4" /><path d="m3 11 5-4 5 3 7-7" /></svg>;
  return <svg className="about-trust__mark" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 20 5v6c0 5.3-3.4 8.9-8 11-4.6-2.1-8-5.7-8-11V5l8-3Z" /><path d="m8.8 12 2.1 2.1 4.4-4.4" /></svg>;
}

function MobileTrustMark({ mark }: { mark: (typeof mobileTrustedBrands)[number]["mark"] }) {
  if (mark === "acme") return <svg className="about-trust__mobile-mark" viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 8 16H4L12 3Z" /><path d="m8.4 14.2 3.6-7.1 3.6 7.1M10.3 11.6h3.4" /></svg>;
  if (mark === "globex") return <svg className="about-trust__mobile-mark" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" /><path d="M3.9 12h16.2M12 3.5c2.1 2.3 3.3 5.2 3.3 8.5S14.1 18.2 12 20.5C9.9 18.2 8.7 15.3 8.7 12S9.9 5.8 12 3.5Z" /></svg>;
  if (mark === "initech") return <svg className="about-trust__mobile-mark" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V5h4v14M10 19V9h4v10M16 19V3h4v16" /><path d="M3 20h18" /></svg>;
  return <svg className="about-trust__mobile-mark" viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 8 9-8 9-8-9 8-9Z" /><path d="m8 12 4 4 4-4-4-4-4 4Z" /></svg>;
}

export default function About() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMobileFastTrack, setActiveMobileFastTrack] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState("");
  const [aboutContent, setAboutContent] = useState({ founderName: team[0].name, founderTitle: team[0].role, founderStory: approvedFounderStory });
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const sections = page.querySelectorAll<HTMLElement>("[data-about-reveal]");
    page.classList.add("about-motion-ready");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8%" });

    sections.forEach((section) => {
      if (!section.classList.contains("is-visible")) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let active = true;
    contentService.getSiteContent("about").then((response) => {
      const content = response.content;
      if (!active || !content || response.isPublished === false) return;
      setAboutContent({
        founderName: typeof content.founderName === "string" && content.founderName.trim() ? content.founderName : team[0].name,
        founderTitle: typeof content.founderTitle === "string" && content.founderTitle.trim() ? content.founderTitle : team[0].role,
        founderStory: typeof content.founderStory === "string" && content.founderStory.trim() ? content.founderStory : approvedFounderStory,
      });
    }).catch(() => {
      if (active) setAboutContent({ founderName: team[0].name, founderTitle: team[0].role, founderStory: approvedFounderStory });
    });
    return () => { active = false; };
  }, []);

  const announceAction = (message: string) => {
    setActionMessage(message);
  };

  return (
    <div ref={pageRef} className="about-page">
      <header className="about-header">
        <div className="about-header__inner">
          <Link href="/" className="about-brand" aria-label="Boost Vertex home"><span className="mv-brand__mark" aria-hidden="true"><img src="/assets/managed/boost-vertex-logo-2026_bf191d1a.jpeg" alt="" /></span><span>BOOST VERTEX</span></Link>
          <nav className="about-nav" aria-label="Primary navigation">
            <Link href="/services">Services</Link>
            <Link href="/industries/industries">Industries</Link>
            <Link href="/case-studies">Case Studies</Link>
            <Link href="/about" aria-current="page">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <div className="about-header__actions">
            <span>Pakistan · UAE · Saudi Arabia</span>
            <a href={approvedContact.whatsappUrl} className="about-button about-button--compact" data-action="free-consultation-whatsapp" target="_blank" rel="noreferrer">
              Get a Free Consultation
            </a>
          </div>
          <button
            className="about-menu-toggle"
            type="button"
            aria-label="Toggle primary navigation"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <nav className={`about-mobile-nav ${mobileMenuOpen ? "is-open" : ""}`} aria-label="Mobile primary navigation">
          <Link href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link href="/services" onClick={() => setMobileMenuOpen(false)}>Services</Link>
          <Link href="/industries/industries" onClick={() => setMobileMenuOpen(false)}>Industries</Link>
          <Link href="/case-studies" onClick={() => setMobileMenuOpen(false)}>Case Studies</Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)} aria-current="page">About</Link>
          <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          <a href={approvedContact.whatsappUrl} className="about-button" data-action="free-consultation-whatsapp" target="_blank" rel="noreferrer" onClick={() => setMobileMenuOpen(false)}>Get a Free Consultation</a>
        </nav>
      </header>

      <main>
        <section className="about-hero is-visible" data-about-reveal aria-labelledby="about-hero-heading">
          <div className="about-hero__glow" aria-hidden="true" />
          <div className="about-wrap about-hero__grid">
            <div className="about-hero__copy">
              <p className="about-eyebrow">OUR STORY</p>
              <h1 id="about-hero-heading">Built for growth.<br /><em>Focused on<br />outcomes.</em></h1>
              <p className="about-hero__lede">
                Boost Vertex helps businesses across Pakistan, the UAE and Saudi Arabia acquire customers through Meta Ads, lead generation, and data-driven paid advertising.
              </p>
              <div className="about-hero__cta">
                <a href={approvedContact.whatsappUrl} className="about-button" data-action="free-consultation-whatsapp" target="_blank" rel="noreferrer">Get a Free Consultation</a>
                <Link href="/contact" className="about-button about-button--ghost" data-action="discuss-project">Discuss Your Project</Link>
              </div>
            </div>
            <figure className="about-hero__visual">
              <img src="/assets/managed/boost-vertex-about-hero-office_bf567384.png" alt="Boost Vertex strategists working together in a meeting" />
              <aside className="about-fast-track" aria-label="Fast Track actions">
                <span>Fast Track</span>
                {heroRail.map((item) => (
                  <button key={item.label} type="button" aria-label={item.label} data-action={`fast-track-${item.label.toLowerCase()}`} onClick={() => {
                    if (item.href) window.location.assign(item.href);
                    else announceAction("Book a Call is currently unavailable. Please contact Boost Vertex on WhatsApp or use the enquiry form.");
                  }}>
                    <img src={item.icon} alt="" aria-hidden="true" />
                    <i>{item.label}</i>
                  </button>
                ))}
              </aside>
            </figure>
          </div>
        </section>

        <section className="about-origins" data-about-reveal aria-labelledby="origins-heading">
          <div className="about-wrap about-origins__inner">
            <p className="about-eyebrow">OUR ORIGINS</p>
            <h2 id="origins-heading" className="about-section-title">Our Origins</h2>
            <blockquote>{aboutContent.founderStory}</blockquote>
            <span className="about-quote-rule" aria-hidden="true" />
            <cite>— BOOST VERTEX MISSION</cite>
          </div>
        </section>

        <section className="about-values" data-about-reveal aria-labelledby="values-heading">
          <div className="about-wrap">
            <div className="about-trust" aria-label="Trusted by industry leaders">
              <p>CONFIRMED CLIENT EXPERIENCE</p>
              <div className="about-trust__desktop-list">
                {trustedBrands.map((brand) => (
                  <span key={brand.name} className="about-trust__brand">
                    <TrustMark mark={brand.mark} />
                    <span className="about-trust__mobile-symbol" aria-hidden="true">{brand.mobileSymbol}</span>
                    <span>{brand.name}</span>
                  </span>
                ))}
              </div>
              <div className="about-trust__mobile-list">
                {mobileTrustedBrands.map((brand) => (
                  <span key={brand.name} className="about-trust__mobile-brand">
                    <MobileTrustMark mark={brand.mark} />
                    <span>{brand.name}</span>
                  </span>
                ))}
              </div>
            </div>
            <div className="about-values__intro">
              <h2 id="values-heading" className="about-section-title">Results over impressions.</h2>
              <p>We focus on lead quality, measurable performance, transparency, and continuous optimization.</p>
            </div>
            <div className="about-principles">
              {principles.map((principle) => (
                <article key={principle.title} className="about-principle">
                  <span aria-hidden="true">{principle.icon}</span>
                  <h3 data-mobile-title={principle.mobileTitle}>{principle.title}</h3>
                  <p>{principle.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-process" data-about-reveal aria-labelledby="process-heading">
          <div className="about-wrap">
            <p className="about-eyebrow">PROCESS</p>
            <h2 id="process-heading" className="about-section-title">HOW WE BOOST</h2>
            <div className="about-process__grid">
              {process.map((step) => (
                <article key={step.number}>
                  <span>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-team" data-about-reveal aria-labelledby="team-heading">
          <div className="about-wrap">
            <p className="about-eyebrow about-team__eyebrow about-section-title">Leadership</p>
            <h2 id="team-heading">Founder</h2>
            <p className="about-team__subhead">Boost Vertex is led by {aboutContent.founderName}.</p>
            <div className="about-team__grid">
              {[{ name: aboutContent.founderName, role: aboutContent.founderTitle, summary: team[0].summary }].map((member) => (
                <article key={member.name} className="about-member">
                  <div className="w-full aspect-[4/5] bg-[#1a1c1c] border border-[#292a2a] flex items-center justify-center text-[#c3f400] text-4xl font-bold font-['Chivo']" aria-hidden="true">TR</div>
                  <h3>{member.name}</h3>
                  <p className="about-member__role">{member.role}</p>
                  <p className="about-member__summary">{member.summary}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-recruit" data-about-reveal aria-labelledby="recruit-heading">
          <div className="about-wrap">
            <div className="about-recruit__card">
              <span className="about-recruit__icon" aria-hidden="true">↗</span>
              <div>
                <h2 id="recruit-heading">Build what’s next with us.</h2>
                <p>Career information will be added when Boost Vertex provides approved role and application details.</p>
              </div>
              <a href={approvedContact.whatsappUrl} className="about-button about-button--compact" data-action="discuss-project-whatsapp" target="_blank" rel="noreferrer">Discuss Your Project</a>
            </div>
          </div>
        </section>

        <section className="about-conversion" data-about-reveal aria-labelledby="conversion-heading">
          <div className="about-conversion__desktop">
            <h2 id="conversion-heading">Let’s build a plan around your<br />goals.</h2>
            <div>
              <a href={approvedContact.whatsappUrl} className="about-button about-button--dark" data-action="free-consultation-whatsapp" target="_blank" rel="noreferrer">Get a Free Consultation</a>
              <Link href="/contact" className="about-button about-button--lime-outline" data-action="discuss-project">Discuss Your Project</Link>
            </div>
          </div>
          <div className="about-conversion__mobile">
            <h2>Ready to scale?</h2>
            <p>Tell us about the customers you want to acquire and the growth goal you are working toward.</p>
            <a href={approvedContact.whatsappUrl} className="about-button about-button--dark" data-action="free-consultation-whatsapp" target="_blank" rel="noreferrer">Get a Free Consultation</a>
          </div>
        </section>
      </main>

      <footer className="about-footer" data-about-reveal>
        <div className="about-wrap about-footer__grid">
          <div className="about-footer__brand">
            <Link href="/">BOOST VERTEX</Link>
            <p>Performance marketing built around Meta Ads, qualified leads, and measurable business outcomes.</p>
          </div>
          <div>
            <h2>SERVICES</h2>
            <a href="/services/meta-ads-management">Meta Ads Management</a>
            <a href="/services/lead-generation">Lead Generation</a>
            <a href="/services/google-ads">Google Ads</a>
            <a href="/services/youtube-ads">YouTube Ads</a>
            <a href="/services/seo">SEO</a>
            <a href="/services/web-development">Web Development</a>
          </div>
          <div>
            <h2>COMPANY</h2>
            <Link href="/about">About Us</Link>
            <a href="/case-studies">Case Studies</a>
            <a href="/contact">Contact</a>
          </div>
          <div className="about-footer__connect">
            <h2>CONNECT</h2>
            <div className="about-footer__mobile-contact">
              <a href={`mailto:${approvedContact.email}`} data-action="contact-email">{approvedContact.email}</a>
              <a href={approvedContact.whatsappUrl} data-action="contact-whatsapp" target="_blank" rel="noreferrer">WhatsApp: {approvedContact.phoneDisplay}</a>
              <a href={approvedContact.linkedin} data-action="linkedin-profile" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
            <div className="about-footer__policy-links">
              <a href="/privacy-policy">Privacy Policy</a>
              <a href="/privacy-policy">Terms of Service</a>
            </div>
          </div>
        </div>
        <div className="about-wrap about-footer__legal">© 2026 Boost Vertex Digital. All rights reserved.</div>
      </footer>
      <aside className="about-mobile-fast-track" aria-label="Fast Track actions">
        {heroRail.map((item) => (
          <button
            key={item.label}
            type="button"
            aria-label={`${item.label} Boost Vertex`}
            aria-pressed={activeMobileFastTrack === item.label}
            data-action={`mobile-fast-track-${item.label.toLowerCase()}`}
            onClick={() => {
              setActiveMobileFastTrack(item.label);
              if (item.href) window.location.assign(item.href);
              else announceAction("Book a Call is currently unavailable. Please contact Boost Vertex on WhatsApp or use the enquiry form.");
            }}
          >
            <img src={item.icon} alt="" aria-hidden="true" />
            <span>{item.label.toUpperCase()}</span>
          </button>
        ))}
      </aside>
      <p className="about-sr-status" aria-live="polite">{actionMessage}</p>
      <div className={`about-action-feedback ${actionMessage ? "is-visible" : ""}`} role="status" aria-live="polite">
        {actionMessage}
      </div>
    </div>
  );
}
