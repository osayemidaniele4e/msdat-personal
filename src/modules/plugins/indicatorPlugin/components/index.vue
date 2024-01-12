<template>
    <div>
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
