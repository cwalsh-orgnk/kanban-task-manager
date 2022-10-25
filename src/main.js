import { createApp } from "vue";
import App from "./App.vue";
import "@aws-amplify/ui-vue";
import ClickOutside from "./click-outside";
import store from "./store/store";
import "./assets/tailwind.css";
createApp(App).directive("click-outside", ClickOutside).use(store).mount("#app");
