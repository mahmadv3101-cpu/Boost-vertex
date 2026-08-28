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
  { label: "Contact Messages", icon: Mail },
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
      <polyline points="38,116 105,99 172,77 239,101 306,65 373,73 440,51 500,58" fill="none" stroke="#c3f400" strokeWidth="2" />
      <polyline points="38,135 105,119 172,111 239,126 306,107 373,113 440,91 500,100" fill="none" stroke="#4385e2" strokeWidth="2" />
      {[[38,"Mon"],[105,"Tue"],[172,"Wed"],[239,"Thu"],[306,"Fri"],[373,"Sat"],[440,"Sun"]].map(([x,label]) => <text key={label} x={x as number} y="177">{label}</text>)}
    </svg>
  </section>;
}

function LeadModuleWorkspace({ onMenu }: { onMenu: () => void }) {
  const [records, setRecords] = useState<LeadRecord[]>(leadRecords);
  const [selected, setSelected] = useState<LeadRecord | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<LeadRecord | null>(null);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [service, setService] = useState("All");
  const [source, setSource] = useState("All");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pagination, setPagination] = useState<ApiPagination | null>(null);
  const [apiMode, setApiMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasApiToken] = useState(() => Boolean(getAdminToken()));

  const loadLeads = useCallback(async () => {
    if (!hasApiToken) return;
    try {
      setLoading(true);
      const response = await adminService.listLeads({ page, limit: pageSize, search: query || undefined, status: status !== "All" ? leadStatusToApi[status as LeadRecord["status"]] : undefined, serviceInterest: service !== "All" ? service : undefined, source: source !== "All" ? source : undefined });
      setRecords(response.leads.map(mapBackendLead));
      setPagination(response.pagination);
      setApiMode(true);
    } catch (error) {
      setApiMode(false);
      if (!(error instanceof Error && error.message.toLowerCase().includes("unauthorized"))) toast.error("Live lead API unavailable. Showing preview data.");
    } finally {
      setLoading(false);
    }
  }, [hasApiToken, page, pageSize, query, service, source, status]);

  useEffect(() => {
    if (!hasApiToken) return;
    const timer = window.setTimeout(() => void loadLeads(), 180);
    return () => window.clearTimeout(timer);
  }, [hasApiToken, loadLeads]);

  const localFiltered = leadRecords.filter((lead) => {
    const term = query.trim().toLowerCase();
    const matchesQuery = !term || [lead.name, lead.company, lead.email, lead.phone].some((value) => value.toLowerCase().includes(term));
    return matchesQuery && (status === "All" || lead.status === status) && (service === "All" || lead.service === service) && (source === "All" || lead.source === source);
  });
  const visibleRecords = apiMode ? records : localFiltered;
  const total = apiMode ? pagination?.total || visibleRecords.length : visibleRecords.length;
  const pages = Math.max(1, apiMode ? pagination?.pages || 1 : Math.ceil(total / pageSize));
  const displayPage = Math.min(page, pages);
  const firstItem = total === 0 ? 0 : (displayPage - 1) * pageSize + 1;
  const lastItem = Math.min(displayPage * pageSize, total);

  const openLead = async (lead: LeadRecord) => {
    setSelected(lead);
    if (!apiMode) return;
    try {
      const response = await adminService.getLead(lead.id);
      const detailed = mapBackendLead(response.lead);
      setSelected(detailed);
      if (!response.lead.isRead) await adminService.markLeadRead(lead.id, true);
    } catch {
      // Keep the list record visible if the detail request is unavailable.
    }
  };

  const updateStatus = async (next: LeadRecord["status"]) => {
    if (!selected) return;
    setSelected({ ...selected, status: next });
    setRecords((current) => current.map((lead) => lead.id === selected.id ? { ...lead, status: next } : lead));
    if (apiMode) {
      try {
        await adminService.updateLeadStatus(selected.id, leadStatusToApi[next]);
        toast.success("Lead status updated.");
      } catch {
        toast.error("Unable to update the lead status.");
      }
    }
  };

  const deleteLead = async () => {
    if (!deleteTarget) return;
    if (apiMode) {
      try { await adminService.deleteLead(deleteTarget.id); } catch { toast.error("Unable to delete this lead."); return; }
    }
    setRecords((current) => current.filter((lead) => lead.id !== deleteTarget.id));
    setSelected(null);
    setDeleteTarget(null);
    toast.success("Lead deleted.");
    if (apiMode) void loadLeads();
  };

  const exportCsv = async () => {
    if (apiMode) {
      try {
        const blob = await adminService.exportLeads("csv");
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = "boost-vertex-leads.csv";
        anchor.click();
        URL.revokeObjectURL(url);
        return;
      } catch { toast.error("Live export unavailable. Creating a local CSV instead."); }
    }
    const rows = ["Name,Company,Email,Phone,Service,Source,Status,Received", ...visibleRecords.map((lead) => [lead.name, lead.company, lead.email, lead.phone, lead.service, lead.source, lead.status, lead.received].map((value) => `"${value.replaceAll('"', '""')}"`).join(","))];
    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "boost-vertex-leads.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const resetFilters = () => { setQuery(""); setStatus("All"); setService("All"); setSource("All"); setPage(1); };

  return <div className="lead-module">
    <div className="lead-mobile-heading"><button onClick={onMenu} aria-label="Open admin menu"><Menu /></button><strong>Leads</strong></div>
    <header className="lead-module__title"><div><h1>Leads</h1><p>Manage and track all your leads in one place.</p></div><button className="lead-export" onClick={() => void exportCsv()}><Download /> Export</button></header>
    <div className="lead-filter-bar">
      <label className="lead-search"><Search /><input value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder="Search leads..." /></label>
      <label>Status<select value={status} onChange={(event) => { setStatus(event.target.value); setPage(1); }}><option>All</option><option>New</option><option>Contacted</option><option>Qualified</option><option>Converted</option><option>Closed</option></select><ChevronDown /></label>
      <label>Service<select value={service} onChange={(event) => { setService(event.target.value); setPage(1); }}><option>All</option>{Array.from(new Set(leadRecords.map((lead) => lead.service))).map((item) => <option key={item}>{item}</option>)}</select><ChevronDown /></label>
      <label>Source<select value={source} onChange={(event) => { setSource(event.target.value); setPage(1); }}><option>All</option>{Array.from(new Set(leadRecords.map((lead) => lead.source))).map((item) => <option key={item}>{item}</option>)}</select><ChevronDown /></label>
      <button className="lead-reset" onClick={resetFilters}><RotateCcw /> Reset</button>
    </div>
    <section className="lead-table-card">
      <div className="lead-table-head"><span>Lead</span><span>Company</span><span>Service</span><span>Source</span><span>Status</span><span>Received</span><span /></div>
      {loading ? <div className="lead-loading">Loading live leads...</div> : visibleRecords.length ? visibleRecords.map((lead, index) => <article key={lead.id} onClick={() => void openLead(lead)}>
        <span className="lead-person"><img src={leadAvatarUrls[index % leadAvatarUrls.length]} alt="" /><span><strong>{lead.name}</strong><small>{lead.email}</small></span></span>
        <span>{lead.company}</span><span>{lead.service}</span><span>{lead.source}</span><span><Status value={lead.status} /></span><span>{lead.received}</span><button aria-label={`Open ${lead.name}`} onClick={(event) => { event.stopPropagation(); void openLead(lead); }}><MoreHorizontal /></button>
      </article>) : <div className="lead-empty"><Search /><h3>No leads found</h3><p>Try changing your search or filters.</p><button onClick={resetFilters}>Clear filters</button></div>}
      <footer><span>Showing {firstItem} to {lastItem} of {total} leads</span><div><label>Rows per page<select value={pageSize} onChange={(event) => { setPageSize(Number(event.target.value)); setPage(1); }}><option>10</option><option>20</option><option>50</option></select></label><button disabled={displayPage <= 1} onClick={() => setPage((current) => Math.max(1, current - 1))}><ChevronDown /></button><span>{displayPage} / {pages}</span><button disabled={displayPage >= pages} onClick={() => setPage((current) => Math.min(pages, current + 1))}><ChevronDown /></button></div></footer>
    </section>
    {selected ? <aside className="lead-drawer"><div className="lead-drawer__backdrop" onClick={() => setSelected(null)} /><section><header><div><img src={leadAvatarUrls[Math.max(0, visibleRecords.findIndex((lead) => lead.id === selected.id)) % leadAvatarUrls.length]} alt="" /><span><h2>{selected.name}</h2><p>{selected.company}</p></span></div><button onClick={() => setSelected(null)}><X /></button></header><div className="lead-drawer__body"><h3>Contact details</h3><dl><dt>Email</dt><dd>{selected.email}</dd><dt>Phone</dt><dd>{selected.phone}</dd><dt>Service</dt><dd>{selected.service}</dd><dt>Source</dt><dd>{selected.source}</dd><dt>Received</dt><dd>{selected.received}</dd></dl>{selected.message ? <><h3>Message</h3><p className="lead-drawer__message">{selected.message}</p></> : null}<h3>Status</h3><div className="lead-status-picker">{(["New","Contacted","Qualified","Converted","Closed"] as LeadRecord["status"][]).map((item) => <button className={selected.status === item ? "is-active" : ""} key={item} onClick={() => void updateStatus(item)}>{item}</button>)}</div></div><footer><button onClick={() => setDeleteTarget(selected)}><Trash2 /> Delete lead</button><button onClick={() => toast.info("Follow-up workflow will be connected to the CRM integration.")}><Mail /> Follow up</button></footer></section></aside> : null}
    {deleteTarget ? <div className="lead-modal-backdrop"><section className="lead-delete-modal"><CircleX /><h2>Delete lead?</h2><p>This will permanently remove {deleteTarget.name} from your lead workspace.</p><div><button onClick={() => setDeleteTarget(null)}>Cancel</button><button onClick={() => void deleteLead()}>Delete</button></div></section></div> : null}
  </div>;
}

