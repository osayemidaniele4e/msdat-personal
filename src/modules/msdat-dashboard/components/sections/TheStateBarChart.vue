<template>
 <b-overlay :show="loading">
  <SubCard showControls>
    <template #title>
      <h6 class="work-sans">
        Distribution Of
        <b>{{ values.indicator.short_name}}</b> Across The Country. Source:<b>
          {{ values.datasource.datatsource}} {{ values.year}}</b>
      </h6>
    </template>
    <BarChart :chartOptions="BarChartOptions" />
  </SubCard>
  </b-overlay>
</template>

<script>
import SubCard from '@/components/ui-components/SubCard.vue';
import BarChart from '@/components/Barchart/BaseBarChart.vue';
import formatter from '../../mixins/formatter';

export default {
  mixins: [formatter],
  components: {
    SubCard,
    BarChart,
  },
  data() {
    return {
      BarChartOptions: {},
      loading: false,
    };
  },
  props: {
    /**
     * input values
     */
    values: {
      type: [Object, String, Array],
      required: true,
    },
  },
  watch: {
    values: {
      async handler(newValues) {
        this.loading = true;
        console.log({ newValues });
        const data = await this.getData(newValues);
        debugger;
        this.BarChartOptions = this.genHighChartOption(data, {
          target: {
            value: this.dlGetIndicator(newValues.indicator.id).national_target,
          },
        });
        this.loading = false;
      },
      deep: true,
    },
  },
  methods: {
    async getData(optionsObject) {
      const {
        datasource, indicator, location, year,
      } = optionsObject;
      let locationValue = location;
      if (location.id === 1) {
        locationValue = { level: 3 };
      }
      const data = await this.dlQuery({
        datasource: datasource.id,
        indicator: indicator.id,
        period: year,
        value_type: 2,
        location: locationValue,
      });
      return data;
    },
  },
};
</script>

<style lang="scss" scoped></style>
