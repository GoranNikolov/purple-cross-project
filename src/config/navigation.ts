import { router } from "@/router";

export interface NavItem {
  name: string;
  label: string;
  icon: string;
}

export function getNavItems(): NavItem[] {
  return router.options.routes
    .filter(
      (r) =>
        r.meta?.title &&
        r.meta?.icon &&
        r.name !== "settings" &&
        r.name !== "not-found",
    )
    .map((r) => ({
      name: r.name as string,
      label: r.meta!.title as string,
      icon: r.meta!.icon as string,
    }));
}
