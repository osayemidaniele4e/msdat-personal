<template>
  <div class="crate">
    <Header></Header>
    <Body></Body>
    <div class="promptPolicyContainer" >
      <Prompt></Prompt>

    </div>
  </div>
</template>

<script>
import Header from './components/header.vue';
import Body from './components/body.vue';
import Prompt from './components/prompt.vue';

export default {
  name: 'PolicySimulator',
  components: {
    Header,
    Body,
    Prompt,
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
