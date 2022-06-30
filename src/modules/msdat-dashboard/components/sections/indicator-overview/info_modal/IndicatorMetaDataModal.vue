<template>
  <div>
    <div v-if="loading" class="loading_screen">
      <b-skeleton animation="fade" width="100%" height="10vh"></b-skeleton>
      <b-skeleton animation="fade" width="55%"></b-skeleton>
      <b-skeleton animation="fade" width="70%"></b-skeleton>
      <b-skeleton animation="fade" width="65%"></b-skeleton>
      <b-skeleton animation="fade" width="45%"></b-skeleton>
      <b-skeleton animation="fade" width="100%" height="15vh"></b-skeleton>
      <b-skeleton animation="fade" width="75%"></b-skeleton>
      <b-skeleton animation="fade" width="85%"></b-skeleton>
      <b-skeleton animation="fade" width="65%"></b-skeleton>
    </div>
    <b-tabs pills class="work-sans tabs" id="indicatorMeta" v-else>
      <b-tab v-for="(dataSource, index) in dataSources" :key="index">
        <template #title>
          <span>{{ dataSource.datasource }}</span>
        </template>

        <div>
          <p></p>
          <div class="text1">Indicator name</div>
          <div class="text2">{{ dlGetIndicator(indicatorSelectedID).full_name }}</div>
          <p></p>

          <p></p>
          <div class="text1">Indicator short name</div>
          <div class="text2">{{ dlGetIndicator(indicatorSelectedID).short_name }}</div>
          <p></p>

          <p></p>
          <div class="text1">Indicator definition</div>
          <div class="text2">
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
            }}
          </div>
          <p></p>

          <p></p>
          <div class="text1">Measurement</div>
          <div class="text2">
            <div>
              <span class="text2-bold">Numerator:</span>
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
            </div>
            <div>
              <span class="text2-bold">Denominator:</span>
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
            </div>
          </div>
          <p></p>

          <div class="grid1">
            <div>
              <div class="grid1-left-text1">Multiplier Factor</div>
              <div class="grid1-left-text2">
                {{ dlGetFactor(dlGetIndicator(indicatorSelectedID).factor).multiplier_factor }}
              </div>
            </div>

            <div>
              <div class="grid1-right-text1">Type of Indicator</div>
              <div class="grid1-right-text2">
                {{ dlGetIndicator(indicatorSelectedID).indicator_type }}
              </div>
            </div>
          </div>

          <p></p>
          <div class="text1">Frequency</div>
          <div class="text2">
            {{
              dlGetDataSourceSpecificIndicator({
                indicator: indicatorSelectedID,
                datasource: dataSource.id,
              }).length > 0
                ? dlGetDataSourceSpecificIndicator({
                    indicator: indicatorSelectedID,
                    datasource: dataSource.id,
                  })[0].frequency
                : ''
            }}
          </div>
          <p></p>

          <p></p>
          <div class="text1">Level of Data Available</div>
          <p class="text2">
            <span class="d-flex flex-column flex-lg-row align-items-start align-items-lg-center">
              <div class="available d-flex align-items-center mr-3">
                <span class="mr-1 text2 level-text">National</span>
                <b-icon-check-circle-fill
                 class="check-circle"
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
                <span class="mr-1 text2 level-text">Geopolitical Zone</span>
                <b-icon-check-circle-fill
                class="check-circle"
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
                <span class="mr-1 text2 level-text">State Level</span>
                <b-icon-check-circle-fill
                 class="check-circle"
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
                <span class="mr-1 text2 level-text">Senatorial Level</span>
                <b-icon-check-circle-fill
                 class="check-circle"
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
                <span class="mr-1 text2 level-text">Local Govt Area</span>
                <b-icon-check-circle-fill
                 class="check-circle"
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
        </div>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import axios from '@/plugins/axios';

export default {
  data() {
    return {
      loading: false,
      dataSources: [],
    };
  },
  props: {
    indicatorSelectedID: {
      type: Number,
    },
  },
  async mounted() {
    //   this.dataSources = this.dlGetDashboardDataSource().map((item) => ({
    //     id: item.id,
    //     datasource: item.datasource,
    //   }));
    /**
     * @Function Function to get datasource related to a particular indicator
     * @param {Number} indicatorID
     */
    try {
      this.loading = true;
      const ds = await axios.get(`/indicators/${this.indicatorSelectedID}/datasources/`);
      this.dataSources = ds.data.datasources.map((item) => ({
        id: item.id,
        datasource: item.datasource,
      }));
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style lang="scss" scoped>
div.loading_screen {
  height: 40vh;
}
.tab1 {
  color: black;
}

.text1 {
  font-weight: 700;
  border-bottom: 0.5px solid green;
  color: black;
  opacity: 1;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 14px;
}

.text2 {
  font-size: 13.5px;
  margin-bottom: 20px;
  margin-left: 10px;
  margin-right: 10px;

  &-bold {
    font-weight: 700;
    font-size: 13.5px;
  }
}

.grid1 {
  display: grid;
  grid-template-columns: 50% 50%;

  &-left-text1 {
    font-weight: 700;
    border-bottom: 0.5px solid green;
    color: black;
    opacity: 1;
    margin-left: 10px;
    font-size: 14px;
    border-right: 0.5px solid green;
  }

  &-left-text2 {
    border-right: 0.5px solid green;
    font-size: 13px;
    margin-bottom: 20px;
    margin-left: 10px;
  }

  &-right-text1 {
    font-weight: 700;
    border-bottom: 0.5px solid green;
    color: black;
    opacity: 1;
    font-size: 14px;
    padding-left: 10px;
  }

  &-right-text2 {
    font-size: 13px;
    margin-bottom: 20px;
    padding-left: 10px;
  }

}

.level-text{
  margin-top: 20px;
 display: flex;
  justify-content: center;
  align-items: center;
}

.check-circle{
  font-size: 20px;

}
</style>
