<template>
  <div v-if="show" class="overlay">
    <transition name="slide">
      <div class="content-wrapper">
        <div class="w-100 h-100 wrapper-content">
          <div class="create-header">
            <span>Create New Tag</span>
            <img @click="handleClose" src="../../../../../assets/svg/close.svg" alt="close-icon" />
          </div>

          <!-- Loading State -->
          <div
            v-if="loading"
            class="w-100 h-100 d-flex flex-column align-items-center loading-item"
          >
            <div class="spinner-border fs-4 text-success mx-3 mb-2" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <h4>Please wait while Indicators data load</h4>
          </div>

          <!-- Form -->
          <div v-else class="create-content g-3">
            <!-- Tag Name -->
            <div class="mb-3 mt-4">
              <label>Tag Name</label>
              <input
                v-model="tagName"
                type="text"
                placeholder="Enter Tag Name"
                :class="{ 'is-invalid': errors.tagName }"
              />
            </div>

            <!-- Program Area -->
            <div class="mb-3">
              <label>Program Area:</label>
              <select
                v-model="selectedProgramArea"
                @change="updateIndicators"
                class="form-control"
                :class="{ 'is-invalid': errors.programArea }"
              >
                <option disabled value="">-- Select Program Area --</option>
                <option v-for="area in programAreas" :key="area" :value="area">
                  {{ area }}
                </option>
              </select>
            </div>

            <!-- Description -->
            <div class="mb-3 d-flex flex-column">
              <label>Description</label>
              <textarea
                placeholder="Enter Tag Description"
                v-model="description"
                rows="3"
                :class="{ 'is-invalid': errors.description }"
              ></textarea>
            </div>

            <!-- Indicators -->
            <div v-if="filteredIndicators.length" class="d-flex flex-column mt-3">
              <label>Associated Indicators ( {{ selected.length }} )</label>
              <div class="dropdown" :class="{ 'is-invalid': errors.indicators }">
                <button class="dropdown-btn" @click="open = !open">
                  <span>Select Indicators</span>
                </button>

                <div v-if="open" @mouseleave="open = false" class="dropdown-list">
                  <div
                    v-for="option in filteredIndicators"
                    :key="option.id"
                    :class="['dropdown-item', isSelected(option) ? 'selected-dropdown-item' : '']"
                    @click="toggleOption(option)"
                  >
                    <span>{{ option.full_name }}</span>
                    <span v-if="isSelected(option)">✔️</span>
                  </div>
                </div>
              </div>

              <div class="results-wrapper py-2">
                <p v-for="indicator in selected" :key="indicator.id" class="py-1 px-2">
                  {{ indicator.full_name }}
                </p>
              </div>
            </div>
          </div>

          <div class="create-footer">
            <button @click="handleClose" class="btn btn-secondary mr-2 py-3 px-5">Cancel</button>
            <button @click="saveTag" class="btn btn-primary py-3 px-5">Save Tag</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import apiServices from '@/modules/data-layer/services/ApiServices';

