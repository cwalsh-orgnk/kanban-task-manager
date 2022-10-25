<template>
  <div
    class="tooltip absolute flex flex-col rounded-lg p-4 bottom-0 translate-y-full right-0 bg-white w-[192px] translate-x-1/2 z-50"
  >
    <button class="text-mediumGray text-base font-medium text-left mb-4" @click="editItem">
      {{ editLabel }}
    </button>
    <button class="text-red text-base font-medium text-left" @click="deleteItem">
      {{ deleteLabel }}
    </button>
  </div>
</template>
<script>
export default {
  name: "EditDelete",
  props: {
    editLabel: String,
    deleteLabel: String,
    editID: String,
    deleteID: String,
  },
  methods: {
    deleteItem() {
      this.showOptions = false;
      this.$emit("delete");
    },
    editItem() {
      this.showOptions = false;
      this.$emit("edit");
    },
  },
};
</script>
