<template>
  <div>
    <b class="selection-header" style="font-size: 13px; font-family: Work Sans;">Period Selection</b><br />
    <small style="font-size: 13px;font-family: Work Sans;">Select available years under each source</small>
    <Card class="scroll" style="">
      <div
        v-for="(item, index) in distinctYears"
        :key="index"
        style="
          display: inline-block;
          justify-content: space-around;
          font-size: 13px;
        "
        class=""
      >
        <input
          type="checkbox"
          name=""
          :id="item"
          :value="item.value"
          :checked="isSelected(item)"
          @change="selectYear($event)"
          style="margin-left: 12px"
          class="checkbox "
        />
        <span style="font-size:12px; font-family: Work Sans;">
        {{ item.value }}
        </span>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from '../../Card.vue';

export default {
  // emits: ['show-notes'],
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
  computed: {
    distinctYears() {
      const yearsArray = [];

      const newMap = this.$store.getters.getprogramArea.map((element) => {
        element.children.map((child) => {
          if (child.years) {
            child.years.map((year) => {
              if (year.value != undefined) {
                year.value;
                yearsArray[`year${year.value}`] = { ...year };
              }
            });
          }
        });
      });
      const DArray = [];
      for (const i in yearsArray) {
        DArray.push(yearsArray[i]);
      }
      DArray.sort((a, b) => b.value - a.value);
      return DArray;
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
    isSelected(item) {
      return item.selected;
    },
  },
};
</script>
