# Mobile Admin Dashboard — Figma Reference Notes

The supplied Figma node presents the Admin Dashboard as a narrow, single-column operational workspace. The dark charcoal shell remains consistent with desktop, while desktop-only multi-column density collapses into stacked mobile cards.

| Area | Mobile reference treatment |
|---|---|
| Overall frame | Narrow mobile canvas with a slim dark border, near-black page background, and compact internal gutters. |
| Header | Compact top app bar with the Dashboard title, short supporting copy, a notification bell, and a small profile/menu control. |
| Metrics | Six metric cards appear as a compact two-column grid: Total Leads, New Leads, Services, Industry Pages, Case Studies, and Blog / Resources. |
| Overview | Full-width dark card after metrics; heading and small range selector on the top row, two-item Leads/Visitors legend, then the lime and blue trend lines. |
| Recent Leads | Full-width stacked card after the chart; the Name, Company, and Status columns remain visible while the table becomes more compact. |
| Performance and status | Top Performing Services and Leads by Status become separate full-width cards with their existing lime bars and donut/status list. |
| Quick Actions | Final compact two-column action grid on the mobile dashboard. |
| Typography | Chivo is retained for dashboard and card headings; Inter is used for supporting copy, labels, timestamps, and table text. |

The mobile node is a responsive dashboard overview, not a horizontally scaled desktop canvas. The implementation should preserve the desktop routes and use a mobile menu for sidebar navigation.
