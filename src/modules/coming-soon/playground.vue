<template>
  <div>
    <the-header />
    <main class="container">
      <h4>Testing</h4>
    </main>
    <the-footer />
  </div>
</template>

<script>
import theHeader from '../msdat-dashboard/views/about/layout/theHeader.vue';
import theFooter from '../msdat-dashboard/views/about/layout/theFooter.vue';

export default {
  name: 'Advanced-Analytics',
  components: {
    theHeader,
    theFooter,
  },
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
</style>
