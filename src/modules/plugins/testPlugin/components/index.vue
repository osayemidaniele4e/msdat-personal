<template>
    <div v-show="isEnabled">
      <TestPluginMain @setActiveComponent="setActiveComponent" v-if="activeComponent === 'main'" />
      <TestPluginView @setActiveComponent="setActiveComponent" v-else />
    </div>
  </template>
<script>
import TestPluginView from './TestPlugin.vue';
import TestPluginMain from './TestMain.vue';

export default {
  name: 'ContextPlugin',
  components: {
    TestPluginView,
    TestPluginMain,
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
