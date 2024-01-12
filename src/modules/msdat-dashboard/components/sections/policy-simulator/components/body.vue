<template>
  <div v-if="false" class="body">
    <div class="policy">
      <div class="simulatorId">
        <div class="icon">P</div>
        <p>Policy Simulator</p>
      </div>
      <div v-for="(policy, index) in policies" :key="index">
        <strong class="title">{{ policy.title }}</strong>
        <div>{{ policy.description }}</div>
        <br />
      </div>
    </div>
  </div>
  <!-- if no response render the intro -->
  <div v-else class="intro">
    <img class="robot" src="../assets/Robot.svg" alt="" />
    <p>What Policies can I help you with today?</p>
    <Steps :steps="steps" />
  </div>
</template>

<script>
import Steps from './Steps.vue';

export default {
  name: 'Body',
  props: {
    steps: {
      type: Array,
      required: true,
    },
    policies: {
      type: Array,
      required: true,
    },
  },
  components: { Steps },
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss">
.body {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 320px);
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
    overflow-y: auto;
    padding-inline: 200px;
    width: 100%;
    .simulatorId {
      display: flex;
      gap: 5px;
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
      p {
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

  p {
    font-size: 24px;
    margin-top: 10px;
  }
  .robot {
    margin-top: -30px;
  }
}
</style>
