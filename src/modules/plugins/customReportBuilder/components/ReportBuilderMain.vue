<template>
  <div class="report-builder-modal">
    <div class="modal-backdrop" @click.self="close"></div>
    <div class="modal-panel">
      <div class="modal-header">
        <h3>Custom Report Builder</h3>
        <button class="close-btn" @click="close">x</button>
      </div>
      <div class="builder-container">
        <div class="toolbox">
          <h4>Toolbox</h4>
          <div class="tool-item" @click="addItem('chart')">Chart</div>
          <div class="tool-item" @click="addItem('table')">Table</div>
          <div class="tool-item" @click="addItem('text')">Text</div>
        </div>
        <div class="canvas">
          <draggable v-model="reportItems" class="draggable-list" handle=".drag-handle">
            <transition-group>
              <div v-for="(item, index) in reportItems" :key="index" class="canvas-item">
                <div class="drag-handle" title="Drag to reorder">☰</div>
                <div class="item-badge">
                  <small v-if="item.data && item.data.image">Snapshot</small>
                  <small v-else-if="item.data && (item.data.series || item.data.options)">Live</small>
                  <small v-else>Empty</small>
                </div>
                <div class="canvas-content">
                  <component :is="componentName(item.type)" :data="item.data" />
                  <div class="item-actions">
                    <button @click="removeItem(index)">Remove</button>
                  </div>
                </div>
              </div>
            </transition-group>
          </draggable>
        </div>
      </div>
      <div class="actions">
        <button @click="previewReport">Preview</button>
        <button @click="exportReport">Export PDF</button>
      </div>
    </div>
  </div>
</template>

<script>
import ChartComponent from './ChartComponent.vue';
import TableComponent from './TableComponent.vue';
import TextComponent from './TextComponent.vue';
import draggable from 'vuedraggable';
import html2canvas from 'html2canvas';

