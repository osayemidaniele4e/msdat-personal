<template>
  <div id="app">
    <!-- Navbar here -->
    <div id="nav">
      <panel></panel>
    </div>

    <router-view />
  </div>
</template>

<script>
import panel from './components/ControlPanel/Panel.vue';

export default {
  components: {
    panel,
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
