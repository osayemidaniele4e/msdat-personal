<template>
    <div>
      <TestonePluginMain @setActiveComponent="setActiveComponent" v-if="activeComponent === 'main'" />
      <TestonePluginView @setActiveComponent="setActiveComponent" v-else />
    </div>
  </template>
<script>
import TestonePluginView from './TestonePlugin.vue';
import TestonePluginMain from './TestoneMain.vue';

export default {
  name: 'TestonePlugin',
  components: {
    TestonePluginView,
    TestonePluginMain,
  },
  data() {
    return {
      activeComponent: 'main',
    };
  },
  methods: {
    setActiveComponent(component) {
      this.activeComponent = component;
    },
  },
};
</script>
  <style></style>
