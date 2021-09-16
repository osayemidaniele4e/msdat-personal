<template>
  <base-overlay :show="loading">
    <base-sub-card
      showControls
      v-if="values"
      @dropdownTypeSelected="
        downLoadType($event, {
          indicator: values.indicator.short_name,
          datasource: values.datasource.datatsource,
          year: values.year,
        })
      "
    >
      <template #title>
        <p class="work-sans mb-0 line-height">
          Distribution Of
          <b>{{ values.indicator.short_name }}</b> Across The Country. Source:<b>
            {{ values.datasource.datatsource }} {{ values.year }}</b
          >
        </p>
      </template>
      <BarChart ref="BaseChart" :chartOptions="BarChartOptions" />
    </base-sub-card>
  </base-overlay>
</template>

<script>
import BarChart from '@/components/Barchart/BaseBarChart.vue';
import formatter from '@/modules/msdat-dashboard/mixins/formatter';
import chartDownload from '../../../mixins/chart_download';

export default {
  mixins: [chartDownload, formatter],
  components: {
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
        const data = await this.getData(newValues);
        this.BarChartOptions = this.genHighChartOption(data, {
          target: {
            value: this.dlGetIndicator(newValues.indicator.id).national_target,
          },
        });
        this.loading = false;
      },
      deep: true,
      immediate: true,
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
        location: locationValue,
      });
      return data;
    },
  },
};
</script>

<style lang="scss" scoped></style>
