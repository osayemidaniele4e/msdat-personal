# Q3 2025 — Architecture Overview

High-level map of MSDAT dashboard modules and data flows.

## Modules and flows

- Views (`src/modules/msdat-dashboard/views`) route to sectioned components (`components/sections/*`).
- Data from services in `src/services` and plugins in `src/modules/plugins` flow into Vuex `store` and then into section components.
- Offline/IndexDB considerations (`docs/config/index-db.md`).

## Diagrams (ASCII or link to images)

- Routing → Store → Sections
- Advanced analytics data path
- Custom dashboard extensibility points

## Caching and persistence

- Where caching happens and invalidation rules.

## Observability

- Logging, user activity (`docs/config/user-activity.md`), telemetry hooks.
