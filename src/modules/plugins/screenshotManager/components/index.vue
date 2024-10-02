<template>
    <div>
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
    };
  },
  methods: {
    setActiveComponent(component) {
      this.activeComponent = component;
    },
  },
};
</script>
