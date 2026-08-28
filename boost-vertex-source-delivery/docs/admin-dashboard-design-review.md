# Boost Vertex Admin Dashboard — Frontend and Backend Review

**Purpose:** Review the planned Figma Admin Dashboard modules before visual design is finalized, so the dashboard can manage the existing Boost Vertex website and connect cleanly with its deployed backend APIs.

## Executive Recommendation

The proposed modules provide a strong base: **Admin Login, Dashboard, Leads, Services, Industry Pages, Case Studies, Blog / Resources, Media Library, Contact Messages, Settings, and Admin Profile**. Before the Figma is finalized, the design should add or explicitly accommodate four further capabilities: a **Global Website Content** area for Home/About/shared sections, a **Newsletter Subscribers** area, a **Comments Moderation** queue, and shared **SEO, publishing, preview, revision, and permission states**.

> The public website already requires published content, stable slugs, image URLs with alt text, paginated lists, draft protection, server-side validation, and attribution data. The dashboard design should expose the controls necessary to create and manage those records safely.

## 1. Required Dashboard Navigation

| Proposed module | Recommendation | Required additions before Figma sign-off |
|---|---|---|
| Admin Login | Keep | Add Forgot Password, Reset Password, session-expired, invalid-credentials, optional two-factor verification, and account-locked states. |
| Dashboard / Overview | Keep | Show new/open leads, contact messages, pending comments, draft content, scheduled/published content, newsletter subscriber change, and recent activity. |
| Leads Management | Keep | Treat as the central enquiry inbox. It must include website growth-plan submissions, contact-form submissions, CTA attribution, and Fast Track activity. |
| Services Management | Keep | Include card data, complete service-detail sections, FAQs, related case studies, SEO, image fields, sort order, draft/published state, and preview. |
| Industry Pages Management | Keep | Include industry content, pain points, opportunities, metrics, recommended services, related case studies, FAQs, SEO, and conversion content. |
| Case Studies Management | Keep | Include nested challenge/strategy/results/gallery sections, service and industry relationships, proof approval controls, related case studies, SEO, and a client-permission status. |
| Blog / Resources Management | Keep | Include post editor, categories, tags, authors, content blocks, featured image, SEO, related posts, publication scheduling, and comment moderation access. |
| Media Library | Expand | Require upload, metadata, alt text, credit/permission information, usage tracking, replace/remove safeguards, and image selection for content editors. |
| Contact Messages | Keep, but unify with Leads | Either present it as a filtered Leads view or clearly explain the distinction between contact messages and sales leads. |
| Settings | Expand | Include global contact details, regional labels, social links, Fast Track destinations, email notifications, legal/consent text, analytics/tracking IDs, and homepage/About shared copy. |
| Admin Profile | Keep | Include profile, password change, optional MFA, active sessions, and sign-out-all-sessions. |
| **Global Website Content** | **Add** | Manage Home, About, navigation, footer, trust/client references, team members, testimonials, CTA labels, metrics, FAQs, legal pages, and Thank You copy. |
| **Newsletter Subscribers** | **Add** | Subscriber list, consent timestamp/source, status, export, unsubscribe/suppression handling, duplicate-email handling, and campaign-provider sync status if introduced later. |
| **Comments Moderation** | **Add** | If blog comments are enabled: pending/approved/rejected/spam views, comment detail, author/IP safety metadata where legally appropriate, and moderation history. |

## 2. CMS Features Missing From the Current Proposed List

The listed modules do not explicitly cover all content already used by the public website. The designer should add these as standalone navigation items or clear subsections of **Settings / Global Website Content**.

