/**
 * Admin Dashboard reference style: dense dark operations workspace with a persistent sidebar,
 * compact tables, charcoal cards, lime operational states, and a Figma-aligned mobile bottom navigation.
 */
import {
  ArrowLeft,
  Bell,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  CircleHelp,
  CircleX,
  Download,
  Eye,
  FileText,
  Filter,
  FolderOpen,
  FolderKanban,
  Image,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  MessageSquare,
  MoreHorizontal,
  Newspaper,
  Pencil,
  Plus,
  RotateCcw,
  Search,
  Settings,
  Sparkles,
  Trash2,
  TrendingUp,
  Upload,
  UserPlus,
  UserRound,
  UsersRound,
  X,
  type LucideIcon,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { useLocation } from "wouter";
import "./AdminDashboard.css";
import "./AdminDashboardInteraction.css";
import "./AdminDashboardAuditRefinement.css";
import "./AdminLeadMobile.css";
import "./AdminLeadMobileFix.css";
import "./AdminServicesModule.css";
import { adminService, type AdminContentRecord, type AnalyticsResponse, type BackendLead, type CmsResource, type DashboardResponse } from "@/services/adminService";
import { authService, type AdminProfile } from "@/services/authService";
import { getAdminToken } from "@/services/apiClient";
import type { ApiPagination } from "@/types/api";
import { ServicesModuleWorkspace } from "./AdminServicesModule";
import { IndustryModuleWorkspace } from "./AdminIndustryModule";
import { CaseStudiesModuleWorkspace } from "./AdminCaseStudiesModule";
import { BlogResourcesModuleWorkspace } from "./AdminBlogResourcesModule";
import { MediaLibraryWorkspace } from "./AdminMediaLibraryModule";
import { ContactMessagesWorkspace } from "./AdminContactMessagesModule";
import { adminModuleDestination, adminScreenLabel } from "./adminNavigation";

const logoUrl = "/assets/managed/boost-vertex-logo-2026_bf191d1a.jpeg";

type NavItem = { label: string; icon: LucideIcon };
const navigation: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Leads", icon: UsersRound },
  { label: "Services", icon: BriefcaseBusiness },
  { label: "Industries", icon: Building2 },
  { label: "Case Studies", icon: FolderKanban },
  { label: "Blog / Resources", icon: Newspaper },
  { label: "Media Library", icon: Image },
  { label: "Contact Messages", icon: MessageSquare },
  { label: "Settings", icon: Settings },
];

const metrics = [
  ["Total Leads", "1,248", "↑ 12.5%", "this month", UsersRound],
  ["New Leads", "84", "↑ 8.7%", "this week", UsersRound],
  ["Services", "24", "↑ 2 new", "this month", BriefcaseBusiness],
  ["Industry Pages", "18", "↑ 1 new", "this month", Building2],
  ["Case Studies", "32", "↑ 4 new", "this month", FolderKanban],
  ["Blog / Resources", "56", "↑ 7 new", "this month", BookOpen],
] as const;

const leads = [
  ["Wade Warren", "ABC Real Estate", "New", "May 20, 2025"],
  ["Cody Fisher", "Bright Solutions", "Contacted", "May 19, 2025"],
  ["Floyd Miles", "TechFlow Ltd.", "Qualified", "May 18, 2025"],
  ["Albert Flores", "innovateX", "Converted", "May 18, 2025"],
  ["Dianne Russell", "Marketify", "Closed", "May 17, 2025"],
];

const messages = [
  ["Jane Cooper", "Partnership Inquiry", "Unread", "May 20, 2025"],
  ["Esther Howard", "SEO Services Question", "Read", "May 19, 2025"],
  ["Devon Lane", "Project Discussion", "Unread", "May 18, 2025"],
  ["Kristin Watson", "General Inquiry", "Read", "May 18, 2025"],
  ["Robert Fox", "Pricing Information", "Read", "May 17, 2025"],
];

const content = [
  ["Service", "Content Marketing", "Published", "May 20, 2025"],
  ["Industry", "Content Marketing", "Published", "May 19, 2025"],
  ["Case Study", "Content Marketing", "Published", "May 18, 2025"],
  ["Blog Post", "Content Marketing", "Draft", "May 18, 2025"],
  ["Service", "Content Marketing", "Draft", "May 17, 2025"],
];

const notifications = [
  ["New Lead Assigned", "A new lead from ABC Real Estate has been assigned to you.", "8m ago", "blue"],
  ["Content Published", "Your new industry landing page has gone live.", "1h ago", "green"],
  ["Traffic Spike Alert", "Website traffic has increased by 15% in the last 24 hours.", "3h ago", "lime"],
  ["Backup Completed", "Your daily backup has completed successfully.", "Yesterday", "gray"],
];

const inbox: Array<[string, string, string, string, boolean]> = [
  ["Jane Cooper", "Partnership Inquiry", "Hi there, we are interested in exploring a potential partnership with Boost Vertex for our upcoming...", "May 20", true],
  ["Esther Howard", "SEO Services Question", "Could you provide more details about your enterprise SEO packages? We are currently re-...", "May 19", false],
  ["Devon Lane", "Project Discussion", "I’d like to schedule a call to discuss the new web development project requirements we talked...", "May 18", true],
];

type LeadRecord = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  source: string;
  status: "New" | "Contacted" | "Qualified" | "Converted" | "Closed";
  received: string;
  isRead?: boolean;
  message?: string;
};

const leadStatusToDisplay: Record<string, LeadRecord["status"]> = { new: "New", contacted: "Contacted", qualified: "Qualified", won: "Converted", lost: "Closed" };
const leadStatusToApi: Record<LeadRecord["status"], string> = { New: "new", Contacted: "contacted", Qualified: "qualified", Converted: "won", Closed: "lost" };

const leadRecords: LeadRecord[] = [
  { id: "LD-1028", name: "Wade Warren", company: "ABC Real Estate", email: "wade@abcrealestate.com", phone: "+1 (555) 123-4567", service: "Paid Advertising", source: "Website", status: "New", received: "May 20, 2025" },
  { id: "LD-1027", name: "Cody Fisher", company: "Bright Solutions", email: "cody@brightsolutions.io", phone: "+1 (555) 234-5678", service: "Web Development", source: "Google Ads", status: "Contacted", received: "May 19, 2025" },
  { id: "LD-1026", name: "Floyd Miles", company: "TechFlow Ltd.", email: "floyd@techflow.com", phone: "+1 (555) 345-6789", service: "SEO", source: "Referral", status: "Qualified", received: "May 18, 2025" },
  { id: "LD-1025", name: "Albert Flores", company: "InnovateX", email: "albert@innovatex.com", phone: "+1 (555) 456-7890", service: "Content Marketing", source: "LinkedIn", status: "Converted", received: "May 18, 2025" },
  { id: "LD-1024", name: "Dianne Russell", company: "Marketify", email: "dianne@marketify.com", phone: "+1 (555) 567-8901", service: "Social Media", source: "Website", status: "Closed", received: "May 17, 2025" },
  { id: "LD-1023", name: "Esther Howard", company: "Orbit Studio", email: "esther@orbitstudio.co", phone: "+1 (555) 678-9012", service: "Brand Strategy", source: "Contact Form", status: "New", received: "May 16, 2025" },
];

function mapBackendLead(lead: BackendLead): LeadRecord {
  const received = lead.createdAt ? new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(lead.createdAt)) : "—";
  const status = leadStatusToDisplay[lead.status.toLowerCase()] || "New";
  return {
    id: lead._id,
    name: lead.name || "Unnamed lead",
    company: lead.company || "—",
    email: lead.email || "—",
    phone: lead.phone || "—",
    service: lead.serviceInterest || "Not specified",
    source: lead.source || "Website",
    status,
    received,
    isRead: lead.isRead,
    message: lead.message,
  };
}

const leadAvatarUrls = [
  "/assets/managed/wade-warren-figma_8105f71f.png",
  "/assets/managed/cody-fisher-figma_0b39d525.png",
  "/assets/managed/floyd-miles-figma_b68fa095.png",
  "/assets/managed/albert-flores-figma_3db5f5c4.png",
  "/assets/managed/dianne-russell-figma_1176991c.png",
];

const quickActions: Array<[LucideIcon, string, string]> = [
  [Plus, "Add", "Service"],
  [Building2, "Add Industry", "Page"],
  [FolderKanban, "Add Case", "Study"],
  [Newspaper, "Add Blog", "Post"],
  [Upload, "Upload Media", ""],
];

const modulePaths: Record<string, string> = {
  Dashboard: "dashboard",
  Leads: "leads",
  Services: "services",
  Industries: "industries",
  "Case Studies": "case-studies",
  "Blog / Resources": "blog",
  "Media Library": "media",
  "Contact Messages": "contact-messages",
  Settings: "settings",
  "Admin Profile": "profile",
};

