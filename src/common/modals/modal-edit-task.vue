<template>
  <div
    class="modal-backdrop fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
  >
    <div class="modal bg-white flex flex-col shadow-sm max-w-lg w-full p-8 m-8">
      <header class="modal-header relative mb-6">
        <h3 class="title text-lg font-bold text-black">Edit Task</h3>
      </header>
      <div class="input-group flex flex-col mb-6">
        <TextInput :label="'Title'" :value="task.title" />
      </div>
      <div class="input-group flex flex-col mb-6">
        <TextArea
          :label="'Description'"
          :value="task.description"
          :placeholder="'e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little.'"
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
          <TextInput :value="subtask.title" :inputClass="'mr-4'" />
          <RemoveButton />
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
        <SelectInput
          @change="selected(task, $event)"
          :defaultOption="task.status"
          :options="filteredStatusList"
        />
      </div>
      <BaseButton :buttonText="'Save Changes'" :class="'w-full'" />
    </div>
  </div>
</template>
<script>
import BaseButton from "../base-button.vue";
import TextInput from "../form/text-input.vue";
import TextArea from "../form/textarea-input.vue";
import SelectInput from "../form/select-input.vue";
import RemoveButton from "../buttons/remove-button.vue";

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
