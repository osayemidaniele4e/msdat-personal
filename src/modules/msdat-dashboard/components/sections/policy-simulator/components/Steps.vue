<template>
  <div class="container">
    <div v-for="(step, i) in steps" :key="i" class="stepGroup">
      <div class="circle">{{ i + 1 }}</div>
      <div class="hero">{{ step.desc }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Steps',
  props: {
    steps: {
      type: Array,
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped lang="scss">
.container {
  width: 100%;
  display: flex;
  justify-content: space-around;
  .stepGroup {
    position: relative;
    .circle {
      position: absolute;
      border-radius: 50%;
      background-color: #348481;
      height: 32px;
      width: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      left: -12px;
      top: -12px;
    }
    .hero {
      background-color: #d9d9d9;
      width: 180px;
      height: 80px;
      text-align: start;
      display: flex;
      align-items: center;
      padding-inline: 20px;
      border-radius: 10px;
      border: 1px solid #348481;
    }
  }
}
</style>
