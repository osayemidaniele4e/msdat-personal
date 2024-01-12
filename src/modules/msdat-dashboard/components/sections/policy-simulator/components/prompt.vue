<template>
  <textarea
    class="prompt"
    placeholder="Prompt Policy
"
  >
  </textarea>
  <!-- <b-icon class="" style="color: black" icon="caret-down-fill" /> -->
</template>

<script>
export default {
  name: 'Prompt',
};
</script>

<style scoped lang="scss">
.prompt {
  width: 100%;
  border: 1px solid #d9d9d9;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
}
.prompt::placeholder {
  text-align: start;
}
</style>
