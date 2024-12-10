<template>
  <div class="dashboard-container">
    <the-header />
    <!-- Indicator Classification Section -->
    <div class="classification-section">
      <div class="tabs-container">
        <button
          v-for="tab in tabs"
          :key="tab"
          :class="['tab-button', { active: activeTab === tab }]"
          @click="fetchIndicators(tab)"
        >
          {{ tab }}
        </button>
      </div>
    </div>
    <!-- Main Content Area -->
    <div class="content-wrapper">
      <!-- Left Side: Indicator Preview -->
      <div class="preview-section">
        <div class="preview-header">
          <div class="preview-title">Indicator Preview</div>
        </div>
        <div class="preview-content">
          <div class="content-section">
            <h2 class="section-title">{{ activeTab }}</h2>
            <p class="section-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.
            </p>
          </div>
          <div class="indicators-section">
            <div class="indicators-header">
              <span class="indicators-title">Key Indicators</span>
              <div class="data-source">
                <span>Data Source:</span>
                <span class="source-name">{{ dataSourceName }}</span>
              </div>
            </div>
            <div class="indicators-list">
              <!-- Loading Animation -->
              <div v-if="loading" class="loading-container">
                <div class="loading-spinner">
                  <div v-for="n in 4" :key="n" class="spinner-segment"></div>
                </div>
                <p class="loading-text">Loading indicators...</p>
              </div>
              <!-- No Indicator Found -->
              <div v-else-if="indicators.length === 0" class="text-center mt-4">
                <p class="text-muted">No indicator found.</p>
              </div>
              <!-- Indicators List -->
              <div v-else>
                <div
                  v-for="(indicator, index) in indicators"
                  :key="index"
                  class="indicator-item"
                >
                  <div class="indicator-row">
                    <div class="indicator-info">
                      <i
                        :class="[
                          'status-icon',
                          `bi ${indicator.status === 'warning' ? 'bi-exclamation-circle text-danger' : 'bi-exclamation-circle text-secondary'}`
                        ]"
                      ></i>
                      <span class="indicator-name">{{ indicator.name }}</span>
                    </div>
                    <div class="indicator-value">{{ indicator.value }}</div>
                  </div>
                  <div
                    v-if="index < indicators.length - 1"
                    class="indicator-divider"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <button class="view-more-btn">View More</button>
        </div>
      </div>
      <!-- Right Side: Image -->
      <div class="image-section">
        <img
          src="@/assets/img/Prof.Ali_Minister_of_Health.jpg"
          alt="Prof. Ali Minister of Health"
          class="minister-image"
        />
      </div>
    </div>
    <the-footer />
  </div>
</template>

<script>
import axios from 'axios';
import theHeader from '../../../about/layout/theHeader.vue';
import theFooter from '../../../about/layout/theFooter.vue';

export default {
  name: 'IndicatorPreview',
  components: {
    theHeader,
    theFooter,
  },
  data() {
    return {
      activeTab: 'Health Outcomes and Service Coverage',
      tabs: [
        'Health Outcomes and Service Coverage',
        'Disease Surveillance',
        'Health System Input',
        'Quality of Care',
        'Access to Healthcare',
      ],
      indicators: [],
      loading: false,
      cachedData: {},
      dataSourceName: '', // To store fetched datasource name
    };
  },

  methods: {
    async fetchIndicators(tab) {
      this.activeTab = tab;
      this.loading = true;
      this.indicators = [];

      try {
        const response = await axios.get(
          'https://msdat-api.fmohconnect.gov.ng/api/dashboards/',
        );
        const dashboards = response.data;
        const selectedDashboard = dashboards.find(
          (dashboard) => dashboard.title === tab,
        );

        if (selectedDashboard && selectedDashboard.defaultIndicators) {
          // Fetch datasource details using initialDataSource from dashboard
          const datasourceResponse = await axios.get(
            `https://msdat-api.fmohconnect.gov.ng/api/datasources/${selectedDashboard.initialDataSource}/`,
          );
          const datasource = datasourceResponse.data;
          this.dataSourceName = datasource.datasource; // Set data source name

          // Prepare to store indicator names and values
          const indicatorNames = [];
          const indicatorValues = [];

          // Loop through each defaultIndicator
          for (const indicatorId of selectedDashboard.defaultIndicators.slice(0, 3)) {
            // Fetch indicator name
            try {
              const indicatorResponse = await axios.get(
                `https://msdat-api.fmohconnect.gov.ng/api/indicators/${indicatorId}`,
              );
              indicatorNames.push(indicatorResponse.data.short_name);
            } catch (error) {
              console.error(`Error fetching details for indicator ${indicatorId}:`, error);
              indicatorNames.push('Unknown Indicator'); // Fallback for name
            }

            // Fetch years available for the indicator
            let period;
            try {
              const yearsResponse = await axios.get(
                `https://msdat-api.fmohconnect.gov.ng/api/indicators/${indicatorId}/years_available/`,
              );
              const years = yearsResponse.data.years;

              // Extract valid numeric years, then find the latest year
              const numericYears = years
                .map((year) => parseInt(year.trim(), 10)) // Attempt to convert to a number
                .filter((year) => !isNaN(year)); // Keep only valid numbers

              period = numericYears.length ? Math.max(...numericYears) : 'N/A'; // Get the latest year
            } catch (error) {
              console.error(`Error fetching years for indicator ${indicatorId}:`, error);
              period = 'N/A'; // Fallback for period
            }

            // Fetch indicator value
            if (period !== 'N/A') {
              const url = `https://msdat-api.fmohconnect.gov.ng/api/data/?datasource=${datasource.id}&indicator=${indicatorId}&location=1&value_type=5&period=${period}`;
              try {
                const dataResponse = await axios.get(url, { timeout: 30000 });
                const result = dataResponse.data.results[0];
                if (result && result.value) {
                  // Format value with commas
                  indicatorValues.push(parseFloat(result.value).toLocaleString());
                } else {
                  indicatorValues.push(null); // Handle case where no value is found
                }
              } catch (error) {
                console.error(`Error fetching data for indicator ${indicatorId}:`, error);
                indicatorValues.push(null); // Fallback for value
              }
            } else {
              indicatorValues.push('N/A'); // No valid period found
            }
          }

          // Update indicators with fetched names and values
          this.indicators = indicatorNames.map((name, index) => ({
            name,
            value: indicatorValues[index] || 'N/A', // Show "N/A" if no value is available
            status: indicatorValues[index] ? 'normal' : 'warning',
          }));
        }
      } catch (error) {
        console.error('Error fetching indicators:', error);
      } finally {
        this.loading = false;
      }
    },
  },

  mounted() {
    this.fetchIndicators(this.activeTab);
  },
};
</script>

