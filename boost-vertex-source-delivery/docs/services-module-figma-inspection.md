# Services Module Desktop Figma Inspection

## Supplied Source

The supplied desktop reference is the Figma file `Services-Module--Copy-` at node `0:1`.

## Initial Access Result

The authenticated browser opened the supplied Figma URL on August 25, 2026, but the design canvas did not render any visible frames or interactive elements. The Figma-provided thumbnail link redirected to the public Figma homepage rather than returning an image. The embedded viewer also remained blank after loading.

The page metadata confirms the file title `Services Module (Copy)` and identifies the requested source node as `0:1`; it does not expose the required visual-frame data.

## Focused Retry

Opening the alternate `/file/...` viewer produced the Figma application shell and a loading canvas, which confirms that the link itself is reachable. However, the canvas remained a loading placeholder and did not reveal any service-management frames after a further render check. The file has not yielded visual details that can support a pixel-accurate implementation yet.

## First Readable Frame Findings

After an extended initialization delay, the canvas rendered at 7% and then at 50% zoom. The visible desktop `Service detail page` frame confirms the established dark Admin Dashboard shell, with the Services sidebar item active in lime. The frame uses an in-page breadcrumb, a large service title (`Enterprise SEO Audit`), a compact publication-status badge, Preview and lime Edit Service controls, and a wide content workspace.

The detail workspace is built from numbered dark content cards. Visible cards include Basic Information, Service Hero with a landscape image/CTA treatment, Why This Service Matters with three tinted metric/value cards, and Common Problems. A persistent right-side editor rail contains ordered strategy steps, an Add Step action, and a Capabilities list. These source details will be treated as the visual and interaction baseline for the Services Module rather than the previous generic Services card view.

## Desktop Overview Inventory

At 7% canvas overview, the Figma file exposes a grouped desktop system rather than a single Services page. The visible frame labels include Services list variants, list feedback/error states, an edit-service validation error, an Add service form, an Edit service form, a Service detail page, a successful-save state, plus narrow, scroll-length reference forms for Add Service, Edit Service, and Service Detail. This confirms that the desktop implementation needs a state-aware module architecture comparable to the existing Leads Figma review system.

The final retry confirmed that the Figma canvas becomes available after an extended load rather than immediately. It can now be used as the desktop ground truth for Services list, filtered/no-result, empty, loading, error, add, edit, service-detail, successful-save, and error-while-saving states.

## Implementation Result

The Services Admin route now uses a dedicated desktop workspace instead of the generic CMS-card view. It retains the existing Admin shell and Figma palette, adds a compact Services table, list search, filter treatment, Service Detail workspace, long-form Add and Edit Service forms, delete confirmation, success feedback, no-results, empty, loading, and error states. Direct desktop review URLs use `service-state` or `service-dialog` query parameters; the base route remains `/admin/services`.

The verified Service API is used for authenticated live records and core save/delete requests. Review-state routes intentionally use local reference data so they remain stable for Figma comparison and do not alter backend records.

## 18-Frame Audit — Initial Read

The Figma overview confirms that the reference contains eighteen desktop frames. The left and central clusters visibly include multiple Services list variants, at least two list feedback/error states (`Something w...` and `Error while sav...`), a Service delete confirmation, Edit Service variants, and a Service detail page. The tall lower frames are source layouts for Add Service, Edit Service, and Service Detail. The far-right stack adds three compact desktop states headed Services list, Edit service d..., and Add service.

At the overview’s 7% canvas scale, several labels are truncated and cannot be transcribed reliably. The implementation audit will therefore distinguish confirmed visual states from label inference and must use close frame inspection for the remaining state names before claiming the 18-frame set complete.

The lower crops verify three tall desktop source frames titled Add service, Edit service, and Service detail, followed by a separate `successful sav...` feedback frame. They also verify the far-right compact stack headed Services list, Edit service d..., and Add service. The tall forms contain substantially more segmented sections and action controls than the current compact editor, so these are confirmed remaining implementation work even before their smaller labels are fully resolved.

