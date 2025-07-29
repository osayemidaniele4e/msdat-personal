<template>
  <div>
    <AccessibilityMain @setActiveComponent="setActiveComponent" v-show="activeComponent === 'main'" />
    <AccessibilityPlugin @setActiveComponent="setActiveComponent" v-show="activeComponent === 'plugin'" />
  </div>
</template>

<script>
import AccessibilityPlugin from './AccessibilityPlugin.vue';
import AccessibilityMain from './AccessibilityMain.vue';

export default {
  name: 'AccessibilityActive',
  components: {
    AccessibilityMain,
    AccessibilityPlugin,
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
