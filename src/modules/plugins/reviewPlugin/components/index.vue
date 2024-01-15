<template>
    <div>
      <ReviewPluginMain @setActiveComponent="setActiveComponent" v-if="activeComponent === 'main'" />
      <ReviewPluginView @setActiveComponent="setActiveComponent" v-else />
    </div>
  </template>
<script>
import ReviewPluginView from './ReviewPlugin.vue';
import ReviewPluginMain from './ReviewMain.vue';

export default {
  name: 'ContextPlugin',
  components: {
    ReviewPluginView,
    ReviewPluginMain,
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
