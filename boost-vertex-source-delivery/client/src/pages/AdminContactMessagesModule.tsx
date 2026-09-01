import {
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  FolderOpen,
  Info,
  Mail,
  RefreshCw,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { contactMessagesService, type ContactMessageRecord } from "@/services/contactMessagesService";
import "./AdminContactMessagesModule.css";

type ContactMessage = ContactMessageRecord & {
  date: string;
  submissionDate: string;
  avatar?: string;
};

type ViewState = "loading" | "ready" | "error";
type MessageStatus = "all" | "unread" | "read";

function formatContactMessage(message: ContactMessageRecord): ContactMessage {
  const parsed = message.createdAt ? new Date(message.createdAt) : null;
  const valid = parsed && !Number.isNaN(parsed.getTime());
  const date = valid
    ? new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(parsed)
    : "—";
  const submissionDate = valid
    ? new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" }).format(parsed)
    : "—";
  return { ...message, date, submissionDate };
}

function DeleteMessageModal({ message, onClose, onConfirm }: { message: ContactMessage; onClose: () => void; onConfirm: () => void }) {
  return <div className="contact-modal-backdrop" onMouseDown={onClose}>
    <section className="contact-delete-modal" onMouseDown={(event) => event.stopPropagation()}>
      <button className="contact-modal-close" onClick={onClose} aria-label="Close"><X /></button>
      <span className="contact-delete-icon"><Info /></span>
      <h2>Delete Message</h2>
      <p>Are you sure you want to delete this message?<br />This action cannot be undone.</p>
      <div className="contact-delete-modal__actions">
        <button onClick={onClose}>Cancel</button>
        <button className="is-danger" onClick={onConfirm}><Trash2 />Delete</button>
      </div>
      <small>{message.name} · {message.subject}</small>
    </section>
  </div>;
}

function ContactFilterPanel({ services, status, service, startDate, endDate, onStatusChange, onServiceChange, onStartDateChange, onEndDateChange, onClear, onCancel, onApply }: {
  services: string[];
  status: MessageStatus;
  service: string;
  startDate: string;
  endDate: string;
  onStatusChange: (value: MessageStatus) => void;
  onServiceChange: (value: string) => void;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  onClear: () => void;
  onCancel: () => void;
  onApply: () => void;
}) {
  return <div className="contact-filter-backdrop" onMouseDown={onCancel}>
    <aside className="contact-filter-panel" onMouseDown={(event) => event.stopPropagation()} aria-label="Message filters">
      <header><h2>Filters</h2><button type="button" onClick={onClear}>Clear All</button></header>
      <div className="contact-filter-panel__body">
        <label><span>Status</span><select value={status} onChange={(event) => onStatusChange(event.target.value as MessageStatus)}><option value="all">All Statuses</option><option value="unread">Unread</option><option value="read">Read</option></select><ChevronDown /></label>
        <label><span>Services</span><select value={service} onChange={(event) => onServiceChange(event.target.value)}><option value="all">All Services</option>{services.map((item) => <option value={item} key={item}>{item}</option>)}</select><ChevronDown /></label>
        <fieldset>
          <legend>Date Range</legend>
          <label><span>Start date</span><input type="date" value={startDate} onChange={(event) => onStartDateChange(event.target.value)} /></label>
          <span className="contact-filter-date-separator">→</span>
          <label><span>End date</span><input type="date" value={endDate} onChange={(event) => onEndDateChange(event.target.value)} /></label>
        </fieldset>
      </div>
      <footer><button type="button" onClick={onCancel}>Cancel</button><button type="button" className="contact-filter-apply" onClick={onApply}>Apply Filters</button></footer>
    </aside>
  </div>;
}

function ContactMessageDetail({ message, onBack, onMarkRead, onDelete }: {
  message: ContactMessage;
  onBack: () => void;
  onMarkRead: () => void;
  onDelete: () => void;
}) {
  const copy = async (value: string, label: string) => {
    try { await navigator.clipboard.writeText(value); toast.success(`${label} copied.`); }
    catch { toast.error(`Unable to copy ${label.toLowerCase()}.`); }
  };

  return <section className="contact-detail">
    <div className="contact-detail__breadcrumb"><button onClick={onBack}>Contact messages</button><ChevronRight /><span>{message.name}</span></div>
    <div className="contact-detail__heading">
      <h1>{message.subject}</h1>
      <div><button className="contact-detail__delete" onClick={onDelete}><Trash2 />Delete</button><button className="contact-detail__read" onClick={onMarkRead}><Mail />{message.unread ? "Mark as Read" : "Read"}</button></div>
    </div>
    <div className="contact-detail__grid">
      <div className="contact-detail__main">
        <section className="contact-sender-card">
          <span className="contact-avatar">{message.avatar ? <img src={message.avatar} alt="" /> : message.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</span>
          <strong>{message.name}</strong>
          {message.unread ? <em>UNREAD</em> : <em className="is-read">READ</em>}
        </section>
        <article className="contact-message-card"><h2>Subject: {message.subject}</h2><div className="contact-message-body">{message.message.split("\n").map((line, index) => <p key={`${line}-${index}`}>{line || "\u00a0"}</p>)}</div></article>
      </div>
      <aside className="contact-technical-card">
        <h2><Info />Technical Details</h2>
        <dl>
          <div><dt>NAME</dt><dd>{message.name}<button onClick={() => copy(message.name, "Name")}><Copy /></button></dd></div>
          <div><dt>EMAIL</dt><dd>{message.email}<button onClick={() => copy(message.email, "Email")}><Copy /></button></dd></div>
          <div><dt>PHONE</dt><dd>{message.phone}<button onClick={() => copy(message.phone, "Phone")}><Copy /></button></dd></div>
          <div><dt>COMPANY</dt><dd>{message.company}<Check /></dd></div>
          <div><dt>SERVICE REQUESTED</dt><dd><span className="contact-service-pill">{message.service}</span></dd></div>
          <div><dt>SUBMISSION DATE</dt><dd><CalendarDays />{message.submissionDate}</dd></div>
        </dl>
      </aside>
    </div>
  </section>;
}

export function ContactMessagesWorkspace() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [viewState, setViewState] = useState<ViewState>("loading");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<MessageStatus>("all");
  const [service, setService] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [draftStatus, setDraftStatus] = useState<MessageStatus>("all");
  const [draftService, setDraftService] = useState("all");
  const [draftStartDate, setDraftStartDate] = useState("");
  const [draftEndDate, setDraftEndDate] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ContactMessage | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const loadMessages = useCallback(async () => {
    setViewState("loading");
    try {
      const response = await contactMessagesService.list({ page: 1, limit: 100, sort: "-createdAt" });
      setMessages(response.data.map(formatContactMessage));
      setTotal(response.pagination.total || response.data.length);
      setViewState("ready");
    } catch (error) {
      setMessages([]);
      setViewState("error");
      toast.error(error instanceof Error ? error.message : "Unable to load contact messages.");
    }
  }, []);

  useEffect(() => { void loadMessages(); }, [loadMessages]);
  useEffect(() => {
    if (!filterOpen) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setFilterOpen(false); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [filterOpen]);

  const services = useMemo(() => Array.from(new Set(messages.map((message) => message.service))), [messages]);
  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    const start = startDate ? new Date(`${startDate}T00:00:00`).getTime() : null;
    const end = endDate ? new Date(`${endDate}T23:59:59`).getTime() : null;
    return messages.filter((message) => {
      const matchesQuery = !term || [message.name, message.email, message.subject, message.service, message.message].some((value) => value.toLowerCase().includes(term));
      const matchesStatus = status === "all" || (status === "unread" ? message.unread : !message.unread);
      const matchesService = service === "all" || message.service === service;
      const messageDate = message.createdAt ? new Date(message.createdAt).getTime() : Number.NaN;
      return matchesQuery && matchesStatus && matchesService && (start === null || (!Number.isNaN(messageDate) && messageDate >= start)) && (end === null || (!Number.isNaN(messageDate) && messageDate <= end));
    });
  }, [messages, query, service, status, startDate, endDate]);

  const selected = messages.find((message) => message.id === selectedId) || null;
  const markRead = async (message: ContactMessage) => {
    if (!message.unread) return;
    try {
      const updated = formatContactMessage(await contactMessagesService.markRead(message.id, true));
      setMessages((current) => current.map((item) => item.id === message.id ? { ...item, ...updated } : item));
      toast.success("Message marked as read.");
    } catch (error) { toast.error(error instanceof Error ? error.message : "Unable to update message."); }
  };

  if (selected) {
    return <>
      <ContactMessageDetail message={selected} onBack={() => setSelectedId(null)} onMarkRead={() => void markRead(selected)} onDelete={() => setDeleteTarget(selected)} />
      {deleteTarget ? <DeleteMessageModal message={deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={() => {
        setDeleteTarget(null);
        toast.error("Delete is not available in the supplied backend API yet.");
      }} /> : null}
    </>;
  }

  const clearFilters = () => { setQuery(""); setStatus("all"); setService("all"); setStartDate(""); setEndDate(""); setDraftStatus("all"); setDraftService("all"); setDraftStartDate(""); setDraftEndDate(""); setPage(1); };
  const openFilters = () => { setDraftStatus(status); setDraftService(service); setDraftStartDate(startDate); setDraftEndDate(endDate); setFilterOpen(true); };
  const applyFilters = () => { setStatus(draftStatus); setService(draftService); setStartDate(draftStartDate); setEndDate(draftEndDate); setPage(1); setFilterOpen(false); };
  const noFilters = !query.trim() && status === "all" && service === "all" && !startDate && !endDate;
  const pageSize = 10;
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const visible = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  return <section className="contact-messages-module">
    <header className="contact-module-heading"><h1>Contact Messages</h1><p>View and Manage messages submitted through Boost vertex Website</p></header>

    {viewState !== "error" ? <div className="contact-toolbar">
      <label className={query ? "is-active" : ""}><Search /><input value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder="Search senders by name..." /></label>
      <label><span>Status:</span><select value={status} onChange={(event) => { setStatus(event.target.value as MessageStatus); setPage(1); }}><option value="all">All</option><option value="unread">Unread</option><option value="read">Read</option></select><ChevronDown /></label>
      <label><span>Services</span><select value={service} onChange={(event) => { setService(event.target.value); setPage(1); }}><option value="all">All</option>{services.map((item) => <option value={item} key={item}>{item}</option>)}</select><ChevronDown /></label>
      <button type="button" className={noFilters ? "" : "is-active"} onClick={openFilters}><span className="contact-filter-funnel" />Filter</button>
    </div> : null}

    {filterOpen ? <ContactFilterPanel services={services} status={draftStatus} service={draftService} startDate={draftStartDate} endDate={draftEndDate} onStatusChange={setDraftStatus} onServiceChange={setDraftService} onStartDateChange={setDraftStartDate} onEndDateChange={setDraftEndDate} onClear={() => { setDraftStatus("all"); setDraftService("all"); setDraftStartDate(""); setDraftEndDate(""); }} onCancel={() => setFilterOpen(false)} onApply={applyFilters} /> : null}

    {viewState === "loading" ? <div className="contact-table contact-table--loading">
      <div className="contact-table__head"><span><i /></span><span>SENDER</span><span>SERVICE/SUBJECT</span><span>MESSAGE PREVIEW</span><span>DATE</span></div>
      {[0,1,2,3,4].map((row) => <div className="contact-table__row contact-skeleton-row" key={row}><span><i /></span><span><b /></span><span><b /><b /></span><span><b /></span><span><b /></span></div>)}
    </div> : viewState === "error" ? <div className="contact-error-card"><span><Info /></span><h2>Something went wrong</h2><p>Make sure the local backend is running and try again.</p><button onClick={() => void loadMessages()}><RefreshCw />Try Again</button><small>Backend: http://localhost:5000/api</small></div>
    : messages.length === 0 && noFilters ? <div className="contact-empty-card"><span><FolderOpen /></span><h2>No messages found</h2><p>You don&apos;t have any messages yet.</p></div>
    : filtered.length === 0 ? <div className="contact-no-results"><span><Search /></span><h2>No name match your search</h2><p>We couldn&apos;t find any message matching<br />Try adjusting your search terms or filters to<br />find what you&apos;re looking for.</p><button onClick={clearFilters}>Clear Filter</button></div>
    : <div className="contact-table">
      <div className="contact-table__head"><span><i /></span><span>SENDER</span><span>SERVICE/SUBJECT</span><span>MESSAGE PREVIEW</span><span>DATE</span></div>
      {visible.map((message) => <button className={`contact-table__row${message.unread ? " is-unread" : ""}`} key={message.id} onClick={() => { setSelectedId(message.id); if (message.unread) void markRead(message); }}>
        <span><i /></span>
        <span className="contact-sender-cell"><span className="contact-sender-name-line">{message.unread ? <em className="contact-unread-dot" /> : null}<strong>{message.name}</strong></span><small>{message.email}</small></span>
        <span><strong>{message.service}</strong></span><span>{message.preview}</span><span><strong>{message.date}</strong></span>
      </button>)}
      <footer><span>Showing {filtered.length ? (safePage - 1) * pageSize + 1 : 0} to {Math.min(safePage * pageSize, filtered.length)} of {filtered.length || total} messages</span><div><span>Rows per page:</span><b>{pageSize} <ChevronDown /></b><button disabled={safePage <= 1} onClick={() => setPage((value) => Math.max(1, value - 1))}><ChevronLeft /></button><button className="is-active">{safePage}</button><button disabled={safePage >= pageCount} onClick={() => setPage((value) => Math.min(pageCount, value + 1))}><ChevronRight /></button></div></footer>
    </div>}
  </section>;
}
