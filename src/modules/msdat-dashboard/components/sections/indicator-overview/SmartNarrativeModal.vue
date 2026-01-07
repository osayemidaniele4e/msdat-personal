<template>
  <transition name="modal-fade">
    <div v-if="show" class="smart-narrative-overlay" @click.self="closeModal">
      <div class="smart-narrative-popup">
        <!-- Header -->
        <div class="sn-header">
          <h3 class="sn-title">SMART NARRATIVE</h3>
          <button class="sn-close-btn" @click="closeModal" aria-label="Close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <!-- Content -->
        <div class="sn-body">
          <!-- Loading State -->
          <div v-if="loading" class="loading-state">
            <div class="spinner"></div>
            <span>Generating smart narrative...</span>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="error-state">
            <p>{{ error }}</p>
            <button @click="generateAnalysis" class="retry-btn">Retry</button>
          </div>

          <!-- Analysis Content -->
          <div v-else class="analysis-content">
            <!-- Structured content from parsed response -->
            <template v-if="parsedSections">
              <!-- Indicator Overview - always shown first -->
              <div v-if="indicatorOverview" class="section-block overview-section">
                <h4 class="section-title">{{ indicatorOverview.title }}</h4>
                <div class="section-content" v-html="formatSectionContent(indicatorOverview.content)"></div>
              </div>
              
              <!-- Remaining sections - shown when expanded -->
              <template v-if="isExpanded && remainingSections">
                <div 
                  v-for="(section, index) in remainingSections" 
                  :key="index" 
                  class="section-block"
                >
                  <h4 class="section-title">{{ section.title }}</h4>
                  <div class="section-content" v-html="formatSectionContent(section.content)"></div>
                </div>
              </template>
            </template>
            
            <!-- Fallback: Legacy display for non-structured responses -->
            <template v-else>
              <div class="summary-paragraph" v-html="summaryParagraph"></div>
              <div v-if="isExpanded && detailedContent" class="detailed-content" v-html="detailedContent"></div>
            </template>
          </div>
        </div>

        <!-- Footer Button -->
        <div class="sn-footer">
          <button 
            v-if="!isExpanded && hasDetailedContent" 
            @click="toggleExpand" 
            class="action-btn"
          >
            Read More
          </button>
          <button 
            v-else 
            @click="closeModal" 
            class="action-btn"
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import analysisService from '@/services/analysisService';
import SmartAnalysisDataService from '@/services/SmartAnalysisDataService';