const moduleDetails: Record<string, { description: string; action: string; items: string[] }> = {
  Leads: { description: "Review, qualify, assign, and follow up on website enquiries.", action: "Add Lead", items: ["New leads", "Qualified opportunities", "Follow-up queue"] },
  Services: { description: "Create and manage the public service pages displayed on the website.", action: "Add Service", items: ["Published services", "Draft services", "Service performance"] },
  Industries: { description: "Manage industry landing pages, supporting copy, services, and proof sections.", action: "Add Industry", items: ["Industry pages", "Draft pages", "Related services"] },
  "Case Studies": { description: "Create, review, and publish client case studies and approved outcome proof.", action: "Add Case Study", items: ["Published case studies", "Approval required", "Related client media"] },
  "Blog / Resources": { description: "Manage editorial content, categories, author information, and publishing status.", action: "Add Blog Post", items: ["Published posts", "Draft posts", "Scheduled content"] },
  "Media Library": { description: "Upload, organize, and reuse approved brand, service, and editorial media.", action: "Upload Media", items: ["Recently uploaded", "In use", "Needs alt text"] },
  "Contact Messages": { description: "Review and respond to direct contact requests submitted through the website.", action: "New Message", items: ["Unread messages", "Awaiting reply", "Archived messages"] },
  Settings: { description: "Manage global website contact details, social links, notification preferences, and legal content.", action: "Edit Settings", items: ["Company details", "Notification preferences", "Website integrations"] },
  "Admin Profile": { description: "Manage your administrator profile, security preferences, and active sessions.", action: "Edit Profile", items: ["Profile details", "Security", "Active sessions"] },
};

function AdminBrand() {
  return <div className="dash-brand"><span><img src={logoUrl} alt="" /></span><strong>Boost Vertex</strong></div>;
}

function Status({ value }: { value: string }) {
  const tone = value === "Unread" || value === "New" || value === "Qualified" || value === "Converted" || value === "Published" ? "lime" : value === "Contacted" ? "muted" : "gray";
  return <span className={`dash-status dash-status--${tone}`}>{value}</span>;
}

function DataTable({ title, rows, headings, variant }: { title: string; rows: string[][]; headings: string[]; variant: "leads" | "messages" | "content" }) {
  return <section className="dash-card dash-table-card">
    <div className="dash-card__title"><h2>{title}</h2><button onClick={() => toast.info(`${title} management will be connected next.`)}>View all</button></div>
    <div className="dash-table">
      <div className={`dash-table__head dash-table__head--${variant}`}>{headings.map((heading) => <span key={heading}>{heading}</span>)}<span /></div>
      {rows.map((row) => <div className={`dash-table__row dash-table__row--${variant}`} key={`${variant}-${row[0]}`}>
        {variant === "content" ? <span className="dash-content-type"><FileText />{row[0]}</span> : <span>{row[0]}</span>}
        <span>{row[1]}</span><span><Status value={row[2]} /></span><span>{row[3]}</span><button aria-label={`More details for ${row[0]}`} onClick={() => toast.info(`${row[0]} details will be available with backend data.`)}><MoreHorizontal /></button>
      </div>)}
    </div>
  </section>;
}

function TrendChart({ analytics }: { analytics: AnalyticsResponse | null }) {
  return <section className="dash-card dash-chart-card">
    <div className="dash-card__title"><div><h2>Overview</h2><div className="dash-legend"><span><i className="dash-legend__lead" />Leads</span><span><i className="dash-legend__visitors" />Visitors</span>{analytics?.analytics?.averageResponseTime ? <small>API {analytics.analytics.averageResponseTime}</small> : null}</div></div><button className="dash-select">This Week <ChevronDown /></button></div>
    <svg className="dash-chart" viewBox="0 0 510 190" role="img" aria-label="Leads and visitors trend chart">
      {[28, 68, 108, 148].map((y) => <line key={y} x1="34" x2="501" y1={y} y2={y} stroke="#2b2e2c" strokeWidth="1" />)}
      <text x="4" y="151">0</text><text x="0" y="111">200</text><text x="0" y="71">400</text><text x="0" y="31">600</text><text x="0" y="12">800</text>
      <polyline points="38,116 105,99 172,77 239,101 306,41 373,74 440,67 501,83" fill="none" stroke="#c3f400" strokeWidth="2.5" />
      <polyline points="38,150 105,138 172,123 239,135 306,98 373,127 440,118 501,111" fill="none" stroke="#4385e2" strokeWidth="2.5" />
      {["May 15", "May 16", "May 17", "May 18", "May 19", "May 20", "May 21"].map((label, index) => <text key={label} x={35 + index * 76} y="181">{label}</text>)}
      {[38,105,172,239,306,373,440,501].map((x, index) => <circle key={`lead-${x}`} cx={x} cy={[116,99,77,101,41,74,67,83][index]} r="4" fill="#161817" stroke="#c3f400" strokeWidth="2" />)}
      {[38,105,172,239,306,373,440,501].map((x, index) => <circle key={`visitor-${x}`} cx={x} cy={[150,138,123,135,98,127,118,111][index]} r="4" fill="#161817" stroke="#4385e2" strokeWidth="2" />)}
    </svg>
  </section>;
}

const cmsResources: Partial<Record<string, CmsResource>> = { Services: "services", "Case Studies": "case-studies", "Blog / Resources": "blogs" };

function CmsEditor({ resource, record, onClose, onSaved }: { resource: CmsResource; record: AdminContentRecord | null; onClose: () => void; onSaved: () => void }) {
  const [isSaving, setIsSaving] = useState(false);
  const isEditing = Boolean(record?._id || record?.id);
  const read = (formData: FormData, field: string) => String(formData.get(field) || "").trim();
  const splitList = (value: string) => value.split(",").map((item) => item.trim()).filter(Boolean);
  const resourceLabel = resource === "case-studies" ? "Case Study" : resource === "blogs" ? "Blog Post" : "Service";
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const isPublished = formData.get("isPublished") === "on";
    const common = { title: read(formData, "title"), slug: read(formData, "slug"), isPublished };
    const payload: Record<string, unknown> = resource === "services" ? { ...common, summary: read(formData, "summary"), description: read(formData, "description"), features: splitList(read(formData, "features")) } : resource === "blogs" ? { ...common, excerpt: read(formData, "excerpt"), content: read(formData, "content"), category: read(formData, "category"), author: read(formData, "author"), tags: splitList(read(formData, "tags")) } : { ...common, clientName: read(formData, "clientName"), industry: read(formData, "industry"), service: read(formData, "service"), challenge: read(formData, "challenge"), solution: read(formData, "solution"), whatWeDid: read(formData, "whatWeDid"), capabilities: splitList(read(formData, "capabilities")) };
    setIsSaving(true);
    try {
      const id = record?._id || record?.id;
      if (isEditing && id) await adminService.updateContent(resource, id, payload);
      else await adminService.createContent(resource, payload);
      toast.success(`${resourceLabel} ${isEditing ? "updated" : "created"} successfully.`);
      onSaved();
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : `Unable to save this ${resourceLabel.toLowerCase()}.`);
    } finally {
      setIsSaving(false);
    }
  };
  return <div className="dash-cms-editor-backdrop" onMouseDown={onClose}><section className="dash-cms-editor" role="dialog" aria-modal="true" aria-label={`${isEditing ? "Edit" : "Add"} ${resourceLabel}`} onMouseDown={(event) => event.stopPropagation()}><header><div><h2>{isEditing ? `Edit ${resourceLabel}` : `Add ${resourceLabel}`}</h2><p>Fields required by the supplied backend controller are included.</p></div><button type="button" aria-label="Close editor" onClick={onClose}><X /></button></header><form onSubmit={submit}><label>Title<input name="title" required defaultValue={record?.title || ""} /></label><label>Slug<input name="slug" defaultValue={record?.slug || ""} placeholder="Generated from title if left blank" /></label>{resource === "services" ? <><label className="dash-cms-editor__wide">Summary<textarea name="summary" required defaultValue={record?.summary || ""} /></label><label className="dash-cms-editor__wide">Description<textarea name="description" required defaultValue={record?.description || ""} /></label><label className="dash-cms-editor__wide">Features <small>Separate with commas</small><input name="features" /></label></> : resource === "blogs" ? <><label>Category<input name="category" defaultValue={record?.category || "General"} /></label><label>Author<input name="author" defaultValue={record?.author || "Boost Vertex"} /></label><label className="dash-cms-editor__wide">Excerpt<textarea name="excerpt" required defaultValue={record?.excerpt || ""} /></label><label className="dash-cms-editor__wide">Content<textarea name="content" required defaultValue={record?.content || ""} /></label><label className="dash-cms-editor__wide">Tags <small>Separate with commas</small><input name="tags" /></label></> : <><label>Client Name<input name="clientName" required defaultValue={record?.clientName || ""} /></label><label>Industry<input name="industry" required defaultValue={record?.industry || ""} /></label><label>Service<input name="service" required defaultValue={record?.service || ""} /></label><label className="dash-cms-editor__wide">Challenge<textarea name="challenge" required defaultValue={record?.challenge || ""} /></label><label className="dash-cms-editor__wide">Solution<textarea name="solution" required defaultValue={record?.solution || ""} /></label><label className="dash-cms-editor__wide">What We Did<textarea name="whatWeDid" /></label><label className="dash-cms-editor__wide">Capabilities <small>Separate with commas</small><input name="capabilities" /></label></>}<label className="dash-cms-editor__published"><input name="isPublished" type="checkbox" defaultChecked={record?.isPublished ?? true} /> Publish this {resourceLabel.toLowerCase()}</label><footer><button type="button" onClick={onClose}>Cancel</button><button type="submit" disabled={isSaving}>{isSaving ? "SAVING..." : isEditing ? "SAVE CHANGES" : `CREATE ${resourceLabel.toUpperCase()}`}</button></footer></form></section></div>;
}

