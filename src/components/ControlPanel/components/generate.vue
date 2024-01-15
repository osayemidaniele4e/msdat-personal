<template>
  <button :disabled="getIsGenerating" @click="generate()">Generate</button>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import PolicyService from '@/modules/msdat-dashboard/components/sections/policy-simulator/services';

export default {
  name: 'Generate',
  computed: {
    ...mapGetters('MSDAT_STORE', [
      'getConfigObject',
      'getSelectedConfig',
      'getLoadingStatus',
      'getIsGenerating',
    ]),
    payload() {
      if (this.groupIndex != null) {
        return this.$store.state.MSDAT_STORE.controlConfig[5].payload[this.groupIndex];
      }
      return this.$store.state.MSDAT_STORE.controlConfig[5].payload;
    },
  },
  methods: {
    ...mapMutations('MSDAT_STORE', ['SET_ISGENERATING', 'PUSH_CONVERSATION']),
    async generate() {
      await this.SET_ISGENERATING(true);
      const datasourceId = this.payload.datasource.id;
      const period = this.payload.year;
      const indicatorId = this.payload.indicator.id;
      const locationId = this.payload.location.id;
      const PolicySimulatorInstance = new PolicyService();
      const data = await PolicySimulatorInstance.getDataByQuery(
        indicatorId,
        datasourceId,
        period,
        // eslint-disable-next-line comma-dangle
        locationId
      );

      const value = data[0].value;
      const healthIndicator = this.payload.indicator.full_name;
      const location = this.payload.location.name;

      console.log(data, value, healthIndicator, location);
      const { response } = await PolicySimulatorInstance.generateResponse(
        healthIndicator,
        location,
        // eslint-disable-next-line comma-dangle
        value
      );
      const message = await PolicySimulatorInstance.createSimulatedResponse(response);
      await this.PUSH_CONVERSATION(message);
      await this.SET_LOADING_POLICY(false);
    },
  },
};
</script>
<style scoped></style>
