import { type FormEvent, type ReactNode, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useSearch } from "wouter";
import {
  ArrowUpRight,
  ArrowLeft,
  Bell,
  BookOpen,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  CircleAlert,
  Copy,
  Eye,
  FileText,
  Filter,
  Globe2,
  GripVertical,
  ImagePlus,
  Layers3,
  Link2,
  LoaderCircle,
  Menu,
  Pencil,
  Plus,
  Save,
  Search,
  Settings,
  Target,
  Trash2,
  TrendingUp,
  UploadCloud,
  X,
} from "lucide-react";
import { adminService, type AdminContentRecord } from "@/services/adminService";
import { caseStudyReviewPaths, type CaseStudyReviewState } from "./caseStudyReviewPaths";
import "./AdminCaseStudiesRebuild.css";
import "./AdminCaseStudiesRefinement.css";
import "./AdminCaseStudiesMobile.css";

type CaseStudyState = CaseStudyReviewState;

function getCaseStudyState(search: string): CaseStudyState {
  const candidate = new URLSearchParams(search).get("case-study-state");
  return caseStudyReviewPaths.includes(candidate as CaseStudyState) ? candidate as CaseStudyState : "list";
}

type CaseStudy = {
  id: string;
  title: string;
  subtitle: string;
  client: string;
  industry: string;
  service: string;
  updated: string;
  published: boolean;
  timeline: string;
  overview: string;
  challenge: string;
  process: string;
  execution: string;
  metrics: Array<{ value: string; label: string; context: string }>;
};

const caseStudyImage = "/assets/managed/case-study-detail-remote-work_34aac9f5.png";

const referenceStudies: CaseStudy[] = [
  {
    id: "fintech-scaling",
    title: "FinTech Scaling: 300% ROI",
    subtitle: "Comprehensive SEO & PPC strategy overhaul.",
    client: "Nexus Financial",
    industry: "FinTech",
    service: "SEO & PPC",
    updated: "Oct 24, 2023",
    published: true,
    timeline: "8 Months",
    overview: "Nexus Capital sought to modernize their digital infrastructure, transitioning from legacy on-premise solutions to a scalable, cloud-based CMS. The primary objective was to unify their property listings, streamline operations with accessible, cloud-based CMS, and improve the user experience for prospective buyers.",
    challenge: "The client was battling with isolated databases, leading to slow listing updates and frustrated agents.",
    process: "We implemented our proprietary three-phase methodology to overhaul their digital acquisition.",
    execution: "Rather than relying on single-event conversions, we orchestrated a multi-touchpoint sequence designed for complex B2B sales cycles.",
    metrics: [
      { value: "300%", label: "ROI Growth", context: "Over 8 months" },
      { value: "42%", label: "Organic Traffic", context: "Sustained acquisition" },
      { value: "3.1×", label: "Qualified leads", context: "Conversion efficiency" },
      { value: "28%", label: "Lower CPA", context: "Paid media performance" },
    ],
  },
  {
    id: "real-estate-dominance",
    title: "Real Estate Dominance in Q2",
    subtitle: "Lead generation through targeted social ads.",
    client: "Urban Heights Realty",
    industry: "Real Estate",
    service: "Performance Marketing",
    updated: "Oct 18, 2023",
    published: true,
    timeline: "6 Months",
    overview: "A focused demand programme built for a high-consideration property market and measurable quality enquiries.",
    challenge: "Paid demand was strong but sales teams were losing context between campaigns and qualified conversations.",
    process: "We aligned messaging, tracking, and lead qualification around the buyer journey.",
    execution: "Delivery combined precise paid media, conversion-led landing pages, and weekly performance optimisation.",
    metrics: [
      { value: "184%", label: "Qualified pipeline", context: "Commercial impact" },
      { value: "3.4×", label: "Return on ad spend", context: "Media efficiency" },
      { value: "41%", label: "Lower acquisition cost", context: "Across campaigns" },
      { value: "27%", label: "Conversion rate", context: "Landing pages" },
    ],
  },
  {
    id: "saas-growth-engine",
    title: "SaaS Growth Engine Setup",
    subtitle: "Content marketing and automated funnel.",
    client: "CloudSync Inc.",
    industry: "SaaS",
    service: "Content Strategy",
    updated: "Nov 02, 2023",
    published: false,
    timeline: "5 Months",
    overview: "A content and lifecycle framework that helps the commercial team progress high-intent prospects.",
    challenge: "Awareness activity did not reliably translate into opportunities for sales.",
    process: "We designed a joined-up editorial and demand engine.",
    execution: "Campaigns paired expertise-led content with progressive conversion journeys.",
    metrics: [
      { value: "67%", label: "More demo requests", context: "Quarter on quarter" },
      { value: "2.8×", label: "Organic sessions", context: "Priority pages" },
      { value: "19%", label: "Sales cycle reduction", context: "Qualified cohort" },
      { value: "4.2×", label: "Content ROI", context: "Tracked impact" },
    ],
  },
  {
    id: "ecommerce-cart",
    title: "E-commerce Cart Optimization",
    subtitle: "Reduced abandoned cart rate by 40% in 2 months.",
    client: "Thread & Co.",
    industry: "E-commerce",
    service: "Conversion Optimization",
    updated: "Sep 15, 2023",
    published: true,
    timeline: "2 Months",
    overview: "A conversion sprint designed to make product discovery and checkout significantly easier for returning buyers.",
    challenge: "Customers were abandoning at critical journey moments despite a strong product proposition.",
    process: "We identified friction, prototyped improvements, and iterated against real customer behavior.",
    execution: "The team rebuilt high-impact interactions across product, cart, and checkout experiences.",
    metrics: [
      { value: "40%", label: "Lower cart abandonment", context: "Two-month sprint" },
      { value: "26%", label: "Checkout completion", context: "Conversion lift" },
      { value: "18%", label: "Higher AOV", context: "Customer value" },
      { value: "32%", label: "Repeat orders", context: "Retention" },
    ],
  },
  {
    id: "healthtech-launch",
    title: "HealthTech Launch Campaign",
    subtitle: "Go-to-market strategy for new medical device.",
    client: "MediFlow Systems",
    industry: "HealthTech",
    service: "Go-to-Market",
    updated: "Aug 30, 2023",
    published: true,
    timeline: "4 Months",
    overview: "An evidence-led launch programme that created a confident narrative for clinical and commercial stakeholders.",
    challenge: "The new category needed clarity before demand generation could scale.",
    process: "We built positioning, proof, and launch communications in one structured programme.",
    execution: "Launch execution connected specialist content, paid visibility, and sales enablement.",
    metrics: [
      { value: "96%", label: "Launch readiness", context: "Cross-functional" },
      { value: "212", label: "Qualified contacts", context: "First quarter" },
      { value: "5.1×", label: "Earned reach", context: "Thought leadership" },
      { value: "34%", label: "Demo conversion", context: "Priority audience" },
    ],
  },
];

