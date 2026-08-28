export type MobileServiceFilters = { status: "all" | "published" | "draft"; category: "all" | "SEO" | "Paid Media" | "Development"; startDate: string; endDate: string };

export const defaultMobileServiceFilters: MobileServiceFilters = { status: "all", category: "all", startDate: "", endDate: "" };

export const filterMobileServices = <T,>(records: T[], filters: MobileServiceFilters, getCategory: (record: T) => string, getPublished: (record: T) => boolean) => records.filter((record) => {
  const statusMatches = filters.status === "all" || (filters.status === "published" ? getPublished(record) : !getPublished(record));
  const categoryMatches = filters.category === "all" || getCategory(record) === filters.category;
  return statusMatches && categoryMatches;
});

export const servicesMobileReviewPaths = [
  "/admin/services",
  "/admin/services?service-state=search",
  "/admin/services?service-state=search-found",
  "/admin/services?service-state=no-results",
  "/admin/services?service-state=filters",
  "/admin/services?service-state=empty",
  "/admin/services?service-state=loading",
  "/admin/services?service-state=error",
  "/admin/services?service-state=add",
  "/admin/services?service-state=create-error",
  "/admin/services?service-state=edit",
  "/admin/services?service-state=update-error",
  "/admin/services?service-state=edit-save-error",
  "/admin/services?service-state=detail",
  "/admin/services?service-state=preview",
  "/admin/services?service-dialog=delete",
  "/admin/services?service-state=updated",
  "/admin/services?service-state=save-error",
] as const;
