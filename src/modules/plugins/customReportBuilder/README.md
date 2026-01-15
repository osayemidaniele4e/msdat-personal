# Custom Report Builder Plugin

## Overview

The Custom Report Builder Plugin allows users to create custom reports by adding various items such as text, tables, and charts. It provides functionality to preview, export to PDF, and save/load reports.

## Features

### 1. Add Items
Users can add text, tables, and charts to their report.

### 2. Contextual Addition
Items can be added with context (e.g., chart configuration, table query) using the `addItemWithContext` method.

### 3. Preview
Users can preview the report before exporting.

### 4. Export to PDF
Reports can be exported to a PDF file.

### 5. Save/Load
Reports can be saved to and loaded from local storage.

## Usage

### Access
The plugin is available via `this.$customreportbuilder` and `this.$customReportBuilderHelper` in Vue components.

### Add Item
```javascript
this.$customreportbuilder.addItemWithContext(type, context)
```

### Export
```javascript
this.$customReportBuilderHelper.exportToPDF(items, filename)
```

### Save
```javascript
this.$customReportBuilderHelper.saveReport(items)
```

### Load
```javascript
this.$customReportBuilderHelper.loadReport()
```
