<!-- Auther: Ghufran Ahmed v1-->
<!-- Auther: Oluwakolade O v2 with search-->
<template>
  <div>
    <b class="selection-header" style="font-size: 13px; font-family: Work Sans">
      Indicators Selection
    </b>
    <!-- Search Input and Select All Button Container -->
    <div class="search-container" style="margin: 10px 0; display: flex; gap: 8px;">
      <input
        type="text"
        v-model="searchTerm"
        placeholder="Search indicators..."
        style="
          flex: 1;
          padding: 6px 8px;
          font-size: 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-family: Work Sans;
        "
      />
      <button
  @click="selectAllIndicators"
  style="
    padding: 0;
    font-size: 12px;
    font-family: Work Sans, sans-serif;
    background: none;
    border: none;
    cursor: pointer;
    color: #4aa0a1;
    text-decoration: none;
    white-space: nowrap;
  "
  :class="{ 'selected': allIndicatorsSelected }"
>
  {{ allIndicatorsSelected ? 'Deselect All' : 'Select All' }}
</button>

    </div>
    <Card class="scroll">
      <TheLoader v-if="loading" />
      <div v-else>
        <div
          v-for="(items, idx) in filteredHeading"
          :key="idx"
          style="margin-top: -8px"
        >
          <div
            class="program-areas my-2"
            style="background: #f3f3f3; font-size: 13px"
            v-if="items.children.length > 0"
          >
            <input
              type="checkbox"
              :id="items.parent.value"
              @click="
                toggleAll(
                  $event,
                  items.children,
                  items.parent.value,
                  items.parent.selected
                )
              "
              class="checkbox no-pointer-events"
              :checked="isAllSelected(items.parent)"
            />
            <label
              :for="items.parent.value"
              style="
                cursor: pointer;
                font-weight: normal;
                font-size: 13px;
                font-family: Work Sans;
                color: #202020;
                margin-left: -4px;
              "
            >
              {{ items.parent.value }}
            </label>
            <span style="float: right">▼</span>
          </div>
          <div
            v-for="(item, index) in items.children"
            :key="index"
            class="indicators"
            style="margin-bottom: 3px; font-size: 13px"
          >
            <input
              type="checkbox"
              name="child"
              :id="item.short_name"
              :value="item.short_name"
              :checked="isSelected(item)"
              @click="
                selectIndicator(
                  $event,
                  items.parent.value,
                  item.id,
                  item.short_name,
                  item.selected
                )
              "
              class="checkbox no-pointer-events"
            />
            <label
              :for="item.short_name"
              style="
                cursor: pointer;
                padding-left: 5px;
                font-size: 12px;
                margin-left: -4px;
                font-family: Work Sans;
              "
            >
              {{ item.short_name }}
            </label>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from '../../Card.vue';
// eslint-disable-next-line
import TheLoader from '../../Loading/TheLoader2';

export default {
  components: {
    Card,
    TheLoader,
  },
  data() {
    return {
      selectedIndicator: [],
      indicators: [],
      item: '',
      // eslint-disable-next-line
      _indicatorId_: null,
      selectedCount: 0,
      indicatorSelected: false,
      AllSelected: false,
      searchTerm: '',
      allIndicatorsSelected: false, // New property to track global selection state
    };
  },
  computed: {
    loading() {
      return this.$store.getters.Indicatorloading;
    },
    heading() {
      return this.$store.getters.getprogramArea;
    },
    filteredHeading() {
      if (!this.searchTerm.trim()) {
        return this.heading;
      }

      const searchLower = this.searchTerm.toLowerCase();

      return this.heading.map((section) => ({
        parent: { ...section.parent },
        children: section.children.filter((item) => item.short_name.toLowerCase().includes(searchLower)),
      }));
    },
  },
  created() {
    this.loadIndicators();
  },
  methods: {
    isAllSelected(item) {
      return item.selected;
    },

    // New method to handle selecting all indicators
    selectAllIndicators() {
      this.allIndicatorsSelected = !this.allIndicatorsSelected;

      // Apply selection to all visible indicators (filtered or not)
      this.filteredHeading.forEach((section) => {
        this.toggleAll(
          { target: { checked: this.allIndicatorsSelected } },
          section.children,
          section.parent.value,
        );
      });
    },

    toggleAll(e, childsArray, parentName) {
      this.AllSelected = e.target.checked;
      if (this.AllSelected === true) {
        this.showList = true;
      } else {
        this.showList = false;
      }
      childsArray.forEach((element) => {
        const child = {
          value: element.short_name,
          id: element.id,
          checked: e.target.checked,
        };
        this.$store.dispatch('loadYears', child);
        this.$store.dispatch('loadCoverageLevels', child);
      });
      this.$store.dispatch('forAllSelectedIndicator', {
        checked: this.AllSelected,
        name: parentName,
        showList: this.showList,
      });
    },

    isSelected(item) {
      return item.selected;
    },

    loadIndicators() {
      this.$store.dispatch('loadIndicators');
    },

    selectIndicator(e, parentValue, childId, childName) {
      this.indicatorSelected = e.target.checked;
      this.showList = e.target.checked;
      this.$store.dispatch('forSelectedIndicator', {
        checked: this.indicatorSelected,
        id: childId,
        showList: this.showList,
      });

      this.$store.dispatch('loadCoverageLevels', {
        id: childId,
        child: childName,
        parent: parentValue,
        checked: e.target.checked,
      });
      this.$store.dispatch('loadYears', {
        id: childId,
        child: childName,
        parent: parentValue,
        checked: e.target.checked,
      });
    },
  },
};
</script>

<style scoped>
.checkbox {
  height: 10px;
  margin: 4px;
}

.search-container {
  position: relative;
}

.scroll {
  max-height: calc(100vh - 200px);
  overflow-y: auto;
}

/* New styles for the select all button */
button {
  transition: all 0.2s ease;
}

button:hover {
  background: #e6e6e6;
}

button.selected {
  background: #e0e0e0;
}

</style>
