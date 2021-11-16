<template>
  <div class="loadingio-spinner-dual-ring-ltsy8nvsuyf">
    <div class="ldio-p8d3fx1wfbo">
      <div></div>
      <div><div></div></div>
    </div>
  </div>
  <!-- <div>{{ text }}</div> -->
</template>
<script>
export default {
  props: {
    text: {
      required: false,
      type: String,
      default: 'Loading',
    },
  },
};
</script>

<style scoped>
@keyframes ldio-p8d3fx1wfbo {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
.ldio-p8d3fx1wfbo div {
  box-sizing: border-box !important;
}
.ldio-p8d3fx1wfbo > div {
  position: absolute;
  width: 57px;
  height: 57px;
  top: 55px;
  left: 108.5px;
  border-radius: 50%;
  border: 3.8px solid #000;
  border-color: #1496b1 transparent #1496b1 transparent;
  animation: ldio-p8d3fx1wfbo 1s linear infinite;
}
.ldio-p8d3fx1wfbo > div:nth-child(2) {
  border-color: transparent;
}
.ldio-p8d3fx1wfbo > div:nth-child(2) div {
  position: absolute;
  width: 100%;
  height: 100%;
  transform: rotate(45deg);
}
.ldio-p8d3fx1wfbo > div:nth-child(2) div:before,
.ldio-p8d3fx1wfbo > div:nth-child(2) div:after {
  content: '';
  display: block;
  position: absolute;
  width: 3.8px;
  height: 3.8px;
  top: -3.8px;
  left: 22.799999999999997px;
  background: #1496b1;
  border-radius: 50%;
  box-shadow: 0 53.199999999999996px 0 0 #1496b1;
}
.ldio-p8d3fx1wfbo > div:nth-child(2) div:after {
  left: -3.8px;
  top: 22.799999999999997px;
  box-shadow: 53.199999999999996px 0 0 0 #1496b1;
}
.loadingio-spinner-dual-ring-ltsy8nvsuyf {
  width: 190px;
  height: 190px;
  display: inline-block;
  overflow: hidden;
  background: #ffffff;
}
.ldio-p8d3fx1wfbo {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
}
.ldio-p8d3fx1wfbo div {
  box-sizing: content-box;
}
</style>