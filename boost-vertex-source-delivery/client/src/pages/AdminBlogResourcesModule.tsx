import { FormEvent, useEffect, useMemo, useState } from "react";
import { useSearch } from "wouter";
import { ArrowLeft, ArrowUpRight, BarChart3, CalendarDays, Check, CheckCircle2, ChevronDown, CircleAlert, CircleX, Clock3, Eye, FileText, Filter, FolderOpen, Globe2, Image, Link2, ListChecks, LoaderCircle, Pencil, Plus, Quote, Save, Search, Tag, Trash2, X } from "lucide-react";
import { adminService, type AdminContentRecord } from "@/services/adminService";
import { blogPosts } from "@/data/blogContent";
import { blogReviewPaths, type BlogReviewState } from "./blogReviewPaths";
import "./AdminBlogResourcesModule.css";
import "./AdminBlogResourcesMobile.css";
import "./AdminBlogResourcesRefinement.css";

type BlogState = BlogReviewState;
type EditorMode = "add" | "edit";

type BlogResource = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  type: "Article" | "Resource";
  author: string;
  updated: string;
  readTime: string;
  published: boolean;
  image: string;
  content: string;
};

const fallbackBlogs: BlogResource[] = blogPosts.slice(0, 4).map((post, index) => ({
  id: post.slug,
  title: post.title,
  excerpt: post.summary,
  category: post.category,
  type: index === 2 ? "Resource" : "Article",
  author: "Boost Vertex Editorial Team",
  updated: ["Oct 24, 2024", "Oct 18, 2024", "Oct 11, 2024", "Sep 29, 2024"][index] ?? "Sep 20, 2024",
  readTime: post.readTime ?? "6 min read",
  published: index !== 2,
  image: post.image,
  content: "The most effective marketing systems connect strategic clarity, relevant audiences, and a repeatable way to learn from performance data.",
}));

function getBlogState(search: string): BlogState {
  const candidate = new URLSearchParams(search).get("blog-state");
  return blogReviewPaths.includes(candidate as BlogState) ? candidate as BlogState : "list";
}

function setBlogState(state: BlogState) {
  const url = `/admin/blog?blog-state=${state}`;
  if (window.location.pathname + window.location.search !== url) window.history.replaceState({}, "", url);
}

function mapBlog(record: AdminContentRecord, index: number): BlogResource {
  return {
    id: record.slug || record.id || `blog-${index}`,
    title: record.title || "Untitled article",
    excerpt: record.excerpt || record.summary || record.description || "No excerpt has been added yet.",
    category: record.category || "Strategy",
    type: (record.status === "Resource" ? "Resource" : "Article"),
    author: record.author || "Boost Vertex Editorial Team",
    updated: record.updatedAt ? new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(record.updatedAt)) : "Recently updated",
    readTime: "6 min read",
    published: Boolean(record.isPublished),
    image: fallbackBlogs[index % fallbackBlogs.length]?.image || "",
    content: record.content || record.description || record.summary || "",
  };
}

function StatusPill({ published }: { published: boolean }) {
  return <span className={`blog-status ${published ? "is-published" : "is-draft"}`}><i />{published ? "Published" : "Draft"}</span>;
}

function EmptyState({ kind, onAdd, onClear }: { kind: "empty" | "no-results" | "error"; onAdd: () => void; onClear: () => void }) {
  const copy = kind === "empty" ? ["No blogs found", "You don't have any blogs yet. Start by adding a new blog."] : kind === "no-results" ? ["No blog match your search", "We couldn't find any blog matching “FinTech Scaling”. Try adjusting your search terms or filters to find more results."] : ["Unable to load blog resources", "We couldn't retrieve the blog list. Check your connection and try again."];
  return <section className={`blog-empty-state is-${kind}`}><span>{kind === "empty" ? <FolderOpen /> : kind === "error" ? <CircleAlert /> : <Search />}</span><h2>{copy[0]}</h2><p>{copy[1]}</p><button className="blog-lime-button" onClick={kind === "empty" ? onAdd : onClear}>{kind === "empty" ? <><Plus />Add Blog</> : kind === "error" ? "Try Again" : "Clear Filter"}</button></section>;
}

