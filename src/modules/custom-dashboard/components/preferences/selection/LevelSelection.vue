<template>
  <div style="height: 89px">
    <b class="selection-header" style="font-size: 13px; font-family: DM sans"
      >Level Selection</b
    ><br />
    <Card class="scroll" style="height: 89px">
      <div
        v-for="(level, index) in distinctLevels"
        :key="index"
        style="
          display: inline-block;
          justify-content: space-around;
          font-size: 13px;
          margin-left: -6px;
        "
      >
        <input
          type="checkbox"
          :id="index"
          :value="level.value"
          :checked="isSelect(level)"
          @click="selectLevel($event)"
          style="margin-left: 12px"
          class="checkbox"
        />
        <span style="font-size: 12px; font-family: DM sans; margin-left: -4px">
          {{ level.value }}
        </span>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from '../../Card.vue';

export default {
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
    distinctLevels() {
      const levelArray = [];

      this.$store.getters.getprogramArea.map((element) => {
        element.children.map((child) => {
          if (child.levels) {
            child.levels.map((level) => {
              if (level.value != undefined) {
                levelArray['level' + level.value] = { ...level };
              }
            });
          }
        });
      });
      const LArray = [];
      for (const i in levelArray) {
        LArray.push(levelArray[i]);
      }
      LArray.sort((a, b) => b.value - a.value);
      return LArray;
    },
  },
  methods: {
    selectLevel(e) {
      const levelSelected = e.target.checked;
      this.$store.dispatch('levelclick', {
        checked: levelSelected,
        value: e.target.value,
      });
    },
    isSelect(level) {
      return level.selected;
    },
  },
};
</script>
