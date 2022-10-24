<template>
  <label
    for="description"
    :class="labelClass"
    class="text-xs text-mediumGray font-bold mb-2 dark:text-white"
    >{{ label }}</label
  >
  <textarea
    :name="label"
    rows="4"
    class="w-full border border-linesLight border-opacity-80 py-2 px-4 text-base font-medium text-black rounded dark:bg-darkGray dark:text-white dark:border-[#828FA3]"
    :value="value"
    :placeholder="placeholder"
    :v-bind:value="value"
    v-on:input="$emit('input', $event.target.value)"
  />
</template>
<script>
export default {
  name: "SelectInput",
  props: {
    label: String,
    name: String,
    labelClass: String,
    inputClass: String,
    value: String,
    placeholder: String,
  },
};
</script>
