<template>
  <Card>
    <b class="selection-header">Period Selection</b><br />
    <small>Select available years under each source</small><br />
    <div class="scroll" style="margin-left: 5px">
      <div
        v-for="(year, index) in years"
        :key="index"
        style="
          display: inline-block;
          justify-content: space-around;
          font-size: 13px
        "
      >
        <input
          type="checkbox"
          name=""
          :id="index"
          :value="year"
          v-model="selectedYear"
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
  emits: ['save-year', 'show-notes'],
  components: {
    Card,
  },
  data() {
    return {
      // selected: {
      //   indicators: [],
      //   period: [],
      //   sources: [],
      // },
      showNotes: false,
      selectedYear: [],
    };
  },
  computed: {
    years() {
      return this.$store.getters.indicatorsYear;
    },
  },
  methods: {
    selectYear(e) {
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
      // console.log('SY',this.selectedYear);
      this.$store.dispatch('_isNotExistYear', e.target.value);
      this.$emit('save-year', this.selectedYear);
      this.$emit('show-notes', this.showNotes);
    },
    //   isAllSelected(available, selected) {
    //     let value = true;
    //     available.every((element) => {
    //       if (!this.selected[selected].includes(element)) {
    //         value = false;
    //         return false;
    //       }
    //       value = true;
    //       return true;
    //     });
    //     return value;
    //   },
    //   toggle(item, arr) {
    //     if (this.selected[arr].includes(item)) {
    //       const index = this.selected[arr].indexOf(item);
    //       if (index > -1) {
    //         this.selected[arr].splice(index, 1);
    //       }
    //     } else {
    //       this.selected[arr].push(item);
    //     }
    //   },
    //   toggleAll(available, selected) {
    //     if (this.isAllSelected(available, selected)) {
    //       this.selected[selected] = [];
    //     } else {
    //       available.forEach((element) => {
    //         if (!this.selected[selected].includes(element)) {
    //           this.selected[selected].push(element);
    //         }
    //       });
    //     }
    //   },
    //   isSelected(item, collection) {
    //     return this.selected[collection].includes(item);
    //   },
  },
};
</script>
