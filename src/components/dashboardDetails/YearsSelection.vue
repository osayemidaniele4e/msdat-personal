<template>
  <Card>
    <h5 style="font-size: 14px;">Period Selection</h5>
    <!-- <p>Select availaible Years under each source.</p> -->
      <ul
        v-for="(year, index) in years"
        :key="index"
        style="
          list-style: none;
          display: inline-block;
          justify-content: space-around;
        "
      >
        <li style="display: inline-block">
            <input
              type="checkbox"
              :id="index"
              :value="year"
              v-model="selectedYear"
              @click="selectYear($event)"
            />
            {{ year }}
        </li>
      </ul>
  </Card>
</template>

<script>
import Card from "../Card.vue";
export default {
  emits: ["save-year"],
  components: {
    Card,
  },
  data() {
    return {
      selectedYear: [],
    };
  },
  computed: {
    years() {
      return this.$store.getters["indicators/indicatorsYear"];
    },
  },
  methods: {
    selectYear(e) {
      if (e.target.checked) {
        this.selectedYear.push(e.target.value);
      } else {
        var indexOfItemToRemove = this.selectedYear.indexOf(e.target.value);
        if (indexOfItemToRemove != -1) {
          this.selectedYear.splice(indexOfItemToRemove, 1);
        }
      }
      this.$emit("save-year", this.selectedYear);
    },
  },
};
</script>

<style></style>
