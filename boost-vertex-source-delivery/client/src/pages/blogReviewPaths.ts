export const blogReviewPaths = [
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

export type BlogReviewState = (typeof blogReviewPaths)[number];

export function blogReviewUrl(state: BlogReviewState) {
  return `/admin/blog?blog-state=${state}`;
}
