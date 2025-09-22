<template>
  <div class="table-component">
    <div v-if="data && data.image" class="table-snapshot">
      <img :src="data.image" alt="table snapshot" style="max-width:100%; height:auto;" />
      <div v-if="data.fallbackSnapshot" class="snapshot-badge">Captured from page (fallback)</div>
    </div>
    <div v-else>
    <table v-if="columns.length">
      <thead>
        <tr>
          <th v-for="(c, idx) in columns" :key="idx">{{ c }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(r, ridx) in rows" :key="ridx">
          <td v-for="(c, cidx) in columns" :key="cidx">{{ r[c] }}</td>
        </tr>
      </tbody>
    </table>
    </div>
    <div v-if="!columns.length && !data.image">
      No table data
      <div v-if="data && data.debugQuery" class="debug-query">
        <strong>Query used:</strong>
        <pre>{{ JSON.stringify(data.debugQuery, null, 2) }}</pre>
      </div>
    </div>

    <!-- Persistent debug banner so the query and row count are visible in-app -->
    <div class="table-debug-banner" v-if="data">
      <div><strong>Debug:</strong></div>
      <div><small>Query: <code>{{ shortQuery }}</code></small></div>
      <div><small>Rows: <code>{{ rowsCount }}</code></small></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import dlMixin from '@/modules/data-layer/mixin';

export default {
  name: 'TableComponent',
  mixins: [dlMixin],
  props: ['data'],
  data() {
    return {
      columns: this.data.columns || [],
      rows: this.data.rows || [],
    };
  },
  async mounted() {
    if (this.data && this.data.query) {
      try {
        let rows = [];
        // If query is an object use dlQuery (DataLayer mixin)
        if (typeof this.data.query === 'object') {
          // dlQuery expects query object like { indicator, datasource, location, period }
          // it will call apiServices.getDashboardData under the hood
          // eslint-disable-next-line no-underscore-dangle
          rows = await this.dlQuery(this.data.query);
        } else if (typeof this.data.query === 'string') {
          // fallback: treat as URL
          const resp = await axios.get(this.data.query);
          rows = resp && resp.data ? (resp.data.results || resp.data) : [];
        }

  // debugging: log the incoming query and returned row count
  // eslint-disable-next-line no-console
  console.info('TableComponent: query=', this.data.query, 'rowsReturned=', Array.isArray(rows) ? rows.length : 'non-array');
        if (Array.isArray(rows) && rows.length) {
          this.rows = rows;
          if (this.columns.length === 0) this.columns = Object.keys(rows[0]);
        }
        // if no rows but a debugQuery exists, keep it for diagnostics (UI shows it)
        if ((!Array.isArray(rows) || rows.length === 0) && this.data && this.data.debugQuery) {
          // leave columns empty so the UI shows 'No table data' and the debug info
        }
      } catch (e) {
        // log and continue
        // eslint-disable-next-line no-console
        console.warn('TableComponent: failed to fetch data for query', e);
      }
    }
  },
  computed: {
    rowsCount() {
      return Array.isArray(this.rows) ? this.rows.length : 0;
    },
    shortQuery() {
      try {
        return JSON.stringify(this.data && this.data.query ? this.data.query : {}, null, 0).slice(0, 200);
      } catch (e) {
        return String(this.data && this.data.query);
      }
    },
  },
};
</script>

<style scoped>
.table-component {
  background: #f0f0f0;
  padding: 20px;
}
</style>
