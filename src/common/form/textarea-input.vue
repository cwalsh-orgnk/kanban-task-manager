<template>
  <label for="description" class="text-xs text-mediumGray font-bold mb-2">{{
    label
  }}</label>
  <textarea
    name="description"
    rows="4"
    class="w-full border border-linesLight border-opacity-80 py-2 px-4 text-base font-medium text-black rounded"
    :value="value"
    :placeholder="placeholder"
  />
</template>
<script>
export default {
  name: "SelectInput",
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
