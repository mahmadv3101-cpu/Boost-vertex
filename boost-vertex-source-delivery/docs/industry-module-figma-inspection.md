
# Industry Module inspection checkpoint

The supplied Industry Module Figma link opened successfully, but the sandbox browser remained on Figma's loading canvas after repeated checks. The board did not expose readable frame content, text, assets, or interactive layer metadata in the visible page. I will continue with the available source/archive and existing dashboard conventions rather than infer unreadable visual details from the blank loading screen.

The Figma board is now visible in Design Mode at 6% after fitting the canvas and increasing zoom once. The overview shows a dense cluster of approximately 18 narrow desktop frames, including list, create/edit, detail, and feedback states. Individual text and controls are not yet readable at this scale, so further canvas zoom/selection is required before coding.

At 100% zoom, the visible canvas is an Industry edit form. Readable sections include “4. Boost Vertex Advantage” with repeatable items such as Scalability and Performance, “5. Industry Friction & Challenges” with Fragmented Data Systems and Slow Transaction Cycles, and a right-side publishing/SEO rail. The source uses a dark charcoal admin UI, compact outlined cards, lime section icons, drag handles, and “Add Point”/“Add Advantage” controls. The canvas is currently centered on the lower editor area; list/detail states require repositioning or selecting their frames.


## Archive-derived desktop references

The supplied archives contain full-width desktop compositions built from a 278px left sidebar and a 1002px main content wrapper at approximately 1280px × 910px. The first populated directory reference shows a narrow content search field, a lime “+ Add Industry Page” button, a single Status dropdown, and a black table card with columns for Industry Name, Short Description, Status, Related, Last Updated, and Actions. The visible rows are Real Estate, Enterprise SaaS, E-commerce & Retail, and FinTech; the footer reads “Showing 1 to 4 of 12 industries” with compact pagination.

The second list reference preserves the same top search and Status controls but presents the table area as an empty/blank result region beneath the divider. The archive uses a dark #111312-like canvas, black table surfaces, fine gray rules, small Inter-style labels, and lime status/action accents. The main content is intentionally compact inside the 1002px column rather than a full-width oversized card layout.


The third archive crop is a loading state: the same directory header and controls remain visible while a dark table skeleton replaces the rows, with five horizontal row placeholders and a footer placeholder. The fourth crop returns to the populated table and confirms the exact column hierarchy: INDUSTRY NAME with title plus route, SHORT DESCRIPTION, STATUS, RELATED, LAST UPDATED, and ACTIONS. The table card is blacker than the page background, with four visible rows and a compact 12-item pagination footer.


The supplied editor references are tall full-page documents: the Add screen is 1002px × 4209px and the Edit screen is 1001px × 5157px. Both retain the 278px sidebar outside the main content crop. The editor is not a short generic form; it is a long stack of compact dark cards with lime numbered section markers, black inputs, outlined content rows, image modules, repeated points, case-study selections, FAQs, SEO, and bottom save controls. The Edit reference uses the supplied industrial factory image in the Hero card, while the Add reference uses the supplied office/team image in its visual area. The source layout is single-column inside the main content crop with compact section rhythm and a separate top utility bar/publishing controls.


The archive’s no-results state is a full 1284px × 1022px desktop composition with the global utility bar, “Industries” heading, Export and “+ Add Industry” actions, a dark search/status row, and a large centered empty card. Its exact copy is “No industry match your search” with a diagonal lime icon and a “Clear Filter” button; the footer reads “Showing 0 of 32 services” in the supplied crop. The Create Industry reference is a compact 1001px × 840px crop: a pale/white editor canvas, title “Create New Industry,” top actions Discard, Save Draft, and Publish, a dark 422px-wide left form column, and a 200px Publishing card on the right. The Basic Information card shows required Industry Name and URL Slug fields with a fixed `/industry/` prefix, followed by Short Description. The Industry Hero card begins immediately below with Label, Main Heading, and Hero Description fields.


