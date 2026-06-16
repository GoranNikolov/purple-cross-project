import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { router } from "./router";
import "./assets/main.css";
import "@/plugins/fontawesome";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { initTheme } from "@/bootstrap/initTheme.ts";
import { initEmployees } from "./bootstrap/initEmployees.ts";

const app = createApp(App);

// Start Register globally
app.component("FontAwesomeIcon", FontAwesomeIcon);
// End Register globally

app.use(createPinia());
app.use(router);

initTheme();
initEmployees();

app.mount("#app");
