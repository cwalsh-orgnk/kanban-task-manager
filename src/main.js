import { createApp } from "vue";
import { Amplify } from "aws-amplify";
import App from "./App.vue";
import "@aws-amplify/ui-vue";
import aws_exports from "./aws-exports";
import ClickOutside from "./click-outside";
import store from "./store/store";
import "./assets/tailwind.css";

Amplify.configure(aws_exports);

createApp(App).directive("click-outside", ClickOutside).use(store).mount("#app");
