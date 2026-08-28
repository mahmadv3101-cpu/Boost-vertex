# Services Overview Copy — Figma Inspection Notes

## Initial access attempt

The supplied desktop frame URL targets node `6-320`. The first Figma navigation completed, but the initial visual canvas did not render: the browser produced no interactive elements and a blank white editor viewport. No layout, copy, asset, or visual detail has been inferred from this blank state. A later rendered canvas or alternative Figma-access method is required before implementation decisions are made.

## Alternate render attempt

The direct Figma editor was inspected through the browser console and reported an interactive document with no canvas, images, or text nodes. An alternate Figma share-embed URL also rendered as a blank white viewport. These two access paths do not currently expose node `6-320` visual content in this environment. No unverified design details will be fabricated from the blank canvas; the existing Services Overview implementation and the previously accessible Services Overview Figma notes remain the only available implementation baseline unless the source frame becomes readable.

## Rendered desktop frame at 50% zoom

After the renewed link was supplied, node `6-320` rendered at 21% overview and then 50% detail scale. The desktop frame is a narrow 1280-style obsidian canvas with a compact top navigation. The hero headline is **“Every channel. One growth system.”** with “One growth system.” in lime; it uses a lime **“Get My Free Growth Plan →”** primary action and a dark **“Book a Free Strategy Call”** secondary action. Beneath the hero copy is a dark system board: SEO, Content, Paid Media, and Meta Ads feed toward Web Experience, Social, and Lead Generation, which then lead to a bordered lime **“BUSINESS GROWTH”** outcome block.

The next desktop band is a 50/50 black system section. At left is a layered mobile-device illustration in black/lime with circular orbit lines; at right, the lime overline **“THE BOOST VERTEX APPROACH”**, the display **“Full-service, not fragmented.”**, supporting copy, the three numbered statements Connected Strategy / One View of Performance / Continuous Optimization, and the lime text action **“See How We Work →”**. The following core-capabilities section has a centered white **“Our Core Capabilities”** heading, muted subtitle, and six cards in a 3 × 2 grid. Each card has a lime number, title, body copy, three lime-bullet outcomes, a faint bottom metric, and a right-pointing arrow; Paid Social & Meta Ads and B2B Lead Generation carry stronger lime emphasis.

At 21% overview, the full desktop frame visibly continues after the card grid into a full-width electric-lime conversion section headed **“Not sure which service you need?”**, followed by the compact dark multi-column site footer. The lower 50% canvas remained centered on the approach and card sections despite a downward wheel attempt, so the overview—not invented text—is the reliable evidence for the conversion/footer sequence.

## Desktop implementation validation

The Services Overview route was calibrated only at the desktop breakpoint: the hero actions now read “Get My Free Growth Plan →” and “Book a Free Strategy Call”; the prior generic orbit board was replaced on desktop with the Figma-visible channel flow (SEO/Content/Paid Media/Meta Ads → Web Experience/Social/Lead Generation → Business Growth); and the approach visual now uses a layered dark/lime phone and rotated detail card rather than generic placeholder rectangles. The full 1280px validation capture confirms the Figma section order, 50/50 approach composition, six-card 3 × 2 capability grid, lime conversion panel, and compact footer. Home and About were checked in the same validation pass and left unchanged. The existing mobile layout remains preserved pending its separate Figma-mobile implementation pass; its desktop-only new visual is intentionally hidden below 1024px. TypeScript and the production build pass, with only the established non-blocking chunk-size advisory.

## User-corrected hero hierarchy

The user identified that the first implementation placed the hero copy and channel visual side-by-side. The corrected desktop composition now stacks the heading, supporting copy, and CTAs first, then places the Figma channel-to-outcome board below them on the central axis. The shared curved dark/lime background is reinforced behind the hero, the second display line uses the lime-to-light gradient, and the approach display is now lime (including its italic “fragmented.” line). The Home desktop and mobile Services links now route to `/services`; browser click-through from the Home header was verified directly. Paired 1280px captures show Services, Home, and About rendering as intended; TypeScript and the production build pass.

## Artwork extraction note

The renewed Figma desktop canvas is readable at 21% overview and confirms the approach artwork is a single black/lime paired-phone orbit illustration. The editor exposes it only through the canvas and no standalone image resource is available in loaded browser resource URLs. To preserve fidelity instead of inventing a replacement, the supplied high-resolution Figma approach screenshot will be deterministically cropped to its left-side artwork region only (excluding the right-side copy) and used as the visual asset at the Figma-native proportion. This avoids re-viewing or altering the user’s attached screenshot while retaining the exact phone artwork visible in their reference.
