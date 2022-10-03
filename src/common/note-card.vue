<template>
  <button
    class="note py-6 px-4 flex flex-col justify-center items-start text-left bg-white mb-5 rounded-lg w-full max-w-[calc(100%-1rem)] shadow"
    @click="showModal"
  >
    <h4 class="text-md font-bold text-black max-w-[250px]">{{ task.title }}</h4>
    <h5 class="text-xs text-mediumGray font-bold mt-1">
      {{ calculateCompletedTasks(task) }}
    </h5>
  </button>
  <NoteDetails
    v-show="isDetailsModalVisible"
    @close="closeModal"
    @edit="editModal"
    :task="task"
    :key="task.title"
    :completedTasks="calculateCompletedTasks(task)"
    @taskUpdated="hasTaskUpdated"
    :filteredNotesList="filteredNotesList"
  />
  <NoteEditDetails
    v-show="isEditModalVisible"
    @close="closeModal"
    @edit="editModal"
    :task="task"
    :key="task.title"
    :completedTasks="calculateCompletedTasks(task)"
    @taskUpdated="hasTaskUpdated"
    :filteredNotesList="filteredNotesList"
  />
</template>

<script>
import NoteDetails from "./modal-note-details.vue";
import NoteEditDetails from "./modal-note-edit-details.vue";

export default {
  name: "NoteCard",
  components: {
    NoteDetails,
    NoteEditDetails,
  },
  emits: {
    listUpdated: false,
  },
  props: {
    task: Object,
    filteredNotesList: Array,
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
    openNote(task) {
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
      console.log("test");
      this.isDetailsModalVisible = false;
      this.isEditModalVisible = true;
    },
  },
};
</script>
