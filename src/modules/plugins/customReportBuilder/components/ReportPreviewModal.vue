<template>
  <div class="preview-modal">
    <div class="backdrop" @click.self="$emit('close')"></div>
    <div class="panel">
      <div class="header">
        <h3>Report Preview</h3>
        <button @click="$emit('close')">Close</button>
      </div>
      <div class="content">
        <div v-for="(item, idx) in items" :key="idx" class="preview-item">
          <component :is="previewComponent(item.type)" :data="item.data" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChartComponent from './ChartComponent.vue';
import TableComponent from './TableComponent.vue';
import TextComponent from './TextComponent.vue';

export default {
  name: 'ReportPreviewModal',
  props: ['items'],
  components: { ChartComponent, TableComponent, TextComponent },
  methods: {
    previewComponent(type) {
      if (type === 'chart') return 'ChartComponent';
      if (type === 'table') return 'TableComponent';
      return 'TextComponent';
    },
  },
};
</script>

<style scoped>
.preview-modal { position: fixed; z-index: 11000; top:0; left:0; right:0; bottom:0; }
.backdrop { position:absolute; top:0; left:0; right:0; bottom:0; background: rgba(0,0,0,0.5); }
.panel { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:80%; max-width:1000px; background:white; padding:20px; border-radius:8px; }
.header { display:flex; justify-content:space-between; align-items:center; }
.content { max-height:70vh; overflow:auto; }
.preview-item { margin-bottom:12px; }
</style>
