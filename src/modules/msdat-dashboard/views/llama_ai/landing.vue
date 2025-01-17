<template>
  <div>
    <theHeader />
    <div class="content-wrapper">
      <!-- Indicator Selection Section -->
      <div class="indicator-selection card">
        <label for="indicatorDropdown">Select an Indicator:</label>
        <b-form-select
          id="indicatorDropdown"
          v-model="selectedIndicatorId"
          :options="indicatorOptions"
          @change="onIndicatorChange"
          class="mb-3 select-from"
        >
          <template #first>
            <option value="" disabled>Select an indicator...</option>
          </template>
        </b-form-select>
      </div>

      <!-- Display Metadata -->
      <div v-if="indicatorMetadata" class="card">
        <h3>Indicator Metadata</h3>
        <p><strong>Full Name:</strong> {{ indicatorMetadata.full_name }}</p>
        <p><strong>Short Name:</strong> {{ indicatorMetadata.short_name }}</p>
        <p><strong>Program Area:</strong> {{ indicatorMetadata.program_area }}</p>
        <p><strong>Desirable Slope:</strong> {{ indicatorMetadata.desirable_slope }}</p>
        <!-- <h4>Data Sources</h4>
        <ul>
          <li v-for="dataSource in dataSourceNames" :key="dataSource.id">
            <strong>{{ dataSource.name }}</strong>
          </li>
        </ul>
        <h4>Related Indicators</h4>
        <ul>
          <li v-for="indicator in relatedIndicatorNames" :key="indicator.id">{{ indicator.name }}</li>
        </ul> -->
      </div>

      <!-- AI Query Section -->
      <div v-if="indicatorMetadata" class="card">
        <h3>Ask a Question about the Metadata</h3>
        <b-form-group label="Your Question">
          <b-form-input
            v-model="aiQuery"
            placeholder="Type your question here..."
          ></b-form-input>
        </b-form-group>
        <b-button
          @click="queryAIModel"
          :disabled="!aiQuery || loadingResponse"
          variant="primary"
        >
          <span v-if="loadingResponse">
            <b-spinner></b-spinner> Loading...
          </span>
          <span v-else>Ask</span>
        </b-button>

        <!-- AI Response Section -->
        <div v-if="loadingResponse" class="ai-response">
          <h4>AI Response:</h4>
          <b-spinner class="spinner-large"></b-spinner>
          <p>Fetching response...</p>
        </div>
        <div v-else-if="aiResponse" class="ai-response">
          <h4>AI Response:</h4>
          <div v-html="styledAiResponse"></div>
        </div>
      </div>
    </div>
    <theFooter />
  </div>
</template>

<script>
import mixin from '@/modules/data-layer/mixin';
import apiServices from '@/modules/data-layer/services/ApiServices';
import axios from 'axios';
import theHeader from '../about/layout/theHeader.vue';
import theFooter from '../about/layout/theFooter.vue';

