<template>
    <section>
      <the-header ref="theHeader" class="sticky-top"/>
      <main @click="$refs.theHeader.close()">
        <h4 class="title-header">MSDAT Configurer</h4>
        <stepper class="text-center" v-if="showSteps" />
        <landing v-if="isWelcome" />
        <router-view v-else />
      </main>
    </section>
</template>

<script>
import { RouterView } from 'vue-router';
import stepper from './components/stepper.vue';
import landing from './landing.vue';
import TheHeader from '../about/layout/theHeader.vue';

export default {
  components: {
    RouterView,
    landing,
    stepper,
    TheHeader,
  },
  computed: {
    isWelcome() {
      return this.$route.path === '/configure';
    },
    showSteps() {
      return this.$route.meta?.step;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/scss/abstracts/_variables.scss';

.title-header {
  text-align: center;
  display: block;
  padding: 30px;
  background-color: $baseCard;
}
section {
  min-height: 100vh;
  background-color: #eeeeee;
}
</style>
