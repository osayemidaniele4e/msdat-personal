# Q3 2025 — Modules Audit (MSDAT Dashboards)

Focus modules under `src/modules/msdat-dashboard/components/sections`:

- Indicator Overview — `indicator-overview/`
- Dataset Comparison — `dataset-comparison/`
- Multi-Source Comparison — `multi-source-compare/`
- Zonal Analysis — `zonal-analysis/`

Other notable sections (FYI): `advanced/`, `gis/`, `policy-simulator/`, `scorecard/`, `dynamic-section/`, `embed-section/`.

---

## Indicator Overview

Path: `src/modules/msdat-dashboard/components/sections/indicator-overview`

- Component tree:
  - BaseIndicatorOverview.vue — section wrapper and orchestrator
  - components/ — subcomponents (detail to be enumerated during deep dive)
  - IndicatorMainData.vue — primary KPI/chart pane
  - IndicatorFirstRelated.vue — related metrics (group 1)
  - indicatorSecondRelated.vue — related metrics (group 2)
  - IndicatorTable.vue — tabular KPI breakdown
  - IndicatorTableHeader.vue — table header controls
  - TheStateBarChart.vue — state-level barchart
  - TheTable.vue — generic table renderer
  - TheIndicatorDatasoureComparisonChart.vue — data source comparison chart
  - shareTableModal.vue — share/export modal
  - info_modal/ — info/help modals
  - assets/ — local assets/config
  - services.js — data fetch and transform layer
  - control-panel-config.js — control schema
  - defaultConfig.json — default indicator config
  - disease-surveliance-control-panel-config.js — alt control schema
  - temp2.vue — temp/dev utility (candidate for cleanup)
- Contracts:
  - Props/events:
  - Store usage (modules/getters/actions):
  - Routes/params:
- Data flow:
  - APIs/services used:
  - Caching/IndexDB/offline behavior:
- UX & a11y:
  - Keyboard nav:
  - Color/contrast:
  - Empty/slow/error states:
- Performance:
  - Chart size/series count:
  - Render hotspots:
  - Suggested wins:
- Issues & actions:
  - [ ]

## Dataset Comparison

Path: `src/modules/msdat-dashboard/components/sections/dataset-comparison`

- Component tree:
  - datasetComparism.vue — main comparison view
  - control-panel-config.js — control schema for dataset selection/filters
- Contracts (props/events/store/routes):
- Data flow (APIs, joins, alignment rules):
- UX & a11y (tables, pagination/virtualization):
- Performance (diff computation, memoization):
- Issues & actions:
  - [ ]

## Multi-Source Comparison

Path: `src/modules/msdat-dashboard/components/sections/multi-source-compare`

- Component tree:
  - BaseMultiSourceSection.vue — section wrapper and coordination
  - multi-source.vue — comparison UI
  - control-config.js — control schema for sources/indicators
- Contracts (props/events/store/routes):
- Data flow (merge/dedup, trust rules, provenance):
- UX & a11y (tooltips, source badges):
- Performance (aggregation cost):
- Issues & actions:
  - [ ]

## Zonal Analysis

Path: `src/modules/msdat-dashboard/components/sections/zonal-analysis`

- Component tree (e.g., `zonalSection.vue`):
  - BaseZonalSectionComponent.vue — layout/logic wrapper
  - zonalSection.vue — primary section component (current file of interest)
  - map.vue — map visualization and interactions
  - control-config.js — control schema (geo/time/indicator)
  - temp.vue — temp/dev utility (candidate for cleanup)
  - test.json — sample data (ensure excluded from prod builds)
- Contracts (props/events/store/routes):
- Data flow (geo filters, hierarchy: zone → state → LGA):
- UX & a11y (map interactions, responsive tables):
- Performance (large zone datasets, virtualization/export):
- Issues & actions:
  - [ ]

---

## Cross-cutting observations

- Shared components reused vs duplicated:
- State management consistency (naming, modules):
- Error handling patterns:
- i18n/formatting/date handling:
- Testing coverage and gaps:

## Recommended improvements (backlog candidates)

-
-
-
