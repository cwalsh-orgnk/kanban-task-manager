<template>
  <div
    class="modal-backdrop fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
    @click="close"
  >
    <div
      class="modal bg-white flex flex-col shadow-sm max-w-lg w-full p-8 m-8 text-left"
      @click.stop
    >
      <header class="modal-header relative mb-6">
        <h3 class="title text-lg font-bold text-black">Add New Task</h3>
      </header>
      <div class="input-group flex flex-col mb-6">
        <TextInput
          :label="'Title'"
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
        <label for="subtask" class="text-xs text-mediumGray font-bold mb-2">Subtasks</label>
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
          <RemoveButton @click="defaultSubtasks.splice(index, 1)" />
        </div>
      </div>
      <BaseButton
        :buttonText="'+ Add New Subtask'"
        :class="'w-full text-mainPurple bg-mainPurple bg-opacity-10'"
        @click="addSubtask"
      />
      <h5 class="text-xs text-mediumGray font-bold mt-6 mb-2">Status</h5>
      <div class="select-wrapper mb-6">
        <SelectInput
          @change="selected(task, $event)"
          :options="filteredStatusList"
          :name="'status'"
        />
      </div>
      <BaseButton :buttonText="'Save Changes'" :class="'w-full'" @click="saveTask" />
    </div>
  </div>
</template>
<script>
import BaseButton from "../base-button.vue";
import TextInput from "../form/text-input.vue";
import TextArea from "../form/textarea-input.vue";
import SelectInput from "../form/select-input.vue";
import RemoveButton from "../buttons/remove-button.vue";
import store from "../../store/store.js";
import { API } from "aws-amplify";
import { Amplify } from "aws-amplify";
import awsconfig from "../../aws-exports";
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
    filteredTasksList: Array,
    boards: Object,
  },
  data() {
    return {
      isCompleted: "text-mediumGray line-through",
      notCompleted: "",
      showOptions: false,
      showEditTask: false,
      subtasks: [],
      newTask: {
        title: "",
        description: "",
        subtasks: [],
        status: "",
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
  computed: {
    filteredStatusList() {
      const availableStatus = [];
      this.filteredTasksList[0].columns.forEach((element) => {
        availableStatus.push(element.name);
      });
      return availableStatus;
    },
  },
  methods: {
    addSubtask() {
      const subtask = {
        placeholder: "e.g. Make a pot of coffee",
        value: null,
      };
      this.defaultSubtasks.push(subtask);
    },
    saveTask() {
      let subtasks = [];
      this.defaultSubtasks.forEach((element) => {
        if (element.value != null) {
          let subtask = {
            title: element.value,
            isCompleted: false,
          };
          subtasks.push(subtask);
        }
      });
      var task = {
        title: this.newTask.title,
        description: this.newTask.description,
        subtasks: subtasks.length ? subtasks : null,
        status: "Todo",
        board: this.activeBoard,
      };
      this.addTaskUI(this.boards.tasks, task);
      this.addTaskDB(this.boards.id);
    },
    addTaskUI(taskList, task) {
      taskList.push(task);
    },
    addTaskDB(id) {
      console.log(`addTaskDB`);
      API.post("tasksApi", `/tasks`, {
        body: {
          id: id,
          boards: this.boards.boards,
          tasks: this.boards.tasks,
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
    selected(task, event) {
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
<style lang="scss">
@import "../../assets/base.scss";
</style>
