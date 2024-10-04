<!-- Auther: Ghufran Ahmed -->
<template>
  <div style="height: 89px">
    <b class="selection-header" style="font-size: 13px; font-family: Work Sans"
      >Level Selection</b
    ><br />
    <Card class="scroll" style="height: 89px">
      <TheLoader v-if="loading == true"/>
      <div v-else>
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
            :id="level.value"
            :value="level.value"
            :checked="isSelect(level)"
            @click="selectLevel($event)"
            style="margin-left: 12px"
            class="checkbox"
          />
          <label
            :for="level.value"
            style="
              cursor: pointer;
              padding-left: 6px;
              font-size: 12px;
              font-family: Work Sans;
              margin-left: -4px;
            "
          >
            {{ level.value }}
          </label>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from '../../Card.vue';
// eslint-disable-next-line import/extensions
import TheLoader from '../../Loading/TheLoader2';

export default {
  components: {
    Card,
    TheLoader,
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
    loading() {
      return this.$store.getters.Levelsloading;
    },
    // Levels are loaded based on indicators and sorting is applied
    distinctLevels() {
      const levelArray = [];

      this.$store.getters.getprogramArea.map((element) => {
        element.children.map((child) => {
          if (child.levels) {
            child.levels.map((level) => {
              if (level.value !== undefined) {
                const levelValue = level.value.trim();
                levelArray[`level${levelValue}`] = { ...level };
              }
              return level;
            });
          }
          return child;
        });
        return element;
      });
      const LArray = [];
      Object.keys(levelArray).forEach((key) => {
        LArray.push(levelArray[key]);
      });
      LArray.sort((a, b) => b.value - a.value);
      return LArray;
    },
  },
  methods: {
    // For Selection of Levels
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
