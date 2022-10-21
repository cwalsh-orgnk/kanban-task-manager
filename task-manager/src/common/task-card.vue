<template>
  <button
    class="task py-6 px-4 flex flex-col justify-center items-start text-left bg-white mb-5 rounded-lg w-full max-w-[calc(100%-1rem)] shadow dark:bg-darkGray"
    @click="showTaskDetailsModal"
  >
    <h4 class="text-md font-bold text-black max-w-[250px] dark:text-white">{{ task.title }}</h4>
    <h5 class="text-xs text-mediumGray font-bold mt-1">
      {{ calculateCompletedTasks(task) }}
    </h5>
  </button>
  <transition name="slide-fade">
    <TaskDetails
      v-if="isDetailsModalVisible"
      @close="closeDetailsModal"
      @edit="editModal"
      :task="task"
      :subtasks="task.subtasks"
      :key="task.title"
      :completedTasks="calculateCompletedTasks(task)"
    />
  </transition>
  <transition name="slide-fade">
    <TaskEditDetails
      v-if="isEditModalVisible"
      @close="closeEditModal"
      @edit="editModal"
      :task="task"
      :subtasks="task.subtasks"
      :key="task.title"
      :completedTasks="calculateCompletedTasks(task)"
    />
  </transition>
</template>

<script>
import TaskDetails from "./modals/modal-view-task.vue";
import TaskEditDetails from "./modals/modal-edit-task.vue";

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
    currentStatusList: Array,
    taskManager: Object,
  },
  data() {
    return {
      isDetailsModalVisible: false,
      isEditModalVisible: false,
      listUpdated: false,
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
    showTaskDetailsModal() {
      this.isDetailsModalVisible = true;
    },
    closeDetailsModal() {
      if (this.listUpdated === true) {
        this.$emit("listUpdated", this.task);
      }
      this.isDetailsModalVisible = false;
    },
    closeEditModal() {
      if (this.listUpdated === true) {
        this.$emit("listUpdated", this.task);
      }
      this.isEditModalVisible = false;
    },
    editModal() {
      if (this.listUpdated === true) {
        this.$emit("listUpdated", this.task);
      }
      this.isDetailsModalVisible = false;
      this.isEditModalVisible = true;
    },
  },
};
</script>

<style lang="scss">
.slide-fade-enter-active {
  transition: opacity 0.2s ease-out;
}

.slide-fade-leave-active {
  transition: opacity 0.2s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}
</style>