export default {
  name: 'SmartNarrativeModal',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    values: {
      type: Object,
      required: true
    },
    chartImage: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      loading: false,
      analysis: null,
      error: null,
      isExpanded: false,
      parsedSections: null,
    };
  },
  computed: {
    indicatorOverview() {
      if (!this.parsedSections) return null;
      return this.parsedSections.indicatorOverview;
    },
    remainingSections() {
      if (!this.parsedSections) return null;
      return this.parsedSections.remaining;
    },
    hasRemainingSections() {
      return this.remainingSections && this.remainingSections.length > 0;
    },
    // Legacy computed props for fallback
    summaryParagraph() {
      if (!this.analysis) return '';
      
      const paragraphs = this.analysis.split(/\n\n|\n/);
      const firstParagraph = paragraphs[0] || '';
      
      return this.formatText(firstParagraph);
    },
    detailedContent() {
      if (!this.analysis) return '';
      
      const paragraphs = this.analysis.split(/\n\n|\n/);
      if (paragraphs.length <= 1) return '';
      
      const rest = paragraphs.slice(1).join('\n');
      return this.formatText(rest);
    },
    hasDetailedContent() {
      return this.hasRemainingSections || (this.detailedContent && this.detailedContent.trim().length > 0);
    }
  },
  watch: {
    show(val) {
      if (val) {
        this.isExpanded = false;
        document.body.style.overflow = 'hidden'; // Prevent body scroll
        // Only generate analysis if we don't have one cached
        if (!this.analysis) {
          this.generateAnalysis();
        }
      } else {
        document.body.style.overflow = ''; // Restore body scroll
      }
    },
    // Reset analysis when any control panel value changes
    values: {
      handler() {
        this.analysis = null;
        this.parsedSections = null;
        this.error = null;
        this.isExpanded = false;
      },
      deep: true
    }
  },
  methods: {
    parseModelResponse(text) {
      // Try to parse the model response into sections
      // Supports formats:
      // 1. Markdown h3: "### Section" (preferred - used with ## main title)
      // 2. Markdown h2: "## Section"
      // 3. Numbered: "1. **Section:**"
      
      let sections = [];
      let match;
      
      // First, try h3 markdown heading format (### Heading) - model uses this with ## as main title
      const h3Regex = /###\s*([^\n]+)\n([\s\S]*?)(?=\n###\s|$)/g;
      
      while ((match = h3Regex.exec(text)) !== null) {
        const title = match[1].trim().replace(/\*\*/g, ''); // Remove any bold markers
        const content = match[2].trim();
        if (title && content) {
          sections.push({ title, content });
        }
      }
      
      // If h3 parsing didn't work, try h2 format (## Heading)
      if (sections.length === 0) {
        const h2Regex = /##\s*([^\n]+)\n([\s\S]*?)(?=\n##\s|$)/g;
        
        while ((match = h2Regex.exec(text)) !== null) {
          const title = match[1].trim().replace(/\*\*/g, '');
          const content = match[2].trim();
          if (title && content) {
            sections.push({ title, content });
          }
        }
      }
      
      // If markdown parsing didn't work, try numbered format
      if (sections.length === 0) {
        const numberedRegex = /(\d+)\.\s*\*\*([^:*]+):\*\*\s*([\s\S]*?)(?=\n\d+\.\s*\*\*|$)/g;
        
        while ((match = numberedRegex.exec(text)) !== null) {
          sections.push({
            number: match[1],
            title: match[2].trim(),
            content: match[3].trim()
          });
        }
      }
      
      if (sections.length === 0) {
        // Fallback: couldn't parse, return null to use legacy display
        return null;
      }
      
      // Find Indicator Overview section (usually first)
      const overviewIndex = sections.findIndex(s => 
        s.title.toLowerCase().includes('indicator overview') || 
        s.title.toLowerCase().includes('overview')
      );
      
      let indicatorOverview = null;
      let remaining = [...sections];
      
      if (overviewIndex !== -1) {
        indicatorOverview = sections[overviewIndex];
        remaining = sections.filter((_, i) => i !== overviewIndex);
      } else if (sections.length > 0) {
        // If no explicit overview, use first section
        indicatorOverview = sections[0];
        remaining = sections.slice(1);
      }
      
      return { indicatorOverview, remaining };
    },
    formatSectionContent(content) {
      if (!content) return '';
      return content
        // Format sub-bullets with dashes
        .replace(/^\s*-\s*\*\*([^:*]+):\*\*\s*/gm, '<div class="sub-item"><strong>$1:</strong> ')
        .replace(/^\s*-\s*/gm, '<div class="sub-item">• ')
        // Close div tags (simple approach)
        .replace(/(<div class="sub-item">[^<]*?)(?=<div|$)/g, '$1</div>')
        // Bold text
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        // Line breaks
        .replace(/\n/g, '<br>');
    },
    formatText(text) {
      if (!text) return '';
      return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>');
    },
    toggleExpand() {
      this.isExpanded = true;
    },
    closeModal() {
      this.$emit('close');
    },
    async generateAnalysis() {
      this.loading = true;
      this.error = null;
      
      try {
        const compiledData = await SmartAnalysisDataService.compileAnalysisData(this.values);
        
        // console.log('--- SMART NARRATIVE PAYLOAD ---');
        // console.log(JSON.stringify(compiledData, null, 2));
        // console.log('-------------------------------');

        const result = await analysisService.generateChartAnalysis(
          this.values.indicator, 
          this.chartImage || 'placeholder',
          compiledData
        );
        
        this.analysis = result;
        this.parsedSections = this.parseModelResponse(result);
      } catch (err) {
        console.error('Smart Narrative Error:', err);
        this.error = 'Failed to generate summary. Please try again.';
      } finally {
        this.loading = false;
      }
    }
  },
  mounted() {
    // Move modal to body to escape any positioned parent containers
    document.body.appendChild(this.$el);
  },
  beforeDestroy() {
    document.body.style.overflow = '';
    // Remove element from body if it exists
    if (this.$el && this.$el.parentNode === document.body) {
      document.body.removeChild(this.$el);
    }
  }
};
</script>

<style lang="scss" scoped>
.smart-narrative-overlay {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999 !important;
  padding: 1rem;
}

.smart-narrative-popup {
  background: white;
  border-radius: 8px;
  width: 100%;
  max-width: 550px;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.sn-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background-color: #EBF3F2;
}

.sn-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  letter-spacing: 0.5px;
}

.sn-close-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;

  &:hover {
    color: #333;
  }
}

.sn-body {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 0;
  gap: 1rem;
  color: #666;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #e0e0e0;
  border-top-color: #348481;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-state {
  text-align: center;
  padding: 2rem;
  color: #dc3545;
}

.retry-btn {
  margin-top: 1rem;
  padding: 0.5rem 1.5rem;
  background: none;
  border: 1px solid #dc3545;
  color: #dc3545;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background: #dc3545;
    color: white;
  }
}

.analysis-content {
  color: #333;
}

.section-block {
  margin-bottom: 1.25rem;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.section-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: #348481;
  margin: 0 0 0.5rem 0;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.overview-section .section-title {
  font-size: 1rem;
  color: #1a1a1a;
}

.section-content {
  font-size: 0.95rem;
  line-height: 1.7;
  color: #4a4a4a;
}

.overview-section .section-content {
  font-size: 1.05rem;
  font-weight: 500;
  color: #1a1a1a;
  line-height: 1.8;
}

.sub-item {
  margin: 0.35rem 0;
  padding-left: 0.5rem;
}

.sub-item strong {
  color: #333;
}

.summary-paragraph {
  font-size: 1.15rem;
  font-weight: 600;
  line-height: 1.7;
  color: #1a1a1a;
}

.detailed-content {
  font-size: 0.95rem;
  line-height: 1.7;
  color: #4a4a4a;
  margin-top: 1rem;
}

.sn-footer {
  padding: 1.25rem 1.5rem;
}

.action-btn {
  width: 100%;
  background-color: #357B56;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.875rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #2a6b69;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(53, 123, 86, 0.5);
  }
}

/* Transition animations */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.modal-fade-enter-active .smart-narrative-popup,
.modal-fade-leave-active .smart-narrative-popup {
  transition: transform 0.2s ease;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter .smart-narrative-popup,
.modal-fade-leave-to .smart-narrative-popup {
  transform: scale(0.95);
}
</style>


