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
        <h3 class="title text-lg font-bold text-black dark:text-white">Edit Board</h3>
      </header>
      <div class="input-group flex flex-col mb-6">
        <label for="name" class="text-xs text-mediumGray font-bold mb-2 dark:text-white"
          >Name</label
        >
        <span class="text-red text-sm mb-1" v-if="errors.title">{{ errors.title }}</span>
        <TextInput
          :name="'name'"
          v-bind:value="newBoard.name"
          v-on:input="newBoard.name = $event"
        />
      </div>
      <div class="input-group flex flex-col">
        <label for="column" class="text-xs text-mediumGray font-bold mb-2 dark:text-white"
          >Edit Columns</label
        >
        <div
          class="input-wrap flex mb-3 items-center"
          v-for="(column, index) in newBoard.columns"
          v-bind:key="index"
        >
          <TextInput
            :name="'column[' + index + ']'"
            :inputClass="'mr-4'"
            v-bind:value="column.name"
            v-on:input="column.name = $event"
          />
          <RemoveButton @click="newBoard.columns.splice(index, 1)" />
        </div>
      </div>
      <BaseButton
        :buttonText="'+ Add New Column'"
        :class="'w-full text-mainPurple bg-mainPurple bg-opacity-10 mb-6 transition-colors hover:bg-opacity-25 dark:bg-white dark:hover:bg-mainPurpleHover dark:hover:text-white dark:text-mainPurple'"
        @click="addColumn"
      />
      <BaseButton
        :buttonText="'Save Changes'"
        :class="'w-full text-white hover:bg-mainPurpleHover'"
        @click="saveBoard"
      />
    </article>
  </div>
</template>
<script>
import BaseButton from "../buttons/base-button.vue";
import TextInput from "../form/text-input.vue";
import RemoveButton from "../buttons/remove-button.vue";
import store from "../../store/store.js";
import TaskDataService from "../../service/api.js";

export default {
  name: "EditBoard",
  components: {
    TextInput,
    RemoveButton,
    BaseButton,
  },
  props: {
    taskManager: Object,
  },
  data() {
    return {
      newBoard: {
        id: this.currentBoard[0].id,
        name: this.currentBoard[0].name,
        columns: this.currentBoard[0].columns,
      },
      errors: {
        title: "",
      },
    };
  },
  methods: {
    validateBoard(name) {
      let formValidated = true;

      if (name == null || name === undefined || !name) {
        this.errors.title = "Please enter a name";
        formValidated = false;
      } else {
        this.errors.title = null;
      }
      return formValidated;
    },
    addColumn() {
      const column = {
        placeholder: "e.g. Todo/Doing/Done etc",
        value: null,
      };
      if (this.newBoard.columns) {
        this.newBoard.columns.push(column);
      } else {
        this.newBoard.columns = [
          {
            placeholder: "e.g. Todo/Doing/Done etc",
            value: null,
          },
        ];
      }
    },
    saveBoard() {
      const columnList = [];
      this.newBoard.columns.forEach((element) => {
        if (element != null) {
          let newColumn = {
            name: element.name,
          };
          columnList.push(newColumn);
        }
      });
      if (!this.validateBoard(this.newBoard.name)) {
        return;
      }
      let board = {
        id: this.newBoard.id,
        name: this.newBoard.name,
        columns: columnList.length ? columnList : null,
      };
      this.allTasks.boards.forEach((element) => {
        if (element.id === board.id) {
          element = board;
          element.name = board.name;
          this.activeBoard.name = board.name;
          element.tasks = "New Task";
          console.log(element.tasks);
        }
      });
      this.allTasks.boards.forEach((element) => {
        if (element.id === board.id) {
          element = board;
          element.name = board.name;
          this.activeBoard.name = board.name;
        }
      });
      this.currentColumns = [];
      if (this.currentBoard[0].columns) {
        this.currentBoard[0].columns.forEach((element) => {
          this.currentColumns.push(element.name);
        });
      }
      this.currentBoard[0].name == board.name;
      TaskDataService.update(this.allTasks.boards);
      this.$emit("close");
    },
    close() {
      this.$emit("close");
    },
    deleteTask() {
      return false;
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
