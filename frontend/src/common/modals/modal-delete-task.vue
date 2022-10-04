<template>
  <div
    class="modal-backdrop fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
    @click="close"
  >
    <div
      class="modal bg-white flex flex-col shadow-sm max-w-lg w-full p-8 m-8"
      @click.stop
    >
      <header class="modal-header relative mb-6">
        <h3 class="title text-lg font-bold text-black">Add New Board</h3>
      </header>
      <div class="input-group flex flex-col mb-6">
        <label for="title" class="text-xs text-mediumGray font-bold mb-2"
          >Name</label
        >
        <input
          type="text"
          name="title"
          placeholder="e.g. Web Design"
          class="w-full border border-linesLight border-opacity-80 py-2 px-4 text-base font-medium text-black rounded"
        />
      </div>
      <div class="input-group flex flex-col">
        <label for="subtask" class="text-xs text-mediumGray font-bold mb-2"
          >Columns</label
        >
        <div class="input-wrap flex mb-3 items-center">
          <input
            type="text"
            name="subtask"
            class="w-full border border-linesLight border-opacity-80 py-2 px-4 text-base font-medium text-black rounded mr-4"
            :placeholder="'e.g. Make coffee'"
            :value="'Todo'"
          />
          <button class="text-mediumGray">
            <img src="../../../assets/icon-cross.svg" />
          </button>
        </div>
        <div class="input-wrap flex mb-3 items-center">
          <input
            type="text"
            name="subtask"
            class="w-full border border-linesLight border-opacity-80 py-2 px-4 text-base font-medium text-black rounded mr-4"
            :placeholder="'e.g. Drink coffee & smile'"
            :value="'Doing'"
          />
          <button class="text-mediumGray">
            <img src="../../assets/icon-cross.svg" />
          </button>
        </div>
      </div>
      <BaseButton
        :buttonText="'+ Add New Column'"
        :class="'w-full text-mainPurple bg-mainPurple bg-opacity-10'"
      />
      <BaseButton :buttonText="'Create New Board'" :class="'w-full'" />
    </div>
  </div>
</template>
<script>
import BaseButton from "../base-button.vue";
import store from "../../store/store.js";

export default {
  name: "TaskAddNew",
  components: {
    BaseButton,
  },
  emits: {
    boardUpdated: false,
  },
  props: {
    board: Object,
  },
  data() {
    return {
      isCompleted: "text-mediumGray line-through",
      notCompleted: "",
      showOptions: false,
      showEditTask: false,
    };
  },
  computed: {
    filteredStatusList() {
      if (this.activeBoard === null) return;
      const availableStatus = [];
      this.filteredTasksList[0].columns.forEach((element) => {
        availableStatus.push(element.name);
      });
      return availableStatus;
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    deleteColumn() {
      return false;
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
