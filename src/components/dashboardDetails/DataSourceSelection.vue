<template>
  <Card>
    <h5 style="font-size: 14px;">Data Source Selection</h5>
    <ul v-for="items in heading" :key="items" style="list-style: none; margin-left: -25px;">
      <li style="background: #f3f3f3">
        {{ items.parent }}
      </li>
      <li>
        <ul
          style="list-style:none; display: inline-block;
    justify-content:space-around;"
          v-for="item in items.children"
          :key="item.id"
        >
          <li >
            <input
              type="checkbox"
              name=""
              :id="item.value"
              :value="item.datasource"
              v-model="selecteddataSource"
              @click="selectSource($event)"
            />
            {{ item.datasource }}
          </li>
        </ul>
      </li>
    </ul>
  </Card>
</template>

<script>
import Card from "../Card.vue";
export default {
  emits: ["save-dataSource"],
  components: {
    Card,
  },
  data() {
    return {
      selectedDataSource: [],
    };
  },
  computed: {
    heading() {
      return this.$store.getters["indicators/getDataSource"];
    },
    dataSource() {
      return this.$store.getters["indicators/dataSource"];
    },
  },
  methods: {
    selectSource(e) {
      if (e.target.checked) {
        this.selectedDataSource.push(e.target.value);
      } else {
        var indexOfItemToRemove = this.selectedDataSource.indexOf(
          e.target.value
        );
        if (indexOfItemToRemove != -1) {
          this.selectedDataSource.splice(indexOfItemToRemove, 1);
        }
      }
      this.$emit("save-dataSource", this.selectedDataSource);
    },
  },
};
</script>

<style></style>
