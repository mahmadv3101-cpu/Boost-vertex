# Boost Vertex Website — Backend API & Data Requirements

This document defines the **backend APIs and data required by the Boost Vertex website frontend**. It covers published website content, forms, action tracking, service pages, case studies, resources, industry pages, legal content, and shared technical conventions.

## 1. Shared API conventions

All public website endpoints should use the `/api` base path and return JSON. The frontend supports a configurable base URL through `VITE_API_BASE_URL`.

| Item | Required convention |
|---|---|
| Public content | Public `GET` endpoints for published content only; no login required for visitors. |
| Success response | `{ "data": { ... }, "message": "optional", "requestId": "optional" }` |
| Error response | `{ "message": "Human-readable error", "code": "OPTIONAL_CODE", "requestId": "optional" }` |
| Slugs | Stable, lowercase, unique URL slugs for services, case studies, posts, and industries. |
| Assets | Direct HTTPS image URLs with optional `alt` text. The frontend should not receive server filesystem paths. |
| Pagination | Return `page`, `limit`, `total`, and `hasNextPage` for every paginated list. |
| Publishing | Draft/unpublished content must never be returned by public endpoints. |
| Validation | Validate all public submissions server-side, even when the browser performs client-side validation. |
| Attribution | Accept optional `source`, `page`, `cta`, `referrer`, and UTM fields on lead and CTA submissions. |

## 2. Global website actions

These endpoints support shared forms and controls that appear across the website.

| Endpoint | Method | Request body | Success response | Used by |
|---|---|---|---|---|
| `/api/leads` | `POST` | `firstName`, `lastName`, `workEmail`, `companyWebsite`, optional `topic`, `message`, `source`, `page`, `utm` | `{ data: { leadId } }` | Home growth-plan form; Contact page; future service/case-study CTAs |
| `/api/newsletter` | `POST` | `email`, optional `source`, `page`, `utm` | `{ data: { subscriptionId } }` | Home and future Resources page newsletter forms |
| `/api/fast-track` | `POST` | `action`: `call`, `chat`, `book`, or `inquiry`; optional `page`, `source`, `utm` | `{ data: { accepted } }` | Fixed mobile Fast Track action bars |
| `/api/cta-events` | `POST` | `intent`, `page`, `location`, optional `targetSlug`, `utm` | `{ data: { received } }` | CTA attribution across all pages |

### Lead payload

```json
{
  "firstName": "Ahmed",
  "lastName": "Khan",
  "workEmail": "ahmed@company.com",
  "companyWebsite": "https://company.com",
  "topic": "Growth strategy",
  "message": "Optional contact-page message",
  "source": "website",
  "page": "/services/search-performance-max",
  "utm": {
    "source": "google",
    "medium": "cpc",
    "campaign": "brand"
  }
}
```

## 3. Home page data

The Home page has lead capture, Fast Track actions, brand/trust content, service previews, case-study previews, performance metrics, process content, insights, FAQ, and newsletter subscription.

| Endpoint | Method | Required data |
|---|---|---|
| `/api/site/home` | `GET` | Hero copy, CTA labels, trust brands, featured services, featured case studies, metrics, process steps, insight cards, FAQ items, conversion-panel content |
| `/api/leads` | `POST` | Growth-plan form submission |
| `/api/newsletter` | `POST` | Newsletter email submission |
| `/api/fast-track` | `POST` | Call, Chat, Book, Inquiry action selection |

Recommended `featuredServices[]` fields: `title`, `slug`, `summary`, `icon`, `metricValue`, `metricLabel`, and `ctaLabel`.

Recommended `featuredCaseStudies[]` fields: `clientName`, `slug`, `industry`, `primaryMetric { value, label }`, `summary`, `cardImage`, and `featured`.

## 4. About page data

The About page contains the brand story, values, team/leadership, trusted brands, process content, recruitment content, conversion actions, and Fast Track actions.

| Endpoint | Method | Required data |
|---|---|---|
| `/api/site/about` | `GET` | Hero content, origin/story copy, trust brands, values, process steps, leadership team, careers/recruitment content, footer conversion content |
| `/api/about/cta` | `POST` | `intent`, `source`, optional `page` and UTM values |
| `/api/fast-track` | `POST` | Fixed mobile Call, Chat, Book, Inquiry actions |

