<template>
  <Card>
    <b class="selection-header">Indicators Selection</b><br />
    <div class="scroll" style="margin-left: 5px">
      <div v-for="items in heading" :key="items">
        <div class="program-areas my-2">
          <input type="checkbox" name="" id="" />
          {{ items.parent }}
          <span style="float: right">▼</span>
        </div>
        <div
          v-for="item in items.children"
          :key="item.id"
          class="indicators"
          style="margin-bottom: 12px;"
        >
          <input
            type="checkbox"
            name=""
            :id="item.id"
            :value="item.short_name"
            @click="selectIndicator($event, items.parent, item.id)"
            v-model="indicatorSelected"
          />
          <span >{{ item.short_name }}</span>
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
import Card from '../../Card.vue';

export default {
  // props: ['heading','programArea'],
  emits: ['save-indicator', 'IndicatorSelect'],
  components: {
    Card,
  },
  data() {
    return {
      selectedIndicator: [],
      // short: 'yes',
      indicatorSelected: [],
    };
  },
  computed: {

    // programAreas(){
    //   return this.programArea;
    // },
    heading() {
      return this.$store.getters.getprogramArea;
    },
  },
  created() {
    this.loadIndicators();
    // this.indicatorSelected();
  },
  methods: {
    loadIndicators() {
      this.$store.dispatch('loadIndicators');
    },
    selectIndicator(e, parentValue, childId) {
      this.$store.dispatch('loadCoverageLevels', childId);
      this.$store.dispatch('loadYears', childId);
      let parentObject = this.getParentEntity(parentValue);
      // console.log(abc);
      // console.log(childId);
      if (e.target.checked) {
        const child = {
          value: e.target.value,
          id: childId,
        };
        this.showList = true;
        if (parentObject) {
          parentObject.childs.push(child);
        } else if (!parentObject) {
          parentObject = { childs: [child], parent: parentValue };
          this.selectedIndicator.push(parentObject);
        }
      } else {
        this.selectedIndicator;
        parentObject.childs = parentObject.childs.filter(
          (child) => child.id != childId,
        );
        if (parentObject.childs.length == 0) {
          this.showList = false;
          this.selectedIndicator = this.selectedIndicator.filter(
            (ind) => ind.parent != parentObject.parent,
          );
        }
      }
      // console.log("asdfe",this.selectedIndicator);
      this.$emit('save-indicator', this.selectedIndicator);
      this.$emit('IndicatorSelect', this.showList);
      // this.$store.dispatch({
      //   data: this.selectedIndicator});
      // ("selectedIndicator");
      // this.selectedIndicator;
      // console.log("Selected ",this.selectedIndicator);
    },
    // indicatorSelected() {
    //   let indicator = this.$store.getters['selectedIndicator'];
    //   // this.indicatorSelected = indicator.map(e => e.short_name)
    //   console.log("State Indicator",indicator);
    // },
    getParentEntity(parentKey) {
      if (this.selectedIndicator.length > 0) {
        const filteredList = this.selectedIndicator.filter(
          (item) => item.parent === parentKey,
        );
        if (filteredList && filteredList.length > 0) {
          return filteredList[0];
        }
      }
      return null;
    },
  },
};
</script>
