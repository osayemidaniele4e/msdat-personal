<template>
    <div>
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
