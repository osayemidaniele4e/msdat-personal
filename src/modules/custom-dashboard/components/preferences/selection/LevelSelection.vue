<template>
  <Card>
    <b class="selection-header">Level Selection</b><br />
    <div class="scroll" style="margin-left: 5px">
      <div
        v-for="(level, index) in distinctLevels"
        :key="index"
        style="display: inline-block; justify-content: space-around; font-size: 13px "
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
      let levelArray = [];

      this.$store.getters.getprogramArea.map((element) => {
        element.children.map((child) => {
          if (child.levels) {
            levelArray = levelArray.concat(
              child.levels.map((level) => level.value),
            );
          }
        });
      });
      let distinctyearsArray = [];
      distinctyearsArray = [...new Set(levelArray)];
      return distinctyearsArray;
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
  },
};
</script>
