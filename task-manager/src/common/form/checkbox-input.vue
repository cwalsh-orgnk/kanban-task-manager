<template>
  <div class="checkbox-group">
    <input type="checkbox" :name="inputName" :id="inputId" :checked="checked" :value="value" />
    <label :for="inputId" :class="inputClass" class="text-base font-bold">
      {{ inputLabel }}
    </label>
  </div>
</template>
<script>
export default {
  name: "CheckboxInput",
  props: {
    inputName: String,
    inputId: String,
    checked: Boolean,
    inputClass: String,
    inputLabel: String,
  },
};
</script>
