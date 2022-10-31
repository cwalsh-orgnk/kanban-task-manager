<template>
  <HeaderMain>
    <NavSidebar />
  </HeaderMain>
  <TasksList v-if="this.currentColumns.length > 0" />
  <EmptyColumns v-else />
</template>

<script>
import "@aws-amplify/ui-vue/styles.css";
import HeaderMain from "../common/header-main.vue";
import NavSidebar from "../common/nav-sidebar.vue";
import TasksList from "../common/task-list.vue";
import EmptyColumns from "../common/empty-columns.vue";
import store from "../store/store.js";
export default {
  name: "AppWrap",
  components: {
    HeaderMain,
    NavSidebar,
    TasksList,
    EmptyColumns,
  },
  data() {
    return {
      user: {},
      taskManager: {},
    };
  },
  mounted() {
    this.setCurrentBoards();
    this.currentColumnsList();
    this.setActiveBoard();
  },
  watch: {
    // whenever active changes, this function will run
    activeBoard: function () {
      this.setCurrentBoards();
      this.currentColumnsList();
    },
    // whenever allTasks changes, this function will run
    allTasks: function () {
      this.setCurrentBoards();
      this.currentColumnsList();
    },
  },
  methods: {
    setActiveBoard() {
      this.activeBoard = {
        id: this.allTasks.boards[0].id,
        name: this.allTasks.boards[0].name,
      };
    },
    setCurrentBoards() {
      if (this.allTasks != null && Object.keys(this.allTasks).length) {
        this.currentBoard = this.allTasks.boards.filter((board) =>
          board.name.includes(this.activeBoard.name)
        );
      }
    },
    currentColumnsList() {
      if (this.allTasks != null && Object.keys(this.allTasks).length) {
        if (this.currentBoard.length > 0) {
          this.currentColumns = [];
          if (this.currentBoard[0].columns) {
            this.currentBoard[0].columns.forEach((element) => {
              this.currentColumns.push(element.name);
            });
          }
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
