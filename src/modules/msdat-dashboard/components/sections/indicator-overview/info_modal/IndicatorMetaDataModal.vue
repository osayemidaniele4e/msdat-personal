<template>
  <b-tabs pills class="work-sans">
    <b-tab v-for="(dataSource, index) in dataSources" :key="index">
      <template #title>
        <span>{{ dataSource.datasource }}</span>
      </template>
      <div class="my-3">
        <p>
          <span class="mr-1 font-weight-bold mr-1 text-capitalize"
            >Indicator Name:</span
          >
          <span>{{ dlGetIndicator(indicatorSelectedID).full_name }}</span>
        </p>
        <p>
          <span class="mr-1 font-weight-bold mr-1 text-capitalize"
            >Indicator short Name:</span
          >
          <span>{{ dlGetIndicator(indicatorSelectedID).short_name }}</span>
        </p>
        <p>
          <span class="mr-1 font-weight-bold mr-1 text-capitalize"
            >Indicator definition:</span
          >
          <span>
            {{
              dlGetDataSourceSpecificIndicator({
                indicator: indicatorSelectedID,
                datasource: dataSource.id,
              }).length > 0
                ? dlGetDataSourceSpecificIndicator({
                    indicator: indicatorSelectedID,
                    datasource: dataSource.id,
                  })[0].indicator_definition
                : ''
            }}</span
          >
        </p>
        <p class="d-flex flex-column align-items-start">
          <span class="mr-1 font-weight-bold mr-1 text-capitalize"
            >measurement:</span
          >
          <span>
            <b>Numerator:</b>
            {{
              dlGetDataSourceSpecificIndicator({
                indicator: indicatorSelectedID,
                datasource: dataSource.id,
              }).length > 0
                ? dlGetDataSourceSpecificIndicator({
                    indicator: indicatorSelectedID,
                    datasource: dataSource.id,
                  })[0].measurement_numerator
                : ''
            }}
          </span>
          <span>
            <b>Denominator:</b>
            {{
              dlGetDataSourceSpecificIndicator({
                indicator: indicatorSelectedID,
                datasource: dataSource.id,
              }).length > 0
                ? dlGetDataSourceSpecificIndicator({
                    indicator: indicatorSelectedID,
                    datasource: dataSource.id,
                  })[0].measurement_denominator
                : ''
            }}
          </span>
        </p>
        <p>
          <span class="mr-1 font-weight-bold mr-1 text-capitalize"
            >multiplier factor:</span
          >
          <span>{{
            dlGetFactor(dlGetIndicator(indicatorSelectedID).factor)
              .multiplier_factor
          }}</span>
        </p>
        <p>
          <span class="mr-1 font-weight-bold mr-1 text-capitalize"
            >frequency:</span
          >
          <span>{{
            dlGetDataSourceSpecificIndicator({
              indicator: indicatorSelectedID,
              datasource: dataSource.id,
            }).length > 0
              ? dlGetDataSourceSpecificIndicator({
                  indicator: indicatorSelectedID,
                  datasource: dataSource.id,
                })[0].frequency
              : ''
          }}</span>
        </p>
        <p>
          <span class="mr-1 font-weight-bold mr-1 text-capitalize"
            >Type of Indicator:</span
          >
          <span>{{ dlGetIndicator(indicatorSelectedID).indicator_type }}</span>
        </p>
        <p>
          <span class="mr-1 font-weight-bold mr-1 text-capitalize"
            >reference:</span
          >
          <span>
            <!-- <a class="modal-lnk mr-1" href="#">https://www.samplereport.com,</a> -->
            <!-- <span>Page 10, Table 2, Column 5</span> -->
          </span>
        </p>
        <p>
          <span class="mr-1 font-weight-bold mr-1 text-capitalize"
            >Level Of Data Available:</span
          >
          <span
            class="
              d-flex
              flex-column flex-lg-row
              align-items-start align-items-lg-center
            "
          >
            <div class="available d-flex align-items-center mr-3">
              <span class="mr-1">National</span>
              <b-icon-check-circle-fill
                scale="0.9"
                :variant="
                  dlGetDataSourceSpecificIndicator({
                    indicator: indicatorSelectedID,
                    datasource: dataSource.id,
                  }).length > 0
                    ? dlGetDataSourceSpecificIndicator({
                        indicator: indicatorSelectedID,
                        datasource: dataSource.id,
                      })[0].national
                      ? 'success'
                      : 'secondary'
                    : 'secondary'
                "
              />
            </div>
            <div class="d-flex align-items-center mr-3">
              <span class="mr-1">Geopolitical Zone</span>
              <b-icon-check-circle-fill
                scale="0.9"
                :variant="
                  dlGetDataSourceSpecificIndicator({
                    indicator: indicatorSelectedID,
                    datasource: dataSource.id,
                  }).length > 0
                    ? dlGetDataSourceSpecificIndicator({
                        indicator: indicatorSelectedID,
                        datasource: dataSource.id,
                      })[0].zonal
                      ? 'success'
                      : 'secondary'
                    : 'secondary'
                "
              />
            </div>
            <div class="available d-flex align-items-center mr-3">
              <span class="mr-1">State Level</span>
              <b-icon-check-circle-fill
                scale="0.9"
                :variant="
                  dlGetDataSourceSpecificIndicator({
                    indicator: indicatorSelectedID,
                    datasource: dataSource.id,
                  }).length > 0
                    ? dlGetDataSourceSpecificIndicator({
                        indicator: indicatorSelectedID,
                        datasource: dataSource.id,
                      })[0].state
                      ? 'success'
                      : 'secondary'
                    : 'secondary'
                "
              />
            </div>
            <div class="d-flex align-items-center mr-3">
              <span class="mr-1">Senatorial Level</span>
              <b-icon-check-circle-fill
                scale="0.9"
                :variant="
                  dlGetDataSourceSpecificIndicator({
                    indicator: indicatorSelectedID,
                    datasource: dataSource.id,
                  }).length > 0
                    ? dlGetDataSourceSpecificIndicator({
                        indicator: indicatorSelectedID,
                        datasource: dataSource.id,
                      })[0].senatorial
                      ? 'success'
                      : 'secondary'
                    : 'secondary'
                "
              />
            </div>
            <div class="d-flex align-items-center mr-3">
              <span class="mr-1">Local Govt Area</span>
              <b-icon-check-circle-fill
                scale="0.9"
                :variant="
                  dlGetDataSourceSpecificIndicator({
                    indicator: indicatorSelectedID,
                    datasource: dataSource.id,
                  }).length > 0
                    ? dlGetDataSourceSpecificIndicator({
                        indicator: indicatorSelectedID,
                        datasource: dataSource.id,
                      })[0].lga
                      ? 'success'
                      : 'secondary'
                    : 'secondary'
                "
              />
            </div>
          </span>
        </p>
        <p>
          <!-- <a class="modal-lnk d-flex align-items-center" href="#">
            <span class="mr-1">Open Meta-Data library</span>
            <b-icon-box-arrow-up-right scale="0.9 " />
          </a> -->
        </p>
      </div>
    </b-tab>
  </b-tabs>
</template>

<script>
export default {
  data() {
    return {
      dataSources: [],
    };
  },
  props: {
    indicatorSelectedID: {
      type: Number,
    },
  },
  mounted() {
    this.dataSources = this.dlGetDashboardDataSource().map((item) => ({
      id: item.id,
      datasource: item.datasource,
    }));
  },
};
</script>

<style lang="scss" scoped>
</style>
