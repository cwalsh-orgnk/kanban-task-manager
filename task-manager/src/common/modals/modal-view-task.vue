<template>
  <div
    class="modal-backdrop fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
    @click="close"
  >
    <div class="modal bg-white flex flex-col shadow-sm max-w-md w-full p-8 m-8 z-90" @click.stop>
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
        <ul v-for="subtask in task.subtasks" v-bind:key="subtask.title">
          <li class="flex items-center bg-lightGray p-3 mb-3">
            <CheckboxInput
              :inputName="task.title"
              :inputId="task.title + '-' + subtask.title"
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
            @change="selected(task, $event)"
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
        this.$emit("listUpdated", false);
      } else {
        this.$emit("listUpdated", true);
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
    selected(task, event) {
      task.status = event.target.value;
    },
  },
};
</script>
<style lang="scss">
@import "../../assets/base.scss";
</style>