function ModuleView({ label }: { label: string }) {
  const detail = moduleDetails[label];
  const Icon = [...navigation, { label: "Admin Profile", icon: UserRound }].find((item) => item.label === label)?.icon ?? LayoutDashboard;
  const resource = cmsResources[label];
  const [records, setRecords] = useState<AdminContentRecord[]>([]);
  const [dataState, setDataState] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorRecord, setEditorRecord] = useState<AdminContentRecord | null>(null);
  const loadRecords = useCallback(() => {
    if (!resource || !getAdminToken()) return;
    setDataState("loading");
    adminService.contentList(resource, { page: 1, limit: 10 }).then((response) => {
      setRecords(response.data);
      setDataState("ready");
    }).catch(() => {
      setRecords([]);
      setDataState("error");
    });
  }, [resource]);

  useEffect(() => {
    loadRecords();
  }, [loadRecords]);

  const openEditor = (record: AdminContentRecord | null) => { setEditorRecord(record); setEditorOpen(true); };
  const removeRecord = async (record: AdminContentRecord) => {
    const id = record._id || record.id;
    if (!resource || !id) return;
    if (!window.confirm(`Delete ${record.title || record.name || "this record"}? This cannot be undone.`)) return;
    try {
      await adminService.deleteContent(resource, id);
      toast.success("Record deleted successfully.");
      loadRecords();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to delete this record.");
    }
  };
  const listContent = !resource ? <div className="dash-module-list__empty"><Icon /><h3>No supported API is documented</h3><p>This area remains frontend-only until the backend contract is provided.</p></div> : dataState === "loading" ? <div className="dash-module-list__empty"><Icon /><h3>Loading records</h3><p>Retrieving the latest backend content.</p></div> : dataState === "error" ? <div className="dash-module-list__empty"><CircleX /><h3>Unable to load records</h3><p>The content list request failed. Please retry.</p><button onClick={loadRecords}>Try again</button></div> : records.length ? <div className="dash-module-records">{records.map((record, index) => <article key={record._id || record.id || `${label}-${index}`}><span>{record.isPublished === false ? "Draft" : "Published"}</span><div><strong>{record.title || record.name || "Untitled record"}</strong><small>{record.slug ? `/${record.slug}` : "No slug provided"}</small></div><div className="dash-module-records__actions"><button aria-label={`Edit ${record.title || record.name || "record"}`} onClick={() => openEditor(record)}><Pencil /></button><button aria-label={`Delete ${record.title || record.name || "record"}`} onClick={() => removeRecord(record)}><Trash2 /></button></div></article>)}</div> : <div className="dash-module-list__empty"><Icon /><h3>No live records connected</h3><p>Publish or create records in the backend to populate this view.</p></div>;
  return <div className="dash-module-view">
    <header className="dash-module-view__header"><div><span className="dash-module-view__icon"><Icon /></span><h1>{label}</h1><p>{detail.description}</p></div><button onClick={() => resource ? openEditor(null) : toast.info(`${detail.action} is not available until its backend API is provided.`)}><Plus />{detail.action}</button></header>
    <section className="dash-module-view__toolbar"><label><Search /><input placeholder={`Search ${label.toLowerCase()}...`} /></label><button>All Status <ChevronDown /></button><button>Last 30 Days <ChevronDown /></button></section>
    <section className="dash-module-cards">{detail.items.map((item, index) => <article key={item}><span>{String(index + 1).padStart(2, "0")}</span><h2>{item}</h2><p>Frontend management UI ready for backend records.</p><button onClick={() => toast.info(`${item} details will be available when connected to the backend.`)}>Open view</button></article>)}</section>
    <section className="dash-card dash-module-list"><div className="dash-card__title"><h2>{label} Records</h2><button onClick={resource ? loadRecords : undefined}>{resource ? "Refresh" : "View all"}</button></div>{listContent}</section>
    {resource && editorOpen ? <CmsEditor resource={resource} record={editorRecord} onClose={() => { setEditorOpen(false); setEditorRecord(null); }} onSaved={loadRecords} /> : null}
  </div>;
}

