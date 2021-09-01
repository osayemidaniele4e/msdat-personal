<template>
  <div>
    <MSDAT
      :indicators="[51, 52, 53, 54, 55]"
      :dataSource="[17]"
      :defaultIndicators="[51, 52, 53]"
    />
  </div>
</template>

<script>
import instance from '@/modules/msdat-dashboard/views/dashboard/instance.vue';

export default {
  name: 'nhfs',
  components: {
    MSDAT: instance,
  },
};
</script>

<style lang="scss" scoped>
</style>
