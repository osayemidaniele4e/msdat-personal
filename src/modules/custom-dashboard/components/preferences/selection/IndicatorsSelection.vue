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
            @click="
              selectIndicator(
                $event,
                items.parent,
                item.id,
                item.short_name,
                item.selected
              )
            "
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
        childsArray.forEach((child) => {
          child.selected = false;
          selectedCount -= 1;
        });
        this.showList = false;
      } else {
        this.isAllSelected(childsArray.map((child) => child.short_name));
        let indicatorObject = this.getParentEntity(parentName);
        let isObjectAlreadyExist = true;
        if (!indicatorObject) {
          indicatorObject = { childs: [], parent: parentName };
          this.showList = true;
          isObjectAlreadyExist = false;
        }
        childsArray.forEach((element, key) => {
          const child = {
            value: element.short_name,
            id: element.id,
          };
          element.selected = true;
          if (!indicatorObject.childs.some((c) => c.id == child.id)) {
            indicatorObject.childs.push(child);
            this.$store.dispatch('loadYears', child);
            this.selectedCount += 1;
          }
        });
        if (isObjectAlreadyExist === false) this.selectedIndicator.push(indicatorObject);
      }
      this.$emit('save-indicator', this.selectedIndicator);
      this.$emit('IndicatorSelect', this.showList);
      this.$emit('selected', this.selectedCount);
    },

    isSelected(item) {
      return item.selected;
    },
    loadIndicators() {
      this.$store.dispatch('loadIndicators');
    },
    // selectIndicator(e, parentValue, childId, childName, selected) {
    //   debugger;

    //     this.indicatorSelected = e.target.checked;
    //     // console.log('program Area',this.$store.getters.getprogramArea.filter(element => {
    //     //   element.children.map(child => child.short_name) == childName
    //     // }));

    //   this.$store.dispatch("forSelectedIndicator", {checked:this.indicatorSelected, id: childId})
    // },

    selectIndicator(e, parentValue, childId, childName) {
      this.$store.dispatch('loadCoverageLevels', childId);
      this.$store.dispatch('loadYears', { id: childId, childName });
      this._indicatorId_ = childId;
      const indicatorObject = this.addIndicatorsToSelectedIndicators(
        e.target.checked,
        e.target.value,
        childId,
        parentValue,
      );
      this.$emit('save-indicator', this.selectedIndicator);
      this.$emit('selected', this.selectedCount);
      this.$emit('IndicatorSelect', this.showList);
    },
    getParentEntity(parentKey) {
      if (this.selectedIndicator.length > 0) {
        const filteredItem = this.selectedIndicator.filter(
          (item) => item.parent === parentKey,
        );
        if (filteredItem) {
          return filteredItem[0];
        }
      }
      return null;
    },

    addIndicatorsToSelectedIndicators(
      isChecked,
      childValue,
      childId,
      parentValue,
    ) {
      let parentObject = this.getParentEntity(parentValue);
      if (isChecked) {
        const child = {
          value: childValue,
          id: childId,
        };
        this.showList = true;
        if (parentObject) {
          parentObject.childs.push(child);
          this.selectedCount = parentObject.childs.length;
        } else if (!parentObject) {
          parentObject = { childs: [child], parent: parentValue };
          this.selectedIndicator.push(parentObject);
          this.selectedCount = parentObject.childs.length;
        }
      } else if (parentObject) {
        parentObject.childs = parentObject.childs.filter(
          (child) => child.id != childId,
        );
        if (parentObject.childs.length === 0) {
          this.selectedIndicator = this.selectedIndicator.filter(
            (ind) => ind.parent != parentObject.parent,
          );
        }
        this.selectedCount = parentObject.childs.length;
      }
    },
    removeObjectFromSelectedIndicators(indicatorObject) {
      this.selectedIndicator = this.selectedIndicator.filter(
        (ind) => ind.parent != indicatorObject.parent,
      );
    },
  },
};
</script>