## Close Add Service Frame Inspection

The full Add Service desktop form is a persistent in-workspace editor, not a modal. Its confirmed top treatment is `Services › Add New`, followed by the heading `Create New Service`. The action row contains Discard, Save Draft, and a lime Publish button. The top form row pairs a wide Basic Information card with a compact Publishing rail. Basic Information contains Service Title, Slug, Short Description, and Category. The next confirmed accordion/card is Service Hero, with Hero Heading and Hero Description. The existing compact editor is therefore incomplete relative to this source form and needs these exact page-level controls and structural cards.

The Service Hero card also confirms CTA Text, CTA Link, and a Hero Image selection zone with the instruction to click to upload or select an image. The Figma source places this in the main form column, while publishing metadata stays in the narrow right rail.

Below Service Hero, the Add Service source contains a `Why This Service Matters` accordion/card with Section Heading, Section Description, and three complete Benefit Cards. Each benefit card includes an icon selector, title, and description. The next `Common Problems` card repeats Section Heading and Section Description before a Problems Cards group. These are distinct structured fields, not only newline lists.

`Common Problems` shows repeatable Problem Title and Problem Description pairs with a lime Add Problem Card control. The following `How We Approach This Service` card has Section Heading, Section Description, and repeatable numbered Process Steps containing Step Title and Step Description, with a lime Add Process Step control.

The lower Add Service form continues with `What We Do / Capabilities`, containing Section Heading, Section Description, and structured Capability Cards with icon selector, title, description, and Add Capability action. It then begins an `Engagement` card with Section Heading, Section Description, and Engagement Cards. These represent additional desktop form groups absent from the compact implementation.

The final visible Add Service source groups are confirmed as follows: `Engagement` contains repeatable Engagement Title and Engagement Description values with an Add Engagement Option button; `Results / Case Studies` provides a Select Case Studies control with helper copy for choosing relevant case studies; and `Why Boost Vertex` contains Section Heading, Section Description, and Value-Proposition cards with title and description. This source URL remains the ground truth: https://www.figma.com/design/hUnUColxxF4qz31rhAkPkF/Services-Module--Copy-?node-id=0-1

## Complete Desktop Review-State Map

| # | Desktop state | Stable review path |
|---:|---|---|
| 1 | Default Services list | `/admin/services` |
| 2 | Focused Services search | `/admin/services?service-state=search` |
| 3 | No search results | `/admin/services?service-state=no-results` |
| 4 | Filter controls open | `/admin/services?service-state=filters` |
| 5 | No Services listed | `/admin/services?service-state=empty` |
| 6 | Services list loading | `/admin/services?service-state=loading` |
| 7 | Services list request error | `/admin/services?service-state=error` |
| 8 | Add Service full editor | `/admin/services?service-state=add` |
| 9 | Add Service validation feedback | `/admin/services?service-state=add-validation` |
| 10 | Draft saved feedback | `/admin/services?service-state=saved` |
| 11 | Edit Service full editor | `/admin/services?service-state=edit` |
| 12 | Edit Service validation feedback | `/admin/services?service-state=edit-validation` |
| 13 | Edit Service save-error feedback | `/admin/services?service-state=edit-save-error` |
| 14 | Service Detail full view | `/admin/services?service-state=detail` |
| 15 | Service preview/detail view | `/admin/services?service-state=preview` |
| 16 | Delete Service confirmation | `/admin/services?service-dialog=delete` |
| 17 | Published Service feedback | `/admin/services?service-state=published` |
| 18 | General service save-error feedback | `/admin/services?service-state=save-error` |

The full editor now represents the source form as a persistent page workspace with Basic Information, Service Hero, Why This Service Matters, Common Problems, How We Approach This Service, Capabilities, Engagement, Results / Case Studies, Why Boost Vertex, and SEO/supporting details. These states use review data when a query path is present and do not mutate live backend records.

## Completion Validation

