<template>
  <div @mouseover="showText = true" @mouseleave="showText = false" class="mainWrapper">
    <div class="detail" v-if="showText === true">Create a custom report</div>
    <div @click="handleClick" class="wrapper">
      <b-icon icon="file-earmark-text" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReportBuilderMainLauncher',
  data() {
    return {
      showText: false,
    };
  },
  methods: {
    handleClick() {
      this.$emit('setActiveComponent', 'main');
    },
  },
};
</script>

<style scoped>
.mainWrapper {
  position: fixed;
  z-index: 9999;
  right: 5rem;
  bottom: 6rem;
  display: flex;
  align-items: center;
}
.wrapper {
  height: 70px;
  width: 70px;
  background-color: #1c6d90;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.wrapper:hover {
  background-color: #20946b;
}
.wrapper svg {
  color: #ffffff;
  font-size: 36px;
}
.mainWrapper .detail {
  background-color: #ffffff;
  margin-right: 10px;
  padding: 2px 10px;
  font: normal normal normal 16px/19px Work Sans;
  letter-spacing: 0px;
  color: #262626;
}
</style>
