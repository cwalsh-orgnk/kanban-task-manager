<template>
  <div id="app">
    <authenticator>
      <template v-slot="{ user, signOut }">
        <h1>Hello {{ user.username }}!</h1>
        <button @click="signOut">Sign Out</button>
      </template>
    </authenticator>
  </div>
</template>

<script>
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";
import { API } from 'aws-amplify';

Amplify.configure(awsconfig);
export default {
  name: "app",
  data() {
    return {
      user: {},
      lastTodoId: "",
    };
  },
  components: {
    Authenticator,
  },
  methods: {
    getTodos: function () {
      console.log("getTodos");
      API.get("todosApi", `/todos`, {})
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getTodo: function () {
      const id = this.lastTodoId;
      if (!id) return;
      console.log(`getTodo-${id}`);
    },
    addTodo: function () {
      console.log(`addTodo`);
      API.post("todosApi", `/todos`, {
        body: {
          text: "todo1",
        },
      })
        .then((result) => {
          console.log(result);
          this.lastTodoId = JSON.parse(result.body).id;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateTodo: function () {
      const id = this.lastTodoId;
      if (!id) return;
      console.log(`updateTodo-${id}`);
      API.put("todosApi", `/todos`, {
        body: {
          id: id,
          text: "todo2",
          complete: true,
        },
      })
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteTodo: function () {
      const id = this.lastTodoId;
      if (!id) return;
      console.log(`deleteTodo-${id}`);
      API.del("todosApi", `/todos/${id}`, {})
        .then((result) => {
          console.log(result);
          this.lastTodoId = "";
        })
        .catch((err) => {
          console.log(err);
        });
    },
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
