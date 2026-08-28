import { describe, expect, it } from "vitest";
import { adminModuleDestination, adminScreenLabel, leadReviewUrl } from "./adminNavigation";

const modulePaths = { Dashboard: "dashboard", Leads: "leads", Services: "services", "Case Studies": "case-studies", "Blog / Resources": "blog" };

describe("Admin navigation", () => {
  it("always opens the Leads list from the Leads module navigation", () => {
    expect(adminModuleDestination("Leads", modulePaths)).toBe("/admin/leads?lead-state=list");
  });

  it("keeps other module destinations on their normal routes", () => {
    expect(adminModuleDestination("Services", modulePaths)).toBe("/admin/services");
    expect(adminModuleDestination("Case Studies", modulePaths)).toBe("/admin/case-studies?case-study-state=list");
    expect(adminModuleDestination("Blog / Resources", modulePaths)).toBe("/admin/blog?blog-state=list");
  });

  it("generates stable Lead list and detail review links", () => {
    expect(leadReviewUrl("list")).toBe("/admin/leads?lead-state=list");
    expect(leadReviewUrl("detail")).toBe("/admin/leads?lead-state=list&lead-dialog=detail");
  });

  it("labels the opened screen in the shared breadcrumb", () => {
    expect(adminScreenLabel("Leads", "?lead-state=list")).toBe("Leads");
    expect(adminScreenLabel("Leads", "?lead-state=list&lead-dialog=detail")).toBe("Lead Details");
    expect(adminScreenLabel("Industries", "?industry-state=list")).toBe("Industries");
    expect(adminScreenLabel("Industries", "?industry-state=detail")).toBe("Real Estate & Property Tech");
    expect(adminScreenLabel("Case Studies", "?case-study-state=add")).toBe("Create Case Study");
    expect(adminScreenLabel("Case Studies", "?case-study-state=edit")).toBe("Edit Case Study");
    expect(adminScreenLabel("Case Studies", "?case-study-state=detail")).toBe("Case Study Details");
    expect(adminScreenLabel("Blog / Resources", "?blog-state=add")).toBe("Create New Blog");
    expect(adminScreenLabel("Blog / Resources", "?blog-state=detail")).toBe("Blog Details");
  });
});
