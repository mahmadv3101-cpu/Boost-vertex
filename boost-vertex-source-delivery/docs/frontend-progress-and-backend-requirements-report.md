# Boost Vertex Website — Frontend Progress & Backend Requirements Report

**Project:** Boost Vertex Performance Marketing Website  
**Frontend stack:** React 19, Vite 7, TypeScript, Tailwind CSS 4, Wouter  
**Integration target:** REST API under `/api` with JSON responses

## 1. Frontend page progress

| Page | Current status | Frontend scope | Backend data/API required |
|---|---|---|---|
| Home Page | **Done** | Hero form, Fast Track actions, services, case studies, metrics, process, insights, FAQ, newsletter, footer | Leads, newsletter, Fast Track, optional homepage CMS data |
| About Page | **Done** | Brand story, values, team, trust brands, process, recruitment, CTA, mobile menu and Fast Track | About content, leadership/team, trust brands, CTA tracking, Fast Track |
| Services Overview Page | **Under Development** | Service catalogue, approach, capability cards, CTA | Services list, service-card content, CTA tracking |
| Service Detail Page Template | **Under Development** | Dynamic service hero, capabilities, approach, workflow, proof, FAQ, CTA | Service by slug, FAQs, proof metrics, related case studies |
| Case Studies Listing Page | **Under Development** | Case-study cards, filters, Load More, impact statistics, industries, CTA | Paginated case studies, industry filters, aggregate metrics |
| Case Study Detail Page Template | **Awaiting Design** | Detail story, challenge, strategy, results, gallery, related cases | Case study by slug |
| Blog / Resources Page | **Awaiting Design** | Post listing, categories, search, newsletter | Paginated posts, categories, tags, authors |
| Blog Detail Page | **Awaiting Design** | Article content, author, related posts, SEO | Post by slug, related posts, author data |
| Industry Landing Page Template | **Awaiting Design** | Industry hero, services, proof, FAQ, CTA | Industry by slug, related services and case studies |
| Contact Page | **Awaiting Design** | Contact form, contact details, locations | Lead submission, office/contact content |
| Privacy Policy Page | **Awaiting Design** | Published legal page | Privacy-policy content and version |
| Thank You Page | **Awaiting Design** | Lead confirmation page | Optional lead-status endpoint |

> **Status meaning:** “Under Development” means the page is actively being prepared for final backend data integration and QA. “Awaiting Design” means the frontend page begins once its approved Figma design is received.

## 2. Core backend requirements

The frontend needs the backend to provide published website content, lead capture, action tracking, service content, case-study data, blog content, industry data, legal content, and media URLs.

| Requirement | Frontend expectation |
|---|---|
| API base path | `/api` by default; configurable through `VITE_API_BASE_URL` |
| Response format | Success: `{ data, message?, requestId? }`; Error: `{ message, code?, requestId? }` |
| Public content | Public `GET` APIs should return published records only |
| Assets | Direct HTTPS image URLs and optional alt text; no server file paths |
| Slugs | Unique lowercase slugs for services, case studies, posts, and industries |
| Pagination | `page`, `limit`, `total`, `hasNextPage` for lists |
| Validation | Backend validation for all form fields and enum values |
| Security | Rate limiting, input sanitization, anti-spam protection, and no exposure of private/admin data |
| Attribution | Accept optional `page`, `source`, `cta`, `referrer`, and UTM values on submissions |

## 3. Global website APIs

| Endpoint | Method | Required request data | Required response | Used by |
|---|---|---|---|---|
| `/api/leads` | `POST` | `firstName`, `lastName`, `workEmail`, `companyWebsite`, optional `topic`, `message`, `page`, `source`, `utm` | `{ data: { leadId } }` | Home form, Contact page, CTA forms |
| `/api/newsletter` | `POST` | `email`, optional `page`, `source`, `utm` | `{ data: { subscriptionId } }` | Home and Resources newsletter forms |
| `/api/fast-track` | `POST` | `action`: `call`, `chat`, `book`, or `inquiry`; optional `page`, `source`, `utm` | `{ data: { accepted } }` | Fixed mobile Fast Track controls |
| `/api/cta-events` | `POST` | `intent`, `page`, `location`, optional `targetSlug`, `utm` | `{ data: { received } }` | Conversion tracking across all pages |

