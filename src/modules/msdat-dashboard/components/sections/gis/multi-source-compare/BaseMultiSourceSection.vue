<template>
  <div>
    <div class="container-fluid">
      <div class="row px-2">
        <div class="col equal-width">
          <div class="row pb-4 pt-2">
            <div class="col-md-12 mb-4">
              <label>Indicator</label>
              <multiselect
                v-model="selectedIndicatorColumn1"
                :options="dashboardIndicators"
                :multiple="false"
                :group-select="false"
                placeholder="Type to search"
                track-by="full_name"
                label="full_name"
                selectLabel=""
                data-visted="notVisited"
                deselectLabel=""
                autocomplete="off"
                ><span slot="noResult"
                  >Oops! No elements found. Consider changing the search query.</span
                >
              </multiselect>
            </div>
            <div class="col-md-8">
              <label>Datasource</label>
              <multiselect
                v-model="selectedDatasourceColumn1"
                track-by="datasource"
                label="datasource"
                placeholder="Select one"
                :options="datasourcesColumn1"
                :searchable="false"
                :allow-empty="false"
                selectLabel=""
                data-visted="notVisited"
                deselectLabel=""
                autocomplete="off"
              >
              </multiselect>
            </div>
            <div class="col-md-4">
              <label>Year</label>
              <multiselect
                v-model="selectedYearColumn1"
                placeholder="Select one"
                :options="availableYearsColumn1"
                :searchable="false"
                :allow-empty="false"
                selectLabel=""
                data-visted="notVisited"
                deselectLabel=""
                autocomplete="off"
              >
              </multiselect>
            </div>
            <div class="divider my-3"></div>

            <div class="w-100 border">
              <div class="bg-secondary px-3 py-2">
                <p class="gis-title">{{ selectedIndicatorColumn1.short_name }}</p>
                <p class="gis-sub-title">{{ selectedYearColumn1 }}</p>
              </div>
              <div class="py-1 px-3 bg-white d-flex align-items-center form-check">
                <h2 class="visualization mr-3">Visualization:</h2>
                <div class="mr-3">
                  <input
                    type="radio"
                    id="state_map"
                    name="visualization1"
                    value="state_map"
                    v-model="selectedVisualizationColumn1"
                  />
                  <label class="radio-label ml-1" for="state_map">State Map</label>
                </div>
                <div class="">
                  <input
                    type="radio"
                    id="heat_map"
                    name="visualization1"
                    value="Zonal"
                    v-model="selectedVisualizationColumn1"
                  />
                  <label class="radio-label ml-1" for="Zonal">Zonal Map</label>
                </div>
              </div>
              <div class="bg-secondary p-3">
                <base-overlay :show="loadingColumn1">
                  <base-sub-card
                    showControls
                    @dropdownTypeSelected="mapDownload($event)"
                    :removeTitle="true"
                  >
                    <BaseMap
                      v-if="
                        selectedVisualizationColumn1 === 'state_map' &&
                        showSubNationalDataAvailableDataColumn1 === false
                      "
                      ref="BaseMap"
                      :mapObject="mapObjectColumn1"
                      :level="columnLevel1"
                      :lgaState="stateName"
                      :title="titleColumn1"
                    />
                    <BaseMap
                      v-if="
                        selectedVisualizationColumn1 === 'Zonal' &&
                        showSubNationalDataAvailableDataColumn1 === false
                      "
                      ref="BaseMap"
                      :mapObject="mapObjectColumn1"
                      :level="columnLevel1"
                      :lgaState="stateName"
                      :title="titleColumn1"
                    />
                    <NoSubNational v-if="showSubNationalDataAvailableDataColumn1" class="" />
                  </base-sub-card>
                  <!-- <NoAvailableData
                    v-if="showNoAvailableDataColumn1"
                    class="position-absolute"
                    style="top: 16%; width: 50%; left: 25%"
                  /> -->
                  <!-- <NoSubNational v-if="showSubNationalDataAvailableDataColumn1" class="position-absolute" style="top: 16%; width: 50%; left: 25%" /> -->
                </base-overlay>
              </div>
            </div>
          </div>
        </div>
        <div class="col equal-width mx-4">
          <div class="col equal-width">
            <div class="row pb-4 pt-2">
              <div class="col-md-12 mb-4">
                <label>Indicator</label>
                <multiselect
                  v-model="selectedIndicatorColumn2"
                  :options="dashboardIndicators"
                  :multiple="false"
                  :group-select="false"
                  placeholder="Type to search"
                  track-by="full_name"
                  label="full_name"
                  selectLabel=""
                  data-visted="notVisited"
                  deselectLabel=""
                  autocomplete="off"
                  ><span slot="noResult"
                    >Oops! No elements found. Consider changing the search query.</span
                  >
                </multiselect>
              </div>
              <div class="col-md-8">
                <label>Datasource</label>
                <multiselect
                  v-model="selectedDatasourceColumn2"
                  track-by="datasource"
                  label="datasource"
                  placeholder="Select one"
                  :options="datasourcesColumn2"
                  :searchable="false"
                  :allow-empty="false"
                  selectLabel=""
                  data-visted="notVisited"
                  deselectLabel=""
                  autocomplete="off"
                >
                </multiselect>
              </div>
              <div class="col-md-4">
                <label>Year</label>
                <multiselect
                  v-model="selectedYearColumn2"
                  placeholder="Select one"
                  :options="availableYearsColumn2"
                  :searchable="false"
                  :allow-empty="false"
                  selectLabel=""
                  data-visted="notVisited"
                  deselectLabel=""
                  autocomplete="off"
                >
                </multiselect>
              </div>
              <div class="divider my-3"></div>

              <div class="w-100 border">
                <div class="bg-secondary px-3 py-2">
                  <p class="gis-title">{{ selectedIndicatorColumn2.short_name }}</p>
                  <p class="gis-sub-title">{{ selectedYearColumn2 }}</p>
                </div>
                <div class="py-1 px-3 bg-white d-flex align-items-center form-check">
                  <h2 class="visualization mr-3">Visualization:</h2>
                  <div class="mr-3">
                    <input
                      type="radio"
                      id="state_map"
                      name="visualization"
                      value="state_map"
                      v-model="selectedVisualizationColumn2"
                    />
                    <label class="radio-label ml-1" for="state_map">State Map</label>
                  </div>
                  <div class="">
                    <input
                      type="radio"
                      id="heat_map"
                      name="visualization"
                      value="Zonal"
                      v-model="selectedVisualizationColumn2"
                    />
                    <label class="radio-label ml-1" for="Zonal">Zonal Map</label>
                  </div>
                </div>
                <div class="bg-secondary p-3">
                  <base-overlay :show="loadingColumn2">
                    <base-sub-card
                      showControls
                      @dropdownTypeSelected="mapDownload($event)"
                      :removeTitle="true"
                    >
                      <BaseMap
                        v-if="
                          selectedVisualizationColumn2 === 'state_map' &&
                          showSubNationalDataAvailableDataColumn2 === false
                        "
                        ref="BaseMap"
                        :mapObject="mapObjectColumn2"
                        :level="columnLevel2"
                        :lgaState="stateName"
                        :title="titleColumn2"
                      />
                      <BaseMap
                        v-if="
                          selectedVisualizationColumn2 === 'Zonal' &&
                          showSubNationalDataAvailableDataColumn2 === false
                        "
                        ref="BaseMap"
                        :mapObject="mapObjectColumn2"
                        :level="columnLevel2"
                        :lgaState="stateName"
                        :title="titleColumn2"
                      />
                      <NoSubNational v-if="showSubNationalDataAvailableDataColumn2" class="" />
                    </base-sub-card>
                  </base-overlay>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col equal-width">
          <div class="col equal-width">
            <div class="row pb-4 pt-2">
              <div class="col-md-12 mb-4">
                <label>Indicator</label>
                <multiselect
                  v-model="selectedIndicatorColumn3"
                  :options="dashboardIndicators"
                  :multiple="false"
                  :group-select="false"
                  placeholder="Type to search"
                  track-by="full_name"
                  label="full_name"
                  selectLabel=""
                  data-visted="notVisited"
                  deselectLabel=""
                  autocomplete="off"
                  ><span slot="noResult"
                    >Oops! No elements found. Consider changing the search query.</span
                  >
                </multiselect>
              </div>
              <div class="col-md-8">
                <label>Datasource</label>
                <multiselect
                  v-model="selectedDatasourceColumn3"
                  track-by="datasource"
                  label="datasource"
                  placeholder="Select one"
                  :options="datasourcesColumn3"
                  :searchable="false"
                  :allow-empty="false"
                  selectLabel=""
                  data-visted="notVisited"
                  deselectLabel=""
                  autocomplete="off"
                >
                </multiselect>
              </div>
              <div class="col-md-4">
                <label>Year</label>
                <multiselect
                  v-model="selectedYearColumn3"
                  placeholder="Select one"
                  :options="availableYearsColumn3"
                  :searchable="false"
                  :allow-empty="false"
                  selectLabel=""
                  data-visted="notVisited"
                  deselectLabel=""
                  autocomplete="off"
                >
                </multiselect>
              </div>
              <div class="divider my-3"></div>

              <div class="w-100 border">
                <div class="bg-secondary px-3 py-2">
                  <p class="gis-title">{{ selectedIndicatorColumn3.short_name }}</p>
                  <p class="gis-sub-title">{{ selectedYearColumn3 }}</p>
                </div>
                <div class="py-1 px-3 bg-white d-flex align-items-center form-check">
                  <h2 class="visualization mr-3">Visualization:</h2>
                  <div class="mr-3">
                    <input
                      type="radio"
                      id="state_map"
                      name="visualization3"
                      value="state_map"
                      v-model="selectedVisualizationColumn3"
                    />
                    <label class="radio-label ml-1" for="state_map">State Map</label>
                  </div>
                  <div class="">
                    <input
                      type="radio"
                      id="heat_map"
                      name="visualization3"
                      value="Zonal"
                      v-model="selectedVisualizationColumn3"
                    />
                    <label class="radio-label ml-1" for="Zonal">Zonal Map</label>
                  </div>
                </div>
                <div class="bg-secondary p-3">
                  <base-overlay :show="loadingColumn3">
                    <base-sub-card
                      showControls
                      @dropdownTypeSelected="mapDownload($event)"
                      :removeTitle="true"
                    >
                      <BaseMap
                        v-if="
                          selectedVisualizationColumn3 === 'state_map' &&
                          showSubNationalDataAvailableDataColumn3 === false
                        "
                        ref="BaseMap"
                        :mapObject="mapObjectColumn3"
                        :level="columnLevel3"
                        :lgaState="stateName"
                        :title="titleColumn3"
                      />
                      <BaseMap
                        v-if="
                          selectedVisualizationColumn3 === 'Zonal' &&
                          showSubNationalDataAvailableDataColumn3 === false
                        "
                        ref="BaseMap"
                        :mapObject="mapObjectColumn3"
                        :level="columnLevel3"
                        :lgaState="stateName"
                        :title="titleColumn3"
                      />
                      <NoSubNational v-if="showSubNationalDataAvailableDataColumn3" class="" />
                    </base-sub-card>
                  </base-overlay>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiServices from '@/modules/data-layer/services/ApiServices';
