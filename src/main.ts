import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { router } from "./router";
import "./assets/main.css";
import { useThemeStore } from "@/stores/theme";
import "./plugins/fontawesome";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const app = createApp(App);

// Start Register globally
app.component("FontAwesomeIcon", FontAwesomeIcon);
// End Register globally

app.use(createPinia());
app.use(router);

const themeStore = useThemeStore();
themeStore.init();

app.mount("#app");
