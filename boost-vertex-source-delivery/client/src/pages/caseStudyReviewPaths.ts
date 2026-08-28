export const caseStudyReviewPaths = [
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

export type CaseStudyReviewState = (typeof caseStudyReviewPaths)[number];

export function caseStudyReviewUrl(state: CaseStudyReviewState) {
  return `/admin/case-studies?case-study-state=${state}`;
}
