<template>
  <div class="chatarea">
    <Body :steps="steps" :conversation="getConversation"></Body>
    <div v-if="getConversation.length != 0" class="promptPolicyContainer">
      <Prompt></Prompt>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Body from './components/body.vue';
import Prompt from './components/prompt.vue';

export default {
  name: 'PolicySimulator ',
  components: {
    Body,
    Prompt,
  },
  data() {
    return {
      steps: [
        { desc: 'Select Indicator and necessary filters' },
        { desc: 'Click on “Generate" button' },
        { desc: 'View and Interact with the Simulator' },
      ],
    };
  },
  computed: {
    ...mapGetters('MSDAT_STORE', ['getConversation']),
  },
};
</script>

<style lang="scss" scoped>
.chatarea {
  position: relative;
  width: 100%;
  background-color: #dff3f3;
  .promptPolicyContainer {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 20px;
    padding-inline: 200px;
    width: 100%;
  }
}
</style>
