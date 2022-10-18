<template>
  <div id="app" :class="lightMode ? 'light' : 'dark bg-veryDarkGray'">
    <authenticator>
      <template v-slot="{ user }" v-if="boards != null && Object.keys(boards).length > 0">
        <HeaderMain :user="user" :boards="this.boards">
          <NavSidebar :boards="this.boards" />
        </HeaderMain>
        <TasksList :user="user" :boards="this.boards" />
      </template>
    </authenticator>
  </div>
</template>

<script>
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";
import { API } from "aws-amplify";
import HeaderMain from "./common/header-main.vue";
import NavSidebar from "./common/nav-sidebar.vue";
import TasksList from "./common/task-list.vue";
import store from "./store/store.js";

Amplify.configure(awsconfig);
export default {
  name: "app",
  components: {
    HeaderMain,
    NavSidebar,
    TasksList,
    Authenticator,
  },
  data() {
    return {
      user: {},
      lastTodoId: "",
      boards: {},
    };
  },
  mounted() {
    this.getAll();
  },
  methods: {
    getAll() {
      API.get("tasksApi", `/tasks`, {})
        .then((result) => {
          this.boards = JSON.parse(result.body);
        })
        .catch((err) => {
          console.log(err);
        });
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
