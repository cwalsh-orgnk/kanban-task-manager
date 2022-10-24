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
      @delete="deleteModal"
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
      isDeleteModalVisible: false,
      listUpdated: false,
    };
  },
  methods: {
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
    closeEditModal() {
      this.isEditModalVisible = false;
    },
    editModal() {
      this.isDetailsModalVisible = false;
      this.isEditModalVisible = true;
    },
    deleteModal() {
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
