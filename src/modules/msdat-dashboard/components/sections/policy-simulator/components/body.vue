<template>
  <div>
    <div v-if="conversation.length !== 0" class="body">
      <div class="policy" v-for="(message, index) in conversation" :key="index">
        <div class="simulatorId" v-if="message.user">
          <div class="icon">Y</div>
          <p class="name">You</p>
        </div>
        <div class="simulatorId" v-else>
          <div class="icon">P</div>
          <p class="name">Policy Simulator</p>
        </div>
        <div v-if="message.user">
          <p class="message">{{ message.message }}</p>
          <br />
        </div>
        <div v-else>
          <TyperVue :text="message.message" />
          <!-- <p class="message">{{ message.message }}</p> -->
          <br />
        </div>
      </div>
    </div>
    <!-- if no response render the intro -->
    <div v-else class="intro">
      <img class="robot" src="../assets/Robot.svg" alt="" />
      <div class="hero" v-if="getIsGenerating">
        <div class="myloader">
          <TheLoader text="Please Wait" />
        </div>
        <p class="hero-text">Generating</p>
      </div>
      <div class="hero" v-else>
        <p class="hero-text">What Policies can I help you with today?</p>
        <Steps :steps="steps" />
      </div>
    </div>
  </div>
</template>

<script>
import TheLoader from '@/modules/custom-dashboard/components/Loading/TheLoader.vue';
import { mapGetters } from 'vuex';
import Steps from './Steps.vue';
import TyperVue from './Typer.vue';

export default {
  name: 'Body',
  props: {
    steps: {
      type: Array,
      required: true,
    },
    conversation: {
      type: Array,
      required: true,
    },
  },
  components: {
    Steps,
    TheLoader,
    TyperVue,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters('MSDAT_STORE', ['getIsGenerating', 'getIsResponding']),
  },
};
</script>

<style scoped lang="scss">
div {
  .body {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 320px);
    overflow-y: auto;
    padding-bottom: 150px;
    .response {
      padding-inline: 150px;
      padding-block: 10px;
      background-color: #d9d9d9;
      font-size: 14px;
      div {
        padding-inline: 50px;
        border-left: 1px solid black;
        border-right: 1px solid black;
      }
    }
    .policy {
      margin-top: 40px;
      flex: 1;
      padding-inline: 200px;
      width: 100%;

      .message {
        white-space: pre-line;
        font-size: 18px;
      }
      .simulatorId {
        display: flex;
        gap: 5px;

        .name {
          font-size: 20px;
          font-weight: 600;
        }
        .icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: #348481;
          font-size: 24px;
          color: white;
        }
        .hero-text {
          font-size: 20px;
          font-weight: 600;
        }
      }
    }
  }

  .intro {
    // background: #dff3f3;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: calc(100vh - 320px);

    .hero {
      width: 100%;
      p {
        text-align: center;
        font-size: 24px;
        margin-top: 20px;
      }
      .myloader {
        text-align: center;
      }
    }

    .robot {
      margin-top: -30px;
    }
  }
}
</style>
