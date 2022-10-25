<template>
  <div class="checkbox-group w-full">
    <input type="checkbox" :name="inputName" :id="inputId" :checked="checked" :value="value" />
    <label
      :for="inputId"
      :class="inputClass"
      class="text-base font-bold p-3 transition-colors hover:text-black hover:bg-mainPurple hover:bg-opacity-25 bg-lightGray dark:bg-veryDarkGray dark:hover:bg-mainPurple dark:hover:text-white dark:hover:bg-opacity-25"
    >
      {{ inputLabel }}
    </label>
  </div>
</template>
<script>
export default {
  name: "CheckboxInput",
  emits: {
    input: null,
  },
  props: {
    inputName: String,
    inputId: String,
    checked: Boolean,
    inputClass: String,
    inputLabel: String,
  },
};
</script>
