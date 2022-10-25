<template>
  <div
    class="bg-lightGray transition-all dark:bg-veryDarkGray"
    :class="[sidebarOpen ? activeClass : hiddenClass]"
  >
    <div
      class="column-container flex-col flex p-6 mt-0 h-[100vh] overflow-y-scroll justify-center items-center"
    >
      <p class="text-mediumGray">This board is empty. Create a new column to get started.</p>

      <button
        :class="this.class"
        @click="showEditModalVisible"
        class="pt-[15px] pb-[14px] pl-[24px] pr-[25px] text-center bg-mainPurple text-white m-0 mr-auto ml-auto mt-6 flex rounded-full font-bold text-md justify-center hover:bg-mainPurpleHover"
      >
        + Add New Column
      </button>
      <transition class="slide-fade">
        <EditBoard v-if="isEditBoardModalVisible" @close="closeEditModal"></EditBoard>
      </transition>
    </div>
  </div>
</template>

<script>
import store from "../store/store.js";
import EditBoard from "./modals/modal-edit-board.vue";

export default {
  name: "TasksList",
  components: {
    EditBoard,
  },
  data() {
    return {
      activeClass: "list-container sidebar-active relative left-[300px] max-w-[calc(100%-300px)]",
      hiddenClass: "list-container sidebar-hidden left-0",
      isEditBoardModalVisible: false,
    };
  },
  computed: {},
  methods: {
    showEditModalVisible() {
      this.isEditBoardModalVisible = true;
    },
    closeEditModal() {
      this.isEditBoardModalVisible = false;
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
.list-container {
  transition: left ease-in-out 0.3s, background-color ease-in-out 0.3s;
}
.column-container {
  display: flex;
  width: 100%;
  justify-self: flex-end;
}
.new-task {
  background: linear-gradient(180deg, #e9effa 0%, rgba(233, 239, 250, 0.5) 100%);
}

.dark {
  .new-task {
    background: linear-gradient(180deg, rgba(43, 44, 55, 0.25) 0%, rgba(43, 44, 55, 0.125) 100%);
  }
}
/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}
</style>
