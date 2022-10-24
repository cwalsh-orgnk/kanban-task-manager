<template>
  <div
    class="modal-backdrop fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
    @click="close(task)"
  >
    <div
      class="modal max-h-[calc(100vh-100px)] overflow-y-scroll overflow-x-hidden sm:overflow-auto sm:max-h-full bg-white flex flex-col shadow-sm max-w-md w-full p-8 m-8 z-90 text-left dark:bg-darkGray"
      @click.stop
    >
      <header class="modal-header relative flex justify-between">
        <h3 class="title text-lg font-bold text-black dark:text-white">
          {{ task.title }}
        </h3>
        <button type="button" class="btn-close" @click="options" name="Task options">
          <img src="../../assets/icon-vertical-ellipsis.svg" />
        </button>
        <EditDelete
          v-show="this.showOptions"
          :editLabel="'Edit Task'"
          :deleteLabel="'Delete Task'"
          @edit="editItem"
          @delete="deleteItem"
        />
      </header>
      <div v-if="task.description">
        <p class="text-base font-medium text-mediumGray mt-6">
          {{ task.description }}
        </p>
      </div>

      <section class="tasks">
        <h5 class="text-xs text-mediumGray font-bold mt-6 mb-4 dark:text-white">
          {{ completedTasks }}
        </h5>
        <ul v-for="(subtask, index) in task.subtasks" v-bind:key="subtask.title">
          <li
            class="flex items-center bg-lightGray dark:bg-veryDarkGray p-3 mb-3 transition-colors"
          >
            <CheckboxInput
              :inputName="task.title"
              :inputId="task.title + '-' + subtask.title + '-' + index"
              :checked="subtask.isCompleted"
              :inputClass="[subtask.isCompleted ? isCompleted : notCompleted]"
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
    </div>
  </div>
</template>
<script>
import SelectInput from "../form/select-input.vue";
import CheckboxInput from "../form/checkbox-input.vue";
import EditDelete from "../tooltips/EditDelete.vue";
import store from "../../store/store.js";
import { API } from "aws-amplify";
import { Amplify } from "aws-amplify";
import awsconfig from "../../aws-exports";
Amplify.configure(awsconfig);

export default {
  name: "TaskDetails",
  components: {
    SelectInput,
    CheckboxInput,
    EditDelete,
  },
  emits: {
    listUpdated: false,
    editModal: false,
    deleteModal: false,
  },
  props: {
    task: Object,
    subtasks: Object,
    completedTasks: String,
  },
  data() {
    return {
      isCompleted: "text-mediumGray line-through",
      notCompleted: "dark:text-white",
      orgnialStatus: this.task.status,
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
            console.log(this.orgnialStatus);
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
    close(task) {
      const compareSubtasks = JSON.stringify(this.task.subtasks);
      if (this.orgnialStatus !== this.newStatus) {
        task.status = this.newStatus;
        this.updateTaskDB();
        this.updateList(task);
      }
      if (this.subtasksList != compareSubtasks) {
        this.updateTaskDB(task);
      }
      if (this.subtasksList === compareSubtasks || this.orgnialStatus === this.newStatus) {
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
    updateTaskDB() {
      API.put("tasksApi", `/tasks`, {
        body: {
          boards: this.allTasks.boards,
          tasks: this.allTasks.tasks,
        },
      })
        .then((result) => {
          console.log(result);
          this.$emit("close");
        })
        .catch((err) => {
          console.log(err);
        });
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
