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
        <h3 class="title text-lg font-bold text-black dark:text-white">Add New Task</h3>
      </header>
      <div class="input-group flex flex-col mb-6">
        <label for="title" class="text-xs text-mediumGray font-bold mb-2 dark:text-white"
          >Title</label
        >
        <span class="text-red text-sm mb-1" v-if="errors.title">{{ errors.title }}</span>
        <TextInput
          :name="'title'"
          v-bind:value="newTask.title"
          v-on:input="newTask.title = $event"
        />
      </div>
      <div class="input-group flex flex-col mb-6">
        <TextArea
          :name="'description'"
          :label="'Description'"
          :placeholder="'e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little.'"
          v-bind:value="newTask.description"
          v-on:input="newTask.description = $event"
        />
      </div>
      <div class="input-group flex flex-col">
        <label for="subtask" class="text-xs text-mediumGray font-bold mb-2 dark:text-white"
          >Subtasks</label
        >
        <span class="text-red text-sm mb-1" v-if="errors.subtask">{{ errors.subtask }}</span>
        <div
          class="input-wrap flex mb-3 items-center"
          v-for="(subtask, index) in defaultSubtasks"
          v-bind:key="index"
        >
          <TextInput
            :name="'subtask[' + index + ']'"
            :inputClass="'mr-4'"
            :placeholder="subtask.placeholder"
            v-bind:value="subtask.value"
            v-on:input="subtask.value = $event"
          />
          <RemoveButton
            v-if="defaultSubtasks.length > 1"
            @click="removeSubtask(defaultSubtasks, index)"
          />
        </div>
      </div>
      <BaseButton
        :buttonText="'+ Add New Subtask'"
        :class="'w-full text-mainPurple bg-mainPurple bg-opacity-10 transition-colors hover:bg-opacity-25 dark:bg-white dark:text-mainPurple'"
        @click="addSubtask"
      />
      <h5 class="text-xs text-mediumGray font-bold mt-6 mb-2 dark:text-white">Status</h5>
      <div class="select-wrapper mb-6">
        <SelectInput @change="selected($event)" :options="this.currentColumns" :name="'status'" />
      </div>
      <BaseButton
        :buttonText="'Save Changes'"
        :class="'w-full text-white transition-colors hover:bg-mainPurpleHover'"
        @click="saveTask"
      />
    </div>
  </div>
</template>
<script>
import BaseButton from "../buttons/base-button.vue";
import TextInput from "../form/text-input.vue";
import TextArea from "../form/textarea-input.vue";
import SelectInput from "../form/select-input.vue";
import RemoveButton from "../buttons/remove-button.vue";
import store from "../../store/store.js";
import { API } from "aws-amplify";
import { Amplify } from "aws-amplify";
import awsconfig from "../../aws-exports";
var uuid = require("uuid");

Amplify.configure(awsconfig);

export default {
  name: "TaskAddNew",
  components: {
    TextInput,
    TextArea,
    SelectInput,
    RemoveButton,
    BaseButton,
  },
  emits: {
    taskUpdated: false,
    editModal: false,
  },
  props: {
    completedTasks: String,
    currentStatusList: Array,
    taskManager: Object,
  },
  data() {
    return {
      isCompleted: "text-mediumGray line-through",
      notCompleted: "",
      showOptions: false,
      showEditTask: false,
      subtasks: [],
      errors: {
        title: "",
        subtask: "",
      },
      newTask: {
        id: uuid.v4(),
        title: "",
        description: "",
        subtasks: [],
        status: this.currentColumns[0],
      },
      defaultSubtasks: [
        {
          placeholder: "e.g. Make a pot of coffee",
          value: null,
        },
        {
          placeholder: "e.g. Make a pot of coffee",
          value: null,
        },
      ],
    };
  },
  methods: {
    addSubtask() {
      const subtask = {
        placeholder: "e.g. Make a pot of coffee",
        value: null,
      };
      this.defaultSubtasks.push(subtask);
    },
    removeSubtask(defaultSubtasks, index) {
      if (defaultSubtasks.length > 1) {
        defaultSubtasks.splice(index, 1);
      }
    },
    validateTask(title, subtask) {
      let formValidated = true;

      if (title == null || title === undefined || !title) {
        this.errors.title = "Please enter a title";
        formValidated = false;
      } else {
        this.errors.title = null;
      }
      if (subtask.length === 0) {
        this.errors.subtask = "Please enter at least one subtask";
        formValidated = false;
      } else {
        this.errors.subtask = null;
      }
      return formValidated;
    },
    saveTask() {
      let subtasks = [];
      this.defaultSubtasks.forEach((element) => {
        if (element.value) {
          let subtask = {
            title: element.value,
            isCompleted: false,
          };
          console.log(element.value);
          subtasks.push(subtask);
        }
      });
      if (!this.validateTask(this.newTask.title, subtasks)) {
        return;
      }
      var task = {
        id: this.newTask.id,
        title: this.newTask.title,
        description: this.newTask.description,
        subtasks: subtasks.length ? subtasks : null,
        status: this.newTask.status ? this.newTask.status : this.currentColumns[0],
        board: this.activeBoard.id,
      };
      this.addTaskUI(this.allTasks.boards, task);
      this.addTaskDB(this.allTasks.id);
      this.newTask = {
        id: uuid.v4(),
        title: "",
        description: "",
        subtasks: [],
        status: this.currentColumns[0],
      };
      this.defaultSubtasks = [
        {
          placeholder: "e.g. Make a pot of coffee",
          value: null,
        },
        {
          placeholder: "e.g. Make a pot of coffee",
          value: null,
        },
      ];
    },
    addTaskUI(boardList, task) {
      boardList.forEach((board) => {
        if (board.id === this.activeBoard.id) {
          board.columns.forEach((column) => {
            if (column.name === task.status) {
              if ("tasks" in column) {
                column.tasks.push(task);
              } else {
                (column ??= {}).tasks ??= [task];
              }
            }
          });
        }
      });
    },
    addTaskDB(id) {
      console.log(`addTaskDB`);
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
    initNewTask() {
      this.submitted = false;
      this.task = {};
    },
    close() {
      this.$emit("close");
    },
    options() {
      this.showOptions = !this.showOptions;
    },
    edit() {
      this.showOptions = false;
      this.$emit("edit");
    },
    deleteTask() {
      return false;
    },
    check(subtask) {
      subtask.isCompleted = !subtask.isCompleted;
    },
    selected(event) {
      this.newTask.status = event.target.value;
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
