<template>
  <div
    class="modal-backdrop fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
    @click="close"
  >
    <article
      class="modal max-h-[calc(100vh-100px)] overflow-y-scroll overflow-x-hidden sm:overflow-hidden sm:max-h-full bg-white flex flex-col shadow-sm max-w-lg w-full p-8 m-8 text-left dark:bg-darkGray"
      @click.stop
    >
      <header class="modal-header relative mb-6">
        <h3 class="title text-lg font-bold mb-6 text-red dark:text-red">Delete this task?</h3>
        <p class="text-mediumGray dark:text-white">
          Are you sure you want to delete the "{{ task.title }}" task? This action will remove all
          columns and tasks and cannot be reversed.
        </p>
      </header>
      <div class="actions flex">
        <BaseButton
          :buttonText="'Delete'"
          :class="'w-[50%] bg-red text-white transition-colors hover:bg-redHover'"
          @click="removeTask(task)"
        />
        <BaseButton
          :buttonText="'Cancel'"
          :class="'w-[50%] bg-mainPurple bg-opacity-10 text-mainPurple transition-colors hover:bg-opacity-25'"
          @click="close"
        />
      </div>
    </article>
  </div>
</template>
<script>
import BaseButton from "../buttons/base-button.vue";
import store from "../../store/store.js";
import TaskDataService from "../../service/api.js";

export default {
  name: "TaskDelete",
  components: {
    BaseButton,
  },
  emits: {
    boardUpdated: false,
  },
  props: {
    task: Object,
  },
  data() {
    return {
      isCompleted: "text-mediumGray line-through",
    };
  },
  methods: {
    removeTask(currentTask) {
      this.allTasks.boards.forEach((board) => {
        if (board.id === this.activeBoard.id) {
          board.columns.forEach((column) => {
            if (column.name === currentTask.status) {
              if (column.tasks && column.tasks.length > 0) {
                column.tasks.forEach((task, index, object) => {
                  if (task.id === currentTask.id) {
                    object.splice(index, 1);
                  }
                });
              }
            }
          });
        }
      });
      this.activeBoard = {
        id: this.allTasks.boards[0].id,
        name: this.allTasks.boards[0].name,
      };
      TaskDataService.update(this.allTasks.boards);
      this.$emit("close");
    },
    addTaskUI() {
      this.currentBoard[0] = this.newBoard;
    },
    close() {
      this.$emit("close");
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
<style lang="scss"></style>
