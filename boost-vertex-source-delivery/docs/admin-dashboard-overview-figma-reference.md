# Admin Dashboard Overview — Figma Reference Notes

The supplied Figma node `10-88` rendered on 2026-08-22. It is a desktop dark-mode operations dashboard with three principal vertical zones: a persistent left sidebar, a central dashboard workspace, and a persistent notification/messages rail on the right.

## Visible structure

| Zone | Visible components |
|---|---|
| Left sidebar | Boost Vertex lockup, Dashboard active state, Leads, Services, Industries, Case Studies, Blog / Resources, Media Library, Contact Messages, Settings, Admin Profile, Logout, and a green Help / Contact Support card at the bottom. |
| Top workspace bar | Search field, compact notification/status icons, avatar, and `Admin User` identity with `Super Admin` role. |
| Dashboard header | `Dashboard` heading, welcome copy, quick date filters (`Last 30 Days`, `This Quarter`, `Year to Date`). |
| KPI row | Total Leads `1,248`; New Leads `84`; Services `24`; Industry Pages `18`; Case Studies `32`; Blog / Resources `56`, each with a lime icon, trend indicator, and supporting period label. |
| Main analytics | `Overview` lead/visitor line chart with a period dropdown; `Recent Leads` table with `View all`. |
| Management tables | `Recent Contact Messages` and `Recent Content`, both with rows, status pills, date/update columns, and `View all` actions. |
| Bottom widgets | `Top Performing Services` bars, `Leads by Status` donut with legend, and `Quick Actions` tiles: Add Service, Add Industry Page, Add Case Study, Add Blog Post, Upload Media. |
| Right rail | `Notifications` feed and `Messages` feed, both with `View All`, timestamps, icon/avatar indicators, and scrollable density. |

## Visual system

The visual system uses a near-black canvas, charcoal panels, subtle 1px borders, lime `#c3f400` for selection/trends/status accents, Chivo-style display typography, muted gray body copy, compact tables, and restrained card radii. The reference has no large public-marketing hero treatment; it should feel like a dense internal operations tool.

## Readable content details from the 100% canvas view

| Widget | Figma content and behavior |
|---|---|
| Recent Leads | Columns: Name, Company, Status, Received. Visible records include Wade Warren / ABC Real Estate / New; Cody Fisher / Bright Solutions / Contacted; Floyd Miles / TechFlow Ltd. / Qualified; Albert Flores / innovateX / Converted; Dianne Russell / Marketify / Closed. |
| Overview chart | Two compact lines: Leads in lime and Visitors in blue, with dates May 15 through May 21, values up to 800, and a `This Week` dropdown. |
| Recent Contact Messages | Columns: From, Subject, Status, Received. The visible status language is `Unread` and `Read`. |
| Recent Content | Columns: Type, Title, Status, Updated. Type markers include Service, Industry, Case Study, and Blog Post; statuses include `Published` and `Draft`. |
| KPI trend language | Total Leads: `↑ 12.5% this month`; New Leads: `↑ 8.7% this week`; Services: `↑ 2 new this month`; Industry Pages: `↑ 1 new this month`; Case Studies: `↑ 4 new this month`; Blog / Resources: `↑ 7 new this month`. |
