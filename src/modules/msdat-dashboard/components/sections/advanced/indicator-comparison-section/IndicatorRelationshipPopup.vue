<template>
 <div v-if="show" class="relationship-popup" @click.self="$emit('close')">
   <div class="popup-content">
     <div class="popup-header">
       <h4>Indicator Relationships</h4>
       <button class="close-btn" @click="$emit('close')">&times;</button>
     </div>
     <div class="popup-body">
       <div v-for="(indicator, index) in indicators" :key="index" class="indicator-group">
         <h5>{{ indicator.short_name }}</h5>
         <p class="program-area">Program Area: {{ indicator.program_area }}</p>

         <div v-if="indicator.relatedIndicators.length" class="related-section">
           <div class="related-indicators">
             <p class="relation-title">Related Indicators:</p>
             <ul>
               <li v-for="related in indicator.relatedIndicators" :key="related.id">
                 {{ related.short_name }} ({{ related.program_area }})
               </li>
             </ul>
           </div>

           <div class="relationship-summary">
             <p class="summary-title">Relationship Analysis:</p>
             <div class="summary-content" v-if="summaries[index]" v-html="formatSummary(summaries[index])"></div>
             <div v-else class="summary-loading">
               <span v-if="loading">Generating analysis...</span>
               <span v-else class="error-text">{{ errorMessage }}</span>
             </div>
           </div>
         </div>

         <p v-else class="no-relations">No related indicators found</p>
       </div>
     </div>
   </div>
 </div>
</template>

<script>
import generateRelationshipSummary from '@/services/groqService';

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
            const promises = this.indicators.map((indicator, index) => {
              if (indicator.relatedIndicators.length) {
                return generateRelationshipSummary(
                  indicator,
                  indicator.relatedIndicators,
                ).then((summary) => {
                  this.$set(this.summaries, index, summary);
                });
              }
              return Promise.resolve();
            });
            await Promise.all(promises);
          } catch (error) {
            this.errorMessage = 'Failed to generate relationship analysis.';
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

<style lang="scss" scoped>
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

.indicator-group {
 background: white;
 border-radius: 10px;
 padding: 20px;
 margin-bottom: 25px;
 box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.program-area {
 color: #666;
 font-size: 0.9em;
 margin: 5px 0;
}

.relation-title {
 font-weight: bold;
 margin: 10px 0 5px;
}

.related-indicators ul {
 list-style: none;
 padding-left: 15px;
 margin: 0;

 li {
   margin: 5px 0;
   color: #17606B;
 }
}

.no-relations {
 color: #666;
 font-style: italic;
}

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
   font-size: 25px;
   line-height: 1.6;
   color: #2c3e50;

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

.related-section {
 border-left: 3px solid #17606B;
 padding-left: 20px;
 margin-top: 15px;
}
</style>
