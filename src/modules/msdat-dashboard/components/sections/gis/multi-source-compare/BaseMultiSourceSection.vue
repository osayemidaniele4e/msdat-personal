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
                    id="Chloropleth"
                    name="visualization1"
                    value="Chloropleth"
                    v-model="selectedVisualizationColumn1"
                  />
                  <label class="radio-label ml-1" for="Chloropleth">Chloropleth</label>
                </div>
                <div class="">
                  <input
                    type="radio"
                    id="heat_map"
                    name="visualization1"
                    value="Heat Map"
                    v-model="selectedVisualizationColumn1"
                  />
                  <label class="radio-label ml-1" for="heat_map">Heat Map</label>
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
                      ref="BaseMap"
                      :mapObject="mapObjectColumn1"
                      :level="level"
                      :lgaState="stateName"
                      :title="titleColumn1"
                    />
                  </base-sub-card>
                  <NoAvailableData
                    v-if="showNoAvailableDataColumn1"
                    class="position-absolute"
                    style="top: 16%; width: 50%; left: 25%"
                  />
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
                      id="Chloropleth"
                      name="visualization"
                      value="Chloropleth"
                      v-model="selectedVisualizationColumn2"
                    />
                    <label class="radio-label ml-1" for="Chloropleth">Chloropleth</label>
                  </div>
                  <div class="">
                    <input
                      type="radio"
                      id="heat_map"
                      name="visualization"
                      value="Heat Map"
                      v-model="selectedVisualizationColumn2"
                    />
                    <label class="radio-label ml-1" for="heat_map">Heat Map</label>
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
                        ref="BaseMap"
                        :mapObject="mapObjectColumn2"
                        :level="level"
                        :lgaState="stateName"
                        :title="titleColumn2"
                      />
                    </base-sub-card>
                    <NoAvailableData
                      v-if="showNoAvailableDataColumn2"
                      class="position-absolute"
                      style="top: 16%; width: 50%; left: 25%"
                    />
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
                      id="Chloropleth"
                      name="visualization3"
                      value="Chloropleth"
                      v-model="selectedVisualizationColumn3"
                    />
                    <label class="radio-label ml-1" for="Chloropleth">Chloropleth</label>
                  </div>
                  <div class="">
                    <input
                      type="radio"
                      id="heat_map"
                      name="visualization3"
                      value="Heat Map"
                      v-model="selectedVisualizationColumn3"
                    />
                    <label class="radio-label ml-1" for="heat_map">Heat Map</label>
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
                        ref="BaseMap"
                        :mapObject="mapObjectColumn3"
                        :level="level"
                        :lgaState="stateName"
                        :title="titleColumn3"
                      />
                    </base-sub-card>
                    <NoAvailableData
                      v-if="showNoAvailableDataColumn3"
                      class="position-absolute"
                      style="top: 16%; width: 50%; left: 25%"
                    />
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
import { sortHighChartDataFormat } from '../../../../mixins/util';
import chartDownload from '../../../../mixins/chart_download';
import NoAvailableData from '../../../NoData2.vue';