function BlogList({ state, records, onState, onOpen, onEdit, onDelete }: { state: BlogState; records: BlogResource[]; onState: (state: BlogState) => void; onOpen: (record: BlogResource) => void; onEdit: (record: BlogResource) => void; onDelete: (record: BlogResource) => void }) {
  const isLoading = state === "loading";
  const isEmpty = state === "empty";
  const isError = state === "error";
  const isNoResults = state === "no-results";
  const isSearch = state === "search" || state === "search-found" || isNoResults;
  const rows = state === "search-found" ? records.slice(0, 1) : records;
  return <div className="blog-admin"><header className="blog-page-heading"><div><span><FileText />Content Management</span><h1>Blog / Resources</h1><p>Manage blog posts and resources displayed on the Boost Vertex website.</p></div><button className="blog-lime-button" onClick={() => onState("add")}><Plus />Add Resource</button></header><section className="blog-list-panel"><div className="blog-list-toolbar"><label className="blog-search"><Search /><input value={isSearch ? "FinTech Scaling" : ""} onChange={(event) => onState(event.target.value ? "search-found" : "list")} placeholder="Search blogs..." /></label><label>Type<select defaultValue="All"><option>All</option><option>Article</option><option>Resource</option></select><ChevronDown /></label><label>Category<select defaultValue="All"><option>All</option><option>Meta Ads</option><option>Lead Generation</option><option>Strategy</option></select><ChevronDown /></label><button className="blog-filter-button" onClick={() => onState("filters")}><Filter />Filter</button></div>{isLoading ? <section className="blog-loading"><LoaderCircle /><p>Loading blog resources...</p><i /><i /><i /></section> : isEmpty || isNoResults || isError ? <EmptyState kind={isEmpty ? "empty" : isError ? "error" : "no-results"} onAdd={() => onState("add")} onClear={() => onState("list")} /> : <><div className="blog-table"><div className="blog-table-head"><span>Article</span><span>Type</span><span>Category</span><span>Status</span><span>Last Updated</span><span /></div>{rows.map((record) => <article className="blog-table-row" key={record.id}><button className="blog-row-main" onClick={() => onOpen(record)}><img src={record.image} alt="" /><span><b>{record.title}</b><small>{record.excerpt}</small></span></button><span><i className="blog-type-icon"><FileText /></i>{record.type}</span><span>{record.category}</span><span><StatusPill published={record.published} /></span><span>{record.updated}</span><div className="blog-row-actions"><button aria-label={`View ${record.title}`} onClick={() => onOpen(record)}><Eye /></button><button aria-label={`Edit ${record.title}`} onClick={() => onEdit(record)}><Pencil /></button><button aria-label={`Delete ${record.title}`} onClick={() => onDelete(record)}><Trash2 /></button></div></article>)}</div><footer className="blog-pagination"><small>Showing {rows.length} of {records.length} blog resources</small><div><button disabled>‹</button><button className="is-current">1</button><button>2</button><button>3</button><button>›</button></div></footer></>}</section></div>;
}

function Field({ label, name, defaultValue, required = false, children }: { label: string; name?: string; defaultValue?: string; required?: boolean; children?: React.ReactNode }) {
  return <label className="blog-field"><span>{label}{required ? <i>*</i> : null}</span>{children ?? <input name={name} aria-required={required || undefined} defaultValue={defaultValue} />}</label>;
}

