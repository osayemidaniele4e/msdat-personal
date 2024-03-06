<template>
  <b-overlay
   z-index=1
  :show="show">
    <slot></slot>
    <template #overlay>
      <div class="text-center">
        <div class="d-flex justify-content-center">
          <b-spinner style="width: 4rem; height:4rem; margin-top: 25rem;" variant="primary" label="Large Spinner">
          </b-spinner>
        </div>
      </div>
    </template>
  </b-overlay>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