### Lead submission example

```json
{
  "firstName": "Ahmed",
  "lastName": "Khan",
  "workEmail": "ahmed@company.com",
  "companyWebsite": "https://company.com",
  "topic": "Growth strategy",
  "message": "Optional contact-page message",
  "page": "/services/technical-content-seo",
  "source": "website",
  "utm": {
    "source": "google",
    "medium": "cpc",
    "campaign": "brand"
  }
}
```

## 4. Home page data requirements

| Endpoint | Method | Required data |
|---|---|---|
| `/api/site/home` | `GET` | Hero copy, CTA labels, trust brands, featured services, featured case studies, metrics, process steps, insights, FAQ, conversion-panel copy |
| `/api/leads` | `POST` | Growth-plan form submission |
| `/api/newsletter` | `POST` | Newsletter email submission |
| `/api/fast-track` | `POST` | Call, Chat, Book, Inquiry action selection |

Recommended featured service fields are `title`, `slug`, `summary`, `icon`, `metricValue`, `metricLabel`, and `ctaLabel`. Recommended featured case-study fields are `clientName`, `slug`, `industry`, `primaryMetric`, `summary`, `cardImage`, and `featured`.

## 5. About page data requirements

| Endpoint | Method | Required data |
|---|---|---|
| `/api/site/about` | `GET` | Hero, story/origins, values, process steps, leadership, trust brands, recruitment content, CTA content |
| `/api/about/cta` | `POST` | `intent`, `source`, optional `page` and UTM values |
| `/api/fast-track` | `POST` | Mobile Call, Chat, Book, Inquiry action selection |

### About content models

| Model | Required fields |
|---|---|
| Leadership member | `name`, `role`, `bio`, `photoUrl`, `photoAlt`, `linkedinUrl`, `sortOrder`, `published` |
| Trust brand | `name`, `logoUrl`, `logoAlt`, `websiteUrl`, `sortOrder`, `published` |
| Value/process item | `title`, `description`, `icon`, `sortOrder`, `published` |

## 6. Services Overview data requirements

| Endpoint | Method | Required data |
|---|---|---|
| `/api/services` | `GET` | Published service-card collection |
| `/api/services/:slug` | `GET` | Full selected service content |
| `/api/cta-events` | `POST` | Services CTA event tracking |

### Service-card model

| Field | Description |
|---|---|
| `id`, `slug`, `title`, `shortTitle` | Service identifier and route data |
| `summary`, `icon` | Card introduction and icon URL/key |
| `outcomes[]` | Bullet list of capabilities/outcomes |
| `metricValue`, `metricLabel` | Card performance or positioning metric |
| `accented`, `sortOrder`, `published` | Display control fields |

## 7. Service Detail Template data requirements

The frontend route is `/services/:slug`.

| Content group | Required fields |
|---|---|
| Hero | `id`, `slug`, `name`, `eyebrow`, `heroTitle`, `heroEmphasis`, `heroCopy`, `heroImage`, `heroImageAlt`, `heroStats[]` |
| Capabilities | `capabilities[]` with `index`, `name`, `description`, `icon`, `sortOrder` |
| Approach | `approachSteps[]` with `index`, `title`, `description`, `sortOrder` |
| Workflow | `workflow { title, copy, imageUrl, imageAlt, phases[] }` |
| Proof | `outcomeProof[]` with `clientName`, `industry`, `metricValue`, `metricLabel`, `description`, `caseStudySlug`, `approved` |
| FAQ | `faqs[]` with `question`, `answer`, `sortOrder` |
| Related work | `relatedCaseStudies[]` with `slug`, `clientName`, `industry`, `primaryMetric` |
| SEO | `seo { metaTitle, metaDescription, ogImageUrl, canonicalUrl }` |

