<template>
  <header
    class="fixed w-full top-o bg-white z-50 h-24 flex items-center px-10 overflow-hidden top-0 border-b border-solid border-linesLight"
  >
    <NavSidebar />
    <h1 class="text-xl black font-bold" v-if="note">{{ note }}</h1>
    <BaseButton
      :buttonText="'+ Add New Task'"
      :class="this.addTaskButtonClass"
      @click="showModal"
    />
    <button class="flex">
      <img alt="Vue logo" src="../assets/icon-vertical-ellipsis.svg" />
    </button>
  </header>
  <NoteAddNew
    v-show="isAddNewModalVisible"
    @close="closeModal"
    :filteredNotesList="filteredNotesList"
  />
</template>
<script>
import BaseButton from "../common/base-button.vue";
import NavSidebar from "../common/nav-sidebar.vue";
import NoteAddNew from "../common/modal-note-add-new.vue";
import store from "../store/store.js";

export default {
  name: "HeaderMain",
  components: {
    BaseButton,
    NavSidebar,
    NoteAddNew,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      note: "Platform Launch",
      isAddNewModalVisible: false,
    };
  },
  computed: {
    addTaskButtonClass() {
      return this.activeBoard === null ? "opacity-25" : "active";
    },
    filteredNotesList() {
      const filteredNotes = this.notes.boards.filter((val) =>
        val.name.includes(this.activeBoard)
      );
      return filteredNotes;
    },
  },
  methods: {
    showModal() {
      this.isAddNewModalVisible = true;
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
