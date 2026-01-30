<template>
    <div v-show="isEnabled">
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
      isEnabled: true,
    };
  },
  methods: {
    setActiveComponent(component) {
      this.activeComponent = component;
    },
    onPluginDisable() {
      this.isEnabled = false;
    },
    onPluginEnable() {
      this.isEnabled = true;
    },
  },
};
</script>
  <style></style>
