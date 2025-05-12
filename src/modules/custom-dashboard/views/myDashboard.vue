<!-- Auther: Ghufran Ahmed -->
<template>
  <div>
    <div
      v-if="
        $route.name === 'preference-table' ||
        $route.name === 'my-dashboard-details' ||
        $route.name === 'data-table' ||
        $route.name === 'embed-dashboard' ||
        $route.name === 'sections'
      "
    >
      <stepper />
    </div>
    <div v-if="$store.state.CUSTOM_DASHBOARD_STORE.editMode" class="text-center">
      <span class="w-100 bg-warning text-white d-block small">Edit Mode</span>
    </div>
    <router-view class="mt-5" />
  </div>
</template>

<script>
import stepper from '../components/stepper.vue';

export default {
  components: {
    stepper,
  },
  data() {
    return {};
  },
};
</script>
