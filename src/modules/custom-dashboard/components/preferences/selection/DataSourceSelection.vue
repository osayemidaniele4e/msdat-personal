<template>
  <Card>
    <b class="selection-header">Data Source Selection</b><br />
    <div class="scroll" style="margin-left: 5px">
      <div v-for="items in heading" :key="items">
        <div class="program-areas " style="background: #F3F3F3">
          {{ items.parent }}
          <span style="float: right">▼</span>
        </div>
        <div
          v-for="item in items.children"
          :key="item.id"
          class="indicators "
          style="display: inline-block; justify-content: space-around; margin-bottom: 12px;"
        >
          <input
            type="checkbox"
            name=""
            :id="item.value"
            :value="item.datasource"
            v-model="selecteddataSource"
            @click="selectSource($event)"
            style="margin-left:12px"
          />
          {{ item.datasource }}
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
import Card from '../../Card.vue';

export default {
  emits: ['save-dataSource'],
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
      selectedDataSource: [],
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
    selectSource(e) {
      if (e.target.checked) {
        this.selectedDataSource.push(e.target.value);
      } else {
        const indexOfItemToRemove = this.selectedDataSource.indexOf(
          e.target.value,
        );
        if (indexOfItemToRemove != -1) {
          this.selectedDataSource.splice(indexOfItemToRemove, 1);
        }
      }
      this.$emit('save-dataSource', this.selectedDataSource);
    },
    //   isAllSelected(available, selected) {
    //     let value = true;
    //     available.every((element) => {
    //       if (!this.selected[selected].includes(element)) {
    //         value = false;
    //         return false;
    //       }
    //       value = true;
    //       return true;
    //     });
    //     return value;
    //   },
    //   toggle(item, arr) {
    //     if (this.selected[arr].includes(item)) {
    //       const index = this.selected[arr].indexOf(item);
    //       if (index > -1) {
    //         this.selected[arr].splice(index, 1);
    //       }
    //     } else {
    //       this.selected[arr].push(item);
    //     }
    //   },
    //   toggleAll(available, selected) {
    //     if (this.isAllSelected(available, selected)) {
    //       this.selected[selected] = [];
    //     } else {
    //       available.forEach((element) => {
    //         if (!this.selected[selected].includes(element)) {
    //           this.selected[selected].push(element);
    //         }
    //       });
    //     }
    //   },
    //   isSelected(item, collection) {
    //     return this.selected[collection].includes(item);
    //   },
  },
};
</script>