export default {
  data() {
    return {
      show: false,
      indicators: [],
      grouped: {},
      programAreas: [],
      selectedProgramArea: '',
      filteredIndicators: [],
      selected: [],
      open: false,
      description: '',
      tagName: '',
      loading: true,
      errors: {}, // ✅ track invalid fields
    };
  },

  methods: {
    async getAllIndicators() {
      try {
        const { data } = await apiServices.fetchAllIndicators();
        this.indicators = data.results || [];

        // ✅ group by program_area
        this.grouped = this.indicators.reduce((acc, item) => {
          const key = item.program_area || 'Uncategorized';
          if (!acc[key]) acc[key] = [];
          acc[key].push(item);
          return acc;
        }, {});

        this.programAreas = Object.keys(this.grouped);
      } catch (err) {
        console.error('Failed to fetch indicators:', err);
      } finally {
        this.loading = false;
      }
    },

    updateIndicators() {
      this.filteredIndicators = this.grouped[this.selectedProgramArea] || [];
      this.selected = []; // reset selection when program area changes
    },

    handleClose() {
      this.$emit('close');
    },

    toggleOption(option) {
      const index = this.selected.findIndex((o) => o.id === option.id);
      index > -1 ? this.selected.splice(index, 1) : this.selected.push(option);
    },

    isSelected(option) {
      return this.selected.some((o) => o.id === option.id);
    },

    async saveTag() {
      // Reset errors
      this.errors = {};

      // Validate required fields
      if (!this.tagName.trim()) this.errors.tagName = true;
      if (!this.selectedProgramArea) this.errors.programArea = true;
      if (!this.description.trim()) this.errors.description = true;
      if (!this.selected.length) this.errors.indicators = true;

      // Stop save if validation fails
      if (Object.keys(this.errors).length) {
        this.$swal({
          toast: true,
          position: 'botom-left',
          showConfirmButton: false,
          timer: 5000,
          icon: 'error',
          title: 'Validation failed',
        });
        console.error('❌ Validation failed');
        return;
      }

      // Build payload if valid
      const payload = {
        name: this.tagName.trim(),
        category: this.selectedProgramArea,
        description: this.description.trim(),
        indicators: this.selected.map((indicator) => indicator.id),
      };

      console.log('✅ Final Payload:', payload);
      const response = await apiServices.tagIndicator(payload);
      console.log(response, '@<>@');
      if (response.status === '201') {
        this.handleClose();
        this.$emit('refresh');
      } else {
        this.$swal({
          toast: true,
          position: 'botom-left',
          showConfirmButton: false,
          timer: 5000,
          icon: 'error',
          title: 'Error Taging indicator',
        });
      }
    },
  },

  mounted() {
    this.show = true;
    this.getAllIndicators();
  },
};
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  z-index: 9999;
}

.content-wrapper {
  width: 500px;
  height: 770px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 150px;
  right: 40px;
  background-color: #e0e0e0;
  border-radius: 8px;
}

/* Transition styles */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(120%);
  opacity: 0;
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.create-header {
  height: 60px;
  width: 100%;
  position: absolute;
  top: 0;
  background-color: #e0e0e0;
  border-bottom: 1px solid #d3d0d0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.create-header span {
  font-size: 18px;
  font-weight: 800;
  color: #333333;
}

.create-header img {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.loading-item {
  margin-top: 200px;
}

.create-content {
  padding-top: 60px;
  padding-left: 20px;
  padding-right: 20px;
}
.create-content label {
  font-size: 16px;
  font-weight: 400;
  color: #555555;
}
.create-content input,
.create-content select,
.create-content textarea {
  width: 100%;
  height: 46px;
  border-radius: 4px;
  border: 1px solid #c0bdbd;
  padding: 0 10px;
  background-color: inherit;
}

/* ✅ Red border for invalid fields */
.is-invalid {
  border: 1px solid red !important;
  border-radius: 4px;
}

.dropdown {
  position: relative;
  display: inline-block;
}
.dropdown-btn {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: inherit;
  cursor: pointer;
  width: 100%;
  text-align: left;
}
.dropdown-list {
  position: absolute;
  margin-top: 4px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 100%;
  z-index: 10;
  max-height: 250px;
  overflow-y: auto;
  overflow-x: hidden;
  white-space: normal;
  word-break: break-word;
  box-sizing: border-box;
}
.dropdown-item {
  display: flex;
  align-items: flex-start;
  padding: 8px 12px;
  gap: 8px;
  cursor: pointer;
  overflow: visible;
  text-overflow: unset;
  white-space: normal;
}
.selected-dropdown-item span {
  color: #007d53;
}

.create-footer {
  height: 70px;
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: inherit;
  border-top: 1px solid #d3d0d0;
  display: flex;
  justify-content: end;
  align-items: center;
}
.create-footer button {
  font-size: 14px;
  margin-right: 10px;
}

.results-wrapper {
  margin-top: 10px;
  height: 200px;
  width: 100%;
  border: 1px solid #d3d0d0;
  overflow-y: auto;
  padding: 0 5px;
}
.results-wrapper p {
  border: 1px solid #c2bebe;
  border-radius: 4px;
}
</style>
