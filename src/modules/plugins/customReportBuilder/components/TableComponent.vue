<template>
  <div class="table-component">
    <div v-if="data && data.image" class="table-snapshot" :style="{ width: data.width || '100%' }">
      <img :src="data.image" alt="table snapshot" class="table-image" />
      <div v-if="isDebug && data.fallbackSnapshot" class="snapshot-badge">
        <b-icon icon="camera" /> Captured from page
      </div>
    </div>
    <div v-else-if="columns.length" class="table-data-wrapper">
      <div class="table-info">
        <span class="row-count"><b-icon icon="list-ul" /> {{ rows.length }} rows</span>
      </div>
      <div class="table-scroll">
        <table class="data-table">
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
    </div>
    <div v-else class="table-placeholder">
      <div class="placeholder-content">
        <b-icon icon="table" class="placeholder-icon" />
        <strong>No table data</strong>
        <p class="placeholder-hint">Click "Table" in the toolbox to capture dashboard tables.</p>
        <div v-if="isDebug && data && data.debugQuery" class="debug-query">
          <strong>Query used:</strong>
          <pre>{{ JSON.stringify(data.debugQuery, null, 2) }}</pre>
        </div>
      </div>
    </div>

    <!-- Debug banner -->
    <div class="table-debug-banner" v-if="isDebug && data">
      <b-icon icon="bug" />
      <span>Query: <code>{{ shortQuery }}</code></span>
      <span>Rows: <code>{{ rowsCount }}</code></span>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import dlMixin from '@/modules/data-layer/mixin';

export default {
  name: 'TableComponent',
  mixins: [dlMixin],
  props: {
    data: { type: Object, required: true },
    debug: { type: Boolean, default: false },
  },
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
        if (typeof this.data.query === 'object') {
          rows = await this.dlQuery(this.data.query);
        } else if (typeof this.data.query === 'string') {
          const resp = await axios.get(this.data.query);
          rows = resp && resp.data ? (resp.data.results || resp.data) : [];
        }
        // eslint-disable-next-line no-console
        console.info('TableComponent: query=', this.data.query, 'rowsReturned=', Array.isArray(rows) ? rows.length : 'non-array');
        if (Array.isArray(rows) && rows.length) {
          this.rows = rows;
          if (this.columns.length === 0) this.columns = Object.keys(rows[0]);
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('TableComponent: failed to fetch data for query', e);
      }
    }
  },
  computed: {
    isDebug() {
      try {
        return this.debug || (typeof localStorage !== 'undefined' && localStorage.getItem('CRB_DEBUG') === '1');
      } catch (e) {
        return this.debug || false;
      }
    },
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
  background: #fff;
  border-radius: 6px;
  overflow: hidden;
}
.table-snapshot { padding: 8px; position: relative; }
.table-image {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 4px;
}
.snapshot-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(28, 109, 144, 0.9);
  color: #fff;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 10px;
  display: flex;
  align-items: center;
  gap: 4px;
}
.table-data-wrapper { padding: 8px; }
.table-info {
  padding: 6px 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.row-count {
  font-size: 11px;
  color: #8a8f96;
  display: flex;
  align-items: center;
  gap: 4px;
}
.table-scroll {
  overflow-x: auto;
  border-radius: 6px;
  border: 1px solid #e2e4e8;
}
.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.data-table thead th {
  background: #f8f9fa;
  border-bottom: 2px solid #e2e4e8;
  padding: 10px 12px;
  text-align: left;
  font-weight: 600;
  color: #495057;
  white-space: nowrap;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}
.data-table tbody td {
  padding: 8px 12px;
  border-bottom: 1px solid #f0f1f3;
  color: #212529;
}
.data-table tbody tr:hover {
  background: #f8f9fa;
}
.data-table tbody tr:last-child td {
  border-bottom: none;
}

/* Placeholder */
.table-placeholder {
  width: 100%;
  min-height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f0f8f0 0%, #e8f0e8 100%);
  border: 2px dashed #ccd0d5;
  border-radius: 6px;
}
.placeholder-content {
  text-align: center;
  color: #8a8f96;
  padding: 20px;
}
.placeholder-icon {
  font-size: 36px;
  color: #59a14f;
  opacity: 0.5;
  margin-bottom: 8px;
  display: block;
}
.placeholder-content strong {
  display: block;
  font-size: 14px;
  color: #495057;
  margin-bottom: 4px;
}
.placeholder-hint {
  font-size: 12px;
  color: #8a8f96;
  margin: 0;
}
.debug-query {
  margin-top: 12px;
  text-align: left;
  background: #f8f9fa;
  padding: 8px;
  border-radius: 4px;
  font-size: 11px;
}
.debug-query pre {
  margin: 4px 0 0;
  font-size: 10px;
  overflow-x: auto;
}

/* Debug banner */
.table-debug-banner {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: #fff3cd;
  font-size: 10px;
  color: #856404;
  border-top: 1px solid #ffc107;
}
.table-debug-banner code {
  background: rgba(0,0,0,0.06);
  padding: 1px 4px;
  border-radius: 3px;
  font-size: 10px;
}
</style>
