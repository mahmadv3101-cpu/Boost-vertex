import { describe, expect, it } from "vitest";
import { blogReviewPaths, blogReviewUrl } from "./blogReviewPaths";

describe("Blog / Resources review paths", () => {
  it("defines every supplied desktop review state", () => {
    expect(blogReviewPaths).toHaveLength(18);
    expect(blogReviewPaths).toEqual(expect.arrayContaining(["list", "filters", "add", "edit", "detail", "preview", "delete", "created", "updated", "validation", "save-error"]));
  });

  it("builds a direct Blog / Resources review URL for every state", () => {
    blogReviewPaths.forEach((state) => expect(blogReviewUrl(state)).toBe(`/admin/blog?blog-state=${state}`));
  });
});
