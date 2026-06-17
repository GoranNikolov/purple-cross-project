import type { RouteRecordRaw } from "vue-router";
import { router } from "@/router";

export interface NavItem {
  name: string;
  label: string;
  icon: string;
}

function isDevRoute(route: RouteRecordRaw): boolean {
  return route.name === "playground";
}

export function getNavItems(): NavItem[] {
  return router.options.routes
    .filter((r) => r.meta?.title && r.name !== "settings")
    .map((r) => ({
      name: r.name as string,
      label: r.meta!.title as string,
      icon: r.meta!.icon as string,
    }));
}