function ModuleView({ label }: { label: string }) {
  const detail = moduleDetails[label] || moduleDetails.Settings;
  return <div className="dash-content"><header className="dash-welcome"><div><h1>{label}</h1><p>{detail.description}</p></div><button className="dash-primary-action" onClick={() => toast.info(`${detail.action} workflow will be connected to the admin API.`)}><Plus />{detail.action}</button></header><section className="dash-module-grid">{detail.items.map((item, index) => <article className="dash-card dash-module-card" key={item}><div><span>{String(index + 1).padStart(2, "0")}</span><h2>{item}</h2></div><p>Live {item.toLowerCase()} data will appear here once the corresponding backend endpoint is available.</p><button onClick={() => toast.info(`${item} view is ready for backend data.`)}>Open workspace <ChevronDown /></button></article>)}</section></div>;
}

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const pathname = window.location.pathname;
  const routeSegment = pathname.split("/").filter(Boolean)[1] || "dashboard";
  const initialLabel = Object.entries(modulePaths).find(([, path]) => path === routeSegment)?.[0] || "Dashboard";
  const [active, setActive] = useState(initialLabel);
  const [query, setQuery] = useState("");
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [dashboard, setDashboard] = useState<DashboardResponse["dashboard"] | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const notificationPanelRef = useRef<HTMLElement | null>(null);
  const notificationBellRef = useRef<HTMLButtonElement | null>(null);
  const hasApiToken = Boolean(getAdminToken());
  const currentScreen = adminScreenLabel(pathname);
  const isCompactAdminNavbar = Boolean(currentScreen);
  const breadcrumbCurrent = currentScreen?.detail || currentScreen?.module || active;

  useEffect(() => {
    if (!hasApiToken) return;
    void authService.getProfile().then((response) => setProfile(response.admin)).catch(() => undefined);
    void adminService.getDashboard().then((response) => setDashboard(response.dashboard)).catch(() => undefined);
    void adminService.getAnalytics({ period: "30d" }).then(setAnalytics).catch(() => undefined);
  }, [hasApiToken]);

  useEffect(() => {
    if (!notificationOpen) return;
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (notificationPanelRef.current?.contains(target) || notificationBellRef.current?.contains(target)) return;
      setNotificationOpen(false);
    };
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setNotificationOpen(false); };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onPointerDown); document.removeEventListener("keydown", onKey); };
  }, [notificationOpen]);

  const handleNav = (label: string) => {
    setActive(label);
    setMobileMenuOpen(false);
    setNotificationOpen(false);
    setLocation(adminModuleDestination[label] || `/admin/${modulePaths[label] || "dashboard"}`);
  };

  const dashboardLeadRows = dashboard?.recentLeads?.length ? dashboard.recentLeads.slice(0, 5).map((lead) => [lead.name, lead.company || lead.email, leadStatusToDisplay[lead.status] || lead.status, lead.createdAt ? new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(lead.createdAt)) : "—"]) : leads;
  const metricValues: Record<string, string> = dashboard ? {
    "Total Leads": String(dashboard.metrics.totalLeads),
    "New Leads": String(dashboard.metrics.newLeads),
    Services: String(dashboard.metrics.totalServices),
    "Industry Pages": String(dashboard.metrics.totalIndustries),
    "Case Studies": String(dashboard.metrics.totalCaseStudies),
    "Blog / Resources": String(dashboard.metrics.totalBlogPosts),
  } : {};
  const profileName = profile?.name || "Admin User";
  const profileInitials = profileName.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase() || "AU";

  return <main className={`admin-dashboard${isCompactAdminNavbar ? " industry-detail-shell" : ""}`}>
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
      <header className={`dash-topbar ${isCompactAdminNavbar ? "dash-topbar--industry-detail" : ""}`}><button className="dash-mobile-menu-trigger" aria-label={mobileMenuOpen ? "Close admin menu" : "Open admin menu"} onClick={() => setMobileMenuOpen((open) => !open)}>{mobileMenuOpen ? <X /> : <Menu />}</button><div className="dash-mobile-brand"><span><img src={logoUrl} alt="" /></span><strong>Boost Vertex</strong></div><div className="dash-mobile-top-actions"><button aria-label="Search current section"><Search /></button><button className={notificationOpen ? "is-open" : ""} onClick={() => setNotificationOpen((open) => !open)} aria-label={notificationOpen ? "Close notifications" : "Open notifications"} aria-expanded={notificationOpen}><Bell /></button><button aria-label="Open settings" onClick={() => handleNav("Settings")}><Settings /></button><span className="dash-avatar">{profileInitials}</span></div><strong className="dash-mobile-page-title">{active}</strong>{isCompactAdminNavbar ? <div className="dash-industry-breadcrumb"><button type="button" onClick={() => handleNav(active)}>{active}</button><ChevronDown /><strong>{breadcrumbCurrent}</strong></div> : <label className="dash-search"><Search /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search anything..." /><kbd>⌘ K</kbd></label>}<div className="dash-topbar__right"><button ref={notificationBellRef} className={notificationOpen ? "is-open" : ""} onClick={() => setNotificationOpen((open) => !open)} aria-label={notificationOpen ? "Close notifications" : "Open notifications"} aria-expanded={notificationOpen}><Bell /><i><b>3</b></i></button><button onClick={() => handleNav("Contact Messages")} aria-label="Open contact messages"><Mail /><i><b>9</b></i></button><span className="dash-avatar">{profileInitials}</span><div><strong>{profileName}</strong><small>{profile?.role || "Super Admin"}</small></div><ChevronDown /></div></header>
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
