<template>
  <div class="chatarea">
    <Header></Header>
    <Body></Body>
    <div class="promptPolicyContainer">
      <Prompt></Prompt>
    </div>
    <!-- <PolicySidebar></PolicySidebar> -->
  </div>
</template>

<script>
import Header from './components/header.vue';
import Body from './components/body.vue';
import Prompt from './components/prompt.vue';
// import PolicySidebar from './components/sidebar.vue';

export default {
  name: 'PolicySimulator',
  components: {
    Header,
    Body,
    Prompt,
    // PolicySidebar,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.chatarea {
  position: relative;
  width: 100%;
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
