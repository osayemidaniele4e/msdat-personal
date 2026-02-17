<template>
  <div class="report-builder-modal">
    <div class="modal-backdrop" @click.self="close"></div>
    <div class="modal-panel">
      <!-- Header -->
      <div class="modal-header">
        <div class="header-left">
          <div class="header-icon">
            <b-icon icon="file-earmark-richtext" />
          </div>
          <div class="header-text">
            <h3>Report Builder</h3>
            <span class="header-subtitle">{{ reportItems.length }} item{{ reportItems.length !== 1 ? 's' : '' }} &middot; {{ isPreviewMode ? 'Preview' : 'Edit' }} mode</span>
          </div>
        </div>
        <div class="header-actions">
          <button class="icon-btn" @click="undo" :disabled="!canUndo" title="Undo (Ctrl+Z)">
            <b-icon icon="arrow-counterclockwise" />
          </button>
          <button class="icon-btn" @click="redo" :disabled="!canRedo" title="Redo (Ctrl+Y)">
            <b-icon icon="arrow-clockwise" />
          </button>
          <button class="close-btn" @click="close" title="Close">
            <b-icon icon="x-lg" />
          </button>
        </div>
      </div>

      <!-- Report Title -->
      <div class="report-title-section">
        <div class="title-input-wrapper">
          <b-icon icon="pencil-square" class="title-icon" />
          <input
            v-model="reportTitle"
            placeholder="Enter report title..."
            class="title-input"
            @focus="$event.target.select()"
          />
        </div>
        <div class="title-meta" v-if="lastSaved">
          <b-icon icon="clock-history" /> Last saved: {{ lastSaved }}
        </div>
      </div>

      <!-- Main Builder Area -->
      <div class="builder-container">
        <!-- Toolbox Sidebar -->
        <div class="toolbox" :class="{ collapsed: toolboxCollapsed }">
          <div class="toolbox-header" @click="toolboxCollapsed = !toolboxCollapsed">
            <h4><b-icon icon="tools" /> Toolbox</h4>
            <b-icon :icon="toolboxCollapsed ? 'chevron-right' : 'chevron-down'" />
          </div>
          <transition name="slide">
            <div v-show="!toolboxCollapsed" class="toolbox-items">
              <div class="tool-item" @click="addItem('chart')" title="Add chart snapshot from dashboard">
                <div class="tool-icon chart-icon"><b-icon icon="bar-chart-line-fill" /></div>
                <div class="tool-label">Chart</div>
                <div class="tool-desc">Capture dashboard charts</div>
              </div>
              <div class="tool-item" @click="addItem('table')" title="Add table snapshot from dashboard">
                <div class="tool-icon table-icon"><b-icon icon="table" /></div>
                <div class="tool-label">Table</div>
                <div class="tool-desc">Capture dashboard tables</div>
              </div>
              <div class="tool-item" @click="addItem('text')" title="Add rich text block">
                <div class="tool-icon text-icon"><b-icon icon="fonts" /></div>
                <div class="tool-label">Text</div>
                <div class="tool-desc">Add text &amp; commentary</div>
              </div>
              <hr class="toolbox-divider" />
              <div class="tool-item tool-meta" @click="addIndicatorMetadata" title="Add current indicator metadata">
                <div class="tool-icon meta-icon"><b-icon icon="info-circle-fill" /></div>
                <div class="tool-label">Indicator Info</div>
                <div class="tool-desc">Add indicator metadata</div>
              </div>
              <hr class="toolbox-divider" />
              <div class="tool-item tool-action" @click="clearAllItems" v-if="reportItems.length">
                <div class="tool-icon clear-icon"><b-icon icon="trash" /></div>
                <div class="tool-label">Clear All</div>
              </div>
            </div>
          </transition>
        </div>

        <!-- Canvas Area -->
        <div class="canvas">
          <!-- Capture Overlay -->
          <transition name="fade">
            <div v-if="isCapturingChart || isCapturingTable" class="capture-overlay">
              <div class="capture-spinner">
                <div class="spinner" />
                <div class="spinner-text">{{ isCapturingChart ? 'Capturing charts...' : 'Capturing table...' }}</div>
              </div>
            </div>
          </transition>

          <!-- Empty State -->
          <div v-if="!reportItems.length && !isCapturingChart && !isCapturingTable" class="empty-state">
            <div class="empty-icon"><b-icon icon="file-earmark-plus" /></div>
            <h4>Start Building Your Report</h4>
            <p>Add charts, tables, or text blocks from the toolbox to begin.</p>
            <div class="empty-actions">
              <button class="btn-outline" @click="addItem('chart')"><b-icon icon="bar-chart-line-fill" /> Add Chart</button>
              <button class="btn-outline" @click="addItem('table')"><b-icon icon="table" /> Add Table</button>
              <button class="btn-outline" @click="addItem('text')"><b-icon icon="fonts" /> Add Text</button>
              <button class="btn-outline" @click="addIndicatorMetadata"><b-icon icon="info-circle-fill" /> Indicator Info</button>
            </div>
          </div>

          <!-- Edit Mode -->
          <div v-if="reportItems.length && !isPreviewMode" class="canvas-content-wrapper">
            <draggable v-model="reportItems" class="draggable-list" handle=".drag-handle" @change="pushUndoState">
              <transition-group name="list" tag="div" class="items-grid">
                <div v-for="(item, index) in reportItems" :key="item._id || index"
                  class="canvas-item" :class="{ 'is-active': activeItemIndex === index, 'annotating': item.editMode === 'annotate' }">
                  <!-- Item Header -->
                  <div class="item-header">
                    <div class="drag-handle" title="Drag to reorder">
                      <b-icon icon="grip-vertical" />
                    </div>
                    <span class="item-type-badge" :class="item.type">
                      <b-icon :icon="typeIcon(item.type)" /> {{ item.type }}
                    </span>
                    <span class="item-status-badge" v-if="item.data && item.data.image">
                      <b-icon icon="camera-fill" /> Snapshot
                    </span>
                    <span class="item-status-badge empty" v-else-if="item.type !== 'text'">
                      <b-icon icon="image" /> Empty
                    </span>
                    <div class="item-header-actions">
                      <button class="item-icon-btn" @click="duplicateItem(index)" title="Duplicate">
                        <b-icon icon="files" />
                      </button>
                      <button class="item-icon-btn" @click="moveItemUp(index)" :disabled="index === 0" title="Move up">
                        <b-icon icon="arrow-up" />
                      </button>
                      <button class="item-icon-btn" @click="moveItemDown(index)" :disabled="index === reportItems.length - 1" title="Move down">
                        <b-icon icon="arrow-down" />
                      </button>
                      <button class="item-icon-btn danger" @click="removeItem(index)" title="Remove">
                        <b-icon icon="trash" />
                      </button>
                    </div>
                  </div>

                  <!-- Item Title -->
                  <div class="item-title-section">
                    <input v-model="item.title"
                      :placeholder="`${item.type.charAt(0).toUpperCase() + item.type.slice(1)} ${index + 1}`"
                      class="item-title-input" />
                  </div>

                  <!-- Annotation Toolbar (shown on hover / when active) -->
                  <div class="item-toolbar" v-if="item.type !== 'text'">
                    <div class="toolbox-inline">
                      <button class="tool-btn" :class="{ active: item.editMode === 'annotate' }"
                        title="Toggle annotate mode" @click.stop="toggleAnnotate(index)">
                        <b-icon icon="pencil" /> Annotate
                      </button>
                      <template v-if="item.editMode === 'annotate'">
                        <button class="tool-btn" title="Add text note" @click.stop="addAnnotationType(index, 'text')">
                          <b-icon icon="chat-text" /> Text
                        </button>
                        <button class="tool-btn" title="Add arrow" @click.stop="addAnnotationType(index, 'arrow')">
                          <b-icon icon="arrow-right" /> Arrow
                        </button>
                        <button class="tool-btn" title="Add box" @click.stop="addAnnotationType(index, 'box')">
                          <b-icon icon="bounding-box" /> Box
                        </button>
                        <div class="tool-separator" />
                        <label class="tool-color-label" title="Annotation color">
                          <input type="color" v-model="item.toolSettingsColor"
                            @input.stop="setToolColor(index, $event.target.value)" class="color-input" />
                        </label>
                        <input type="number" v-model.number="item.toolSettingsSize" min="8" max="48"
                          @input.stop="setToolSize(index, item.toolSettingsSize)" title="Font size"
                          class="size-input" />
                      </template>
                    </div>
                  </div>

                  <!-- Item Content -->
                  <div class="canvas-content">
                    <div class="resizable-wrapper" ref="resizable" :data-index="index"
                      :style="{
                        width: item.data && item.data.width ? item.data.width : '100%',
                        height: item.data && item.data.height ? item.data.height : 'auto',
                      }"
                      @click="onCanvasClick($event, index)">
                      <div class="overlay-container">
                        <component :is="componentName(item.type)" :data="item.data" />
                        <!-- Annotations overlay -->
                        <div v-if="item.data && item.data.annotations && item.data.annotations.length" class="annotation-overlay">
                          <div v-for="(a, aidx) in item.data.annotations" :key="a.id || aidx"
                            class="annotation-thing"
                            :style="{
                              position: 'absolute', left: a.x + 'px', top: a.y + 'px',
                              cursor: item.editMode === 'annotate' ? 'move' : 'pointer'
                            }"
                            @mousedown.stop.prevent="startDragAnnotation($event, index, aidx)"
                            @click.stop.prevent="openAnnotationEditor(index, aidx)">
                            <span class="annotation-label"
                              :style="{ color: a.color || '#000', fontSize: (a.size || 12) + 'px' }">
                              {{ a.type === 'arrow' ? '➤' : (a.type === 'box' ? '▭' : (a.text || '✎')) }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </transition-group>
            </draggable>
          </div>

          <!-- Preview Mode -->
          <div v-if="reportItems.length && isPreviewMode" class="preview-mode canvas-content-wrapper">
            <div class="preview-header-block">
              <h2>{{ reportTitle }}</h2>
              <p class="preview-date">Generated on {{ new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}</p>
            </div>
            <div v-for="(item, idx) in reportItems" :key="idx" class="preview-item">
              <h4 class="preview-item-title">
                <b-icon :icon="typeIcon(item.type)" />
                {{ item.title || `${item.type.charAt(0).toUpperCase() + item.type.slice(1)} ${idx + 1}` }}
              </h4>
              <div class="preview-content">
                <component :is="componentName(item.type)" :data="item.data" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Action Bar -->
      <div class="actions-bar">
        <div class="actions-left">
          <button class="btn-action btn-save" @click="saveState" title="Save to browser storage">
            <b-icon icon="save" /> Save
          </button>
          <button class="btn-action btn-load" @click="loadState" title="Load saved report">
            <b-icon icon="folder2-open" /> Load
          </button>
        </div>
        <div class="actions-right">
          <button class="btn-action btn-preview" @click="togglePreview">
            <b-icon :icon="isPreviewMode ? 'pencil-square' : 'eye'" />
            {{ isPreviewMode ? 'Edit' : 'Preview' }}
          </button>
          <div class="export-dropdown" ref="exportDropdown">
            <button class="btn-action btn-export" @click="toggleExportMenu">
              <b-icon icon="download" /> Export
              <b-icon :icon="showExportMenu ? 'chevron-up' : 'chevron-down'" class="export-chevron" />
            </button>
            <transition name="dropdown">
              <div v-if="showExportMenu" class="export-menu">
                <button @click="exportAsPDF" class="export-option">
                  <b-icon icon="file-earmark-pdf" /> Export as PDF
                </button>
                <button @click="exportAsDOCX" class="export-option">
                  <b-icon icon="file-earmark-word" /> Export as DOCX
                </button>
              </div>
            </transition>
          </div>
        </div>
      </div>

      <!-- Toast Notification -->
      <transition name="toast">
        <div v-if="toast.show" class="toast-notification" :class="toast.type">
          <b-icon :icon="toast.type === 'success' ? 'check-circle-fill' : 'exclamation-circle-fill'" />
          <span>{{ toast.message }}</span>
        </div>
      </transition>
    </div>

    <!-- Annotation Editor Modal -->
    <transition name="fade">
      <div v-if="annotationEditor.open" class="annotation-editor-modal" @click.self="closeAnnotationEditor">
        <div class="annotation-editor">
          <h4><b-icon icon="pencil" /> Edit Annotation</h4>
          <div class="editor-form">
            <label class="editor-label">
              <span>Text</span>
              <input v-model="annotationEditor.text" class="editor-input" placeholder="Annotation text..." />
            </label>
            <div class="editor-row">
              <label class="editor-label">
                <span>Color</span>
                <input type="color" v-model="annotationEditor.color" class="editor-color" />
              </label>
              <label class="editor-label">
                <span>Size</span>
                <input type="number" v-model.number="annotationEditor.size" min="8" max="48" class="editor-input small" />
              </label>
            </div>
          </div>
          <div class="editor-actions">
            <button class="btn-action btn-save" @click="saveAnnotationEdit"><b-icon icon="check" /> Save</button>
            <button class="btn-action btn-cancel" @click="closeAnnotationEditor">Cancel</button>
            <button class="btn-action btn-danger" @click="deleteAnnotation(annotationEditor.itemIndex, annotationEditor.annIndex)">
              <b-icon icon="trash" /> Delete
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Confirm Clear Modal -->
    <transition name="fade">
      <div v-if="showClearConfirm" class="confirm-modal" @click.self="showClearConfirm = false">
        <div class="confirm-dialog">
          <h4><b-icon icon="exclamation-triangle" /> Clear All Items?</h4>
          <p>This will remove all {{ reportItems.length }} items from your report. This action cannot be undone.</p>
          <div class="confirm-actions">
            <button class="btn-action btn-danger" @click="confirmClearAll"><b-icon icon="trash" /> Yes, Clear All</button>
            <button class="btn-action btn-cancel" @click="showClearConfirm = false">Cancel</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
/* eslint-disable no-underscore-dangle */
import draggable from 'vuedraggable';
import html2canvas from 'html2canvas';
import Highcharts from 'highcharts';
import ChartComponent from './ChartComponent.vue';
import TableComponent from './TableComponent.vue';
import TextComponent from './TextComponent.vue';

let nextItemId = 1;

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
      isCapturingChart: false,
      isCapturingTable: false,
      annotationEditor: {
        open: false, itemIndex: null, annIndex: null, text: '', color: '#000', size: 12,
      },
      isPreviewMode: false,
      reportTitle: 'Custom Report',
      showExportMenu: false,
      toolboxCollapsed: false,
      activeItemIndex: -1,
      showClearConfirm: false,
      lastSaved: null,
      toast: { show: false, message: '', type: 'success' },
      // Undo/redo
      undoStack: [],
      redoStack: [],
    };
  },
  computed: {
    canUndo() { return this.undoStack.length > 0; },
    canRedo() { return this.redoStack.length > 0; },
  },
  methods: {
    // --- Toast ---
    showToast(message, type = 'success', duration = 3000) {
      this.toast = { show: true, message, type };
      clearTimeout(this._toastTimer);
      this._toastTimer = setTimeout(() => { this.toast.show = false; }, duration);
    },

    // --- Undo / Redo ---
    pushUndoState() {
      try {
        this.undoStack.push(JSON.stringify(this.reportItems));
        if (this.undoStack.length > 30) this.undoStack.shift();
        this.redoStack = [];
      } catch (e) { /* ignore */ }
    },
    undo() {
      if (!this.undoStack.length) return;
      this.redoStack.push(JSON.stringify(this.reportItems));
      this.reportItems = JSON.parse(this.undoStack.pop());
      this.showToast('Undo');
    },
    redo() {
      if (!this.redoStack.length) return;
      this.undoStack.push(JSON.stringify(this.reportItems));
      this.reportItems = JSON.parse(this.redoStack.pop());
      this.showToast('Redo');
    },

    // --- Helpers ---
    typeIcon(type) {
      if (type === 'chart') return 'bar-chart-line-fill';
      if (type === 'table') return 'table';
      return 'fonts';
    },
    componentName(type) {
      if (type === 'chart') return 'ChartComponent';
      if (type === 'table') return 'TableComponent';
      return 'TextComponent';
    },
    defaultDataFor(type) {
      if (type === 'chart') return { series: [], options: {}, annotations: [] };
      if (type === 'table') return { rows: [], columns: [], annotations: [] };
      return {
        text: '',
        styles: {
          fontSize: 14, bold: false, italic: false, underline: false, color: '#000000', align: 'left',
        },
        isEditing: false,
      };
    },
    makeItemId() { return `item_${Date.now()}_${nextItemId++}`; },

    // --- Item operations ---
    // --- Get current indicator metadata from store ---
    _getIndicatorMeta() {
      try {
        const store = this.$store;
        if (!store) return null;
        const g = store.getters || {};

        // 1. Try selectedConfigurations.indicator (set via SET_SELECTED_CONFIG)
        const sel = g['MSDAT_STORE/getSelectedConfig'] || g.getSelectedConfig || null;
        if (sel && sel.indicator && typeof sel.indicator === 'object' && sel.indicator.full_name) {
          return this._buildMeta(sel.indicator, sel);
        }

        // 2. Try controlConfig[0].payload.indicator (active control panel payload)
        let payloadIndicator = null;
        try {
          const controlPayload = g['MSDAT_STORE/getControlConfig'] || null;
          if (controlPayload && controlPayload.indicator != null) {
            payloadIndicator = controlPayload.indicator;
          }
        } catch (e) { /* ignore */ }

        // If missing from getter, try direct state
        if (payloadIndicator == null) {
          try {
            const cc = store.state && store.state.MSDAT_STORE ? store.state.MSDAT_STORE.controlConfig : null;
            if (cc && cc.length && cc[0] && cc[0].payload) {
              payloadIndicator = cc[0].payload.indicator;
            }
          } catch (e) { /* ignore */ }
        }

        if (payloadIndicator != null) {
          // payloadIndicator might be a full object or just an ID
          if (typeof payloadIndicator === 'object' && payloadIndicator.full_name) {
            return this._buildMeta(payloadIndicator, sel);
          }
          // It's an ID — look up in the indicators list
          const indicatorId = typeof payloadIndicator === 'object' ? (payloadIndicator.id || payloadIndicator) : payloadIndicator;
          const indicators = this._getIndicatorsList();
          if (indicators && indicators.length) {
            const found = indicators.find((ind) => ind.id === indicatorId || ind.id === Number(indicatorId));
            if (found) return this._buildMeta(found, sel);
          }
        }

        // 3. Try selectedConfigurations.indicator as an ID
        if (sel && sel.indicator != null && typeof sel.indicator !== 'object') {
          const indicators = this._getIndicatorsList();
          if (indicators && indicators.length) {
            const found = indicators.find((ind) => ind.id === sel.indicator || ind.id === Number(sel.indicator));
            if (found) return this._buildMeta(found, sel);
          }
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('_getIndicatorMeta error:', e);
      }
      return null;
    },

    _getIndicatorsList() {
      try {
        const g = this.$store.getters || {};
        const indicators = g['MSDAT_STORE/getIndicators'] || null;
        if (indicators && indicators.length) return indicators;
      } catch (e) { /* ignore */ }
      try {
        const cc = this.$store.state && this.$store.state.MSDAT_STORE ? this.$store.state.MSDAT_STORE.controlConfig : null;
        if (cc && cc.length && cc[0] && cc[0].setup && cc[0].setup[0]) {
          return cc[0].setup[0].options || [];
        }
      } catch (e) { /* ignore */ }
      return [];
    },

    _buildMeta(ind, sel) {
      return {
        full_name: ind.full_name || '',
        short_name: ind.short_name || '',
        indicator_type: ind.indicator_type || '',
        program_area: ind.program_area || '',
        desirable_slope: ind.desirable_slope || '',
        national_target: ind.national_target || '',
        national_source: ind.national_source || '',
        national_information: ind.national_information || '',
        sdg_target: ind.sdg_target || '',
        sdg_information: ind.sdg_information || '',
        factor: ind.factor || '',
        datasource: sel && sel.dataSource ? (sel.dataSource.datasource || sel.dataSource.full_name || sel.dataSource) : '',
        period: sel && sel.period ? sel.period : '',
      };
    },

    _getIndicatorName() {
      const meta = this._getIndicatorMeta();
      return meta ? (meta.short_name || meta.full_name || '') : '';
    },

    addIndicatorMetadata() {
      // Debug: log store state so we can see what's available
      const meta = this._getIndicatorMeta();
      if (!meta || !meta.full_name) {
        this.showToast('No indicator selected on the dashboard', 'error');
        return;
      }
      this.pushUndoState();
      const lines = [];
      lines.push(`Indicator: ${meta.full_name}`);
      if (meta.short_name && meta.short_name !== meta.full_name) lines.push(`Short Name: ${meta.short_name}`);
      if (meta.indicator_type) lines.push(`Type: ${meta.indicator_type}`);
      if (meta.program_area) lines.push(`Program Area: ${meta.program_area}`);
      if (meta.desirable_slope) lines.push(`Desirable Slope: ${meta.desirable_slope}`);
      if (meta.national_target && meta.national_target !== '0.00') lines.push(`National Target: ${meta.national_target}`);
      if (meta.national_source && meta.national_source !== 'Not available') lines.push(`National Source: ${meta.national_source}`);
      if (meta.national_information && meta.national_information !== 'Not available') lines.push(`National Information: ${meta.national_information}`);
      if (meta.sdg_target) lines.push(`SDG Target: ${meta.sdg_target}`);
      if (meta.sdg_information && meta.sdg_information !== 'Not available') lines.push(`SDG Information: ${meta.sdg_information}`);
      if (meta.datasource) lines.push(`Data Source: ${typeof meta.datasource === 'object' ? JSON.stringify(meta.datasource) : meta.datasource}`);
      if (meta.period) lines.push(`Period: ${typeof meta.period === 'object' ? JSON.stringify(meta.period) : meta.period}`);

      const text = lines.join('\n');
      const data = this.defaultDataFor('text');
      data.text = text;
      data.styles.fontSize = 13;
      data.isEditing = false;

      this.reportItems.push({
        type: 'text',
        data,
        title: `${meta.short_name || meta.full_name} — Metadata`,
        _id: this.makeItemId(),
      });
      this.showToast('Indicator metadata added');
    },

    async addItem(type) {
      this.pushUndoState();
      let itemsAdded = 0;

      if (type === 'table') {
        const currentPayload = await this._resolvePayload();
        const tableQuery = currentPayload ? {
          indicator: this._normalize(currentPayload.indicator),
          datasource: this._normalize(currentPayload.datasource || currentPayload.dataSource),
          location: currentPayload.location || null,
          year: this._normalize(currentPayload.year || currentPayload.period),
        } : null;

        // eslint-disable-next-line no-console
        console.info('ReportBuilderMain: adding table with query=', tableQuery);

        if (this.addItemWithContext) {
          this.isCapturingTable = true;
          try {
            const idx = await this.addItemWithContext('table', { query: tableQuery || {}, forceSnapshot: true });
            if (typeof idx === 'number') itemsAdded += 1;
            return;
          } finally {
            this.isCapturingTable = false;
          }
        }
      }

      if (type === 'chart') {
        if (this.addItemWithContext) {
          this.isCapturingChart = true;
          try {
            const captured = await this._captureCharts();
            if (captured) return;
          } catch (e) {
            // eslint-disable-next-line no-console
            console.warn('chart capture attempt failed', e);
          } finally {
            this.isCapturingChart = false;
          }
        }
      }

      if (itemsAdded === 0) {
        this.reportItems.push({
          type, data: this.defaultDataFor(type), title: '', _id: this.makeItemId(),
        });
        this.showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} added`);
      }
    },

    async _resolvePayload() {
      let currentPayload = null;
      try {
        if (this.$store && this.$store.getters) {
          currentPayload = this.$store.getters['MSDAT_STORE/getSelectedConfig'] || this.$store.getters.getSelectedConfig || null;
        }
      } catch (e) { currentPayload = null; }
      if (!currentPayload) {
        const start = Date.now();
        while (Date.now() - start < 1000) {
          try {
            const sel = this.$store && this.$store.getters ? (this.$store.getters['MSDAT_STORE/getSelectedConfig'] || this.$store.getters.getSelectedConfig) : null;
            if (sel && Object.keys(sel).length > 0) return sel;
            const cc = this.$store && this.$store.state && this.$store.state.MSDAT_STORE ? this.$store.state.MSDAT_STORE.controlConfig : null;
            if (cc && cc.length && cc[0].payload) return cc[0].payload;
          } catch (e) { /* ignore */ }
          // eslint-disable-next-line no-await-in-loop
          await new Promise((r) => setTimeout(r, 100));
        }
      }
      return currentPayload;
    },
    _normalize(v) {
      if (v == null) return v;
      if (typeof v === 'number' || typeof v === 'string') return v;
      if (typeof v === 'object') {
        if (v.id) return v.id;
        if (v.item) return v.item;
        if (v.datasource) return typeof v.datasource === 'object' ? (v.datasource.id || v.datasource) : v.datasource;
        if (v.dataSource) return typeof v.dataSource === 'object' ? (v.dataSource.id || v.dataSource) : v.dataSource;
        return v;
      }
      return v;
    },

    _extractChartTitle(chartInstance) {
      try {
        if (chartInstance.options && chartInstance.options.title && chartInstance.options.title.text) {
          return chartInstance.options.title.text;
        }
        if (chartInstance.title && chartInstance.title.textStr) {
          return chartInstance.title.textStr;
        }
        // Try subtitle as fallback
        if (chartInstance.options && chartInstance.options.subtitle && chartInstance.options.subtitle.text) {
          return chartInstance.options.subtitle.text;
        }
      } catch (e) { /* ignore */ }
      // Fallback to indicator name from store
      return this._getIndicatorName() || '';
    },

    async _captureCharts() {
      let foundAny = false;
      if (typeof window !== 'undefined' && window.Highcharts && Array.isArray(window.Highcharts.charts)) {
        const charts = window.Highcharts.charts.filter((ch) => ch && ((ch.series && ch.series.length > 0) || ch.renderTo));
        if (charts.length > 0) {
          foundAny = true;
          for (let i = 0; i < charts.length; i += 1) {
            const c = charts[i];
            try {
              const chartTitle = this._extractChartTitle(c);
              // eslint-disable-next-line no-await-in-loop
              const chartImage = await this._chartToImage(c);
              if (chartImage) {
                // eslint-disable-next-line no-await-in-loop
                await this.addItemWithContext('chart', { chartImage, chartTitle });
              } else {
                const chartConfig = { options: c.options || {}, series: (c.series || []).map((s) => s.options || s) };
                // eslint-disable-next-line no-await-in-loop
                await this.addItemWithContext('chart', { chartConfig, chartTitle });
              }
            } catch (inner) {
              // eslint-disable-next-line no-console
              console.warn('failed to capture one highcharts instance', inner);
            }
          }
          if (foundAny) return true;
        }
      }
      // fallback: DOM elements
      const selList = '[data-highcharts-chart], #main-chart, .highcharts-root, .chart, [data-chart]';
      const els = Array.from(document.querySelectorAll(selList));
      if (els.length) {
        for (let i = 0; i < els.length; i += 1) {
          try {
            // eslint-disable-next-line no-await-in-loop
            await this.addItemWithContext('chart', { chartSelector: els[i] });
          } catch (e) { /* continue */ }
        }
        return true;
      }
      return false;
    },
    async _chartToImage(c) {
      let svg = null;
      if (typeof c.getSVG === 'function') { try { svg = c.getSVG(); } catch (e) { svg = null; } }
      if (!svg && c.renderTo) {
        const svgEl = c.renderTo.querySelector && c.renderTo.querySelector('svg');
        if (svgEl) svg = svgEl.outerHTML;
      }
      if (!svg) return null;
      try {
        const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
        if (typeof createImageBitmap === 'function') {
          const bitmap = await createImageBitmap(blob);
          const canvas = document.createElement('canvas');
          canvas.width = bitmap.width || (c.chartWidth || 800);
          canvas.height = bitmap.height || (c.chartHeight || 400);
          const ctx = canvas.getContext('2d');
          ctx.drawImage(bitmap, 0, 0);
          return canvas.toDataURL('image/png');
        }
        return await new Promise((res, rej) => {
          const img = new Image();
          img.onload = () => {
            try {
              const canvas = document.createElement('canvas');
              canvas.width = img.width || (c.chartWidth || 800);
              canvas.height = img.height || (c.chartHeight || 400);
              const ctx = canvas.getContext('2d');
              ctx.drawImage(img, 0, 0);
              res(canvas.toDataURL('image/png'));
            } catch (ex) { rej(ex); }
          };
          img.onerror = rej;
          img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
        });
      } catch (ex) { return null; }
    },

    async addItemWithContext(type, context = {}) {
      const base = this.defaultDataFor(type);
      // Determine title: use chartTitle from context, or indicator name, or empty
      const autoTitle = context.chartTitle || this._getIndicatorName() || '';
      if (type === 'chart') {
        // Store indicator name on chart data for display in ChartComponent
        base.indicatorName = autoTitle;
        if (context.chartImage) {
          base.image = context.chartImage;
          this.reportItems.push({
            type, data: base, title: autoTitle, _id: this.makeItemId(),
          });
          this.showToast('Chart captured');
          return this.reportItems.length - 1;
        }
        if (context.chartConfig) {
          base.series = context.chartConfig.series || base.series;
          base.options = context.chartConfig.options || base.options;
          try {
            const image = await this._renderChartOffscreen(context.chartConfig);
            if (image) base.image = image;
          } catch (ex) {
            // eslint-disable-next-line no-console
            console.warn('Offscreen chart render failed', ex);
          }
        }
        if (context.chartSelector) {
          try {
            let el = null;
            if (typeof context.chartSelector === 'string') {
              el = document.querySelector(context.chartSelector);
            } else if (context.chartSelector instanceof Element) {
              el = context.chartSelector;
            }
            if (el) {
              try { el.scrollIntoView({ block: 'center', inline: 'nearest' }); } catch (e) { /* ignore */ }
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
          const image = await this._captureTableSnapshot();
          if (image) {
            base.image = image;
            base.debugQuery = context.query || null;
            base.fallbackSnapshot = true;
          }
        } catch (e) {
          // eslint-disable-next-line no-console
          console.warn('Table snapshot failed', e);
        } finally {
          try { this.isCapturingTable = false; } catch (ex) { /* ignore */ }
        }
      }
      this.reportItems.push({
        type, data: base, title: autoTitle || '', _id: this.makeItemId(),
      });
      this.showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} captured`);
      return this.reportItems.length - 1;
    },

    async _renderChartOffscreen(chartConfig) {
      const container = document.createElement('div');
      container.style.cssText = 'position:absolute;left:-9999px;top:0;width:800px;height:400px;';
      document.body.appendChild(container);
      const opts = JSON.parse(JSON.stringify(chartConfig.options || {}));
      opts.series = chartConfig.series || opts.series || [];
      opts.chart = opts.chart || {};
      opts.chart.renderTo = container;
      let chartInstance = null;
      try { chartInstance = Highcharts.chart(container, opts); } catch (e) { chartInstance = null; }
      await new Promise((r) => setTimeout(r, 80));
      let image = null;
      try {
        let svg = null;
        if (chartInstance && typeof chartInstance.getSVG === 'function') {
          try { svg = chartInstance.getSVG(); } catch (e) { svg = null; }
        }
        if (!svg) {
          const svgEl = container.querySelector('svg');
          if (svgEl) svg = svgEl.outerHTML;
        }
        if (svg) {
          const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
          if (typeof createImageBitmap === 'function') {
            const bitmap = await createImageBitmap(blob);
            const canvas = document.createElement('canvas');
            canvas.width = bitmap.width || 800;
            canvas.height = bitmap.height || 400;
            canvas.getContext('2d').drawImage(bitmap, 0, 0);
            image = canvas.toDataURL('image/png');
          } else {
            image = await new Promise((res, rej) => {
              const img = new Image();
              img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width || 800;
                canvas.height = img.height || 400;
                canvas.getContext('2d').drawImage(img, 0, 0);
                res(canvas.toDataURL('image/png'));
              };
              img.onerror = rej;
              img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
            });
          }
        }
      } catch (ex) { /* ignore */ }
      try { if (chartInstance && typeof chartInstance.destroy === 'function') chartInstance.destroy(); } catch (e) { /* ignore */ }
      try { document.body.removeChild(container); } catch (e) { /* ignore */ }
      return image;
    },

    async _captureTableSnapshot() {
      const selectors = ['#indicatorTable', '#the-table', '.table-component table', '#indicatorTable table'];
      let el = null;
      const start = Date.now();
      // eslint-disable-next-line no-restricted-syntax
      while (Date.now() - start < 800) {
        for (let si = 0; si < selectors.length; si += 1) {
          const found = document.querySelector(selectors[si]);
          if (found) { el = found; break; }
        }
        if (el) break;
        // eslint-disable-next-line no-await-in-loop
        await new Promise((r) => setTimeout(r, 100));
      }
      if (!el) return null;
      try { el.scrollIntoView({ block: 'center', inline: 'nearest' }); } catch (e) { /* ignore */ }
      try {
        const cloneContainer = document.createElement('div');
        cloneContainer.style.cssText = 'position:absolute;left:-9999px;top:0;visibility:visible;';
        const cloned = el.cloneNode(true);
        cloneContainer.appendChild(cloned);
        document.body.appendChild(cloneContainer);
        await new Promise((r) => setTimeout(r, 50));
        const canvas = await html2canvas(cloned, { useCORS: true, logging: false });
        const image = canvas.toDataURL('image/png');
        try { document.body.removeChild(cloneContainer); } catch (e) { /* ignore */ }
        return image;
      } catch (eClone) {
        try {
          const canvas = await html2canvas(el, { useCORS: true, logging: false });
          return canvas.toDataURL('image/png');
        } catch (e2) {
          // eslint-disable-next-line no-console
          console.warn('Table snapshot fallback failed', e2);
          return null;
        }
      }
    },

    removeItem(index) {
      this.pushUndoState();
      this.reportItems.splice(index, 1);
      this.showToast('Item removed');
    },
    duplicateItem(index) {
      this.pushUndoState();
      const original = this.reportItems[index];
      const copy = JSON.parse(JSON.stringify(original));
      copy._id = this.makeItemId();
      copy.title = `${copy.title || ''} (copy)`;
      this.reportItems.splice(index + 1, 0, copy);
      this.showToast('Item duplicated');
    },
    moveItemUp(index) {
      if (index <= 0) return;
      this.pushUndoState();
      const items = [...this.reportItems];
      [items[index - 1], items[index]] = [items[index], items[index - 1]];
      this.reportItems = items;
    },
    moveItemDown(index) {
      if (index >= this.reportItems.length - 1) return;
      this.pushUndoState();
      const items = [...this.reportItems];
      [items[index], items[index + 1]] = [items[index + 1], items[index]];
      this.reportItems = items;
    },
    clearAllItems() { this.showClearConfirm = true; },
    confirmClearAll() {
      this.pushUndoState();
      this.reportItems = [];
      this.showClearConfirm = false;
      this.showToast('All items cleared');
    },

    // --- Annotations ---
    toggleAnnotate(index) {
      const it = this.reportItems[index];
      if (!it) return;
      it.editMode = it.editMode === 'annotate' ? null : 'annotate';
      if (!it.data.annotations) this.$set(it.data, 'annotations', []);
      if (!it.toolSettingsColor) this.$set(it, 'toolSettingsColor', '#ff0000');
      if (!it.toolSettingsSize) this.$set(it, 'toolSettingsSize', 14);
      this.activeItemIndex = index;
    },
    addAnnotationType(index, type) {
      const it = this.reportItems[index];
      if (!it) return;
      if (!it.data.annotations) this.$set(it.data, 'annotations', []);
      const rectEl = this.$el.querySelector(`.resizable-wrapper[data-index="${index}"]`);
      const rect = rectEl ? rectEl.getBoundingClientRect() : { width: 200, height: 100 };
      const x = Math.round((rect.width || 200) / 2);
      const y = Math.round((rect.height || 100) / 2);
      it.data.annotations.push({
        type,
        x,
        y,
        text: type === 'text' ? 'Note' : '',
        color: it.toolSettingsColor || '#ff0000',
        size: it.toolSettingsSize || 14,
        id: Date.now(),
      });
      it.editMode = 'annotate';
    },
    setToolColor(index, color) {
      const it = this.reportItems[index];
      if (it) this.$set(it, 'toolSettingsColor', color);
    },
    setToolSize(index, size) {
      const it = this.reportItems[index];
      if (it) this.$set(it, 'toolSettingsSize', size);
    },
    openAnnotationEditor(itemIndex, annIndex) {
      const it = this.reportItems[itemIndex];
      if (!it || !it.data.annotations || !it.data.annotations[annIndex]) return;
      const ann = it.data.annotations[annIndex];
      this.annotationEditor = {
        open: true,
        itemIndex,
        annIndex,
        text: ann.text || '',
        color: ann.color || '#000',
        size: ann.size || 12,
      };
    },
    closeAnnotationEditor() { this.annotationEditor.open = false; },
    saveAnnotationEdit() {
      const ae = this.annotationEditor;
      if (!ae.open) return;
      const it = this.reportItems[ae.itemIndex];
      if (!it || !it.data.annotations || !it.data.annotations[ae.annIndex]) return;
      const ann = it.data.annotations[ae.annIndex];
      this.$set(ann, 'text', ae.text);
      this.$set(ann, 'color', ae.color);
      this.$set(ann, 'size', ae.size);
      this.annotationEditor.open = false;
      this.showToast('Annotation updated');
    },
    deleteAnnotation(itemIndex, annIndex) {
      const it = this.reportItems[itemIndex];
      if (!it || !it.data.annotations) return;
      it.data.annotations.splice(annIndex, 1);
      this.annotationEditor.open = false;
    },
    onCanvasClick(e, index) {
      const it = this.reportItems[index];
      if (!it || it.editMode !== 'annotate') return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = Math.round(e.clientX - rect.left);
      const y = Math.round(e.clientY - rect.top);
      if (!it.data.annotations) this.$set(it.data, 'annotations', []);
      it.data.annotations.push({
        type: 'text', x, y, text: 'Note', id: Date.now(), color: it.toolSettingsColor || '#ff0000', size: it.toolSettingsSize || 14,
      });
    },
    startDragAnnotation(e, itemIndex, annIndex) {
      this._dragging = {
        itemIndex, annIndex, startX: e.clientX, startY: e.clientY,
      };
      window.addEventListener('mousemove', this.onDragMove);
      window.addEventListener('mouseup', this.stopDragAnnotation);
    },
    onDragMove(e) {
      if (!this._dragging) return;
      const {
        itemIndex, annIndex, startX, startY,
      } = this._dragging;
      const it = this.reportItems[itemIndex];
      if (!it) return;
      const ann = it.data.annotations[annIndex];
      if (!ann) return;
      ann.x = Math.max(0, ann.x + (e.clientX - startX));
      ann.y = Math.max(0, ann.y + (e.clientY - startY));
      this._dragging.startX = e.clientX;
      this._dragging.startY = e.clientY;
    },
    stopDragAnnotation() {
      window.removeEventListener('mousemove', this.onDragMove);
      window.removeEventListener('mouseup', this.stopDragAnnotation);
      this._dragging = null;
    },

    // --- Preview / Export ---
    togglePreview() {
      this.isPreviewMode = !this.isPreviewMode;
    },
    toggleExportMenu() {
      this.showExportMenu = !this.showExportMenu;
    },
    exportAsPDF() {
      this.showExportMenu = false;
      this.exportReport('pdf');
    },
    exportAsDOCX() {
      this.showExportMenu = false;
      this.exportReport('docx');
    },
    async exportReport(format = 'pdf') {
      const composed = [];
      for (let i = 0; i < this.reportItems.length; i += 1) {
        const item = this.reportItems[i];
        if (item.type === 'text') {
          composed.push({
            type: item.type,
            data: item.data,
            image: null,
            title: item.title || `${item.type.charAt(0).toUpperCase() + item.type.slice(1)} ${i + 1}`,
          });
        } else {
          // eslint-disable-next-line no-await-in-loop
          const dataUrl = await this.composeItemCanvas(item);
          composed.push({
            type: item.type,
            image: dataUrl,
            data: item.data,
            title: item.title || `${item.type.charAt(0).toUpperCase() + item.type.slice(1)} ${i + 1}`,
          });
        }
      }
      this.$emit('export', { items: composed, title: this.reportTitle, format });
      this.showToast(`Exporting as ${format.toUpperCase()}...`);
    },
    async composeItemCanvas(item) {
      if (!item || !item.data) return null;
      let width = null;
      let height = null;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (item.data.image) {
        await new Promise((res) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => {
            width = parseInt(item.data.width, 10) || img.naturalWidth || img.width;
            height = parseInt(item.data.height, 10) || img.naturalHeight || img.height;
            const max = 3000;
            width = Math.min(width, max);
            height = Math.min(height, max);
            canvas.width = width;
            canvas.height = height;
            try { ctx.drawImage(img, 0, 0, width, height); } catch (e) { /* ignore */ }
            res();
          };
          img.onerror = () => res();
          img.src = item.data.image;
        });
      }
      if (item.data.annotations && item.data.annotations.length) {
        ctx.fillStyle = 'rgba(255,255,0,0.9)';
        ctx.strokeStyle = 'rgba(0,0,0,0.8)';
        ctx.lineWidth = 1.5;
        item.data.annotations.forEach((a) => {
          if (a.type === 'text') {
            ctx.fillStyle = 'rgba(255,255,0,0.9)';
            ctx.fillRect(a.x - 4, a.y - 12, ctx.measureText(a.text || 'Note').width + 8, 18);
            ctx.fillStyle = '#000';
            ctx.fillText(a.text || 'Note', a.x, a.y);
          } else if (a.type === 'arrow') {
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(a.x + 40, a.y); ctx.stroke();
            ctx.fillText(a.text || '', a.x + 44, a.y + 4);
          } else if (a.type === 'box') {
            ctx.strokeRect(a.x, a.y, a.w || 60, a.h || 30);
            if (a.text) ctx.fillText(a.text, a.x + 4, a.y + 14);
          }
        });
      }
      return canvas.toDataURL('image/png');
    },

    // --- Save / Load ---
    close() { this.$emit('setActiveComponent', 'launcher'); },
    saveState() {
      try {
        const state = JSON.stringify(this.reportItems);
        localStorage.setItem('customReportBuilderState', state);
        localStorage.setItem('customReportBuilderTitle', this.reportTitle);
        this.lastSaved = new Date().toLocaleTimeString();
        this.showToast('Report saved successfully');
      } catch (e) {
        this.showToast('Failed to save report', 'error');
      }
    },
    loadState() {
      try {
        const state = localStorage.getItem('customReportBuilderState');
        const title = localStorage.getItem('customReportBuilderTitle');
        if (state) {
          this.pushUndoState();
          this.reportItems = JSON.parse(state);
          if (title) this.reportTitle = title;
          this.showToast('Report loaded successfully');
        } else {
          this.showToast('No saved report found', 'error');
        }
      } catch (e) {
        this.showToast('Failed to load report', 'error');
      }
    },
    saveItem(index) {
      const item = this.reportItems[index];
      if (!item) return;
      if (item.type === 'text' && item.data) this.$set(item.data, 'isEditing', false);
      try {
        localStorage.setItem(`customReportBuilderItem_${index}`, JSON.stringify(item));
        this.showToast(`Item ${index + 1} saved`);
      } catch (e) {
        this.showToast('Failed to save item', 'error');
      }
    },

    // --- Keyboard shortcuts ---
    _keyDownHandler(e) {
      if (e.ctrlKey && e.key === 'z') { e.preventDefault(); this.undo(); }
      if (e.ctrlKey && e.key === 'y') { e.preventDefault(); this.redo(); }
      if (e.ctrlKey && e.key === 's') { e.preventDefault(); this.saveState(); }
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        if (this.reportItems.length) this.toggleAnnotate(0);
      }
      if (e.key === 'Escape') {
        if (this.annotationEditor.open) this.closeAnnotationEditor();
        else if (this.showExportMenu) this.showExportMenu = false;
        else if (this.showClearConfirm) this.showClearConfirm = false;
      }
    },
    _handleClickOutside(e) {
      if (this.showExportMenu && this.$refs.exportDropdown && !this.$refs.exportDropdown.contains(e.target)) {
        this.showExportMenu = false;
      }
    },
  },
  mounted() {
    window.addEventListener('keydown', this._keyDownHandler);
    document.addEventListener('click', this._handleClickOutside);
    this.loadState();
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this._keyDownHandler);
    document.removeEventListener('click', this._handleClickOutside);
    clearTimeout(this._toastTimer);
  },
};
</script>

