<template>
  <select
    :name="name"
    class="product-filter-select relative w-full border border-linesLight h-[40px] px-4 pr-10"
    :v-bind:value="value"
    v-on:input="$emit('input', $event.target.value)"
  >
    <option v-if="defaultOption" :value="defaultOption">
      {{ defaultOption }}
    </option>
    <option
      v-for="option in options"
      v-bind:key="option.name"
      :value="option.name"
      :checked="option.checked"
    >
      {{ option.name }}
    </option>
  </select>
</template>
<script>
export default {
  name: "SelectInput",
  props: {
    options: Object,
    defaultOption: String,
    checked: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
