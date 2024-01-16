<template>
  <div class="textbox-container">
    <textarea
      class="prompt"
      placeholder="Prompt Policy
"
      v-model="text"
    >
    </textarea>
    <button @click="sendFollowUp">send</button>
    <!-- <b-icon class="" style="color: black" icon="caret-down-fill" /> -->
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import PolicyService from '../services';

export default {
  name: 'Prompt',
  data() {
    return {
      text: '',
    };
  },
  computed: {
    ...mapGetters('MSDAT_STORE', ['getIsResponding', 'getConversation']),
  },
  methods: {
    ...mapMutations('MSDAT_STORE', ['SET_ISRESPONDING', 'PUSH_CONVERSATION']),

    async sendFollowUp() {
      const PolicySimulatorInstance = new PolicyService();

      if (this.text === '') return;
      await this.SET_ISRESPONDING(true);
      // create and push user reply
      const reply = await PolicySimulatorInstance.createUserResponse(this.text);
      await this.PUSH_CONVERSATION(reply);
      // generate response from gpt
      const { response } = await PolicySimulatorInstance.generateReply(
        this.getConversation,
        this.text,
      );
      // create and push gpt reply
      const message = await PolicySimulatorInstance.createSimulatedResponse(response);
      await this.PUSH_CONVERSATION(message);
      await this.SET_ISRESPONDING(false);
    },
  },
};
</script>

<style scoped lang="scss">
.textbox-container {
  width: 100%;
  display: flex;

  button {
    padding-inline: 20px;
  }
  .prompt {
    width: 100%;
    border: 1px solid #d9d9d9;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    background-color: white;
    border-radius: 10px;
  }
  .prompt::placeholder {
    text-align: start;
  }
}
</style>
