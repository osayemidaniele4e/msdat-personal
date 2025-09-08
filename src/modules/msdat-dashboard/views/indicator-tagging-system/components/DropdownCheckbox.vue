<template>
  <b-dropdown text="Select options" variant="secondary" size="sm" class="m-2">
    <b-dropdown-item-button v-for="opt in items" :key="opt.id" class="d-flex align-items-center">
      <b-form-checkbox :value="opt.full_name" v-model="selectedValues" @change="emitChange">
        {{ opt.full_name }}
      </b-form-checkbox>
    </b-dropdown-item-button>
  </b-dropdown>
</template>

<script>
export default {
  name: 'DropdownCheckbox',
  props: {
    items: { type: Array, required: true },
    modelValue: { type: Array, default: () => [] },
  },
  data() {
    return {
      selectedValues: this.modelValue.map((o) => o.value),
    };
  },
  methods: {
    emitChange() {
      const selectedObjects = this.items.filter((opt) => this.selectedValues.includes(opt.value));
      this.$emit('update:modelValue', selectedObjects);
    },
  },
};
</script>
