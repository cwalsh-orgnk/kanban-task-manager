<template>
  <div
    class="modal-backdrop fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
    @click="close"
  >
    <div
      class="modal max-h-[calc(100vh-100px)] overflow-y-scroll overflow-x-hidden sm:overflow-hidden sm:max-h-full bg-white flex flex-col shadow-sm max-w-lg w-full p-8 m-8 text-left dark:bg-darkGray"
      @click.stop
    >
      <header class="modal-header relative mb-6">
        <h3 class="title text-lg font-bold mb-6 text-red dark:text-red">Delete this board?</h3>
        <p class="text-mediumGray dark:text-white">
          Are you sure you want to delete the "{{ this.activeBoard.name }}" board? This action will
          remove all columns and tasks and cannot be reversed.
        </p>
      </header>
      <div class="actions flex">
        <BaseButton
          :buttonText="'Delete'"
          :class="'w-[50%] bg-red text-white transition-colors hover:bg-redHover'"
          @click="removeBoard"
        />
        <BaseButton
          :buttonText="'Cancel'"
          :class="'w-[50%] bg-mainPurple bg-opacity-10 text-mainPurple transition-colors hover:bg-opacity-25'"
          @click="close"
        />
      </div>
    </div>
  </div>
</template>
<script>
import BaseButton from "../buttons/base-button.vue";
import store from "../../store/store.js";
import { API } from "aws-amplify";
import { Amplify } from "aws-amplify";
import awsconfig from "../../aws-exports";
Amplify.configure(awsconfig);

export default {
  name: "DeleteBoard",
  components: {
    BaseButton,
  },
  emits: {
    boardUpdated: false,
  },
  props: {
    board: Object,
  },
  data() {
    return {
      isCompleted: "text-mediumGray line-through",
      notCompleted: "",
      showOptions: false,
      showEditTask: false,
    };
  },
  methods: {
    removeBoard() {
      this.allTasks.boards.forEach((element, index, object) => {
        if (element.id === this.activeBoard.id) {
          object.splice(index, 1);
        }
      });
      this.allTasks.tasks.forEach((element, index, object) => {
        if (element.board === this.activeBoard.id) {
          object.splice(index, 1);
        }
      });
      this.activeBoard = {
        id: this.allTasks.boards[0].id,
        name: this.allTasks.boards[0].name,
      };
      this.addTaskDB(this.allTasks.id);
    },
    addTaskUI() {
      this.currentBoard[0] = this.newBoard;
    },
    addTaskDB(id) {
      console.log(`addBoardDB`);
      API.put("tasksApi", `/tasks`, {
        body: {
          id: id,
          boards: this.allTasks.boards,
          tasks: this.allTasks.tasks,
        },
      })
        .then((result) => {
          console.log(result);
          this.close();
        })
        .catch((err) => {
          console.log(err);
        });
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
