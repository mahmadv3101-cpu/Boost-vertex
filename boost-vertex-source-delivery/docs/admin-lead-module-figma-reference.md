# Admin Lead Module — Desktop Figma Reference

## Initial Canvas Inventory

The supplied Lead Module Figma file contains a dark Boost Vertex admin workflow. At the full-canvas overview, the visible desktop screen groups are: **Lead list page**, **Lead list page — no lead found**, **Lead list page — no lead listed**, **Something wrong — lead list**, **New lead**, **Lead updated**, **Something wrong while updating**, **Lead detail**, **Delete lead**, **Edit lead**, **Lead filters**, **Lead list loading state**, and a compact set of narrow state references on the right.

## Shared System Observed

The screens use the existing dark Admin Dashboard visual system: persistent left sidebar, compact top application bar, charcoal content canvas/cards, restrained gray dividing lines, and lime as the primary active/action color. The desktop Lead workspace is list-led: a page title, toolbar/action controls, and a dense lead table. Details, create, edit, delete, loading, empty, search/no-result, and error are represented as distinct desktop states in the supplied canvas.

## Inspection Status

The 12% canvas confirms the named desktop groups and their visual relationships. Attempting the normal high-zoom Figma canvas workflow did not retain the selected frame in the sandboxed renderer, so individual copy and micro-measurements are not yet reliably extractable from the canvas alone. The implementation should preserve the confirmed dark workspace, sidebar, list-table structure, and state set; a desktop screenshot or direct frame node IDs will be needed if a later comparison requires exact text, dialog dimensions, or row-level fields.

## Completion Audit

The first implementation covered the standard list, no-search-results, filters, loading, create, success, detail, edit, and delete states. The remaining distinct Figma states are **Lead list page — no lead listed**, **Something wrong — lead list**, and **Something wrong while updating**. These require their own visual state and an accessible frontend-only trigger rather than being inferred from a related state.

## Supplied Screenshot Extraction — Shared Shell and No Results

The supplied 1558px desktop references establish a 278px black sidebar and a 1558px wide dark dashboard canvas. The workspace begins under an 82px charcoal top bar. The Leads content starts near x=305 with a 1235px list surface; its heading is 39–40px bold white, with a 15px muted subtitle. The top-right actions are a text Export control and a 116px lime Add Lead button. The list toolbar uses a black 320px search control, two compact dropdowns labelled Status and Source, and a black Filter button. The standard table has name, company, email, phone, source, status, date received, and three action icons. Row avatars are present in the provided screenshots and should use people imagery/initials rather than a logo mark.

The no-results state retains the toolbar and footer, then uses a tall #1b1b1b empty surface with a large outlined magnifying-glass icon, the heading “No leads match your search”, explanatory copy, and a lime “Clear Filter” button. It shows “Showing 0 of 32 leads” in the footer.

## Supplied Screenshot Extraction — Detail and Delete

The Lead Detail reference is a full workspace screen, not a centered dialog. It removes the search bar and uses a 63px top bar with the breadcrumb “Leads > Lead Details”. The main body has a page title with Edit Lead and More Actions controls, then a lead identity/score/received-date band. Below it, a broad two-column information region contains Contact Information, source/assignee, a rich Inquiry / Message card, and an Activity Timeline; a narrower right rail holds Lead Stage, Status, Notes, and Quick Note cards. The detail’s monogram avatar is intentionally separate from the list-row avatar treatment.

Delete Lead is the exception: it overlays the blurred/dimmed standard list screen. The centered modal is about 382px wide, has a muted charcoal surface, one 64px red circular warning icon, close control at top-right, the title “Delete Lead”, a two-line warning, a dark outlined Cancel button, and a light-red destructive Delete Lead button.

## Supplied Screenshot Extraction — Edit and Filters

Edit Lead overlays the dimmed/blurred standard list as a 672px-wide modal. It has a 76px title row, two-column fields for Name/Company, Email/Phone, and Source/Status, followed by a 92px action footer. Inputs are 46px tall, medium-charcoal, and thin-gray outlined. The primary action reads “Update Lead”; the secondary action is an outlined Cancel button.

Lead Filters is a separate centered 384px dialog over the dimmed standard list. Its header has “Filters” and a right-aligned Clear All control. It includes full-width Status and Source controls, two 146px date fields separated by a right arrow, and an action footer with Cancel and lime Apply Filters buttons. Filters should therefore be a modal, not an expanded inline toolbar.