| Missing CMS capability | Why it is required |
|---|---|
| Home and About content management | The public site contains hero copy, CTA labels, trust references, metrics, process steps, team content, conversion panels, and FAQs that do not naturally belong to Services, Cases, Blog, or Industries. |
| Header, footer, and navigation management | Contact details, locations, regional text, social links, legal links, and navigation labels appear across the website and must be centrally controlled. |
| Legal and consent content | Privacy Policy, Terms, cookie/consent language, policy effective date/version, and form-consent text need a safe editor and publishing flow. |
| Newsletter subscriber management | Newsletter forms already exist on the website. The dashboard must show subscriber status, consent, source, duplicate handling, export, and unsubscribe suppression. |
| Blog comment moderation | The backend handoff identifies comments as a pending integration. The admin design must include moderation before comments can be enabled publicly. |
| Testimonials and client-reference approval | Client names can be managed separately from testimonials. Testimonials, ratings, client logos, numerical performance claims, and project images require independent approval/permission states before publication. |
| Authors, categories, tags, and reusable taxonomy | Blog authors, categories, tags, and content relationships should not be free-text fields inside every post. |
| SEO and redirects | Every public content record needs metadata. The dashboard should also have a redirect manager or at minimum a future-ready Settings subsection. |
| Revisions, scheduling, and preview | Content editors need draft, preview, scheduled, published, archived, restore-version, and unsaved-change protection flows. |

## 3. Fields the Backend APIs Need Reflected in the UI

### Leads and Contact Messages

The dashboard should use one canonical lead record, with source-specific fields shown conditionally. The published website already needs fields beyond a simple name/email form.

| Field group | Required fields / UI controls |
|---|---|
| Person and company | First name, last name, email, phone/WhatsApp, company, company website, country/market. |
| Enquiry details | Industry, requested service, monthly budget, primary goal, topic, project details/message, preferred contact method. |
| Attribution | Source, page URL, CTA/location, referrer, UTM source, medium, campaign, term, content, submitted timestamp. |
| Lead workflow | Status (`new`, `contacted`, `qualified`, `proposal`, `won`, `lost`, `spam`), owner/assignee, priority, tags, internal notes, follow-up date, activity timeline. |
| Compliance | Consent captured, consent wording/version, anti-spam result, duplicate indicator, deletion/anonymization request status. |

### Services and Service Details

The design must support the full reusable service page, not only a title and short description.

| Field group | Required controls |
|---|---|
| Core card | Title, short title, unique slug, summary, icon, metric value/label, accent style, sort order, featured flag, published state. |
| Hero | Eyebrow, hero title/emphasis/copy, hero image, image alt text, CTA label and target. |
| Repeatable content | Capabilities, problems, approach timeline, workflow phases, proof points, standards, FAQs, and related case-study picker. Each needs add, reorder, edit, delete, and validation. |
| SEO | Meta title, meta description, canonical URL, Open Graph image, keyword/theme notes, and preview. |

### Industry Pages

The Industry editor needs: name, slug, hero text/image/alt text, pain points, opportunities, metrics, recommended-services relationship picker, related-case-studies picker, approved quote controls, conversion content, FAQs, SEO, sort order, draft/published state, and preview.

### Case Studies

| Field group | Required controls |
|---|---|
| Core | Client/project name, title, unique slug, industry, services, card/hero image and alt text, featured flag, publishing state. |
| Narrative | Challenge, strategy, execution, process steps, qualitative impact/results, insight, related work, and CTA. |
| Proof and permissions | Metric definition, reporting period, supporting asset, evidence status, client approval status, quote approval status, and a clear “do not publish” state. |
| Gallery and SEO | Multiple media items with alt text/caption/order, SEO block, canonical URL, and social image. |

### Blog / Resources

| Field group | Required controls |
|---|---|
| Editorial metadata | Title, slug, excerpt, category, tags, author, featured flag, read-time minutes, publish date/time, status. |
| Article editor | Structured content blocks, headings, paragraph blocks, rich text, lists, image/embed blocks, key takeaways, FAQs, related-post picker, and table-of-contents support. |
| Media and SEO | Featured image, alt text, image caption/credit, lead image, Open Graph image, SEO metadata, canonical URL, and preview. |
| Comments | Comment setting per post: disabled, moderation required, or public after approval. |

### Global Website Content and Settings

The dashboard needs editable global contact details, address and office-hours data, social links, country/market labels, WhatsApp/call/chat/calendar destinations, email notification recipients, navigation/footer entries, brand assets, trust references, team members, homepage metrics/process/FAQ content, Thank You content, legal content, analytics IDs, and consent copy/version.

## 4. Required Screens and States

The planned list/add/edit/view/delete/search/filter/pagination states are correct. The following states must additionally appear in Figma so frontend implementation does not require later redesign.

