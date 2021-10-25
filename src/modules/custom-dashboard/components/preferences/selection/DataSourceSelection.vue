<template>
  <Card>
    <b class="selection-header">Data Source Selection</b><br />
    <div class="scroll" style="margin-left: 5px">
      <div v-for="(items, idx) in heading" :key="idx">
        <div class="program-areas" style="background: #f3f3f3">
          <span
            style="
              font: var(--unnamed-font-style-normal) normal bold 15px/20px
                var(--unnamed-font-family-dm-sans);
              letter-spacing: var(--unnamed-character-spacing-0);
              color: var(--unnamed-color-202020);
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
            padding: 0px;
            margin: 0px;
          "
        >
          <input
            type="checkbox"
            name=""
            :id="item.value"
            :value="item.datasource"
            v-model="selectedDataSources"
            @click="selectSource($event, items.parent, item.datasource)"
            style="margin-left: 12px"
          />
          <span
            style="
              font: var(--unnamed-font-style-normal) normal
                var(--unnamed-font-weight-normal) 15px/20px
                var(--unnamed-font-family-dm-sans);
              letter-spacing: var(--unnamed-character-spacing-0);
              color: var(--unnamed-color-202020);
            "
          >
            {{ item.datasource }}
          </span>
        </div>
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
      selectedDataSource: false,
      selectedDataSources: [],
    };
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

    selectSource(e, parent, dataSource) {
      this.selectedDataSource = e.target.checked;
      this.$store.dispatch('forSelectedDataSource', {
        checked: this.selectedDataSource,
        parentDataSource: parent,
        childDataSource: dataSource,
      });
    },
  },
};
</script>
