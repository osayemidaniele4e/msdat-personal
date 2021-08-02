<template>
  <div class="">
      <base-sub-card showControls>
        <template #title>
          <h6 class="text-dark">
            Distribution of
            <span class="font-weight-bold"></span>Across the
            <span class="font-weight-bold"> zones in the Country.</span> Source:
            <span class="font-weight-bold">
              </span
            >
          </h6>
        </template>
        <BarChart ref="chartRef" />
      </base-sub-card>

  </div>
</template>

<script>
import BarChart from '@/components/Barchart/BaseBarChart.vue';

export default {
  components: {
    BarChart,
  },
  props: {
    controlPanelProps: {
      types: Object,
      default() {
        return {};
      },
    },
  },

  methods: {
    plot() {

    },
  },

  watch: {
    controlPanelProps: {
      handler(val) {
        console.log(val);
      },

      deep: true,
    },
  },
};
</script>
