<template>
  <div>
    <b class="selection-header" style="font-size: 13px; font-family: Work Sans"
      >Data Source Selection</b
    ><br />
    <Card class="scroll" style="">
      <TheLoader v-if="loading == true" style="margin: 60px 0px 0px 119px" />
      <div v-for="(items, idx) in heading" :key="idx">
        <div
          class="program-areas"
          style="background: #f3f3f3; background: #f3f3f3; font-size: 13px"
        >
          <span
            style="
              font-weight: normal;
              font-family: Work Sans;
              letter-spacing: 0px;
              color: #202020;
              padding-left: 13px;
              font-size: 13px;
            "
          >
            {{ items.parent }}
          </span>
          <span style="float: right">▼</span>
        </div>
        <div
          v-for="item in items.children"
          :key="item.id"
          class="indicators col-4"
          style="
            display: inline-block;
            justify-content: space-around;
            font-size: 13px;
            margin: 0px;
          "
        >
          <input
            type="checkbox"
            name=""
            :id="item.datasource"
            :value="item.datasource"
            :checked="isSelected(item)"
            @click="
              selectSource(
                $event,
                items.parent.value,
                item.id,
                item.datasource,
                item.selected
              )
            "
            class="checkbox"
          />
          <!-- For DataSources display -->
          <label
            :for="item.datasource"
            style="
              cursor: pointer;
              font-size: 10px;
              padding-left: 5px;
              font-family: Work Sans;
              margin-left: -8px;
            "
          >
            {{ item.datasource }}
          </label>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from '../../Card.vue';
import TheLoader from '../../Loading/TheLoader';

export default {
  components: {
    Card,
    TheLoader,
  },
  data() {
    return {};
  },
  computed: {
    loading() {
      return this.$store.getters.Datasourceloading;
    },
    heading() {
      return this.$store.getters.getDataSource;
    },
  },
  created() {
    this.loadDataSource();
  },
  methods: {
    loadDataSource() {
      this.$store.dispatch('loadDataSource');
    },

    selectSource(e, parentValue, childId, childName, selected) {
      this.DataSourceSelected = e.target.checked;
      this.showList = e.target.checked;
      this.$store.dispatch('forSelectedDataSource', {
        checked: this.DataSourceSelected,
        id: childId,
        name: childName,
      });
    },

    isSelected(item) {
      return item.selected;
    },

    // selectSource(e, parent, dataSource) {
    //   this.selectedDataSource = e.target.checked;
    //   this.$store.dispatch('forSelectedDataSource', {
    //     checked: this.selectedDataSource,
    //     parentDataSource: parent,
    //     childDataSource: dataSource,
    //   });
    // },
  },
};
</script>