function LeadListWorkspace() {
  const leadPreviewParams = new URLSearchParams(window.location.search);
  const leadStatePreview = leadPreviewParams.get("lead-state");
  const previewDialog = leadPreviewParams.get("lead-dialog");
  const previewNotice = leadPreviewParams.get("lead-notice");
  const updateFailurePreview = leadPreviewParams.get("lead-update") === "error";
  const [query, setQuery] = useState(leadStatePreview === "no-results" ? "not-found" : "");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [filtersOpen, setFiltersOpen] = useState(leadStatePreview === "filters");
  const [rowMenu, setRowMenu] = useState<string | null>(null);
  const initialDialog = updateFailurePreview ? "edit" : previewDialog === "new" || previewDialog === "detail" || previewDialog === "edit" || previewDialog === "delete" ? previewDialog : null;
  const [dialog, setDialog] = useState<"new" | "detail" | "edit" | "delete" | null>(initialDialog);
  const [selectedLead, setSelectedLead] = useState<LeadRecord>(leadRecords[0]);
  const [listState, setListState] = useState<"ready" | "loading" | "error" | "empty">(leadStatePreview === "empty" ? "empty" : leadStatePreview === "error" ? "error" : leadStatePreview === "loading" ? "loading" : "ready");
  const [notice, setNotice] = useState<"updated" | "created" | null>(previewNotice === "created" || previewNotice === "updated" ? previewNotice : null);
  const [updateError, setUpdateError] = useState(updateFailurePreview);
  const visibleLeads = leadRecords.filter((lead) => {
    const matchesQuery = `${lead.name} ${lead.company} ${lead.email} ${lead.service}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (statusFilter === "All Statuses" || lead.status === statusFilter);
  });

  return <div className="lead-workspace">
    <header className="lead-workspace__header">
      <div><h1>Leads</h1><p>Manage and track all incoming website leads.</p></div>
      <button className="lead-primary-action" onClick={() => { setNotice(null); setDialog("new"); }}><Plus />Add New Lead</button>
    </header>
    <section className="lead-list-card">
      <header className="lead-list-card__header">
        <div><h2>All Leads</h2><span>{leadRecords.length} leads</span></div>
        <div className="lead-list-card__tools">
          <label><Search /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search leads..." /></label>
          <button aria-label="Reload lead list" onClick={() => { setListState("loading"); window.setTimeout(() => setListState("ready"), 650); }}><TrendingUp /></button>
          <button className={filtersOpen ? "is-open" : ""} onClick={() => setFiltersOpen((open) => !open)}><Filter />Filters <ChevronDown /></button>
        </div>
      </header>
      {notice ? <div className="lead-success-notice"><Check /><span><b>{notice === "created" ? "Lead created" : "Lead updated"}</b>{notice === "created" ? " The lead has been added to the workspace." : " Your changes have been saved successfully."}</span><button aria-label="Dismiss success message" onClick={() => setNotice(null)}><X /></button></div> : null}
      {filtersOpen ? <div className="lead-filter-row"><label>Status<select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option>All Statuses</option><option>New</option><option>Contacted</option><option>Qualified</option><option>Converted</option><option>Closed</option></select></label><label>Source<select><option>All Sources</option><option>Website</option><option>Contact Form</option><option>Organic</option><option>Referral</option></select></label><label>Date Range<button><CalendarDays />Last 30 Days <ChevronDown /></button></label><button className="lead-filter-row__clear" onClick={() => { setQuery(""); setStatusFilter("All Statuses"); }}>Clear filters</button></div> : null}
      {listState === "loading" ? <div className="lead-loading-state"><i /><i /><i /><i /><i /><i /></div> : listState === "error" ? <div className="lead-error-state"><CircleX /><h2>Something went wrong</h2><p>We couldn&apos;t load the lead list. Please try again.</p><button onClick={() => setListState("ready")}>Try again</button></div> : listState === "empty" ? <div className="lead-no-list-state"><span><UsersRound /></span><h2>No leads listed yet</h2><p>New website enquiries will appear here once they are received.</p><button onClick={() => { setListState("ready"); setDialog("new"); }}><Plus />Add New Lead</button></div> : visibleLeads.length ? <div className="lead-table" role="table" aria-label="All leads">
        <div className="lead-table__head" role="row"><span>Lead</span><span>Company</span><span>Service</span><span>Source</span><span>Status</span><span>Received</span><span /></div>
        {visibleLeads.map((lead) => <div className="lead-table__row" role="row" key={lead.id}>
          <span className="lead-table__person"><b>{lead.name}<small>{lead.email}</small></b></span>
          <span>{lead.company}</span><span>{lead.service}</span><span>{lead.source}</span><span><Status value={lead.status} /></span><span>{lead.received}</span>
          <span className="lead-table__actions"><button aria-label={`Open ${lead.name} details`} onClick={() => { setSelectedLead(lead); setDialog("detail"); }}><Pencil /></button><button aria-label={`Open actions for ${lead.name}`} onClick={() => setRowMenu((open) => open === lead.id ? null : lead.id)}><MoreHorizontal /></button>{rowMenu === lead.id ? <div><button onClick={() => { setSelectedLead(lead); setRowMenu(null); setDialog("edit"); }}>Edit lead</button><button className="is-danger" onClick={() => { setSelectedLead(lead); setRowMenu(null); setDialog("delete"); }}>Delete lead</button></div> : null}</span>
        </div>)}
      </div> : <div className="lead-empty-state"><CircleX /><h2>No leads found</h2><p>Try updating your search or clearing the active filters.</p><button onClick={() => { setQuery(""); setStatusFilter("All Statuses"); }}>Clear filters</button></div>}
      <footer className="lead-pagination"><p>Showing <b>{visibleLeads.length}</b> of <b>{leadRecords.length}</b> leads</p><div><button disabled>Previous</button><button className="is-active">1</button><button>2</button><button>3</button><button>Next</button></div></footer>
    </section>
    {dialog ? <div className="lead-dialog-backdrop" role="presentation" onMouseDown={() => setDialog(null)}><section className={`lead-dialog lead-dialog--${dialog}`} role="dialog" aria-modal="true" aria-label={`${dialog} lead`} onMouseDown={(event) => event.stopPropagation()}>
      <header><div><h2>{dialog === "new" ? "Add New Lead" : dialog === "edit" ? "Edit Lead" : dialog === "delete" ? "Delete Lead" : "Lead Details"}</h2>{dialog !== "delete" ? <p>{dialog === "detail" ? "Review lead information and engagement details." : "Enter the lead details below."}</p> : null}</div><button aria-label="Close dialog" onClick={() => setDialog(null)}><X /></button></header>
      {dialog === "detail" ? <div className="lead-detail"><div className="lead-detail__identity"><i>{selectedLead.name.split(" ").map((part) => part[0]).join("")}</i><div><h3>{selectedLead.name}</h3><p>{selectedLead.company}</p></div><Status value={selectedLead.status} /></div><dl><div><dt>Email</dt><dd>{selectedLead.email}</dd></div><div><dt>Service</dt><dd>{selectedLead.service}</dd></div><div><dt>Source</dt><dd>{selectedLead.source}</dd></div><div><dt>Received</dt><dd>{selectedLead.received}</dd></div></dl><div className="lead-detail__note"><span>Message</span><p>Interested in discussing a tailored growth strategy and the right service mix for the upcoming campaign.</p></div></div> : dialog === "delete" ? <div className="lead-delete"><span><CircleX /></span><h3>Delete this lead?</h3><p>This will permanently remove <b>{selectedLead.name}</b> from the lead list. This action cannot be undone.</p></div> : <form className="lead-form" onSubmit={(event) => { event.preventDefault(); if (updateError) { setUpdateError(false); return; } setDialog(null); setNotice(dialog === "new" ? "created" : "updated"); }}><label>Full Name<input defaultValue={dialog === "edit" ? selectedLead.name : ""} placeholder="Enter full name" required /></label><label>Company<input defaultValue={dialog === "edit" ? selectedLead.company : ""} placeholder="Enter company name" /></label><label>Email Address<input type="email" defaultValue={dialog === "edit" ? selectedLead.email : ""} placeholder="name@company.com" required /></label><label>Phone Number<input placeholder="Enter phone number" /></label><label>Service<select defaultValue={dialog === "edit" ? selectedLead.service : ""} required><option value="" disabled>Select service</option><option>Paid Advertising</option><option>Web Development</option><option>SEO</option><option>Content Marketing</option><option>Social Media</option><option>Brand Strategy</option></select></label><label>Status<select defaultValue={dialog === "edit" ? selectedLead.status : "New"}><option>New</option><option>Contacted</option><option>Qualified</option><option>Converted</option><option>Closed</option></select></label><label className="lead-form__wide">Notes<textarea placeholder="Add lead notes or message details" defaultValue={dialog === "edit" ? "Interested in discussing a tailored growth strategy and service mix." : ""} /></label>{updateError ? <div className="lead-form__error"><CircleX /><span><b>Something went wrong while updating.</b>Please check the lead information and try again.</span></div> : null}<footer><button type="button" onClick={() => setDialog(null)}>Cancel</button><button type="submit">{updateError ? "Try Again" : dialog === "new" ? "Create Lead" : "Save Changes"}</button></footer></form>}
      {dialog === "detail" ? <footer className="lead-dialog__footer"><button onClick={() => setDialog(null)}>Close</button><button onClick={() => setDialog("edit")}><Pencil />Edit Lead</button></footer> : dialog === "delete" ? <footer className="lead-dialog__footer"><button onClick={() => setDialog(null)}>Cancel</button><button className="is-danger" onClick={() => { setDialog(null); toast.success("Lead deleted from this frontend preview."); }}><Trash2 />Delete Lead</button></footer> : null}
    </section></div> : null}
  </div>;
}

function LeadReferenceWorkspace({ records = leadRecords, apiState = "ready", onRetry, pagination, onQueryChange, onStatusChange, onSourceChange, onPageChange, onExport, onMarkRead, onUpdateStatus }: { records?: LeadRecord[]; apiState?: "ready" | "loading" | "error"; onRetry?: () => void; pagination?: ApiPagination | null; onQueryChange?: (value: string) => void; onStatusChange?: (value: string) => void; onSourceChange?: (value: string) => void; onPageChange?: (page: number) => void; onExport?: () => void; onMarkRead?: (lead: LeadRecord) => void; onUpdateStatus?: (lead: LeadRecord, status: LeadRecord["status"]) => Promise<void> }) {
  const previewParams = new URLSearchParams(window.location.search);
  const previewState = previewParams.get("lead-state");
  const previewDialog = previewParams.get("lead-dialog");
  const previewNotice = previewParams.get("lead-notice");
  const previewUpdateError = previewParams.get("lead-update") === "error";
  const [query, setQuery] = useState(previewState === "no-results" ? "Mavin Copper" : "");
  const [status, setStatus] = useState("All");
  const [source, setSource] = useState("All");
  const [filterOpen, setFilterOpen] = useState(previewState === "filters");
  const [mode, setMode] = useState<"list" | "empty" | "error" | "loading">(previewState === "empty" ? "empty" : previewState === "error" ? "error" : previewState === "loading" ? "loading" : "list");
  const initialModal = previewNotice === "updated" ? "success" : previewUpdateError ? "update-error" : previewDialog === "new" || previewDialog === "edit" || previewDialog === "delete" || previewDialog === "detail" ? previewDialog : null;
  const [modal, setModal] = useState<"new" | "edit" | "delete" | "detail" | "success" | "update-error" | null>(initialModal);
  const [selectedLead, setSelectedLead] = useState<LeadRecord | null>(null);
  const noResults = previewState === "no-results" || (!!query && !records.some((lead) => `${lead.name} ${lead.email} ${lead.company}`.toLowerCase().includes(query.toLowerCase())));
  const resolvedMode = previewState ? (mode === "list" && records.length === 0 ? "empty" : mode) : apiState === "loading" ? "loading" : apiState === "error" ? "error" : mode === "list" && records.length === 0 ? "empty" : mode;

  const clearSearch = () => { setQuery(""); setStatus("All"); setSource("All"); onQueryChange?.(""); onStatusChange?.("All"); onSourceChange?.("All"); };
  if (modal === "detail") return <LeadReferenceDetail lead={selectedLead || records[0] || leadRecords[0]} onClose={() => setModal(null)} onEdit={() => setModal("edit")} />;
  const listHeader = <header className="lead-ref-toolbar">
    <label><Search /><input value={query} onChange={(event) => { const value = event.target.value; setQuery(value); onQueryChange?.(value); }} placeholder="Search leads by name, email, company..." /></label>
    <div className="lead-ref-toolbar__filters"><span>Status:</span><select value={status} onChange={(event) => { const value = event.target.value; setStatus(value); onStatusChange?.(value); }}><option>All</option><option>New</option><option>Contacted</option><option>Qualified</option><option>Converted</option><option>Closed</option></select><span>Source:</span><select value={source} onChange={(event) => { const value = event.target.value; setSource(value); onSourceChange?.(value); }}><option>All</option><option>Website</option><option>Google Ads</option><option>Referral</option><option>LinkedIn</option></select><button onClick={() => setFilterOpen(true)}><Filter />Filter</button></div>
  </header>;

  if (resolvedMode === "error") return <div className="lead-ref-workspace"><LeadReferencePageHeader onAdd={() => setModal("new")} /><section className="lead-ref-network-error"><span><CircleX /></span><h2>Something went wrong</h2><p>Unable to load leads. Please try again.</p><button onClick={onRetry ?? (() => setMode("list"))}><RotateCcw />Try Again</button><small>Error Code: ERR_NETWORK_TIMEOUT_504</small></section></div>;

  return <div className="lead-ref-workspace">
    <LeadReferencePageHeader onAdd={() => setModal("new")} onExport={onExport} />
    {resolvedMode === "empty" ? <section className="lead-ref-card lead-ref-no-list"><span><FolderOpen /></span><h2>No leads found</h2><p>You don&apos;t have any leads yet. Start by adding a new lead<br />manually or importing a list from a CSV file.</p><button className="lead-ref-primary" onClick={() => setModal("new")}><Plus />Add Lead</button><button className="lead-ref-secondary" onClick={() => toast.info("CSV import will connect to the admin API when it is deployed.")}><Upload />IMPORT CSV</button></section> : resolvedMode === "loading" ? <section className="lead-ref-card lead-ref-skeleton"><div className="lead-ref-skeleton__toolbar"><i /><i /><i /><i /></div><div className="lead-ref-table__head"><span>Name</span><span>Company</span><span>Email</span><span>Phone</span><span>Source</span><span>Status</span><span>Date<br />Received</span><span>Actions</span></div>{Array.from({ length: 5 }, (_, row) => <div className="lead-ref-skeleton__row" key={row}>{Array.from({ length: 8 }, (__, cell) => <i key={cell} />)}</div>)}<div className="lead-ref-skeleton__footer"><i /><i /><i /></div></section> : <section className="lead-ref-card lead-ref-list-card">{listHeader}{noResults ? <div className="lead-ref-no-results"><span><Search /></span><h2>No leads match your search</h2><p>We couldn&apos;t find any leads matching “Invalid lead<br />query”. Try adjusting your search terms or filters to<br />find what you&apos;re looking for.</p><button className="lead-ref-primary" onClick={clearSearch}>Clear Filter</button></div> : <><div className="lead-ref-table"><div className="lead-ref-table__head"><span>Name</span><span>Company</span><span>Email</span><span>Phone</span><span>Source</span><span>Status</span><span>Date<br />Received</span><span>Actions</span></div>{records.slice(0, 5).map((lead, index) => <div className="lead-ref-table__row" key={lead.id}><span className={`lead-ref-avatar avatar-${index}`}><img src={leadAvatarUrls[index % leadAvatarUrls.length]} alt="" /></span><strong>{lead.name}</strong><span>{lead.company}</span><span>{lead.email}</span><span>{lead.phone}</span><span>{lead.source}</span><span><Status value={lead.status} /></span><span>{lead.received}</span><span className="lead-ref-table__actions"><button aria-label={`View ${lead.name}`} onClick={() => setModal("detail")}><Eye /></button><button aria-label={`Edit ${lead.name}`} onClick={() => setModal("edit")}><Pencil /></button><button aria-label={`Delete ${lead.name}`} onClick={() => setModal("delete")}><Trash2 /></button></span></div>)}</div><footer className="lead-ref-pagination"><span>Showing {records.length ? 1 : 0} to {Math.min(records.length, 5)} of {records.length} leads</span><div>Rows per page: <b>10</b><ChevronDown /><button>‹</button><button className="is-active">1</button><button>2</button><button>3</button><button>4</button><button>›</button></div></footer></>}</section>}
    {filterOpen ? <div className="lead-ref-overlay" onMouseDown={() => setFilterOpen(false)}><section className="lead-ref-filter-modal" role="dialog" aria-label="Filters" onMouseDown={(event) => event.stopPropagation()}><header><h2>Filters</h2><button onClick={clearSearch}>Clear All</button></header><label>Status<select defaultValue="All Statuses"><option>All Statuses</option><option>New</option><option>Contacted</option><option>Qualified</option></select></label><label>Source<select defaultValue="All Sources"><option>All Sources</option><option>Website</option><option>Google Ads</option><option>Referral</option></select></label><label>Date Range<span className="lead-ref-date-range"><input placeholder="Start date" /><b>→</b><input placeholder="End date" /></span></label><footer><button onClick={() => setFilterOpen(false)}>Cancel</button><button className="lead-ref-primary" onClick={() => setFilterOpen(false)}>Apply Filters</button></footer></section></div> : null}
    {modal ? <LeadReferenceModal kind={modal} onClose={() => setModal(null)} onSuccess={() => setModal("success")} /> : null}
  </div>;
}

function LeadReferencePageHeader({ onAdd, onExport }: { onAdd: () => void; onExport?: () => void }) {
  return <header className="lead-ref-page-header"><div><h1>Leads</h1><p>Manage and track all leads from your website and campaigns.</p></div><div><button className="lead-ref-export" onClick={onExport ?? (() => toast.info("CSV export is available when connected to the Lead API."))}><Download />Export</button><button className="lead-ref-primary" onClick={onAdd}><Plus />Add Lead</button></div></header>;
}

function LeadReferenceModal({ kind, onClose, onSuccess }: { kind: "new" | "edit" | "delete" | "success" | "update-error"; onClose: () => void; onSuccess: () => void }) {
  const isSuccess = kind === "success";
  const isError = kind === "update-error";
  const isDelete = kind === "delete";
  if (isSuccess || isError || isDelete) return <div className="lead-ref-overlay" onMouseDown={onClose}><section className={`lead-ref-feedback-modal ${isSuccess ? "is-success" : "is-error"}`} role="dialog" onMouseDown={(event) => event.stopPropagation()}><button className="lead-ref-modal-close" aria-label="Close dialog" onClick={onClose}><X /></button><span>{isSuccess ? <Check /> : <CircleX />}</span><h2>{isSuccess ? "Lead Updated" : isDelete ? "Delete Lead" : "Something went wrong"}</h2><p>{isSuccess ? "The lead information has been\nupdated successfully." : isDelete ? "Are you sure you want to delete this lead?\nThis action cannot be undone." : "Unable to load leads. Please try again."}</p>{isSuccess ? <button className="lead-ref-primary" onClick={onClose}>Go to Leads</button> : isDelete ? <footer><button onClick={onClose}>Cancel</button><button className="lead-ref-delete-action" onClick={onClose}>Delete Lead</button></footer> : <><button className="lead-ref-try-again" onClick={onClose}><RotateCcw />Try Again</button><small>Error Code: ERR_NETWORK_TIMEOUT_504</small></>}</section></div>;
  const edit = kind === "edit";
  return <div className="lead-ref-overlay" onMouseDown={onClose}><section className="lead-ref-form-modal" role="dialog" aria-label={edit ? "Edit Lead" : "Add New Lead"} onMouseDown={(event) => event.stopPropagation()}><header><h2>{edit ? "Edit Lead" : "Add New Lead"}</h2><button className="lead-ref-modal-close" aria-label="Close dialog" onClick={onClose}><X /></button></header>{!edit ? <strong className="lead-ref-form-section">PERSONAL INFORMATION</strong> : null}<form onSubmit={(event) => { event.preventDefault(); onSuccess(); }}><label>Name{!edit ? <b>*</b> : null}<input defaultValue={edit ? "Wade Warren" : ""} placeholder="Enter full name" required /></label><label>Company<input defaultValue={edit ? "ABC Real Estate" : ""} placeholder="Enter company name" /></label><label>Email Address{!edit ? <b>*</b> : null}<input type="email" defaultValue={edit ? "wade@abcrealestate.com" : ""} placeholder={edit ? "" : "Enter email address"} required /></label><label>Phone Number<input defaultValue={edit ? "+1 (555) 123-4567" : ""} placeholder={edit ? "" : "Enter phone number"} /></label>{!edit ? <strong className="lead-ref-form-section lead-ref-form-section--details">LEAD DETAILS</strong> : null}<label>Source<select defaultValue={edit ? "Website" : ""}><option value="" disabled>Select source</option><option>Website</option><option>Google Ads</option><option>Referral</option><option>LinkedIn</option></select></label><label>{edit ? "Status" : "Initial Status"}<select defaultValue="New"><option>New</option><option>Contacted</option><option>Qualified</option><option>Converted</option></select></label>{!edit ? <label className="lead-ref-form-notes">Additional Notes<textarea placeholder="Enter any initial notes or context..." /></label> : null}<footer><button type="button" onClick={onClose}>Cancel</button><button className="lead-ref-primary" type="submit">{edit ? "Update Lead" : "Save Lead"}</button></footer></form></section></div>;
}

function LeadReferenceDetail({ lead: _lead, onClose, onEdit }: { lead: LeadRecord; onClose: () => void; onEdit: () => void }) {
  return <div className="lead-ref-detail">
    <header className="lead-ref-detail__top"><span><button className="lead-ref-detail__crumb" onClick={onClose}>Leads</button><b>›</b> Lead Details</span><div><button onClick={onEdit}><Pencil />Edit Lead</button><button>More Actions <ChevronDown /></button></div></header>
    <main><h1>Lead Details</h1><section className="lead-ref-detail__identity"><div className="lead-ref-detail__avatar">WW</div><div><h2>Wade Warren <Status value="New" /></h2><p><BriefcaseBusiness />ABC Real Estate</p></div><dl><div><dt>Lead Score</dt><dd><b>80</b> <strong>80</strong> / 100</dd></div><div><dt>Date Received</dt><dd><strong>May 20, 2025</strong><small>10:30 AM</small></dd></div></dl></section><div className="lead-ref-detail__grid"><div><section className="lead-ref-detail__card lead-ref-contact"><h2>Contact Information</h2><div><p><Mail />wade@abcrealestate.com</p><p>⌕ +1 (555) 123-4567</p><p>◎ www.abcrealestate.com</p><p>⌖ 123 Business Blvd.<br />&nbsp;&nbsp;&nbsp;New York, NY 10001, USA</p></div><aside><span>Lead Source</span><p>◎ Website</p><span>Assigned To</span><p><i>AU</i>Admin User</p></aside></section><section className="lead-ref-detail__card lead-ref-message"><h2>Inquiry / Message</h2><blockquote>“Hi Vertex team, we are looking to overhaul our current property management CMS. Our current system is slow and lacking proper API integrations for our bespoke analytics tools. Interested in learning more about your strategic consulting and implementation timelines for Q3. We need a solution that scales across our West Coast operations.”</blockquote><small>Received: Oct 12, 2023 - 14:32 PST</small></section><section className="lead-ref-detail__card lead-ref-timeline"><h2>Activity Timeline</h2><ol><li><small>Today, 10:45 AM</small><p>Status changed to <b>Qualified - Sales</b><br />by Jane Smith</p></li><li><small>Yesterday, 14:20 PM</small><p>⌕ Discovery Call Completed</p><blockquote>Client needs strong API support for legacy systems. Timeline is aggressive (Q3). Proceeding to technical demo.</blockquote></li><li><small>Oct 13, 09:00 AM</small><p>✉ Automated Response Sent</p></li><li><small>Oct 12, 14:32 PM</small><p>Lead Created<br /><em>Source: Website Form (Organic)</em></p></li></ol></section></div><aside><section className="lead-ref-detail__card"><h2>Lead Stage</h2><select><option>Qualified - Sales</option></select><h3>Status</h3><select><option>New</option></select><h3>Notes <button>+ Add Note</button></h3><i>No notes added yet.</i></section><section className="lead-ref-detail__card lead-ref-quick-note"><h2>Quick Note</h2><textarea placeholder="Add technical requirements or meeting summary..." /><button>Log Note</button></section></aside></div></main><button className="lead-ref-detail__back" onClick={onClose}>Back to Leads</button>
  </div>;
}

function LeadModuleWorkspace({ onMenu }: { onMenu: () => void }) {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia("(max-width: 767px)").matches);
  const [liveRecords, setLiveRecords] = useState<LeadRecord[] | null>(null);
  const [apiState, setApiState] = useState<"ready" | "loading" | "error">("ready");
  const [liveQuery, setLiveQuery] = useState("");
  const [liveStatus, setLiveStatus] = useState("All");
  const [liveSource, setLiveSource] = useState("All");
  const [livePage, setLivePage] = useState(1);
  const [livePagination, setLivePagination] = useState<ApiPagination | null>(null);
  const isReviewState = new URLSearchParams(window.location.search).has("lead-state") || new URLSearchParams(window.location.search).has("lead-dialog") || new URLSearchParams(window.location.search).has("lead-notice") || new URLSearchParams(window.location.search).has("lead-update") || new URLSearchParams(window.location.search).has("lead-mobile");
  const loadLiveLeads = useCallback(() => {
    if (!getAdminToken() || isReviewState) return;
    let active = true;
    setApiState("loading");
    adminService.leads({ page: livePage, limit: 10, q: liveQuery || undefined, status: liveStatus === "All" ? undefined : leadStatusToApi[liveStatus as LeadRecord["status"]], source: liveSource === "All" ? undefined : liveSource }).then((response) => {
      if (!active) return;
      setLiveRecords(response.data.map(mapBackendLead));
      setLivePagination(response.pagination);
      setApiState("ready");
    }).catch(() => {
      if (!active) return;
      setLiveRecords(null);
      setLivePagination(null);
      setApiState("error");
    });
    return () => { active = false; };
  }, [isReviewState, livePage, liveQuery, liveSource, liveStatus]);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    return loadLiveLeads();
  }, [loadLiveLeads]);
  if (isMobile) return <MobileLeadWorkspace onMenu={onMenu} />;
  if (isReviewState) return <LeadReferenceWorkspace records={leadRecords} />;
  const updateQuery = (value: string) => { setLivePage(1); setLiveQuery(value); };
  const updateStatus = (value: string) => { setLivePage(1); setLiveStatus(value); };
  const updateSource = (value: string) => { setLivePage(1); setLiveSource(value); };
  const exportLiveLeads = async () => {
    try {
      const result = await adminService.exportLeads({ q: liveQuery || undefined, status: liveStatus === "All" ? undefined : leadStatusToApi[liveStatus as LeadRecord["status"]], source: liveSource === "All" ? undefined : liveSource });
      const url = URL.createObjectURL(result.blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = result.filename;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);
      toast.success("Lead CSV exported successfully.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to export leads.");
    }
  };
  return <LeadReferenceWorkspace records={liveRecords ?? []} apiState={apiState} onRetry={loadLiveLeads} pagination={livePagination} onQueryChange={updateQuery} onStatusChange={updateStatus} onSourceChange={updateSource} onPageChange={setLivePage} onExport={exportLiveLeads} />;
}

function MobileLeadAppBar({ onMenu }: { onMenu: () => void }) {
  return <header className="lead-mobile-appbar"><button aria-label="Open admin menu" onClick={onMenu}><Menu /></button><div className="lead-mobile-appbar__brand"><span><img src={logoUrl} alt="" /></span><strong>Boost Vertex</strong></div><div><button aria-label="Search leads"><Search /></button><button aria-label="Open notifications"><Bell /></button><button aria-label="Open settings"><Settings /></button><span>AU</span></div></header>;
}

function MobileLeadCard({ lead, avatar, onDetails }: { lead: LeadRecord; avatar: string; onDetails: () => void }) {
  return <article className="lead-mobile-card" onClick={onDetails} role="button" tabIndex={0} onKeyDown={(event) => { if (event.key === "Enter") onDetails(); }}><header><img src={avatar} alt="" /><div><h2>{lead.name}</h2><p>{lead.company}</p></div><button aria-label={`More actions for ${lead.name}`} onClick={(event) => { event.stopPropagation(); toast.info("Lead actions are available from the selected record."); }}><MoreHorizontal /></button></header><footer><div><Status value={lead.status} /><span>{lead.source}</span></div><small>{lead.received}</small></footer></article>;
}

function MobileLeadWorkspace({ onMenu }: { onMenu: () => void }) {
  const previewParams = new URLSearchParams(window.location.search);
  const previewState = previewParams.get("lead-state");
  const previewDialog = previewParams.get("lead-dialog");
  const mobilePreview = previewParams.get("lead-mobile");
  const [screen, setScreen] = useState<"list" | "search" | "found" | "no-results" | "empty" | "loading" | "error">(previewState === "empty" ? "empty" : previewState === "loading" ? "loading" : previewState === "error" ? "error" : previewState === "no-results" ? "no-results" : mobilePreview === "search" ? "search" : mobilePreview === "search-found" ? "found" : "list");
  const [query, setQuery] = useState(screen === "found" ? "Enterprise" : screen === "no-results" ? "mavin Copper" : "");
  const [mobileModal, setMobileModal] = useState<"new" | "edit" | "delete" | "filters" | "detail" | "success" | "save-error" | null>(previewDialog === "new" || previewDialog === "edit" || previewDialog === "delete" || previewDialog === "detail" ? previewDialog : previewState === "filters" ? "filters" : previewParams.get("lead-notice") === "updated" ? "success" : previewParams.get("lead-update") === "error" ? "save-error" : null);

  const cards = leadRecords.slice(0, 4);
  const clearSearch = () => { setQuery(""); setScreen("list"); };
  if (mobileModal === "detail") return <MobileLeadDetail onClose={() => setMobileModal(null)} onEdit={() => setMobileModal("edit")} />;
  const listContent = screen === "loading" ? <section className="lead-mobile-skeleton"><i className="lead-mobile-skeleton__title" /><i className="lead-mobile-skeleton__search" />{Array.from({ length: 5 }, (_, index) => <article key={index}><i /><div><b /><b /></div><em /></article>)}</section> : screen === "error" ? <section className="lead-mobile-error"><span><CircleX /></span><h1>Something went wrong</h1><p>We encountered a technical error while retrieving your lead data. Our systems have logged the issue and are attempting to reconnect.</p><button className="lead-mobile-lime" onClick={() => setScreen("list")}><RotateCcw />Try Again</button><small>ERR_CONNECTION_REFUSED •<br />REGION_US_EAST</small></section> : screen === "empty" ? <section className="lead-mobile-empty"><span><FolderOpen /></span><h1>No Leads Yet</h1><p>Start building your pipeline by adding your first lead manually or importing a batch via CSV.</p><button className="lead-mobile-lime" onClick={() => setMobileModal("new")}><Plus />ADD NEW LEAD</button><button className="lead-mobile-outline" onClick={() => toast.info("CSV import will connect when the Lead API is deployed.")}><Upload />IMPORT CSV</button></section> : screen === "no-results" ? <section className="lead-mobile-no-results"><span><Search /></span><h1>No matches found</h1><p>We couldn&apos;t find anything matching “mavin Copper”. Try a different search term or browse popular categories.</p><button className="lead-mobile-lime" onClick={clearSearch}>CLEAR SEARCH</button><h2>Suggested Categories</h2><div><button>SEO</button><button>PPC</button><button>ANALYTICS</button><button>REPORTS</button></div></section> : screen === "search" ? <section className="lead-mobile-search-home"><header><h2>Recent Searches</h2><button onClick={() => toast.info("Recent searches cleared.")}>CLEAR ALL</button></header><ul><li>SEO campaign Q4</li><li>West Coast properties</li><li>Enterprise dashboards</li></ul><h2>Trending Categories</h2><div><button>SEO</button><button>PPC</button><button>ANALYTICS</button><button>REPORTS</button></div><header><h2>Search Results</h2><span>9 MATCHES</span></header>{[[UsersRound, "Leads", "4 documents"], [BriefcaseBusiness, "Services", "3 documents"], [FileText, "Articles", "2 documents"]].map(([Icon, title, count]) => <button className="lead-mobile-search-result" key={title as string}><span><Icon /></span><div><b>{title as string}</b><small>{count as string}</small></div><ChevronDown /></button>)}</section> : <>{screen === "found" ? <p className="lead-mobile-found-copy">Showing results for <b>“Enterprise”</b></p> : null}<section className="lead-mobile-cards">{cards.map((lead, index) => <MobileLeadCard key={lead.id} lead={lead} avatar={leadAvatarUrls[index]} onDetails={() => setMobileModal("detail")} />)}</section><button className="lead-mobile-load-more">Load More</button></>;

  return <div className="lead-mobile-workspace"><MobileLeadAppBar onMenu={onMenu} /><main><header className="lead-mobile-title"><h1>Leads</h1><button className="lead-mobile-add" aria-label="Add lead" onClick={() => setMobileModal("new")}><Plus /></button></header>{screen !== "loading" && screen !== "error" && screen !== "empty" ? <div className={`lead-mobile-search ${screen === "search" || screen === "found" || screen === "no-results" ? "is-active" : ""}`}><label><Search /><input value={query} onFocus={() => setScreen("search")} onChange={(event) => { const value = event.target.value; setQuery(value); setScreen(value.toLowerCase().includes("enterprise") ? "found" : value ? "no-results" : "search"); }} placeholder="Search leads..." />{query ? <button aria-label="Clear search" onClick={clearSearch}><X /></button> : null}</label><button aria-label="Open filters" onClick={() => setMobileModal("filters")}><Filter /></button></div> : null}{listContent}</main>{mobileModal ? <MobileLeadModal kind={mobileModal} onClose={() => setMobileModal(null)} onSuccess={() => setMobileModal("success")} /> : null}</div>;
}

function MobileLeadDetail({ onClose, onEdit }: { onClose: () => void; onEdit: () => void }) {
  return <div className="lead-mobile-detail"><header className="lead-mobile-detail__bar"><button onClick={onClose} aria-label="Back to leads"><ArrowLeft /></button><h1>Lead Details</h1><button aria-label="More lead actions"><MoreHorizontal /></button></header><main><section className="lead-mobile-detail__identity"><div><i>WW</i><span><h2>Wade Warren <Status value="New" /></h2><p>ABC Real Estate</p></span></div><dl><div><dt>Lead Score</dt><dd><b>80</b> <strong>80</strong> / 100</dd></div><div><dt>Date Received</dt><dd>May 20, 2025<small>10:30 AM</small></dd></div></dl></section><div className="lead-mobile-detail__actions"><button onClick={onEdit}><Pencil />Edit</button><button className="lead-mobile-detail__contact-action"><MessageSquare />Contact</button></div><section className="lead-mobile-detail__card lead-mobile-detail__stage"><h2>Lead Stage</h2><select><option>Qualified - Sales</option></select><h2>Status</h2><select><option>New</option></select></section><section className="lead-mobile-detail__card lead-mobile-detail__contact"><h2>Contact Information</h2><p><Mail />wade@abcrealestate.com</p><p>⌕ +1 (555) 123-4567</p><p>◎ www.abcrealestate.com</p><p>⌖ 123 Business Blvd.<br />&nbsp;&nbsp;&nbsp;New York, NY 10001, USA</p><hr /><div><span><small>Lead Source</small>◎ Website</span><span><small>Assigned To</small><i>AU</i> Admin User</span></div></section><section className="lead-mobile-detail__card lead-mobile-detail__message"><h2>Inquiry / Message</h2><blockquote>“Hi Vertex team, we are looking to overhaul our current property management CMS. Our current system is slow and lacking proper API integrations for our bespoke analytics tools. Interested in learning more about your strategic consulting and implementation timelines for Q3. We need a solution that scales across our West Coast operations.”</blockquote><small>Received: Oct 12, 2023 - 14:32 PST</small></section><section className="lead-mobile-detail__card lead-mobile-detail__note"><h2>Quick Note</h2><textarea placeholder="Add technical requirements or meeting summary..." /><button>Log Note</button></section><section className="lead-mobile-detail__card lead-mobile-detail__timeline"><h2>Activity Timeline</h2><ol><li><small>Today, 10:45 AM</small><p>Status changed to <b>Qualified - Sales</b><br />by Jane Smith</p></li><li><small>Yesterday, 14:20 PM</small><p>⌕ Discovery Call Completed</p><blockquote>Client needs strong API support for legacy systems. Timeline is aggressive (Q3). Proceeding to technical demo.</blockquote></li><li><small>Oct 13, 09:00 AM</small><p>✉ Automated Response Sent</p></li><li><small>Oct 12, 14:32 PM</small><p>Lead Created<br /><em>Source: Website Form (Organic)</em></p></li></ol></section></main></div>;
}

function MobileLeadModal({ kind, onClose, onSuccess }: { kind: "new" | "edit" | "delete" | "filters" | "detail" | "success" | "save-error"; onClose: () => void; onSuccess: () => void }) {
  const formFields = <><label>Name <b>*</b><input placeholder="Enter full name" defaultValue={kind === "edit" ? "Wade Warren" : ""} /></label><label>Company<input placeholder="Enter company name" defaultValue={kind === "edit" ? "ABC Real Estate" : ""} /></label><label>Email Address <b>*</b><input placeholder="Enter email address" defaultValue={kind === "edit" ? "wade@abcrealestate.com" : ""} /></label><label>Phone Number<input placeholder="Enter phone number" defaultValue={kind === "edit" ? "+1 (555) 123-4567" : ""} /></label><label>Source<select defaultValue={kind === "edit" ? "Website" : ""}><option value="" disabled>Select source</option><option>Website</option><option>Google Ads</option><option>Referral</option></select></label><label>{kind === "edit" ? "Status" : "Initial Status"}<select defaultValue="New"><option>New</option><option>Contacted</option><option>Qualified</option></select></label></>;
  const content = kind === "filters" ? <section className="lead-mobile-sheet lead-mobile-filter-sheet"><i /><header><h2>Filters</h2><button>Clear All</button></header><label>Status<select><option>All Statuses</option></select></label><label>Source<select><option>All Sources</option></select></label><label>Date Range<span><input placeholder="Start date" /><b>→</b><input placeholder="End date" /></span></label><footer><button onClick={onClose}>Cancel</button><button className="lead-mobile-lime" onClick={onClose}>Apply Filters</button></footer></section> : kind === "new" ? <section className="lead-mobile-add-modal"><header><h2>Add New Lead</h2><button onClick={onClose}><X /></button></header><form onSubmit={(event) => { event.preventDefault(); onSuccess(); }}><strong>PERSONAL INFORMATION</strong>{formFields}<strong>LEAD DETAILS</strong><label className="is-full">Additional Notes<textarea placeholder="Enter any initial notes or context..." /></label><footer><button type="button" onClick={onClose}>Cancel</button><button className="lead-mobile-lime" type="submit">Save Lead</button></footer></form></section> : kind === "edit" ? <section className="lead-mobile-edit-sheet"><header><h2>Edit Lead</h2><button onClick={onClose}><X /></button></header><form onSubmit={(event) => { event.preventDefault(); onSuccess(); }}>{formFields}<footer><button type="button" onClick={onClose}>Cancel</button><button className="lead-mobile-lime" type="submit">Update Lead</button></footer></form></section> : kind === "delete" ? <section className="lead-mobile-feedback is-delete"><button onClick={onClose}><X /></button><span><CircleX /></span><h2>Delete Lead</h2><p>Are you sure you want to delete this lead?<br />This action cannot be undone.</p><footer><button onClick={onClose}>Cancel</button><button className="is-danger" onClick={onClose}>Delete Lead</button></footer></section> : kind === "success" ? <section className="lead-mobile-feedback is-success"><span><Check /></span><h2>Lead Updated</h2><p>The lead information has been<br />updated successfully.</p><button className="lead-mobile-lime" onClick={onClose}>Go to Leads</button></section> : <section className="lead-mobile-feedback is-error"><span><CircleX /></span><h2>Save Failed</h2><p>The system was unable to save the lead information due to a connection timeout. Please check your network and try again.</p><button className="lead-mobile-lime" onClick={onSuccess}>RETRY SAVE</button><button className="is-cancel" onClick={onClose}>CANCEL</button></section>;
  return <div className="lead-mobile-modal-backdrop" onMouseDown={onClose}>{<div onMouseDown={(event) => event.stopPropagation()}>{content}</div>}</div>;
}

export default function AdminDashboard() {
  const [location, setLocation] = useLocation();
  const [query, setQuery] = useState("");
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [dashboard, setDashboard] = useState<DashboardResponse | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null);
  const notificationPanelRef = useRef<HTMLElement>(null);
  const notificationBellRef = useRef<HTMLButtonElement>(null);
  const active = Object.entries(modulePaths).find(([, path]) => location === `/admin/${path}`)?.[0] ?? "Dashboard";
  const isCompactAdminNavbar = true;
  const breadcrumbCurrent = adminScreenLabel(active, window.location.search);
  const profileName = profile?.name || "Admin User";
  const profileInitials = profileName.split(" ").filter(Boolean).map((part) => part[0]).join("").slice(0, 2).toUpperCase() || "AU";
  const summary = dashboard?.summary;
  const metricValues: Record<string, string> = {
    "Total Leads": summary?.leads?.total?.toLocaleString() ?? metrics[0][1],
    "New Leads": summary?.leads?.unread?.toLocaleString() ?? metrics[1][1],
    Services: summary?.services?.total?.toLocaleString() ?? metrics[2][1],
    "Case Studies": summary?.caseStudies?.total?.toLocaleString() ?? metrics[4][1],
    "Blog / Resources": summary?.blogs?.total?.toLocaleString() ?? metrics[5][1],
  };
  const dashboardLeadRows = dashboard?.recentLeads?.length ? dashboard.recentLeads.slice(0, 5).map((lead) => [lead.name || "Unnamed lead", lead.company || "—", lead.status || "New", lead.createdAt ? new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(lead.createdAt)) : "—"]) : leads;

  useEffect(() => {
    if (!getAdminToken()) return;
    let isCurrent = true;
    authService.me().then((currentProfile) => {
      if (isCurrent) setProfile(currentProfile);
    }).catch(() => {
      if (isCurrent) setProfile(null);
    });
    return () => { isCurrent = false; };
  }, []);

  useEffect(() => {
    if (!getAdminToken()) return;
    let isCurrent = true;
    adminService.dashboard().then((response) => {
      if (isCurrent) setDashboard(response);
    }).catch(() => {
      if (isCurrent) setDashboard(null);
    });
    adminService.analytics().then((response) => {
      if (isCurrent) setAnalytics(response);
    }).catch(() => {
      if (isCurrent) setAnalytics(null);
    });
    return () => { isCurrent = false; };
  }, []);

  useEffect(() => {
    if (!notificationOpen) return;
    const dismissOnOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (notificationPanelRef.current?.contains(target) || notificationBellRef.current?.contains(target)) return;
      setNotificationOpen(false);
    };
    document.addEventListener("mousedown", dismissOnOutsideClick);
    return () => document.removeEventListener("mousedown", dismissOnOutsideClick);
  }, [notificationOpen]);

  const handleNav = (label: string) => {
    setNotificationOpen(false);
    setMobileMenuOpen(false);
    const destination = adminModuleDestination(label, modulePaths);
    setLocation(destination);
  };

  return <main className={`admin-dashboard ${mobileMenuOpen ? "mobile-menu-open" : ""} ${isCompactAdminNavbar ? "industry-detail-shell" : ""}`}>
    {mobileMenuOpen ? <button className="dash-mobile-menu-scrim" aria-label="Close admin menu" onClick={() => setMobileMenuOpen(false)} /> : null}
    <aside className={`dash-sidebar ${mobileMenuOpen ? "is-open" : ""}`}>
      <AdminBrand />
      <nav aria-label="Admin navigation" className="dash-sidebar__nav">
        {navigation.map(({ label, icon: Icon }) => <button className={active === label ? "is-active" : ""} onClick={() => handleNav(label)} key={label}><Icon />{label}</button>)}
      </nav>
      <div className="dash-sidebar__bottom">
        <button className={active === "Admin Profile" ? "is-active" : ""} onClick={() => handleNav("Admin Profile")}><UserRound />Admin Profile</button>
        <button onClick={() => { authService.logout(); setLocation("/admin/login"); }}><LogOut />Logout</button>
      </div>
      <section className="dash-help"><CircleHelp /><h3>Need Help?</h3><p>Contact us if you have any concerns.</p><button onClick={() => toast.info("Support messaging will be connected to the admin API.")}>Contact Support</button></section>
    </aside>

    <section className="dash-workspace">
      <header className={`dash-topbar ${isCompactAdminNavbar ? "dash-topbar--industry-detail" : ""}`}><button className="dash-mobile-menu-trigger" aria-label={mobileMenuOpen ? "Close admin menu" : "Open admin menu"} onClick={() => setMobileMenuOpen((open) => !open)}>{mobileMenuOpen ? <X /> : <Menu />}</button><div className="dash-mobile-brand"><span><img src={logoUrl} alt="" /></span><strong>Boost Vertex</strong></div><div className="dash-mobile-top-actions"><button aria-label="Search current section"><Search /></button><button className={notificationOpen ? "is-open" : ""} onClick={() => setNotificationOpen((open) => !open)} aria-label={notificationOpen ? "Close notifications" : "Open notifications"} aria-expanded={notificationOpen}><Bell /></button><button aria-label="Open settings" onClick={() => handleNav("Settings")}><Settings /></button><span className="dash-avatar">{profileInitials}</span></div><strong className="dash-mobile-page-title">{active}</strong>{isCompactAdminNavbar ? <div className="dash-industry-breadcrumb"><button type="button" onClick={() => handleNav(active)}>{active}</button><ChevronDown /><strong>{breadcrumbCurrent}</strong></div> : <label className="dash-search"><Search /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search anything..." /><kbd>⌘ K</kbd></label>}<div className="dash-topbar__right"><button ref={notificationBellRef} className={notificationOpen ? "is-open" : ""} onClick={() => setNotificationOpen((open) => !open)} aria-label={notificationOpen ? "Close notifications" : "Open notifications"} aria-expanded={notificationOpen}><Bell /><i><b>3</b></i></button><button onClick={() => handleNav("Contact Messages")} aria-label="Open contact messages"><MessageSquare /><i><b>9</b></i></button><span className="dash-avatar">{profileInitials}</span><div><strong>{profileName}</strong><small>{profile?.role || "Super Admin"}</small></div><ChevronDown /></div></header>
      {active === "Dashboard" ? <div className="dash-content">
        <header className="dash-welcome"><div><h1>Dashboard</h1><p>Welcome back, Admin! Here&apos;s what&apos;s happening with your website.</p><span className="dash-mobile-welcome">Welcome back, Admin!</span></div><div className="dash-range"><button className="is-active">Last 30 Days <ChevronDown /></button><button>This Quarter</button><button>Year to Date</button></div></header>
        <section className="dash-metrics">{metrics.map(([label, value, trend, period, Icon]) => <article key={label}><div className="dash-metric__label"><span><Icon /></span>{label}</div><strong>{metricValues[label] ?? value}</strong><p>{trend} <em>{period}</em></p></article>)}</section>
        <section className="dash-grid dash-grid--top"><TrendChart analytics={analytics} /><DataTable title="Recent Leads" rows={dashboardLeadRows} headings={["Name", "Company", "Status", "Received"]} variant="leads" /></section>
        <section className="dash-grid dash-grid--tables"><DataTable title="Recent Contact Messages" rows={messages} headings={["From", "Subject", "Status", "Received"]} variant="messages" /><DataTable title="Recent Content" rows={content} headings={["Type", "Title", "Status", "Updated"]} variant="content" /></section>
        <section className="dash-grid dash-grid--bottom">
          <section className="dash-card dash-service-card"><div className="dash-card__title"><h2>Top Performing<br />Services</h2><button className="dash-select">This Month <ChevronDown /></button></div>{[["SEO", "320 Leads", 93], ["Paid Advertising", "210 Leads", 69], ["Web Development", "145 Leads", 48], ["Social Media Marketing", "98 Leads", 33], ["Content Marketing", "75 Leads", 26]].map(([name, count, percent]) => <div className="dash-service-row" key={name as string}><div><span>{name}</span><small>{count}</small></div><i><b style={{ width: `${percent}%` }} /></i></div>)}</section>
          <section className="dash-card dash-status-card"><h2>Leads by Status</h2><div className="dash-donut"><span><strong>848</strong><small>Total<br />Leads</small></span></div><ul><li><i className="status-new" />New <span>220 (26%)</span></li><li><i className="status-contacted" />Contacted <span>180 (21%)</span></li><li><i className="status-qualified" />Qualified <span>155 (18%)</span></li><li><i className="status-converted" />Converted <span>123 (15%)</span></li><li><i className="status-closed" />Closed <span>170 (20%)</span></li></ul></section>
          <section className="dash-card dash-actions"><h2>Quick Actions</h2><div>{quickActions.map(([Icon, line1, line2]) => <button key={`${line1}-${line2}`} onClick={() => toast.info(`${line1} ${line2} is a frontend-only action until the backend API is connected.`)}><Icon /><span>{line1}<br />{line2}</span></button>)}</div></section>
        </section>
      </div> : active === "Leads" ? <LeadModuleWorkspace onMenu={() => setMobileMenuOpen(true)} /> : active === "Services" ? <ServicesModuleWorkspace /> : active === "Industries" ? <IndustryModuleWorkspace onMenu={() => setMobileMenuOpen(true)} onSettings={() => handleNav("Settings")} /> : active === "Case Studies" ? <CaseStudiesModuleWorkspace onMenu={() => setMobileMenuOpen(true)} onSettings={() => handleNav("Settings")} /> : active === "Blog / Resources" ? <BlogResourcesModuleWorkspace /> : active === "Media Library" ? <MediaLibraryWorkspace /> : active === "Contact Messages" ? <ContactMessagesWorkspace /> : <ModuleView label={active} />}
      </section>

    <nav className="dash-mobile-bottom-nav" aria-label="Mobile admin navigation">
      <button className={active === "Dashboard" ? "is-active" : ""} aria-current={active === "Dashboard" ? "page" : undefined} onClick={() => handleNav("Dashboard")}>
        <LayoutDashboard />
        <span>Dashboard</span>
      </button>
      <button className={active === "Leads" ? "is-active" : ""} aria-current={active === "Leads" ? "page" : undefined} onClick={() => handleNav("Leads")}>
        <UsersRound />
        <span>Leads</span>
      </button>
      <button className="dash-mobile-bottom-nav__add" aria-label="Add new admin content" onClick={() => toast.info("Add options will connect to the admin API when it is deployed.")}>
        <span><Plus /></span>
        <small>Add</small>
      </button>
      <button className={active === "Contact Messages" ? "is-active" : ""} aria-current={active === "Contact Messages" ? "page" : undefined} onClick={() => handleNav("Contact Messages")}>
        <span className="dash-mobile-bottom-nav__message-icon"><MessageSquare /><i /></span>
        <span>Messages</span>
      </button>
      <button className={mobileMenuOpen ? "is-active" : ""} aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen((open) => !open)}>
        <MoreHorizontal />
        <span>More</span>
      </button>
    </nav>

    {notificationOpen ? <aside ref={notificationPanelRef} className="dash-notification-drawer" aria-label="Notifications and messages panel">
      <header className="dash-notification-drawer__header"><div><Bell /><h2>Notifications</h2></div><span>3 New</span></header>
      <section className="dash-notification-drawer__items">{notifications.map(([title, copy, time, tone], index) => {
        const Icon = [UserPlus, Check, TrendingUp, Download][index];
        return <article className={`dash-notification dash-notification--panel ${index === 3 ? "is-read" : ""}`} key={title}><i className={`dash-dot dash-dot--${tone}`}><Icon /></i><div><h3>{title}</h3><p>{copy}</p><small>{time}</small></div></article>;
      })}</section>
      <section className="dash-notification-drawer__messages"><div className="dash-notification-drawer__message-title"><div><Mail /><h2>Messages</h2></div><button onClick={() => handleNav("Contact Messages")}>View All</button></div>{inbox.map(([name, subject, copy, time, unread]) => <article className="dash-message dash-message--panel" key={name}><div><h3>{name}<small>{time}</small></h3><strong>{subject}</strong><p>{copy}</p>{unread ? <span>Unread</span> : null}</div></article>)}</section>
    </aside> : null}
  </main>;
}
