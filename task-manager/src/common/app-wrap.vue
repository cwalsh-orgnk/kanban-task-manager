<template>
  <HeaderMain :user="user">
    <NavSidebar />
  </HeaderMain>
  <TasksList :user="user" :currentColumnsList="this.currentColumnsList" />
</template>

<script>
import "@aws-amplify/ui-vue/styles.css";
import HeaderMain from "../common/header-main.vue";
import NavSidebar from "../common/nav-sidebar.vue";
import TasksList from "../common/task-list.vue";
import store from "../store/store.js";
export default {
  name: "app",
  components: {
    HeaderMain,
    NavSidebar,
    TasksList,
  },
  data() {
    return {
      user: {},
      lastTodoId: "",
      taskManager: {},
    };
  },
  mounted() {
    this.setCurrentBoards();
    this.currentColumnsList();
  },
  methods: {
    setCurrentBoards() {
      if (this.allTasks != null && Object.keys(this.allTasks).length) {
        this.currentBoard = this.allTasks.boards.filter((board) =>
          board.name.includes(this.activeBoard)
        );
      }
    },
    currentColumnsList() {
      if (this.allTasks != null && Object.keys(this.allTasks).length) {
        if (this.currentBoard.length > 0) {
          this.currentBoard[0].columns.forEach((element) => {
            this.currentColumns.push(element.name);
          });
        }
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