## 8. Case Studies Listing data requirements

| Endpoint | Method | Query parameters | Required data |
|---|---|---|---|
| `/api/case-studies` | `GET` | `page`, `limit`, optional `industry`, `service`, `featured` | Paginated case-study cards |
| `/api/case-studies/summary` | `GET` | None | Aggregate performance metrics |
| `/api/industries` | `GET` | Optional `include=case-study-summary` | Industry filter and card data |
| `/api/case-studies/:slug` | `GET` | Case-study slug | Full case-study detail content |

### Case-study card model

```json
{
  "id": "case_001",
  "slug": "cloudsync-tech",
  "clientName": "CloudSync Tech",
  "industry": "SaaS",
  "industrySlug": "saas",
  "title": "Enterprise demand system",
  "cardImage": "https://cdn.example.com/cases/cloudsync.webp",
  "cardImageAlt": "CloudSync dashboard preview",
  "primaryMetric": { "value": "+185%", "label": "Lead Volume" },
  "summary": "Approved results summary.",
  "services": ["paid-social-meta-ads", "conversion-led-web-design"],
  "publishedAt": "2026-08-01T00:00:00.000Z",
  "featured": true
}
```

### Aggregate case-study metrics

```json
{
  "adSpendManaged": { "value": "$7M+", "label": "Ad Spend Managed" },
  "averageRoi": { "value": "4.8x", "label": "Average ROI" },
  "clientRetention": { "value": "98%", "label": "Client Retention" }
}
```

## 9. Data requirements for awaiting-design pages

| Future page | Required endpoint(s) | Main data fields |
|---|---|---|
| Case Study Detail | `GET /api/case-studies/:slug` | Client, industry, challenge, strategy, results, gallery, approved quote, related studies, SEO |
| Blog / Resources | `GET /api/posts`, `GET /api/post-categories` | Posts, categories, tags, authors, images, excerpts, pagination |
| Blog Detail | `GET /api/posts/:slug` | Article content blocks, author bio, related posts, SEO |
| Industry Landing | `GET /api/industries/:slug` | Industry hero, pain points, opportunities, services, metrics, case studies, FAQ, CTA |
| Contact | `GET /api/site/contact`, `POST /api/leads` | Contact details, locations, map data, contact content, lead submission |
| Privacy Policy | `GET /api/legal/privacy-policy` | Title, version, effective date, legal content blocks, SEO |
| Thank You | Optional `GET /api/leads/:leadId/status` | Lead confirmation status when required |

## 10. Required backend handoff

| Priority | Required backend item |
|---|---|
| 1 | Confirm the response format for `POST /api/leads`, `POST /api/newsletter`, and `POST /api/fast-track`. |
| 2 | Provide published API data for Home and About content, team, trust brands, and CTA configuration. |
| 3 | Provide `GET /api/services` and `GET /api/services/:slug` with service cards and detail-page content. |
| 4 | Provide `GET /api/case-studies`, `/api/case-studies/summary`, and `/api/industries` with pagination/filter support. |
| 5 | Provide approved image URLs, alt text, metrics, case-study descriptions, and only approved customer quotations. |
| 6 | Add blog, industry, legal, and case-study-detail endpoints when those approved designs move into frontend development. |

## References

[1]: https://www.figma.com/design/AdCesY50mhBnuAApgf2eB2/Services-Overview?node-id=0-1 "Services Overview — Figma"

[2]: https://www.figma.com/design/hkN6AbYCIBgt337nLPY5ub/Service-Detail-Template?node-id=0-1 "Service Detail Template — Figma"

[3]: https://www.figma.com/design/0wkJm2FqxeZBo3Y6S5nAcj/Case-studies-list?node-id=0-1 "Case Studies Listing — Figma"
