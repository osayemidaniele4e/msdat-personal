<template>
  <Card>
    <h5 style="font-size: 14px;">Level Selection</h5>
    <ul
      v-for="(level, index) in levels"
      :key="index"
      style="
        list-style: none;
        display: inline-block;
        justify-content: space-around;
      "
    >
      <li style="display: inline; font-size: 12px">
        <input
          type="checkbox"
          :id="index"
          :value="level"
          v-model="selectedLocation"
          @click="selectLevel($event)"
        />
        {{ level }}
      </li>
    </ul>
  </Card>
</template>

<script>
import Card from "../Card.vue";
export default {
  emits: ["save-level"],
  components: {
    Card,
  },
  data() {
    return {
      selectedLocation: [],
    };
  },
  computed: {
    levels() {
      return this.$store.getters["indicators/indicatorsLevels"];
    },
  },
  methods: {
    selectLevel(e) {
      if (e.target.checked) {
        this.selectedLocation.push(e.target.value);
      } else {
        var indexOfItemToRemove = this.selectedLocation.indexOf(e.target.value);
        if (indexOfItemToRemove != -1) {
          this.selectedLocation.splice(indexOfItemToRemove, 1);
        }
      }
      this.$emit("save-level", this.selectedLocation);
    },
  },
};
</script>

<style></style>
