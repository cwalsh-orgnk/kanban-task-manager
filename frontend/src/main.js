import { createApp } from "vue";
import App from "./App.vue";
import store from "./store/store";
import "./assets/tailwind.css";
import ClickOutside from "./click-outside";

createApp(App)
  .directive("click-outside", ClickOutside)
  .use(store)
  .mount("#app");
