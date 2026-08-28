import { describe, expect, it } from "vitest";
import { defaultMobileServiceFilters, filterMobileServices, servicesMobileReviewPaths } from "./servicesMobileReviewPaths";

describe("mobile Services Module review paths", () => {
  it("contains the complete set of eighteen stable review paths", () => {
    expect(servicesMobileReviewPaths).toHaveLength(18);
    expect(new Set(servicesMobileReviewPaths).size).toBe(18);
    expect(servicesMobileReviewPaths[0]).toBe("/admin/services");
    expect(servicesMobileReviewPaths).toContain("/admin/services?service-state=detail");
    expect(servicesMobileReviewPaths).toContain("/admin/services?service-dialog=delete");
    expect(servicesMobileReviewPaths).toContain("/admin/services?service-state=save-error");
  });

  it("filters the local service records by applied status and category", () => {
    const records = [
      { title: "Enterprise SEO Audit", isPublished: true, category: "SEO" },
      { title: "Website Development", isPublished: false, category: "Development" },
      { title: "Performance Paid Media", isPublished: true, category: "Paid Media" },
    ];
    const filtered = filterMobileServices(records, { ...defaultMobileServiceFilters, status: "published", category: "SEO" }, (record) => record.category, (record) => record.isPublished);
    expect(filtered.map((record) => record.title)).toEqual(["Enterprise SEO Audit"]);
  });
});
