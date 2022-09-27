<template>
  <div
    class="logo relative ml-6 mr-8"
    :class="[sidebarOpen ? logoPaddingRight : logoPaddingRightNone]"
  >
    <img src="../assets/logo-dark.svg" />
  </div>
  <aside
    :class="[sidebarOpen ? activeClass : hiddenClass]"
    class="top-24 left-0 pt-3"
  >
    <span
      class="font-bold uppercase text-mediumGray text-xs w-full block mb-4 ml-8 tracking-widest"
      >All boards ( 3 )</span
    >
    <nav class="mr-6">
      <ul>
        <li>
          <button
            class="nav-item-active w-full pt-[15px] pb-[14px] pl-[24px] pr-[25px] text-center bg-mainPurple white m-0 flex items-center text-white rounded-r-full font-bold text-md"
          >
            <img class="mr-4" src="../assets/icon-board-white.svg" />
            Platform Launch
          </button>
        </li>
        <li>
          <button
            class="nav-item w-full pt-[15px] pb-[14px] pl-[24px] pr-[25px] text-cente white m-0 flex items-center text-mediumGray rounded-r-full font-bold text-md"
          >
            <img class="mr-4" src="../assets/icon-board.svg" />
            Marketing Plan
          </button>
        </li>
        <li>
          <button
            class="nav-item w-full pt-[15px] pb-[14px] pl-[24px] pr-[25px] text-cente white m-0 flex items-center text-mediumGray rounded-r-full font-bold text-md"
          >
            <img class="mr-4" src="../assets/icon-board.svg" />
            Roadmap
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
      note: "Platform Launch",
      sidebarVisible: false,
      activeClass:
        "aside position fixed w-[300px] bg-white h-[calc(100vh-96px()] top-24 left-0 sidebar-visible z-10 opacity-100",
      hiddenClass:
        "aside position fixed bg-white h-[100vh] top-0 left-0 opacity-0",
      showButton: "opacity-100",
      hideButton: "opacity-0",
      logoPaddingRight: "pr-20",
      logoPaddingRightNone: "pr-8",
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
  height: 100vh;
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
