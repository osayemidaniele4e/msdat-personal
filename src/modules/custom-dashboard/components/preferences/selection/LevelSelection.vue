<template>
  <Card>
    <b class="selection-header">Level Selection</b><br />
    <div class="scroll" style="margin-left: 5px">
      <div
        v-for="(level, index) in levels"
        :key="index"
        style="display: inline-block; justify-content: space-around"
      >
        <input
          type="checkbox"
          :id="index"
          :value="level"
          v-model="selectedLocation"
          @click="selectLevel($event)"
          style="margin-left: 12px"
        />
        {{ level }}
      </div>
    </div>
  </Card>
</template>

<script>
import Card from '../../Card.vue';

export default {
  emits: ['save-level'],
  components: {
    Card,
  },
  data() {
    return {
      selected: {
        indicators: [],
        period: [],
        sources: [],
      },
      selectedLocation: [],
    };
  },
  computed: {
    levels() {
      return this.$store.getters.indicatorsLevels;
    },
  },
  methods: {
    selectLevel(e) {
      if (e.target.checked) {
        this.selectedLocation.push(e.target.value);
      } else {
        const indexOfItemToRemove = this.selectedLocation.indexOf(e.target.value);
        if (indexOfItemToRemove != -1) {
          this.selectedLocation.splice(indexOfItemToRemove, 1);
        }
      }
      this.$emit('save-level', this.selectedLocation);
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
