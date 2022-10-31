<template>
  <div
    class="modal-backdrop fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
    @click="close(task)"
  >
    <article
      class="modal max-h-[calc(100vh-100px)] overflow-y-scroll overflow-x-hidden sm:overflow-visible sm:max-h-full bg-white flex flex-col shadow-sm max-w-md w-full p-8 m-8 z-90 text-left dark:bg-darkGray"
      @click.stop
    >
      <header class="modal-header relative flex justify-between">
        <h3 class="title text-lg font-bold text-black dark:text-white">
          {{ task.title }}
        </h3>
        <button
          type="button"
          class="btn-close -m-6 p-6"
          aria-label="Edit Task"
          @click="options"
          name="Task options"
        >
          <img alt="" src="../../assets/icon-vertical-ellipsis.svg" />
        </button>
        <EditDelete
          v-if="this.showOptions"
          :editLabel="'Edit Task'"
          :deleteLabel="'Delete Task'"
          @edit="editItem"
          @delete="deleteItem"
        />
      </header>
      <section v-if="task.description">
        <p class="text-base font-medium text-mediumGray mt-6">
          {{ task.description }}
        </p>
      </section>

      <section class="tasks">
        <h5 class="text-xs text-mediumGray font-bold mt-6 mb-4 dark:text-white">
          {{ completedTasks }}
        </h5>
        <ul v-for="(subtask, index) in task.subtasks" v-bind:key="subtask.title">
          <li class="flex items-center mb-3 transition-colors">
            <CheckboxInput
              :inputName="task.title"
              :inputId="task.title + '-' + subtask.title + '-' + index"
              :checked="subtask.isCompleted"
              :inputClass="subtask.isCompleted ? isCompleted : notCompleted"
              @change="check(subtask)"
              :inputLabel="subtask.title"
            />
          </li>
        </ul>
      </section>
      <section class="mt-6">
        <h5 class="text-xs text-mediumGray font-bold mt-6 mb-2 dark:text-white">Current Status</h5>
        <div class="select-wrapper dark:text-white">
          <SelectInput
            @change="selected($event)"
            :options="this.currentColumns"
            :selected="task.status"
          />
        </div>
      </section>
    </article>
  </div>
</template>
<script>
import SelectInput from "../form/select-input.vue";
import CheckboxInput from "../form/checkbox-input.vue";
import EditDelete from "../tooltips/EditDelete.vue";
import store from "../../store/store.js";
import TaskDataService from "../../service/api.js";

export default {
  name: "TaskDetails",
  components: {
    SelectInput,
    CheckboxInput,
    EditDelete,
  },
  emits: {
    showEditModal: false,
    deleteModal: false,
  },
  props: {
    task: Object,
    subtasks: Object,
    completedTasks: String,
    status: String,
  },
  data() {
    return {
      isCompleted: "text-mediumGray line-through",
      notCompleted: "dark:text-white",
      originalStatus: this.status,
      newStatus: this.task.status,
      showOptions: false,
      showEditTask: false,
      subtasksList: JSON.stringify(this.task.subtasks),
    };
  },
  created() {
    let subtasks = this.task.subtasks;
    return subtasks;
  },
  methods: {
    updateList(currentTask) {
      this.allTasks.boards.forEach((board) => {
        if (board.id === this.activeBoard.id) {
          board.columns.forEach((column) => {
            if (column.name === this.originalStatus) {
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
      this.allTasks.boards.forEach((board) => {
        if (board.id === this.activeBoard.id) {
          board.columns.forEach((column, index, object) => {
            if (column.name === currentTask.status) {
              if ("tasks" in column) {
                object[index].tasks.push(currentTask);
              } else {
                (object[index] ??= {}).tasks ??= [currentTask];
              }
            }
          });
        }
      });
    },
    close(task) {
      const compareSubtasks = JSON.stringify(this.task.subtasks);
      if (this.originalStatus !== this.newStatus) {
        task.status = this.newStatus;
        this.updateList(task);
        TaskDataService.update(this.allTasks.boards);
        this.$emit("close");
      }
      if (this.subtasksList != compareSubtasks) {
        TaskDataService.update(this.allTasks.boards);
        this.$emit("close");
      }
      if (this.subtasksList === compareSubtasks || this.originalStatus === this.newStatus) {
        this.$emit("close");
      }
    },
    options() {
      this.showOptions = !this.showOptions;
    },
    editItem() {
      this.showOptions = false;
      this.$emit("edit");
    },
    deleteItem() {
      this.$emit("delete");
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
