<template>
  <div class="crate">
    <Header></Header>
    <Body></Body>
    <div class="promptPolicyContainer" >
      <Prompt></Prompt>
    </div>
    <!-- <PolicySidebar></PolicySidebar> -->
  </div>
</template>

<script>
import Header from './components/header.vue';
import Body from './components/body.vue';
import Prompt from './components/prompt.vue';
import PolicySidebar from './components/sidebar.vue';

export default {
  name: 'PolicySimulator',
  components: {
    Header,
    Body,
    Prompt,
    PolicySidebar,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.promptPolicyContainer {
  margin-inline: 200px;
}
</style>
