import { describe, expect, it } from "vitest";
import { caseStudyReviewPaths, caseStudyReviewUrl } from "./caseStudyReviewPaths";

describe("caseStudyReviewPaths", () => {
  it("defines all 18 desktop review states", () => {
    expect(caseStudyReviewPaths).toHaveLength(18);
    expect(new Set(caseStudyReviewPaths).size).toBe(18);
  });

  it("creates a direct admin route for every state", () => {
    caseStudyReviewPaths.forEach((state) => {
      expect(caseStudyReviewUrl(state)).toBe(`/admin/case-studies?case-study-state=${state}`);
    });
  });
});
