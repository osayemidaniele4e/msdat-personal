<template>
  <div class="text-component">
    <div v-if="!data.isEditing" class="text-output" @click="data.isEditing = true" :style="previewStyle" v-html="formattedText || 'Click to edit'"></div>
    <div v-else>
      <div class="text-toolbar">
        <label>Size: <input type="number" v-model.number="styles.fontSize" min="8" max="72" /></label>
        <label><input type="checkbox" v-model="styles.bold" /> Bold</label>
        <label>Color: <input type="color" v-model="styles.color" /></label>
      </div>
      <textarea v-model="text" placeholder="Enter text here" @blur="data.isEditing = false"></textarea>
      <div class="text-preview" :style="previewStyle" v-html="formattedText"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextComponent',
  props: ['data'],
  data() {
    return {
      text: this.data.text || '',
      styles: this.data.styles || { fontSize: 14, bold: false, color: '#000000' },
    };
  },
  watch: {
    text(val) { if (this.data) this.$set(this.data, 'text', val); },
    styles: { deep: true, handler(val) { if (this.data) this.$set(this.data, 'styles', val); } },
  },
  computed: {
    previewStyle() {
      return {
        fontSize: `${this.styles.fontSize}px`,
        fontWeight: this.styles.bold ? 'bold' : 'normal',
        color: this.styles.color,
      };
    },
    formattedText() {
      return (this.text || '').replace(/\n/g, '<br/>');
    },
  },
};
</script>

<style scoped>
.text-component {
  background: #fff;
  padding: 20px;
}
.text-output {
  cursor: pointer;
  min-height: 20px;
}
textarea {
  width: 100%;
  height: 100px;
}
</style>
