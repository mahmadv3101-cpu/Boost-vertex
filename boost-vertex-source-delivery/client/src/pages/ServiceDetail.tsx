import { useEffect, useMemo, useState } from "react";
import { ArrowRight, BarChart3, BrainCircuit, ChevronDown, Database, Gauge, Layers3, LineChart, Search, ShieldCheck, Sparkles, Target, TrendingUp } from "lucide-react";
import { Link } from "wouter";
import { MarketingFooter, MarketingHeader, MobileFastTrack } from "@/components/MarketingChrome";
import { approvedContact, getServiceDetail } from "@/data/marketingContent";
import { mergeServiceDetail } from "@/lib/contentFallback";
import { contentService, type ServiceDetailContent } from "@/services/contentService";
import "./ServiceDetailRefinement.css";

// Service Detail Figma contract: a reusable data-driven growth dossier with an outcome-led olive hero, evidence bands, operational modules, and a high-contrast closing conversion band.

const fastTrack = [
  { label: "Call", icon: "/46-537.svg", href: `tel:${approvedContact.phoneE164}` },
  { label: "Chat", icon: "/46-542.svg", href: approvedContact.whatsappUrl },
  { label: "Book", icon: "/46-547.svg", href: "/contact" },
  { label: "Inquiry", icon: "/46-552.svg", href: "/contact" },
] as const;

const reasonIcons = [Gauge, ShieldCheck, LineChart];
const standardIcons = [Target, TrendingUp, BarChart3, BrainCircuit, Sparkles];

