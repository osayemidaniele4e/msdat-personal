<template>
  <div v-show="isEnabled">
      <ScreenshotManagerMain @setActiveComponent="setActiveComponent" v-show="activeComponent === 'main'" />
      <ScreenshotManagerPlugin @setActiveComponent="setActiveComponent" v-show="activeComponent === 'plugin'" />
    </div>
  </template>

<script>
import ScreenshotManagerPlugin from './ScreenshotManagerPlugin.vue';
import ScreenshotManagerMain from './ScreenshotManagerMain.vue';

export default {
  name: 'ScreenshotManagerActive',
  components: {
    ScreenshotManagerMain,
    ScreenshotManagerPlugin,
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
