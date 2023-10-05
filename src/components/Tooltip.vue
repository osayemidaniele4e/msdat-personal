<template>
  <div class="tooltip">
    <h1 v-tooltip="{ content }">{{ txt }}</h1>
  </div>
</template>

<script>
export default {
  name: 'tooltip',
  props: {
    txt: String,
    content: String,
  },
};
</script>
