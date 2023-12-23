import "./assets/style.css";
import { createApp } from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";

const app = createApp(App);
app.use(store);
app.use(router);
app.use(Toast);
app.mount("#app");
