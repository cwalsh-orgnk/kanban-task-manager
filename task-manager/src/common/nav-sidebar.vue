<template>
  <div
    class="logo relative ml-6 mr-8 flex items-center h-full border-r border-solid border-linesLight dark:border-lines"
    :class="[sidebarOpen ? logoPaddingRight : logoPaddingRightNone]"
  >
    <img :src="logo" />
  </div>
  <aside
    :class="[sidebarOpen ? activeClass : hiddenClass]"
    class="top-20 top left-0 pt-6 border-r border-solid border-linesLight dark:bg-darkGray dark:border-lines"
  >
    <span class="font-bold uppercase text-mediumGray text-xs w-full block mb-4 ml-8 tracking-widest"
      >All boards ( 3 )</span
    >
    <nav class="mr-6">
      <ul v-if="allTasks != null && Object.keys(allTasks).length > 0">
        <li v-for="board in allTasks.boards" :key="board.name">
          <button
            :class="[this.activeBoard === board.name ? activeBoardClass : hiddenBoardClass]"
            @click="showBoard(board.name)"
            class="nav-item"
          >
            <img
              class="mr-4"
              v-if="this.activeBoard == board.name"
              src="../assets/icon-board-white.svg"
            />
            <img class="mr-4" v-else src="../assets/icon-board.svg" />
            {{ board.name }}
          </button>
        </li>
        <li>
          <button
            class="nav-item w-full pt-[15px] pb-[14px] pl-[24px] pr-[25px] text-cente white m-0 flex items-center text-mainPurple rounded-r-full font-bold text-md"
            @click="showAddBoardModal"
          >
            <img class="mr-4" src="../assets/icon-board-purple.svg" />
            + Create New Board
          </button>
        </li>
      </ul>
    </nav>
    <div
      class="sidebar-actions absolute bottom-0 w-full flex flex-col my-6 flex-grow-0 text-mediumGray text-md font-bold mb-11"
    >
      <div
        class="dark-mode bg-lightGray flex m-6 py-6 justify-center items-center transition-colors dark:bg-veryDarkGray"
      >
        <img class="mr-4 w-[25px] min-w-[25px] h-[25px]" src="../assets/icon-light-theme.svg" />
        <label class="switch">
          <input type="checkbox" checked @click="toggleTheme($event)" />
          <span class="slider round"></span>
        </label>
        <img class="ml-4 w-[25px] min-w-[25px] h-[25px]" src="../assets/icon-dark-theme.svg" />
      </div>
      <button class="flex items-center justify-center" @click="showSidebar()">
        <img class="mr-4" src="../assets/icon-hide-sidebar.svg" />Hide sidebar
      </button>
    </div>
  </aside>
  <button
    class="fixed bottom-10 left-0 bg-mainPurple rounded-r-full opacity-100"
    :class="[sidebarOpen ? hideButton : showButton]"
    @click="showSidebar()"
  >
    <img class="m-[19px] w-[18px] h-[10px]" src="../assets/icon-show-sidebar.svg" />
  </button>
  <transition name="slide-fade">
    <AddBoard
      v-if="isAddBoardModalVisible"
      @close="closeAddBoardModal"
      :boardColumnsList="boardColumnsList"
    />
  </transition>
</template>

<script>
import store from "../store/store.js";
import AddBoard from "./modals/modal-add-board.vue";

export default {
  name: "NavSidebar",
  components: {
    AddBoard,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      isAddBoardModalVisible: false,
      user: {},
      lastTodoId: "",
      activeClass:
        "aside position fixed w-[300px] bg-white h-[calc(100vh-96px] top-24 left-0 sidebar-visible z-10 opacity-100",
      hiddenClass: "aside position fixed bg-white h-[100vh] top-24 left-0 opacity-0",
      showButton: "opacity-100",
      hideButton: "opacity-0",
      logoPaddingRight: "pr-[5.2rem]",
      logoPaddingRightNone: "pr-8",
      activeBoardClass:
        "nav-item-active w-full pt-[15px] pb-[14px] pl-[24px] pr-[25px] text-center bg-mainPurple white m-0 flex items-center text-white rounded-r-full font-bold text-md",
      hiddenBoardClass:
        "nav-item w-full pt-[15px] pb-[14px] pl-[24px] pr-[25px] text-cente white m-0 flex items-center text-mediumGray rounded-r-full font-bold text-md",
    };
  },
  watch: {
    // whenever active changes, this function will run
    active: function () {
      if (this.sidebarOpen) {
        document.body.style.overflow = this.sidebarOpen ? "hidden" : "";
      }
    },
  },
  computed: {
    logo() {
      return this.lightMode
        ? require("../assets/logo-dark.svg")
        : require("../assets/logo-light.svg");
    },
  },
  methods: {
    toggleTheme() {
      this.lightMode = !this.lightMode;
    },
    showAddBoardModal() {
      this.isAddBoardModalVisible = true;
    },
    showSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    showBoard(board) {
      this.activeBoard = board;
    },
    closeAddBoardModal() {
      this.isAddBoardModalVisible = false;
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
button {
  transition: width ease-in-out 0.3s opacity ease-in-out 0.3s;
}
aside {
  transform: translate(-100%);
  height: calc(100vh - 5rem);
  transition: transform ease-in-out 0.3s, opacity ease-in-out 0.3s;
}
.sidebar-visible {
  transform: translate(0);
  width: 300px;
}
.logo {
  transition: padding ease-in-out 0.3s;
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
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 30px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 22px;
  width: 22px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #635fc7;
}

input:focus + .slider {
  box-shadow: 0 0 1px #635fc7;
}

input:not(:checked) + .slider:before {
  -webkit-transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 30px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
