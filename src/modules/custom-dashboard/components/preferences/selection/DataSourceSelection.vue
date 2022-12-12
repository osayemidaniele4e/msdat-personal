<!-- Auther: Ghufran Ahmed -->

<template>
  <div>
    <b class="selection-header" style="font-size: 13px; font-family: Work Sans"
      >Data Source Selection</b
    ><br />
    <Card class="scroll" style="">
      <TheLoader v-if="loading == true" style="margin: 60px 0px 0px 119px" />
      <div v-for="(items, idx) in sources" :key="idx">
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
            class="checkbox no-pointer-events"
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
// eslint-disable-next-line import/extensions
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
    sources() {
      return this.$store.getters.getDataSource;
    },
  },
  created() {
    this.loadDataSource();
  },
  methods: {
    // Load the Datasourcess
    loadDataSource() {
      this.$store.dispatch('loadDataSource');
    },

    // below function is excuted when datasource are selected
    selectSource(e, parentValue, childId, childName) {
      this.DataSourceSelected = e.target.checked;
      console.log(this.DataSourceSelected, 'ischecked');
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
  },
};
</script>
