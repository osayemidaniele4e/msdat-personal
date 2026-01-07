<template>
  <div class="position-absolute create-wrapper" >
    <div class="w-100 bg-white create-wrapper">
      <div class="create-header">
        <span>Create New Tag</span>
        <img @click="handleClose" src="@/assets/close.png" alt="close-icon" />
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="w-100 h-100 d-flex flex-column align-items-center loading-item">
        <div class="spinner-border fs-4 text-success mx-3 mb-2" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        <h4>Please wait while Indicators data load</h4>
      </div>

      <!-- Form -->
      <div v-else class="create-content g-3">
        <div class="mb-3 mt-4">
          <label>Tag Name</label>
          <input v-model="tagName" type="text" placeholder="Enter Tag Name" />
        </div>

        <!-- ✅ Program Area dropdown -->
        <div class="mb-3">
          <label>Program Area:</label>
          <select v-model="selectedProgramArea" @change="updateIndicators" class="form-control">
            <option disabled value="">-- Select Program Area --</option>
            <option v-for="area in programAreas" :key="area" :value="area">
              {{ area }}
            </option>
          </select>
          
        </div>

        <div class="mb-3 d-flex flex-column">
          <label>Description</label>
          <textarea v-model="description" rows="5"></textarea>
        </div>

        <!-- ✅ Indicators list from selected program area -->
        <div v-if="filteredIndicators.length" class="d-flex flex-column mt-5">
          <label>Associated Indicators ( {{ selected.length }} )</label>

          <div class="dropdown">
            <!-- Button -->
            <button class="dropdown-btn" @click="open = !open">
              <span>Select Indicators</span>
            </button>

            <!-- List -->
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
        </div>
      </div>

      <div class="create-footer">
        <button class="btn btn-secondary mr-2 py-3 px-5">Cancel</button>
        <button @click="saveTag" class="btn btn-primary py-3 px-5">Save Tag</button>
      </div>
    </div>
  </div>
</template>

<script>
import apiServices from '@/modules/data-layer/services/ApiServices';

export default {
  data() {
    return {
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
    saveTag() {
      console.log('Saving:', {
        tagName: this.tagName,
        programArea: this.selectedProgramArea,
        description: this.description,
        indicators: this.selected,
      });
      // TODO: integrate save API
    },
  },
  mounted() {
    this.getAllIndicators();
  },
};
</script>

<style scoped >
.showing {
  font-size: 16px;
  font-weight: 400;
}

.create-wrapper {
  background-color: white;
  height: 80vh;
  width: 500px;
  top: 70px;
  right: 20px;
  z-index: 100;
  position: relative;
  border: 1px solid #f1f1f1;
  border-radius: 10px;
}

.create-header {
  height: 60px;
  width: 100%;
  position: absolute;
  top: 0;
  background-color: #fff;
  border-bottom: 1px solid #f1f1f1;
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

.create-footer {
  height: 70px;
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: #fff;
  border-top: 1px solid #f1f1f1;
  z-index: 0;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0 20px;
}

.create-footer button {
  font-size: 14px;
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
.create-content input {
  width: 100%;
  height: 46px;
  border-radius: 4px;
  border: 1px solid #dddddd;
}

.loading-item {
  margin-top: 200px;
}

.drop-list-wrapper {
  height: 350px;
  overflow-y: auto;
  width: 100%;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-btn {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: #fff;
  cursor: pointer;
  min-width: 180px;
  text-align: left;
}

/* dropdown container */
.dropdown-list {
  position: absolute;
  margin-top: 4px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 100%;
  z-index: 10;
  max-height: 300px;

  /* allow vertical scrolling only, block horizontal */
  overflow-y: auto;
  overflow-x: hidden; /* prevent horizontal scrollbar */

  /* allow wrapping */
  white-space: normal;
  word-break: break-word;
  box-sizing: border-box;
}

/* each item — keep label and check in a flexible row */
.dropdown-item {
  display: flex;
  align-items: flex-start;
  padding: 8px 12px;
  gap: 8px;
  cursor: pointer;

  /* remove any truncation rules */
  overflow: visible;
  text-overflow: unset;
  white-space: normal;
}

.selected-dropdown-item span {
  color: #007d53;
}
.dropdown-item span {
  flex: 1 1 auto;
  min-width: 0; /* allow shrinking to fit container */
  white-space: normal; /* wrap text */
  word-break: break-word; /* break long words if needed */
  overflow-wrap: anywhere; /* modern way to allow breaks */
}

/* label must be allowed to shrink and wrap — this is CRITICAL */
.dropdown-item .label {
  flex: 1 1 auto; /* grow & shrink */
  min-width: 0; /* <-- this prevents the flex child from forcing horizontal scroll */
  white-space: normal;
  word-break: break-word; /* break long words if needed */
}

/* checkmark stays fixed size on the right */
.dropdown-item .check {
  flex: 0 0 auto;
  align-self: center;
  margin-left: 6px;
}

input {
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: all 0.2s ease;
}

input:focus {
  border-color: #007d53; /* Bootstrap blue */
  outline: none; /* remove default outline */
}

textarea {
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: all 0.2s ease;
}

textarea:focus {
  border-color: #007d53; /* Bootstrap blue */
  outline: none; /* remove default outline */
}
</style>
