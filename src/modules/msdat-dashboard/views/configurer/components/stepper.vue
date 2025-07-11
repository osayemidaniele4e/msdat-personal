<template>
  <div class="steps">
    <div v-for="data in steps" :key="data.step">
      <span v-if="data.step > 1" class="dash d-none d-lg-inline-block"></span>
      <div class="d-inline-block">
        <span
          class="point"
          :class="{done: data.step < activeStep}"
        >{{ data.step }}</span>
        <small
          class="label"
          :class="{active: data.step === activeStep, done: data.step < activeStep}"
        >{{ data.label }}</small>
      </div>
    </div>
  </div>
</template>

<script>
import { steps } from '../router';

export default {
  data() {
    return {
      steps,
    };
  },
  computed: {
    activeStep() {
      return this.$route.meta.step;
    },
  },
  mounted() {
    console.log(steps);
  },
};
</script>

<style lang="scss" scoped>
.steps {
  padding: 50px;
  display: flex;
  justify-content: center;
  .point {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    color: black;
    border-radius: 50%;
    padding-top: 1.5px;
    border: 1px solid #838383;
    display: inline-block;
  }
  .point.done {
    background-color: black;
    color: white;
    border-color: black;
  }
  .dash {
    width: 32px;
    margin: 0 10px 3px 0;
    border: 1px solid #666666;
  }
  .label {
    padding: 0 10px;
    display: inline-block;
    font-weight: 600;
    font-size: 1rem;
    color: #838383;
  }
  .label:is(.done, .active) {
    color: black;
  }
}
</style>
