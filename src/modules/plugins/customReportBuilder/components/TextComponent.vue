<template>
  <div class="text-component">
    <!-- Display mode -->
    <div v-if="!data.isEditing" class="text-display" @click="data.isEditing = true">
      <div class="text-output" :style="previewStyle" v-html="formattedText || '<span class=placeholder>Click to add text...</span>'"></div>
      <div class="edit-hint">
        <b-icon icon="pencil" /> Click to edit
      </div>
    </div>

    <!-- Edit mode -->
    <div v-else class="text-editor">
      <div class="text-toolbar">
        <div class="toolbar-group">
          <button class="toolbar-btn" :class="{ active: styles.bold }" @click="styles.bold = !styles.bold" title="Bold">
            <b-icon icon="type-bold" />
          </button>
          <button class="toolbar-btn" :class="{ active: styles.italic }" @click="styles.italic = !styles.italic" title="Italic">
            <b-icon icon="type-italic" />
          </button>
          <button class="toolbar-btn" :class="{ active: styles.underline }" @click="styles.underline = !styles.underline" title="Underline">
            <b-icon icon="type-underline" />
          </button>
        </div>
        <div class="toolbar-separator" />
        <div class="toolbar-group">
          <button class="toolbar-btn" :class="{ active: styles.align === 'left' }" @click="styles.align = 'left'" title="Align left">
            <b-icon icon="text-left" />
          </button>
          <button class="toolbar-btn" :class="{ active: styles.align === 'center' }" @click="styles.align = 'center'" title="Align center">
            <b-icon icon="text-center" />
          </button>
          <button class="toolbar-btn" :class="{ active: styles.align === 'right' }" @click="styles.align = 'right'" title="Align right">
            <b-icon icon="text-right" />
          </button>
        </div>
        <div class="toolbar-separator" />
        <div class="toolbar-group">
          <select v-model.number="styles.fontSize" class="font-size-select" title="Font size">
            <option v-for="s in fontSizes" :key="s" :value="s">{{ s }}px</option>
          </select>
          <label class="color-picker-label" title="Text color">
            <div class="color-swatch" :style="{ backgroundColor: styles.color }"></div>
            <input type="color" v-model="styles.color" class="hidden-color-input" />
          </label>
        </div>
        <div class="toolbar-spacer" />
        <button class="toolbar-btn done-btn" @click="data.isEditing = false" title="Done editing">
          <b-icon icon="check-lg" /> Done
        </button>
      </div>
      <textarea
        v-model="text"
        placeholder="Start typing your text here..."
        class="text-area"
        :style="textareaStyle"
        ref="textarea"
      ></textarea>
      <div class="text-preview-section">
        <span class="preview-label">Preview</span>
        <div class="text-preview" :style="previewStyle" v-html="formattedText"></div>
      </div>
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
      styles: {
        fontSize: (this.data.styles && this.data.styles.fontSize) || 14,
        bold: (this.data.styles && this.data.styles.bold) || false,
        italic: (this.data.styles && this.data.styles.italic) || false,
        underline: (this.data.styles && this.data.styles.underline) || false,
        color: (this.data.styles && this.data.styles.color) || '#000000',
        align: (this.data.styles && this.data.styles.align) || 'left',
      },
      fontSizes: [10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 64],
    };
  },
  watch: {
    text(val) { if (this.data) this.$set(this.data, 'text', val); },
    styles: {
      deep: true,
      handler(val) { if (this.data) this.$set(this.data, 'styles', { ...val }); },
    },
  },
  computed: {
    previewStyle() {
      return {
        fontSize: `${this.styles.fontSize}px`,
        fontWeight: this.styles.bold ? 'bold' : 'normal',
        fontStyle: this.styles.italic ? 'italic' : 'normal',
        textDecoration: this.styles.underline ? 'underline' : 'none',
        color: this.styles.color,
        textAlign: this.styles.align || 'left',
      };
    },
    textareaStyle() {
      return {
        fontSize: `${Math.min(this.styles.fontSize, 20)}px`,
        textAlign: this.styles.align || 'left',
      };
    },
    formattedText() {
      return (this.text || '').replace(/\n/g, '<br/>');
    },
  },
  mounted() {
    if (this.data.isEditing && this.$refs.textarea) {
      this.$nextTick(() => this.$refs.textarea.focus());
    }
  },
};
</script>

<style scoped>
.text-component {
  background: #fff;
  border-radius: 6px;
  overflow: hidden;
}

/* Display mode */
.text-display {
  cursor: pointer;
  position: relative;
  min-height: 40px;
  padding: 16px;
  transition: background 0.2s ease;
}
.text-display:hover {
  background: #f8f9fa;
}
.text-output {
  min-height: 20px;
  line-height: 1.6;
  word-wrap: break-word;
}
.text-output >>> .placeholder {
  color: #ccd0d5;
  font-style: italic;
}
.edit-hint {
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 11px;
  color: #8a8f96;
  opacity: 0;
  transition: opacity 0.2s ease;
  display: flex;
  align-items: center;
  gap: 3px;
  background: rgba(255,255,255,0.9);
  padding: 2px 6px;
  border-radius: 4px;
}
.text-display:hover .edit-hint { opacity: 1; }

/* Editor */
.text-editor { padding: 0; }
.text-toolbar {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  background: #f8f9fa;
  border-bottom: 1px solid #e2e4e8;
  flex-wrap: wrap;
}
.toolbar-group { display: flex; gap: 2px; }
.toolbar-separator {
  width: 1px;
  height: 24px;
  background: #e2e4e8;
  margin: 0 4px;
}
.toolbar-spacer { flex: 1; }
.toolbar-btn {
  background: transparent;
  border: 1px solid transparent;
  width: 32px; height: 32px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #495057;
  transition: all 0.15s ease;
  font-size: 14px;
}
.toolbar-btn:hover { background: #e8f4f8; border-color: #ccd0d5; }
.toolbar-btn.active { background: #1c6d90; color: #fff; border-color: #1c6d90; }
.done-btn {
  width: auto;
  padding: 4px 12px;
  gap: 4px;
  font-size: 12px;
  font-weight: 500;
  color: #20946b;
  border-color: #20946b;
}
.done-btn:hover { background: #e8f5e9; }

.font-size-select {
  padding: 4px 6px;
  border: 1px solid #e2e4e8;
  border-radius: 4px;
  font-size: 12px;
  color: #495057;
  background: #fff;
  cursor: pointer;
}
.color-picker-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
}
.color-swatch {
  width: 24px; height: 24px;
  border-radius: 4px;
  border: 2px solid #e2e4e8;
  transition: border-color 0.15s ease;
}
.color-swatch:hover { border-color: #1c6d90; }
.hidden-color-input {
  position: absolute;
  opacity: 0;
  width: 0; height: 0;
  pointer-events: none;
}

.text-area {
  width: 100%;
  min-height: 100px;
  padding: 16px;
  border: none;
  outline: none;
  resize: vertical;
  font-family: inherit;
  line-height: 1.6;
  color: #212529;
  background: #fff;
  border-bottom: 1px solid #f0f1f3;
}
.text-area::placeholder { color: #ccd0d5; }
.text-area:focus {
  background: #fefefe;
}

.text-preview-section {
  padding: 12px 16px;
  background: #f8f9fa;
  border-top: 1px solid #e2e4e8;
}
.preview-label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #8a8f96;
  font-weight: 600;
  display: block;
  margin-bottom: 6px;
}
.text-preview {
  line-height: 1.6;
  word-wrap: break-word;
  min-height: 20px;
}
</style>
