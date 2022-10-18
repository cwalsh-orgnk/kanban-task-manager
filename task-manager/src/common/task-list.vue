<template>
  <div class="bg-lightGray" :class="[sidebarOpen ? activeClass : hiddenClass]">
    <div
      v-for="board in filteredTasksList"
      v-bind:key="board.name"
      class="column-container flex p-6 mt-24 h-[100vh] overflow-y-scroll"
    >
      <div
        v-for="(column, index) in board.columns"
        v-bind:key="column.name"
        class="column mt-6 w-[280px] min-w-[280px]"
      >
        <h3 class="font-bold flex text-xs tracking-widest mb-6 text-mediumGray">
          <i
            class="icon w-[15px] h-[15px] min-w-[15px] mr-3 bg-mainPurple rounded-full"
            :style="{ backgroundColor: columnColors(index) }"
          ></i>
          {{ column.name }}
        </h3>
        <TaskCard
          v-for="task in filteredTaskList(column.name, board.name)"
          :key="task.title"
          :task="task"
          :boards="boards[0]"
          :filteredTasksList="filteredTasksList"
          class="task py-6 px-4 flex flex-col justify-center items-start text-left bg-white mb-5 rounded-lg w-full max-w-[calc(100%-1rem)] shadow"
        ></TaskCard>
      </div>
      <button
        class="new-task w-[280px] min-w-[280px] rounded-md flex text-xl font-bold items-center justify-center text-mediumGray mt-16 h-[calc(100vh-8rem)]"
      >
        + New Column
      </button>
    </div>
  </div>
</template>

<script>
import store from "../store/store.js";
import TaskCard from "./task-card.vue";

export default {
  name: "TasksList",
  components: {
    TaskCard,
  },
  props: {
    boards: Object,
  },
  data() {
    return {
      activeClass: "list-container sidebar-active relative left-[300px] max-w-[calc(100%-300px)]",
      hiddenClass: "list-container sidebar-hidden left-0",
    };
  },
  computed: {
    filteredTasksList() {
      const filteredTasks = this.boards[0].boards.filter((board) =>
        board.name.includes(this.activeBoard)
      );
      return filteredTasks;
    },
  },
  methods: {
    columnColors(index) {
      const columnColors = ["#49C4E5", "#8471F2", "#67E2AE"];
      if (index < columnColors.length) {
        return columnColors[index];
      } else {
        const red = Math.floor(((1 + Math.random()) * 256) / 2);
        const green = Math.floor(((1 + Math.random()) * 256) / 2);
        const blue = Math.floor(((1 + Math.random()) * 256) / 2);
        return "rgb(" + red + ", " + green + ", " + blue + ")";
      }
    },
    filteredTaskList(status, board) {
      const currentBoardTasks = this.boards[0].tasks.filter(
        (task) => task.status === status && task.board === board
      );
      return currentBoardTasks;
    },
    calculateCompletedTasks(tasks) {
      let counter = 0;
      tasks.subtasks.forEach((element) => {
        if (element.isCompleted === true) {
          counter++;
        }
      });
      return `${counter} of ${tasks.subtasks.length} subtasks`;
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

<style scoped>
.list-container {
  transition: left ease-in-out 0.3s;
}
.column-container {
  display: flex;
  width: 100%;
  justify-self: flex-end;
}
.new-task {
  background: linear-gradient(180deg, #e9effa 0%, rgba(233, 239, 250, 0.5) 100%);
}
/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}
</style>
