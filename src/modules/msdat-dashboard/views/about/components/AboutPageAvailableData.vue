<template>
  <div>
    <div class="table-responsive">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>SN</th>
            <th style="width: 15%">Sources/Indicators</th>
            <th
              class="text-nowrap"
              v-for="(dataSource, index) in dlDatasource"
              :key="index"
            >
              {{ dataSource.datasource }}
            </th>
            <!-- <th>MICS</th>
            <th>NDHS</th>
            <th>NARHS</th>
            <th>NNHS</th>
            <th>World Bank</th>
            <th>IHME</th>
            <th>WHO-GHO</th>
            <th>IHME</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(indicator, index) in showLessIndicator" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ indicator.short_name }}</td>
            <td v-for="(dataSource, index) in dlDatasource" :key="index">
              <template
                v-if="indicatorDataSourceAvailable(indicator.id, dataSource.id)"
              >
                <b-icon-check-circle-fill variant="success" />
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <b-button @click="toggleShowMore()">{{
        showNumberCount === dlIndicator.length ? 'Show Less' : 'Show More'
      }}</b-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showNumberCount: 10,
    };
  },
  computed: {
    showLessIndicator() {
      return this.dlIndicator.slice(0, this.showNumberCount);
    },
    dataSourceIndicatorMap() {
      const map = new Set();
      if (this.dlDataSourceSpecificIndicator) {
        this.dlDataSourceSpecificIndicator.forEach((item) => {
          map.add(`${item.indicator}-${item.datasource}`);
        });
      }
      return map;
    },
  },
  methods: {
    indicatorDataSourceAvailable(indicatorId, dataSourceId) {
      return this.dataSourceIndicatorMap.has(`${indicatorId}-${dataSourceId}`);
    },
    toggleShowMore() {
      if (this.showNumberCount === 10) {
        this.showNumberCount = this.dlIndicator.length;
      } else {
        this.showNumberCount = 10;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$msdat-green: #007d53;

.table-responsive {
  height: 500px; // You can adjust this height as needed
  overflow-y: auto;
  position: relative;
}

table {
  position: relative;

  thead {
    position: sticky;
    top: 0;
    z-index: 1;

    th {
      background-color: white; // Add background color to prevent content showing through
      position: sticky;
      top: 0;
      box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.1); // Optional: adds subtle shadow under header
    }
  }
}

// Rest of your existing button styles...
button {
  height: 40px;
  background-color: $msdat-green;
  text-transform: capitalize;
  border-radius: 5px;
  margin-top: 5%;
  padding: 2px 4%;
  color: #ffffff;
  box-shadow: 0px 3px 5px #00000024;

  &:hover {
    background-color: #007d53c2;
    border-width: 0;
  }
}
</style>
