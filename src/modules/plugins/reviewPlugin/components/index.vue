<template>
    <div v-show="isEnabled">
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
