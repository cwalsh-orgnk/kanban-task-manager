<template>
  <button :class="buttonClass" class="text-mediumGray">
    <img src="../../assets/icon-cross.svg" />
  </button>
</template>
<script>
export default {
  name: "RemoveButton",
  props: {
    buttonClass: String,
  },
};
</script>