function EditorSection({ number, title, icon, children }: { number: number; title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return <section className="blog-editor-section"><header><span>{icon}</span><h2>{number}. {title}</h2><ChevronDown /></header><div>{children}</div></section>;
}

function BlogMobileContextBar({ title, onBack, children }: { title: string; onBack: () => void; children?: React.ReactNode }) {
  return <header className="blog-mobile-context-bar"><button type="button" aria-label="Back to Blog Resources" onClick={onBack}><ArrowLeft /></button><strong>{title}</strong><div>{children}</div></header>;
}

function BlogEditor({ record, mode, validation, saveError, onState, onSave }: { record: BlogResource | null; mode: EditorMode; validation: boolean; saveError: boolean; onState: (state: BlogState) => void; onSave: (event: FormEvent<HTMLFormElement>) => void }) {
  const item = record ?? { ...fallbackBlogs[0], id: "", title: "", excerpt: "", published: false, type: "Article" as const };
  const heading = mode === "add" ? "Create New Blog" : "Edit Blog";
  return <div className="blog-admin blog-editor"><BlogMobileContextBar title={mode === "add" ? "New Blog" : "Edit Blog"} onBack={() => onState("list")}><button className="blog-lime-button" type="submit" form="blog-resource-editor"><Save /></button></BlogMobileContextBar><header className="blog-editor-top"><div><button onClick={() => onState("list")}><ArrowLeft />Blog / Resources</button><h1>{heading}</h1><p>{mode === "add" ? "Create a new article, resource, or insight for the Boost Vertex website." : "Update the editorial content, SEO details, and publishing settings."}</p></div><div><button onClick={() => onState("list")}>Discard</button><button onClick={() => onState("updated")}>Save Draft</button><button className="blog-lime-button" type="submit" form="blog-resource-editor"><Save />Publish</button></div></header>{validation ? <div className="blog-inline-alert"><CircleAlert /><span><b>Required fields are missing.</b> Add an article title and URL slug before publishing.</span><button onClick={() => onState(mode === "add" ? "add" : "edit")}><X /></button></div> : null}{saveError ? <div className="blog-inline-alert is-error"><CircleAlert /><span><b>Unable to save this blog resource.</b> Please check your connection and try again.</span><button onClick={() => onState(mode === "add" ? "add" : "edit")}><X /></button></div> : null}<form id="blog-resource-editor" onSubmit={onSave}><EditorSection number={1} title="Basic Information" icon={<FileText />}><div className="blog-form-grid"><Field label="Internal Title" name="title" defaultValue={item.title} required /><Field label="URL Slug" name="slug" defaultValue={item.id} required /><Field label="Content Type"><select name="type" defaultValue={item.type}><option>Article</option><option>Resource</option></select></Field><Field label="Category"><select name="category" defaultValue={item.category}><option>Meta Ads</option><option>Lead Generation</option><option>Google Ads</option><option>SEO</option><option>Strategy</option></select></Field><Field label="Estimated Read Time" name="readTime" defaultValue={item.readTime} /><Field label="Publication Status"><select name="published" defaultValue={item.published ? "published" : "draft"}><option value="draft">Draft</option><option value="published">Published</option></select></Field></div></EditorSection><EditorSection number={2} title="Blog Header" icon={<Image />}><div className="blog-form-grid"><Field label="Article Title" name="publicTitle" defaultValue={item.title} required /><Field label="Author / Byline" name="author" defaultValue={item.author} /><Field label="Short Description"><textarea name="excerpt" defaultValue={item.excerpt} /></Field><Field label="Featured Image"><div className="blog-image-input"><img src={item.image} alt="" /><span><Image /><b>Featured article image</b><small>Upload or select from Media Library</small></span><button type="button">Change Image</button></div></Field></div></EditorSection><EditorSection number={3} title="Main Article Content" icon={<FileText />}><Field label="Introduction"><textarea name="content" defaultValue={item.content} /></Field><div className="blog-content-builder"><header><b>Article sections</b><button type="button"><Plus />Add Section</button></header>{["The strategic context", "A practical approach", "How to measure the result"].map((label, index) => <article key={label}><span>{index + 1}</span><b>{label}</b><small>Heading and supporting editorial copy</small><button type="button">Edit</button></article>)}</div></EditorSection><EditorSection number={4} title="Strategic Insight" icon={<ArrowUpRight />}><div className="blog-form-grid"><Field label="Insight Headline" defaultValue="The performance opportunity" /><Field label="Insight"><textarea defaultValue="Connect the campaign plan to a clear commercial outcome and the signals that prove its contribution." /></Field></div></EditorSection><EditorSection number={5} title="Statistics" icon={<BarChart3 />}><div className="blog-stat-grid">{[["+65%", "Lead quality improvement"], ["2.4×", "Conversion rate lift"]].map(([value, label]) => <article key={label}><Field label="Value" defaultValue={value} /><Field label="Label" defaultValue={label} /></article>)}</div></EditorSection><EditorSection number={6} title="Key Takeaways" icon={<ListChecks />}><div className="blog-takeaway-list">{["Start with an agreed business outcome.", "Connect every campaign layer to lead quality.", "Use feedback to guide the next test."].map((takeaway, index) => <label key={takeaway}><b>{index + 1}</b><input defaultValue={takeaway} /><button type="button"><X /></button></label>)}<button type="button"><Plus />Add Takeaway</button></div></EditorSection><EditorSection number={7} title="Related Case Studies" icon={<Link2 />}><div className="blog-related-picker"><article><span>INDUSTRY</span><b>TechCorp Solutions</b><small>How integrated marketing created sustained demand</small><button type="button">Remove</button></article><button type="button"><Plus />Link Case Study</button></div></EditorSection><EditorSection number={8} title="Testimonial" icon={<Quote />}><div className="blog-empty-field"><Quote /><b>No testimonial selected</b><p>Add only an approved client testimonial from the CMS library.</p><button type="button">Select Testimonial</button></div></EditorSection><EditorSection number={9} title="FAQ" icon={<CircleAlert />}><div className="blog-faq-editor">{["What makes an effective campaign?", "How should performance be measured?"].map((question, index) => <article key={question}><b>{index + 1}</b><Field label="Question" defaultValue={question} /><Field label="Answer"><textarea defaultValue="The useful answer depends on the target audience, customer journey, and the agreed commercial outcome." /></Field></article>)}<button type="button"><Plus />Add FAQ</button></div></EditorSection><EditorSection number={10} title="Search & Social" icon={<Globe2 />}><div className="blog-form-grid"><Field label="Meta Title" defaultValue={`${item.title || "Blog title"} | Boost Vertex`} /><Field label="Meta Description"><textarea defaultValue={item.excerpt} /></Field><Field label="Open Graph Image"><div className="blog-image-input"><img src={item.image} alt="" /><span><b>Social preview image</b><small>1200 × 630px recommended</small></span><button type="button">Change Image</button></div></Field></div></EditorSection><footer className="blog-editor-footer"><button type="button" onClick={() => onState("list")}>Discard Changes</button><button type="submit" className="blog-lime-button"><Save />{mode === "add" ? "Publish Blog" : "Save Changes"}</button></footer></form></div>;
}

function DetailSection({ number, title, icon, children }: { number: number; title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return <section className="blog-detail-section"><header><span>{icon}</span><h2>{number}. {title}</h2><ChevronDown /></header><div>{children}</div></section>;
}

function BlogDetail({ record, preview, onState }: { record: BlogResource; preview: boolean; onState: (state: BlogState) => void }) {
  if (preview) return <section className="blog-public-preview"><BlogMobileContextBar title="Preview" onBack={() => onState("detail")} /><header><button onClick={() => onState("detail")}><ArrowLeft />Back to Blog Details</button><span>WEBSITE PREVIEW</span></header><main><p>{record.category.toUpperCase()} <i /> {record.readTime.toUpperCase()}</p><h1>{record.title}</h1><div className="blog-preview-author"><span>BV</span><div><b>{record.author}</b><small>{record.updated} · {record.readTime}</small></div></div><img src={record.image} alt="" /><article><p>{record.excerpt}</p><h2>Start with the business objective</h2><p>{record.content}</p><h2>Build a connected performance system</h2><p>Audience insight, creative, measurement, and conversion experience are strongest when they are designed to support the same business result.</p></article></main></section>;
  return <div className="blog-admin blog-detail"><BlogMobileContextBar title="Blog Detail" onBack={() => onState("list")}><button type="button" aria-label="Preview blog" onClick={() => onState("preview")}><Eye /></button><button type="button" aria-label="Edit blog" onClick={() => onState("edit")}><Pencil /></button></BlogMobileContextBar><header className="blog-detail-crumb"><button onClick={() => onState("list")}><ArrowLeft />Blog / Resources</button><b>›</b><span>{record.title}</span></header><section className="blog-detail-heading"><div><StatusPill published={record.published} /><h1>{record.title}</h1><p>Last Updated: {record.updated} <i /> {record.readTime}</p></div><div><button aria-label="Delete blog" onClick={() => onState("delete")}><Trash2 /></button><button onClick={() => onState("preview")}><Eye />Preview on Website</button><button className="blog-lime-button" onClick={() => onState("edit")}><Pencil />Edit Blog</button></div></section><main className="blog-detail-column"><DetailSection number={1} title="Article Details" icon={<FileText />}><div className="blog-detail-intro"><img src={record.image} alt="" /><div><dl><div><dt>Content Type</dt><dd>{record.type}</dd></div><div><dt>Category</dt><dd>{record.category}</dd></div><div><dt>Author</dt><dd>{record.author}</dd></div><div><dt>Read Time</dt><dd>{record.readTime}</dd></div></dl><p>{record.excerpt}</p></div></div></DetailSection><DetailSection number={2} title="Main Article Content" icon={<FileText />}><article className="blog-article-copy"><h3>The strategic context</h3><p>{record.content}</p><h3>A practical approach</h3><p>Build a system that can be measured, improved, and connected to the decisions that help a business grow.</p><h3>How to measure the result</h3><p>Use the signals that show whether the marketing activity is creating relevant and commercially useful demand.</p></article></DetailSection><DetailSection number={3} title="Strategic Insight" icon={<ArrowUpRight />}><article className="blog-insight-card"><span>Strategic insight</span><h3>The performance opportunity</h3><p>Organizations that implement predictive AI models report a 40% increase in customer acquisition costs while finding clearer paths to better conversion.</p></article></DetailSection><DetailSection number={4} title="Statistics" icon={<BarChart3 />}><div className="blog-detail-stat-grid"><article><span>LEAD QUALITY</span><b>+65%</b><p>Improvement in qualified opportunities</p></article><article><span>CONVERSION RATE</span><b>2.4×</b><p>Lift from a connected capture journey</p></article></div></DetailSection><DetailSection number={5} title="Key Takeaways" icon={<ListChecks />}><ul className="blog-detail-takeaways"><li>All parts of a campaign are connected to the commercial outcome.</li><li>Predictive models decrease customer acquisition costs.</li><li>Proactive allocation helps teams manage the media mix.</li></ul></DetailSection><DetailSection number={6} title="Related Case Studies" icon={<Link2 />}><div className="blog-detail-related"><article><span>INDUSTRY</span><b>TechCorp Solutions</b><p>How integrated marketing created sustained demand</p></article><article><span>RESULT</span><b>Global Retail Brand</b><p>Beyond ROAS: building a profitable growth system</p></article></div></DetailSection><DetailSection number={7} title="Testimonial" icon={<Quote />}><div className="blog-no-testimonial"><Quote /><p>No approved client testimonial has been linked to this resource.</p></div></DetailSection><DetailSection number={8} title="FAQ" icon={<CircleAlert />}><div className="blog-detail-faq">{["What is an autonomous campaign?", "Which channels can use this approach?"].map((question) => <article key={question}><b>{question}</b><p>The approach should be adapted to the business objective, audience, and data available to support better decisions.</p></article>)}</div></DetailSection><DetailSection number={9} title="Search & Social" icon={<Globe2 />}><div className="blog-seo-preview"><div><small>Meta Title</small><b>{record.title} | Boost Vertex</b><small>Meta Description</small><p>{record.excerpt}</p></div><figure><small>Open Graph Preview</small><img src={record.image} alt="" /></figure></div></DetailSection></main></div>;
}

function FiltersModal({ onClose }: { onClose: () => void }) {
  return <div className="blog-overlay" onMouseDown={onClose}><section className="blog-filter-modal" onMouseDown={(event) => event.stopPropagation()}><header><div><span><Filter /></span><div><h2>Filter Blog Resources</h2><p>Refine the content shown in your list.</p></div></div><button onClick={onClose}><X /></button></header><div><Field label="Content Type"><select defaultValue="All types"><option>All types</option><option>Article</option><option>Resource</option></select></Field><Field label="Category"><select defaultValue="All categories"><option>All categories</option><option>Meta Ads</option><option>Lead Generation</option><option>Strategy</option></select></Field><Field label="Publication Status"><select defaultValue="All statuses"><option>All statuses</option><option>Published</option><option>Draft</option></select></Field><Field label="Date Updated"><select defaultValue="Any time"><option>Any time</option><option>Last 30 days</option><option>Last 90 days</option></select></Field></div><footer><button onClick={onClose}>Reset</button><button className="blog-lime-button" onClick={onClose}>Apply Filters</button></footer></section></div>;
}

function FeedbackModal({ kind, onClose, onConfirm }: { kind: "delete" | "created" | "updated" | "published"; onClose: () => void; onConfirm?: () => void }) {
  const isDelete = kind === "delete";
  const heading = kind === "created" ? "Blog created" : kind === "updated" ? "Blog updated" : kind === "published" ? "Blog published" : "Delete blog resource?";
  const message = isDelete ? "This will permanently delete this blog resource. This action cannot be undone." : kind === "created" ? "Your new blog resource has been created and is ready for review." : kind === "updated" ? "Your changes have been saved successfully." : "The blog resource is now visible on the website.";
  return <div className="blog-overlay" onMouseDown={onClose}><section className={`blog-feedback ${isDelete ? "is-delete" : ""}`} onMouseDown={(event) => event.stopPropagation()}><button className="blog-feedback-close" aria-label="Close" onClick={onClose}><X /></button><span>{isDelete ? <Trash2 /> : <Check />}</span><h2>{heading}</h2><p>{message}</p>{isDelete ? <footer><button onClick={onClose}>Cancel</button><button className="blog-danger-button" onClick={onConfirm}>Delete Blog</button></footer> : <button className="blog-lime-button" onClick={onClose}>Back to Blog List</button>}</section></div>;
}

export function BlogResourcesModuleWorkspace() {
  const search = useSearch();
  const direct = new URLSearchParams(search).has("blog-state");
  const [state, setState] = useState<BlogState>(() => getBlogState(search));
  const [records, setRecords] = useState<BlogResource[]>(fallbackBlogs);
  const [selected, setSelected] = useState<BlogResource>(fallbackBlogs[0]);
  const [editorMode, setEditorMode] = useState<EditorMode>("add");
  const reviewState = useMemo(() => new URLSearchParams(search).has("blog-state"), [search]);

  useEffect(() => { setState(getBlogState(search)); }, [search]);
  useEffect(() => { if (direct) return; let mounted = true; adminService.contentList("blogs").then((response) => { if (mounted && response.data.length) { const next = response.data.map(mapBlog); setRecords(next); setSelected(next[0]); } }).catch(() => undefined); return () => { mounted = false; }; }, [direct]);

  const transition = (next: BlogState) => { setBlogState(next); setState(next); };
  const startEdit = (record: BlogResource) => { setSelected(record); setEditorMode("edit"); transition("edit"); };
  const startAdd = () => { setEditorMode("add"); transition("add"); };
  const open = (record: BlogResource) => { setSelected(record); transition("detail"); };
  const deleteRecord = (record: BlogResource) => { setSelected(record); transition("delete"); };
  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const title = String(form.get("title") || "").trim();
    const slug = String(form.get("slug") || "").trim();
    if (!title || !slug) { transition("validation"); return; }
    const next: BlogResource = { ...selected, id: editorMode === "edit" ? selected.id : slug, title, excerpt: String(form.get("excerpt") || selected.excerpt), category: String(form.get("category") || selected.category), type: String(form.get("type") || selected.type) === "Resource" ? "Resource" : "Article", author: String(form.get("author") || selected.author), readTime: String(form.get("readTime") || selected.readTime), published: form.get("published") === "published", updated: "Oct 24, 2024", content: String(form.get("content") || selected.content) };
    if (direct || reviewState) { setSelected(next); transition(editorMode === "edit" ? "updated" : "created"); return; }
    const payload = { title: next.title, slug: next.id, excerpt: next.excerpt, summary: next.excerpt, description: next.content, content: next.content, category: next.category, author: next.author, type: next.type, readTime: next.readTime, image: next.image, isPublished: next.published };
    try { if (editorMode === "edit") await adminService.updateContent("blogs", selected.id, payload); else await adminService.createContent("blogs", payload); setSelected(next); setRecords((current) => editorMode === "edit" ? current.map((item) => item.id === selected.id ? next : item) : [next, ...current]); transition(editorMode === "edit" ? "updated" : "created"); } catch { transition("save-error"); }
  };
  const confirmDelete = async () => { if (!direct && !reviewState) { try { await adminService.deleteContent("blogs", selected.id); } catch { transition("save-error"); return; } } setRecords((current) => current.filter((item) => item.id !== selected.id)); transition("list"); };

  if (["add", "edit", "validation", "save-error"].includes(state)) { const isAdd = state === "add" || (state !== "edit" && editorMode === "add"); return <BlogEditor record={isAdd ? null : selected} mode={isAdd ? "add" : "edit"} validation={state === "validation"} saveError={state === "save-error"} onState={transition} onSave={save} />; }
  if (state === "detail" || state === "preview") return <BlogDetail record={selected} preview={state === "preview"} onState={transition} />;
  if (state === "delete") return <><BlogList state="list" records={records} onState={(next) => next === "add" ? startAdd() : transition(next)} onOpen={open} onEdit={startEdit} onDelete={deleteRecord} /><FeedbackModal kind="delete" onClose={() => transition("list")} onConfirm={confirmDelete} /></>;
  if (["created", "updated", "published"].includes(state)) return <><BlogList state="list" records={records} onState={(next) => next === "add" ? startAdd() : transition(next)} onOpen={open} onEdit={startEdit} onDelete={deleteRecord} /><FeedbackModal kind={state as "created" | "updated" | "published"} onClose={() => transition("list")} /></>;
  return <><BlogList state={state} records={records} onState={(next) => next === "add" ? startAdd() : transition(next)} onOpen={open} onEdit={startEdit} onDelete={deleteRecord} />{state === "filters" ? <FiltersModal onClose={() => transition("list")} /> : null}</>;
}
