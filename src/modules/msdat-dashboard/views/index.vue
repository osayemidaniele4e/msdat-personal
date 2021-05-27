<template>
  <div>
    <router-view v-if="loading"></router-view>
    <h1 v-else>loading</h1>
  </div>
</template>

<script>
import { MSDAT } from '@/config/dashboardGroups';

export default {
  data() {
    return {
      loading: false,
    };
  },
  async mounted() {
    this.loading = false;
    await this.$DL.init({
      dashboardIndicators: MSDAT.indicators,
      defaultIndicators: MSDAT.defaultIndicators,
    });
    this.loading = true;
  },
};
</script>

<style lang="scss" scoped>
</style>