All eighteen review paths above render through the expanded desktop Services Module. The list, search, empty, filter, loading, error, add, validation, edit, detailed service, preview, delete, published, draft-saved, and save-error treatments were visually exercised after the final stylesheet restoration. TypeScript validation and the production build pass. The production stylesheet was also checked to confirm Services Module selectors are emitted.

## Supplied Reference Archive Audit

The user-supplied `ServicesModule(Copy).zip` archive contains **17** desktop PNG screenshots rather than 18. The first image, despite its `Services list.png` filename, depicts a **Service Deleted** success dialog over a dimmed Services list. Its table uses columns for Service Name, Category, Status, Last Updated, and Actions, and its pagination/rows are denser than the earlier implementation. The filter reference is a centered modal, not an inline panel: title `Filters`, top-right `Clear All`, Status and Category selects, a Date Range row, and bottom Cancel/Apply Filters actions.

The loading reference confirms the default list content: heading copy `Manage and track your active marketing offerings.`, a search field followed by Status and Category drop-downs plus a Filter button, and a five-column table with **Service Name, Category, Status, Last Updated, Actions**. It uses four skeleton rows and a footer with `Showing 0 of 32 services` and rows-per-page controls. The general-error reference contains this page header plus an Export action, then a centered card reading `Something went wrong`, `Unable to load services. Please try again.`, a full-width Try Again button, and `Error Code: ERR_NETWORK_TIMEOUT_504`.

The no-services empty state is a large centered bordered panel with a folder icon, title `No services found`, body `You don't have any services yet. Start by adding a new service.`, and a lime Add Service control. The no-search-results state keeps the exact list search/filter toolbar and footer, but replaces table rows with a large search-slash illustration, title `No service match your search`, explanatory query text, and a lime **Clear Filter** action. The archived reference notably uses the terms `service` rather than `services` in the no-result title.

The update-success overlay uses the same dimmed-list background as deletion success, with a lime circular check, `Service Updated`, the copy `The service information has been updated successfully.`, and a lime `Go to Services` button. The alternate list-error screenshot places `Something went wrong` inside a large centered modal over the normal list rather than replacing the list screen. Its copy and retry/error code match the standalone error state, but the overlay geometry must be preserved as a separate state.

The Add Service reference itself is shown under a **Service created** success modal, preserving the long create-page background. The success copy is `New service has been created successfully.` The paired failure screen uses a red alert modal with `Something went wrong`, `Unable to save new service. Please try again.`, a full-width Try Again action, and the timeout error code. The previous generic success/save-error wording therefore needs exact create-specific copy and page-background preservation.

The duplicate create-success image confirms the same compact, centered Service created modal. The delete-confirmation reference uses title-case `Delete Service`, a top-right close icon, copy `Are you sure you want to delete this service? This action cannot be undone.`, and side-by-side Cancel plus soft-red Delete Service actions. The current confirmation needs the close affordance and exact copy/style alignment.

The full Edit Service reference is a 1280×4677 desktop page. It is materially more specific than the current generic editor: it has breadcrumb `Services › Enterprise SEO Audit › Edit Service`, the heading `Enterprise SEO Audit` with `Edit Mode`, Cancel / Preview Service / Save Changes actions, and a two-column main form/rail. Confirmed form groups include Basic Information, Service Hero, Why This Matters, Common Problems, How We Approach, plus a right rail for Publish Status, Capabilities, Visual Content, Engagement Model, Case Studies, Why Choose Us, FAQs, Final CTA, Meta / SEO Data, and Linked Content. The Edit failure modal copy is `Unable to save updated service. Please try again.` with the same red alert, full-width Try Again, and timeout code.

The Edit success state is a compact centered Service Updated modal on the dimmed long edit page with the exact message `The service information has been updated successfully.` and a lime Go to Services button. The edit-delete state shares the same Delete Service confirmation design and wording as the list delete state, but must retain the long Edit Service page in the dimmed background.

