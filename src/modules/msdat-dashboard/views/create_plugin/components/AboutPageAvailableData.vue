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
  },
  methods: {
    indicatorDataSourceAvailable(indicatorId, dataSourceId) {
      const result = this.dlGetDataSourceSpecificIndicator({
        indicator: indicatorId,
        datasource: dataSourceId,
      });
      if (result.length > 0) {
        return true;
      }
      return false;
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

// div {
//   table,
//   th,
//   td {
//     border: 1px solid #cfcfcf;
//     border-collapse: collapse;
//   }

//   table {
//     width: 100%;
//     margin: auto;
//     text-align: center;
//     & > :first-child {
//       th {
//         // width: auto;
//         height: 50px;
//         padding: 1.5% 1%;
//         font-size: 13px;
//         color: #515151;
//       }

//       th:nth-child(2) {
//         width: 30%;
//         text-align: start;
//       }
//     }
//     & > :last-child {
//       font-size: 13px;
//       color: #515151;

//       td {
//         height: 60px;
//         padding: 0% 1%;

//         &:nth-child(2) {
//           text-align: start;
//         }
//         svg {
//           // background-color: orange !important;
//           font-size: 15px;
//           color: #4caf50;
//         }
//       }

//       tr:nth-child(even) {
//         background-color: #8484840f;
//       }
//     }
//   }
// }

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
// indicators and data source
</style>