## Supplied Screenshot Extraction — Loading and List Error

The loading reference removes the normal list toolbar and instead renders the complete list card as muted animated placeholders. It preserves the table header and shows five dense placeholder rows plus a placeholder footer, within the regular list-card geometry.

The lead-list error reference removes the list card entirely and centers a 448px wide charcoal error panel in open workspace space. It uses one red warning disc, the headline “Something went wrong”, the copy “Unable to load leads. Please try again.”, a full-width outlined Try Again button with reload icon, and the error code “ERR_NETWORK_TIMEOUT_504”.

## Supplied Screenshot Extraction — Overlay Error and No List

The supplied update/create-failure reference is visually the same centered error panel presented as a modal over the dimmed/blurred standard list. It should therefore be distinct from the open-workspace lead-list error state.

The no-leads-listed screen has no search/filter toolbar or table header. It uses one tall centered #1b1b1b card, folder icon within a soft circular treatment, “No leads found” heading, two-line setup copy, a 253px lime “Add Lead” action, and a secondary outlined “IMPORT CSV” action. The top page actions remain visible.

## Supplied Screenshot Extraction — Success and New Lead

Lead Updated is a success modal over the dimmed/blurred list rather than an inline alert. It is about 384px wide, with close control, a circular lime check icon, “Lead Updated” headline, two lines of confirmation copy, and a full-width lime “Go to Leads” button.

New Lead is a 672px-wide, tall overlay form. It contains a 72px title row, the uppercase section labels “PERSONAL INFORMATION” and “LEAD DETAILS”, Name/Company, Email Address/Phone Number, Source/Initial Status fields, full-width Additional Notes textarea, and a 72px action footer with Cancel and lime Save Lead controls. The background list is dimmed/blurred behind every form/success/error modal.

## Attached Lead List Refinement Reference

The attached desktop table reference confirms that the Lead List must breathe more than the previous build. It uses roughly 96px table rows, a 92px table header, and a 104px search/filter toolbar. The search field is substantially wider than the earlier implementation, and the columns should have dedicated room for the long Email and two-line Phone values rather than compressing them. Its horizontal sequence is avatar/name, company, email, phone, source, status, date received, and three actions.

The circular row avatars are screenshot-derived Figma people artwork, not Boost Vertex logo marks. The Lead Detail breadcrumb's first segment, “Leads”, must be an active return control back to the default Lead List state.

## Mobile Screenshot Extraction — Lead Detail, Tiles 1–2

The mobile Lead Detail screen uses a 52px solid charcoal top bar with a back arrow, “Lead Details” title, and three-dot action. The body has 16px gutters and 16px vertical rhythm. Its identity card combines a 57px initials avatar, name/status row, company, a divider, then equal Lead Score and Date Received columns. Two 40px actions follow: outlined Edit and lime Contact. Lead Stage and Status are grouped in a separate two-select card.

Contact Information is a single dark card with icon-led contact lines, lime email text, address, a divider, then Lead Source and Assigned To columns. Inquiry / Message follows with an inset bordered quote panel; all cards use about 8px corners and thin #3a3e3a outlines.

The lower Lead Detail screen uses a Quick Note card with a two-line textarea and an outlined lime Log Note button aligned right. Activity Timeline is a separate long card with a thin vertical rail and nodes; the first node is lime while remaining nodes are gray. Mobile detail continues as a long scrollable view; no fixed bottom navigation is visible within the supplied detail reference crop.

## Mobile Screenshot Extraction — Primary Lead List

The primary 390px Lead List has a 63px mobile app bar: hamburger, round Boost Vertex mark plus wordmark, search, bell, settings, and user avatar. It uses a black canvas and a page row with 34px “Leads” heading plus a 40px lime square Add button. Search is 306px by 41px with a separate 45px filter button. Leads appear as 176px rounded dark cards with 24px inner padding: lead name, company, a three-dot menu, outlined uppercase status/source chips, and a right-aligned received date. Four cards are visible before an outlined Load More action. No desktop table is retained on mobile.

## Mobile Screenshot Extraction — Lead Search Landing

The focused mobile search state gives the search control a lime outline. It shows a Recent Searches heading with a right-aligned CLEAR ALL action and three history lines with history icons. Trending Categories follows with outlined pill tags. A Search Results heading with “9 MATCHES” leads to three 78px outline cards for Leads, Services, and Articles, each having a square line-icon badge, title, document count, and right chevron. This is a dedicated focused-search state rather than an inline filtered lead list.

