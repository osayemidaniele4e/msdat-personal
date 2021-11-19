<template>
  <div class="row">
    <div class="col-md-8">
      <ZonalColumnChart
        :controlPanelProps="controlPanelProps"
        :colors="regionalColor"
      />
    </div>
    <div class="col-md-4">
      <ZonalMap
        :controlPanelProps="controlPanelProps"
        :colors="regionalColor"
      />
    </div>
  </div>
</template>

<script>
import ZonalMap from './map.vue';
import ZonalColumnChart from './zonalSection.vue';

export default {
  data() {
    return {
      regionalColor: [
        {
          id: 1,
          color: 'black',
        },
        {
          id: 2,
          color: '#737A33',
        },
        {
          id: 3,
          color: '#8B9A9B',
        },
        {
          id: 7,
          color: '#7D8ADE',
        },
        {
          id: 4,
          color: '#9E7796',
        },
        {
          id: 5,
          color: '#54858D',
        },
        {
          id: 6,
          color: '#CCCC17',
        },
      ],
    };
  },
  props: {
    controlPanelProps: {
      type: Object,
      required: true,
    },
  },
  components: {
    ZonalMap,
    ZonalColumnChart,
  },
};
</script>

<style>
</style>