The 1280×4692 Service Detail reference is a narrow read-only document column anchored left of the desktop workspace, with a sparse right side rather than the current broad two-column composition. It has breadcrumb `Services › Enterprise SEO Audit`, title/status/last-updated metadata, a document action and Preview/Edit Service controls, then thirteen numbered cards: Basic Information; Service Hero; Why This Service Matters; Common Problems; How We Approach This Service; What We Do / Capabilities; Visual Content; Engagement Models; Results / Case Studies; Why Boost Vertex; FAQ; Final CTA; and SEO Information. This confirms that the current generic detail layout needs a direct reference-matched rebuild, including visual-media, FAQ, CTA, and SEO cards.

## Current-versus-Archive Differences

The current Services list uses an earlier five-column arrangement of Service, URL Slug, Status, Last Updated, and Actions. The archive reference instead needs Service Name, Category, Status, Last Updated, and Actions; denser rows; status/category selectors in the toolbar; a modal filter dialog; export/rows-per-page affordances; and modal rather than replacement error feedback.

The current Add/Edit page already has a long form, but it uses a broad generic section system and a compact right-side completeness guide. The archive establishes specific editor cards, icon markers, input grouping, item/card actions, and a richer right rail with publishing, capabilities, visual content, engagement, case studies, value proposition, FAQ, CTA, SEO, and linked-content modules. Success/error states must retain the matching editor behind the modal and use the exact create/update-specific wording.

The current Service Detail page is substantially too wide and lacks the archive's narrow document-column rhythm, dense thirteen-card order, visual-content row, FAQ, final CTA, and SEO image/card. These are the priority fidelity fixes for the next implementation pass.

## Reference-Matched Refinement Result

The Services Directory now follows the archive reference with a compact five-column table, category/status controls, export/add actions, seven visible reference rows, reference pagination copy, modal filter treatment, and separate no-results, empty, loading, list-error, creation, update, and delete feedback treatments. The Service Editor now uses the source's long two-column editor/rail structure, and the detail screen now follows the narrow thirteen-card document treatment.

Every corrected screen family was reviewed in the local preview at the source 1280px desktop width. TypeScript validation and the production build completed successfully after this reference-matched pass.

## Supplied Detail Screenshot Correction Notes

The new 1280×4692 detail screenshot establishes a **630px-wide** content column positioned at approximately x=464, with the existing dashboard shell retained outside it. The Service Hero has a 196×111 landscape image anchored right inside the card; the supplied industrial scene is the exact visible match. The Hero card title, divider, left text column, and outlined CTA need to remain compact and side-by-side rather than use an abstract placeholder. The reference uses dark navy inner cards with fine grey borders for Benefits and Problems; the approach card shows numbered rows with generous vertical separation rather than dense blocks.

The Visual Content card has three equal 186×103 items in this exact order: supplied blue cube image; supplied bitcoin image; empty image placeholder. The SEO Information card uses the bitcoin image at full 594px-wide card width. Engagement Models use three navy cards. Results are compact blue linked rows. The later details remain within the 630px column, using a two-column reason grid and a single-card FAQ sequence.

`Background+Border(1).png` is the 196×111 industrial scene and matches the Service Hero artwork exactly. `Background+Border(2).png` is the 188×106 blue-cube visual and is the first item in Visual Content. The supplied image dimensions agree with their respective reference placements without cropping or artificial generation.

`Background+Border(3).png` is the 188×106 bitcoin image. It is the second Visual Content item, and the reference enlarges the same source artwork across the full SEO Information OG-image panel using `object-fit: cover`.

The Add reference confirms a compact 1280px workspace with a left editor column of approximately 635px and a 300px publishing rail, beginning immediately below the top action row. The edit reference confirms the same geometry: editor cards use a 12px gap and compact 11–12px labels; the first five editor sections occupy the left column, while sections 6–13 stay in the persistent right rail. The Hero card contains a shallow selected-file line below its upload drop zone, while the rail contains small item rows, filled lime action buttons, and no oversized guide treatment.

## Asset and Layout Correction Result