export default {
  name: 'Multi-Source Comparison',
  mixins: [chartDownload],
  components: { BaseMap: Maps, NoAvailableData },
  props: {
    dashboardIndicators: Array,
  },

  data() {
    return {
      stateName: 'Delta',
      // column 1
      titleColumn1: '',
      selectedIndicatorColumn1: {
        id: 8,
        full_name: 'Postnatal care coverage (mother)',
        short_name: 'Postnatal care coverage',
        desirable_slope: 'Positive',
        indicator_type: 'Outcome',
        program_area: 'RMNCH',
        national_target: '80.00',
        national_source: 'NRHP 2017',
        national_information:
          'Target obtained from the National Reproductive Health Policy (NRHP) 2017 to 2021',
        sdg_target: null,
        sdg_information: 'Not available',
        created_at: '2022-10-20T08:42:09.560835Z',
        updated_at: '2023-03-16T15:29:08.616312Z',
        factor: 2,
        first_related: 6,
        second_related: 5,
        third_related: 7,
        fourth_related: null,
        datasources: [1, 2, 7, 3],
        group: [],
      },
      selectedDatasourceColumn1: {
        id: 1,
        datasource: 'MICS',
        full_name: 'Multiple Indicator Cluster Survey',
        description:
          'The Multiple Indicator Cluster Survey is a nationwide household survey programme developed by the United Nations Children Fund (UNICEF) and designed to collect statistically sound and internationally comparable estimates of key indicators that are used to assess the situation of children and women in the areas of health, education, child protection and HIV/AIDS.',
        year_available: '1995, 1999, 2007, 2011, 2016-2017, 2021',
        period_available: '2026',
        methodology:
          "A household survey carried out every 4-5 years and conducted among a nationally representative sample of women and men aged 15 – 49 years, and children aged less than 5 years. Topics covered include child health and mortality, nutrition, sanitation, reproductive health, education, child protection, and HIV/AIDS. The survey provides estimated disaggregation of Nigeria by states, geo political zones, sex, age, residence (urban and rural), mother's education and wealth quintiles. The sample for the Nigeria MICS 2016-17 was designed to provide estimates for a large number of indicators on the situation of children and women at the national, rural/urban, states as well as the 6 geopolitical zones of Nigeria. To sample, the states within each zone were identified as the main sampling Strata while the Enumeration Areas (EAs) within each state were identified as the Primary Sampling Units (PSUs). The EAs for the survey are selected from the National Integrated Survey of Households round 2 (NISH2) master sample, based on a list of EAs prepared for the 2006 Population Census. Two stage sampling is conducted with the first stage being the selection of EAs within the strata while the second stage was the selection of households within each EAs.",
        subnational_data: 'Yes',
        classification: 'Survey',
        group: [],
        link: 'https://mics.unicef.org/surveys',
        created_at: '2022-10-20T08:13:15.745372Z',
        updated_at: '2022-10-20T08:13:15.745380Z',
        indicators: [],
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
      selectedVisualizationColumn1: 'Chloropleth',
      // end Column 1
      // start Column 2
      titleColumn2: '',
      selectedIndicatorColumn2: {
        id: 8,
        full_name: 'Postnatal care coverage (mother)',
        short_name: 'Postnatal care coverage',
        desirable_slope: 'Positive',
        indicator_type: 'Outcome',
        program_area: 'RMNCH',
        national_target: '80.00',
        national_source: 'NRHP 2017',
        national_information:
          'Target obtained from the National Reproductive Health Policy (NRHP) 2017 to 2021',
        sdg_target: null,
        sdg_information: 'Not available',
        created_at: '2022-10-20T08:42:09.560835Z',
        updated_at: '2023-03-16T15:29:08.616312Z',
        factor: 2,
        first_related: 6,
        second_related: 5,
        third_related: 7,
        fourth_related: null,
        datasources: [1, 2, 7, 3],
        group: [],
      },
      selectedDatasourceColumn2: {
        id: 1,
        datasource: 'MICS',
        full_name: 'Multiple Indicator Cluster Survey',
        description:
          'The Multiple Indicator Cluster Survey is a nationwide household survey programme developed by the United Nations Children Fund (UNICEF) and designed to collect statistically sound and internationally comparable estimates of key indicators that are used to assess the situation of children and women in the areas of health, education, child protection and HIV/AIDS.',
        year_available: '1995, 1999, 2007, 2011, 2016-2017, 2021',
        period_available: '2026',
        methodology:
          "A household survey carried out every 4-5 years and conducted among a nationally representative sample of women and men aged 15 – 49 years, and children aged less than 5 years. Topics covered include child health and mortality, nutrition, sanitation, reproductive health, education, child protection, and HIV/AIDS. The survey provides estimated disaggregation of Nigeria by states, geo political zones, sex, age, residence (urban and rural), mother's education and wealth quintiles. The sample for the Nigeria MICS 2016-17 was designed to provide estimates for a large number of indicators on the situation of children and women at the national, rural/urban, states as well as the 6 geopolitical zones of Nigeria. To sample, the states within each zone were identified as the main sampling Strata while the Enumeration Areas (EAs) within each state were identified as the Primary Sampling Units (PSUs). The EAs for the survey are selected from the National Integrated Survey of Households round 2 (NISH2) master sample, based on a list of EAs prepared for the 2006 Population Census. Two stage sampling is conducted with the first stage being the selection of EAs within the strata while the second stage was the selection of households within each EAs.",
        subnational_data: 'Yes',
        classification: 'Survey',
        group: [],
        link: 'https://mics.unicef.org/surveys',
        created_at: '2022-10-20T08:13:15.745372Z',
        updated_at: '2022-10-20T08:13:15.745380Z',
        indicators: [],
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
      selectedVisualizationColumn2: 'Chloropleth',

      // end Column 3
      titleColumn3: '',
      selectedIndicatorColumn3: {
        id: 8,
        full_name: 'Postnatal care coverage (mother)',
        short_name: 'Postnatal care coverage',
        desirable_slope: 'Positive',
        indicator_type: 'Outcome',
        program_area: 'RMNCH',
        national_target: '80.00',
        national_source: 'NRHP 2017',
        national_information:
          'Target obtained from the National Reproductive Health Policy (NRHP) 2017 to 2021',
        sdg_target: null,
        sdg_information: 'Not available',
        created_at: '2022-10-20T08:42:09.560835Z',
        updated_at: '2023-03-16T15:29:08.616312Z',
        factor: 2,
        first_related: 6,
        second_related: 5,
        third_related: 7,
        fourth_related: null,
        datasources: [1, 2, 7, 3],
        group: [],
      },
      selectedDatasourceColumn3: {
        id: 1,
        datasource: 'MICS',
        full_name: 'Multiple Indicator Cluster Survey',
        description:
          'The Multiple Indicator Cluster Survey is a nationwide household survey programme developed by the United Nations Children Fund (UNICEF) and designed to collect statistically sound and internationally comparable estimates of key indicators that are used to assess the situation of children and women in the areas of health, education, child protection and HIV/AIDS.',
        year_available: '1995, 1999, 2007, 2011, 2016-2017, 2021',
        period_available: '2026',
        methodology:
          "A household survey carried out every 4-5 years and conducted among a nationally representative sample of women and men aged 15 – 49 years, and children aged less than 5 years. Topics covered include child health and mortality, nutrition, sanitation, reproductive health, education, child protection, and HIV/AIDS. The survey provides estimated disaggregation of Nigeria by states, geo political zones, sex, age, residence (urban and rural), mother's education and wealth quintiles. The sample for the Nigeria MICS 2016-17 was designed to provide estimates for a large number of indicators on the situation of children and women at the national, rural/urban, states as well as the 6 geopolitical zones of Nigeria. To sample, the states within each zone were identified as the main sampling Strata while the Enumeration Areas (EAs) within each state were identified as the Primary Sampling Units (PSUs). The EAs for the survey are selected from the National Integrated Survey of Households round 2 (NISH2) master sample, based on a list of EAs prepared for the 2006 Population Census. Two stage sampling is conducted with the first stage being the selection of EAs within the strata while the second stage was the selection of households within each EAs.",
        subnational_data: 'Yes',
        classification: 'Survey',
        group: [],
        link: 'https://mics.unicef.org/surveys',
        created_at: '2022-10-20T08:13:15.745372Z',
        updated_at: '2022-10-20T08:13:15.745380Z',
        indicators: [],
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
      selectedVisualizationColumn3: 'Chloropleth',
      // end

    };
  },

  watch: {
    selectedIndicatorColumn1: {
      async handler(newIndicator) {
        this.loadingColumn1 = true;
        const { data } = await apiServices.getIndicatorDatasources(newIndicator.id);
        this.datasourcesColumn1 = data;
        console.log(data, 'Indicator Datasource');
        this.selectedDatasourceColumn1 = data[0];
      },
      immediate: true,
      deep: true,
    },
    selectedDatasourceColumn1: {
      async handler(newDatasource) {
        await this.getAvailableYears(newDatasource);
      },
    },
    selectedYearColumn1: {
      async handler(newYear) {
        // const obj = {
        //   period: newYear,
        //   datasourceID: this.selectedDatasourceColumn1.id,
        //   indicatorID: this.selectedIndicatorColumn1.id,
        // };
        // const { data } = await apiServices.getAllDataObj(obj);
        // console.log(data, 'Dashboard');

        const data = await this.dlQuery({
          indicator: this.selectedIndicatorColumn1.id,
          datasource: this.selectedDatasourceColumn1.id,
          period: newYear,
          // value_type: 5,
          location: {
            level: this.mapDataLevel,
          },
        });
        const configObj = {
          indicator: this.selectedIndicatorColumn1,
          datasource: this.selectedDatasourceColumn1,
          year: this.selectedYearColumn1,
        };

        if (data.length === 0) {
          this.showNoAvailableDataColumn1 = true;
        } else {
          this.showNoAvailableDataColumn1 = false;
        }

        const formattedData = this.formatDataToSeriesMapFormat(data);
        this.mapObjectColumn1 = this.formatToHighChartOptionForMap(formattedData, configObj);

        console.log(data, 'Dashboard-ALT');
        this.loadingColumn1 = false;
      },
    },
    selectedIndicatorColumn2: {
      async handler(newIndicator) {
        this.loadingColumn2 = true;
        const { data } = await apiServices.getIndicatorDatasources(newIndicator.id);
        this.datasourcesColumn2 = data;
        console.log(data, 'Indicator Datasource');
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
        // const obj = {
        //   period: newYear,
        //   datasourceID: this.selectedDatasourceColumn1.id,
        //   indicatorID: this.selectedIndicatorColumn1.id,
        // };
        // const { data } = await apiServices.getAllDataObj(obj);
        // console.log(data, 'Dashboard');

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

        if (data.length === 0) {
          this.showNoAvailableDataColumn2 = true;
        } else {
          this.showNoAvailableDataColumn2 = false;
        }

        const formattedData = this.formatDataToSeriesMapFormat(data);
        this.mapObjectColumn2 = this.formatToHighChartOptionForMap(formattedData, configObj);

        console.log(data, 'Dashboard-ALT 2');
        this.loadingColumn2 = false;
      },
    },
    selectedIndicatorColumn3: {
      async handler(newIndicator) {
        this.loadingColumn3 = true;
        const { data } = await apiServices.getIndicatorDatasources(newIndicator.id);
        this.datasourcesColumn3 = data;
        console.log(data, 'Indicator Datasource');
        this.selectedDatasourceColumn3 = data[0];
      },
      immediate: true,
      deep: true,
    },
    selectedDatasourceColumn3: {
      async handler(newDatasource) {
        console.log(newDatasource, 'Indicator Datasource');
        await this.getAvailableYears3(newDatasource);
      },
    },
    selectedYearColumn3: {
      async handler(newYear) {
        // const obj = {
        //   period: newYear,
        //   datasourceID: this.selectedDatasourceColumn1.id,
        //   indicatorID: this.selectedIndicatorColumn1.id,
        // };
        // const { data } = await apiServices.getAllDataObj(obj);
        // console.log(data, 'Dashboard');

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

        if (data.length === 0) {
          this.showNoAvailableDataColumn3 = true;
        } else {
          this.showNoAvailableDataColumn3 = false;
        }

        const formattedData = this.formatDataToSeriesMapFormat(data);
        this.mapObjectColumn3 = this.formatToHighChartOptionForMap(formattedData, configObj);

        console.log(this.mapObjectColumn3, 'Dashboard-ALT 3');
        this.loadingColumn3 = false;
      },
    },
  },
  methods: {
    async getAvailableYears(datasource) {
      const obj = {
        datasourceID: datasource.id,
        indicatorID: this.selectedIndicatorColumn1.id,
      };
      const { data } = await apiServices.getDataObj(obj);
      console.log(data, 'Data @@');
      this.availableYearsColumn1 = this.getPeriodValues(data.results);
      console.log(this.availableYearsColumn1, 'Data @@');
      this.selectedYearColumn1 = this.availableYearsColumn1[0];
    },
    async getAvailableYears2(datasource) {
      const obj = {
        datasourceID: datasource.id,
        indicatorID: this.selectedIndicatorColumn2.id,
      };
      const { data } = await apiServices.getDataObj(obj);
      console.log(data, 'Data @@');
      this.availableYearsColumn2 = this.getPeriodValues(data.results);
      console.log(this.availableYearsColumn2, 'Data @@');
      this.selectedYearColumn2 = this.availableYearsColumn2[0];
    },
    async getAvailableYears3(datasource) {
      const obj = {
        datasourceID: datasource.id,
        indicatorID: this.selectedIndicatorColumn3.id,
      };
      const { data } = await apiServices.getDataObj(obj);
      console.log(data, 'Data @@ 3');
      this.availableYearsColumn3 = this.getPeriodValues(data.results);
      console.log(this.availableYearsColumn3, 'Data @@ 3');
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
      // const sortedData = this.sortedData(data);
      const tempData = this.sortData(data);
      // console.log(data, 'Crash-data');
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
      return chartOptions;
    },
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
