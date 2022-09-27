<template>
  <header
    class="fixed w-full top-o bg-white z-50 h-24 flex items-center px-10 overflow-hidden top-0"
  >
    <NavSidebar />
    <h1 class="text-xl black font-bold" v-if="note">{{ note }}</h1>
    <BaseButton :buttonText="'+ Add New Task'" />
    <button class="flex">
      <img alt="Vue logo" src="../assets/icon-vertical-ellipsis.svg" />
    </button>
  </header>
</template>
<script>
import BaseButton from "../common/base-button.vue";
import NavSidebar from "../common/nav-sidebar.vue";

export default {
  name: "HeaderMain",
  components: {
    BaseButton,
    NavSidebar,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      note: "Platform Launch",
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
