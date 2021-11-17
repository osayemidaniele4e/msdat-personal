<template>
  <div>
    <the-header />
    <main class="container main_field">
      <!-- <Tableau
        :url="url"
        :width="width"
        ref="tableau"
      ></Tableau> -->
      <br />
         <Tableau
        :url="url2"
        :width="width"
        ref="tableau"
      ></Tableau>
    </main>
    <the-footer />
  </div>
</template>

<script>
import theHeader from '../msdat-dashboard/views/about/layout/theHeader.vue';
import theFooter from '../msdat-dashboard/views/about/layout/theFooter.vue';

export default {
  name: 'Testing',
  components: {
    theHeader,
    theFooter,
    // Tableau,
  },
  data() {
    return {
      url: 'https://public.tableau.com/views/DemographicsDraft1/Dashboard1',
      url2: 'https://public.tableau.com/views/UpdatedDemographic1/Population',
      width: 1300,
    };
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
main.main_field {
  // min-height: calc(100vh - 200px);
  // display: flex;
  // justify-content: center;
  width: 100%;
}
</style>
