<template>
  <div :class="[sidebarOpen ? activeClass : hiddenClass]">
    <div
      v-for="board in filteredTasksList"
      v-bind:key="board.name"
      class="column-container flex p-6 mt-24 h-[calc(100vh-8rem)] overflow-y-scroll"
    >
      <div
        v-for="column in board.columns"
        v-bind:key="column.name"
        class="column mt-6 w-[280px] min-w-[280px]"
      >
        <h3 class="font-bold text-xs tracking-widest mb-6 text-mediumGray">
          {{ column.name }}
        </h3>
        <TaskCard
          v-for="task in column.tasks"
          :key="task.title"
          :task="task"
          :filteredTasksList="filteredTasksList"
          @listUpdated="updateList"
          class="task py-6 px-4 flex flex-col justify-center items-start text-left bg-white mb-5 rounded-lg w-full max-w-[calc(100%-1rem)] shadow"
        >
          <h4 class="text-md font-bold textBlack">{{ task.title }}</h4>
          <h5 class="text-xs text-mediumGray font-bold mt-1">
            {{ calculateCompletedTasks(task) }}
          </h5>
        </TaskCard>
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
  data() {
    return {
      activeClass:
        "list-container sidebar-active relative left-[324px] max-w-[calc(100%-324px)]",
      hiddenClass: "list-container sidebar-hidden ml-6 left-0",
    };
  },
  computed: {
    filteredTasksList() {
      const filteredTasks = this.tasks.boards.filter((val) =>
        val.name.includes(this.activeBoard)
      );
      return filteredTasks;
    },
  },
  methods: {
    updateList(task) {
      this.filteredTasksList[0].columns.forEach((element) => {
        element.tasks.forEach((childElement, i, object) => {
          if (childElement.title === task.title) {
            object.splice(i, 1);
          }
        });
      });
      this.filteredTasksList[0].columns.forEach((element, i, object) => {
        console.log(element.name);
        console.log(task.status);
        if (element.name === task.status) {
          console.log(i);
          object[i].tasks.push(task);
          return;
        }
      });
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
  background: linear-gradient(
    180deg,
    #e9effa 0%,
    rgba(233, 239, 250, 0.5) 100%
  );
}
</style>
