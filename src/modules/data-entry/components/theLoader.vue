<template>
  <div class="loadingio-spinner-dual-ring-44x2g2isxmu">
    <div class="ldio-7hsu63xud14">
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
@keyframes ldio-7hsu63xud14 {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
.ldio-7hsu63xud14 div {
  box-sizing: border-box !important;
}
.ldio-7hsu63xud14 > div {
  position: absolute;
  width: 42px;
  height: 42px;
  top: 29px;
  left: 29px;
  border-radius: 50%;
  border: 2px solid #000;
  border-color: #1496b1 transparent #1496b1 transparent;
  animation: ldio-7hsu63xud14 1s linear infinite;
}
.ldio-7hsu63xud14 > div:nth-child(2) {
  border-color: transparent;
}
.ldio-7hsu63xud14 > div:nth-child(2) div {
  position: absolute;
  width: 100%;
  height: 100%;
  transform: rotate(45deg);
}
.ldio-7hsu63xud14 > div:nth-child(2) div:before,
.ldio-7hsu63xud14 > div:nth-child(2) div:after {
  content: '';
  display: block;
  position: absolute;
  width: 2px;
  height: 2px;
  top: -2px;
  left: 18px;
  background: #1496b1;
  border-radius: 50%;
  box-shadow: 0 40px 0 0 #1496b1;
}
.ldio-7hsu63xud14 > div:nth-child(2) div:after {
  left: -2px;
  top: 18px;
  box-shadow: 40px 0 0 0 #1496b1;
}
.loadingio-spinner-dual-ring-44x2g2isxmu {
  width: 64px;
  height: 64px;
  display: inline-block;
  overflow: hidden;
  /* background: #ffffff; */
}
.ldio-7hsu63xud14 {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(0.64);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
}
.ldio-7hsu63xud14 div {
  box-sizing: content-box;
}
</style>
