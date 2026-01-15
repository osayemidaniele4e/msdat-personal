<template>
  <!-- Button trigger modal -->
  <b-modal
    v-model="modalShow"
    v-on:hidden="hide"
    centered
    :no-close-on-backdrop="noBackdrop"
    header-class="d-none"
    footer-class="d-none"
    :modal-class="background"
    content-class="noShadow"
  >
    <div
      v-if="showCloseButton"
      class="w-100 d-flex justify-content-end pointer_click"
      style="font-size: 2.6rem"
    >
      <b-icon-x-circle-fill @click="hide" class="p-2" variant="danger"></b-icon-x-circle-fill>
    </div>
    <slot> modal content </slot>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      modalShow: true,
      background: 'background',
    };
  },
  methods: {
    hide() {
      this.$emit('clickHide');
    },
  },
  props: {
    showBackground: {
      type: Boolean,
      default: () => false,
    },
    noBackdrop: {
      type: Boolean,
      default: () => false,
    },
    showCloseButton: {
      type: Boolean,
      // default: () => false,
    },
  },
  watch: {
    showBackground: {
      handler(newVal) {
        if (newVal === false) {
          this.background = 'noBackground';
        }
      },
      immediate: true,
    },
  },
};
</script>

<style>
.check {
  display: none;
}
.noBackground {
  background-color: white;
}
.background {
  opacity: 1;
}
.noShadow {
  border-radius: 0;
  border: 0;
  -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, 0);
  -moz-box-shadow: 0 5px 15px rgba(0, 0, 0, 0);
  -o-box-shadow: 0 5px 15px rgba(0, 0, 0, 0);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0);
}
</style>
