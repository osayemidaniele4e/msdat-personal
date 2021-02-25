<template>
    <div>
        <h1>MSDAT DASHBOARD</h1>
        <map-component
            :mapLevel="mapOptions.level"
            :mapType="mapOptions.type"
            :mapData="mapOptions.data"
        />
    </div>
</template>

<script>
import MapComponent from '../components/map/MapComponent.vue';
import ZonalMap from '../components/map/js/svg/ng_zonal';
import ZonalMapData from '../components/map/js/data/zonal_data';

export default {
  components: { MapComponent },
  data() {
    return {
      mapOptions: {
        level: 2,
        type: ZonalMap,
        data: ZonalMapData,
      },
    };
  },
};
</script>

<style lang="scss" scoped>

</style>
