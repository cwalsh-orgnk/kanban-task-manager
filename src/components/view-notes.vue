<template>
  <div class="column-container flex m-6">
    <div
      class="column w-1/5"
      v-for="columns in notes.boards[0].columns"
      :key="columns.name"
    >
      <h3 class="font-bold text-xs tracking-widest mb-6 text-mediumGray">
        {{ columns.name }}
      </h3>
      <button
        v-for="column in columns.tasks"
        :key="column.name"
        class="note py-6 px-4 flex flex-col justify-center items-start text-left bg-white mb-5 rounded-lg w-full max-w-xs shadow"
      >
        <h4 class="text-md font-bold textBlack">{{ column.title }}</h4>
        <h5 class="text-xs text-mediumGray font-bold mt-1">
          {{ calculateCompletedTasks(column) }}
        </h5>
      </button>
    </div>
    <button
      class="new-note w-1/5 rounded-md flex text-xl font-bold items-center justify-center text-mediumGray mt-10"
    >
      + New Column
    </button>
  </div>
</template>

<script>
import store from "../store/store.js";

export default {
  name: "ViewNotes",
  components: {},
  methods: {
    calculateCompletedTasks(tasks) {
      let counter = 0;
      tasks.subtasks.forEach((element) => {
        if (element.isCompleted === true) {
          counter++;
        }
      });
      console.log(counter);
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
.new-note {
  background: linear-gradient(
    180deg,
    #e9effa 0%,
    rgba(233, 239, 250, 0.5) 100%
  );
}
</style>
