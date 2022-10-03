<template>
  <button
    class="task py-6 px-4 flex flex-col justify-center items-start text-left bg-white mb-5 rounded-lg w-full max-w-[calc(100%-1rem)] shadow"
    @click="showModal"
  >
    <h4 class="text-md font-bold text-black max-w-[250px]">{{ task.title }}</h4>
    <h5 class="text-xs text-mediumGray font-bold mt-1">
      {{ calculateCompletedTasks(task) }}
    </h5>
  </button>
  <TaskDetails
    v-show="isDetailsModalVisible"
    @close="closeModal"
    @edit="editModal"
    :task="task"
    :key="task.title"
    :completedTasks="calculateCompletedTasks(task)"
    @taskUpdated="hasTaskUpdated"
    :filteredTasksList="filteredTasksList"
  />
  <TaskEditDetails
    v-show="isEditModalVisible"
    @close="closeModal"
    @edit="editModal"
    :task="task"
    :key="task.title"
    :completedTasks="calculateCompletedTasks(task)"
    @taskUpdated="hasTaskUpdated"
    :filteredTasksList="filteredTasksList"
  />
</template>

<script>
import TaskDetails from "./modal-view-task.vue";
import TaskEditDetails from "./modal-edit-task.vue";

export default {
  name: "TaskCard",
  components: {
    TaskDetails,
    TaskEditDetails,
  },
  emits: {
    listUpdated: false,
  },
  props: {
    task: Object,
    filteredTasksList: Array,
  },
  data() {
    return {
      isDetailsModalVisible: false,
      isEditModalVisible: false,
      taskUpdated: false,
    };
  },
  methods: {
    calculateCompletedTasks(tasks) {
      let counter = 0;
      tasks.subtasks.forEach((element) => {
        if (element.isCompleted === true) {
          counter++;
        }
      });
      return `${counter} of ${tasks.subtasks.length} subtasks`;
    },
    openTask(task) {
      return task;
    },
    showModal() {
      this.isDetailsModalVisible = true;
    },
    hasTaskUpdated(hasTaskUpdated) {
      this.taskUpdated = hasTaskUpdated;
    },
    closeModal() {
      if (this.taskUpdated === true) {
        this.$emit("listUpdated", this.task);
      }
      this.isDetailsModalVisible = false;
    },
    editModal() {
      if (this.taskUpdated === true) {
        this.$emit("listUpdated", this.task);
      }
      this.isDetailsModalVisible = false;
      this.isEditModalVisible = true;
    },
  },
};
</script>