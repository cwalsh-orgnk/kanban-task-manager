<template>
  <div id="app" :class="lightMode ? 'light' : 'dark bg-veryDarkGray'">
    <authenticator>
      <template v-slot="{ user }" v-if="allTasks != null && Object.keys(allTasks).length">
        <AppWrap :user="user"> </AppWrap>
      </template>
    </authenticator>
  </div>
</template>

<script>
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";
import AppWrap from "./common/app-wrap.vue";
import store from "./store/store.js";

Amplify.configure(awsconfig);
export default {
  name: "app",
  components: {
    Authenticator,
    AppWrap,
  },
  data() {
    return {
      user: {},
      lastTodoId: "",
    };
  },
  computed: {
    taskManagerAvailable() {
      if (this.allTasks != null && Object.keys(this.allTasks).length) {
        return true;
      } else {
        return false;
      }
    },
  },
  setup() {
    const { state } = store();

    return {
      ...state,
    };
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
