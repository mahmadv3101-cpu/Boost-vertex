import {
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Eye,
  FileImage,
  Filter,
  Grid2X2,
  Image as ImageIcon,
  Link2,
  List,
  Loader2,
  MoreVertical,
  Play,
  Plus,
  Search,
  Trash2,
  Upload,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { getAdminToken } from "@/services/apiClient";
import { mediaService, type MediaRecord } from "@/services/mediaService";
import "./AdminMediaLibraryModule.css";

type LibraryState = "loading" | "ready" | "error" | "unauthenticated";
type ViewMode = "grid" | "list";
type TypeFilter = "all" | "image" | "document" | "video";

type UploadEntry = {
  id: string;
  file: File;
  status: "queued" | "uploading" | "done" | "error";
  progress: number;
  error?: string;
};

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml", "video/mp4", "video/webm"];
const IMAGE_LIMIT = 5 * 1024 * 1024;
const VIDEO_LIMIT = 50 * 1024 * 1024;

const DEV_MEDIA_REVIEW = true;
const MOCK_MEDIA: MediaRecord[] = [
  { _id: "m1", url: "/media-figma-team-mobile.jpg", publicId: "mock-1", resourceType: "image", mimeType: "image/jpeg", originalName: "team-headshot-c.jpg", folder: "boost-vertex", bytes: 950000, width: 1200, height: 1200, format: "jpeg", createdAt: "2024-10-12" },
  { _id: "m2", url: "", publicId: "mock-2", resourceType: "video", mimeType: "video/mp4", originalName: "industry-real-estate.mp4", folder: "boost-vertex", bytes: 1800000, width: 1600, height: 900, format: "mp4", createdAt: "2024-10-18" },
  { _id: "m3", url: "/media-figma-skyscraper-mobile.jpg", publicId: "mock-3", resourceType: "image", mimeType: "image/svg+xml", originalName: "industry-real-estate.svg", folder: "boost-vertex", bytes: 1800000, width: 1600, height: 900, format: "svg", createdAt: "2024-10-18" },
  { _id: "m4", url: "/media-figma-skyscraper-mobile.jpg", publicId: "mock-4", resourceType: "image", mimeType: "image/jpeg", originalName: "industry-real-estate.jpg", folder: "boost-vertex", bytes: 1800000, width: 1600, height: 900, format: "jpeg", createdAt: "2024-10-18" },
  { _id: "m5", url: "/media-figma-industrial-mobile.jpg", publicId: "mock-5", resourceType: "image", mimeType: "image/webp", originalName: "blog-social-grow.webp", folder: "boost-vertex", bytes: 1400000, width: 1600, height: 900, format: "webp", createdAt: "2024-10-08" },
  { _id: "m6", url: "/media-figma-skyscraper-mobile.jpg", publicId: "mock-6", resourceType: "image", mimeType: "image/jpeg", originalName: "industry-real-estate.jpg", folder: "boost-vertex", bytes: 1800000, width: 1600, height: 900, format: "jpeg", createdAt: "2024-10-18" },
  { _id: "m7", url: "/media-figma-team-mobile.jpg", publicId: "mock-7", resourceType: "image", mimeType: "image/jpeg", originalName: "team-headshot-c.jpg", folder: "boost-vertex", bytes: 950000, width: 1200, height: 1200, format: "jpeg", createdAt: "2024-10-12" },
  { _id: "m8", url: "/media-figma-industrial-mobile.jpg", publicId: "mock-8", resourceType: "image", mimeType: "image/webp", originalName: "blog-social-grow.webp", folder: "boost-vertex", bytes: 1400000, width: 1600, height: 900, format: "webp", createdAt: "2024-10-08" }
];

function mediaSize(bytes?: number) {
  if (!bytes) return "—";
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(bytes >= 10 * 1024 * 1024 ? 0 : 1)} MB`;
}

function mediaDate(value?: string) {
  if (!value) return "Oct 18, 2024";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
}

function mediaType(item: MediaRecord) {
  if (item.resourceType === "video") return (item.format || "MP4").toUpperCase();
  if (item.mimeType?.includes("svg") || item.format === "svg") return "SVG";
  return (item.format || item.mimeType?.split("/")[1] || "JPEG").replace("jpeg", "JPEG").toUpperCase();
}

function validateFile(file: File) {
  if (!ACCEPTED_TYPES.includes(file.type)) return "Unsupported file type. Please upload a PNG, JPG, WEBP, SVG, GIF, MP4, or WEBM file.";
  if (file.type.startsWith("image/") && file.size > IMAGE_LIMIT) return "Image files must be 5MB or smaller.";
  if (file.type.startsWith("video/") && file.size > VIDEO_LIMIT) return "Video files must be 50MB or smaller.";
  return "";
}

function UploadModal({ onClose, onUploaded }: { onClose: () => void; onUploaded: (records: MediaRecord[]) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [entries, setEntries] = useState<UploadEntry[]>([]);
  const [phase, setPhase] = useState<"picker" | "progress" | "success" | "failed">("picker");
  const [dragging, setDragging] = useState(false);

  const chooseFiles = (files: FileList | File[]) => {
    const next = Array.from(files).map((file) => ({ id: `${file.name}-${file.lastModified}-${Math.random()}`, file, status: "queued" as const, progress: 0, error: validateFile(file) }));
    setEntries(next);
    if (next.length) void upload(next);
  };

  const upload = async (files: UploadEntry[]) => {
    setPhase("progress");
    const uploaded: MediaRecord[] = [];
    const working = [...files];
    for (let index = 0; index < working.length; index += 1) {
      const entry = working[index];
      if (entry.error) {
        entry.status = "error";
        setEntries([...working]);
        continue;
      }
      entry.status = "uploading";
      entry.progress = 42;
      setEntries([...working]);
      try {
        const response = await mediaService.upload(entry.file, { folder: "boost-vertex" });
        uploaded.push(response.media);
        entry.status = "done";
        entry.progress = 100;
      } catch (error) {
        entry.status = "error";
        entry.error = error instanceof Error ? error.message : "Upload failed";
      }
      setEntries([...working]);
    }
    if (uploaded.length) onUploaded(uploaded);
    setPhase(working.some((item) => item.status === "error") ? (uploaded.length ? "failed" : "failed") : "success");
  };

  const retryFailed = () => {
    const retry = entries.filter((item) => item.status === "error").map((item) => ({ ...item, status: "queued" as const, progress: 0, error: validateFile(item.file) }));
    if (retry.length) void upload(retry);
  };

  return <div className="media-modal-backdrop" onMouseDown={onClose}>
    <section className={`media-upload-modal media-upload-modal--${phase}`} onMouseDown={(event) => event.stopPropagation()}>
      {phase === "picker" ? <>
        <header><div><h2>Upload Media</h2><p>Upload images, logos, and supported website media files.</p></div><button onClick={onClose} aria-label="Close"><X /></button></header>
        <button className={`media-dropzone${dragging ? " is-dragging" : ""}`} type="button" onClick={() => inputRef.current?.click()} onDragOver={(event) => { event.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={(event) => { event.preventDefault(); setDragging(false); chooseFiles(event.dataTransfer.files); }}>
          <span><Upload /></span><strong>Drag & drop your files here</strong><small>or <b>Browse Files</b></small>
          <input ref={inputRef} type="file" multiple hidden accept={ACCEPTED_TYPES.join(",")} onChange={(event) => event.target.files && chooseFiles(event.target.files)} />
        </button>
        <footer className="media-supported"><b>SUPPORTED FORMATS</b><span>JPG</span><span>PNG</span><span>WEBP</span><span>SVG</span><span>MP4</span><em>Max 20MB</em></footer>
      </> : phase === "progress" ? <>
        <header><div className="media-upload-status-title"><span><Loader2 /></span><div><h2>Uploading {entries.length} file{entries.length === 1 ? "" : "s"}...</h2><p>Processing assets for Media Library</p></div></div><button onClick={onClose}><X /></button></header>
        <div className="media-upload-list">{entries.map((entry) => <article className={entry.status === "error" ? "is-error" : ""} key={entry.id}><span className="media-upload-thumb"><FileImage /></span><div><strong>{entry.file.name}</strong><small>{entry.error || `${mediaSize(entry.file.size)} · ${entry.file.type.split("/")[1]?.toUpperCase()}`}</small><i><b style={{ width: `${entry.progress}%` }} /></i></div><em>{entry.status === "error" ? "!" : `${entry.progress}%`}</em></article>)}</div>
      </> : phase === "success" ? <div className="media-result-modal"><span className="is-success"><Check /></span><h2>Media uploaded successfully</h2><p>Your files have been uploaded and are now available in the Media Library.</p><div className="media-result-files">{entries.filter((item) => item.status === "done").slice(0,4).map((entry) => <div key={entry.id}><FileImage /><span><b>{entry.file.name}</b><small>{mediaSize(entry.file.size)}</small></span><em><Check /> Uploaded</em></div>)}</div><footer><button onClick={() => { setEntries([]); setPhase("picker"); }}><Upload /> Upload More</button><button className="media-lime-button" onClick={onClose}>View Media Library <ChevronRight /></button></footer></div>
      : <div className="media-result-modal media-result-modal--failed"><span><X /></span><h2>Upload Failed</h2><p>{entries.filter((entry) => entry.status === "error").length} file{entries.filter((entry) => entry.status === "error").length === 1 ? "" : "s"} failed to upload.</p><div className="media-result-files">{entries.filter((item) => item.status === "error").map((entry) => <div key={entry.id}><FileImage /><span><b>{entry.file.name}</b><small>{entry.error || "Upload error"}</small></span></div>)}</div><footer><button onClick={onClose}>Cancel All</button><button className="media-lime-button" onClick={retryFailed}>Retry All</button></footer></div>}
    </section>
  </div>;
}

function FilterModal({ type, onClose, onApply }: { type: TypeFilter; onClose: () => void; onApply: (value: TypeFilter) => void }) {
  const [draft, setDraft] = useState<TypeFilter>(type);
  return <div className="media-modal-backdrop media-modal-backdrop--soft" onMouseDown={onClose}><section className="media-filter-modal" onMouseDown={(event) => event.stopPropagation()}><header><h3>Filters</h3><button onClick={() => setDraft("all")}>Clear All</button></header><label>File Type<select value={draft} onChange={(event) => setDraft(event.target.value as TypeFilter)}><option value="all">All Types</option><option value="image">Images</option><option value="document">Documents</option><option value="video">Videos</option></select></label><label>Category<select><option>All Categories</option></select></label><label>Upload Date<input type="text" placeholder="Enter date" /></label><label>Date Range<div><input placeholder="Start date" /><span>to</span><input placeholder="End date" /></div></label><footer><button onClick={onClose}>Cancel</button><button className="media-lime-button" onClick={() => onApply(draft)}>Apply Filters</button></footer></section></div>;
}

function DeleteModal({ item, deleting, onClose, onDelete }: { item: MediaRecord; deleting: boolean; onClose: () => void; onDelete: () => void }) {
  return <div className="media-modal-backdrop" onMouseDown={onClose}><section className="media-delete-modal" onMouseDown={(event) => event.stopPropagation()}><header><h2><span>!</span> Delete Media?</h2><button onClick={onClose}><X /></button></header><h3>Are you sure you want to delete this media file?</h3><p>This action cannot be undone. If this media is currently being used on the website, removing it may affect the content where it is displayed.</p><article><span><FileImage /></span><div><strong>{item.originalName}</strong><small>{mediaType(item)} · {mediaSize(item.bytes)}</small></div></article><footer><button onClick={onClose}>Cancel</button><button className="is-danger" onClick={onDelete} disabled={deleting}><Trash2 />{deleting ? "Deleting..." : "Delete Media"}</button></footer></section></div>;
}

function PreviewModal({ item, onClose, onDelete, onReplace }: { item: MediaRecord; onClose: () => void; onDelete: () => void; onReplace: () => void }) {
  const [zoomed, setZoomed] = useState(false);
  const copyUrl = async () => { try { await navigator.clipboard.writeText(item.url); toast.success("Media URL copied."); } catch { toast.error("Unable to copy media URL."); } };
  return <div className="media-modal-backdrop" onMouseDown={onClose}><section className="media-preview-modal" onMouseDown={(event) => event.stopPropagation()}><header><div><small>Media Library › Preview</small><h2>Media Preview</h2></div><button className="media-preview-close" onClick={onClose}><X className="media-preview-close-icon" /><MoreVertical className="media-preview-menu-icon" /></button></header><div className="media-preview-layout"><div className={`media-preview-stage${zoomed ? " is-zoomed" : ""}`}><div className="media-preview-tools"><button onClick={() => setZoomed(true)}><ZoomIn /></button><button onClick={() => setZoomed(false)}><ZoomOut /></button></div>{item.resourceType === "video" ? <video src={item.url} controls /> : <img src={item.url} alt={item.altText || item.originalName} />}</div><aside><h3>FILE DETAILS</h3><dl><dt>Name</dt><dd>{item.originalName}</dd><dt>Type</dt><dd>{mediaType(item)} {item.resourceType === "image" ? "Image" : "Video"}</dd><dt>Size</dt><dd>{mediaSize(item.bytes)}</dd><dt>Dimensions</dt><dd>{item.width && item.height ? `${item.width} × ${item.height} px` : "—"}</dd><dt>Uploaded</dt><dd>{mediaDate(item.createdAt)}</dd></dl><h3>MEDIA URL</h3><button className="media-url-copy" onClick={copyUrl}><span>{item.url}</span><Copy /></button><div className="media-preview-actions"><button className="media-lime-button" onClick={onReplace}><Upload /> Replace Media</button><button onClick={onDelete}><Trash2 /> Delete Media</button></div><small className="media-url-status"><Check /> Media URL<br />copied!</small></aside></div></section></div>;
}

function ReplaceMediaModal({ item, onClose }: { item: MediaRecord; onClose: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [replacement, setReplacement] = useState<File | null>(null);
  const [error, setError] = useState("");

  const chooseReplacement = (file?: File) => {
    if (!file) return;
    const nextError = validateFile(file);
    setReplacement(file);
    setError(nextError);
  };

  return <div className="media-modal-backdrop" onMouseDown={onClose}>
    <section className="media-replace-modal" onMouseDown={(event) => event.stopPropagation()}>
      <header>
        <div><h2>Replace Media</h2><p>Replace the current media file with a new file. Existing references<br />to this media should remain connected where supported.</p></div>
        <button onClick={onClose} aria-label="Close"><X /></button>
      </header>

      <div className="media-replace-body">
        <h3>CURRENT MEDIA</h3>
        <article className="media-current-file">
          <span>{item.resourceType === "video" ? <Play /> : <img src={item.url} alt="" />}</span>
          <div><strong>{item.originalName}</strong><small><b>{mediaType(item)}</b>{mediaSize(item.bytes)}<i>•</i>{item.width && item.height ? `${item.width} × ${item.height}` : "—"}</small></div>
        </article>

        <h3>NEW MEDIA</h3>
        <button className="media-replace-dropzone" type="button" onClick={() => inputRef.current?.click()} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); chooseReplacement(event.dataTransfer.files?.[0]); }}>
          <span><Upload /></span>
          <strong><u>Browse Files</u> <em>or drag & drop here</em></strong>
          <small>PNG, JPG, SVG up to 5MB</small>
          <input ref={inputRef} type="file" hidden accept="image/png,image/jpeg,image/svg+xml" onChange={(event) => chooseReplacement(event.target.files?.[0])} />
        </button>
        {error ? <p className="media-replace-error">! {error}</p> : null}

        {replacement ? <>
          <div className="media-replace-divider" />
          <h3>UPLOADING REPLACEMENT</h3>
          <article className="media-replacement-file">
            <span><FileImage /></span>
            <div><strong>{replacement.name}</strong><small><b>{replacement.type.split("/")[1]?.toUpperCase() || "FILE"}</b><em>Ready to replace</em>{mediaSize(replacement.size)}</small><i><b style={{ width: "100%" }} /></i></div>
            <button onClick={() => { setReplacement(null); setError(""); }}><X /></button>
          </article>
        </> : null}
      </div>

      <footer>
        <button onClick={onClose}>Cancel</button>
        <button className="media-lime-button" disabled={!replacement || Boolean(error)} onClick={() => toast.info("Replace Media API will be connected with backend integration.")}>Replace Media</button>
      </footer>
    </section>
  </div>;
}

function GridCard({ item, onPreview, onDelete }: { item: MediaRecord; onPreview: () => void; onDelete: () => void }) {
  return <article className="media-grid-card"><button className="media-card-preview" onClick={onPreview} aria-label={`Preview ${item.originalName}`}>{item.resourceType === "video" ? <><video src={item.url} muted preload="metadata" /><span className="media-video-play"><Play /></span></> : <img src={item.url} alt={item.altText || item.originalName} loading="lazy" />}<span className="media-card-hover"><Eye /><Link2 /></span></button><div className="media-card-copy"><div><strong title={item.originalName}>{item.originalName}</strong><small>{mediaType(item)} {item.resourceType === "image" ? "Image" : "Video"}<b>{mediaSize(item.bytes)}</b></small><em>{mediaDate(item.createdAt)}</em></div><button onClick={onDelete} aria-label={`Delete ${item.originalName}`}><MoreVertical /></button></div></article>;
}

export function MediaLibraryWorkspace() {
  const [media, setMedia] = useState<MediaRecord[]>([]);
  const [libraryState, setLibraryState] = useState<LibraryState>("loading");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [view, setView] = useState<ViewMode>("grid");
  const [uploadOpen, setUploadOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [previewItem, setPreviewItem] = useState<MediaRecord | null>(null);
  const [replaceItem, setReplaceItem] = useState<MediaRecord | null>(null);
  const [deleteItem, setDeleteItem] = useState<MediaRecord | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [page, setPage] = useState(1);

  const loadMedia = useCallback(() => {
    if (DEV_MEDIA_REVIEW) { setMedia(MOCK_MEDIA); setLibraryState("ready"); return; }
    if (!getAdminToken()) { setLibraryState("unauthenticated"); return; }
    setLibraryState("loading");
    mediaService.list({ page: 1, limit: 60 }).then((response) => { setMedia(response.data); setLibraryState("ready"); }).catch(() => { setMedia([]); setLibraryState("error"); });
  }, []);

  useEffect(() => { loadMedia(); }, [loadMedia]);

  const visible = useMemo(() => media.filter((item) => {
    const text = `${item.originalName} ${item.altText || ""} ${item.folder || ""}`.toLowerCase();
    const matchesType = typeFilter === "all" || (typeFilter === "document" ? item.mimeType?.startsWith("application/") : item.resourceType === typeFilter);
    return text.includes(search.trim().toLowerCase()) && matchesType;
  }), [media, search, typeFilter]);

  const deleteMedia = async () => {
    if (!deleteItem) return;
    if (DEV_MEDIA_REVIEW) { setMedia((items) => items.filter((item) => item._id !== deleteItem._id)); setPreviewItem(null); setReplaceItem(null); setDeleteItem(null); toast.success("Media deleted in preview mode."); return; }
    setDeleting(true);
    try {
      const response = await mediaService.remove(deleteItem._id);
      setMedia((items) => items.filter((item) => item._id !== deleteItem._id));
      if (previewItem?._id === deleteItem._id) setPreviewItem(null);
      toast.success(response.message || "Media deleted successfully.");
      setDeleteItem(null);
    } catch (error) { toast.error(error instanceof Error ? error.message : "Unable to delete media."); }
    finally { setDeleting(false); }
  };

  let content;
  if (libraryState === "loading") {
    content = <div className="media-state-card"><Loader2 className="is-spin" /><h2>Loading media</h2><p>Retrieving your current Media Library.</p></div>;
  } else if (libraryState === "unauthenticated") {
    content = <div className="media-state-card"><ImageIcon /><h2>Admin sign-in required</h2><p>Sign in to retrieve and manage protected media records.</p><a href="/admin/login">Go to Login</a></div>;
  } else if (libraryState === "error") {
    content = <div className="media-state-card media-state-card--error"><span className="media-error-icon"><X /></span><h2>Something went wrong</h2><p>Please try again.</p><button className="media-lime-button" onClick={loadMedia}>Try Again</button></div>;
  } else if (!visible.length) {
    content = <div className="media-no-results"><span><Search /></span><h2>No media match your search</h2><p>We couldn&apos;t find any asset matching &quot;{search || "your current filters"}&quot;. Try adjusting your search terms or filters to find what you&apos;re looking for.</p><button className="media-lime-button" onClick={() => { setSearch(""); setTypeFilter("all"); }}>Clear Filter</button></div>;
  } else if (view === "grid") {
    content = <div className="media-grid">{visible.slice((page - 1) * 12, page * 12).map((item) => <GridCard key={item._id} item={item} onPreview={() => setPreviewItem(item)} onDelete={() => setDeleteItem(item)} />)}</div>;
  } else {
    content = <div className="media-table"><div className="media-table-head"><span>Preview</span><span>File Name</span><span>Type</span><span>Size</span><span>Dimensions</span><span>Uploaded</span><span>Actions</span></div>{visible.slice((page - 1) * 10, page * 10).map((item) => <article key={item._id}><button onClick={() => setPreviewItem(item)}>{item.resourceType === "image" ? <img src={item.url} alt="" /> : <Play />}</button><strong>{item.originalName}</strong><span>{mediaType(item)}</span><span>{mediaSize(item.bytes)}</span><span>{item.width && item.height ? `${item.width} × ${item.height}` : "—"}</span><span>{mediaDate(item.createdAt)}</span><button onClick={() => setDeleteItem(item)}><MoreVertical /></button></article>)}<footer><span>Showing 1 to {Math.min(10, visible.length)} of {visible.length} media</span><div>Rows per page: <b>10</b><button><ChevronLeft /></button><button className="is-active">1</button><button><ChevronRight /></button></div></footer></div>;
  }

  const pages = Math.max(1, Math.ceil(visible.length / 12));

  return <div className="media-library-module">
    <header className="media-library-heading"><div><h1>Media Library</h1><p><span className="media-subtitle-desktop">Manage images, logos, and media used across the Boost Vertex website.</span><span className="media-subtitle-mobile">Manage assets and uploads.</span></p></div><button className="media-lime-button" onClick={() => setUploadOpen(true)}><Plus /> Upload Media</button></header>
    <section className="media-toolbar"><label><Search /><input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder="Search..." /></label><div className="media-toolbar-actions"><div className="media-view-toggle"><button className={view === "grid" ? "is-active" : ""} onClick={() => setView("grid")}><Grid2X2 /></button><button className={view === "list" ? "is-active" : ""} onClick={() => setView("list")}><List /></button></div><button className={typeFilter !== "all" ? "is-filtered" : ""} onClick={() => setFilterOpen(true)}><Filter /> <span className="media-filter-label">Filter</span></button></div></section>
    <nav className="media-mobile-chips" aria-label="Media type filters">
      {([
        ["all", "ALL"],
        ["image", "IMAGES"],
        ["document", "DOCUMENTS"],
        ["video", "VIDEO"],
      ] as Array<[TypeFilter, string]>).map(([value, label]) => <button key={value} className={typeFilter === value ? "is-active" : ""} onClick={() => { setTypeFilter(value); setPage(1); }}>{label}</button>)}
    </nav>
    {content}
    {libraryState === "ready" && visible.length > 0 && view === "grid" ? <nav className="media-pagination"><button disabled={page === 1} onClick={() => setPage((value) => Math.max(1, value - 1))}>PREV</button>{Array.from({ length: Math.min(3, pages) }, (_, index) => index + 1).map((value) => <button key={value} className={page === value ? "is-active" : ""} onClick={() => setPage(value)}>{String(value).padStart(2, "0")}</button>)}{pages > 4 ? <span>...</span> : null}{pages > 3 ? <button className={page === pages ? "is-active" : ""} onClick={() => setPage(pages)}>{String(pages).padStart(2, "0")}</button> : null}<button disabled={page === pages} onClick={() => setPage((value) => Math.min(pages, value + 1))}>NEXT</button></nav> : null}
    {uploadOpen ? <UploadModal onClose={() => setUploadOpen(false)} onUploaded={(records) => { setMedia((items) => [...records, ...items]); setLibraryState("ready"); }} /> : null}
    {filterOpen ? <FilterModal type={typeFilter} onClose={() => setFilterOpen(false)} onApply={(value) => { setTypeFilter(value); setPage(1); setFilterOpen(false); }} /> : null}
    {previewItem ? <PreviewModal item={previewItem} onClose={() => setPreviewItem(null)} onDelete={() => setDeleteItem(previewItem)} onReplace={() => { setReplaceItem(previewItem); setPreviewItem(null); }} /> : null}
    {replaceItem ? <ReplaceMediaModal item={replaceItem} onClose={() => setReplaceItem(null)} /> : null}
    {deleteItem ? <DeleteModal item={deleteItem} deleting={deleting} onClose={() => setDeleteItem(null)} onDelete={deleteMedia} /> : null}
  </div>;
}