export default {
  name: 'ReportBuilderMain',
  components: {
    draggable,
    ChartComponent,
    TableComponent,
    TextComponent,
  },
  data() {
    return {
      reportItems: [],
      draggedType: null,
    };
  },
  methods: {
    async addItem(type) {
      if (type === 'table') {
        const waitForPayload = async (timeout = 1000, interval = 100) => {
          const start = Date.now();
          while (Date.now() - start < timeout) {
            try {
              const sel = (this.$store && this.$store.getters && typeof this.$store.getters.getSelectedConfig !== 'undefined') ? this.$store.getters.getSelectedConfig : null;
              if (sel && Object.keys(sel).length > 0) return sel;
              const controlConfig = (this.$store && this.$store.state && this.$store.state.MSDAT_STORE && this.$store.state.MSDAT_STORE.controlConfig) || null;
              if (controlConfig && controlConfig.length && controlConfig[0].payload) return controlConfig[0].payload;
            } catch (e) {
              // ignore and retry
            }
            // eslint-disable-next-line no-await-in-loop
            await new Promise((r) => setTimeout(r, interval));
          }
          return null;
        };

        let currentPayload = null;
        try {
          if (this.$store && this.$store.getters && typeof this.$store.getters.getSelectedConfig !== 'undefined') {
            currentPayload = this.$store.getters.getSelectedConfig || null;
          }
        } catch (e) {
          currentPayload = null;
        }

        if (!currentPayload) currentPayload = await waitForPayload();

        const normalize = (v) => {
          if (v === null || v === undefined) return v;
          if (typeof v === 'number' || typeof v === 'string') return v;
          if (typeof v === 'object') {
            if (v.id) return v.id;
            if (v.item) return v.item;
            if (v.datasource) return (typeof v.datasource === 'object' ? (v.datasource.id || v.datasource) : v.datasource);
            if (v.dataSource) return (typeof v.dataSource === 'object' ? (v.dataSource.id || v.dataSource) : v.dataSource);
            return v;
          }
          return v;
        };

        const tableQuery = currentPayload ? {
          indicator: normalize(currentPayload.indicator),
          datasource: normalize(currentPayload.datasource || currentPayload.dataSource),
          location: currentPayload.location || null,
          year: normalize(currentPayload.year || currentPayload.period),
        } : null;

        // Log the generated tableQuery for in-app debugging
        // eslint-disable-next-line no-console
        console.info('ReportBuilderMain: adding table with query=', tableQuery);

        if (tableQuery && this.addItemWithContext) {
          await this.addItemWithContext('table', { query: tableQuery });
          return;
        }
      }

      this.reportItems.push({ type, data: this.defaultDataFor(type) });
    },

    async addItemWithContext(type, context = {}) {
      const base = this.defaultDataFor(type);
      if (type === 'chart') {
        if (context.chartConfig) {
          base.series = context.chartConfig.series || base.series;
          base.options = context.chartConfig.options || base.options;
        }
        if (context.chartSelector) {
          try {
            let el = null;
            if (typeof context.chartSelector === 'string') el = document.querySelector(context.chartSelector);
            else if (context.chartSelector instanceof Element) el = context.chartSelector;
            if (el) {
              const canvas = await html2canvas(el, { useCORS: true, logging: false });
              base.image = canvas.toDataURL('image/png');
            }
          } catch (e) {
            // eslint-disable-next-line no-console
            console.warn('Chart snapshot failed', e);
          }
        }
      }
      if (type === 'table') {
        if (context.query) base.query = context.query;

        try {
          const selectors = ['#indicatorTable', '#the-table', '.table-component table', '#indicatorTable table'];
          let el = null;
          for (let i = 0; i < selectors.length; i += 1) {
            const s = selectors[i];
            el = document.querySelector(s);
            if (el) break;
          }

          if (el) {
            try { el.scrollIntoView({ block: 'center', inline: 'nearest' }); } catch (e) {}
            const canvas = await html2canvas(el, { useCORS: true, logging: false });
            base.image = canvas.toDataURL('image/png');
            base.debugQuery = context.query || null;
            base.fallbackSnapshot = true;
          }
        } catch (e) {
          // eslint-disable-next-line no-console
          console.warn('Table snapshot fallback failed', e);
        }
      }
      this.reportItems.push({ type, data: base });
      return this.reportItems.length - 1;
    },

    removeItem(index) {
      this.reportItems.splice(index, 1);
    },
    previewReport() { this.$emit('preview', this.reportItems); },
    exportReport() { this.$emit('export', this.reportItems); },
    close() { this.$emit('setActiveComponent', 'launcher'); },
    componentName(type) {
      if (type === 'chart') return 'ChartComponent';
      if (type === 'table') return 'TableComponent';
      return 'TextComponent';
    },
    defaultDataFor(type) {
      if (type === 'chart') return { series: [], options: {} };
      if (type === 'table') return { rows: [], columns: [] };
      return { text: '' };
    },
  },
};
</script>

<style scoped>
.report-builder-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
}
.modal-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
}
.modal-panel {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
.max-width-override { max-width: 1200px; }
  background: white;
  border-radius: 8px;
  padding: 20px;
  z-index: 10001; /* ensure panel is above backdrop */
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}
.modal-body { overflow: auto; }
.modal-backdrop { z-index: 10000; }
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.builder-container {
  display: flex;
}
.toolbox {
  width: 200px;
  border: 1px solid #ccc;
  padding: 10px;
}
.tool-item {
  padding: 10px;
  margin: 5px;
  background: #f0f0f0;
  cursor: pointer;
}
.canvas {
  flex: 1;
  border: 1px solid #ccc;
  min-height: 400px;
  padding: 10px;
  overflow: auto;
  max-height: calc(90vh - 220px);
}
.canvas-item {
  margin: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  background: #fff;
  position: relative;
}
.canvas-content { padding-top: 8px; }
.item-badge { position: absolute; margin-left: -8px; margin-top: -6px; background: #333; color: #fff; padding: 2px 6px; border-radius: 10px; font-size: 11px; }
.drag-handle { position: absolute; left: 8px; top: 8px; cursor: grab; color: #666; }
.item-actions {
  margin-top: 8px;
}
.actions {
  margin-top: 20px;
  display: flex;
  gap: 8px;
}
.close-btn {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
}
</style>