export default function ServiceDetail() {
  const slug = window.location.pathname.split("/").filter(Boolean).pop();
  const fallbackService = useMemo(() => getServiceDetail(slug), [slug]);
  const [service, setService] = useState<ServiceDetailContent>(fallbackService);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    let active = true;
    setService(fallbackService);
    if (!slug) return () => { active = false; };
    contentService.getService(slug).then((response) => {
      if (active) setService(mergeServiceDetail(fallbackService, response));
    }).catch(() => {
      if (active) setService(fallbackService);
    });
    return () => { active = false; };
  }, [fallbackService, slug]);

  return (
    <div className="mv-page mv-service-detail-page">
      <MarketingHeader active="services" />
      <main>
        <section className="mv-sd-hero" data-page-reveal>
          <div className="mv-wrap mv-sd-hero__grid">
            <div className="mv-sd-hero__copy">
              <p className="mv-sd-eyebrow">{service.serviceCategory}</p>
              <h1>{service.outcomeHeadline}</h1>
              <p>{service.outcomeCopy}</p>
              <div className="mv-sd-actions"><a href={approvedContact.whatsappUrl} className="mv-button" data-action="service-detail-free-consultation" target="_blank" rel="noreferrer">Get a Free Consultation <ArrowRight aria-hidden="true" /></a><Link href="/contact" className="mv-sd-outline-button" data-action="service-detail-discuss-project">Discuss Your Project <ArrowRight aria-hidden="true" /></Link></div>
            </div>
            <div className="mv-sd-dashboard mv-sd-dashboard--client-image" aria-label={`${service.title} performance dashboard illustration`}><img src="/assets/managed/services-hero-dashboard_131f0fd8.png" alt="Boost Vertex marketing dashboard illustration" /></div>
          </div>
          <aside className="mv-sd-fast-track" aria-label="Fast Track actions"><span>Fast Track</span>{fastTrack.map((item) => <a href={item.href} key={item.label} data-action={`service-detail-fast-track-${item.label.toLowerCase()}`} aria-label={`${item.label} Boost Vertex`}><img src={item.icon} alt="" /></a>)}</aside>
        </section>

        <section className="mv-sd-trust" aria-label="Approved client references"><span>APPROVED CLIENT REFERENCES</span><div><b>MOVEPRO PAKISTAN</b><b>DR. WAQAS AHMAD</b><b>WHIZPOOL</b><b>AH INTERIOR</b><b>MR. ALI</b></div></section>

        <section className="mv-sd-why" data-page-reveal><div className="mv-wrap"><h2>Why {service.title} Matters</h2><div className="mv-sd-reason-grid">{service.whyMatters.map((reason, index) => { const Icon = reasonIcons[index]; return <article key={reason.title}><Icon aria-hidden="true" /><h3>{reason.title}</h3><p>{reason.description}</p></article>; })}</div></div></section>

        <section className="mv-sd-problems" data-page-reveal><div className="mv-wrap"><h2>What’s holding your {service.title.toLowerCase()} performance back?</h2><p>Identify the constraints that are making commercial momentum harder than it needs to be.</p><div className="mv-sd-problem-grid">{service.problems.map((problem) => <article key={problem.index}><span>{problem.index}</span><div><h3>{problem.title}</h3><p>{problem.description}</p></div></article>)}</div></div></section>

        <section className="mv-sd-approach" data-page-reveal><div className="mv-wrap"><h2>How we approach {service.title}</h2><div className="mv-sd-timeline">{service.approachSteps.map((step, index) => <div key={step.index} className={index === 0 ? "is-active" : ""}><i /><strong>{step.title}</strong><span>{step.description}</span></div>)}</div></div></section>

        <section className="mv-sd-capabilities" data-page-reveal><div className="mv-wrap"><h2>Everything you need from {service.title}</h2><p>A connected, outcome-led system rather than a collection of isolated deliverables.</p><div className="mv-sd-capability-grid">{service.capabilities.slice(0, 6).map((capability) => <article key={capability.index}><span>{capability.index}</span><h3>{capability.name}</h3><p>{capability.description}</p></article>)}</div></div></section>

        <section className="mv-sd-workflow" data-page-reveal><div className="mv-wrap"><div className="mv-sd-workflow__visual"><div><p className="mv-sd-eyebrow">OPERATING VISIBILITY</p><h2>Visualizing the Workflow</h2><p>{service.workflowSummary}</p></div><div className="mv-sd-workflow__map" aria-hidden="true"><i /><i /><i /><i /><i /><b>SYS: ACTIVE</b></div><span className="mv-sd-workflow__portrait" aria-hidden="true" /></div><div className="mv-sd-workflow__steps"><article><h3>SETUP</h3><p>Initial audit, strategy formulation, and measurement foundations.</p></article><article><h3>MANAGEMENT</h3><p>Active monitoring, prioritization, and iterative optimization.</p></article><article><h3>SCALING</h3><p>Confident expansion where evidence demonstrates repeatable returns.</p></article></div></div></section>

        <section className="mv-sd-outcomes" data-page-reveal><div className="mv-wrap"><h2>Built for measurable outcomes</h2><div>{service.proofPoints.map((proof) => <article key={`${proof.client}-${proof.metric}`}><span><Layers3 aria-hidden="true" /> {proof.client}</span><strong>{proof.metric}</strong><p>{proof.description}</p></article>)}</div></div></section>

        <section className="mv-sd-standard" data-page-reveal><div className="mv-wrap"><h2>The Boost Vertex Standard</h2><div className="mv-sd-standard__desktop">{service.standards.map((standard, index) => { const Icon = standardIcons[index]; return <article key={standard.title}><Icon aria-hidden="true" /><h3>{standard.title}</h3><p>{standard.description}</p></article>; })}</div><div className="mv-sd-standard__mobile"><article><h3>SETUP</h3><p>Initial audit, strategy formulation, and campaign measurement foundations.</p></article><article><h3>MANAGEMENT</h3><p>Active monitoring, testing, and ongoing optimization based on performance feedback.</p></article><article><h3>OPTIMIZATION</h3><p>Refining campaigns and customer-acquisition activity around relevant business opportunities.</p></article></div></div></section>

        <section className="mv-sd-faq" data-page-reveal><div className="mv-wrap"><h2>Frequently Asked Questions</h2><div>{service.faqs.map((faq, index) => <article key={faq.question} className={openFaq === index ? "is-open" : ""}><button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>{faq.question}</span><ChevronDown aria-hidden="true" /></button><p>{faq.answer}</p></article>)}</div></div></section>

        <section className="mv-sd-convert" data-page-reveal><div><h2>Ready to grow with<br />{service.title}?</h2><p>Tell us about your business requirement and the customer-acquisition outcome you want to work toward.</p><div><a href={approvedContact.whatsappUrl} className="mv-button mv-button--dark" data-action="service-detail-free-consultation" target="_blank" rel="noreferrer">Get a Free Consultation <ArrowRight aria-hidden="true" /></a><Link href="/contact" className="mv-sd-convert__ghost" data-action="service-detail-discuss-project">Discuss Your Project</Link></div></div></section>
      </main>
      <MarketingFooter variant="services" />
      <MobileFastTrack />
    </div>
  );
}
