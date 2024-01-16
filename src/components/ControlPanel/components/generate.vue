<template>
  <button :disabled="getIsGenerating" @click="generate()">Generate</button>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import PolicyService from '@/modules/msdat-dashboard/components/sections/policy-simulator/services';

export default {
  name: 'Generate',
  computed: {
    ...mapGetters('MSDAT_STORE', ['getIsGenerating', 'getConversation']),
    payload() {
      if (this.groupIndex != null) {
        return this.$store.state.MSDAT_STORE.controlConfig[5].payload[this.groupIndex];
      }
      return this.$store.state.MSDAT_STORE.controlConfig[5].payload;
    },
  },
  methods: {
    ...mapMutations('MSDAT_STORE', ['SET_ISGENERATING', 'PUSH_CONVERSATION', 'CLEAR_CONVERSATION']),
    async generate() {
      if (this.getConversation.length !== 0) {
        this.CLEAR_CONVERSATION();
      }
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

      // get message from gpt
      const message = await PolicySimulatorInstance.createSimulatedResponse(response);
      await this.PUSH_CONVERSATION(message);
      // push message coversation state
      await this.SET_ISGENERATING(false);
    },
  },
};
</script>
<style scoped>
button {
  border-radius: 5px;
}
</style>
