import { ArrowRight, BarChart3, CircleDot, Layers3, ShieldCheck, TrendingUp } from "lucide-react";
import { useRoute } from "wouter";
import { useEffect, useMemo, useState } from "react";
import { MarketingFooter, MarketingHeader, MobileFastTrack } from "@/components/MarketingChrome";
import { approvedContact, getCaseStudyDetail } from "@/data/marketingContent";
import { mergeCaseStudyDetail } from "@/lib/contentFallback";
import { contentService, type CaseStudyDetailContent } from "@/services/contentService";
import "./CaseStudyDetail.css";

// Case Study Detail screenshot contract: narrow centered dossier, compact vertical evidence flow, static contents rail, project-supplied proof panel, Further Reading, and contained lime conversion banner.

function HighlightedTitle({ title, emphasis }: { title: string; emphasis: string }) {
  const index = title.toLowerCase().indexOf(emphasis.toLowerCase());
  if (index < 0) return <>{title}</>;
  const prefix = title.slice(0, index).trim();
  const suffix = title.slice(index + emphasis.length).trim();
  const suffixWords = suffix.split(/\s+/);
  return <><span>{prefix}</span><span><em>{title.slice(index, index + emphasis.length)}</em>{suffixWords[0] ? ` ${suffixWords[0]}` : ""}</span><span>{suffixWords.slice(1).join(" ")}</span></>;
}

