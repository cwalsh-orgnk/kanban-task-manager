<template>
  <label
    v-if="this.label"
    for="title"
    class="text-xs text-mediumGray font-bold mb-2"
    >{{ label }}</label
  >
  <input
    type="text"
    name="title"
    :value="value"
    :class="inputClass"
    class="w-full border border-linesLight border-opacity-80 py-2 px-4 text-base font-medium text-black rounded"
  />
</template>
<script>
export default {
  name: "TextInput",
  props: {
    label: String,
    labelClass: String,
    inputClass: String,
    value: String,
    placeholder: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