export default {
  components: {
    theHeader,
    theFooter,
  },
  mixins: [mixin],
  data() {
    return {
      searchTerm: '',
      selectedIndicatorId: null,
      indicatorMetadata: null,
      aiQuery: '', // Store the user query
      aiResponse: null, // Store the AI model's response
      isLoading: false, // Loading state for the ask button
      loadingResponse: false, // Loading state for the AI response
      dataSourceNames: [], // Store the names of data sources
      relatedIndicatorNames: [], // Store the names of related indicators
    };
  },
  computed: {
    styledAiResponse() {
      if (!this.aiResponse) return '';

      let response = this.aiResponse;

      response = response.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

      response = response.replace(/(\n\* )(.*?)(\n|$)/g, '<li>$2</li>');
      response = response.replace(/<li>.*?<\/li>(?!<li>)/g, '<ul>$&</ul>');

      response = response.replace(/(\n\d+\.\s)(.*?)(\n|$)/g, '<li>$2</li>');
      response = response.replace(/<li>.*?<\/li>(?!<li>)/g, '<ol>$&</ol>');

      response = response.replace(/\n/g, '<br>');

      return response;
    },

    filteredIndicators() {
      if (!this.searchTerm.trim()) return this.indicators;
      const searchLower = this.searchTerm.toLowerCase();
      return this.indicators.filter((indicator) => indicator.short_name.toLowerCase().includes(searchLower));
    },
    indicators() {
      const programArea = this.$store.getters.getprogramArea || [];
      return programArea.flatMap((section) => section.children.map((child) => ({
        id: child.id,
        short_name: child.short_name,
      })));
    },
    indicatorOptions() {
      return this.filteredIndicators.map((indicator) => ({
        value: indicator.id,
        text: indicator.short_name,
      }));
    },
  },
  created() {
    this.loadIndicators();
  },

  watch: {
    indicators(newIndicators) {
      if (newIndicators.length > 0 && !this.selectedIndicatorId) {
        this.selectedIndicatorId = newIndicators[0].id;
        this.onIndicatorChange();
      }
    },
  },

  methods: {
    loadIndicators() {
      this.$store.dispatch('loadIndicators');
    },
    async onIndicatorChange() {
      if (this.selectedIndicatorId) {
        try {
          const response = await apiServices.getSingleIndicatorObj(this.selectedIndicatorId);
          this.indicatorMetadata = response.data;
          console.log('Indicator Metadata:', this.indicatorMetadata);
          this.mapIdsToNames();
        } catch (error) {
          console.error('Error fetching indicator metadata:', error);
        }
      } else {
        this.indicatorMetadata = null;
      }
    },
    async queryAIModel() {
      const apiEndpoint = 'https://ollamapi.e4eweb.space/api/chat';

      // Collect additional metadata
      const additionalMetadata = {
        relatedIndicators: this.relatedIndicatorNames.map((indicator) => indicator.name).join(', '),
        dataSources: this.dataSourceNames.map((source) => source.name).join(', '),
        descriptions: this.dataSourceNames.map((source) => source.description).join(' | '),
        datasource_methodology: this.dataSourceNames.map((source) => source.datasource_methodology).join(' | '),
        datasource_year_available: this.dataSourceNames.map((source) => source.datasource_year_available).join(' | '),
      };

      const requestBody = {
        model: 'llama3.2:3b',
        stream: false,
        options: { num_ctx: 32768 },
        messages: [
          {
            role: 'system', content: `You are an AI model designed to provide insights about indicator metadata within the MSDAT (MultiSource Data Triangulation) Nigeria platform. 
Your purpose is to analyze and explain indicators, which are derived from multiple data sources, each with specific methodologies, descriptions, validation statuses, and geographic coverage. 
These indicators may also relate to various program areas, policies, and historical trends. Use this context to provide accurate, comprehensive, and contextually relevant insights.  Note:it is important to state that all these indicators, datasources etc are available on the MSDAT platform.`,
          },
          {
            role: 'user',
            content: `Provide insights for the following indicator metadata:
        - Full Name: ${this.indicatorMetadata.full_name}
        - Short Name: ${this.indicatorMetadata.short_name}
        - Program Area: ${this.indicatorMetadata.program_area}
        - Desirable Slope: ${this.indicatorMetadata.desirable_slope}
        - Related Indicators: ${additionalMetadata.relatedIndicators}
        - Data Sources: ${additionalMetadata.dataSources}
        - Data Source Methodology: ${additionalMetadata.datasource_methodology}
        - Data Source Year Available: ${additionalMetadata.datasource_year_available}
        - Descriptions: ${additionalMetadata.descriptions}
        
        Question: ${this.aiQuery}`,
          },
        ],
        temperature: 0.7,
      };

      // Set loading state to true
      this.loadingResponse = true;
      this.aiResponse = null;

      try {
        const response = await axios.post(apiEndpoint, requestBody);
        console.log('AI API Response:', response);

        // Extract the AI response content
        if (response.data && response.data.message && response.data.message.content) {
          this.aiResponse = response.data.message.content;
        } else {
          this.aiResponse = 'Unexpected response structure received.';
          console.warn('Unexpected API response:', response);
        }
      } catch (error) {
        console.error('Error querying AI model:', error);
        this.aiResponse = 'An error occurred while querying the AI model. Please try again later.';
      } finally {
        // Set loading state to false
        this.loadingResponse = false;
      }

      console.log('Extracted AI Response:', this.aiResponse);
    },

    async mapIdsToNames() {
      if (this.indicatorMetadata) {
        const dataSourceIds = this.indicatorMetadata.datasources || [];
        console.log('Data Source IDs:', dataSourceIds);
        const relatedIndicatorIds = [
          this.indicatorMetadata.first_related,
          this.indicatorMetadata.second_related,
          this.indicatorMetadata.third_related,
        ].filter((id) => id); // Filter out undefined or null values

        // Fetch data source names
        const dataSourcePromises = dataSourceIds.map((id) => apiServices.getSingleDataSourceObj(id));
        // console log the data source promises
        console.log('Data Source Promises:', dataSourcePromises);
        const dataSourceResponses = await Promise.all(dataSourcePromises);
        this.dataSourceNames = dataSourceResponses.map((response) => ({
          id: response.data.id,
          name: response.data.datasource,
          fullName: response.data.full_name,
          description: response.data.description,
          datasource_methodology: response.data.methodology,
          datasource_year_available: response.data.year_available,
        }));
        console.log('Data Source Names:', this.dataSourceNames);

        // Fetch related indicator names
        const relatedIndicatorPromises = relatedIndicatorIds.map((id) => apiServices.getSingleIndicatorObj(id));
        const relatedIndicatorResponses = await Promise.all(relatedIndicatorPromises);
        this.relatedIndicatorNames = relatedIndicatorResponses.map((response) => ({
          id: response.data.id,
          name: response.data.short_name,
        }));
        console.log('Related Indicator Names:', this.relatedIndicatorNames);
      }
    },
  },
  mounted() {
    this.loadIndicators();
  },
};
</script>

<style scoped>

.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-bottom:40px;
  animation: fadeIn 1s ease-in-out;
}

.card {
  max-width: 600px;
  width: 100%;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  opacity: 0;
  transform: translateY(20px);
  animation: cardFadeIn 0.8s ease-out forwards;
}

.card h3, .card p {
  animation: textPopIn 0.5s ease-in-out;
}

.select-from {
  width: 100%;
}

.b-spinner {
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  width: 12px;
  height: 12px;
  animation: spin 0.8s linear infinite;
}

.spinner-large {
  display: block;
  margin: 10px auto;
  width: 24px;
  height: 24px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes cardFadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes textPopIn {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