const challengeIcons = [ShieldCheck, TrendingUp, Layers3];
const fastTrackActions = [
  { label: "Call", icon: "/46-537.svg", href: `tel:${approvedContact.phoneE164}` },
  { label: "Chat", icon: "/46-542.svg", href: approvedContact.whatsappUrl },
  { label: "Book", icon: "/46-547.svg", href: "/contact" },
  { label: "Inquiry", icon: "/46-552.svg", href: "/contact" },
] as const;
const readingImages: Record<"network" | "servers" | "abstract", string> = {
  network: "/assets/managed/case-study-reading-network-figma_2dc1b2f8.png",
  servers: "/assets/managed/case-study-reading-servers-figma_b37dad8d.png",
  abstract: "/assets/managed/case-study-reading-abstract-figma_931ef4cd.png",
};
export default function CaseStudyDetail() {
  const [, params] = useRoute("/case-studies/:slug");
  const fallbackStudy = useMemo(() => getCaseStudyDetail(params?.slug), [params?.slug]);
  const [study, setStudy] = useState<CaseStudyDetailContent>(fallbackStudy);

  useEffect(() => {
    let active = true;
    setStudy(fallbackStudy);
    if (!params?.slug) return () => { active = false; };
    contentService.getCaseStudy(params.slug).then((response) => {
      if (active) setStudy(mergeCaseStudyDetail(fallbackStudy, response));
    }).catch(() => {
      if (active) setStudy(fallbackStudy);
    });
    return () => { active = false; };
  }, [fallbackStudy, params?.slug]);

  return (
    <div className="mv-page mv-csd-page">
      <MarketingHeader active="case-studies" />
      <main>
        <section className="mv-csd-hero" data-page-reveal>
          <div className="mv-csd-hero__arc" aria-hidden="true" />
          <div className="mv-wrap mv-csd-hero__content">
            <p className="mv-csd-eyebrow">{study.eyebrow}</p>
            <h1><HighlightedTitle title={study.heroTitle} emphasis={study.heroEmphasis} /></h1>
            <p className="mv-csd-hero__description">{study.heroCopy}</p>
            <div className="mv-csd-hero__metrics">{study.impact.slice(0, 3).map((item, index) => <article key={item.label}><strong className={index !== 1 ? "is-accented" : ""}>{item.value}</strong><span>{item.label}</span></article>)}</div>
          </div>
          <aside className="mv-csd-fast-track" aria-label="Fast Track actions"><span>Fast Track</span><div>{fastTrackActions.map((action) => <a key={action.label} href={action.href} aria-label={`${action.label} Boost Vertex`} data-action={`case-study-fast-track-${action.label.toLowerCase()}`}><img src={action.icon} alt="" aria-hidden="true" /></a>)}</div></aside>
        </section>

        <section className="mv-csd-mobile-performance" aria-label="Case study performance preview">
          <div className="mv-csd-mobile-performance__preview">
            <span>BOOST VERTEX</span>
            <div><small>CLIENT PROJECT</small><strong>{study.clientName}</strong><p>Campaign and lead-generation work tailored to the client’s requirements.</p></div>
          </div>
          <nav className="mv-csd-mobile-section-nav" aria-label="Case study section navigation">
            <a href="#overview">Overview</a><a href="#challenge">Challenge</a><a href="#process">Process</a><a href="#execution">Execution</a><a href="#impact">Impact</a>
          </nav>
        </section>

        <section className="mv-csd-trust" data-page-reveal><span>APPROVED CLIENT REFERENCES</span><div><b>MOVEPRO PAKISTAN</b><b>DR. WAQAS AHMAD</b><b>WHIZPOOL</b><b>AH INTERIOR</b><b>MR. ALI</b></div></section>

        <div className="mv-csd-dossier">
          <nav className="mv-csd-contents" aria-label="Case study contents"><small>CONTENTS</small><a href="#overview">Project Overview</a><a href="#challenge">The Challenge</a><a href="#process">The Process</a><a href="#execution">How We Executed It</a><a href="#impact">The Impact</a></nav>
          <div className="mv-csd-narrative">
            <section id="overview" className="mv-csd-overview" data-page-reveal><h2>Project Overview</h2><div>{study.overview.map((item) => <article key={item.label}><small>{item.label}</small><strong>{item.value}</strong></article>)}</div></section>

            <section id="challenge" className="mv-csd-challenge" data-page-reveal><h2>The Challenge</h2><p>{study.projectName ?? study.clientName} needed a performance-marketing approach tailored to its market, audience, and lead-quality goals.</p><div>{study.challenge.map((item, index) => { const Icon = challengeIcons[index] ?? CircleDot; return <article key={item.title}><Icon aria-hidden="true" /><div><h3>{item.title}</h3><p>{item.description}</p></div></article>; })}</div></section>

            <section id="process" className="mv-csd-process" data-page-reveal><h2>The Process</h2><p>Our methodical approach to unlocking predictable growth.</p><div>{study.process.map((step) => <article key={step.index}><i>{step.index}</i><div><small>{step.title}</small><p>{step.description}</p></div></article>)}</div></section>

            <section id="execution" className="mv-csd-execution" data-page-reveal><h2>How We Executed It</h2><div>{study.execution.map((item) => <article key={item.title}><strong>{item.title}</strong><p>{item.description}</p></article>)}</div></section>

            <section id="impact" className="mv-csd-impact" data-page-reveal><div><h2>The Impact</h2><section>{study.impact.map((item) => <article key={item.label}><strong className={item.accented ? "is-accented" : ""}>{item.value}</strong><span>{item.label}</span></article>)}</section></div></section>

            <section className="mv-csd-proof" data-page-reveal><article><span>“</span><p>{study.proof.text}</p></article></section>
          </div>
        </div>

        <section className="mv-csd-reading" data-page-reveal><div className="mv-csd-reading__head"><h2>Further Reading</h2><a href="/blog" data-action="case-study-further-reading">View All <ArrowRight aria-hidden="true" /></a></div><div className="mv-csd-reading__grid">{study.furtherReading.map((item) => <article key={item.title}><img src={readingImages[item.tone]} alt="" /><small>{item.category}</small><h3>{item.title}</h3></article>)}</div></section>

        <section className="mv-csd-convert" data-page-reveal><div><div><h2>Ready to discuss your<br />project?</h2><p>Tell us about your business requirement and the customer-acquisition outcome you want to work toward.</p></div><a href={approvedContact.whatsappUrl} className="mv-button mv-button--dark" data-action="case-study-free-consultation" target="_blank" rel="noreferrer">Get a Free Consultation</a></div></section>
      </main>
      <MarketingFooter variant="services" />
      <MobileFastTrack />
    </div>
  );
}
