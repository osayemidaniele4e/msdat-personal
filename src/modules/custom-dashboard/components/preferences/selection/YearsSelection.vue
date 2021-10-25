<template>
  <Card>
    <b class="selection-header">Period Selection</b><br />
    <small>Select available years under each source</small><br />
    <div class="scroll" style="margin-left: 5px">
      <div
        v-for="(year, index) in distinctYears"
        :key="index"
        style="
          display: inline-block;
          justify-content: space-around;
          font-size: 13px;
        "
      >
        <input
          type="checkbox"
          name=""
          :id="year"
          :value="year"
          :checked="isSelected(year)"
          @click="selectYear($event)"
          style="margin-left: 12px"
        />
        {{ year }}
      </div>
    </div>
  </Card>
</template>

<script>
import Card from '../../Card.vue';

export default {
  emits: ['show-notes'],
  components: {
    Card,
  },
  data() {
    return {
      showNotes: false,
      selectedYear: [],
      yearChecked: false,
    };
  },
  computed: {
    distinctYears() {
      let yearsArray = [];

      this.$store.getters.getprogramArea.map((element) => {
        element.children.map((child) => {
          if (child.years) {
            yearsArray = yearsArray.concat(
              child.years.map((year) => year.value),
            );
          }
        });
      });
      let distinctyearsArray = [];
      distinctyearsArray = [...new Set(yearsArray)];
      return distinctyearsArray;
    },
  },
  methods: {
    selectYear(e) {
      this.yearSelected = e.target.checked;
      if (e.target.checked) {
        this.selectedYear.push(e.target.value);
        this.showNotes = true;
      } else {
        const indexOfItemToRemove = this.selectedYear.indexOf(e.target.value);
        if (indexOfItemToRemove != -1) {
          this.selectedYear.splice(indexOfItemToRemove, 1);
        }
        this.showNotes = true;
      }

      this.$store.dispatch('_isNotExistYear', {
        checked: this.yearSelected,
        value: e.target.value,
      });
      this.$store.dispatch('selectedYear', this.selectedYear);
      this.$emit('show-notes', this.showNotes);
    },
    isSelected(year) {
      return year.selected;
    },
  },
};
</script>
