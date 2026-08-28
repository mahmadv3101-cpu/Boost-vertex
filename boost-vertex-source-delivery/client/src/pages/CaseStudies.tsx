import { useEffect, useMemo, useState } from "react";
import { Cloud, HeartPulse, Truck } from "lucide-react";
import { MarketingFooter, MarketingHeader, MobileFastTrack } from "@/components/MarketingChrome";
import { approvedContact, caseStudies } from "@/data/marketingContent";
import { mergeCaseStudyCard } from "@/lib/contentFallback";
import { contentService, type CaseStudyCardContent } from "@/services/contentService";

// Case Studies desktop Figma contract: centered lime-arc hero, compact control rail, 3×2 proof grid, impact band, industry evidence, client-provided quote, and conversion panel.

const industryCards = [
  { title: "Transport & Logistics", description: "Meta Ads and lead generation focused on attracting serious, business-ready prospects.", icon: Truck },
  { title: "Healthcare", description: "Targeted digital campaigns designed to help businesses reach relevant leads.", icon: HeartPulse },
  { title: "Technology / Software", description: "Social media management, LinkedIn content, and Meta Ads support for stronger digital opportunities.", icon: Cloud },
];

const industryOptions = ["All Industries", "Transport & Logistics", "Healthcare", "Technology / Software"];
const serviceOptions = ["All Services", "Meta Ads", "Lead Generation", "Social Media Management", "LinkedIn Content"];
const desktopFastTrackActions = [
  { label: "Call", icon: "/46-537.svg" },
  { label: "Chat", icon: "/46-542.svg" },
  { label: "Book", icon: "/46-547.svg" },
  { label: "Inquiry", icon: "/46-552.svg" },
] as const;