The archive error reference is a blurred/dimmed full-screen editor state with a centered 312px-wide dark dialog titled “Something went wrong.” Its copy reads “Unable to save updated industry. Please try again.” and uses one full-width outlined “Try Again” action plus the visible error code `ERR_NETWORK_TIMEOUT_504`. The success asset is a 460px × 356px crop showing a light surrounding canvas and a centered dark card with a lime circular check icon, “Industry Updated,” the message “The industry information has been updated successfully.”, and a full-width lime “Go to Industries” button. The success interaction returns to the Industries directory rather than a generic Continue label.


## Rendered comparison checkpoint

The rebuilt desktop directory now renders at the supplied 1280×910 ratio with the approved 278px sidebar, compact 1002px main area, dark table, exact four visible archive records, route labels, related counts, status chips, action icons, and pagination. The Add/Edit capture shows the archive-aligned long-form card stack, a 200px Publishing rail, top Discard/Save Draft/Publish actions, a clickable lime “Industries” breadcrumb with a left arrow, and the supplied office/team and factory images in the appropriate Hero treatments. The visual surface is now compact and table-first rather than the previous oversized generic card presentation.


## Detail/Edit correction findings

The supplied Edit reference is a 1001px-wide desktop content crop with a dark admin utility header inside the main area, not a generic page header. Its breadcrumb reads “Industries > Real Estate & Property Tech > Edit Service,” and the top actions are Preview, Cancel, and lime Save Changes. The form canvas is a light gray/off-white surface below the dark header. Cards use dark charcoal surfaces with lime section icons and compact outlined fields. Basic Information contains Industry Name, URL Slug with `/industry/` prefix, Short Description (for cards/listings), and a Status select. Industry Hero Section is a two-column card with Eyebrow Label, Main Heading, Hero Description, and a right-side Hero Media / Background image using the supplied factory artwork.

The browser-extracted Detail archive crop is visually dense at its original scale; the readable Edit reference confirms that the current implementation’s dark full-page editor and top-level Publish-only action are structurally wrong. The corrected Edit view must use the light content canvas, dark card sections, top Preview/Cancel/Save Changes actions, populated Real Estate & Property Tech values, and the supplied factory image in the Hero media column. All subviews must retain a visible Industries breadcrumb for return navigation.


## Second Detail/Edit comparison

The supplied `Main Content Area.png` and `Main Content Area-1.png` crops both show the same Edit screen at 1001px wide: dark utility/breadcrumb header, title “Real Estate & PropTech,” Preview/Cancel/Save Changes actions, and a light gray page canvas below. The Basic Information card contains the exact populated values “Real Estate & PropTech,” `/industry/real-estate-proptech`, “Transforming property management and real estate transactions through advanced digital ecosystems.”, and Status Published. The Industry Hero Section uses a two-column layout: fields on the left and the supplied factory image on the right.

The supplied `Main Content Wrapper-1.png` is the Create New Industry screen at 1001px × 840px. It has a light gray canvas, white Create New Industry title, top Discard/Save Draft/Publish actions, a 422px dark form column, and a 200px dark Publishing rail. The current rebuild is directionally close but needs these exact surface and header arrangements applied to Edit and Create, plus the real populated Edit values and `/industry/` slug prefix.


## Tall archive detail/editor structure

The 1001px × 7246px archive crop is the complete long-form Industry Edit document. It uses a light gray page canvas with dark cards stacked vertically and a fixed-height dark Publishing rail at the top right. The cards continue through Basic Information, Industry Hero Section, Proven Industry, Boost Vertex Advantage, Industry Friction & Challenges, Digital Maturity, Case Studies, FAQ, Final CTA, and SEO. Each section has a lime numbered/icon header, dense outlined fields or rows, and compact Add Point/Add Advantage controls. The reference’s page is intentionally very tall and narrow; the current shorter custom Detail document cannot match it until the edit/detail surfaces share this long-form card rhythm.

