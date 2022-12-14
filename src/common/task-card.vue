<template>
  <button
    class="task py-6 px-4 flex flex-col justify-center items-start text-left bg-white mb-5 rounded-lg w-full max-w-[calc(100%-1rem)] shadow dark:bg-darkGray group"
    @click="showTaskDetailsModal"
  >
    <h3
      class="text-md font-bold text-black max-w-[250px] dark:text-white transition-colors group-hover:text-mainPurple"
    >
      {{ task.title }}
    </h3>
    <h4 class="text-xs text-mediumGray font-bold mt-1">
      {{ calculateCompletedTasks(task) }}
    </h4>
  </button>
  <transition name="slide-fade">
    <TaskDetails
      v-if="isDetailsModalVisible"
      @close="closeDetailsModal"
      @edit="showEditModal"
      @delete="showDeleteModal"
      :task="task"
      :subtasks="task.subtasks"
      :status="status"
      :key="task.title"
      :completedTasks="calculateCompletedTasks(task)"
    />
  </transition>
  <transition name="slide-fade">
    <TaskEditDetails
      v-if="isEditModalVisible"
      @close="closeEditModal"
      @edit="showEditModal"
      :task="task"
      :subtasks="task.subtasks"
      :key="task.title"
      :status="status"
      :completedTasks="calculateCompletedTasks(task)"
    />
  </transition>
  <transition name="slide-fade">
    <TaskDelete
      v-if="isDeleteModalVisible"
      @close="closeDeleteModal"
      @delete="deleteModal"
      :task="task"
    />
  </transition>
</template>

<script>
import TaskDetails from "./modals/modal-view-task.vue";
import TaskEditDetails from "./modals/modal-edit-task.vue";
import TaskDelete from "./modals/modal-delete-task.vue";

export default {
  name: "TaskCard",
  components: {
    TaskDetails,
    TaskEditDetails,
    TaskDelete,
  },
  props: {
    task: Object,
    status: String,
    currentStatusList: Array,
    taskManager: Object,
  },
  data() {
    return {
      isDetailsModalVisible: false,
      isEditModalVisible: false,
      isDeleteModalVisible: false,
    };
  },
  computed: {
    computedStatus() {
      return this.updateStatus(this.task.status);
    },
  },
  methods: {
    updateStatus(task) {
      task.status = this.status;
    },
    calculateCompletedTasks(task) {
      let counter = 0;
      if (task.subtasks) {
        task.subtasks.forEach((element) => {
          if (element.isCompleted === true) {
            counter++;
          }
        });
        return `${counter} of ${task.subtasks.length} subtasks`;
      }
    },
    showTaskDetailsModal() {
      this.isDetailsModalVisible = true;
    },
    closeDetailsModal() {
      this.isDetailsModalVisible = false;
    },
    showEditModal() {
      this.isDetailsModalVisible = false;
      this.isEditModalVisible = true;
    },
    closeEditModal() {
      this.isEditModalVisible = false;
    },
    showDeleteModal() {
      this.isDetailsModalVisible = false;
      this.isDeleteModalVisible = true;
    },
    closeDeleteModal() {
      this.isDeleteModalVisible = false;
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
