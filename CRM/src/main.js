import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router/router.js";
import VFocus from "./directives/VFocus.js";
import App from "./App.vue";
import MyButtonTemplate from "./components/Ui/MyButtonTemplate.vue";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.directive(VFocus.name, VFocus);

app.mount("#app");
app.component("my-button-template", MyButtonTemplate);
