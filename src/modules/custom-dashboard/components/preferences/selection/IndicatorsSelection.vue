<template>
  <div>
    <b class="selection-header" style="font-size: 13px; font-family: DM sans"
      >Indicators Selection</b
    >
    <Card class="scroll" style="">
      <div v-for="(items, idx) in heading" :key="idx" style="margin-top: -8px">
        <div
          class="program-areas my-2"
          style="background: #f3f3f3; font-size: 13px"
        >
          <input
            type="checkbox"
            @click="
              toggleAll(
                $event,
                items.children,
                items.parent.value,
                items.parent.selected
              )
            "
            class="checkbox"
            :checked="isAllSelected(items.parent)"
          />
          <span
            style="
              font-weight: normal;
              font-size: 13px;
              font-family: DM sans;
              color: #202020;
              margin-left: -4px;
            "
          >
            {{ items.parent.value }}
          </span>
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
            name=""
            :id="item.id"
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
            class="checkbox"
          />
          <span
            style="
              padding-left: 5 px;
              font-size: 12px ;
              margin-left: -4px;
              font-family: DM sans;
            "
          >
            {{ item.short_name }}
          </span>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from '../../Card.vue';

export default {
  // props: ['heading','programArea'],
  // emits: ['IndicatorSelect'],
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
      AllSelected: false,
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
  },
  methods: {
    isAllSelected(item) {
      return item.selected;
    },
    toggleAll(e, childsArray, parentName, selected) {
      this.AllSelected = e.target.checked;
      if (this.AllSelected == true) {
        this.showList = true;
      } else {
        this.showList = false;
      }
      childsArray.forEach((element, key) => {
        const child = {
          value: element.short_name,
          id: element.id,
          checked: e.target.checked,
        };
        this.$store.dispatch('loadYears', child);
        this.$store.dispatch('loadCoverageLevels', child);
      });

      // this.$emit('IndicatorSelect', this.showList);
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

    selectIndicator(e, parentValue, childId, childName, selected) {
      this.indicatorSelected = e.target.checked;
      this.showList = e.target.checked;
      this.$store.dispatch('forSelectedIndicator', {
        checked: this.indicatorSelected,
        id: childId,
        showList: this.showList,
      });

      // this.$emit('IndicatorSelect', this.showList);
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

<style>
.checkbox {
  height: 10px;
  margin: 4px;
}
</style>