function mapRecord(record: AdminContentRecord, index: number): CaseStudy {
  const fallback = referenceStudies[index % referenceStudies.length];
  return {
    ...fallback,
    id: record._id || record.id || fallback.id,
    title: record.title || record.name || fallback.title,
    subtitle: record.summary || record.description || record.excerpt || fallback.subtitle,
    client: record.clientName || fallback.client,
    industry: record.industry || record.category || fallback.industry,
    service: record.service || fallback.service,
    updated: record.updatedAt ? new Date(record.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : fallback.updated,
    published: record.isPublished ?? (record.status ? record.status === "published" : fallback.published),
    overview: record.summary || record.description || fallback.overview,
    challenge: record.challenge || fallback.challenge,
    execution: record.solution || fallback.execution,
  };
}

function setCaseStudyState(state: CaseStudyState) {
  const url = new URL(window.location.href);
  url.searchParams.set("case-study-state", state);
  window.history.replaceState({}, "", `${url.pathname}?${url.searchParams.toString()}`);
}

function Status({ published }: { published: boolean }) {
  return <span className={`casev2-status ${published ? "is-published" : "is-draft"}`}><i />{published ? "Published" : "Draft"}</span>;
}

function CaseStudyMobileBar({ title, onMenu, onBack, onEdit, onDelete, onSettings, onSearch }: { title?: string; onMenu: () => void; onBack?: () => void; onEdit?: () => void; onDelete?: () => void; onSettings: () => void; onSearch?: () => void }) {
  return <header className="casev2-mobile-bar">
    <button type="button" aria-label={onBack ? "Go back" : "Open menu"} onClick={onBack || onMenu}>{onBack ? <ArrowLeft /> : <Menu />}</button>
    <span className="casev2-mobile-mark" aria-hidden="true"><img src="/assets/managed/boost-vertex-logo-2026_bf191d1a.jpeg" alt="" /></span>
    <strong>Boost Vertex</strong>
    {title ? <span className="casev2-mobile-screen-title">{title}</span> : null}
    <div className="casev2-mobile-utilities">
      <button type="button" aria-label="Search case studies" onClick={onSearch}><Search /></button>
      <Bell aria-label="Notifications" />
      <button type="button" aria-label="Open settings" onClick={onSettings}><Settings /></button>
      <span className="casev2-mobile-avatar" aria-label="Admin User">AU</span>
    </div>
    {onEdit || onDelete ? <div className="casev2-mobile-detail-actions">{onEdit ? <button type="button" aria-label="Edit case study" onClick={onEdit}><Pencil /></button> : null}{onDelete ? <button type="button" className="casev2-mobile-delete" aria-label="Delete case study" onClick={onDelete}><Trash2 /></button> : null}</div> : null}
  </header>;
}

function FormField({ label, children, span = false, required = false, count }: { label: string; children: ReactNode; span?: boolean; required?: boolean; count?: string }) {
  return <label className={span ? "casev2-field casev2-field-span" : "casev2-field"}><span>{label}{required ? <b>*</b> : null}{count ? <em>{count}</em> : null}</span>{children}</label>;
}

function FormCard({ number, title, icon, children }: { number: number; title: string; icon: ReactNode; children: ReactNode }) {
  return <section className="casev2-form-card"><header><span>{icon}{number}. {title}</span><ChevronDown /></header><div className="casev2-form-card-body">{children}</div></section>;
}

function DetailCard({ number, title, children }: { number: number; title: string; children: ReactNode }) {
  return <section className="casev2-detail-card"><header><h2>{number}. {title}</h2><ChevronDown /></header>{children}</section>;
}

function ListTable({ records, onOpen, onEdit, onDelete }: { records: CaseStudy[]; onOpen: (item: CaseStudy) => void; onEdit: (item: CaseStudy) => void; onDelete: (item: CaseStudy) => void }) {
  return <div className="casev2-table-wrap"><div className="casev2-table-head"><span>Case Study Title</span><span>Client /<br /> Company</span><span>Industry</span><span>Status</span><span>Last<br />Updated</span><span>Actions</span></div>{records.map((record) => <article className="casev2-table-row" key={record.id}><button className="casev2-record" data-client={`${record.client} · ${record.industry}`} onClick={() => onOpen(record)}><strong>{record.title}</strong><small>{record.subtitle}</small></button><span>{record.client}</span><span><i className="casev2-industry-tag">{record.industry}</i></span><span><Status published={record.published} /></span><time>{record.updated}</time><span className="casev2-actions"><button aria-label={`View ${record.title}`} onClick={() => onOpen(record)}><Eye /></button><button aria-label={`Edit ${record.title}`} onClick={() => onEdit(record)}><Pencil /></button><button aria-label={`Delete ${record.title}`} onClick={() => onDelete(record)}><Trash2 /></button></span></article>)}</div>;
}

function CaseStudyList({ state, records, onState, onOpen, onEdit, onDelete, onMenu = () => undefined, onSettings = () => undefined }: { state: CaseStudyState; records: CaseStudy[]; onState: (state: CaseStudyState) => void; onOpen: (item: CaseStudy) => void; onEdit: (item: CaseStudy) => void; onDelete: (item: CaseStudy) => void; onMenu?: () => void; onSettings?: () => void }) {
  const noRows = state === "empty" || state === "no-results";
  const shown = state === "search-found" ? records.slice(0, 1) : records;
  return <div className="casev2-page"><CaseStudyMobileBar onMenu={onMenu} onSettings={onSettings} onSearch={() => onState("search")} /><header className="casev2-page-heading"><div><h1>Case Studies</h1><p>Manage case studies displayed on the Boost Vertex website</p></div><button className="casev2-lime-button" onClick={() => onState("add")}><Plus />Add Case Study</button></header><section className="casev2-list-toolbar"><div className="casev2-search"><Search /><input defaultValue={state === "search" ? "FinTech" : ""} placeholder="Search case studies" /></div><label>Status:<select defaultValue="all"><option value="all">All</option><option>Published</option><option>Draft</option></select></label><label>Industry<select defaultValue="all"><option value="all">All</option><option>FinTech</option><option>Real Estate</option><option>SaaS</option></select></label><button className="casev2-dark-button" onClick={() => onState("filters")}><Filter />Filter</button></section>{state === "loading" ? <LoadingTable /> : state === "error" ? <ListError onRetry={() => onState("list")} /> : noRows ? <EmptyList title={state === "no-results" ? "No case studies found" : "No case studies yet"} description={state === "no-results" ? "Try changing your search or filters." : "Create a case study to showcase your results."} onCreate={() => onState("add")} /> : <ListTable records={shown} onOpen={onOpen} onEdit={onEdit} onDelete={onDelete} />} {state !== "loading" && state !== "error" ? <footer className="casev2-pagination"><span>Showing 1 to {shown.length} of 32 case studies</span><div><span>Rows per page:</span><button>10<ChevronDown /></button><button>‹</button><button className="is-current">1</button><button>2</button><button>›</button></div></footer> : null}</div>;
}

function LoadingTable() {
  return <div className="casev2-loading-table">{Array.from({ length: 5 }).map((_, index) => <i key={index} />)}</div>;
}

function EmptyList({ title, description, onCreate }: { title: string; description: string; onCreate: () => void }) {
  return <div className="casev2-empty"><FileText /><h2>{title}</h2><p>{description}</p><button className="casev2-lime-button" onClick={onCreate}><Plus />Create Case Study</button></div>;
}

function ListError({ onRetry }: { onRetry: () => void }) {
  return <div className="casev2-empty is-error"><CircleAlert /><h2>Something went wrong</h2><p>We could not load your case studies. Please try again.</p><button className="casev2-lime-button" onClick={onRetry}>Try again</button></div>;
}

function CaseStudyEditor({ record, mode, validation, saveError, onState, onSave, onMenu = () => undefined, onSettings = () => undefined }: { record: CaseStudy | null; mode: "add" | "edit"; validation: boolean; saveError: boolean; onState: (state: CaseStudyState) => void; onSave: (event: FormEvent<HTMLFormElement>) => void; onMenu?: () => void; onSettings?: () => void }) {
  const editing = mode === "edit";
  const item = record || referenceStudies[0];
  const metrics = item.metrics;
  return <div className="casev2-editor"><CaseStudyMobileBar title={editing ? "Edit Case Study" : "New Case Study"} onMenu={onMenu} onSettings={onSettings} onBack={() => onState(editing ? "detail" : "list")} /><header className="casev2-editor-breadcrumb"><span><button onClick={() => onState("list")}>Case Studies</button><b>›</b>{editing ? `${item.title} › Edit Case Study` : "New Case Study"}</span>{editing ? <div><button onClick={() => onState("detail")}>Cancel</button><button onClick={() => onState("preview")}><Eye />Preview Service</button><button className="casev2-lime-button" type="submit" form="case-study-form"><Save />Save Changes</button></div> : null}</header><div className="casev2-editor-heading"><h1>{editing ? "Edit Case Study" : "Create Case Study"}</h1><p>{editing ? "Update the strategic narrative, outcome data, and website presentation." : "Define the narrative, data points, and visual assets for this high-performance project."}</p></div>{validation ? <div className="casev2-validation"><CircleAlert />Please complete the Case Study Title and URL Slug before saving.</div> : null}<form id="case-study-form" onSubmit={onSave} className="casev2-editor-form"><FormCard number={1} title="Basic Information" icon={<CircleAlert />}><div className="casev2-grid-two"><FormField label="Internal Title" span required><input name="title" defaultValue={editing ? item.title : ""} placeholder="e.g., Nexus Corp Global Rebrand 2024" /></FormField><FormField label="Client / Partner" required><input name="client" defaultValue={editing ? item.client : ""} placeholder="Client Name" /></FormField><FormField label="Industry Sector" required><select name="industry" defaultValue={editing ? item.industry : ""}><option value="">Select Industry...</option><option>FinTech</option><option>Real Estate</option><option>SaaS</option><option>E-commerce</option><option>HealthTech</option></select></FormField><FormField label="Primary Service" required><select name="service" defaultValue={editing ? item.service : ""}><option value="">Select Service...</option><option>Digital Strategy</option><option>SEO & PPC</option><option>Performance Marketing</option></select></FormField><FormField label="URL Slug" required><div className="casev2-slug"><b>/case-studies/</b><input name="slug" defaultValue={editing ? item.id : ""} placeholder="nexus-corp-rebrand" /></div></FormField><FormField label="Publication Status" span><small>Visibility state on the public frontend.</small><select name="published" defaultValue={editing && item.published ? "published" : "draft"}><option value="draft">Draft</option><option value="published">Published</option></select></FormField></div></FormCard><FormCard number={2} title="Project Overview" icon={<BriefcaseBusiness />}><div className="casev2-grid-three"><FormField label="Client Display Name"><input defaultValue={editing ? item.client : ""} placeholder="Public facing name" /></FormField><FormField label="Project Timeline"><input defaultValue={editing ? item.timeline : ""} placeholder="e.g., Q3 2023 - Q1 2024" /></FormField><FormField label="Services Rendered (Comma Separated)"><input defaultValue={editing ? item.service : ""} placeholder="UI/UX, SEO, Paid Social" /></FormField><FormField label="Executive Summary / Overview" span count="0 / 500"><textarea defaultValue={editing ? item.overview : ""} placeholder="Provide a high-level summary of the project scope, objectives, and outcomes..." /></FormField></div></FormCard><FormCard number={3} title="The Challenge" icon={<Target />}><FormField label="Section Heading"><input defaultValue={editing ? "A stalled GTM engine" : "Defining the Obstacles"} /></FormField><FormField label="Contextual Description"><textarea defaultValue={editing ? item.challenge : ""} placeholder="Describe the market conditions and specific hurdles the client faced..." /></FormField><Repeater title="Challenge Data Points" addLabel="Add Challenge Point" fields={["Icon (Material)", "Title", "Description"]} values={["trending_down", "Declining Market Share", "Legacy systems were causing a 15% YoY drop in user retention."]} /></FormCard><FormCard number={4} title="The Process" icon={<Layers3 />}><FormField label="Process Description"><textarea defaultValue={editing ? item.process : ""} placeholder="Detail the methodology and steps taken..." /></FormField><Repeater title="Process Steps" addLabel="Add Process Step" fields={["Step", "Title", "Description"]} values={["1", "Discovery & Audit", "Comprehensive audit of existing accounts, tracking setup, and landing-page conversion rates."]} /></FormCard><FormCard number={5} title="Execution & Assets" icon={<FileText />}><FormField label="Execution Narrative (Rich Text)"><div className="casev2-rich-text"><div><b>B</b><i>I</i><span>☷</span><Link2 /></div><textarea defaultValue={editing ? item.execution : ""} placeholder="Detail the strategic implementation phase..." /></div></FormField><div className="casev2-media-upload"><span>Featured Media Asset<small>Upload high-res imagery or video showing the final output. (Max 10MB)</small></span><div><img src={caseStudyImage} alt="Featured case study visual" /><UploadCloud /><b>Drag and drop media here</b><em>or browse files</em></div></div></FormCard><FormCard number={6} title="The Impact (Metrics)" icon={<TrendingUp />}><Repeater title="" addLabel="Add Result Metric" fields={["Metric Value", "Metric Label", "Supporting Context (Optional)"]} values={metrics[0] ? [metrics[0].value, metrics[0].label, metrics[0].context] : ["+324%", "Organic Traffic", "Over a 6 month period post-launch"]} /></FormCard><FormCard number={7} title="Testimonial" icon={<BookOpen />}><div className="casev2-grid-two"><FormField label="Author Name"><input defaultValue={editing ? "Marcus Vance" : "Jane Doe"} /></FormField><FormField label="Author Role"><input defaultValue={editing ? "CMO, NovaScale" : "CEO, Nexus Corp"} /></FormField><FormField label="Quote" span><textarea defaultValue={editing ? "Boost Vertex didn’t just run our ads; they fundamentally re-engineered our digital acquisition engine." : "The outcome exceeded our expectations..."} /></FormField></div></FormCard><FormCard number={8} title="Further Reading" icon={<BookOpen />}><FormField label="Related Case Studies (Select up to 3)"><div className="casev2-related-select">{editing ? <span><b>Skyline Realty Digital Transformation</b><button><X /></button></span> : null}<button type="button"><Plus />Select Related Content</button></div></FormField></FormCard><FormCard number={9} title="Final CTA" icon={<ArrowUpRight />}><div className="casev2-grid-two"><FormField label="Headline"><input defaultValue={editing ? "Ready to transform your digital real estate?" : "Ready to transform your business?"} /></FormField><FormField label="Button Text"><input defaultValue={editing ? "Get a Consultation" : "Start a Project"} /></FormField><FormField label="Button Link" span><input defaultValue="/contact" /></FormField></div></FormCard><FormCard number={10} title="Search & Social (SEO)" icon={<Globe2 />}><FormField label="Meta Title" count="45 / 60"><input defaultValue={editing ? `${item.title} Case Study | Boost Vertex` : "Nexus Corp Rebrand Case Study | Boost Vertex"} /></FormField><div className="casev2-search-preview"><small>Search Preview</small><strong>{editing ? `${item.title} Case Study | Boost Vertex` : "Nexus Corp Rebrand Case Study | Boost Vertex"}</strong><span>https://boostvertex.com/case-studies/nexus-corp-rebrand</span><p>Discover how we transformed Nexus Corp's digital presence, resulting in a 324% increase in organic traffic...</p></div><FormField label="Meta Description" count="118 / 160"><textarea defaultValue={editing ? item.overview : "Discover how we transformed Nexus Corp's digital presence, resulting in a 324% increase in organic traffic over 6 months."} /></FormField></FormCard><footer className="casev2-editor-footer"><button type="button" onClick={() => onState("list")}>Cancel</button><button className="casev2-lime-button" type="submit"><Save />{editing ? "Save Case Study" : "Save Case Study"}</button></footer></form>{saveError ? createPortal(<FeedbackModal kind="save-error" onClose={() => onState("edit")} />, document.body) : null}</div>;
}

function Repeater({ title, fields, values, addLabel }: { title: string; fields: string[]; values: string[]; addLabel: string }) {
  return <div className="casev2-repeater">{title ? <small>{title}</small> : null}<div><GripVertical />{fields.map((field, index) => <FormField label={field} key={field}><input defaultValue={values[index]} /></FormField>)}<button type="button" aria-label="Remove item"><X /></button></div><button type="button" className="casev2-add-row"><Plus />{addLabel}</button></div>;
}

function CaseStudyDetail({ record, isPreview, onState, onMenu = () => undefined, onSettings = () => undefined }: { record: CaseStudy; isPreview: boolean; onState: (state: CaseStudyState) => void; onMenu?: () => void; onSettings?: () => void }) {
  if (isPreview) return <PublicPreview record={record} onState={onState} onMenu={onMenu} onSettings={onSettings} />;
  return <div className="casev2-detail"><CaseStudyMobileBar title="Case Study" onMenu={onMenu} onSettings={onSettings} onBack={() => onState("list")} onEdit={() => onState("edit")} onDelete={() => onState("delete")} /><header className="casev2-detail-breadcrumb"><button onClick={() => onState("list")}>Case Studies</button><b>›</b>{record.title}</header><section className="casev2-detail-heading"><div><Status published={record.published} /><h1>{record.title}</h1><p>Last Updated: {record.updated}</p></div><div><button aria-label="Delete case study" onClick={() => onState("delete")}><Trash2 /></button><button onClick={() => onState("preview")}><Eye />Preview on Website</button><button className="casev2-lime-button" onClick={() => onState("edit")}><Pencil />Edit Case Study</button></div></section><main className="casev2-detail-column"><DetailCard number={1} title="Project Overview"><div className="casev2-overview-grid">{[["Client", record.client], ["Industry", record.industry], ["Timeline", record.timeline], ["Services", record.service]].map(([label, value]) => <article key={label}><small>{label}</small><strong>{value}</strong></article>)}</div><p>{record.overview}</p></DetailCard><DetailCard number={2} title="The Challenge: A stalled GTM engine"><p>{record.challenge}</p><div className="casev2-challenge-cards">{[["△", "Stagnant Lead Quality", "High volume of top-of-funnel leads failing to progress to sales-qualified opportunities."], ["⌁", "Escalating Costs", "CPA increasing month-over-month due to inefficient targeting and ad fatigue."], ["✣", "Fragmented Data", "Disjointed tracking between Meta and the CRM, leading to poor signal optimization."]].map(([icon, title, copy]) => <article key={title}><b>{icon}</b><strong>{title}</strong><p>{copy}</p></article>)}</div></DetailCard><DetailCard number={3} title="The Process"><p>{record.process}</p><ol className="casev2-process-list">{[["Audit & Foundation", "Comprehensive technical audit of ad accounts, tracking setup, and existing landing-page conversion rates."], ["Strategic Realignment", "Redefining audience segments and developing tailored creative assets for each stage of the buyer’s journey."], ["Scale & Optimize", "Iterative testing protocol across audiences, creatives, and offers to systematically lower CAC."]].map(([title, copy], index) => <li key={title}><b>{index + 1}</b><span><strong>{title}</strong><p>{copy}</p></span></li>)}</ol></DetailCard><DetailCard number={4} title="How We Executed It"><h3>The Multi-Touch Conversion Strategy</h3><p>{record.execution}</p><ul className="casev2-execution-list"><li>Implemented offline conversion tracking via HubSpot API.</li><li>Launched gating mechanisms that adapted based on user intent signals.</li><li>Deployed robust A/B testing on ad creative, leaning into UGC and product walkthroughs.</li><li>Restructured account architecture for cleaner budget allocation and machine learning optimization.</li></ul></DetailCard><DetailCard number={5} title="The Impact"><div className="casev2-impact-grid">{record.metrics.map((metric) => <article key={metric.label}><strong>{metric.label}</strong><p>{metric.context}</p></article>)}</div></DetailCard><DetailCard number={6} title="Client Testimonial"><blockquote>“Boost Vertex didn’t just run our ads; they fundamentally re-engineered our digital acquisition engine. The strategic depth they brought to our B2B campaigns was unparalleled.”<footer><span>MV</span><div><b>Marcus Vance</b><small>CMO, NovaScale</small></div></footer></blockquote></DetailCard><DetailCard number={7} title="Further Reading"><div className="casev2-reading-grid">{["Scaling Fintech User Acquisition", "B2B SaaS GTM Strategy"].map((title) => <article key={title}><i /><div><strong>{title}</strong><small>View Case Study</small></div></article>)}</div></DetailCard><DetailCard number={8} title="Final CTA"><div className="casev2-final-cta"><strong>Ready to scale your B2B growth?</strong><p>Book a consultation with our growth architects.</p><button>Button: Get Your Free Audit</button></div></DetailCard><DetailCard number={9} title="SEO Information"><div className="casev2-seo-detail"><div><FormField label="Meta Title"><p>{record.title} Case Study | Boost Vertex</p></FormField><FormField label="Meta Description"><p>{record.overview}</p></FormField></div><figure><small>OG Image Preview</small><img src={caseStudyImage} alt="Open Graph preview for the case study" /></figure></div></DetailCard></main></div>;
}

function PublicPreview({ record, onState, onMenu = () => undefined, onSettings = () => undefined }: { record: CaseStudy; onState: (state: CaseStudyState) => void; onMenu?: () => void; onSettings?: () => void }) {
  return <div className="casev2-public-preview"><CaseStudyMobileBar title="Preview" onMenu={onMenu} onSettings={onSettings} onBack={() => onState("detail")} onEdit={() => onState("edit")} /><header><button onClick={() => onState("detail")}>Case Studies</button><span>Preview mode</span><button onClick={() => onState("edit")}><Pencil />Edit Case Study</button></header><article><p>CASE STUDY <i /> {record.industry}</p><h1>{record.title}</h1><h2>{record.subtitle}</h2><div className="casev2-public-hero"><img src={caseStudyImage} alt="Case study visual" /><dl>{record.metrics.slice(0, 3).map((metric) => <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</dl></div><section><div><small>THE CHALLENGE</small><h3>{record.challenge}</h3></div><div><small>THE SOLUTION</small><h3>{record.execution}</h3></div></section></article></div>;
}

function FeedbackModal({ kind, onClose, onConfirm }: { kind: "delete" | "created" | "updated" | "save-error" | "published"; onClose: () => void; onConfirm?: () => void }) {
  const error = kind === "save-error";
  const deleting = kind === "delete";
  const copy = deleting ? ["Delete case study?", "This action will permanently remove the case study from the workspace."] : error ? ["Something went wrong", "We couldn’t save your case study. Please check your connection and try again."] : kind === "published" ? ["Case study published", "Your case study is now visible on the Boost Vertex website."] : [kind === "created" ? "Case study created" : "Case study updated", kind === "created" ? "New case study has been created successfully." : "Your changes have been saved successfully."];
  return <div className="casev2-modal-backdrop"><section className={`casev2-feedback ${error || deleting ? "is-danger" : ""}`}><span>{error || deleting ? <CircleAlert /> : <Check />}</span><h2>{copy[0]}</h2><p>{copy[1]}</p>{deleting ? <footer><button onClick={onClose}>Cancel</button><button className="casev2-danger-button" onClick={onConfirm}>Delete Case Study</button></footer> : <button className="casev2-lime-button" onClick={onClose}>{error ? "Try Again" : "Go to Case Studies"}</button>}{error ? <button onClick={onClose}>Cancel</button> : null}</section></div>;
}

function FiltersModal({ onClose }: { onClose: () => void }) {
  return <div className="casev2-modal-backdrop"><section className="casev2-filters"><header><div><small>CASE STUDY FILTERS</small><h2>Refine results</h2></div><button onClick={onClose}><X /></button></header><FormField label="Status"><select defaultValue="all"><option value="all">All statuses</option><option>Published</option><option>Draft</option></select></FormField><FormField label="Industry"><select defaultValue="all"><option value="all">All industries</option><option>FinTech</option><option>Real Estate</option><option>SaaS</option></select></FormField><FormField label="Primary Service"><select defaultValue="all"><option value="all">All services</option><option>SEO & PPC</option><option>Performance Marketing</option></select></FormField><footer><button onClick={onClose}>Reset</button><button className="casev2-lime-button" onClick={onClose}>Apply filters</button></footer></section></div>;
}

export function CaseStudiesModuleWorkspace({ onMenu = () => undefined, onSettings = () => undefined }: { onMenu?: () => void; onSettings?: () => void }) {
  const search = useSearch();
  const direct = typeof window !== "undefined" && new URLSearchParams(window.location.search).has("case-study-state");
  const [state, setState] = useState<CaseStudyState>(() => getCaseStudyState(typeof window === "undefined" ? "" : window.location.search));
  const [records, setRecords] = useState<CaseStudy[]>(referenceStudies);
  const [selected, setSelected] = useState<CaseStudy>(referenceStudies[0]);
  const [editorMode, setEditorMode] = useState<"add" | "edit">("add");
  const reviewState = useMemo(() => caseStudyReviewPaths.includes(state), [state]);

  useEffect(() => {
    if (direct) return;
    adminService.contentList("case-studies").then((response) => {
      const remote = response.data.map(mapRecord);
      if (remote.length) {
        setRecords(remote);
        setSelected(remote[0]);
      }
    }).catch(() => undefined);
  }, [direct]);

  useEffect(() => {
    setState(getCaseStudyState(search));
  }, [search]);

  const transition = (next: CaseStudyState) => {
    setCaseStudyState(next);
    setState(next);
  };

  const startEdit = (item: CaseStudy) => {
    setSelected(item);
    setEditorMode("edit");
    transition("edit");
  };

  const startAdd = () => {
    setEditorMode("add");
    transition("add");
  };

  const handleListState = (next: CaseStudyState) => {
    if (next === "add") {
      startAdd();
      return;
    }
    transition(next);
  };

  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const title = String(form.get("title") || "").trim();
    const slug = String(form.get("slug") || "").trim();
    if (!title || !slug) {
      transition("validation");
      return;
    }
    const next: CaseStudy = {
      ...selected,
      id: editorMode === "edit" ? selected.id : slug,
      title,
      client: String(form.get("client") || selected.client),
      industry: String(form.get("industry") || selected.industry),
      service: String(form.get("service") || selected.service),
      published: form.get("published") === "published",
      updated: "Oct 24, 2024",
    };
    if (direct || reviewState) {
      setSelected(next);
      transition(editorMode === "edit" ? "updated" : "created");
      return;
    }
    const payload = { title: next.title, slug: next.id, clientName: next.client, industry: next.industry, service: next.service, summary: next.overview, description: next.overview, challenge: next.challenge, solution: next.execution, isPublished: next.published };
    try {
      if (editorMode === "edit") await adminService.updateContent("case-studies", selected.id, payload);
      else await adminService.createContent("case-studies", payload);
      setSelected(next);
      setRecords((current) => editorMode === "edit" ? current.map((item) => item.id === selected.id ? next : item) : [next, ...current]);
      transition(editorMode === "edit" ? "updated" : "created");
    } catch {
      transition("save-error");
    }
  };

  if (["add", "edit", "validation", "save-error"].includes(state)) {
    const isAdd = state === "add" || (state !== "edit" && editorMode === "add");
    return <CaseStudyEditor record={isAdd ? null : selected} mode={isAdd ? "add" : "edit"} validation={state === "validation"} saveError={state === "save-error"} onState={transition} onSave={save} onMenu={onMenu} onSettings={onSettings} />;
  }
  if (state === "detail" || state === "preview") return <CaseStudyDetail record={selected} isPreview={state === "preview"} onState={transition} onMenu={onMenu} onSettings={onSettings} />;
  if (state === "delete") return <><CaseStudyList state="list" records={records} onState={handleListState} onOpen={(item) => { setSelected(item); transition("detail"); }} onEdit={startEdit} onDelete={(item) => { setSelected(item); transition("delete"); }} onMenu={onMenu} onSettings={onSettings} /><FeedbackModal kind="delete" onClose={() => transition("list")} onConfirm={() => { setRecords((current) => current.filter((item) => item.id !== selected.id)); transition("list"); }} /></>;
  if (["created", "updated", "published"].includes(state)) return <><CaseStudyList state="list" records={records} onState={handleListState} onOpen={(item) => { setSelected(item); transition("detail"); }} onEdit={startEdit} onDelete={(item) => { setSelected(item); transition("delete"); }} onMenu={onMenu} onSettings={onSettings} /><FeedbackModal kind={state as "created" | "updated" | "published"} onClose={() => transition("list")} /></>;
  return <><CaseStudyList state={state} records={records} onState={handleListState} onOpen={(item) => { setSelected(item); transition("detail"); }} onEdit={startEdit} onDelete={(item) => { setSelected(item); transition("delete"); }} onMenu={onMenu} onSettings={onSettings} />{state === "filters" ? <FiltersModal onClose={() => transition("list")} /> : null}</>;
}
