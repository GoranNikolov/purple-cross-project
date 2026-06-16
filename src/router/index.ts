import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

const baseRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "dashboard",
    component: () => import("@/views/dashboard/DashboardView.vue"),
    meta: { title: "Dashboard", icon: "LayoutDashboard" },
  },
  {
    path: "/employees",
    name: "employees",
    component: () => import("@/views/EmployeesView.vue"),
    meta: { title: "Employees", icon: "Table" },
  },
  {
    path: "/import-export",
    name: "import-export",
    component: () => import("@/views/ImportExportView.vue"),
    meta: { title: "Import / Export", icon: "ArrowDownUp" },
  },
];

const devRoutes: RouteRecordRaw[] = [
  {
    path: "/playground",
    name: "playground",
    component: () => import("@/views/playground/PlaygroundLayout.vue"),
    meta: { title: "Playground", icon: "FlaskConical" },
    redirect: { name: "playground-buttons" },
    children: [
      {
        path: "buttons",
        name: "playground-buttons",
        component: () => import("@/views/playground/ButtonsPlayground.vue"),
        meta: { title: "Buttons" },
      },
      {
        path: "grid",
        name: "playground-grid",
        component: () => import("@/views/playground/GridPlayground.vue"),
        meta: { title: "Grid" },
      },
      {
        path: "inputs",
        name: "playground-inputs",
        component: () => import("@/views/playground/InputsPlayground.vue"),
        meta: { title: "Inputs" },
      },
      {
        path: "forms",
        name: "playground-forms",
        component: () => import("@/views/playground/FormsPlayground.vue"),
        meta: { title: "Forms" },
      },
    ],
  },
];

const routes = import.meta.env.DEV ? [...baseRoutes, ...devRoutes] : baseRoutes;

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
