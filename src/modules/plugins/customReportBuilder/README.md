# Custom Report Builder Plugin

## Overview

The Custom Report Builder Plugin allows users to create fully custom reports by composing text blocks, data tables, and chart snapshots. Reports can be previewed, exported as PDF/DOCX, and persisted to local storage.

## Features

### Content Items
- **Text** — Rich text blocks with bold, italic, underline, alignment (left/center/right), font size, and color.
- **Table** — Data tables rendered from the platform data layer or from captured snapshots.
- **Chart** — Chart snapshots captured from active Highcharts instances.

### Report Management
- **Drag-and-drop reorder** — Items can be rearranged via drag handle.
- **Duplicate item** — Clone any item with one click.
- **Move up / down** — Quick positional controls per item.
- **Clear all** — Remove all items with a confirmation dialog.
- **Undo / Redo** — Up to 30 levels of undo/redo (`Ctrl+Z` / `Ctrl+Y`).
- **Save / Load** — Persist reports in `localStorage` and reload them later.

### Preview & Export
- **Live preview** — Full-screen modal with zoom in/out (0.3×–2×) and fit-to-page reset.
- **Print** — Print the preview directly from the browser.
- **Export as PDF** — Generate a downloadable PDF via `html2canvas` + `jsPDF`.
- **Export as DOCX** — Generate a Word document via `html-docx-js`.

### Keyboard Shortcuts
| Shortcut | Action |
|----------|--------|
| `Ctrl + Z` | Undo |
| `Ctrl + Y` | Redo |
| `Ctrl + S` | Save report |
| `Escape` | Close panel / Close preview |
| `+` / `-` (in preview) | Zoom in / out |

### UI Enhancements
- Toast notification system for all user actions (save, load, export, errors).
- Empty-state illustration with call-to-action buttons.
- Collapsible toolbox sidebar with icons.
- Animated floating action button (FAB) launcher with first-visit pulse.
- Annotation/drawing mode for freehand notes on the canvas.
- Modern design tokens: consistent color scheme, rounded corners, shadows.

## Architecture

```
customReportBuilder/
├── index.js              # Vue plugin installer
├── README.md
└── components/
    ├── index.vue                    # Root orchestrator (launcher ↔ main ↔ preview)
    ├── ReportBuilderMain.vue        # Main panel: toolbox, canvas, items, export
    ├── ReportBuilderMainLauncher.vue # Floating action button
    ├── ReportPreviewModal.vue       # Full-screen preview with zoom/print
    ├── ChartComponent.vue           # Chart snapshot renderer
    ├── TableComponent.vue           # Table data/snapshot renderer
    └── TextComponent.vue            # Rich text editor block
```

## API

### Plugin Globals

The plugin installs two Vue prototype helpers:

| Global | Purpose |
|--------|---------|
| `this.$customreportbuilder` | Event bus for adding items (`addItemWithContext`) |
| `this.$customReportBuilderHelper` | Utility for export, save, and load operations |

### Add Item with Context

```javascript
this.$customreportbuilder.addItemWithContext(type, context)
// type: 'text' | 'table' | 'chart'
// context: payload object (chart config, table query, etc.)
```

### Export

```javascript
this.$customReportBuilderHelper.exportToPDF(items, filename)
this.$customReportBuilderHelper.exportAsDOCX(items, filename)
```

### Save / Load

```javascript
this.$customReportBuilderHelper.saveReport(items)
const items = this.$customReportBuilderHelper.loadReport()
```

## Dependencies

| Package | Usage |
|---------|-------|
| `vuedraggable` | Drag-and-drop item reordering |
| `html2canvas` | DOM-to-image snapshot capture |
| `highcharts` | Chart rendering and SVG export |
| `jspdf` | PDF generation |
| `html-docx-js` | DOCX generation |
| `bootstrap-vue` | Icon components and UI primitives |
