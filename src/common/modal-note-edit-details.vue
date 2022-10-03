<template>
  <div
    class="modal-backdrop fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
  >
    <div class="modal bg-white flex flex-col shadow-sm max-w-lg w-full p-8 m-8">
      <header class="modal-header relative mb-6">
        <h3 class="title text-lg font-bold text-black">Edit Task</h3>
      </header>
      <div class="input-group flex flex-col mb-6">
        <label for="title" class="text-xs text-mediumGray font-bold mb-2"
          >Title</label
        >
        <input
          type="text"
          name="title"
          :value="task.title"
          class="w-full border border-linesLight border-opacity-80 py-2 px-4 text-base font-medium text-black rounded"
        />
      </div>
      <div class="input-group flex flex-col mb-6">
        <label for="description" class="text-xs text-mediumGray font-bold mb-2"
          >Description</label
        >
        <textarea
          name="description"
          :value="task.description"
          :placeholder="this.description"
          rows="4"
          class="w-full border border-linesLight border-opacity-80 py-2 px-4 text-base font-medium text-black rounded"
        />
      </div>
      <div class="input-group flex flex-col">
        <label for="subtask" class="text-xs text-mediumGray font-bold mb-2"
          >Subtasks</label
        >

        <div
          class="input-wrap flex mb-3 items-center"
          v-for="subtask in task.subtasks"
          v-bind:key="subtask.title"
        >
          <input
            type="text"
            name="subtask"
            class="w-full border border-linesLight border-opacity-80 py-2 px-4 text-base font-medium text-black rounded mr-4"
            :value="subtask.title"
            :placeholder="subtask.title"
          />
          <button class="text-mediumGray">
            <img src="../assets/icon-cross.svg" />
          </button>
        </div>
      </div>
      <BaseButton
        :buttonText="'+ Add New Subtask'"
        :class="'w-full text-mainPurple bg-mainPurple bg-opacity-10'"
      />
      <h5 class="text-xs text-mediumGray font-bold mt-6 mb-2">
        Current Status
      </h5>
      <div class="select-wrapper mb-6">
        <select
          :id="task.title"
          class="product-filter-select relative w-full border border-linesLight h-[40px] px-4 pr-10"
          @change="selected(task, $event)"
        >
          <option :value="task.status">
            {{ task.status }}
          </option>
          <option
            v-for="status in filteredStatusList"
            v-bind:key="status"
            :value="status"
          >
            {{ status }}
          </option>
        </select>
      </div>
      <BaseButton :buttonText="'Save Changes'" :class="'w-full'" />
    </div>
  </div>
</template>
<script>
import BaseButton from "./base-button.vue";

export default {
  name: "NoteDetails",
  components: {
    BaseButton,
  },
  emits: {
    taskUpdated: false,
    editModal: false,
  },
  props: {
    task: Object,
    completedTasks: String,
    filteredNotesList: Array,
  },
  data() {
    return {
      isCompleted: "text-mediumGray line-through",
      notCompleted: "",
      status: this.task.status,
      showOptions: false,
      showEditTask: false,
      description: this.task.description
        ? this.task.description
        : "e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little.",
    };
  },
  computed: {
    filteredStatusList() {
      const availableStatus = [];
      this.filteredNotesList[0].columns.forEach((element) => {
        if (this.task.status != element.name) {
          availableStatus.push(element.name);
        }
      });
      return availableStatus;
    },
  },
  methods: {
    close() {
      if (this.status === this.task.status) {
        this.$emit("taskUpdated", false);
      } else {
        this.$emit("taskUpdated", true);
      }
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
      task.status = event.target.value;
    },
  },
};
</script>
<style lang="scss">
@import "../assets/base.scss";
</style>