The industrial asset is now rendered in the Service Hero at the reference 196×111 position. The blue-cube and bitcoin images are placed as the first two Visual Content tiles; the bitcoin image also fills the SEO open-graph image panel. Add and Edit now share the archived compact 635px editor column, 300px publishing rail, smaller card rhythm, selected-Hero file line, and visual-content thumbnail treatment. The corrected detail, Add, and Edit views were reviewed at 1280px, and TypeScript plus production builds passed.

## Detail Alignment Correction

The latest reference shows the narrow Service Detail document centered within the space to the right of the fixed Admin sidebar. The earlier implementation used a fixed-width 620px column without auto margins, leaving it aligned to the left content edge on wide displays. The correction must center both the document action/header row and the card column together, while retaining the existing full-width fallback below the desktop breakpoint.

The corrected Services Detail now uses a centered fixed-width desktop header/document pair and retains full-width behavior below the existing responsive breakpoint. The Hero, Visual Content, and SEO image assets remain in their approved reference positions. A 1891px desktop verification and the production build both passed.

## Mobile Reference Access

On the current pass, the supplied Services Module Figma board reaches the viewer but remains on Figma's blank loading canvas after direct, frame-specific, delayed-load, and fit-to-screen attempts. No mobile frame names, measurements, or images can be safely extracted from that state. Mobile implementation should not infer the eighteen layouts from desktop states; the exact mobile screenshot archive or a loadable Figma mobile-frame share is required.

The final focused retry also tested Figma's embedded viewer and legacy file-view endpoint. Both redirected to the same loading canvas and did not expose the mobile frames. This confirms the issue is not a board-navigation or zoom setting problem in the current viewer session.

## Next Inspection Action

The implementation must use a renderable Figma canvas or a supplied screenshot/export as the visual ground truth. Existing Admin Dashboard spacing, palette, and source-verified Service API fields will be retained while the Services Module frame system is identified.

## Mobile Reference Archive Findings

The supplied mobile archive contains exactly eighteen PNG references at approximately 390–395px wide. The base Services list uses a fixed mobile app bar with hamburger, Boost Vertex mark, search, notifications, settings, and avatar controls; a compact Services title/add action; a paired search/filter row; four dark service cards with icon tiles, category/status metadata, updated copy, overflow actions; and a centered Load More button. The active search state keeps the same header/title, replaces the search field with a lime focus border, and adds Recent Searches, Trending Categories, and Search Results groups with match counts and document-type cards.

The mobile filter reference is a near-full-height dark bottom sheet with a centered drag handle, Filters/Clear All header, stacked Status and Category selects, a two-column Start date/End date row, and a bottom action bar with Cancel and lime Apply Filters buttons. The loading reference keeps only the mobile app bar visible above a skeleton title/search area and four stacked skeleton service cards; it does not show the normal title controls or bottom actions while loading.

The mobile general-error state preserves the title/add area, then centers a muted connection-loss icon, “Something went wrong” heading, explanatory copy, lime Try Again button, and a subdued error code near the bottom. The no-search-results state keeps a lime-focused query field with clear icon and filter control, then centers a search-empty icon, “No matches found” copy, lime Clear Search button, and outlined Suggested Categories chips.

The mobile populated-search state preserves the list card geometry and Load More button while the search field displays the Enterprise query with a lime border and clear X. The supplied update-success state uses a blurred/dimmed list background and a centered dark modal with lime confirmation icon, “Service Updated” heading, two-line confirmation copy, and a full-width lime Go to Services button.

The mobile Create Service reference is a full-height stacked editor: compact top app bar, Create New Service heading, a small publishing rail card, then thirteen collapsible numbered cards in one column. Each card uses narrow labels, full-width inputs/textarea rows, lime Add-item buttons, and a bottom sticky action row with Discard, Save Draft, and Publish. The mobile Detail reference uses a compact detail header, narrow single-column numbered cards, the industrial Hero image beneath the Hero copy, three stacked benefit cards, stacked problems, workflow, capabilities, visual tiles, engagement, result links, reasons, FAQ, CTA, and a full-width bitcoin SEO image at the end.
