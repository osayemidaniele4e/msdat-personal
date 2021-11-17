<template>
  <div>
    <MSDAT
      v-if="Object.entries(configObject).length"
      :indicators="configObject.indicators"
      :dataSources="configObject.dataSources"
      :defaultIndicators="configObject.defaultIndicators"
      :initialIndicator="configObject.initialIndicator"
      :initialDataSource="configObject.initialDataSource"
      :initialLocation="configObject.initialLocation"
      :showTableRelatedIndicator="
        configObject.showTableRelatedIndicator != undefined
          ? configObject.showTableRelatedIndicator
          : true
      "
    >
      <template v-slot:top-section v-if="configObject.name === 'Demographic'">
        <div class="col-md-12">
          <base-sub-card :backgroundColor="'#348481'" class="my-2 shadow-sm">
            <template #title>
              <h5 class="font-weight-bold work-sans text-white">Demographic</h5>
            </template>
            <template>
              <main class="container main_field">
                <Tableau :url="url" :width="width" ref="tableau"></Tableau>
              </main>
            </template>
          </base-sub-card>
        </div>
      </template>
    </MSDAT>
  </div>
</template>

<script>
import instance from '@/modules/msdat-dashboard/views/dashboard/instance.vue';
import config from './config/dashboard_config';

export default {
  name: 'DynamicDashboard',
  components: {
    MSDAT: instance,
  },
  data() {
    return {
      dashboardConfig: config,
      configObject: {}, // This should be an Object initially
      url: 'https://public.tableau.com/views/UpdatedDemographic1/Population',
      width: '100vw',
      height: '45vh',
    };
  },
  mounted() {
    const { name } = this.$route.params;
    // this.$route.meta.title = 'Hello World From Route';
    this.configObject = this.dashboardConfig.find((item) => item.name === name);
    if (this.configObject === undefined) {
      this.$router.push('/*');
    }
    if (this.configObject.title) {
      this.$route.meta.title = this.configObject.title;
    }
  },
  watch: {
    $route(to, from) {
      // react to route changes...
      if (to !== from) {
        window.location.reload();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
main.main_field {
  min-height: 45vh;
  // display: flex;
  // justify-content: center;
  width: 100%;
}
</style>