Recommended team member fields: `name`, `role`, `bio`, `photoUrl`, `photoAlt`, `linkedinUrl`, `sortOrder`, and `published`.

Recommended trust-brand fields: `name`, `logoUrl`, `logoAlt`, `websiteUrl`, `sortOrder`, and `published`.

## 5. Services Overview page data

The Services Overview page renders a six-service capability catalogue, approach content, and service conversion actions.

| Endpoint | Method | Query / request | Required response data |
|---|---|---|---|
| `/api/services` | `GET` | `published=true`, optional `include=card` | Array of service-card records |
| `/api/services/:slug` | `GET` | Service slug | Full service-detail record |
| `/api/cta-events` | `POST` | Service CTA event | Conversion attribution |

### Service-card record

```json
{
  "id": "service_001",
  "slug": "technical-content-seo",
  "title": "Technical & Content SEO",
  "shortTitle": "SEO",
  "summary": "Short service introduction.",
  "icon": "https://cdn.example.com/icons/seo.svg",
  "outcomes": ["Technical audits", "Keyword strategy", "Programmatic SEO"],
  "metricValue": "+138%",
  "metricLabel": "Organic Traffic",
  "accented": false,
  "sortOrder": 1,
  "published": true
}
```

## 6. Service Detail page data

The reusable Service Detail route is `/services/:slug`. The backend provides all service-specific text, cards, proof data, FAQs, SEO fields, and related case studies.

| Field group | Required fields |
|---|---|
| Core | `id`, `slug`, `name`, `eyebrow`, `heroTitle`, `heroEmphasis`, `heroCopy`, `heroImage`, `heroImageAlt` |
| Hero proof | `heroStats[]` with `value`, `label`, `sortOrder` |
| Capabilities | `capabilities[]` with `index`, `name`, `description`, `icon`, `sortOrder` |
| Approach timeline | `approachSteps[]` with `index`, `title`, `description`, `sortOrder` |
| Workflow | `workflow { title, copy, imageUrl, imageAlt, phases[] }`; each phase has `title`, `description`, `sortOrder` |
| Proof | `outcomeProof[]` with `clientName`, `industry`, `metricValue`, `metricLabel`, `description`, `caseStudySlug`, `approved` |
| FAQs | `faqs[]` with `question`, `answer`, `sortOrder` |
| Related work | `relatedCaseStudies[]` with `slug`, `clientName`, `industry`, `primaryMetric` |
| SEO | `seo { metaTitle, metaDescription, ogImageUrl, canonicalUrl }` |

## 7. Case Studies Listing page data

The Case Studies Listing page supports cards, industry/service filters, load-more pagination, aggregate performance metrics, and industry expertise cards.

| Endpoint | Method | Query / request | Required response data |
|---|---|---|---|
| `/api/case-studies` | `GET` | `page`, `limit`, optional `industry`, `service`, `featured` | Paginated case-study cards |
| `/api/case-studies/summary` | `GET` | None | Aggregate website metrics |
| `/api/industries` | `GET` | Optional `include=case-study-summary` | Industry cards and filter options |
| `/api/case-studies/:slug` | `GET` | Case-study slug | Full case-study detail data |

### Case-study list response

```json
{
  "data": {
    "items": [
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
        "summary": "Short approved results summary.",
        "services": ["paid-social-meta-ads", "conversion-led-web-design"],
        "publishedAt": "2026-08-01T00:00:00.000Z",
        "featured": true
      }
    ],
    "page": 1,
    "limit": 6,
    "total": 8,
    "hasNextPage": true
  }
}
```

### Case-study summary response

```json
{
  "data": {
    "adSpendManaged": { "value": "$7M+", "label": "Ad Spend Managed" },
    "averageRoi": { "value": "4.8x", "label": "Average ROI" },
    "clientRetention": { "value": "98%", "label": "Client Retention" }
  }
}
```

## 8. Future Case Study Detail page data

The future Case Study Detail page will use `GET /api/case-studies/:slug`.