export default function CaseStudies() {
  const [industry, setIndustry] = useState("All Industries");
  const [service, setService] = useState("All Services");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(() => typeof window !== "undefined" && window.matchMedia("(max-width: 640px)").matches ? 4 : 6);
  const [fastTrackMessage, setFastTrackMessage] = useState("");
  const [studies, setStudies] = useState<CaseStudyCardContent[]>(caseStudies);

  useEffect(() => {
    let active = true;
    contentService.listCaseStudies().then((response) => {
      if (!active || !response.data.length) return;
      setStudies(response.data.map((item) => {
        const fallback = caseStudies.find((study) => study.slug === item.slug) ?? {
          id: item.id || `case-study-${Math.random().toString(36).slice(2)}`,
          slug: item.slug || "case-study",
          clientName: item.clientName || "Boost Vertex Client",
          industry: item.industry || "Performance Marketing",
          metricValue: item.metricValue || "",
          metricLabel: item.metricLabel || "",
          summary: item.summary || "A Boost Vertex client engagement focused on measurable growth.",
          services: Array.isArray(item.services) ? item.services : [],
        };
        return mergeCaseStudyCard(fallback, item);
      }));
    }).catch(() => {
      if (active) setStudies(caseStudies);
    });
    return () => { active = false; };
  }, []);

  const visibleCases = useMemo(() => {
    const term = query.trim().toLowerCase();
    return studies
      .filter((item) => industry === "All Industries" || item.industry === industry)
      .filter((item) => service === "All Services" || item.services.some((itemService) => itemService.toLowerCase().includes(service.toLowerCase())))
      .filter((item) => !term || [item.clientName, item.industry, item.metricValue, item.summary, ...item.services].join(" ").toLowerCase().includes(term))
      .slice(0, visibleCount);
  }, [industry, query, service, studies, visibleCount]);

  const resetVisibleCount = () => setVisibleCount(typeof window !== "undefined" && window.matchMedia("(max-width: 640px)").matches ? 4 : 6);
  const runFastTrack = (label: string) => {
    if (label === "Call") window.location.assign(`tel:${approvedContact.phoneE164}`);
    else if (label === "Chat") window.location.assign(approvedContact.whatsappUrl);
    else if (label === "Inquiry") window.location.assign("/contact");
    else setFastTrackMessage("Book a Call is currently unavailable. Please contact Boost Vertex on WhatsApp or use the enquiry form.");
  };

  return (
    <div className="mv-page mv-cases-page">
      <MarketingHeader active="case-studies" />
      <main>
        <section className="mv-cases-hero" data-page-reveal>
          <div className="mv-wrap">
            <h1><span>Confirmed</span> <span>Client Work.</span><br /><em>Relevant<br />Growth.</em></h1>
            <p><span className="mv-cases-copy--desktop">Explore confirmed client work across Meta Ads, lead generation, social media management, LinkedIn content, and Meta Ads support.</span><span className="mv-cases-copy--mobile">Explore confirmed Boost Vertex client work across core industries.</span></p>
            <div className="mv-cases-hero__mobile-actions">
              <a href={approvedContact.whatsappUrl} className="mv-button" data-action="case-studies-free-consultation" target="_blank" rel="noreferrer">Get a Free Consultation</a>
              <a href="/contact" className="mv-button mv-button--ghost" data-action="case-studies-discuss-project">Discuss Your Project</a>
            </div>
          </div>
          <aside className="mv-cases-fast-track" aria-label="Fast Track actions">
            <span>Fast Track</span>
            <div>
              {desktopFastTrackActions.map((item) => (
                <button key={item.label} type="button" aria-label={`${item.label} Boost Vertex`} data-action={`case-studies-fast-track-${item.label.toLowerCase()}`} onClick={() => runFastTrack(item.label)}>
                  <img src={item.icon} alt="" aria-hidden="true" />
                </button>
              ))}
            </div>
          </aside>
        </section>
        <div className={`mv-action-feedback ${fastTrackMessage ? "is-visible" : ""}`} role="status" aria-live="polite">{fastTrackMessage}</div>

        <section className="mv-cases-results" id="case-studies-results" data-page-reveal>
          <div className="mv-wrap">
            <div className="mv-cases-filterbar" aria-label="Filter case studies">
              <span>Filter by:</span>
              <label>
                <span className="mv-sr-only">Industry</span>
                <select value={industry} onChange={(event) => { setIndustry(event.target.value); resetVisibleCount(); }}>
                  {industryOptions.map((option) => <option key={option}>{option}</option>)}
                </select>
              </label>
              <label>
                <span className="mv-sr-only">Service</span>
                <select value={service} onChange={(event) => { setService(event.target.value); resetVisibleCount(); }}>
                  {serviceOptions.map((option) => <option key={option}>{option}</option>)}
                </select>
              </label>
              <label className="mv-cases-search">
                <span className="mv-sr-only">Search case studies</span>
                <input type="search" value={query} onChange={(event) => { setQuery(event.target.value); resetVisibleCount(); }} placeholder="Search case studies..." />
              </label>
            </div>

            <div className="mv-case-grid">
              {visibleCases.map((study) => (
                <article className="mv-case-card" key={study.id}>
                  <span>{study.industry}</span>
                  <h3>{study.clientName}</h3>
                  <strong>{study.metricValue}</strong>
                  <b>{study.metricLabel}</b>
                  <p>{study.summary}</p>
                  <a href={`/case-studies/${study.slug}`} data-action="case-study-detail">Explore in Detail <i>→</i></a>
                </article>
              ))}
            </div>

            {!visibleCases.length && <p className="mv-cases-empty">No case studies match the selected filters.</p>}
            {visibleCount < studies.length && industry === "All Industries" && service === "All Services" && !query && (
              <button type="button" className="mv-load-more" onClick={() => setVisibleCount(studies.length)} data-action="load-more-case-studies">Load More Case Studies</button>
            )}
          </div>
        </section>

        <section className="mv-impact-band" data-page-reveal>
          <div><strong>3</strong><span>Confirmed Client Engagements</span></div>
          <div><strong>3</strong><span>Core Industries</span></div>
          <div><strong>PK · UAE · KSA</strong><span>Target Markets</span></div>
        </section>

        <section className="mv-industry-section" data-page-reveal>
          <div className="mv-wrap">
            <div className="mv-section-heading">
              <h2>Confirmed Industry Experience</h2>
              <p>Confirmed client experience spans transport and logistics, healthcare, and technology / software; Boost Vertex can support wider industries as well.</p>
            </div>
            <div className="mv-industry-grid">
              {industryCards.map(({ title, description, icon: Icon }) => (
                <article key={title}>
                  <i aria-hidden="true"><Icon strokeWidth={1.8} /></i>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mv-cases-quote" data-page-reveal>
          <div className="mv-wrap">
            <span aria-hidden="true">“</span>
            <blockquote>Our case studies focus on concise, credible client work: the service, challenge, what we did, and the known outcome. Numerical performance proof is not included at this stage.</blockquote>
            <div className="mv-cases-quote__author"><i aria-hidden="true" /><div><strong>Boost Vertex</strong><small>Confirmed client work</small></div></div>
          </div>
        </section>

        <section className="mv-cases-convert" data-page-reveal>
          <div>
            <h2>Ready to Boost Your Business?</h2>
            <p>Tell us about your business, your audience, and the growth outcome you want to work toward.</p>
            <div className="mv-actions mv-actions--center">
              <a href={approvedContact.whatsappUrl} className="mv-button" data-action="case-studies-free-consultation" target="_blank" rel="noreferrer"><span className="mv-cases-convert__desktop-copy">Get a Free Consultation</span><span className="mv-cases-convert__mobile-copy">Get a Free Consultation</span></a>
              <a href="/contact" className="mv-button mv-button--ghost" data-action="case-studies-discuss-project"><span className="mv-cases-convert__desktop-copy">Discuss Your Project</span><span className="mv-cases-convert__mobile-copy">Discuss Your Project</span></a>
            </div>
          </div>
        </section>
      </main>
      <MarketingFooter />
      <MobileFastTrack />
    </div>
  );
}
