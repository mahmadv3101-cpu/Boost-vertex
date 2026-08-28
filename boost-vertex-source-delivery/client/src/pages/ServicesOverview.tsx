import { useEffect, useState } from "react";
import { Link } from "wouter";
import { MarketingFooter, MarketingHeader, MobileFastTrack } from "@/components/MarketingChrome";
import { approvedContact, services } from "@/data/marketingContent";
import { mergeServiceCard } from "@/lib/contentFallback";
import { contentService, type ServiceCardContent } from "@/services/contentService";

// Services Overview style contract: an obsidian systems dashboard on desktop that becomes the supplied centered, phone-led, single-column Figma composition at mobile widths.

export default function ServicesOverview() {
  const [serviceCards, setServiceCards] = useState<ServiceCardContent[]>(services);

  useEffect(() => {
    let active = true;
    contentService.listServices().then((response) => {
      if (!active || !response.data.length) return;
      setServiceCards(response.data.map((item) => {
        const fallback = services.find((service) => service.slug === item.slug) ?? {
          id: item.id || `service-${Math.random().toString(36).slice(2)}`,
          slug: item.slug || "service",
          title: item.title || "Boost Vertex Service",
          summary: item.summary || "A performance marketing service tailored to measurable growth.",
          outcomes: Array.isArray(item.outcomes) ? item.outcomes : [],
          metricValue: item.metricValue || "",
          metricLabel: item.metricLabel || "",
        };
        return mergeServiceCard(fallback, item);
      }));
    }).catch(() => {
      if (active) setServiceCards(services);
    });
    return () => { active = false; };
  }, []);

  return (
    <div className="mv-page mv-services-page">
      <MarketingHeader active="services" />
      <main>
        <section className="mv-services-hero" data-page-reveal>
          <div className="mv-wrap mv-services-hero__grid">
            <div className="mv-services-hero__copy">
              <p className="mv-eyebrow">BOOST VERTEX SERVICES</p>
              <h1><span>Every channel.</span> <em>One<br />growth system.</em></h1>
              <p>Performance marketing focused primarily on Meta Ads and Lead Generation, with Google Ads, YouTube Ads, SEO, and Web Development supporting the wider customer-acquisition journey.</p>
              <div className="mv-actions">
                <a href={approvedContact.whatsappUrl} className="mv-button" data-action="services-free-consultation" target="_blank" rel="noreferrer">Get a Free Consultation <span aria-hidden="true">→</span></a>
                <Link href="/contact" className="mv-button mv-button--ghost" data-action="services-discuss-project">Discuss Your Project</Link>
              </div>
            </div>
            <div className="mv-system-board" aria-label="Connected marketing system illustration">
              <div className="mv-system-board__desktop-flow" aria-hidden="true">
                <div className="mv-system-board__flow-group"><span>SEO</span><span>CONTENT</span><span>PAID MEDIA</span><span>META ADS</span></div><b>→</b>
                <div className="mv-system-board__flow-group mv-system-board__flow-group--mid"><span>WEB EXPERIENCE</span><span>SOCIAL</span><span>LEAD GENERATION</span></div><b>→</b>
                <div className="mv-system-board__outcome"><i aria-hidden="true">▰</i><strong>BUSINESS<br />GROWTH</strong><small>● SYS: ACTIVE</small></div>
              </div>
              <div className="mv-system-board__legacy" aria-hidden="true"><span className="mv-system-board__orbit mv-system-board__orbit--one" /><span className="mv-system-board__orbit mv-system-board__orbit--two" /><div className="mv-system-board__node mv-system-board__node--top">STRATEGY</div><div className="mv-system-board__node mv-system-board__node--left">MEDIA</div><div className="mv-system-board__node mv-system-board__node--right">SEARCH</div><div className="mv-system-board__center"><span>BUSINESS</span><strong>OUTCOMES</strong></div><div className="mv-system-board__caption">Signals in. Performance out.</div></div>
            </div>
          </div>
        </section>

        <section className="mv-system-section" data-page-reveal>
          <div className="mv-wrap mv-system-section__grid">
            <div className="mv-device-art" aria-hidden="true">
              <img className="mv-device-art__figma-source" src="/assets/managed/services-approach-phones-alpha_d87eba09.png" alt="" />
              <div className="mv-device-art__desktop">
                <span className="mv-figma-orbit mv-figma-orbit--one" />
                <span className="mv-figma-orbit mv-figma-orbit--two" />
                <span className="mv-figma-signal mv-figma-signal--left" />
                <span className="mv-figma-signal mv-figma-signal--right" />
                <div className="mv-figma-phone mv-figma-phone--portfolio"><small>Ethereum</small><strong>9.812098 ETH</strong><i>+8.7%</i><b>Portfolio</b><span /></div>
                <div className="mv-figma-phone mv-figma-phone--action"><small>Growth Engine</small><strong>Real-time<br />signals</strong><b>Grow</b><span /></div>
                <em>Join us in<br />building the<br />future.</em>
              </div>
              <span /><span /><i>Join us in building the future.</i>
            </div>
            <div>
              <p className="mv-eyebrow">THE BOOST VERTEX APPROACH</p>
              <h2>Full-service, not<br /><em>fragmented.</em></h2>
              <p>We do not operate in silos. Every channel, campaign, and strategy is interconnected to drive maximum efficiency and growth.</p>
              <ol className="mv-number-list">
                <li><strong>01</strong><div><h3>Connected Strategy</h3><p>SEO, paid media, content, web, and social work together around one growth strategy.</p></div></li>
                <li><strong>02</strong><div><h3>One View of Performance</h3><p>Every channel is measured against meaningful business outcomes.</p></div></li>
                <li><strong>03</strong><div><h3>Continuous Optimization</h3><p>We use data and testing to improve performance across the entire growth system.</p></div></li>
              </ol>
              <a href="/about#process" className="mv-text-link" data-action="services-see-how-we-work">See How We Work <b>→</b></a>
            </div>
          </div>
        </section>

        <section className="mv-capabilities" id="capabilities" data-page-reveal>
          <div className="mv-wrap">
            <div className="mv-section-heading"><p className="mv-eyebrow">WHAT WE ENGINEER</p><h2>Our Core Capabilities</h2><p>Engineered for performance, optimized for scale.</p></div>
            <div className="mv-service-grid">
              {serviceCards.map((service, index) => (
                <article className={`mv-service-card ${service.accented ? "is-accented" : ""}`} key={service.id}>
                  <div className="mv-service-card__top"><span>{String(index + 1).padStart(2, "0")}</span><i aria-hidden="true">↗</i></div>
                  <h3>{service.title}</h3>
                  <p>{service.summary}</p>
                  <ul>{service.outcomes.map((item) => <li key={item}>{item}</li>)}</ul>
                  <div className="mv-service-card__bottom"><span>{service.metricValue}</span><Link href={`/services/${service.slug}`} data-action="service-detail">→</Link></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mv-lime-cta" data-page-reveal>
          <div><h2>Not sure which service you need?</h2><p>Tell us about your business requirement and we will help identify the right customer-acquisition approach.</p><div className="mv-actions mv-actions--center mv-services-cta__desktop"><a href={approvedContact.whatsappUrl} className="mv-button mv-button--dark" data-action="services-free-consultation" target="_blank" rel="noreferrer">Get a Free Consultation</a><Link href="/contact" className="mv-button mv-button--lime-outline" data-action="services-discuss-project">Discuss Your Project</Link></div><div className="mv-services-cta__mobile"><a href={approvedContact.whatsappUrl} className="mv-button mv-button--dark" data-action="services-free-consultation" target="_blank" rel="noreferrer">Get a Free Consultation</a><Link href="/contact" className="mv-button mv-button--lime-outline" data-action="services-discuss-project">Discuss Your Project</Link></div></div>
        </section>
      </main>
      <MarketingFooter variant="services" />
      <MobileFastTrack />
    </div>
  );
}