| Field group | Required fields |
|---|---|
| Core | `id`, `slug`, `clientName`, `title`, `industry`, `industrySlug`, `heroImage`, `heroImageAlt` |
| Challenge | `challengeTitle`, `challengeCopy` |
| Strategy | `strategyTitle`, `strategyCopy`, `strategySteps[]` |
| Results | `results[]` with `value`, `label`, `description`, `sortOrder` |
| Media | `gallery[]` with `url`, `alt`, `caption`, `sortOrder` |
| Quote | `quote { text, personName, personRole, approved }` — only return approved quotations |
| Related work | `relatedCaseStudies[]` |
| SEO | `seo { metaTitle, metaDescription, ogImageUrl, canonicalUrl }` |

## 9. Blog and Resources data

| Endpoint | Method | Query / request | Required response data |
|---|---|---|---|
| `/api/posts` | `GET` | `page`, `limit`, optional `category`, `tag`, `search`, `featured` | Paginated post previews |
| `/api/posts/:slug` | `GET` | Post slug | Full post content and related posts |
| `/api/post-categories` | `GET` | None | `id`, `slug`, `name`, `sortOrder` |
| `/api/authors/:slug` | `GET` | Author slug | Name, role, bio, photo, social links |

Post preview fields: `id`, `slug`, `title`, `excerpt`, `featuredImage`, `featuredImageAlt`, `category`, `tags`, `author`, `publishedAt`, `readTimeMinutes`, and `featured`.

Post detail fields: all preview fields plus `contentBlocks[]`, `authorBio`, `relatedPosts[]`, and `seo`.

## 10. Industry Landing page data

The reusable Industry Landing route should use `GET /api/industries/:slug`.

| Field group | Required fields |
|---|---|
| Core | `id`, `slug`, `name`, `heroTitle`, `heroCopy`, `heroImage`, `heroImageAlt` |
| Industry needs | `painPoints[]`, `opportunities[]`, `metrics[]` |
| Services | `recommendedServices[]` with service `slug`, `title`, `summary` |
| Proof | `caseStudies[]`, `aggregateMetrics[]`, approved `quote?` |
| Conversion | `ctaTitle`, `ctaCopy`, `ctaLabel` |
| FAQs and SEO | `faqs[]`, `seo` |

## 11. Contact, legal, and Thank You pages

| Page | Endpoint | Method | Required data |
|---|---|---|---|
| Contact | `/api/leads` | `POST` | Global lead payload with optional `topic` and `message` |
| Contact | `/api/site/contact` | `GET` | Email, phone, office locations, maps/coordinates, contact-page CTA content |
| Privacy Policy | `/api/legal/privacy-policy` | `GET` | `title`, `version`, `effectiveDate`, `contentBlocks[]`, `seo` |
| Thank You | None required | — | Static confirmation copy after successful lead submission |
| Thank You (optional) | `/api/leads/:leadId/status` | `GET` | Server-confirmed lead status when the URL includes a `leadId` |

## 12. Security and data-handling requirements

Public submission endpoints should use rate limiting, server-side validation, logging, and anti-spam protection. The backend must not expose database credentials, private admin fields, unpublished data, or unapproved customer quotations. Any user-provided data should be sanitized before storage and before returning it to a browser.

## 13. Immediate implementation checklist

| Priority | Backend item |
|---|---|
| 1 | Confirm `POST /api/leads`, `POST /api/newsletter`, and `POST /api/fast-track` response formats. |
| 2 | Implement `GET /api/services` and `GET /api/services/:slug`. |
| 3 | Implement `GET /api/case-studies`, `GET /api/case-studies/summary`, and `GET /api/industries`. |
| 4 | Provide published image URLs and approved data for service, case-study, team, and brand content. |
| 5 | Add blog, industry, legal, and detailed case-study endpoints as their corresponding pages are implemented. |

## References

[1]: https://www.figma.com/design/AdCesY50mhBnuAApgf2eB2/Services-Overview?node-id=0-1 "Services Overview — Figma"

[2]: https://www.figma.com/design/hkN6AbYCIBgt337nLPY5ub/Service-Detail-Template?node-id=0-1 "Service Detail Template — Figma"

[3]: https://www.figma.com/design/0wkJm2FqxeZBo3Y6S5nAcj/Case-studies-list?node-id=0-1 "Case Studies Listing — Figma"
