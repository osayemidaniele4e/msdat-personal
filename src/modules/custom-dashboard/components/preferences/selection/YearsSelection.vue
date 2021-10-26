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
          :v-model="year.selected"
          @change="selectYear($event)"
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
      distinctyearsArrayData: [],
    };
  },
  mounted() {
    this.distinctYears;
  },
  computed: {
    distinctYears() {
      let yearsArray = [];

      const newMap = this.$store.getters.getprogramArea.map((element) => {
        element.children.map((child) => {
          if (child.years) {
            yearsArray = yearsArray.concat(
              child.years.map((year) => year.value),
            );
          }
        });
      });

      console.log('changed', this.$store.getters.getprogramArea);
      let distinctyearsArray = [];
      distinctyearsArray = [...new Set(yearsArray)];
      distinctyearsArray = distinctyearsArray.sort((a, b) => b - a);

      console.log('distinctyearsArray', distinctyearsArray);
      this.distinctyearsArrayData = distinctyearsArray.map((t) => ({ year: t, selected: false }));
      console.log('distinctyearsArrayData', this.distinctyearsArrayData);
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
        showNotes: this.showNotes,
      });
      this.$store.dispatch('selectedYear', this.selectedYear);
      // this.$emit('show-notes', this.showNotes);
    },
    isSelected(year) {
      return false;
    },
  },
};
</script>
