<template>
  <div>
    <MSDAT
      :indicators="[51, 52, 53, 54, 55]"
      :dataSources="[17]"
      :defaultIndicators="[51, 52, 53]"
      :initialIndicator="51"
      :initialDataSource="17"
      :initialLocation="1"
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
