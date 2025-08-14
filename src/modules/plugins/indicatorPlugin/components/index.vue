<template>
    <div v-show="isEnabled">
      <IndicatorPluginMain @setActiveComponent="setActiveComponent" v-if="activeComponent === 'main'" />
      <IndicatorPluginView @setActiveComponent="setActiveComponent" v-else />
    </div>
  </template>
<script>
import IndicatorPluginView from './IndicatorPlugin.vue';
import IndicatorPluginMain from './IndicatorMain.vue';

export default {
  name: 'ContextPlugin',
  components: {
    IndicatorPluginView,
    IndicatorPluginMain,
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
