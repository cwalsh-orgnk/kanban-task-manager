<template>
  <label
    v-if="this.label"
    for="title"
    class="text-xs text-mediumGray font-bold mb-2 dark:text-white"
    >{{ label }}</label
  >
  <input
    type="text"
    :name="name"
    :value="value"
    :class="inputClass"
    :placeholder="placeholder"
    class="w-full border border-linesLight border-opacity-80 py-2 px-4 text-base font-medium text-black rounded transition-colors hover:border-mainPurple dark:bg-darkGray dark:text-white dark:border-[#828FA3]"
    :v-bind:value="value"
    v-on:input="$emit('input', $event.target.value)"
  />
</template>
<script>
export default {
  name: "TextInput",
  emits: {
    input: null,
  },
  props: {
    name: String,
    label: String,
    labelClass: String,
    inputClass: String,
    value: String,
    placeholder: String,
    modelValue: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
