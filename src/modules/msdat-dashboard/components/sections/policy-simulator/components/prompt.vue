<!-- eslint-disable no-tabs -->
<template>
  <form @submit.prevent="sendFollowUp" class="textbox-container">
    <input
      class="prompt"
      placeholder="Prompt Policy
"
      v-model="text"
    />
    <button :disabled="getIsResponding && !getIsTypingEffect">
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="32px"
        height="32px"
        viewBox="0 0 44 32"
        enable-background="new 0 0 44 32"
        xml:space="preserve"
      >
        <g>
          <path
            fill="#FFFFFF"
            d="M30.045,11.231c-4.661-2.814-8.816-3.196-10.33-3.232L20,1.539c0-0.928-0.86-1.502-1.658-1.502
		c-0.378,0-0.724,0.122-0.997,0.35L0.56,14.271c-0.315,0.263-0.489,0.638-0.492,1.055c-0.003,0.461,0.212,0.922,0.575,1.234
		l16.686,14.246c0.273,0.235,0.633,0.364,1.014,0.364c0.797,0,1.657-0.574,1.657-1.501l0.009-9.183
		c16.978,0.209,22.968,11.061,23.027,11.171c0.089,0.167,0.262,0.265,0.442,0.265c0.063,0,0.128-0.012,0.19-0.038
		c0.237-0.098,0.362-0.359,0.289-0.605C41.132,21.846,36.452,15.101,30.045,11.231z M38.507,25.304
		c-3.487-2.656-9.614-5.822-18.998-5.822c-0.276,0-0.5,0.224-0.5,0.5L19,29.667c0,0.296-0.346,0.502-0.657,0.502
		c-0.1,0-0.244-0.021-0.363-0.124L1.293,15.8c-0.14-0.121-0.227-0.3-0.226-0.468c0.001-0.122,0.046-0.221,0.132-0.292L17.985,1.156
		c0.117-0.098,0.259-0.119,0.357-0.119c0.311,0,0.658,0.206,0.658,0.48l-0.307,6.961c-0.006,0.141,0.047,0.277,0.147,0.377
		C18.935,8.948,19.062,9,19.193,9c0.016,0-0.06-0.005,0.255-0.005c1.164,0,5.33,0.223,10.08,3.092
		c5.487,3.314,9.672,8.843,12.467,16.458C41.151,27.58,40.003,26.444,38.507,25.304z"
          />
        </g>
      </svg>
    </button>
  </form>
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
    ...mapGetters('MSDAT_STORE', ['getIsResponding', 'getConversation', 'getIsTypingEffect']),
  },
  methods: {
    ...mapMutations('MSDAT_STORE', ['SET_ISRESPONDING', 'PUSH_CONVERSATION']),

    async sendFollowUp() {
      const PolicySimulatorInstance = new PolicyService();
      if (this.text === '') return;
      if (this.getIsResponding) return;
      if (this.getIsTypingEffect) return;
      try {
        const reply = PolicySimulatorInstance.createUserResponse(this.text);
        this.text = '';
        await this.PUSH_CONVERSATION(reply);
        // set is responding to true
        await this.SET_ISRESPONDING(true);
        // generate response from gpt

        // todo: simulate is typing message

        const { response } = await PolicySimulatorInstance.generateReply(
          this.getConversation,
          // eslint-disable-next-line comma-dangle
          reply.message
        );
        // create and push user reply

        // create and push gpt reply
        const message = PolicySimulatorInstance.createSimulatedResponse(response);
        // set is respondinf to false as message has been generated
        await this.SET_ISRESPONDING(false);
        await this.PUSH_CONVERSATION(message);
      } catch (error) {
        await this.SET_ISRESPONDING(false);
        const message = PolicySimulatorInstance.createErrorResponse(
          // eslint-disable-next-line comma-dangle
          'An error occured, Please, try again'
        );
        await this.PUSH_CONVERSATION(message);
      }
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
    border-radius: 10px;
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
