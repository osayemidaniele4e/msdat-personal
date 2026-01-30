<template>
 <div v-if="show" class="relationship-popup" @click.self="$emit('close')">
   <div class="popup-content">
     <div class="popup-header">
       <h4>Indicator Analysis</h4>
       <button class="close-btn" @click="$emit('close')">&times;</button>
     </div>
     <div class="popup-body">
       <!-- Show single analysis for all selected indicators -->
       <div class="indicator-analysis">
         <div v-if="indicators.length === 1" class="single-indicator-summary">
           <h3>{{ indicators[0].short_name }}</h3>
           <p class="program-area">Program Area: {{ indicators[0].program_area }}</p>

           <div class="analysis-summary">
             <p class="summary-title">Indicator Summary:</p>
             <div class="summary-content" v-if="summaries[0]" v-html="formatSummary(summaries[0])"></div>
             <div v-else class="summary-loading">
               <span v-if="loading">Generating analysis...</span>
               <span v-else class="error-text">{{ errorMessage }}</span>
             </div>
           </div>
         </div>

         <div v-else-if="indicators.length > 1" class="multiple-indicators-relationship">
           <h3>Selected Indicators Relationship Analysis</h3>
           <div class="selected-indicators-list">
             <ul>
               <li v-for="indicator in indicators" :key="indicator.id">
                 {{ indicator.short_name }} ({{ indicator.program_area }})
               </li>
             </ul>
           </div>

           <div class="relationship-summary">
             <p class="summary-title">Relationship Analysis:</p>
             <div class="summary-content" v-if="summaries[0]" v-html="formatSummary(summaries[0])"></div>
             <div v-else class="summary-loading">
               <span v-if="loading">Generating analysis...</span>
               <span v-else class="error-text">{{ errorMessage }}</span>
             </div>
           </div>
         </div>

         <p v-else class="no-indicators">No indicators selected</p>
       </div>
     </div>
   </div>
 </div>
</template>

<script>
import generateIndicatorSummary from '@/services/groqService';

export default {
  name: 'IndicatorRelationshipPopup',
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    indicators: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      summaries: {},
      loading: false,
      errorMessage: '',
    };
  },
  methods: {
    formatSummary(summary) {
      // Parse AI response into HTML
      // Convert headers, bold text and list items
      if (!summary) return '';

      const formattedText = summary
      // Format headers
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Format section dividers
        .replace(/=+/g, '<hr class="section-divider">')
      // Format bullet points
        .replace(/\* (.*?)(?=\n|$)/g, '<li>$1</li>')
      // Wrap lists in ul tags
        .replace(/<li>(.*?)(?=<li>|$)/gs, (match) => `<ul>${match}</ul>`)
      // Format paragraphs
        .replace(/(?<=<\/ul>|<hr>|^)(.*?)(?=<ul>|<hr>|$)/gs, (match) => {
          if (match.trim()) {
            return `<p>${match.trim()}</p>`;
          }
          return '';
        });

      return formattedText;
    },
  },
  watch: {
    show: {
      immediate: true,
      async handler(newVal) {
        if (newVal && this.indicators.length) {
          this.loading = true;
          this.errorMessage = '';
          try {
            // Generate a single summary for all selected indicators
            const summary = await generateIndicatorSummary(this.indicators);
            this.$set(this.summaries, 0, summary);
          } catch (error) {
            this.errorMessage = 'Failed to generate indicator analysis.';
            console.error('Error:', error);
          } finally {
            this.loading = false;
          }
        }
      },
    },
  },
};
</script>

<style lang="scss">
.relationship-popup {
 position: fixed;
 top: 0;
 left: 0;
 width: 100%;
 height: 100%;
 background: rgba(0, 0, 0, 0.5);
 display: flex;
 justify-content: center;
 align-items: center;
 z-index: 1000;
}

.popup-content {
 background: white;
 border-radius: 12px;
 width: 90%;
 max-width: 700px;
 max-height: 85vh;
 overflow-y: auto;
 box-shadow: 0 5px 25px rgba(0, 0, 0, 0.15);
 border: 1px solid rgba(23, 96, 107, 0.1);
}

.popup-header {
 padding: 15px;
 border-bottom: 1px solid #eee;
 display: flex;
 justify-content: space-between;
 align-items: center;

 h4 {
   margin: 0;
   color: #17606B;
 }
}

.close-btn {
 background: none;
 border: none;
 font-size: 24px;
 cursor: pointer;
 color: #666;

 &:hover {
   color: #E85D58;
 }
}

.popup-body {
 padding: 15px;
}

.indicator-analysis {
 background: white;
 border-radius: 10px;
 padding: 20px;
 font-size: 18px;
 box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.program-area {
 color: #666;
 font-size: 0.9em;
 margin: 5px 0;
}

.single-indicator-summary,
.multiple-indicators-relationship {
 h3 {
   color: #17606B;
   margin-bottom: 10px;
 }
}

.selected-indicators-list {
 margin: 15px 0;
 font-size: 1.1rem !important; // Add font-size here for the container

 ul {
   font-size: 1.1rem !important; // Keep consistent font-size
   list-style: none;
   padding-left: 15px;
   margin: 0;

   li {
     margin: 8px 0;
     color: #17606B;
     font-weight: 500;
     font-size: 1.1rem !important; // Ensure li elements have the right size
   }
 }
}

.analysis-summary,
.relationship-summary {
 margin-top: 15px;
 padding: 15px;
 background-color: #f8f9fa;
 border-radius: 8px;
 border: 1px solid rgba(23, 96, 107, 0.1);

 .summary-title {
   font-weight: 600;
   color: #17606B;
   margin-bottom: 12px;
   font-size: 1.7rem;
 }

 .summary-content {
   line-height: 1.6;
   color: #2c3e50;
   font-size: 1.1rem !important;

   strong, b {
     color: #17606B;
     font-weight: 600;
   }

   ul {
     padding-left: 20px;
     margin: 10px 0;
   }

   li {
     margin: 8px 0;
   }

   p {
     margin: 12px 0;
     font-size: 1.1rem !important;
   }

   hr.section-divider {
     border: 0;
     height: 1px;
     background: rgba(23, 96, 107, 0.2);
     margin: 15px 0;
   }
 }

 .summary-loading {
   font-style: italic;
   color: #666;
   padding: 12px;
   text-align: center;
   background: rgba(23, 96, 107, 0.05);
   border-radius: 6px;
 }

 .error-text {
   color: #E85D58;
   border-radius: 6px;
   border-left: 3px solid #E85D58;
   font-size: 0.9em;
 }
}

.no-indicators {
 color: #666;
 font-style: italic;
 text-align: center;
 padding: 20px;
}
</style>
