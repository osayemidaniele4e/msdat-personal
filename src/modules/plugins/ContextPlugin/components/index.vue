<template>
    <div>
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
