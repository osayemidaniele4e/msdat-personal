<template>
  <Card>
    <b class="selection-header">Indicators Selection</b><br />
    <div class="scroll" style="margin-left: 5px">
      <div v-for="items in heading" :key="items">
        <div class="program-areas my-2" style="background: #f3f3f3">
          <input
            type="checkbox"
            @click="toggleAll($event, items.children, items.parent)"
            :checked="isAllSelected(items.children.map((i) => i.short_name))"
          />
          <span
            style="
              color: #202020;
              font-size: 15px;
              font: normal normal normal 16px/21px DM Sans;
            "
          >
            {{ items.parent }}
          </span>
          <span style="float: right">▼</span>
        </div>
        <div
          v-for="item in items.children"
          :key="item.id"
          class="indicators"
          style="margin-bottom: 12px; font-size: 13px"
        >
          <input
            type="checkbox"
            name=""
            :id="item.id"
            :value="item.short_name"
            :checked="isSelected(item)"
            @click="selectIndicator($event, items.parent, item.id, item.short_name)"
            :v-model="item.id"
          />
          <span style="padding-left: 10px">{{ item.short_name }}</span>
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
import Card from '../../Card.vue';

export default {
  // props: ['heading','programArea'],
  emits: ['save-indicator', 'selected', 'IndicatorSelect'],
  components: {
    Card,
  },
  data() {
    return {
      selectedIndicator: [],
      // short: 'yes',
      indicators: [],
      item: '',
      _indicatorId_: null,
      selectedCount: 0,
      indicatorSelected: false,
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
    isAllSelected(available) {
      let value = true;
      available.every((element) => {
        if (!this.selectedIndicator.includes(element)) {
          value = false;
          return false;
        }
        value = true;
        return true;
      });
      return value;
    },
    toggleAll(event, childsArray, parentName) {
      if (!event.target.checked) {
        this.selectedIndicator = this.selectedIndicator.filter(
          (ind) => ind.parent !== parentName,
        );
        childsArray.forEach((child) => (child.selected = false));
        this.showList = false;
      } else {
        let indicatorObject = this.getParentEntity(parentName);
        if (!indicatorObject) {
          indicatorObject = { childs: [], parent: parentName };
          this.showList = true;
        }
        childsArray.forEach((element, key) => {
          const child = {
            value: element.short_name,
            id: element.id,
          };
          element.selected = true;
          indicatorObject.childs.push(child);
          this.$store.dispatch('loadYears', child.id);
        });
        this.selectedIndicator.push(indicatorObject);
      }
      this.$emit('save-indicator', this.selectedIndicator);
      this.$emit('IndicatorSelect', this.showList);
    },

    isSelected(item) {
      return item.selected;
    },
    loadIndicators() {
      this.$store.dispatch('loadIndicators');
    },
    selectIndicator(e, parentValue, childId, childName) {
      this.$store.dispatch('loadCoverageLevels', childId);
      this.$store.dispatch('loadYears', { id: childId, childName });
      this._indicatorId_ = childId;
      const indicatorObject = this.generateIndicatorObject(
        e.target.checked,
        e.target.value,
        childId,
        parentValue,
      );
      this.addIndicatorToSelectedIndicators(indicatorObject);
      this.selectedCount = 0;
      this.selectedIndicator.map(
        (e) => (this.selectedCount += e.childs.length),
      );
      // console.log('asddeeew', selectedCount);
      // console.log("asdfe",this.selectedIndicator);
      this.$emit('save-indicator', this.selectedIndicator);
      this.$emit('selected', this.selectedCount);
      // this.$emit('save-indicator', this.selectedIndicator);
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

    generateIndicatorObject(isChecked, childValue, childId, parentValue) {
      let parentObject = this.getParentEntity(parentValue);
      if (isChecked) {
        const child = {
          value: childValue,
          id: childId,
        };
        this.showList = true;
        if (parentObject) {
          parentObject.childs.push(child);
        } else if (!parentObject) {
          parentObject = { childs: [child], parent: parentValue };
          console.log(parentObject.childs);
        }
      } else {
        parentObject.childs = parentObject.childs.filter(
          (child) => child.id != childId,
        );
      }
      return parentObject;
    },
    removeObjectFromSelectedIndicators(indicatorObject) {
      this.selectedIndicator = this.selectedIndicator.filter(
        (ind) => ind.parent != indicatorObject.parent,
      );
    },
    addIndicatorToSelectedIndicators(indicatorObject) {
      const existingObject = this.selectedIndicator.filter(
        (x) => x.parent === indicatorObject.parent,
      );
      if (existingObject && existingObject.length > 0) {
        if (indicatorObject.childs.length == 0) {
          this.showList = false;
          this.selectedCount = 0;
          this.removeObjectFromSelectedIndicators(indicatorObject);
        } else {
          Array.prototype.push.apply(
            existingObject.childs,
            indicatorObject.childs,
          );
        }
      } else {
        this.selectedIndicator.push(indicatorObject);
      }
    },
  },
};
</script>
