<template>
  <div
    class="modal-backdrop fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
  >
    <div class="modal bg-white flex flex-col shadow-sm max-w-md w-full p-8 m-8">
      <button type="button" class="btn-close" @click="close">x</button>
      <header class="modal-header relative flex justify-between">
        <h3 class="title text-lg font-bold text-black">
          {{ task.title }}
        </h3>
        <button type="button" class="btn-close" @click="options">
          <img src="../../assets/icon-vertical-ellipsis.svg" />
        </button>
        <div
          class="tooltip absolute flex flex-col rounded-lg p-4 bottom-0 translate-y-full right-0 bg-white w-[192px] translate-x-1/2"
          v-if="showOptions"
        >
          <button
            class="text-mediumGray text-base font-medium text-left mb-4"
            @click="edit"
          >
            Edit Task
          </button>
          <button
            class="text-red text-base font-medium text-left"
            @click="deleteTask"
          >
            Delete Task
          </button>
        </div>
      </header>
      <div v-if="task.description">
        <p class="text-base font-medium text-mediumGray mt-6">
          {{ task.description }}
        </p>
      </div>

      <section class="tasks">
        <h5 class="text-xs text-mediumGray font-bold mt-6 mb-4">
          {{ completedTasks }}
        </h5>
        <ul v-for="subtask in task.subtasks" v-bind:key="subtask.title">
          <li class="flex items-center bg-lightGray p-3 mb-3">
            <div class="checkbox-group">
              <input
                type="checkbox"
                :name="task.title"
                :id="task.title + '-' + subtask.title"
                :checked="subtask.isCompleted"
                @change="check(subtask)"
              />
              <label
                :for="task.title + '-' + subtask.title"
                :class="[subtask.isCompleted ? isCompleted : notCompleted]"
                class="text-base font-bold"
              >
                {{ subtask.title }}
              </label>
            </div>
          </li>
        </ul>
      </section>
      <section class="mt-6">
        <h5 class="text-xs text-mediumGray font-bold mt-6 mb-2">
          Current Status
        </h5>
        <div class="select-wrapper">
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
      </section>
    </div>
  </div>
</template>
<script>
export default {
  name: "TaskDetails",
  emits: {
    taskUpdated: false,
    editModal: false,
  },
  props: {
    task: Object,
    completedTasks: String,
    filteredTasksList: Array,
  },
  data() {
    return {
      isCompleted: "text-mediumGray line-through",
      notCompleted: "",
      status: this.task.status,
      showOptions: false,
      showEditTask: false,
    };
  },
  computed: {
    filteredStatusList() {
      const availableStatus = [];
      this.filteredTasksList[0].columns.forEach((element) => {
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
@import "../../assets/base.scss";
</style>
