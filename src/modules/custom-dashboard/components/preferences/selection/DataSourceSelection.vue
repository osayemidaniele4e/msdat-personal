<template>
  <div>
    <b class="selection-header" style="font-size: 13px; font-family: Work Sans"
      >Data Source Selection</b
    ><br />
    <Card class="scroll" style="">
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
            :id="item.id"
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
          <span
            style="font-size: 11px; font-family: Work Sans; margin-left: -5px"
          >
            {{ item.datasource }}
          </span>
        </div>
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
    return {};
  },
  computed: {
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
