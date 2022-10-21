<template>
  <select
    :name="name"
    class="product-filter-select relative w-full border border-linesLight h-[40px] px-4 pr-10 dark:border-[#828FA3] dark:text-white"
    :v-bind:value="value"
    v-on:input="$emit('input', $event.target.value)"
  >
    <option v-if="defaultOption" :value="defaultOption">
      {{ defaultOption }}
    </option>
    <option
      v-for="option in options"
      v-bind:key="option"
      :value="option"
      :selected="setSelected(option)"
    >
      {{ option }}
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
    selected: String,
  },
  methods: {
    setSelected(option) {
      if (option === this.selected) {
        return "selected";
      } else {
        return false;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
