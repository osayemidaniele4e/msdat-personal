<template>
  <div class="preview-modal">
    <div class="backdrop" @click.self="$emit('close')"></div>
    <div class="panel">
      <div class="header">
        <div class="header-left">
          <b-icon icon="eye" class="header-icon" />
          <h3>Report Preview</h3>
        </div>
        <div class="header-actions">
          <button class="action-btn" @click="zoomOut" title="Zoom out">
            <b-icon icon="zoom-out" />
          </button>
          <span class="zoom-label">{{ Math.round(zoom * 100) }}%</span>
          <button class="action-btn" @click="zoomIn" title="Zoom in">
            <b-icon icon="zoom-in" />
          </button>
          <button class="action-btn" @click="resetZoom" title="Reset zoom">
            <b-icon icon="arrows-fullscreen" />
          </button>
          <div class="header-separator" />
          <button class="action-btn" @click="handlePrint" title="Print">
            <b-icon icon="printer" />
          </button>
          <button class="close-btn" @click="$emit('close')" title="Close preview">
            <b-icon icon="x-lg" />
          </button>
        </div>
      </div>
      <div class="content" ref="previewContent">
        <div class="preview-page" :style="{ transform: `scale(${zoom})`, transformOrigin: 'top center' }">
          <div class="page-header">
            <h2 class="page-title">Report Preview</h2>
            <p class="page-date">{{ new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}</p>
          </div>
          <div v-if="!items || !items.length" class="empty-preview">
            <b-icon icon="file-earmark-x" class="empty-icon" />
            <p>No items to preview</p>
          </div>
          <div v-for="(item, idx) in items" :key="idx" class="preview-item">
            <div class="item-number">{{ idx + 1 }}</div>
            <div class="item-content">
              <component :is="previewComponent(item.type)" :data="item.data" />
            </div>
          </div>
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
  data() {
    return {
      zoom: 1,
    };
  },
  methods: {
    previewComponent(type) {
      if (type === 'chart') return 'ChartComponent';
      if (type === 'table') return 'TableComponent';
      return 'TextComponent';
    },
    zoomIn() { this.zoom = Math.min(this.zoom + 0.1, 2); },
    zoomOut() { this.zoom = Math.max(this.zoom - 0.1, 0.3); },
    resetZoom() { this.zoom = 1; },
    handlePrint() {
      window.print();
    },
  },
  mounted() {
    // Keyboard: ESC to close, +/- to zoom
    this.keyHandler = (e) => {
      if (e.key === 'Escape') this.$emit('close');
      if (e.key === '+' || e.key === '=') this.zoomIn();
      if (e.key === '-') this.zoomOut();
    };
    window.addEventListener('keydown', this.keyHandler);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.keyHandler);
  },
};
</script>

<style scoped>
.preview-modal {
  position: fixed;
  z-index: 11000;
  top: 0; left: 0; right: 0; bottom: 0;
  font-family: 'Work Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
.backdrop {
  position: absolute; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(4px);
}
.panel {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 85%;
  max-width: 1000px;
  max-height: 90vh;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 12px 40px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 20px;
  background: #f8f9fa;
  border-bottom: 1px solid #e2e4e8;
}
.header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}
.header-icon { font-size: 18px; color: #1c6d90; }
.header h3 { margin: 0; font-size: 16px; font-weight: 600; color: #212529; }
.header-actions { display: flex; align-items: center; gap: 4px; }
.action-btn {
  background: transparent;
  border: 1px solid #e2e4e8;
  color: #495057;
  width: 32px; height: 32px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  font-size: 14px;
}
.action-btn:hover { background: #e8f4f8; border-color: #1c6d90; color: #1c6d90; }
.zoom-label { font-size: 12px; color: #8a8f96; font-weight: 500; min-width: 36px; text-align: center; }
.header-separator { width: 1px; height: 24px; background: #e2e4e8; margin: 0 4px; }
.close-btn {
  background: transparent;
  border: 1px solid #e2e4e8;
  color: #495057;
  width: 32px; height: 32px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}
.close-btn:hover { background: #fef2f2; border-color: #dc3545; color: #dc3545; }
.content {
  flex: 1;
  overflow: auto;
  padding: 24px;
  background: #f0f1f3;
}
.preview-page {
  max-width: 800px;
  margin: 0 auto;
  background: #fff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  transition: transform 0.2s ease;
}
.page-header {
  text-align: center;
  margin-bottom: 32px;
  padding-bottom: 16px;
  border-bottom: 2px solid #1c6d90;
}
.page-title { margin: 0 0 4px; font-size: 22px; color: #212529; }
.page-date { font-size: 12px; color: #8a8f96; margin: 0; }
.empty-preview {
  text-align: center;
  padding: 60px 20px;
  color: #8a8f96;
}
.empty-icon { font-size: 48px; color: #ccd0d5; margin-bottom: 12px; }
.preview-item {
  margin-bottom: 20px;
  display: flex;
  gap: 12px;
  align-items: flex-start;
}
.item-number {
  flex-shrink: 0;
  width: 28px; height: 28px;
  background: #e8f4f8;
  color: #1c6d90;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  margin-top: 4px;
}
.item-content {
  flex: 1;
  border: 1px solid #e2e4e8;
  border-radius: 8px;
  overflow: hidden;
}

@media print {
  .header { display: none; }
  .backdrop { display: none; }
  .panel { position: static; transform: none; width: 100%; max-width: none; max-height: none; box-shadow: none; }
  .content { padding: 0; background: #fff; }
  .preview-page { box-shadow: none; }
}
</style>
