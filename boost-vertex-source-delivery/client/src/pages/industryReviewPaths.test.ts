import { describe, expect, it } from "vitest";
import { industryReviewPaths, industryReviewUrl } from "./industryReviewPaths";

describe("Industry Module responsive review paths", () => {
  it("contains eighteen unique states", () => {
    expect(industryReviewPaths).toHaveLength(18);
    expect(new Set(industryReviewPaths).size).toBe(18);
  });

  it("generates direct admin URLs for representative mobile states", () => {
    expect(industryReviewUrl("list")).toBe("/admin/industries?industry-state=list");
    expect(industryReviewUrl("detail")).toBe("/admin/industries?industry-state=detail");
    expect(industryReviewUrl("save-error")).toBe("/admin/industries?industry-state=save-error");
  });

  it("keeps every state addressable for responsive review", () => {
    for (const state of industryReviewPaths) {
      expect(industryReviewUrl(state)).toContain(`industry-state=${state}`);
    }
  });
});