## Mobile Screenshot Extraction — Lead Search Found

The search-found state places the active term “Enterprise” in the lime-outlined input, with a clear X at right. Results retain the same lead-card layout as the primary mobile list and do not use the desktop table. Search outcomes in the reference still show the four provided demo leads and a final centered Load More action.

## Mobile Screenshot Extraction — Lead Search No Results

The no-results mobile state keeps the active query and clear control. Its centered recovery composition begins with a 96px dark circular search-off illustration, 29px “No matches found” title, supporting three-line copy, and a 180px lime CLEAR SEARCH button. Suggested Categories then provides four outlined pills: SEO, PPC, ANALYTICS, and REPORTS. The compact top app bar and page title remain unchanged.

## Mobile Screenshot Extraction — No Leads Yet

The alternate 434px frame is the separate zero-records state, not a query no-results state. It has the standard header/search controls and then a full-width tall bordered card. A 96px dark folder illustration sits above “No Leads Yet”, multiline onboarding copy, a full-width lime “+ ADD NEW LEAD” button, and outlined IMPORT CSV control. This needs a separate accessible state from search no-results.

## Mobile Screenshot Extraction — Add New Lead

Add New Lead is a centered 356px-wide dark form drawer over a black scrim, rather than a full page. It has a 64px header with close X, uppercase section labels, 43px medium-charcoal rounded inputs, Name and Email required markers, Source and Initial Status selects, and a 96px Additional Notes textarea. A persistent 69px bottom footer holds a muted Cancel control and lime Save Lead action.

## Mobile Screenshot Extraction — Edit Lead

Edit Lead is a full-height 390px mobile sheet rather than the smaller centered Add dialog. It has a 74px header, six stacked 55px fields (Name, Company, Email, Phone, Source, Status), and a fixed 86px bottom action bar. Cancel is an outlined half-width action; Update Lead is lime and half-width. Fields are prepopulated with Wade Warren data.

## Mobile Screenshot Extraction — Filter Panel

Filters opens as a near-full-height bottom sheet with rounded top corners, a small centered drag handle, 84px header, Filters title, and Clear All control. It has Status and Source selects plus side-by-side Start date and End date controls. A bottom-fixed footer contains outlined Cancel and lime Apply Filters actions. This mobile filter interaction must replace the desktop centered dialog.

## Mobile Screenshot Extraction — Delete Lead

Delete Lead uses a centered 384px modal over a strongly blurred/dimmed Lead List. It has a top-right X, 64px muted-red warning disc, “Delete Lead” heading, two-line irreversible action copy, outlined Cancel, and soft-red destructive Delete Lead button. The mobile delete overlay remains compact rather than expanding to a bottom sheet.

## Mobile Screenshot Extraction — Lead Updated

The alternate delete-named screenshot is actually the post-update success state. It uses the same centered 384px blurred-list modal geometry but with a 64px lime check disc, “Lead Updated” heading, two-line confirmation copy, and one full-width lime Go to Leads action. There is no visible close X in the success state.

## Mobile Screenshot Extraction — Lead List Error

The mobile lead-list error is a standalone screen with the normal mobile app bar and page title/Add button. It centers a 104px lime signal-off technical-error illustration, large “Something went wrong” title, four-line recovery copy, lime Try Again button, and a muted two-line technical error code near the lower screen. This differs from the overlay update-error state.

## Mobile Screenshot Extraction — Lead List Loading

The loading screen preserves the app bar only. The page heading and search/filter area are rendered as matte charcoal skeleton bars, followed by a search-height skeleton and five outlined lead-card skeletons. Avatar, title, metadata, chip, and date lines are all muted segmented placeholders. There is no bottom navigation in the supplied loading crop.

## Mobile Screenshot Extraction — Save Failed

Save Failed is a centered 356px dark modal over the blurred Lead List. It has a 64px red warning disc, 29px “Save Failed” title, four-line timeout explanation, full-width lime RETRY SAVE button, and full-width outlined CANCEL action. It is distinct from both the destructive delete modal and standalone lead-list error screen.

## Mobile Reference Completion

All 14 supplied mobile screenshots have been tiled and inspected in source order. The responsive Lead Module needs distinct mobile modes for list, focused search, search found, search no-results, no-records, loading, standalone list error, detail, filter sheet, add dialog, edit full-sheet, delete confirmation, update success, and save failure. The 390px reference is the primary implementation target, with the supplied 418–460px modal/sheet screenshots serving as responsive width variants.
