<template>
  <div>
    <theHeader />
    <div class="d-flex flex-column align-items-center justify-content-center">
      <h3 class="mb-4">404 | Page not found</h3>
      <button class="btn btn-primary px-2" @click="$router.go(-1)">&larr;&nbsp;Back to Home</button>
    </div>
    <theFooter class="footer" />
  </div>
</template>

<script lang="js">
import theHeader from './about/layout/theHeader.vue';
import theFooter from './about/layout/theFooter.vue';

export default {
  name: 'NotFound',
  components: { theHeader, theFooter },
};
</script>
<style scoped lang="scss">
div {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialised;
  -moz-osx-font-smoothing: greyscale;
  text-align: center;
  height: 90vh;
  button.btn.btn-primary {
    font-size: 1rem !important;
  }
}
</style>
