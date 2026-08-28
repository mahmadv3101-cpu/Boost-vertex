# Home Header Alignment Reference Notes

## Supplied Wide Screenshot — Verified Crop Findings

1. **Tile 1 (x: 0–600):** The Boost Vertex brand sits near the left margin, with a large clear region between its right edge and the start of the navigation.
2. **Tile 2 (x: 429–1029):** The navigation begins around the first third of the full header and extends through the visual middle; its positioning is not intended to be mathematically centered as an isolated group across the entire 1887px canvas.

## Working Interpretation

The supplied screenshot demonstrates the **current issue**, not the target: at a wide viewport, the Home header only occupies the fixed page frame and the navigation is centered within that narrower frame. The requested outcome is for the navigation to be centered across the complete visible browser width.

3. **Tile 3 (x: 858–1458):** The nav sequence continues from Case Studies through Contact before the phone number begins, confirming that the navigation belongs in a broad, left-biased middle column rather than an overlay centered across the complete viewport.
4. **Tile 4 (x: 1287–1887):** The phone and lime CTA occupy a deliberately wide right column. The CTA ends close to the right margin, making equal-width left/right columns inappropriate for matching this reference.

## Implementation Direction

Make the Home sticky header span the viewport at desktop widths, rather than inheriting the narrower fixed-page width. Keep the full-width non-blocking navigation centering layer, then let it center relative to the actual viewport. Keep the logo left and phone/CTA group right within that viewport-wide header.