<style scoped>
/* ===== Modal ===== */
.report-builder-modal {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 10000;
  font-family: 'Work Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
.modal-backdrop {
  position: absolute; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(4px);
}
.modal-panel {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 1200px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.12);
  z-index: 10001;
  max-height: 92vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* ===== Header ===== */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: #1c6d90;
  color: #fff;
  border-bottom: none;
}
.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}
.header-icon { font-size: 24px; opacity: 0.9; }
.header-text h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.3px;
}
.header-subtitle { font-size: 12px; opacity: 0.8; }
.header-actions {
  display: flex;
  gap: 6px;
  align-items: center;
}
.icon-btn {
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.2);
  color: #fff;
  width: 32px; height: 32px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
  font-size: 14px;
}
.icon-btn:hover:not(:disabled) { background: rgba(255,255,255,0.3); }
.icon-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.close-btn {
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.2);
  color: #fff;
  width: 32px; height: 32px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
  font-size: 14px;
  margin-left: 8px;
}
.close-btn:hover { background: rgba(220,53,69,0.8); }

/* ===== Report Title ===== */
.report-title-section {
  padding: 12px 24px;
  background: #f8f9fa;
  border-bottom: 1px solid #e2e4e8;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.title-input-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
}
.title-icon { color: #8a8f96; font-size: 16px; }
.title-input {
  flex: 1;
  border: 1px solid transparent;
  background: transparent;
  font-size: 16px;
  font-weight: 600;
  color: #212529;
  padding: 6px 10px;
  border-radius: 6px;
  transition: all 0.2s ease;
}
.title-input:hover,
.title-input:focus {
  border-color: #ccd0d5;
  background: #fff;
  outline: none;
}
.title-input:focus {
  border-color: #1c6d90;
  box-shadow: 0 0 0 3px rgba(28,109,144,0.1);
}
.title-meta {
  font-size: 11px;
  color: #8a8f96;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 4px;
}

/* ===== Builder Container ===== */
.builder-container {
  display: flex;
  flex: 1;
  overflow: hidden;
  min-height: 0;
}

/* ===== Toolbox ===== */
.toolbox {
  width: 200px;
  min-width: 200px;
  background: #f8f9fa;
  border-right: 1px solid #e2e4e8;
  transition: width 0.2s ease, min-width 0.2s ease;
  display: flex;
  flex-direction: column;
}
.toolbox.collapsed { width: 48px; min-width: 48px; }
.toolbox-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  cursor: pointer;
  border-bottom: 1px solid #e2e4e8;
  user-select: none;
}
.toolbox-header h4 {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  color: #495057;
  display: flex;
  align-items: center;
  gap: 6px;
}
.toolbox-items { padding: 8px; overflow-y: auto; }
.tool-item {
  padding: 10px 12px;
  margin-bottom: 6px;
  background: #fff;
  border: 1px solid #e2e4e8;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.tool-item:hover {
  border-color: #1c6d90;
  background: #e8f4f8;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.tool-icon { font-size: 20px; margin-bottom: 4px; }
.chart-icon { color: #4e79a7; }
.table-icon { color: #59a14f; }
.text-icon { color: #e15759; }
.meta-icon { color: #8b5cf6; }
.clear-icon { color: #dc3545; }
.tool-label { font-size: 13px; font-weight: 600; color: #212529; }
.tool-desc { font-size: 11px; color: #8a8f96; margin-top: 2px; }
.tool-action { border-style: dashed; }
.tool-action:hover { border-color: #dc3545; background: #fef2f2; }
.toolbox-divider { border: none; border-top: 1px solid #e2e4e8; margin: 8px 0; }

/* ===== Canvas ===== */
.canvas {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 0;
  position: relative;
  background: #f5f6f8;
}
.canvas-content-wrapper {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 16px;
}

/* ===== Empty State ===== */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 60px 20px;
  text-align: center;
  color: #8a8f96;
}
.empty-icon { font-size: 56px; color: #ccd0d5; margin-bottom: 16px; }
.empty-state h4 { margin: 0 0 8px; color: #495057; font-size: 18px; }
.empty-state p { margin: 0 0 24px; font-size: 14px; max-width: 360px; }
.empty-actions { display: flex; gap: 10px; }
.btn-outline {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: 1px solid #ccd0d5;
  background: #fff;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  color: #495057;
  transition: all 0.2s ease;
}
.btn-outline:hover { border-color: #1c6d90; color: #1c6d90; background: #e8f4f8; }

/* ===== Capture Overlay ===== */
.capture-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(2px);
  z-index: 10;
}
.capture-spinner { display: flex; flex-direction: column; align-items: center; gap: 12px; }
.spinner {
  width: 40px; height: 40px;
  border-radius: 50%;
  border: 3px solid #e2e4e8;
  border-top-color: #1c6d90;
  animation: spin 0.8s linear infinite;
}
.spinner-text { font-size: 13px; color: #495057; font-weight: 500; }
@keyframes spin { to { transform: rotate(360deg); } }

/* ===== Canvas Items ===== */
.items-grid { display: flex; flex-direction: column; gap: 12px; }
.canvas-item {
  background: #fff;
  border: 1px solid #e2e4e8;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.canvas-item:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.1); }
.canvas-item.is-active,
.canvas-item.annotating {
  border-color: #1c6d90;
  box-shadow: 0 0 0 3px rgba(28,109,144,0.1);
}

/* Item Header */
.item-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: #f8f9fa;
  border-bottom: 1px solid #e2e4e8;
}
.drag-handle {
  cursor: grab;
  color: #ccd0d5;
  font-size: 16px;
  padding: 2px;
  transition: color 0.2s ease;
}
.drag-handle:hover { color: #495057; }
.drag-handle:active { cursor: grabbing; }

.item-type-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}
.item-type-badge.chart { background: #e8f0fe; color: #4e79a7; }
.item-type-badge.table { background: #e8f5e9; color: #2e7d32; }
.item-type-badge.text { background: #fce4ec; color: #c62828; }

.item-status-badge {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 2px 6px;
  border-radius: 12px;
  font-size: 10px;
  background: #e8f4f8;
  color: #1c6d90;
}
.item-status-badge.empty { background: #f0f1f3; color: #8a8f96; }

.item-header-actions {
  margin-left: auto;
  display: flex;
  gap: 2px;
  opacity: 0;
  transition: opacity 0.2s ease;
}
.canvas-item:hover .item-header-actions { opacity: 1; }

.item-icon-btn {
  background: transparent;
  border: none;
  color: #8a8f96;
  width: 28px; height: 28px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  font-size: 13px;
}
.item-icon-btn:hover:not(:disabled) { background: #f0f1f3; color: #212529; }
.item-icon-btn:disabled { opacity: 0.3; cursor: not-allowed; }
.item-icon-btn.danger:hover { background: #fef2f2; color: #dc3545; }

/* Item Title */
.item-title-section { padding: 6px 12px; }
.item-title-input {
  width: 100%;
  border: 1px solid transparent;
  background: transparent;
  font-size: 14px;
  font-weight: 500;
  color: #212529;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s ease;
}
.item-title-input:hover { background: #f8f9fa; }
.item-title-input:focus {
  outline: none;
  border-color: #1c6d90;
  background: #fff;
  box-shadow: 0 0 0 2px rgba(28,109,144,0.1);
}

/* Item Toolbar */
.item-toolbar { padding: 4px 12px 8px; }
.toolbox-inline { display: flex; gap: 4px; align-items: center; flex-wrap: wrap; }
.tool-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: #fff;
  border: 1px solid #e2e4e8;
  padding: 4px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  color: #495057;
  transition: all 0.2s ease;
}
.tool-btn:hover { border-color: #1c6d90; color: #1c6d90; }
.tool-btn.active { background: #1c6d90; color: #fff; border-color: #1c6d90; }
.tool-separator { width: 1px; height: 20px; background: #e2e4e8; margin: 0 4px; }
.color-input {
  width: 28px; height: 28px;
  border: 1px solid #e2e4e8;
  border-radius: 4px;
  cursor: pointer;
  padding: 2px;
}
.size-input {
  width: 52px;
  padding: 4px 6px;
  border: 1px solid #e2e4e8;
  border-radius: 4px;
  font-size: 12px;
}

/* Canvas Content */
.canvas-content { padding: 12px; }
.resizable-wrapper {
  border: 1px dashed #e2e4e8;
  border-radius: 6px;
  padding: 8px;
  background: #fff;
  overflow: auto;
  max-width: 100%;
  max-height: 100%;
}
.overlay-container { position: relative; width: 100%; }
.overlay-container img { display: block; max-width: 100%; height: auto; object-fit: contain; }
.annotation-overlay { position: absolute; left: 0; top: 0; right: 0; bottom: 0; pointer-events: none; }
.canvas-item.annotating .annotation-overlay { pointer-events: auto; }
.annotation-thing { pointer-events: auto; }
.annotation-label {
  background: rgba(255,255,0,0.9);
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 500;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

/* ===== Preview Mode ===== */
.preview-mode { padding: 24px !important; }
.preview-header-block {
  text-align: center;
  margin-bottom: 32px;
  padding-bottom: 16px;
  border-bottom: 2px solid #1c6d90;
}
.preview-header-block h2 { margin: 0 0 4px; font-size: 24px; color: #212529; }
.preview-date { font-size: 13px; color: #8a8f96; margin: 0; }
.preview-item {
  margin-bottom: 24px;
  border: 1px solid #e2e4e8;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.preview-item-title {
  margin: 0;
  padding: 12px 16px;
  background: #f8f9fa;
  border-bottom: 1px solid #e2e4e8;
  font-size: 15px;
  font-weight: 600;
  color: #495057;
  display: flex;
  align-items: center;
  gap: 8px;
}
.preview-content { padding: 16px; }

/* ===== Action Bar ===== */
.actions-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  background: #f8f9fa;
  border-top: 1px solid #e2e4e8;
}
.actions-left, .actions-right { display: flex; gap: 8px; align-items: center; }
.btn-action {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: 1px solid #ccd0d5;
  background: #fff;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  color: #495057;
  transition: all 0.2s ease;
}
.btn-action:hover { background: #f8f9fa; border-color: #8a8f96; }
.btn-save { color: #1c6d90; border-color: #1c6d90; }
.btn-save:hover { background: #e8f4f8; }
.btn-load { color: #495057; }
.btn-preview { color: #1c6d90; border-color: #1c6d90; }
.btn-preview:hover { background: #e8f4f8; }
.btn-export {
  background: #1c6d90;
  color: #fff;
  border: none;
}
.btn-export:hover { background: #155a78; }
.btn-cancel { color: #8a8f96; }
.btn-danger { color: #dc3545; border-color: #dc3545; }
.btn-danger:hover { background: #fef2f2; }
.export-chevron { font-size: 10px; margin-left: 2px; }

/* Export Dropdown */
.export-dropdown { position: relative; display: inline-block; }
.export-menu {
  position: absolute;
  bottom: calc(100% + 4px);
  right: 0;
  background: #fff;
  border: 1px solid #e2e4e8;
  border-radius: 6px;
  min-width: 180px;
  z-index: 1000;
  box-shadow: 0 -4px 16px rgba(0,0,0,0.1);
  overflow: hidden;
}
.export-option {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  text-align: left;
  padding: 10px 14px;
  border: none;
  background: #fff;
  cursor: pointer;
  color: #495057;
  font-size: 13px;
  transition: background 0.2s ease;
}
.export-option:hover { background: #e8f4f8; color: #1c6d90; }
.export-option + .export-option { border-top: 1px solid #e2e4e8; }

/* ===== Toast ===== */
.toast-notification {
  position: absolute;
  bottom: 70px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 10010;
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
}
.toast-notification.success { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
.toast-notification.error { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }

/* ===== Annotation Editor ===== */
.annotation-editor-modal {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10010;
  background: rgba(0,0,0,0.3);
}
.annotation-editor {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.12);
  min-width: 320px;
}
.annotation-editor h4 {
  margin: 0 0 16px;
  font-size: 16px;
  color: #212529;
  display: flex;
  align-items: center;
  gap: 6px;
}
.editor-form { display: flex; flex-direction: column; gap: 12px; margin-bottom: 16px; }
.editor-label {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
  color: #495057;
}
.editor-input {
  padding: 8px 10px;
  border: 1px solid #ccd0d5;
  border-radius: 4px;
  font-size: 13px;
}
.editor-input.small { width: 80px; }
.editor-row { display: flex; gap: 16px; }
.editor-color {
  width: 40px; height: 36px;
  border: 1px solid #ccd0d5;
  border-radius: 4px;
  cursor: pointer;
  padding: 2px;
}
.editor-actions { display: flex; gap: 8px; }

/* ===== Confirm Modal ===== */
.confirm-modal {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10010;
  background: rgba(0,0,0,0.3);
}
.confirm-dialog {
  background: #fff;
  padding: 24px;
  border-radius: 10px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.12);
  max-width: 400px;
  text-align: center;
}
.confirm-dialog h4 {
  margin: 0 0 8px;
  font-size: 16px;
  color: #212529;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}
.confirm-dialog p { margin: 0 0 16px; font-size: 13px; color: #8a8f96; }
.confirm-actions { display: flex; gap: 8px; justify-content: center; }

/* ===== Transitions ===== */
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter, .fade-leave-to { opacity: 0; }
.slide-enter-active, .slide-leave-active { transition: all 0.2s ease; }
.slide-enter, .slide-leave-to { max-height: 0; opacity: 0; overflow: hidden; }
.dropdown-enter-active, .dropdown-leave-active { transition: all 0.15s ease; }
.dropdown-enter, .dropdown-leave-to { opacity: 0; transform: translateY(8px); }
.toast-enter-active { transition: all 0.3s ease; }
.toast-leave-active { transition: all 0.5s ease; }
.toast-enter, .toast-leave-to { opacity: 0; transform: translateX(-50%) translateY(20px); }
.list-enter-active, .list-leave-active { transition: all 0.3s ease; }
.list-enter, .list-leave-to { opacity: 0; transform: translateY(-10px); }
.list-move { transition: transform 0.3s ease; }

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .modal-panel { width: 98%; max-height: 96vh; }
  .toolbox { width: 100%; min-width: 100%; border-right: none; border-bottom: 1px solid #e2e4e8; }
  .builder-container { flex-direction: column; }
  .toolbox-items { display: flex; gap: 8px; overflow-x: auto; padding: 8px; }
  .tool-item { min-width: 130px; }
  .actions-bar { flex-wrap: wrap; }
  .empty-actions { flex-direction: column; }
}
</style>
