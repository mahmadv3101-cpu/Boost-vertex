const stateLabels: Record<string, string> = {
  list: "Leads",
  detail: "Lead Details",
  new: "Add New Lead",
  edit: "Edit Lead",
  delete: "Delete Lead",
  filters: "Filters",
  loading: "Loading",
  error: "Error",
  empty: "Empty",
  "no-results": "No Results",
  "search-found": "Search Results",
  created: "Created Successfully",
  updated: "Updated Successfully",
  validation: "Validation Error",
  "save-error": "Save Error",
  preview: "Preview",
};

export const adminModuleDestination = (label: string, paths: Record<string, string>) => label === "Leads" ? "/admin/leads?lead-state=list" : label === "Case Studies" ? "/admin/case-studies?case-study-state=list" : label === "Blog / Resources" ? "/admin/blog?blog-state=list" : `/admin/${paths[label]}`;

export const leadReviewUrl = (state: "list" | "detail") => state === "detail" ? "/admin/leads?lead-state=list&lead-dialog=detail" : "/admin/leads?lead-state=list";

export const adminScreenLabel = (module: string, search: string) => {
  const params = new URLSearchParams(search);
  const prefix = module === "Blog / Resources" ? "blog" : module === "Leads" ? "lead" : module === "Industries" ? "industry" : module === "Services" ? "service" : module === "Case Studies" ? "case-study" : module.toLowerCase().split(" ")[0].replace("/", "");
  const state = params.get(`${prefix}-state`);
  const dialog = params.get(`${prefix}-dialog`);
  const notice = params.get(`${prefix}-notice`);
  const update = params.get(`${prefix}-update`);
  if (dialog) {
    if (module === "Leads") return stateLabels[dialog] || dialog;
    return dialog === "new" ? `Add ${module === "Blog / Resources" ? "Blog Post" : module.slice(0, -1)}` : dialog[0].toUpperCase() + dialog.slice(1);
  }
  if (notice === "updated") return "Updated Successfully";
  if (update === "error") return "Update Error";
  if (state === "list") return module;
  if (state === "add" && module === "Case Studies") return "Create Case Study";
  if (state === "edit" && module === "Case Studies") return "Edit Case Study";
  if (state === "add" && module === "Blog / Resources") return "Create New Blog";
  if (state === "edit" && module === "Blog / Resources") return "Edit Blog";
  if (state === "detail" && module === "Blog / Resources") return "Blog Details";
  if (state === "detail" && module === "Industries") return "Real Estate & Property Tech";
  if (state === "detail" && module === "Case Studies") return "Case Study Details";
  if (state) return stateLabels[state] || state[0].toUpperCase() + state.slice(1).replaceAll("-", " ");
  return module;
};
