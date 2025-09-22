<template>
  <div class="text-component">
    <textarea v-model="text" placeholder="Enter text here"></textarea>
  </div>
</template>

<script>
export default {
  name: 'TextComponent',
  props: ['data'],
  data() {
    return {
      text: this.data.text || '',
    };
  },
};
</script>

<style scoped>
.text-component {
  background: #fff;
  padding: 20px;
}
textarea {
  width: 100%;
  height: 100px;
}
</style>
