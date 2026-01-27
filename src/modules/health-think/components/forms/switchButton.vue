<template>
  <div>
    <b-form-checkbox
      size="lg"
      v-model="checked"
      name="check-button"
      button-variant="yellow"
      switch
      :class="`${classes}`"
      :style="`
        border-radius:${radius};
        color:${colorsec};
        box-shadow:${shadow};
        background-color: ${bgcolor};
        border: ${btnOutline};`"
    >
    </b-form-checkbox>
  </div>
</template>

<script>
export default {
  name: 'switchButton',
  props: {
    classes: {
      type: String,
    },
    btnOutline: {
      type: String,
    },
    shadow: {
      type: String,
    },
    colorsec: {
      type: String,
    },
    bgcolor: {
      type: String,
    },
  },
  data() {
    return {
      checked: false,
    };
  },
};
</script>
<style>
</style>
