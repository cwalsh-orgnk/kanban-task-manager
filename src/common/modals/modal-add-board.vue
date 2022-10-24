<template>
  <div
    class="modal-backdrop fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
    @click="close"
  >
    <div
      class="modal max-h-[calc(100vh-100px)] overflow-y-scroll overflow-x-hidden sm:overflow-auto sm:max-h-full bg-white flex flex-col shadow-sm max-w-lg w-full p-8 m-8 text-left dark:bg-darkGray"
      @click.stop
    >
      <header class="modal-header relative mb-6">
        <h3 class="title text-lg font-bold text-black dark:text-white">Add New Board</h3>
      </header>
      <div class="input-group flex flex-col mb-6">
        <TextInput
          :label="'Name'"
          :name="'name'"
          v-bind:value="newBoard.name"
          v-on:input="newBoard.name = $event"
        />
      </div>
      <div class="input-group flex flex-col">
        <label for="column" class="text-xs text-mediumGray font-bold mb-2 dark:text-white"
          >Columns</label
        >
        <div
          class="input-wrap flex mb-3 items-center"
          v-for="(column, index) in defaultColumns"
          v-bind:key="index"
        >
          <TextInput
            :name="'column[' + index + ']'"
            :inputClass="'mr-4'"
            :placeholder="column.placeholder"
            v-bind:value="column.value"
            v-on:input="column.value = $event"
          />
          <RemoveButton @click="defaultColumns.splice(index, 1)" />
        </div>
      </div>
      <BaseButton
        :buttonText="'+ Add New Column'"
        :class="'w-full bg-mainPurple bg-opacity-10 mb-6 text-mainPurple dark:bg-white dark:text-mainPurple'"
        @click="addColumn"
      />
      <BaseButton
        :buttonText="'Create New board'"
        :class="'w-full text-white'"
        @click="saveBoard"
      />
    </div>
  </div>
</template>
<script>
import BaseButton from "../buttons/base-button.vue";
import TextInput from "../form/text-input.vue";
import RemoveButton from "../buttons/remove-button.vue";
import store from "../../store/store.js";
import { API } from "aws-amplify";
import { Amplify } from "aws-amplify";
import awsconfig from "../../aws-exports";
var uuid = require("uuid");
Amplify.configure(awsconfig);
export default {
  name: "AddBoard",
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
      columns: [],
      defaultColumns: [
        {
          placeholder: "Todo",
          value: "Todo",
        },
        {
          placeholder: "Doing",
          value: "Doing",
        },
      ],
      newBoard: {
        id: uuid.v4(),
        name: "",
        columns: [],
      },
    };
  },
  methods: {
    addColumn() {
      const column = {
        placeholder: "e.g. Todo/Doing/Done etc",
        value: null,
      };
      this.defaultColumns.push(column);
    },
    saveBoard() {
      let columns = [];
      this.defaultColumns.forEach((element) => {
        if (element.value != null) {
          let column = {
            name: element.value,
          };
          columns.push(column);
        }
      });
      var board = {
        id: this.newBoard.id,
        name: this.newBoard.name,
        columns: columns.length ? columns : null,
      };
      this.addTaskUI(this.allTasks.boards, board);
      this.addTaskDB(this.allTasks.id);
    },
    addTaskUI(boardList, board) {
      boardList.push(board);
    },
    addTaskDB(id) {
      console.log(`addBoardDB`);
      API.post("tasksApi", `/tasks`, {
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
<style lang="scss">
@import "../../assets/base.scss";
</style>
