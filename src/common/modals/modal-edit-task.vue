<template>
  <div
    class="modal-backdrop fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
    @click="close"
  >
    <div
      class="modal max-h-[calc(100vh-100px)] overflow-y-scroll overflow-x-hidden sm:overflow-hidden sm:max-h-full bg-white flex flex-col shadow-sm max-w-md w-full p-8 m-8 z-90 text-left dark:bg-darkGray"
      @click.stop
    >
      <header class="modal-header relative mb-6">
        <h3 class="title text-lg font-bold text-black dark:text-white">Edit Task</h3>
      </header>
      <form id="frm">
        <div class="input-group flex flex-col mb-6">
          <TextInput :label="'Title'" :name="'title'" :value="task.title" :v-model="task.title" />
        </div>
        <div class="input-group flex flex-col mb-6">
          <TextArea
            :name="'description'"
            :label="'Description'"
            :value="task.description"
            :placeholder="'e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little.'"
          />
        </div>
        <div class="input-group flex flex-col">
          <label for="subtask" class="text-xs text-mediumGray font-bold mb-2 dark:text-white"
            >Subtasks</label
          >
          <div
            class="input-wrap flex mb-3 items-center"
            v-for="(subtask, index) in task.subtasks"
            v-bind:key="subtask.title"
          >
            <TextInput
              :name="'subtask[' + index + ']'"
              :value="subtask.title"
              :inputClass="'mr-4'"
            />
            <RemoveButton @click.stop />
          </div>
        </div>
        <BaseButton
          :buttonText="'+ Add New Subtask'"
          :class="'w-full text-mainPurple bg-mainPurple bg-opacity-10 dark:bg-white dark:text-mainPurple'"
          @click.stop
        />
        <h5 class="text-xs text-mediumGray font-bold mt-6 mb-2 dark:text-white">Current Status</h5>
        <div class="select-wrapper mb-6">
          <SelectInput
            @change="selected($event)"
            :options="this.currentColumns"
            :selected="task.status"
          />
        </div>
      </form>
      <BaseButton
        :buttonText="'Save Changes'"
        :class="'w-full text-white'"
        @click.stop
        @click="saveTask(task)"
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
      taskForm: {},
      status: this.task.status,
      showOptions: false,
      showEditTask: false,
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
    saveTask(task) {
      let myForm = document.getElementById("frm");
      let formData = new FormData(myForm);
      const data = {};
      // need to convert it before using not with XMLHttpRequest
      for (let [key, val] of formData.entries()) {
        Object.assign(data, { [key]: val });
      }
      task.title = data["title"];
      task.description = data["description"];
      task.subtask = data["subtask"];
      task.status = data["status"];
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
    selected(task, event) {
      task.status = event.target.value;
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
