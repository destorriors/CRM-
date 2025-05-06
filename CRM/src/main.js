import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router/router.js";
import VFocus from "./directives/VFocus.js";

import App from "./App.vue";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.directive(VFocus.name, VFocus);

app.mount("#app");
