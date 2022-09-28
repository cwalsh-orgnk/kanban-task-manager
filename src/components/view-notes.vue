<template>
  <div :class="[sidebarOpen ? activeClass : hiddenClass]">
    <div
      v-for="board in filteredNotesList"
      v-bind:key="board.name"
      class="column-container flex m-6 mt-24 h-[100vh] overflow-scroll"
    >
      <div
        v-for="column in board.columns"
        v-bind:key="column.name"
        class="column w-1/5 mt-6"
      >
        <h3 class="font-bold text-xs tracking-widest mb-6 text-mediumGray">
          {{ column.name }}
        </h3>
        <NoteCard
          v-for="task in column.tasks"
          :key="task.title"
          :task="task"
          :filteredNotesList="filteredNotesList"
          @listUpdated="updateList"
          class="note py-6 px-4 flex flex-col justify-center items-start text-left bg-white mb-5 rounded-lg w-full max-w-[calc(100%-1rem)] shadow"
        >
          <h4 class="text-md font-bold textBlack">{{ task.title }}</h4>
          <h5 class="text-xs text-mediumGray font-bold mt-1">
            {{ calculateCompletedTasks(task) }}
          </h5>
        </NoteCard>
      </div>
      <button
        class="new-note w-1/5 rounded-md flex text-xl font-bold items-center justify-center text-mediumGray mt-16 max-w-[calc(100%-1rem)] h-[calc(100vh-8rem)]"
      >
        + New Column
      </button>
    </div>
  </div>
</template>

<script>
import store from "../store/store.js";
import NoteCard from "../common/note-card.vue";

export default {
  name: "ViewNotes",
  components: {
    NoteCard,
  },
  data() {
    return {
      activeClass: "sidebar-active relative left-[324px]",
      hiddenClass: "sidebar-hidden ml-6 left-0",
    };
  },
  computed: {
    filteredNotesList() {
      const filteredNotes = this.notes.boards.filter((val) =>
        val.name.includes(this.activeBoard)
      );
      return filteredNotes;
    },
  },
  methods: {
    updateList(task) {
      this.filteredNotesList[0].columns.forEach((element) => {
        element.tasks.forEach((childElement, i, object) => {
          if (childElement.title === task.title) {
            object.splice(i, 1);
          }
        });
      });
      this.filteredNotesList[0].columns.forEach((element, i, object) => {
        console.log(element.name);
        console.log(task.status);
        if (element.name === task.status) {
          console.log(i);
          object[i].tasks.push(task);
          return;
        }
      });
    },
    calculateCompletedTasks(tasks) {
      let counter = 0;
      tasks.subtasks.forEach((element) => {
        if (element.isCompleted === true) {
          counter++;
        }
      });
      return `${counter} of ${tasks.subtasks.length} subtasks`;
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

<style scoped>
.column-container {
  display: flex;
  width: 100%;
  justify-self: flex-end;
  transition: margin ease-in-out 0.3s left ease-in-out 0.3s;
}
.new-note {
  background: linear-gradient(
    180deg,
    #e9effa 0%,
    rgba(233, 239, 250, 0.5) 100%
  );
}
</style>
