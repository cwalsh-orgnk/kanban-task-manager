<template>
  <header
    class="fixed w-full top-o bg-white z-50 h-24 flex items-center px-10 top-0 border-b border-solid transition-colors border-linesLight dark:border-lines dark:bg-darkGray"
  >
    <slot></slot>
    <h1
      class="hidden sm:block text-[20px] text-left md:text-xl black font-bold dark:text-white"
      v-if="this.activeBoard.name"
    >
      {{ this.activeBoard.name }}
    </h1>
    <button
      :class="this.addTaskButtonClass"
      @click="showModal"
      class="p-[12px] rounded-3xl md:pt-[15px] md:pb-[14px] md:pl-[24px] md:pr-[25px] text-center bg-mainPurple white m-0 ml-auto flex md:rounded-full font-bold text-md mr-6 justify-center"
    >
      {{ buttonText }}
    </button>
    <div class="tooltip-wrap relative">
      <button type="button" class="btn-close" @click="options" name="Board settings">
        <img src="../assets/icon-vertical-ellipsis.svg" />
      </button>
      <EditDelete
        v-show="this.showOptions"
        :editLabel="'Edit Board'"
        :deleteLabel="'Delete Board'"
        @edit="editItem"
        @delete="deleteItem"
      />
    </div>
  </header>
  <transition name="slide-fade">
    <TaskAddNew v-show="isAddNewModalVisible" @close="closeAddNewModal" />
  </transition>
  <transition class="slide-fade">
    <EditBoard v-if="isEditBoardModalVisible" @close="closeEditModal"></EditBoard>
  </transition>

  <transition class="slide-fade">
    <DeleteBoard v-if="isDeleteBoardModalVisible" @close="closeDeleteModal"></DeleteBoard>
  </transition>
</template>
<script>
import TaskAddNew from "./modals/modal-add-task.vue";
import EditDelete from "./tooltips/EditDelete.vue";
import store from "../store/store.js";
import EditBoard from "./modals/modal-edit-board.vue";
import DeleteBoard from "./modals/modal-delete-board.vue";

export default {
  name: "HeaderMain",
  components: {
    TaskAddNew,
    EditDelete,
    EditBoard,
    DeleteBoard,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      task: "Platform Launch",
      buttonText: "+ Add New Task",
      isAddNewModalVisible: false,
      showOptions: false,
      isEditBoardModalVisible: false,
      isDeleteBoardModalVisible: false,
    };
  },
  computed: {
    addTaskButtonClass() {
      return this.activeBoard === null ? "opacity-25 text-white" : "active text-white ";
    },
  },
  methods: {
    closeAddNewModal() {
      this.isAddNewModalVisible = false;
    },
    closeDeleteModal() {
      this.isDeleteBoardModalVisible = false;
    },
    closeEditModal() {
      this.isEditBoardModalVisible = false;
    },
    showModal() {
      this.isAddNewModalVisible = true;
    },
    options() {
      this.showOptions = !this.showOptions;
    },
    editItem() {
      this.showOptions = false;
      this.isEditBoardModalVisible = true;
      this.$emit("edit");
    },
    deleteItem() {
      this.showOptions = false;
      this.isDeleteBoardModalVisible = true;
      this.$emit("delete");
    },
    onResize() {
      if (window.innerWidth > 768) {
        this.buttonText = "+ Add New Task";
      } else {
        this.buttonText = "+";
      }
    },
  },
  created() {
    this.onResize();
    window.addEventListener("resize", this.onResize);
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },
  setup() {
    const { state } = store();
    return {
      ...state,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.header {
  right: 0;
  transition: width ease-in-out 0.3s;
}

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
