<template>
  <div
    class="modal-backdrop fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
    @click="close(task)"
  >
    <div
      class="modal bg-white flex flex-col shadow-sm max-w-md w-full p-8 m-8 z-90 text-left"
      @click.stop
    >
      <header class="modal-header relative flex justify-between">
        <h3 class="title text-lg font-bold text-black">
          {{ task.title }}
        </h3>
        <button type="button" class="btn-close" @click="options">
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
        <h5 class="text-xs text-mediumGray font-bold mt-6 mb-4">
          {{ completedTasks }}
        </h5>
        <ul v-for="(subtask, index) in task.subtasks" v-bind:key="subtask.title">
          <li class="flex items-center bg-lightGray p-3 mb-3">
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
        <h5 class="text-xs text-mediumGray font-bold mt-6 mb-2">Current Status</h5>
        <div class="select-wrapper">
          <SelectInput
            @change="selected($event)"
            :defaultOption="task.status"
            :options="filteredStatusList"
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
  },
  props: {
    task: Object,
    subtasks: Object,
    completedTasks: String,
    boards: Object,
    filteredTasksList: Array,
  },
  data() {
    return {
      isCompleted: "text-mediumGray line-through",
      notCompleted: "",
      orgnialStatus: this.task.status,
      newStatus: this.task.status,
      showOptions: false,
      showEditTask: false,
      subtasksList: JSON.stringify(this.task.subtasks),
    };
  },
  computed: {
    filteredStatusList() {
      const availableStatus = [];
      this.filteredTasksList[0].columns.forEach((element) => {
        if (this.task.status != element.name) {
          let status = {
            name: element.name,
            checked: this.task.status === element.name ? true : false,
          };
          availableStatus.push(status);
        }
      });
      return availableStatus;
    },
  },
  created() {
    let subtasks = this.task.subtasks;
    return subtasks;
  },
  methods: {
    close(task) {
      const compareSubtasks = JSON.stringify(this.task.subtasks);
      if (this.orgnialStatus !== this.newStatus) {
        task.status = this.newStatus;
        this.updateTaskDB(this.boards.id);
      }
      if (this.subtasksList != compareSubtasks) {
        this.updateTaskDB(this.boards.id);
      }
      this.$emit("close");
    },
    options() {
      this.showOptions = !this.showOptions;
    },
    editItem() {
      this.showOptions = false;
      this.$emit("edit");
    },
    deleteItem() {
      return false;
    },
    check(subtask) {
      subtask.isCompleted = !subtask.isCompleted;
    },
    selected(event) {
      this.newStatus = event.target.value;
    },
    updateTaskDB(id) {
      if (!id) return;
      console.log(`updateTaskDB-${id}`);
      API.put("tasksApi", `/tasks`, {
        body: {
          id: id,
          boards: this.boards.boards,
          tasks: this.boards.tasks,
          example: "example",
        },
      })
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style lang="scss">
@import "../../assets/base.scss";
</style>
