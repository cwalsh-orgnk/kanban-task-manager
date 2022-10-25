<template>
  <div
    class="bg-lightGray transition-all dark:bg-veryDarkGray"
    :class="[sidebarOpen ? activeClass : hiddenClass]"
  >
    <div class="column-container flex p-6 mt-24 h-[100vh] overflow-y-scroll">
      <div
        v-for="(column, index) in this.currentBoard[0].columns"
        v-bind:key="column.name"
        class="column mt-6 w-[280px] min-w-[280px]"
      >
        <h2 class="font-bold flex text-xs tracking-widest mb-6 text-mediumGray uppercase">
          <i
            class="icon w-[15px] h-[15px] min-w-[15px] mr-3 bg-mainPurple rounded-full"
            :style="{ backgroundColor: columnColors(index) }"
          ></i>
          {{ column.name }} {{ taskCount(column) }}
        </h2>
        <TaskCard
          v-for="task in column.tasks"
          :key="task.title"
          :status="column.name"
          :task="task"
        ></TaskCard>
      </div>
      <button
        class="new-task w-[280px] min-w-[280px] rounded-md flex text-xl font-bold items-center justify-center text-mediumGray mt-16 h-[calc(100vh-8rem)] transition-colors hover:text-mainPurple"
        @click="showEditModalVisible"
      >
        + New Column
      </button>
    </div>
    <transition class="slide-fade">
      <EditBoard v-if="isEditBoardModalVisible" @close="closeEditModal"></EditBoard>
    </transition>
  </div>
</template>

<script>
import store from "../store/store.js";
import TaskCard from "./task-card.vue";
import EditBoard from "./modals/modal-edit-board.vue";

export default {
  name: "TasksList",
  components: {
    TaskCard,
    EditBoard,
  },
  data() {
    return {
      activeClass:
        "list-container sidebar-active relative sm:left-[300px] sm:max-w-[calc(100%-300px)]",
      hiddenClass: "list-container sidebar-hidden left-0",
      isEditBoardModalVisible: false,
    };
  },
  computed: {},
  methods: {
    taskCount(column) {
      if (column.tasks) {
        return "(" + column.tasks.length + ")";
      } else {
        return "(0)";
      }
    },
    showEditModalVisible() {
      this.isEditBoardModalVisible = true;
    },
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
    editModal() {
      this.isEditBoardModalVisible = true;
    },
    closeEditModal() {
      this.isEditBoardModalVisible = false;
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
.list-container {
  transition: left ease-in-out 0.3s, background-color ease-in-out 0.3s;
}
.column-container {
  display: flex;
  width: 100%;
  justify-self: flex-end;
}
.new-task {
  background: linear-gradient(180deg, #e9effa 0%, rgba(233, 239, 250, 0.5) 100%);
}

.dark {
  .new-task {
    background: linear-gradient(180deg, rgba(43, 44, 55, 0.25) 0%, rgba(43, 44, 55, 0.125) 100%);
  }
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
