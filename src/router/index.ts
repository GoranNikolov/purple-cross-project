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
    meta: { title: "Dashboard", icon: "chart-pie" },
  },
  {
    path: "/employees",
    name: "employees",
    component: () => import("@/views/EmployeesView.vue"),
    meta: { title: "Employees", icon: "users" },
  },
  {
    path: "/import-export",
    name: "import-export",
    component: () => import("@/views/data-exchange/ImportExportView.vue"),
    meta: { title: "Import / Export", icon: "right-left" },
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import("@/views/SettingsView.vue"),
    meta: { title: "Settings", icon: "gear" },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
    meta: { layout: "none" },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("@/views/NotFoundView.vue"),
    meta: { title: "Page Not Found" },
  },
];

const devRoutes: RouteRecordRaw[] = [
  {
    path: "/playground",
    name: "playground",
    component: () => import("@/views/playground/PlaygroundLayout.vue"),
    meta: { title: "Playground", icon: "flask" },
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

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach((to) => {
  const baseTitle = "Purple Cross";
  document.title = to.meta?.title
    ? `${to.meta.title} | ${baseTitle}`
    : baseTitle;
});

export { router };
