<template>
  <div class="px-lg-5 px-md-3 container-fluid">
    <div class="card border-0 shadow p-5 my-4">
      <panel />
      <accordions />
    </div>
  </div>
</template>

<script lang="js">
import panel from '../components/control-panel.vue';
import accordions from '../components/accordions.vue';

export default {
  name: '',
  components: {
    panel,
    accordions,
  },
  data() {
    return {

    };
  },
};
</script>