The desktop directory crop confirms the global utility header is part of the Admin shell, while the Edit crop adds a module breadcrumb inside that header. The breadcrumb must be visible as “Industries > Real Estate & Property Tech > Edit Service,” with a clickable Industries segment returning to the directory.


## Supplied Create screen, verified crops

The exact Create screen is a 1280px-wide dark Admin composition. The left sidebar is 278px wide with the Boost Vertex brand, full navigation, and a bottom Need Help card. The main header has the breadcrumb “Industries > Add New,” notification/message controls, and Admin User. The content starts with “Create New Industry” at x≈311 and top actions Discard, Save Draft, and lime Publish. The form is a 603px-wide dark card column beginning at x≈319, paired with a 286px Publishing rail at x≈954. Card 1 is “1. Basic Information” with Industry Name, URL Slug, and a tall Short Description field. Card 2 is “2. Industry Hero” with Label, Main Heading, Hero Description, two side-by-side Primary CTA and Secondary CTA cards, and a dashed Hero Visual drop zone reading “Select from Media Library.” Card 3 begins “3. Industry Reality” with Heading and Description. The supplied Create reference is dark throughout; the earlier light-canvas override is incorrect for this exact screen.


## Supplied Edit screen, verified crops

The Edit screen is a dark 1280px-wide Admin composition with the exact breadcrumb “Industries > Real Estate & Property Tech > Edit Service” in the main utility row. The top title is “Real Estate & PropTech”; the right actions are Preview with an eye icon, Cancel, and lime Save Changes. Card 1 is “1. Basic Information” and includes populated Industry Name, URL Slug, Short Description (for cards/listings), and a Status dropdown. Card 2 is “2. Industry Hero Section,” laid out in two columns. The left fields are Eyebrow Label = “PropTech Solutions,” Main Heading = “Build the Future of Real Estate,” Hero Description with a four-line paragraph, and Primary CTA Text/Link = “Explore Solutions” / “#solutions.” The right column is labeled Hero Media / Background and displays the provided factory image at roughly 420×240 with the note “Recommended size: 1920×1080px (WebP or MP4).” Card 3 is “3. Industry Reality” with Reality Heading = “The PropTech Landscape,” Reality Description, and repeatable Reality Points containing Icon, Title, and Description inputs. All cards are black/dark green with thin gray borders and compact 12–14px labels; there is no light gray canvas.


## Supplied Industry Detail, verified crops

The exact Detail screen is a dark 1280px Admin composition. The left sidebar is 278px wide and includes the full admin navigation plus the Need Help card. The main utility header is 64px high and shows the breadcrumb “Industries > Real Estate & Property Tech,” notification/message controls, and Admin User. The title area has a lime Published pill, a two-line title “Real Estate & Property Tech,” the line “Last Updated: Oct 24, 2023 by Admin User,” a red Delete action, a dark Preview button, and a lime “Edit Industry Page” button. The content begins directly on the same dark page; there is no light gray document canvas. Detail cards are centered at roughly 920px wide and have black backgrounds, thin gray borders, 16px rounded corners, and accordion-style headers with lime numbered/icon markers and chevrons.

The first card is “Basic Info” with Industry Name, Slug shown as a dark blue code chip `real-estate-proptech`, and the exact Short Description “Digital transformation strategies for modern brokerages, REITs, and property management firms.” The second card is “Industry Hero,” with left-side Label = “PROPTECH SOLUTIONS,” Heading = “Build the Future of Real Estate.”, a four-line description, and a blue CTA chip “Explore PropTech Services → /services/proptech”; its right side contains the supplied office/team image. The following cards are “Industry Reality,” “Boost Vertex Advantage,” and “Friction & Challenges.” Boost Vertex Advantage uses three blue cards for Scalability, Performance, and Reliability; Friction & Challenges uses two blue horizontal cards. The prior light gray Detail canvas and oversized generic hero block were incorrect and must be removed.
