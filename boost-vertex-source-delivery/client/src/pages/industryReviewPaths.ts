export const industryReviewPaths = [
  "list",
  "search",
  "search-found",
  "no-results",
  "empty",
  "loading",
  "error",
  "filters",
  "add",
  "edit",
  "detail",
  "preview",
  "delete",
  "created",
  "updated",
  "validation",
  "save-error",
  "published",
] as const;

export type IndustryReviewState = (typeof industryReviewPaths)[number];

export function industryReviewUrl(state: IndustryReviewState) {
  return `/admin/industries?industry-state=${state}`;
}
