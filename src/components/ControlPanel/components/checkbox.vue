<template>
  <label>
    <input
      type="checkbox"
      v-model="checkBoxValue"
      class="focus:outline-none rounded-0"
      @change="$emit('input', $event.target.checked)"
    />
    <span class="rounded-0"></span>
  </label>
</template>
<script>
export default {
  name: 'c-checkbox',
  props: {
    currentValue: {
      required: false,
      default: false,
      type: Boolean,
    },
  },
  computed: {
    // This is needed so the checkbox can visibly
    // reflect its current state
    checkBoxValue() {
      return this.currentValue;
    },
  },
};
</script>
<style scoped>
label {
  position: relative;
}
span {
width: 21px;
height: 18.4px;
border: 1px solid #DADEE2;
  display: inline-block;
  border-radius: 3px;
  transition: all linear 0.3s;

}
span:after {
  content: "";
  position: absolute;
  top: 3px;
  left: 8px;
  border-bottom: 2px solid #348481;
  border-right: 2px solid #348481;
  height: 9px;
  width: 4px;
  transform: rotate(45deg);
  visibility: hidden;
}
input {
  display: none;
}
input:checked ~ span {
 background: #fff
}
input:checked ~ span:after {
  visibility: visible;
}
</style>
