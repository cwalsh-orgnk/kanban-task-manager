<template>
  <div
    class="logo relative ml-6 mr-8"
    :class="[sidebarOpen ? logoPaddingRight : logoPaddingRightNone]"
  >
    <img src="../assets/logo-dark.svg" />
  </div>
  <aside
    :class="[sidebarOpen ? activeClass : hiddenClass]"
    class="top-20 top left-0 pt-6 border-r border-solid border-linesLight"
  >
    <span
      class="font-bold uppercase text-mediumGray text-xs w-full block mb-4 ml-8 tracking-widest"
      >All boards ( 3 )</span
    >
    <nav class="mr-6">
      <ul>
        <li v-for="board in tasks.boards" :key="board.name">
          <button
            :class="[
              this.activeBoard === board.name
                ? activeBoardClass
                : hiddenBoardClass,
            ]"
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
          >
            <img class="mr-4" src="../assets/icon-board-purple.svg" />
            + Create New Board
          </button>
        </li>
      </ul>
    </nav>
    <div
      class="sidebar-actions absolute bottom-0 w-full flex flex-col my-6 flex-grow-0 text-mediumGray text-md font-bold"
    >
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
    <img
      class="m-[19px] w-[18px] h-[10px]"
      src="../assets/icon-show-sidebar.svg"
    />
  </button>
</template>

<script>
import store from "../store/store.js";

export default {
  name: "NavSidebar",
  props: {
    msg: String,
  },
  data() {
    return {
      activeClass:
        "aside position fixed w-[300px] bg-white h-[calc(100vh-96px()] top-24 left-0 sidebar-visible z-10 opacity-100",
      hiddenClass:
        "aside position fixed bg-white h-[100vh] top-24 left-0 opacity-0",
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
  methods: {
    showSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    showBoard(board) {
      console.log(board);
      console.log(this.activeBoard);
      this.activeBoard = board;
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
.logo:after {
  content: "";
  display: block;
  width: 1px;
  height: 100%;
  background-color: rgb(228 235 250);
  right: 0;
  z-index: 111;
  width: 1px;
  height: 200vh;
  overflow: hidden;
  position: absolute;
  top: -100vh;
}
</style>
