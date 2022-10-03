<template>
  <div class="app-wrapper">
    <HeaderMain />
    <TasksList />
  </div>
</template>

<script>
import HeaderMain from "./common/header-main.vue";
import TasksList from "./common/task-list.vue";

export default {
  name: "App",
  components: {
    HeaderMain,
    TasksList,
  },
};
</script>

<style>
#app {
  max-height: 100vh;
  overflow: scroll;
  height: 100vh;
}
body {
  background-color: #f4f7fd;
  margin: 0;
  transition: margin ease-in-out 0.3s;
}
.sidebar-open {
  width: calc(100% - 300px);
}
</style>
