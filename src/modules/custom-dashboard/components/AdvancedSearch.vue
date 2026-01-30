<template>
  <div class="modal-overlay"
  @click.self="closeModal" >
    <div class="modal-container">
      <!-- Modal Header -->
      <div class="modal-header">
        <p class="modal-title">Advanced Search</p>
        <button class="close-button" @click="closeModal">X</button>
      </div>

      <!-- Modal Content -->
      <div class="m-content">
        <div v-if="!selectedProgramArea" class="program-areas">
          <div class="section-title">Program Areas</div>
        <!-- New search input for program areas -->
    <div class="program-area-search">
      <input
        type="text"
        v-model="programAreaSearchTerm"
        placeholder="Search Program Areas"
        class="search-input"
      />
    </div>
          <TheLoader v-if="loading" />
          <div class="radio-container">
      <div
        v-for="(area, index) in filteredProgramAreas"
        :key="area.parent.value + '-' + index"
        class="radio-item"
      >
        <label style="cursor: pointer; display: flex; align-items: center;">
          <input
            type="radio"
            :value="area.parent.value"
            v-model="selectedProgramArea"
            style="margin-right: 8px;"
          />
          {{ area.parent.value }}
        </label>
      </div>
    </div>
        </div>

        <div v-else>
          <div class="selected-area-header">
            <p @click="goBackToProgramAreas" class="back-button">←</p>
          </div>

          <div class="select-all">
            <p>Indicators in {{  selectedProgramArea  }}</p>
            <button  style="
            padding: 0;
            font-size: 12px;
            font-family: Work Sans, sans-serif;
            background: none;
            border: none;
            cursor: pointer;
            color: #4aa0a1;
            text-decoration: none;
            white-space: nowrap;
          " @click="toggleSelectAll">
              {{ allIndicatorsSelected ? "Deselect All" : "Select All" }}
            </button>
          </div>

          <div class="indicator-list">
            <!-- eslint-disable-next-line -->
            <div v-for="(indicator, index) in filteredIndicators"
              :key="indicator.id"
              class="indicator-item"
            >
              <input
                type="checkbox"
                :id="indicator.short_name"
                :value="indicator.short_name"
                :checked="isSelected(indicator)"
                @click="selectIndicator(indicator)"
              />
              <label :for="indicator.short_name">{{ indicator.short_name }}</label>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Footer -->
      <div >
        <div style="display: flex; justify-content: center; font-size: 20px; padding: 10px; color: #035C6E;" v-if="!selectedProgramArea">
  Select a Program Area to Select Indicators under it.
  </div>
  <div class="modal-footer">

    <button class="cancel-button" @click="closeModal">Cancel</button>
    <button class="apply-button" @click="applySelection">Apply</button>
  </div>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/extensions
import TheLoader from './Loading/TheLoader2';

export default {
  components: {
    TheLoader,
  },
  props: {},
  data() {
    return {
      selectedProgramArea: null,
      searchTerm: '',
      allIndicatorsSelected: false,
      selectedIndicators: [],
      programAreaSearchTerm: '',
    };
  },
  created() {
    this.loadIndicators();
  },
  computed: {
    loading() {
      return this.$store.getters.Indicatorloading;
    },
    heading() {
      return this.$store.getters.getprogramArea;
    },
    filteredIndicators() {
      if (!this.selectedProgramArea) return [];
      const currentArea = this.heading.find(
        (area) => area.parent.value === this.selectedProgramArea,
      );
      if (!currentArea) return [];
      const indicators = currentArea.children;

      if (!this.searchTerm.trim()) return indicators;
      return indicators.filter((indicator) => indicator.short_name.toLowerCase().includes(this.searchTerm.toLowerCase()));
    },
    filteredProgramAreas() {
      if (!this.programAreaSearchTerm.trim()) return this.heading;
      return this.heading.filter((area) => area.parent.value.toLowerCase().includes(this.programAreaSearchTerm.toLowerCase()));
    },
  },
  methods: {
    loadIndicators() {
      this.$store.dispatch('loadIndicators');
    },
    loadIndicatorsForArea(area) {
      this.selectedProgramArea = area.parent.value;
      this.selectedIndicators = [];
      this.allIndicatorsSelected = false;
    },
    goBackToProgramAreas() {
      this.selectedProgramArea = null;
      this.searchTerm = '';
      this.allIndicatorsSelected = false;
    },
    toggleSelectAll() {
      if (this.allIndicatorsSelected) {
        this.selectedIndicators = [];
      } else {
        const currentArea = this.heading.find(
          (area) => area.parent.value === this.selectedProgramArea,
        );
        if (currentArea) {
          this.selectedIndicators = currentArea.children.map((indicator) => indicator.short_name);
        }
      }
      this.allIndicatorsSelected = !this.allIndicatorsSelected;
    },
    isSelected(indicator) {
      return this.selectedIndicators.includes(indicator.short_name);
    },
    selectIndicator(indicator) {
      if (this.selectedIndicators.includes(indicator.short_name)) {
        this.selectedIndicators = this.selectedIndicators.filter(
          (id) => id !== indicator.short_name,
        );
      } else {
        this.selectedIndicators.push(indicator.short_name);
      }
    },
    closeModal() {
      this.$emit('close');
    },
    applySelection() {
      this.$emit('apply', {
        programArea: this.selectedProgramArea,
        indicators: this.selectedIndicators,
      });
    },
  },
};
</script>
<style lang="css" scoped>
.modal-overlay {
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

.modal-container {
  background: #fff;
  width: 700px;
  max-height: 80vh;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.program-area-search {
  padding: 10px 16px;
}

.search-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;

}

.modal-title {
  font-size: 24px;
  font-weight: bold;
}

.section-title {
  font-size: 18px;
  padding: 16px 16px 8px 16px;
  color: #A3A3A3;
  border-bottom: 1px solid #ddd;
}

.close-button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

/* Two Columns for Radio Items */
.radio-container {
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Two equal-width columns */
  gap: 16px; /* Space between items */
}

.radio-item {
  display: flex;
  align-items: center;
  justify-content: start;
  font-size: 14px;
}

.radio-item input {
  margin-right: 8px;
}
.m-content {
  padding: 16px;
  overflow-y: auto;
}
.indicator-list {
  padding: 16px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.indicator-item {
  display: flex;
  align-items: center;
  font-size: 14px;
  gap: 8px;
}

.select-all{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  border-bottom: 1px solid #ddd;
}

.select-all p{
  color: #A3A3A3;
  font-size: 15px;
  margin-bottom: -3px;
}

.select-all button{
  background: none;
  font-size: 18px;
  border: none;
  cursor: pointer;
  color: #4aa0a1;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 16px;
}
.back-button {
  font-size: 24px;
  cursor: pointer;
}

.cancel-button,
.apply-button {
  font-size: 14px;
  padding: 8px 26px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.cancel-button {
  background: #F2FAFA;
}

.apply-button {
  background: #035C6E;
  color: white;
}
</style>