import Maps from '@/components/maps/ZonalBaseMap.vue';
// import PieMaps from '@/components/maps/PieMap.vue';
import { sortHighChartDataFormat } from '../../../../mixins/util';
import chartDownload from '../../../../mixins/chart_download';
// import NoAvailableData from '../../../NoData2.vue';
import NoSubNational from './NoSubNational.vue';

export default {
  name: 'Multi-Source Comparison',
  mixins: [chartDownload],
  components: { BaseMap: Maps, NoSubNational },
  props: {
    dashboardIndicators: Array,
  },

  data() {
    return {
      stateName: 'Delta',
      level: 1,
      // column 1
      showSubNationalDataAvailableDataColumn1: false,
      showSubNationalDataAvailableDataColumn2: false,
      showSubNationalDataAvailableDataColumn3: false,
      titleColumn1: '',
      selectedIndicatorColumn1: {
        id: 2,
        full_name: 'Adolescent birth rate',
        short_name: 'Adolescent birth rate',
        desirable_slope: 'Negative',
        indicator_type: 'Impact',
        program_area: 'RMNCH',
        national_target: '90.00',
        national_source: 'NSHDP 2010 to 2015',
        national_information: 'Target was obtained from the National Strategic and Health Development Plan (NSHDP) 2010 to 2015. It is the latest available target for this indicator.',
        sdg_target: null,
        sdg_information: 'Not available',
        created_at: '2022-10-20T08:42:09.550494Z',
        updated_at: '2024-10-23T09:29:04.425406Z',
        factor: null,
        first_related: 1,
        second_related: 4,
        third_related: 3,
        fourth_related: null,
        datasources: [
          2,
          4,
          6,
          7,
          8,
          9,
          15,
          18,
          30,
        ],
        group: [],
      },
      selectedDatasourceColumn1: {
        id: 2,
        datasource: 'NDHS',
        full_name: 'National Demographic and Health Survey',
        description:
          'The Nigeria Demographic Health Survey is a national sample survey that provides up-to-date information on demographic and health characteristics of Nigerians.',
        year_available: '1990,1999, 2003, 2008, 2013, 2018',
        period_available: '2023',
        methodology:
          'A nationally representative household survey conducted among women and men aged 15-49 years. The sample is nationally representative and covers the entire population residing in non-institutional dwelling units in the country. The survey uses a sampling frame of the list of enumeration areas (EAs) provided by the National Population Commission. The sample is designed to provide population and health indicator estimates at the national, zonal, and state levels, and is selected using a stratified three-stage cluster design consisting of clusters of urban and rural areas.The sample design allowed for specific indicators to be calculated for each of the six zones, 36 states, and the Federal Capital Territory, Abuja.',
        subnational_data: 'Yes',
        classification: 'Survey',
        group: [],
        link: 'https://statcompiler.com/en/',
        created_at: '2022-10-20T08:13:15.751354Z',
        updated_at: '2022-10-20T08:13:15.751362Z',
        indicators: [
          457, 9, 12, 27, 26, 11, 3, 25, 18, 24, 10, 8, 385, 327, 20, 19, 28, 33, 5, 6, 29, 70, 549,
          529, 530, 531, 535, 538, 15, 542, 545, 544, 551, 557, 552, 553, 558, 554, 555, 556, 559,
          560, 550, 580, 589, 577, 578, 579, 590, 541, 14, 66, 67, 16, 31, 411, 407, 400, 399, 405,
          403, 404, 401, 402, 7, 1677, 1676, 32, 4, 1638, 1663, 1636, 1637, 409, 1655, 1662, 1641,
          1640, 1650, 1651, 1652, 1653, 1654, 1660, 1657, 1656, 1659, 1643, 1658, 1642, 1661, 1644,
          1645, 1639, 1648, 1646, 410, 30, 406, 1674, 1670, 1675, 1669, 1668, 1667, 1665, 1664,
          1666, 1671, 1672, 1673, 2, 397, 212, 21, 13, 23, 398, 17, 22, 1, 2696, 2697, 2705, 2706,
        ],
      },
      selectedYearColumn1: '2023',
      datasourcesColumn1: [],
      availableYearsColumn1: [],
      mapObjectColumn1: {
        series: [
          {
            name: 'Nigeria',
            data: [],
          },
        ],
        title: {
          text: 'Indicator Name',
        },
      },
      loadingColumn1: true,
      showNoAvailableDataColumn1: false,
      selectedVisualizationColumn1: 'state_map',
      columnLevel1: 1,
      // end Column 1
      // start Column 2
      columnLevel2: 1,
      titleColumn2: '',
      selectedIndicatorColumn2: {
        id: 2,
        full_name: 'Adolescent birth rate',
        short_name: 'Adolescent birth rate',
        desirable_slope: 'Negative',
        indicator_type: 'Impact',
        program_area: 'RMNCH',
        national_target: '90.00',
        national_source: 'NSHDP 2010 to 2015',
        national_information: 'Target was obtained from the National Strategic and Health Development Plan (NSHDP) 2010 to 2015. It is the latest available target for this indicator.',
        sdg_target: null,
        sdg_information: 'Not available',
        created_at: '2022-10-20T08:42:09.550494Z',
        updated_at: '2024-10-23T09:29:04.425406Z',
        factor: null,
        first_related: 1,
        second_related: 4,
        third_related: 3,
        fourth_related: null,
        datasources: [
          2,
          4,
          6,
          7,
          8,
          9,
          15,
          18,
          30,
        ],
        group: [],
      },
      selectedDatasourceColumn2: {
        id: 2,
        datasource: 'NDHS',
        full_name: 'National Demographic and Health Survey',
        description:
          'The Nigeria Demographic Health Survey is a national sample survey that provides up-to-date information on demographic and health characteristics of Nigerians.',
        year_available: '1990,1999, 2003, 2008, 2013, 2018',
        period_available: '2023',
        methodology:
          'A nationally representative household survey conducted among women and men aged 15-49 years. The sample is nationally representative and covers the entire population residing in non-institutional dwelling units in the country. The survey uses a sampling frame of the list of enumeration areas (EAs) provided by the National Population Commission. The sample is designed to provide population and health indicator estimates at the national, zonal, and state levels, and is selected using a stratified three-stage cluster design consisting of clusters of urban and rural areas.The sample design allowed for specific indicators to be calculated for each of the six zones, 36 states, and the Federal Capital Territory, Abuja.',
        subnational_data: 'Yes',
        classification: 'Survey',
        group: [],
        link: 'https://statcompiler.com/en/',
        created_at: '2022-10-20T08:13:15.751354Z',
        updated_at: '2022-10-20T08:13:15.751362Z',
        indicators: [
          457, 9, 12, 27, 26, 11, 3, 25, 18, 24, 10, 8, 385, 327, 20, 19, 28, 33, 5, 6, 29, 70, 549,
          529, 530, 531, 535, 538, 15, 542, 545, 544, 551, 557, 552, 553, 558, 554, 555, 556, 559,
          560, 550, 580, 589, 577, 578, 579, 590, 541, 14, 66, 67, 16, 31, 411, 407, 400, 399, 405,
          403, 404, 401, 402, 7, 1677, 1676, 32, 4, 1638, 1663, 1636, 1637, 409, 1655, 1662, 1641,
          1640, 1650, 1651, 1652, 1653, 1654, 1660, 1657, 1656, 1659, 1643, 1658, 1642, 1661, 1644,
          1645, 1639, 1648, 1646, 410, 30, 406, 1674, 1670, 1675, 1669, 1668, 1667, 1665, 1664,
          1666, 1671, 1672, 1673, 2, 397, 212, 21, 13, 23, 398, 17, 22, 1, 2696, 2697, 2705, 2706,
        ],
      },
      selectedYearColumn2: '2023',
      datasourcesColumn2: [],
      availableYearsColumn2: [],
      mapObjectColumn2: {
        series: [
          {
            name: 'Nigeria',
            data: [],
          },
        ],
        title: {
          text: 'Indicator Name',
        },
      },
      loadingColumn2: true,
      showNoAvailableDataColumn2: false,
      selectedVisualizationColumn2: 'state_map',

      // end Column 3
      columnLevel3: 1,
      titleColumn3: '',
      selectedIndicatorColumn3: {
        id: 2,
        full_name: 'Adolescent birth rate',
        short_name: 'Adolescent birth rate',
        desirable_slope: 'Negative',
        indicator_type: 'Impact',
        program_area: 'RMNCH',
        national_target: '90.00',
        national_source: 'NSHDP 2010 to 2015',
        national_information: 'Target was obtained from the National Strategic and Health Development Plan (NSHDP) 2010 to 2015. It is the latest available target for this indicator.',
        sdg_target: null,
        sdg_information: 'Not available',
        created_at: '2022-10-20T08:42:09.550494Z',
        updated_at: '2024-10-23T09:29:04.425406Z',
        factor: null,
        first_related: 1,
        second_related: 4,
        third_related: 3,
        fourth_related: null,
        datasources: [
          2,
          4,
          6,
          7,
          8,
          9,
          15,
          18,
          30,
        ],
        group: [],
      },
      selectedDatasourceColumn3: {
        id: 2,
        datasource: 'NDHS',
        full_name: 'National Demographic and Health Survey',
        description:
          'The Nigeria Demographic Health Survey is a national sample survey that provides up-to-date information on demographic and health characteristics of Nigerians.',
        year_available: '1990,1999, 2003, 2008, 2013, 2018',
        period_available: '2023',
        methodology:
          'A nationally representative household survey conducted among women and men aged 15-49 years. The sample is nationally representative and covers the entire population residing in non-institutional dwelling units in the country. The survey uses a sampling frame of the list of enumeration areas (EAs) provided by the National Population Commission. The sample is designed to provide population and health indicator estimates at the national, zonal, and state levels, and is selected using a stratified three-stage cluster design consisting of clusters of urban and rural areas.The sample design allowed for specific indicators to be calculated for each of the six zones, 36 states, and the Federal Capital Territory, Abuja.',
        subnational_data: 'Yes',
        classification: 'Survey',
        group: [],
        link: 'https://statcompiler.com/en/',
        created_at: '2022-10-20T08:13:15.751354Z',
        updated_at: '2022-10-20T08:13:15.751362Z',
        indicators: [
          457, 9, 12, 27, 26, 11, 3, 25, 18, 24, 10, 8, 385, 327, 20, 19, 28, 33, 5, 6, 29, 70, 549,
          529, 530, 531, 535, 538, 15, 542, 545, 544, 551, 557, 552, 553, 558, 554, 555, 556, 559,
          560, 550, 580, 589, 577, 578, 579, 590, 541, 14, 66, 67, 16, 31, 411, 407, 400, 399, 405,
          403, 404, 401, 402, 7, 1677, 1676, 32, 4, 1638, 1663, 1636, 1637, 409, 1655, 1662, 1641,
          1640, 1650, 1651, 1652, 1653, 1654, 1660, 1657, 1656, 1659, 1643, 1658, 1642, 1661, 1644,
          1645, 1639, 1648, 1646, 410, 30, 406, 1674, 1670, 1675, 1669, 1668, 1667, 1665, 1664,
          1666, 1671, 1672, 1673, 2, 397, 212, 21, 13, 23, 398, 17, 22, 1, 2696, 2697, 2705, 2706,
        ],
      },
      selectedYearColumn3: '2023',
      datasourcesColumn3: [],
      availableYearsColumn3: [],
      mapObjectColumn3: {
        series: [
          {
            name: 'Nigeria',
            data: [],
          },
        ],
        title: {
          text: 'Indicator Name',
        },
      },
      loadingColumn3: true,
      showNoAvailableDataColumn3: false,
      selectedVisualizationColumn3: 'state_map',
      // end
    };
  },

  watch: {
    selectedIndicatorColumn1: {
      async handler(newIndicator) {
        this.loadingColumn1 = true;
        console.log(newIndicator, 'firstLoad indicator');
        const { data } = await apiServices.getIndicatorDatasources(newIndicator.id);
        this.datasourcesColumn1 = data;
        this.selectedDatasourceColumn1 = data[0];
        this.resetCol1Data();
      },
      immediate: true,
      deep: true,
    },
    selectedDatasourceColumn1: {
      async handler(newDatasource) {
        console.log(newDatasource, 'newDatasource');
        await this.getAvailableYears(newDatasource);
        this.resetCol1Data();
      },
    },
    selectedYearColumn1: {
      async handler(newYear) {
        // console.log(this.selectedIndicatorColumn1, 'firstLoad 2');
        // console.log(this.selectedDatasourceColumn1, 'firstLoad 2');
        // console.log(newYear, 'firstLoad 2');

        const data = await this.dlQuery({
          indicator: this.selectedIndicatorColumn1.id,
          datasource: this.selectedDatasourceColumn1.id,
          period: newYear,
          // value_type: 5,
          location: {
            level: this.mapDataLevel,
          },
        });
        console.log(data, 'firstLoad 2');
        const configObj = {
          indicator: this.selectedIndicatorColumn1,
          datasource: this.selectedDatasourceColumn1,
          year: this.selectedYearColumn1,
        };

        // if (data.length === 0) {
        //   this.showNoAvailableDataColumn1 = true;
        // } else {
        //   this.showNoAvailableDataColumn1 = false;
        // }

        // console.log(data, 'chartOptions 3');
        console.log(data, 'chartOptions data');

        if (data.length === 0) {
          this.showNoAvailableDataColumn1 = true;
          this.showSubNationalDataAvailableDataColumn1 = false;
        } else if (data.length === 1) {
          this.showNoAvailableDataColumn1 = false;
          this.showSubNationalDataAvailableDataColumn1 = true;
        } else if (data.length > 1) {
          this.showNoAvailableDataColumn1 = false;
          this.showSubNationalDataAvailableDataColumn1 = false;
        }

        const formattedData = this.formatDataToSeriesMapFormat(data);
        console.log(formattedData, 'chartOptions 4');
        this.mapObjectColumn1 = this.formatToHighChartOptionForMap(formattedData, configObj);
        this.loadingColumn1 = false;
      },
    },
    selectedIndicatorColumn2: {
      async handler(newIndicator) {
        this.loadingColumn2 = true;
        const { data } = await apiServices.getIndicatorDatasources(newIndicator.id);
        this.datasourcesColumn2 = data;
        this.selectedDatasourceColumn2 = data[0];
      },
      immediate: true,
      deep: true,
    },
    selectedDatasourceColumn2: {
      async handler(newDatasource) {
        await this.getAvailableYears2(newDatasource);
      },
    },
    selectedYearColumn2: {
      async handler(newYear) {
        const data = await this.dlQuery({
          indicator: this.selectedIndicatorColumn2.id,
          datasource: this.selectedDatasourceColumn2.id,
          period: newYear,
          // value_type: 5,
          location: {
            level: this.mapDataLevel,
          },
        });
        const configObj = {
          indicator: this.selectedIndicatorColumn2,
          datasource: this.selectedDatasourceColumn2,
          year: this.selectedYearColumn1,
        };

        // if (data.length === 0) {
        //   this.showNoAvailableDataColumn2 = true;
        // } else {
        //   this.showNoAvailableDataColumn2 = false;
        // }

        if (data.length === 0) {
          this.showNoAvailableDataColumn2 = true;
          this.showSubNationalDataAvailableDataColumn2 = false;
        } else if (data.length === 1) {
          this.showNoAvailableDataColumn2 = false;
          this.showSubNationalDataAvailableDataColumn2 = true;
        } else if (data.length > 1) {
          this.showNoAvailableDataColumn2 = false;
          this.showSubNationalDataAvailableDataColumn2 = false;
        }

        const formattedData = this.formatDataToSeriesMapFormat(data);
        this.mapObjectColumn2 = this.formatToHighChartOptionForMap(formattedData, configObj);
        this.loadingColumn2 = false;
      },
    },
    selectedIndicatorColumn3: {
      async handler(newIndicator) {
        this.loadingColumn3 = true;
        const { data } = await apiServices.getIndicatorDatasources(newIndicator.id);
        this.datasourcesColumn3 = data;
        this.selectedDatasourceColumn3 = data[0];
      },
      immediate: true,
      deep: true,
    },
    selectedDatasourceColumn3: {
      async handler(newDatasource) {
        await this.getAvailableYears3(newDatasource);
      },
    },
    selectedYearColumn3: {
      async handler(newYear) {
        const data = await this.dlQuery({
          indicator: this.selectedIndicatorColumn3.id,
          datasource: this.selectedDatasourceColumn3.id,
          period: newYear,
          // value_type: 5,
          location: {
            level: this.mapDataLevel,
          },
        });
        const configObj = {
          indicator: this.selectedIndicatorColumn3,
          datasource: this.selectedDatasourceColumn3,
          year: this.selectedYearColumn3,
        };

        // if (data.length === 0) {
        //   this.showNoAvailableDataColumn3 = true;
        // } else {
        //   this.showNoAvailableDataColumn3 = false;
        // }

        if (data.length === 0) {
          this.showNoAvailableDataColumn3 = true;
          this.showSubNationalDataAvailableDataColumn3 = false;
        } else if (data.length === 1) {
          this.showNoAvailableDataColumn3 = false;
          this.showSubNationalDataAvailableDataColumn3 = true;
        } else if (data.length > 1) {
          this.showNoAvailableDataColumn3 = false;
          this.showSubNationalDataAvailableDataColumn3 = false;
        }

        const formattedData = this.formatDataToSeriesMapFormat(data);
        this.mapObjectColumn3 = this.formatToHighChartOptionForMap(formattedData, configObj);

        this.loadingColumn3 = false;
      },
    },
    selectedVisualizationColumn1: {
      async handler(value) {
        this.loading = true;
        switch (value) {
          case 'state_map':
            this.mapDataLevel = 3;
            this.columnLevel1 = 1;
            this.visualization = 'map';
            this.visualizationText = 'state map';
            break;
          case 'Zonal':
            this.visualization = 'map';
            this.visualizationText = 'zonal map';
            this.columnLevel1 = 2;
            this.mapDataLevel = 2;
            break;
          default:
            break;
        }
        this.resetCol1Data();
        this.loadingColumn1 = false;
      },
      deep: true,
      immediate: false,
    },
    selectedVisualizationColumn2: {
      async handler(value) {
        this.loading = true;
        switch (value) {
          case 'state_map':
            this.mapDataLevel = 3;
            this.columnLevel2 = 1;
            this.visualization = 'map';
            this.visualizationText = 'state map';
            break;
          case 'Zonal':
            this.visualization = 'map';
            this.visualizationText = 'zonal map';
            this.columnLevel2 = 2;
            this.mapDataLevel = 2;
            break;
          default:
            break;
        }
        this.resetCol2Data();
        this.loadingColumn2 = false;
      },
      deep: true,
      immediate: false,
    },
    selectedVisualizationColumn3: {
      async handler(value) {
        this.loading = true;
        switch (value) {
          case 'state_map':
            this.mapDataLevel = 3;
            this.columnLevel3 = 1;
            this.visualization = 'map';
            this.visualizationText = 'state map';
            break;
          case 'Zonal':
            this.visualization = 'map';
            this.visualizationText = 'zonal map';
            this.columnLevel3 = 2;
            this.mapDataLevel = 2;
            break;
          default:
            break;
        }
        this.resetCol3Data();
        this.loadingColumn3 = false;
      },
      deep: true,
      immediate: false,
    },
  },
  methods: {
    async getAvailableYears(datasource) {
      const obj = {
        datasourceID: datasource.id,
        indicatorID: this.selectedIndicatorColumn1.id,
      };
      const { data } = await apiServices.getDataObj(obj);
      const response = await apiServices.getDataObj(obj);
      console.log(response, 'firstLoad World');
      this.availableYearsColumn1 = this.getPeriodValues(data.results);
      this.selectedYearColumn1 = this.availableYearsColumn1[0];
    },
    async getAvailableYears2(datasource) {
      const obj = {
        datasourceID: datasource.id,
        indicatorID: this.selectedIndicatorColumn2.id,
      };
      const { data } = await apiServices.getDataObj(obj);

      this.availableYearsColumn2 = this.getPeriodValues(data.results);

      this.selectedYearColumn2 = this.availableYearsColumn2[0];
    },
    async getAvailableYears3(datasource) {
      const obj = {
        datasourceID: datasource.id,
        indicatorID: this.selectedIndicatorColumn3.id,
      };
      const { data } = await apiServices.getDataObj(obj);

      this.availableYearsColumn3 = this.getPeriodValues(data.results);

      this.selectedYearColumn3 = this.availableYearsColumn3[0];
    },
    getPeriodValues(temp) {
      return [...new Set(temp.map((item) => item.period))].sort((a, b) => b - a);
    },
    formatDataToSeriesMapFormat(data) {
      return data.map((item) => [
        this.dlGetLocation(item.location).name,
        Number.parseFloat(item.value),
      ]);
    },
    formatDataToSeriesLineFormat(data) {
      const dataValues = data.map((item) => [item.period, Number.parseFloat(item.value)]);
      return dataValues.sort(sortHighChartDataFormat);
    },
    formatToHighChartOptionForMap(data, controlPanelObject) {
      return {
        title: {
          text: controlPanelObject.indicator.short_name,
          style: {
            fontSize: '13px',
            fontFamily: '"Work Sans", sans-serif',
            fontWeight: 'normal',
          },
        },
        colors: ['#114663'],
        colorAxis: {
          min: 0,
          minColor: '#E6E6E6',
          maxColor: '#114663',
        },
        series: [
          {
            //  borderColor: 'white',
            borderWidth: 0,
            name: 'Nigeria',
            data,
          },
        ],
      };
    },
    formatToHighChartOptionForLine(data, chartType, controlPanelObject) {
      const tempData = this.sortData(data);
      console.log(tempData, 'chartOptions 2');

      const chartOptions = {
        chart: {
          type: chartType,
        },
        yAxis: {
          title: {
            text: 'Values',
            style: {
              fontSize: '13px',
              fontFamily: '"Work Sans", sans-serif',
            },
          },
        },
        title: {
          text: controlPanelObject.indicator.short_name,
        },
        subtitle: {
          text: `${controlPanelObject.datasource.datasource}`,
        },
        series: [
          {
            name: 'Nigeria',
            data: tempData,
            // color: 'red',
          },
        ],
      };
      const displayFactor = this.dlGetFactor(this.values.indicator.factor).display_factor;
      chartOptions.yAxis.title.text = displayFactor;
      console.log(chartOptions, 'chartOptions 1');
      return chartOptions;
    },
    async resetCol1Data() {
      console.log('chartOptions data');
      console.log(this.selectedIndicatorColumn1, 'firstLoad');
      console.log(this.selectedDatasourceColumn1, 'firstLoad');
      console.log(this.selectedYearColumn1, 'firstLoad');
      const data = await this.dlQuery({
        indicator: this.selectedIndicatorColumn1.id,
        datasource: this.selectedDatasourceColumn1.id,
        period: this.selectedYearColumn1,
        // value_type: 5,
        location: {
          level: this.mapDataLevel,
        },
      });
      console.log(data, 'firstLoad data');
      const configObj = {
        indicator: this.selectedIndicatorColumn1,
        datasource: this.selectedDatasourceColumn1,
        year: this.selectedYearColumn1,
      };

      console.log(data, 'chartOptions data');

      if (data.length === 0) {
        this.showNoAvailableDataColumn1 = true;
        this.showSubNationalDataAvailableDataColumn1 = false;
      } else if (data.length === 1) {
        this.showNoAvailableDataColumn1 = false;
        this.showSubNationalDataAvailableDataColumn1 = true;
      } else if (data.length > 1) {
        this.showNoAvailableDataColumn1 = false;
        this.showSubNationalDataAvailableDataColumn1 = false;
      }

      const formattedData = this.formatDataToSeriesMapFormat(data);
      this.mapObjectColumn1 = this.formatToHighChartOptionForMap(formattedData, configObj);

      this.loadingColumn1 = false;
    },
    async resetCol2Data() {
      const data = await this.dlQuery({
        indicator: this.selectedIndicatorColumn2.id,
        datasource: this.selectedDatasourceColumn2.id,
        period: this.selectedYearColumn2,
        // value_type: 5,
        location: {
          level: this.mapDataLevel,
        },
      });
      const configObj = {
        indicator: this.selectedIndicatorColumn2,
        datasource: this.selectedDatasourceColumn2,
        year: this.selectedYearColumn2,
      };

      // if (data.length === 0) {
      //   this.showNoAvailableDataColumn2 = true;
      // } else {
      //   this.showNoAvailableDataColumn2 = false;
      // }
      if (data.length === 0) {
        this.showNoAvailableDataColumn2 = true;
        this.showSubNationalDataAvailableDataColumn2 = false;
      } else if (data.length === 1) {
        this.showNoAvailableDataColumn2 = false;
        this.showSubNationalDataAvailableDataColumn2 = true;
      } else if (data.length > 1) {
        this.showNoAvailableDataColumn2 = false;
        this.showSubNationalDataAvailableDataColumn2 = false;
      }

      const formattedData = this.formatDataToSeriesMapFormat(data);
      this.mapObjectColumn2 = this.formatToHighChartOptionForMap(formattedData, configObj);

      this.loadingColumn2 = false;
    },
    async resetCol3Data() {
      const data = await this.dlQuery({
        indicator: this.selectedIndicatorColumn3.id,
        datasource: this.selectedDatasourceColumn3.id,
        period: this.selectedYearColumn3,
        // value_type: 5,
        location: {
          level: this.mapDataLevel,
        },
      });
      const configObj = {
        indicator: this.selectedIndicatorColumn3,
        datasource: this.selectedDatasourceColumn3,
        year: this.selectedYearColumn3,
      };

      // if (data.length === 0) {
      //   this.showNoAvailableDataColumn3 = true;
      // } else {
      //   this.showNoAvailableDataColumn3 = false;
      // }
      if (data.length === 0) {
        this.showNoAvailableDataColumn3 = true;
        this.showSubNationalDataAvailableDataColumn3 = false;
      } else if (data.length === 1) {
        this.showNoAvailableDataColumn3 = false;
        this.showSubNationalDataAvailableDataColumn3 = true;
      } else if (data.length > 1) {
        this.showNoAvailableDataColumn3 = false;
        this.showSubNationalDataAvailableDataColumn3 = false;
      }

      const formattedData = this.formatDataToSeriesMapFormat(data);
      this.mapObjectColumn3 = this.formatToHighChartOptionForMap(formattedData, configObj);

      this.loadingColumn3 = false;
    },
  },
  mounted() {
    this.resetCol1Data();
    this.resetCol2Data();
    this.resetCol3Data();
  },
};
</script>

<style scoped>
.divider {
  height: 1px;
  width: 100%;
  border-top: 1px solid #b3b3b3;
}
.gis-title {
  font-weight: bold;
}
.gis-sub-title,
.gis-title {
  margin: 0;
  font-size: 16px;
}

.equal-width {
  flex: 1 1 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.radio-label {
  font-size: 16px;
}
.visualization {
  font-size: 16px;
  font-weight: bold;
}
</style>
