<template>
  <button
    :class="this.class"
    class="pt-[15px] pb-[14px] pl-[24px] pr-[25px] text-center bg-mainPurple white m-0 ml-auto flex rounded-full font-bold text-md mr-6 justify-center"
  >
    {{ buttonText }}
  </button>
</template>
<script>
export default {
  name: "BaseButton",
  props: {
    buttonText: String,
    class: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
