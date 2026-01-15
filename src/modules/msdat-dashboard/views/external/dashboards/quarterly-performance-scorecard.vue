<template>
    <div class="d-flex flex-column min-vh-100">
      <!-- Header -->
      <the-header ref="theHeader" />

      <!-- Main Content -->
      <main class="flex-grow-1 py-4">
        <div class="container">
          <div class="row mb-4">
            <div class="col-md-8">
              <div class="d-flex">
                <div class="me-3">
                  <label class="form-label">INDICATOR:</label>
                  <select v-model="selectedIndicator" class="form-select">
                    <option value="skilled-birth">Skilled Birth Attendance</option>
                  </select>
                </div>
                <div>
                  <label class="form-label">ZONE:</label>
                  <select v-model="selectedZone" class="form-select">
                    <option v-for="zone in Object.keys(zoneData)" :key="zone" :value="zone">
                      {{ zone }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="col-md-4 text-end">
              <span class="text-muted">DATA SOURCE:</span>
              <span class="fw-bold ms-2">NHMIS</span>
            </div>
          </div>

          <!-- Legends -->
          <div class="d-flex mb-4">
            <div v-for="legend in legends" :key="legend.label" class="me-3 d-flex align-items-center">
              <div :class="['me-2', 'rounded', legend.color]" style="width: 20px; height: 20px;"></div>
              <span>{{ legend.label }}</span>
            </div>
          </div>

          <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h2 class="h5 mb-0">INDICATOR OVERVIEW TABLE AND TREND</h2>
              <div class="d-flex align-items-center">
                <select v-model="selectedQuarter" class="form-select me-2" style="width: 120px;">
                  <option value="2024-q2">2024 Q2</option>
                </select>
                <button class="btn btn-outline-secondary btn-sm me-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                  </svg>
                </button>
                <button class="btn btn-outline-secondary btn-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-question-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                  </svg>
                </button>
              </div>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th v-for="header in tableHeaders" :key="header">{{ header }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(region, index) in regions" :key="region.name">
                      <td v-if="index === 0" :rowspan="regions.length">Skilled Birth Attendance</td>
                      <td>{{ region.name }}</td>
                      <td
                        v-for="(value, key) in region.data"
                        :key="key"
                        :class="getCellClass(value)"
                      >
                        {{ value.toFixed(1) }}
                      </td>
                      <td style="width: 200px;">
                        <div :ref="el => { if (el) chartRefs[region.name] = el }"></div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- Footer -->
      <the-footer />
    </div>
  </template>

<script>
import {
  ref, computed, onMounted, watch,
} from 'vue';
import Highcharts from 'highcharts';
import theHeader from '../../about/layout/theHeader.vue';
import theFooter from '../../about/layout/theFooter.vue';

export default {
  name: 'QuarterlyPerformanceScorecard',
  components: {
    theHeader,
    theFooter,
  },
  setup() {
    const menuItems = ['Home', 'About', 'Help & FAQ', 'Create New Dashboard', 'Go back to MSDAT 1.5', 'Login/Register'];
    const legends = [
      { label: 'Good (≥75%)', color: 'bg-success' },
      { label: 'Fair (50-74%)', color: 'bg-warning' },
      { label: 'Poor (<50%)', color: 'bg-danger' },
    ];
    const tableHeaders = ['Indicator', 'State', '2023 Q2', '2023 Q3', '2023 Q4', '2024 Q1', '2024 Q2', 'NHIS (Survey)', 'Trend'];

    const selectedIndicator = ref('skilled-birth');
    const selectedZone = ref('North Central');
    const selectedQuarter = ref('2024-q2');
    const chartRefs = ref({});

    const generateRandomData = () => ({
      '2023 Q2': Math.random() * 100,
      '2023 Q3': Math.random() * 100,
      '2023 Q4': Math.random() * 100,
      '2024 Q1': Math.random() * 100,
      '2024 Q2': Math.random() * 100,
      nhis: Math.random() * 100,
    });

    const generateTrend = (data) => [
      { quarter: 'Q2', value: data['2023 Q2'] },
      { quarter: 'Q3', value: data['2023 Q3'] },
      { quarter: 'Q4', value: data['2023 Q4'] },
      { quarter: 'Q1', value: data['2024 Q1'] },
      { quarter: 'Q2', value: data['2024 Q2'] },
    ];

    const createRegionData = (name) => {
      const data = generateRandomData();
      return { name, data, trend: generateTrend(data) };
    };

    const zoneData = {
      'North Central': ['Benue', 'Kogi', 'Kwara', 'Nasarawa', 'Niger', 'Plateau', 'FCT'],
      'North East': ['Adamawa', 'Bauchi', 'Borno', 'Gombe', 'Taraba', 'Yobe'],
      'North West': ['Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Sokoto', 'Zamfara'],
      'South East': ['Abia', 'Anambra', 'Ebonyi', 'Enugu', 'Imo'],
      'South South': ['Akwa Ibom', 'Bayelsa', 'Cross River', 'Delta', 'Edo', 'Rivers'],
      'South West': ['Ekiti', 'Lagos', 'Ogun', 'Ondo', 'Osun', 'Oyo'],
    };

    const regions = computed(() => zoneData[selectedZone.value].map(createRegionData));

    const chartOptions = (trend) => ({
      chart: {
        type: 'line', height: 80, width: 200, backgroundColor: 'transparent',
      },
      title: { text: '' },
      xAxis: { categories: trend.map((t) => t.quarter) },
      yAxis: { title: { text: '' }, visible: false },
      series: [{
        data: trend.map((t) => t.value),
        marker: { enabled: false },
        enableMouseTracking: false,
      }],
      credits: { enabled: false },
    });

    const getCellClass = (value) => {
      if (value >= 75) return 'bg-success text-white';
      if (value >= 50) return 'bg-warning text-dark';
      return 'bg-danger text-white';
    };

    onMounted(() => {
      regions.value.forEach((region) => {
        if (chartRefs.value[region.name]) {
          Highcharts.chart(chartRefs.value[region.name], chartOptions(region.trend));
        }
      });
    });

    watch([regions, selectedQuarter], () => {
      regions.value.forEach((region) => {
        if (chartRefs.value[region.name]) {
          Highcharts.chart(chartRefs.value[region.name], chartOptions(region.trend));
        }
      });
    });

    return {
      menuItems,
      selectedIndicator,
      selectedZone,
      selectedQuarter,
      legends,
      tableHeaders,
      zoneData,
      regions,
      chartRefs,
      getCellClass,
    };
  },
};
</script>

  <style scoped>
  .bg-success {
    background-color: #28a745 !important;
  }
  .bg-warning {
    background-color: #ffc107 !important;
  }
  .bg-danger {
    background-color: #dc3545 !important;
  }
  </style>
