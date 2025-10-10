# Q3 2025 — Components Catalog

Folder: `src/components`
Examples present: `Barchart/`, `piechart/`, `maps/`, `ControlPanel/`, `ui-components/`, plus utility components like `Tooltip.vue`, `Ratings.vue`.

## Inventory (fill iteratively)

For each component:

- Path:
- Purpose:
- Props/slots/events:
- Dependencies:
- Example usage:
- Notes/deprecations:

### Initial entries

- Path: `src/components/Barchart/`

  - Purpose: Reusable bar chart primitives
  - Props/slots/events: To document via source scan
  - Dependencies: Likely charting lib (TBD)
  - Example usage: Used in `TheStateBarChart.vue`
  - Notes: Ensure axes/legend a11y

- Path: `src/components/piechart/`

  - Purpose: Reusable pie/donut charts
  - Props/slots/events: TBD
  - Dependencies: Charting lib

- Path: `src/components/maps/`

  - Purpose: Map components used in Zonal Analysis
  - Props/slots/events: region selection, hover, click
  - Dependencies: Mapping lib (Leaflet/Mapbox/ArcGIS, verify)

- Path: `src/components/ControlPanel/`

  - Purpose: Filter controls; used across sections
  - Props/slots/events: v-model for filters; change events
  - Dependencies: Vuex bindings (verify)

- Path: `src/components/ui-components/`

  - Purpose: Buttons, modals, inputs
  - Notes: Candidate for design system extraction

- Path: `src/components/Tooltip.vue`

  - Purpose: Tooltip utility
  - Notes: Verify keyboard/focus behavior

- Path: `src/components/Ratings.vue`
  - Purpose: Rating display component

## Doc generation

- Preferred: generate API docs via vue-docgen into `documentation/docs/`.
- Ensure examples compile; add minimal stories/snippets when needed.

## Gaps/opportunities

- What’s duplicated across modules that could live here:
- Missing primitives (table, export, skeleton loaders, async state wrappers):
