<template>
  <div class="row">
    <div class="col-md-8">
      <ZonalColumnChart :controlPanelProps="controlPanelProps" :colors="regionalColor" />
    </div>
    <div class="col-md-4" @click="handleMapClick">
      <ZonalMap :controlPanelProps="controlPanelProps" :colors="regionalColor" />
    </div>
  </div>
</template>

<script>
import { eventBus } from '@/main';
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
          color: '#89d880',
        },
        {
          id: 3,
          color: '#8ab9bb',
        },
        {
          id: 7,
          color: '#7D8ADE',
        },
        {
          id: 4,
          color: '#5c3819',
        },
        {
          id: 5,
          color: '#f872a0',
        },
        {
          id: 6,
          color: '#e1e164',
        },
        // this code introduces the numbers showing in the zonal barchart bug - it has been reverted a couple of times.
        // { id: 7, color: '#7d8ade' },
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
  methods: {
    handleMapClick(e) {
      const point = e.point['hc-key'];
      const selectedPlaceByZone = this.dlGetLocation({ level: 2 }).filter(
        (val) => val.name === point,
      );

      const selectedPlaceByState = this.dlGetLocation({ level: 3 }).filter(
        (val) => val.name === point,
      );

      const selectedPlace
        = selectedPlaceByZone.length === 0 ? selectedPlaceByState : selectedPlaceByZone;

      if (selectedPlace.length !== 0) {
        eventBus.$emit('handleClick', selectedPlace[0]);
      }
    },
  },
};
</script>

<style></style>
