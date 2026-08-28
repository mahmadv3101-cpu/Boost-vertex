import { ArrowRight, CheckCircle2, ChevronDown, FileText, Quote, Search, Target, TrendingUp } from "lucide-react";
import { useState } from "react";
import { Link, useRoute } from "wouter";
import { MarketingFooter, MarketingHeader, MobileFastTrack } from "@/components/MarketingChrome";
import { approvedContact, getIndustryLanding } from "@/data/marketingContent";
import "./IndustryLanding.css";
import "./IndustryLandingMotion.css";
import "./IndustryLandingMobile.css";

const solutionIcons = { search: Search, target: Target, file: FileText, chart: TrendingUp } as const;
const faqs = [
  ["How do you define a qualified lead?", "We agree on the business criteria that matter — such as intent, relevance, and fit — before campaigns are built and optimized."],
  ["Which markets do you serve?", "Boost Vertex works with businesses across Pakistan, the UAE, and Saudi Arabia."],
  ["Can you work with our existing campaigns?", "Yes. The process begins by reviewing the current campaign structure, tracking, audience strategy, and lead quality."],
  ["Do you provide reporting?", "Yes. Clear reporting is part of the approach, so the business can see what is working and what needs improvement."],
] as const;

export default function IndustryLanding() {
  const [, params] = useRoute("/industries/:slug");
  const industry = getIndustryLanding(params?.slug);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return <main className="mv-industry-page">
    <MarketingHeader active="industry" />
    <section className="mv-il-hero" data-page-reveal>
      <div className="mv-wrap mv-il-hero__grid">
        <div className="mv-il-hero__copy">
          <p><i /> <span className="mv-il-desktop-only">INDUSTRIES WE SERVE</span><span className="mv-il-mobile-only">PERFORMANCE MARKETING</span></p>
          <h1><span className="mv-il-desktop-only">Performance<br /><em>Marketing</em><br />That Acquires</span><span className="mv-il-mobile-only">Performance<br /><em>Marketing</em><br />That Acquires<br />Customers</span></h1>
          <span>{industry.heroCopy}</span>
          <div><a href={approvedContact.whatsappUrl} className="mv-button" data-action="industry-free-consultation" target="_blank" rel="noreferrer"><span className="mv-il-desktop-only">Get a Free Consultation</span><span className="mv-il-mobile-only">Get a Free Consultation</span></a><Link href="/contact" className="mv-il-hero-outline" data-action="industry-discuss-project"><span className="mv-il-desktop-only">Discuss Your Project</span><span className="mv-il-mobile-only">Discuss Your Project</span><ArrowRight /></Link></div>
          <div className="mv-il-mobile-trust"><small>FOCUS AREAS</small><span>Meta Ads</span><span>Lead Gen</span><span>Growth</span></div>
        </div>
        <div className="mv-il-hero__visual"><img src={industry.heroImage} alt="Performance marketing strategy visual" /><div className="mv-il-hero__status"><span>Campaign Focus<br /><b><CheckCircle2 /> Qualified Leads</b></span><span>Target Markets<br /><strong>PK · UAE · KSA</strong></span></div></div>
      </div>
    </section>
    <section className="mv-il-reality" data-page-reveal><div className="mv-wrap"><h2>{industry.reality.title}</h2><p className="mv-il-reality__intro">Generic marketing playbooks do not account for the specific buyer journey, lead-quality signals, and conversion context of every business.</p><div className="mv-il-reality__grid"><div><p>{industry.reality.copy}</p><blockquote>“We build campaigns around relevant prospects, clear tracking, and business outcomes rather than vanity metrics.”</blockquote></div><img src={industry.reality.image} alt="Data-driven performance marketing" /></div></div></section>
    <section className="mv-il-advantage" data-page-reveal><div className="mv-wrap"><h2><span className="mv-il-desktop-only">The Boost Vertex Advantage</span><span className="mv-il-mobile-only">Why Businesses Choose<br />Boost Vertex</span></h2><p>Meta Ads and lead generation are our core specialties, supported by ongoing testing and performance tracking.</p><div>{industry.advantages.map((item, index) => <article key={item.title}><span>{index === 0 ? "▦" : index === 1 ? "◔" : "⌁"}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></div></section>
    <section className="mv-il-friction" data-page-reveal><div className="mv-wrap"><p>THE ROADBLOCKS</p><h2>Solving Growth Friction</h2><div>{industry.friction.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></div></section>
    <section className="mv-il-protocol" data-page-reveal><div className="mv-wrap"><h2>The Boost Vertex<br />Performance Process</h2><div>{industry.protocol.map((step) => <article key={step.index} className={step.highlighted ? "is-highlighted" : ""}><i /><div><h3>{step.title}</h3><span>{step.index}</span><p>{step.description}</p></div></article>)}</div></div></section>
    <section className="mv-il-solutions" data-page-reveal><div className="mv-wrap"><h2>Core Performance Marketing Services</h2><div>{industry.solutions.map((item) => { const Icon = solutionIcons[item.icon as keyof typeof solutionIcons]; return <article key={item.title}><Icon /><h3>{item.title}</h3><p>{item.description}</p></article>; })}</div></div></section>
    <section className="mv-il-outcomes" data-page-reveal><div className="mv-wrap"><div className="mv-il-outcomes__head"><div><h2><span className="mv-il-desktop-only">Confirmed Client Experience</span><span className="mv-il-mobile-only">Confirmed Client<br />Experience</span></h2><p>Case studies reflect real client engagements. Detailed performance evidence will be added when supplied.</p></div><Link href="/case-studies" data-action="industry-outcomes-cases">View All Case Studies</Link></div><div className="mv-il-mobile-roi"><strong>REAL</strong><span>CLIENT EXPERIENCE<br />ACROSS CORE INDUSTRIES</span></div><div className="mv-il-outcomes__grid">{industry.outcomes.map((outcome, index) => <Link href={`/case-studies/${index === 0 ? "movepro-pakistan" : "dr-waqas-ahmad"}`} key={outcome.client} className={`mv-il-outcome-card mv-il-outcome-card--${index + 1}`} data-action="industry-proof-card"><div className="min-h-[292px] bg-[#151717] flex items-center justify-center border-b border-[#313530] text-center" aria-hidden="true"><span className="!border-0 !p-0 text-[#c3f400] tracking-[0.14em] font-bold">CLIENT ARTWORK<br />PENDING</span></div><small className="mv-il-outcome-client">{outcome.client}</small><div><span>{index === 0 ? "META ADS" : "LEAD GENERATION"}</span><h3>{index === 0 ? "Relevant prospects for a logistics business" : "Targeted digital leads for a healthcare practice"}</h3><p>{index === 0 ? "Meta Ads and lead-generation work focused on attracting serious, business-ready prospects." : "A lead-generation strategy tailored to help a practice reach more relevant patient and client leads."}</p><footer><b>{outcome.metric}<small>{outcome.label}</small></b><b>{index === 0 ? "META ADS" : "HEALTHCARE"}<small>{index === 0 ? "campaign strategy" : "audience focus"}</small></b></footer><small className="mv-il-mobile-only mv-il-outcome-read">Read Full Case Study <ArrowRight /></small></div></Link>)}</div></div></section>
    <section className="mv-il-standard" data-page-reveal><div className="mv-wrap"><h2>The Vertex Advantage</h2><div>{industry.standards.map((item, index) => <article key={item.title}><span>{index === 0 ? "♜" : index === 1 ? "◉" : "♨"}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></div></section>
    <section className="mv-il-proof" data-page-reveal><Quote /><blockquote>Client-approved testimonials, ratings, and project evidence will be published once the relevant permissions and materials are provided.</blockquote><div><span><b>Boost Vertex</b><small>Client feedback pending approval</small></span></div></section>
    <section className="mv-il-faq" data-page-reveal><h2>Frequently Asked Questions</h2><div>{faqs.map(([question, answer], index) => <article key={question} className={openFaq === index ? "is-open" : ""}><button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}>{question}<ChevronDown /></button>{openFaq === index && <p>{answer}</p>}</article>)}</div></section>
    <section className="mv-il-convert" data-page-reveal><div><h2>Ready to Turn Ad Spend into Qualified Leads?</h2><p>Get a free consultation with Boost Vertex.</p></div><a href={approvedContact.whatsappUrl} className="mv-button mv-button--dark" data-action="industry-free-consultation" target="_blank" rel="noreferrer">Get a Free Consultation</a></section>
    <MarketingFooter />
    <MobileFastTrack />
  </main>;
}
