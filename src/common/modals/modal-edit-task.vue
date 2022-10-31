<template>
  <div
    class="modal-backdrop fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
    @click="close"
  >
    <article
      class="modal max-h-[calc(100vh-100px)] overflow-y-scroll overflow-x-hidden sm:overflow-hidden sm:max-h-full bg-white flex flex-col shadow-sm max-w-md w-full p-8 m-8 z-90 text-left dark:bg-darkGray"
      @click.stop
    >
      <header class="modal-header relative mb-6">
        <h3 class="title text-lg font-bold text-black dark:text-white">Edit Task</h3>
      </header>
      <div class="input-group flex flex-col mb-6">
        <TextInput
          :label="'Title'"
          :name="'title'"
          :value="updatedTask.title"
          v-on:input="updatedTask.title = $event"
        />
      </div>
      <div class="input-group flex flex-col mb-6">
        <TextArea
          :name="'description'"
          :label="'Description'"
          :value="updatedTask.description"
          v-on:input="updatedTask.description = $event"
          :placeholder="'e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little.'"
        />
      </div>
      <div class="input-group flex flex-col">
        <label for="subtask" class="text-xs text-mediumGray font-bold mb-2 dark:text-white"
          >Subtasks</label
        >
        <div
          class="input-wrap flex mb-3 items-center"
          v-for="(subtask, index) in updatedTask.subtasks"
          v-bind:key="subtask.title"
        >
          <TextInput
            :name="'subtask[' + index + ']'"
            v-bind:value="subtask.title"
            v-on:input="subtask.title = $event"
            :inputClass="'mr-4'"
          />
          <RemoveButton
            v-if="updatedTask.subtasks.length > 1"
            @click="removeSubtask(updatedTask.subtasks, index)"
          />
        </div>
      </div>
      <BaseButton
        :buttonText="'+ Add New Subtask'"
        :class="'w-full text-mainPurple bg-mainPurple bg-opacity-10 transition-colors hover:bg-opacity-25 dark:bg-white dark:hover:bg-mainPurpleHover dark:hover:text-white dark:text-mainPurple'"
        @click="addSubtask"
      />
      <h5 class="text-xs text-mediumGray font-bold mt-6 mb-2 dark:text-white">Current Status</h5>
      <div class="select-wrapper mb-6">
        <SelectInput
          @change="selected($event)"
          :options="this.currentColumns"
          :selected="updatedTask.status"
        />
      </div>
      <BaseButton
        :buttonText="'Save Changes'"
        :class="'w-full text-white transition-colors hover:bg-mainPurpleHover'"
        @click="saveTask()"
      />
    </article>
  </div>
</template>
<script>
import BaseButton from "../buttons/base-button.vue";
import TextInput from "../form/text-input.vue";
import TextArea from "../form/textarea-input.vue";
import SelectInput from "../form/select-input.vue";
import RemoveButton from "../buttons/remove-button.vue";
import store from "../../store/store.js";
import TaskDataService from "../../service/api.js";

export default {
  name: "TaskDetails",
  components: {
    BaseButton,
    TextInput,
    TextArea,
    SelectInput,
    RemoveButton,
  },
  emits: {
    taskUpdated: false,
  },
  props: {
    task: Object,
    completedTasks: String,
    boardColumnsList: Array,
  },
  data() {
    return {
      isCompleted: "text-mediumGray line-through",
      notCompleted: "",
      updatedTask: {
        id: this.task.id,
        title: this.task.title,
        description: this.task.description,
        subtasks: this.task.subtasks,
        status: this.task.status,
      },
      taskForm: {},
      status: this.task.status,
      showOptions: false,
      showEditTask: false,
      orgnialStatus: this.status,
      newStatus: this.status,
    };
  },
  computed: {
    filteredStatusList() {
      const availableStatus = [];
      this.currentColumns.forEach((element) => {
        if (this.task.status != element) {
          availableStatus.push(element);
        }
      });
      return availableStatus;
    },
  },
  methods: {
    addSubtask() {
      const subtask = {
        placeholder: "e.g. Make a pot of coffee",
        title: null,
      };
      if (this.updatedTask.subtasks) {
        this.updatedTask.subtasks.push(subtask);
      } else {
        this.updatedTask.subtasks = [subtask];
      }
    },
    removeSubtask(defaultSubtasks, index) {
      if (defaultSubtasks.length > 1) {
        defaultSubtasks.splice(index, 1);
      }
    },
    updateList(currentTask) {
      this.allTasks.boards.forEach((board) => {
        if (board.id === this.activeBoard.id) {
          board.columns.forEach((column) => {
            if (column.name === this.orgnialStatus) {
              column.tasks.forEach((task, index, object) => {
                if (task.id === currentTask.id) {
                  object.splice(index, 1);
                }
              });
            }
          });
        }
      });
      this.allTasks.boards.forEach((board) => {
        if (board.id === this.activeBoard.id) {
          board.columns.forEach((column, index, object) => {
            if (column.name === currentTask.status) {
              object[index].tasks.push(currentTask);
            }
          });
        }
      });
    },
    saveTask() {
      const updatedTask = {
        id: this.task.id,
        title: this.updatedTask.title,
        description: this.updatedTask.description,
        subtasks: this.updatedTask.subtasks,
        status: this.updatedTask.status,
      };
      this.updateList(updatedTask);
      TaskDataService.update(this.allTasks.boards);
      this.close();
    },
    close() {
      if (this.status === this.task.status) {
        this.$emit("listUpdated", false);
      } else {
        this.$emit("listUpdated", true);
      }
      this.$emit("close");
    },
    check(subtask) {
      subtask.isCompleted = !subtask.isCompleted;
    },
    selected(event) {
      this.newStatus = event.target.value;
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
