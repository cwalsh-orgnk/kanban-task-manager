<template>
  <header
    class="fixed w-full top-o bg-white z-50 h-24 flex items-center px-10 top-0 border-b border-solid border-linesLight"
  >
    <NavSidebar />
    <h1 class="text-xl black font-bold" v-if="task">{{ task }}</h1>
    <BaseButton
      :buttonText="'+ Add New Task'"
      :class="this.addTaskButtonClass"
      @click="showModal"
    />
    <div class="tooltip-wrap relative">
      <button type="button" class="btn-close" @click="options">
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
  <TaskAddNew
    v-show="isAddNewModalVisible"
    :filteredTasksList="filteredTasksList"
  />
</template>
<script>
import BaseButton from "../common/base-button.vue";
import NavSidebar from "../common/nav-sidebar.vue";
import TaskAddNew from "./modals/modal-add-task.vue";
import EditDelete from "./tooltips/EditDelete.vue";
import store from "../store/store.js";

export default {
  name: "HeaderMain",
  components: {
    BaseButton,
    NavSidebar,
    TaskAddNew,
    EditDelete,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      task: "Platform Launch",
      isAddNewModalVisible: false,
      showOptions: false,
    };
  },
  computed: {
    addTaskButtonClass() {
      return this.activeBoard === null ? "opacity-25" : "active";
    },
    filteredTasksList() {
      const filteredTasks = this.tasks.boards.filter((val) =>
        val.name.includes(this.activeBoard)
      );
      return filteredTasks;
    },
  },
  methods: {
    showModal() {
      this.isAddNewModalVisible = true;
    },
    options() {
      this.showOptions = !this.showOptions;
    },
    editItem() {
      this.showOptions = false;
      this.$emit("edit");
    },
    deleteItem() {
      this.showOptions = false;
      this.$emit("edit");
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
</style>
