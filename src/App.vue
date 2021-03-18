<template>
  <div id="app">

    <div class="mt-5">
    <bar/>
    </div>

    <router-view />
  </div>
</template>

<script>
import bar from './modules/msdat-dashboard/components/barchart/index.vue';

export default {
  components: {
    bar,
  },
};
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
}

#nav {
  a {
    font-weight: 600;
    font-size: 0.875rem;
    color: white;
    padding: 4px 10px;

    &.router-link-exact-active {
      color: white;
      background: #154736 0% 0% no-repeat padding-box;
      border-radius: 5px;
    }
    &:hover {
      text-decoration: none;
    }
  }
}
</style>
