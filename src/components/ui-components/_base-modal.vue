<template>
  <div>
    <b-modal
      footer-class="justify-content-start"
      header-class="header-color"
      header-bg-variant="secondary"
      ref="main-modal"
      centered
      size="lg"
    >
      <template #modal-header="{ close }">
        <slot name="title"> modal slot title fallback </slot>
        <b-icon
          icon="x"
          @click="close()"
          style="width: 25px; height: 25px"
        ></b-icon>
      </template>
      <slot> modal content </slot>
      <template
        class="bg-dark"
        footer-class="edit-footer-class"
        #modal-footer="{ close }"
      >
        <div class="d-flex">
          <button class="btn btn-danger work-sans" @click="close()">close</button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    showModal: {
      type: Boolean,
      default: () => false,
    },
  },
  watch: {
    showModal(newValue) {
      if (newValue) {
        this.$refs['main-modal'].show();
        return;
      }
      this.$refs['main-modal'].hide();
    },
  },
};
</script>

<style lang="scss" scoped>
.header-color {
  background-color: #ececec !important;
}
.edit-footer-class {
  justify-content: flex-start !important;
}
</style>
