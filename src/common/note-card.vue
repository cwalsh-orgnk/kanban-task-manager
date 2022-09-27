<template>
  <div class="col mb-4">
    <h3 class="card-title">{{ note.title }}</h3>
    <h5 class="subtasks">{{ subtasks }}</h5>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "NoteCard",
  props: ["note"],

  setup() {
    const store = useStore();

    let note = computed(function () {
      return store.state.note;
    });

    let itemAlreadyInnote = computed(function () {
      let innote = false;

      note.value.subtasks.forEach((item) => {
        if (item.isCompleted == true) {
          console.log();
        }
      });

      return innote;
    });

    function addTonote() {
      return false;
    }

    return {
      itemAlreadyInnote,
      addTonote,
    };
  },
};
</script>
