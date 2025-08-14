<template>
    <div v-show="isEnabled">
      <ContextPluginMain @setActiveComponent="setActiveComponent" v-if="activeComponent === 'main'" />
      <ContextPluginView @setActiveComponent="setActiveComponent" v-else />
    </div>
  </template>
<script>
import ContextPluginView from './ContextPlugin.vue';
import ContextPluginMain from './ContextMain.vue';

export default {
  name: 'ContextPlugin',
  components: {
    ContextPluginView,
    ContextPluginMain,
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
      // stop tasks/listeners here if any
    },
    onPluginEnable() {
      this.isEnabled = true;
      // restart tasks/listeners here if any
    },
  },
};
</script>
  <style></style>