<style scoped>
.dashboard-container {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
}

.classification-section {
  padding: 1rem;
}

.tabs-container {
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  width: 100%;
}

.tab-button {
  flex-grow: 1; /* Allow buttons to grow relative to their content */
  padding: 0.5rem 1rem;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  background-color: white;
  font-size: 0.875rem;
  cursor: pointer;
  text-align: center;
  white-space: nowrap; /* Prevent line breaks inside the button */
  overflow: hidden; /* Hide overflow content */
  text-overflow: ellipsis; /* Show ellipsis if the text overflows */
}

.tab-button:hover {
  background-color: #E5F3F1;
}

.tab-button.active {
  outline: none;
  background-color: #E5F3F1;
  border-color: #348481;
}

.content-wrapper {
  display: flex;
  gap: 2rem;
  padding: 0 1rem 2rem;
  min-height: 756px;
}

.preview-section {
  flex: 1;
  background-color: #E5F3F1;
  border-radius: 0.8rem;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  border: 1px solid #dee2e6;
}

.preview-header {
  padding: 1rem;
  background-color: transparent;
  border-bottom: none;
  text-align: center;
}

.preview-title {
  font-size: 24px;
  font-weight: 600;
  color: #343a40;
  display: inline-block;
}

.preview-content {
  flex: 1;
  background-color: white;
  margin: 0;
  border-radius: 0 0 0.8rem 0.8rem;
  padding: 1.5rem;
  width: 100%;
}

.content-section {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  color: #343a40;
  margin-bottom: 1rem;
}

.section-description {
  color: #6c757d;
  line-height: 1.5;
}

.indicators-section {
  padding: 0 4rem 0 4rem;
  margin-bottom: 2rem;
}

.indicators-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.indicators-title {
  font-size: 22px;
  font-weight: 600;
  color: #343a40;
}

.data-source {
  color: #6c757d;
  font-size: 0.875rem;
}

.source-name {
  font-weight: 600;
  margin-left: 0.25rem;
}

.indicator-item {
  margin-bottom: 1rem;
}

.indicator-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 1rem;
}

.indicator-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
}

.status-icon {
  font-size: 1.5rem;
}

.text-danger {
  color: red;
}

.indicator-name {
  font-weight: 450;
  font-size: 19px;
  color: #343a40;
}

/* Updated indicator-value styles */
.indicator-value {
  width: 160px;
  height: 70px;
  border: 1px solid #348481;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(1.2rem, 4vw, 2.5rem); /* Increased scaling */
  font-weight: 600;
  color: #343a40;
  background-color: white;
  white-space: nowrap; /* Prevent wrapping */
  overflow: hidden; /* Hide any overflow */
  text-overflow: ellipsis; /* Show '...' if the text overflows */
  flex-shrink: 1; /* Allow the text to shrink within the box */
  line-height: 1.2; /* Maintain digits on the same line */
  max-width: 100%; /* Ensure it doesn't overflow outside */
  text-align: right; /* Align the value to the right side */
}

.indicator-divider {
  height: 1px;
  background-color: #dee2e6;
  margin: 1rem 0;
}

.view-more-btn {
  display: block;
  width: 180px;
  margin: 0 auto;
  padding: 0.75rem 1.5rem;
  background-color: #348481;
  color: white;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.view-more-btn:hover {
  background-color: #005432;
}

.image-section {
  width: 550px;
  flex-shrink: 0;
  min-height: 100%;
  margin-bottom: 1rem;
}

.minister-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.8rem;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
}

.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
}

.spinner-segment {
  width: 16px;
  height: 16px;
  background-color: #006B3F;
  border-radius: 50%;
  margin: 0 4px;
  animation: pulse 1.4s ease-in-out infinite;
}

.spinner-segment:nth-child(2) {
  animation-delay: 0.2s;
}

.spinner-segment:nth-child(3) {
  animation-delay: 0.4s;
}

.spinner-segment:nth-child(4) {
  animation-delay: 0.6s;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.5;
    transform: scale(0.75);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
}

.loading-text {
  margin-top: 1.5rem;
  color: #006B3F;
  font-weight: 500;
  font-size: 1.25rem;
}

@media (max-width: 1200px) {
  .content-wrapper {
    flex-direction: column;
    min-height: auto;
  }

  .image-section {
    width: 100%;
    height: 400px;
    margin-bottom: 1rem;
  }
}

@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css");
</style>