| Area | Required state or screen |
|---|---|
| Authentication | Forgot/reset password, invalid credentials, account lockout/rate limit, optional MFA challenge, session expiration, insufficient permission. |
| Lists | First-use empty state, no-search-results state, loading skeleton, pagination/loading-more, bulk-selection mode, saved-filter state, API error with retry. |
| Editors | Draft, published, scheduled, archived, unpublish confirmation, unsaved changes, saving, save failed, saved successfully, field-level validation errors, preview, revision history, restore revision. |
| Delete and status changes | Confirmation that names the affected record, dependency warning, soft-delete/restore view, permanent-delete permission gate, publish/unpublish confirmation. |
| Relationships | Empty related-content state, broken/missing relationship state, no eligible records, relation picker search/loading/error states. |
| Leads | Duplicate lead warning, spam state, assignment update, internal note added, follow-up overdue, email notification failure if email delivery is surfaced. |
| Media | Drag/drop, upload progress, retry failed upload, unsupported format, oversize file, processing/optimizing, missing alt text, asset in use, replacement confirmation, deletion blocked because the asset is in use. |
| Comments | Pending moderation, approved, rejected, spam, bulk moderation, no comments, comment API unavailable. |

## 5. Media Library Requirements

The Media Library should be designed as a reusable asset picker as well as a standalone manager. It should support image selection from Service, Industry, Case Study, Blog, Team, Trust Brand, SEO, and global settings editors.

| Functionality | Required |
|---|---|
| Asset workflow | Drag-and-drop upload, browse upload, multi-file upload, progress, retry, cancel, supported-type and file-size messaging. |
| Metadata | File name, URL/CDN URL, MIME type, dimensions, file size, created date, alt text, caption, credit/source, copyright/usage permission, and approval status. |
| Discovery | Grid/list view, thumbnail preview, search, filters by file type, folder/collection, tag, uploader, date, unused/in-use status, and sorting. |
| Reuse and safety | Insert/select asset into an editor, copy URL, show asset usage locations, replace asset, prevent accidental deletion of in-use assets, delete confirmation, and restore from trash if supported. |
| Image quality | Optional crop/focal-point selection, responsive rendition visibility, and a preview of how the image appears in the target card/hero. |

Client and case-study visual assets should also carry **permission/approval metadata**. An asset should not be publishable as proof, a testimonial, a client logo, or a performance claim merely because it has been uploaded.

## 6. Recommended Roles and Permissions

The dashboard should use role-based access control, with the navigation and buttons adapting to the signed-in user’s permissions.

| Role | Typical permissions |
|---|---|
| Super Admin | Full access, user/role management, settings, API/integration settings, permanent deletion, restore, publish, and audit-log access. |
| Admin / Operations Manager | Manage leads, contact messages, assignments, content, media, newsletter subscribers, comments, and publishing; no user-role or secret management. |
| Content Editor | Create/edit drafts for services, industries, cases, posts, global content, SEO, and media; submit for approval; no final publishing unless granted. |
| Publisher / Marketing Manager | Review, preview, schedule, publish/unpublish, manage taxonomy, newsletter, and approved media; cannot manage backend secrets or roles. |
| Lead Manager / Sales | Access leads, contact messages, Fast Track activity, notes, follow-ups, assignment, export; no content/settings access. |
| Support / Moderator | Moderate comments and selected contact inboxes only; no publishing or settings. |
| Read-only / Client Reviewer | View dashboards and designated records without edit/export/delete abilities. |

At minimum, the Figma must include **hidden/disabled navigation**, an **insufficient-permission page**, and role-specific action visibility. Permissions should be granular enough to distinguish **create, edit, publish, delete, export, manage media, manage settings, and manage users**.

## 7. API and Backend Compatibility Requirements

The existing frontend is ready to use `VITE_API_BASE_URL` and expects JSON responses through a shared API transport. The current public routes are a useful starting point, but the Admin Dashboard requires a separate authenticated administrative API surface.

