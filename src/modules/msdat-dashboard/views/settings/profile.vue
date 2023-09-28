<template>
  <section>
    <Header v-on:tour="runIntro"></Header>
    <h3 class="text-center p-3 border-bottom">Account Settings</h3>
  </section>
</template>

<script>
import Header from '../about/layout/theHeader.vue';
import tour from '../onboarding/tour';

export default {
  name: 'Profile',
  mixins: [tour],
  components: {
    Header,
  },
  data() {
    return {

    };
  },
  methods: {

  },
};
</script>

<style scoped>

</style>