| Requirement | Implementation recommendation |
|---|---|
| Endpoint separation | Keep public endpoints read-only for published content. Use protected `/api/admin/...` endpoints for dashboard management. |
| Authentication | Define login, refresh/logout, password-reset, optional MFA, current-user, and role/permission endpoints before frontend implementation. Prefer secure HTTP-only cookie sessions or a clearly documented token strategy. |
| List responses | Every management list should return `items`, `page`, `limit`, `total`, and `hasNextPage`, plus filter metadata where useful. |
| Error format | Return a consistent error envelope with human-readable `message`, machine-readable `code`, optional `requestId`, and field-level `errors` for form validation. |
| Content lifecycle | Every managed content item should return `status`, `publishedAt`, `scheduledAt`, `createdAt`, `updatedAt`, `createdBy`, `updatedBy`, and optionally `version`. |
| Uploads | Media upload endpoints must use `multipart/form-data` or a signed-upload flow—not the JSON-only request path used by normal content APIs. Return direct HTTPS asset URLs, not server filesystem paths. |
| Ordering | Repeatable items need stable IDs and `sortOrder`; support reorder endpoints or ordered arrays with conflict-safe saves. |
| Relationships | Use IDs/slugs for services, industries, authors, categories, tags, case studies, and related posts. The design needs searchable relationship pickers. |
| Publication safety | Public APIs must never return drafts, unapproved quotes, unapproved logos, unverified performance claims, or private lead/contact information. |
| Destructive actions | Prefer soft delete plus restore. Return dependency/usage information before an asset or linked record is deleted. |
| Auditability | Record and expose relevant activity: who changed a status, published a page, deleted/restored a record, or moderated a comment. |

## 8. Decisions Required From Naveed Before UI Development

1. Confirm the deployed API base URL and whether the dashboard uses the same domain or a dedicated admin/API subdomain.
2. Confirm the admin authentication method, token/session storage approach, refresh behavior, password-reset flow, and whether MFA is required.
3. Confirm the exact admin endpoint naming, pagination/filter/sort query syntax, and standard response/error envelopes.
4. Confirm lead lifecycle values, assignment model, duplicate-detection rules, lead export permissions, and notification workflow.
5. Confirm the media upload architecture: server upload, cloud storage, signed URLs, max file sizes, allowed MIME types, image processing, and deletion behavior.
6. Confirm whether blog comments and newsletter campaigns are in scope for the first release. If yes, provide their moderation/subscription APIs and anti-spam rules.
7. Confirm who can publish client logos, testimonials, performance evidence, and numerical claims, and how that approval is stored in the backend.
8. Confirm whether Home, About, legal, navigation/footer, and global contact data are managed by the CMS or remain code-managed in release one.

## 9. Figma Handoff Checklist for the Designer

Before finalizing the dashboard Figma, the designer should include:

- A responsive desktop and tablet/mobile strategy for admin use, with tables adapting to cards or horizontal-scroll patterns.
- Core page states: loading, empty, error, no results, permission denied, save success, save failure, validation errors, unsaved changes, confirmation, upload progress, and session expiration.
- Reusable patterns for list tables, filters, bulk actions, pagination, editor forms, structured repeaters, sortable lists, relation pickers, media pickers, approval badges, and status chips.
- A content editor supporting nested/repeatable groups, not only flat text fields.
- Draft/preview/publish/schedule/revision actions on all content screens.
- Clear warning treatments for unapproved testimonials, client assets, performance evidence, and irreversible changes.
- Consistent field labels for slug, SEO, alt text, sort order, status, permissions, attribution, timestamps, and audit history.

## Conclusion

The proposed dashboard structure is viable, but the final Figma should explicitly include **Global Website Content, Newsletter Subscribers, Comments Moderation, reusable SEO/publishing/revision controls, content approval states, and role-based permissions**. The most important backend design requirement is an authenticated `/api/admin` contract that mirrors the public website’s content entities while keeping draft, private, and unapproved records out of public endpoints.

## Source Basis

This review is based on the existing Boost Vertex public-website frontend contracts and content rules in `docs/frontend-backend-api-requirements.md`, `client/src/services/contentService.ts`, `client/src/types/api.ts`, `client/src/services/contactService.ts`, `docs/client-handoff-approval-register.md`, and `docs/final-content-mapping.md`.
