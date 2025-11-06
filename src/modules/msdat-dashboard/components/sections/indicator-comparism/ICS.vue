<template>
  <div class="ics_wrapper">
    <base-overlay :show="loading">
      <base-sub-card
        buttonToggle
        showControls
        :sideControl="false"
        :ConfidenceOptions="false"
        :showToggle="false"
        v-if="Object.keys(values).length"
        @dropdownTypeSelected="
          downLoadType($event, {
            indicator: values.indicator.short_name,
            datasource: values.datasource.datasource,
            year: '',
          })
        "
      >
        <!-- <template #title>
          <p
            class="work-sans mb-0 line-height"
            v-if="!Array.isArray(values.indicator.length)"
          >
           Comparison of <b>{{ values.indicator.short_name }}</b> according to
            the <b> {{ values.datasource.datasource }} </b> across
            {{ values.compareBy.name }}
          </p>
          <p class="text-dark work-sans mb-0 line-height" v-else>
           Comparison of <b>{{ values.indicator[0].short_name }}</b> and
            <b>{{ values.indicator[1].short_name }}</b>
            according to the
            <b> {{ values.datasource.datasource }} </b> across
            {{ values.compareBy.name }}s
          </p>
        </template> -->

        <template #title>
          <p class="work-sans mb-0 line-height">
            Comparison of <b>selected indicators</b> according to the
            <b> {{ values.datasource.datasource }} </b> acrossX {{ values.compareBy.name }} in
            <b> {{ values.location.name }} </b>
          </p>
        </template>
        <BarChart
          ref="BaseChart"
          :title="title"
          :categoryLabel="'Indicators'"
          :chartOptions="chartOptions"
        />
      </base-sub-card>
    </base-overlay>
    <!-- Display 'no_data' block when there's no data and we're not loading -->
    <!-- <div v-if="!loading && !checkData() && validateRequiredValues(values)" class="no_data">
      <img
        :src="require('@/assets/no-data/No_Available_Data.svg')"
        alt="no data"
        class="img-fluid"
        height="auto"
        width="240px"
      />
    </div>
    -->
    <div v-if="!loading && filteredIndicators.length > 0" class="no_ind_data">
      <!--list to present indicators without available data -->
      <ul>
        <!-- Loop through filtered indicators and display a list item for each -->
        <li v-for="(indicator, index) in filteredIndicators" :key="index">
          <!-- Display indicator's short name and a message indicating no available data -->
          <b>{{ indicator.short_name }},</b> does not have available data.
        </li>
      </ul>
    </div>
    <!-- Initial state message -->
    <div v-if="!loading && !validateRequiredValues(values)" class="no_data">
      <p class="text-muted">Please select all required values to view the comparison</p>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import moment from 'moment';
import ControlPanelSetup from '@/modules/msdat-dashboard/mixins/control-panel-setup';
import BarChart from '@/components/Barchart/BaseBarChart.vue';
import defaultOptions from '@/components/Barchart/defaultOption';
import chartDownload from '../../../mixins/chart_download';

export default {
  name: 'ICS',
  mixins: [chartDownload, ControlPanelSetup],
  components: {
    BarChart,
  },
  data() {
    return {
      title: '',
      color: ['#17606B', '#E85D58'],
      dataSeries: [],
      loading: false,
      chartOptions: {},
    };
  },

  props: {
    values: {
      type: [Object, String, Array],
      required: true,
    },
    controlIndex: {
      type: Number,
      required: true,
    },
  },

  // methods: {
  //   formatHighChartData(dataSeries) {
  //     this.chartOptions = {
  //       chart: {
  //         type: 'line',
  //       },
  //       series: [],
  //     };
  //     this.chartOptions.series.push(dataSeries);
  //   },
  // },
  computed: {
    ...mapGetters('MSDAT_STORE', ['getIDCDatasources']),

    filteredIndicators() {
      // Check if this.values.indicator is an array before using filter
      if (Array.isArray(this.values.indicator)) {
        return this.values.indicator.filter((indicator) => !this.hasDataForIndicator(indicator));
      }
      // Handle the case when this.values.indicator is not an array
      // console.error('Indicator is not an array:', this.values.indicator);
      return [];
    },
  },
  methods: {
    ...mapActions('MSDAT_STORE', ['SET_CONTROL_OPTIONS']),
    ...mapMutations('MSDAT_STORE', ['TOGGLE_VISIBILITY', 'SETUP_CONTROL_OPTIONS1']),
    hasDataForIndicator(indicator) {
      // Check if chartOptions and its series are defined
      if (this.chartOptions?.series) {
        // Exclude "Skilled birth attendance" from the check it is considered to have data
        if (indicator.short_name.toLowerCase() === 'skilled birth attendance') {
          return true;
        }
        // Find the series corresponding to the indicator
        const indicatorSeries = this.chartOptions.series.find((series) =>
          series.name.toLowerCase().includes(indicator.full_name.toLowerCase())
        );

        // Check if the indicatorSeries has data points
        return indicatorSeries?.data && indicatorSeries.data.length > 0;
      }
      // Return false if chartOptions or series are not defined
      return false;
    },
    checkData() {
      // Check if we have any series data
      if (!this.chartOptions?.series?.length) {
        return false;
      }

      // Check if any series has data
      return this.chartOptions.series.some((series) => series.data && series.data.length > 0);
    },
    displayFactorSign(factor) {
      const dpfactor = factor;
      let sign;
      switch (dpfactor) {
        case 'in percentage':
          sign = '%';
          break;
        case 'per 1000':
          sign = '/1000';
          break;
        default:
          sign = '';
      }
      return sign;
    },
    async plotForState(values) {
      const highChartOptions = {
        chart: {
          type: 'column',
        },
        series: [],
        yAxis: [],
        exporting: {
          filename: `datasource-${values.datasource.datasource}`,
        },
        plotOptions: {
          series: {
            grouping: true,
            pointWidth: 10,
            connectNulls: false,
            pointPlacement: 'between',
            // borderWidth: 0,
          },
        },
      };
      let indicators = '';
      if (!Array.isArray(values.indicator)) {
        indicators = [values.indicator];
      } else {
        indicators = values.indicator;
      }

      console.log(this.getIDCDatasources, 'getIDCDatasources');

      if (values.datasource.id === 0) {
        console.log(this.getIDCDatasources, 'getIDCDatasources');
        const datasources = [
          {
            id: 8,
            datasource: 'IHME',
            full_name: 'Institute for Health Metrics and Evaluation',
            description:
              'An independent population health research center at the University of Washington that provides rigorous and comparable measurement of the most important health indicators.',
            year_available: '1990 - 2019',
            period_available: '2020',
            methodology:
              'Using statistical estimation techniques, the estimates are derived from a variety of data sources, including vital registration statistics, surveys, disease registries, surveys, scientific literature etc. The data obtained from these sources are cleaned, then thoroughly reviewed with collaborators that are familiar with the contexts in which these data are collected. Estimates may differ from national statistics due to differences in data sources and methodology. Data sources include Demographic and Health Survey (DHS), Malaria Indicator Survey (MIS) 2010, Multiple Indicator Cluster Survey (MICS), Living Standards Survey (LSS), Core Wealth Indicator Questionnaire (CWIQ), General Household Survey (GHS), Standardized Monitoring and Assessment of Relief and Transition (SMART) survey, Netmark Survey reports.',
            subnational_data: 'Yes',
            classification: 'Estimate',
            groups: [],
            link: 'https://vizhub.healthdata.org/sdg/',
            created_at: '2022-10-20T08:13:15.760459Z',
            updated_at: '2022-10-20T08:13:15.760467Z',
            indicators: [
              2, 7, 9, 10, 13, 14, 15, 16, 17, 18, 20, 24, 26, 29, 30, 31, 32, 62, 70, 395,
            ],
          },
          {
            id: 15,
            datasource: 'KDGHS',
            full_name: 'Kaduna State General Household Survey',
            description:
              'The Kaduna State General Household survey was conducted by the Kaduna State Bureau of Statistics to fill the gap identified in the basic data requirement to measure the performance of the state towards achieving the Restoration Master Plan Framework (RMPF) and the SDGs.',
            year_available: '2015, 2020',
            period_available: 'Not Available',
            methodology:
              'The sample for the KDGHS was selected to provide estimates on a large number of indicators on the social and economic situation of households in the state, for urban and rural areas; and for each of the 23 local governments of the state. The LGAs were the main reporting domain. The sample selection was a two-stage sampling, where a simple random sampling (SRS) of enumeration areas (EAs) was carried out to cover each ward in the LGA which form the first stage or primary sampling units (PSUs), these were done to give everyone in the state an equal opportunity of been included in the survey. Household listing was conducted in each of the selected EAs to provide an adequate, up-to-date frame of households as the secondary sampling units (SSUs). SRS using random table of 15 households as the subsequently drawn with equal probability within each of the selected EAs. Thus, covering 3,825 households in the state, which amount to 15 households from each political ward.',
            subnational_data: 'Yes',
            classification: 'Survey',
            groups: [],
            link: 'https://ghs.kdbs.ng/home',
            created_at: '2022-10-20T08:13:15.771449Z',
            updated_at: '2022-10-20T08:13:15.771456Z',
            indicators: [2, 4, 5, 6, 7, 9, 12, 13, 18, 20, 25, 28, 30, 31, 32, 397, 398, 409, 410],
          },
          {
            id: 1,
            datasource: 'MICS',
            full_name: 'Multiple Indicator Cluster Survey',
            description:
              'The Multiple Indicator Cluster Survey is a nationwide household survey programme developed by the United Nations Children Fund (UNICEF) and designed to collect statistically sound and internationally comparable estimates of key indicators that are used to assess the situation of children and women in the areas of health, education, child protection and HIV/AIDS.',
            year_available: '1995, 1999, 2007, 2011, 2016, 2021',
            period_available: '2026',
            methodology:
              "A household survey carried out every 4-5 years and conducted among a nationally representative sample of women and men aged 15 – 49 years, and children aged less than 5 years. Topics covered include child health and mortality, nutrition, sanitation, reproductive health, education, child protection, and HIV/AIDS. The survey provides estimated disaggregation of Nigeria by states, geo political zones, sex, age, residence (urban and rural), mother's education and wealth quintiles. The sample for the Nigeria MICS 2016-17 was designed to provide estimates for a large number of indicators on the situation of children and women at the national, rural/urban, states as well as the 6 geopolitical zones of Nigeria. To sample, the states within each zone were identified as the main sampling Strata while the Enumeration Areas (EAs) within each state were identified as the Primary Sampling Units (PSUs). The EAs for the survey are selected from the National Integrated Survey of Households round 2 (NISH2) master sample, based on a list of EAs prepared for the 2006 Population Census. Two stage sampling is conducted with the first stage being the selection of EAs within the strata while the second stage was the selection of households within each EAs.",
            subnational_data: 'Yes',
            classification: 'Survey',
            groups: [],
            link: 'https://mics.unicef.org/surveys',
            created_at: '2022-10-20T08:13:15.745372Z',
            updated_at: '2024-11-05T22:59:21.747472Z',
            indicators: [9],
          },
          {
            id: 3,
            datasource: 'NARHS',
            full_name: 'National HIV & AIDS and Reproductive Health Survey',
            description:
              'National HIV and AIDS and Reproductive Health Survey is a nationally representative survey carried out to provide information on key HIV & AIDS and reproductive health issues.',
            year_available: '2003, 2007, 2012',
            period_available: 'Not Available',
            methodology:
              'A nationally representative survey carried out to provide information on key HIV & AIDS and reproductive health knowledge and behaviour related issues. The survey includes a biological marker component which is HIV testing. The study is conducted among females aged between 15 and 49 years and males aged 15 to 64 years. It excludes the homeless and persons living in institutional buildings such as hotels, panel homes, rehabilitation centres and school hostels among other similar dwelling places during the survey period. The sample was drawn from the updated master sample frame of rural and urban localities and Enumeration Areas developed and maintained by the National Population Commission. Multi-stage cluster sampling method was used to select eligible persons with known probability. Stage 1 involved the selection of rural and urban localities. Stage 2 involved the selection of Enumeration Areas (EA) within the selected rural and urban localities. Stage 3 involved the listing and selection of households while stage 4 involved selecting individual respondents for interview and testing.',
            subnational_data: 'For selected indicators',
            classification: 'Survey',
            groups: [],
            link: 'https://naca.gov.ng/wp-content/uploads/2016/11/NARHS-Plus-2012-Final-18112013.pdf',
            created_at: '2022-10-20T08:13:15.752919Z',
            updated_at: '2023-02-22T15:06:35.806295Z',
            indicators: [4, 5, 6, 7, 8, 22, 26, 27, 28, 29, 31, 32],
          },
          {
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
            groups: [],
            link: 'https://statcompiler.com/en/',
            created_at: '2022-10-20T08:13:15.751354Z',
            updated_at: '2022-10-20T08:13:15.751362Z',
            indicators: [
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
              25, 26, 27, 28, 29, 30, 31, 32, 33, 66, 67, 70, 212, 397, 398, 399, 400, 401, 402,
              403, 404, 405, 406, 407, 409, 410, 411, 529, 530, 531, 535, 538, 541, 542, 544, 545,
              549, 550, 551, 552, 553, 554, 555, 556, 557, 558, 559, 560, 577, 578, 579, 580, 589,
              590, 1636, 1637, 1638, 1639, 1640, 1641, 1642, 1643, 1644, 1645, 1646, 1648, 1649,
              1650, 1651, 1652, 1653, 1654, 1655, 1656, 1657, 1658, 1659, 1660, 1661, 1662, 1663,
              1664, 1665, 1666, 1667, 1668, 1669, 1670, 1671, 1672, 1673, 1674, 1675, 1676, 1677,
              1682, 1690, 2049, 2050, 2051, 2052, 2053, 2054, 2055, 2056, 2057, 2058, 2059, 2060,
              2061, 2062, 2063, 2064, 2065, 2559, 2560, 2561, 2562, 2563, 2564, 2565, 2566, 2567,
              2568, 2569,
            ],
          },
          {
            id: 6,
            datasource: 'NHMIS-DHIS2 (Facility-based)',
            full_name: 'National Health Management Information System (DHIS2)',
            description:
              'National Health Management Information System: Nigeria has adopted the DHIS2 as the National tool for the reporting of routine health-related data. This data is reported and aggregated monthly using this platform.',
            year_available: '2013 - 2024',
            period_available: '2023',
            methodology:
              "Facility level aggregate data that is reported by health facilities routinely on a monthly basis using DHIS2. Health facilities are expected to report by the month's data by the 15th of the next month. Due to incomplete reporting by the health facilities, poor reporting by private facilities, the data may be biased.",
            subnational_data: 'Yes',
            classification: 'Routine',
            groups: [],
            link: 'https://dhis2nigeria.org.ng',
            created_at: '2022-10-20T08:13:15.757413Z',
            updated_at: '2024-05-15T09:46:43.792173Z',
            indicators: [
              1, 2, 4, 5, 6, 7, 10, 13, 16, 17, 18, 19, 20, 21, 22, 23, 29, 30, 31, 32, 62, 212,
              397, 398, 409, 410, 412, 413, 414, 415, 416, 417, 418, 584, 585, 586, 587, 1685, 1686,
              1687, 1688,
            ],
          },
          {
            id: 30,
            datasource: 'NHMIS-DHIS2 (monthly)',
            full_name: 'National Health Management Information System (Monthly) - DHIS2',
            description:
              'National Health Management Information System: Nigeria has adopted the DHIS2 as the National tool for the reporting of routine health-related data. This data is reported and aggregated monthly using this platform.',
            year_available: 'Not Available',
            period_available: 'Not Available',
            methodology:
              "Facility level aggregate data that is reported by health facilities routinely on a monthly basis using DHIS2. Health facilities are expected to report by the month's data by the 15th of the next month. Due to incomplete reporting by the health facilities, poor reporting by private facilities, the data may be biased.",
            subnational_data: 'Not Available',
            classification: 'Routine',
            groups: [],
            link: 'https://dhis2nigeria.org.ng',
            created_at: '2022-10-20T08:13:15.793993Z',
            updated_at: '2022-10-20T08:13:15.794000Z',
            indicators: [
              1, 2, 4, 5, 6, 7, 10, 13, 16, 17, 18, 19, 20, 21, 22, 23, 29, 30, 31, 32, 212, 397,
              398, 409, 410, 584, 585, 586, 587, 1688,
            ],
          },
          {
            id: 5,
            datasource: 'NNHS',
            full_name: 'National Nutrition and Health Survey',
            description:
              'National Nutrition and Health Survey is a national survey conducted in all 36 states of Nigeria and Federal Capital Territory (FCT) to assess the nutritional and health status of women and children.',
            year_available: '2014, 2015, 2018',
            period_available: 'Not Available',
            methodology:
              'A nationally representative survey conducted using SMART methods and a two stage cluster sampling to provide results representative at the state level. The sample for the 2015 NNHS is nationally representative and covers the entire population residing in non-institutional dwelling units in the country. The survey uses the national sample frame, which is a list of Enumeration Areas (EAs) prepared for the 2006 Population Census.',
            subnational_data: 'Yes',
            classification: 'Survey',
            groups: [],
            link: 'https://www.unicef.org/nigeria/reports/national-nutrition-and-health-survey-nnhs-2018',
            created_at: '2022-10-20T08:13:15.755921Z',
            updated_at: '2022-10-20T08:13:15.755929Z',
            indicators: [
              4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 25, 28, 212, 406, 589, 590,
              1646, 2570, 2571, 2572, 2573, 2574, 2576, 2577, 2578,
            ],
          },
          {
            id: 9,
            datasource: 'WHO-GHO',
            full_name: 'World Health Organization - Global Health Observatory',
            description:
              'The Global Health Observatory (GHO) is a data portal developed by WHO containing health-related data and statistics to provide easy access to country data and statistics with a focus on comparable estimates.',
            year_available: '1984 - 2021',
            period_available: '2021',
            methodology:
              'Some of the data reported are national estimates. Others represent the best estimates of WHO using methodologies for specific indicators that aim for comparability across countries and time. They are updated as more recent or revised data become available, or when there are changes to the methodology being used.',
            subnational_data: 'No',
            classification: 'Estimate',
            groups: [],
            link: 'https://www.who.int/data/gho/data/indicators/indicator-details/GHO/measles-containing-vaccine-second-dose-(mcv2)-immunization-coverage-by-the-nationally-recommended-age-(-)',
            created_at: '2022-10-20T08:13:15.762148Z',
            updated_at: '2022-10-20T08:13:15.762155Z',
            indicators: [
              2, 4, 6, 7, 10, 12, 13, 14, 15, 16, 17, 18, 20, 26, 29, 30, 31, 32, 69, 96, 216, 217,
              218, 219, 220, 222, 397, 514, 549, 550, 551, 589, 590, 591, 887, 888, 889, 890, 891,
              892, 1785, 1786, 1787, 1788, 1789, 1790,
            ],
          },
          {
            id: 7,
            datasource: 'World Bank',
            full_name: 'World Bank',
            description:
              'Health Nutrition and Statistics data obtained from World Bank open data catalog. It contains key health, nutrition and population statistics gathered from a variety of sources.',
            year_available: '1960 - 2021',
            period_available: '2022',
            methodology:
              'The World Bank Group developed a data source portal and is updated quarterly. The data reported are estimates from the United Nations World Population Prospects,',
            subnational_data: 'No',
            classification: 'Estimate',
            groups: [],
            link: 'https://databank.worldbank.org/data/source/health-nutrition-and-population-statistics',
            created_at: '2022-10-20T08:13:15.758917Z',
            updated_at: '2022-10-20T08:13:15.758924Z',
            indicators: [
              2, 3, 4, 5, 6, 7, 8, 10, 13, 14, 15, 16, 17, 18, 20, 22, 23, 26, 29, 30, 31, 32, 62,
              63, 65, 67, 69, 70, 71, 72, 74, 75, 76, 77, 79, 80, 81, 90, 91, 216, 217, 218, 219,
              220, 222, 393, 394, 547, 548,
            ],
          },
          {
            id: 0,
            datasource: 'ALL',
            full_name: 'ALL',
            indicators: [],
          },
        ];
      } else {
        // const dataPromises = indicators?.map((item) =>
        //   this.dlQuery({
        //     indicator: item.id,
        //     datasource: values.datasource.id,
        //     period: values.year,
        //     location: {
        //       level: 3,
        //     },
        //   })
        // );

        // 1️⃣ Create all query promises for each indicator + datasource combo
        const datasources = [
          {
            id: 8,
            datasource: 'IHME',
            full_name: 'Institute for Health Metrics and Evaluation',
            description:
              'An independent population health research center at the University of Washington that provides rigorous and comparable measurement of the most important health indicators.',
            year_available: '1990 - 2019',
            period_available: '2020',
            methodology:
              'Using statistical estimation techniques, the estimates are derived from a variety of data sources, including vital registration statistics, surveys, disease registries, surveys, scientific literature etc. The data obtained from these sources are cleaned, then thoroughly reviewed with collaborators that are familiar with the contexts in which these data are collected. Estimates may differ from national statistics due to differences in data sources and methodology. Data sources include Demographic and Health Survey (DHS), Malaria Indicator Survey (MIS) 2010, Multiple Indicator Cluster Survey (MICS), Living Standards Survey (LSS), Core Wealth Indicator Questionnaire (CWIQ), General Household Survey (GHS), Standardized Monitoring and Assessment of Relief and Transition (SMART) survey, Netmark Survey reports.',
            subnational_data: 'Yes',
            classification: 'Estimate',
            groups: [],
            link: 'https://vizhub.healthdata.org/sdg/',
            created_at: '2022-10-20T08:13:15.760459Z',
            updated_at: '2022-10-20T08:13:15.760467Z',
            indicators: [
              2, 7, 9, 10, 13, 14, 15, 16, 17, 18, 20, 24, 26, 29, 30, 31, 32, 62, 70, 395,
            ],
          },
          {
            id: 15,
            datasource: 'KDGHS',
            full_name: 'Kaduna State General Household Survey',
            description:
              'The Kaduna State General Household survey was conducted by the Kaduna State Bureau of Statistics to fill the gap identified in the basic data requirement to measure the performance of the state towards achieving the Restoration Master Plan Framework (RMPF) and the SDGs.',
            year_available: '2015, 2020',
            period_available: 'Not Available',
            methodology:
              'The sample for the KDGHS was selected to provide estimates on a large number of indicators on the social and economic situation of households in the state, for urban and rural areas; and for each of the 23 local governments of the state. The LGAs were the main reporting domain. The sample selection was a two-stage sampling, where a simple random sampling (SRS) of enumeration areas (EAs) was carried out to cover each ward in the LGA which form the first stage or primary sampling units (PSUs), these were done to give everyone in the state an equal opportunity of been included in the survey. Household listing was conducted in each of the selected EAs to provide an adequate, up-to-date frame of households as the secondary sampling units (SSUs). SRS using random table of 15 households as the subsequently drawn with equal probability within each of the selected EAs. Thus, covering 3,825 households in the state, which amount to 15 households from each political ward.',
            subnational_data: 'Yes',
            classification: 'Survey',
            groups: [],
            link: 'https://ghs.kdbs.ng/home',
            created_at: '2022-10-20T08:13:15.771449Z',
            updated_at: '2022-10-20T08:13:15.771456Z',
            indicators: [2, 4, 5, 6, 7, 9, 12, 13, 18, 20, 25, 28, 30, 31, 32, 397, 398, 409, 410],
          },
          {
            id: 1,
            datasource: 'MICS',
            full_name: 'Multiple Indicator Cluster Survey',
            description:
              'The Multiple Indicator Cluster Survey is a nationwide household survey programme developed by the United Nations Children Fund (UNICEF) and designed to collect statistically sound and internationally comparable estimates of key indicators that are used to assess the situation of children and women in the areas of health, education, child protection and HIV/AIDS.',
            year_available: '1995, 1999, 2007, 2011, 2016, 2021',
            period_available: '2026',
            methodology:
              "A household survey carried out every 4-5 years and conducted among a nationally representative sample of women and men aged 15 – 49 years, and children aged less than 5 years. Topics covered include child health and mortality, nutrition, sanitation, reproductive health, education, child protection, and HIV/AIDS. The survey provides estimated disaggregation of Nigeria by states, geo political zones, sex, age, residence (urban and rural), mother's education and wealth quintiles. The sample for the Nigeria MICS 2016-17 was designed to provide estimates for a large number of indicators on the situation of children and women at the national, rural/urban, states as well as the 6 geopolitical zones of Nigeria. To sample, the states within each zone were identified as the main sampling Strata while the Enumeration Areas (EAs) within each state were identified as the Primary Sampling Units (PSUs). The EAs for the survey are selected from the National Integrated Survey of Households round 2 (NISH2) master sample, based on a list of EAs prepared for the 2006 Population Census. Two stage sampling is conducted with the first stage being the selection of EAs within the strata while the second stage was the selection of households within each EAs.",
            subnational_data: 'Yes',
            classification: 'Survey',
            groups: [],
            link: 'https://mics.unicef.org/surveys',
            created_at: '2022-10-20T08:13:15.745372Z',
            updated_at: '2024-11-05T22:59:21.747472Z',
            indicators: [9],
          },
          {
            id: 3,
            datasource: 'NARHS',
            full_name: 'National HIV & AIDS and Reproductive Health Survey',
            description:
              'National HIV and AIDS and Reproductive Health Survey is a nationally representative survey carried out to provide information on key HIV & AIDS and reproductive health issues.',
            year_available: '2003, 2007, 2012',
            period_available: 'Not Available',
            methodology:
              'A nationally representative survey carried out to provide information on key HIV & AIDS and reproductive health knowledge and behaviour related issues. The survey includes a biological marker component which is HIV testing. The study is conducted among females aged between 15 and 49 years and males aged 15 to 64 years. It excludes the homeless and persons living in institutional buildings such as hotels, panel homes, rehabilitation centres and school hostels among other similar dwelling places during the survey period. The sample was drawn from the updated master sample frame of rural and urban localities and Enumeration Areas developed and maintained by the National Population Commission. Multi-stage cluster sampling method was used to select eligible persons with known probability. Stage 1 involved the selection of rural and urban localities. Stage 2 involved the selection of Enumeration Areas (EA) within the selected rural and urban localities. Stage 3 involved the listing and selection of households while stage 4 involved selecting individual respondents for interview and testing.',
            subnational_data: 'For selected indicators',
            classification: 'Survey',
            groups: [],
            link: 'https://naca.gov.ng/wp-content/uploads/2016/11/NARHS-Plus-2012-Final-18112013.pdf',
            created_at: '2022-10-20T08:13:15.752919Z',
            updated_at: '2023-02-22T15:06:35.806295Z',
            indicators: [4, 5, 6, 7, 8, 22, 26, 27, 28, 29, 31, 32],
          },
          {
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
            groups: [],
            link: 'https://statcompiler.com/en/',
            created_at: '2022-10-20T08:13:15.751354Z',
            updated_at: '2022-10-20T08:13:15.751362Z',
            indicators: [
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
              25, 26, 27, 28, 29, 30, 31, 32, 33, 66, 67, 70, 212, 397, 398, 399, 400, 401, 402,
              403, 404, 405, 406, 407, 409, 410, 411, 529, 530, 531, 535, 538, 541, 542, 544, 545,
              549, 550, 551, 552, 553, 554, 555, 556, 557, 558, 559, 560, 577, 578, 579, 580, 589,
              590, 1636, 1637, 1638, 1639, 1640, 1641, 1642, 1643, 1644, 1645, 1646, 1648, 1649,
              1650, 1651, 1652, 1653, 1654, 1655, 1656, 1657, 1658, 1659, 1660, 1661, 1662, 1663,
              1664, 1665, 1666, 1667, 1668, 1669, 1670, 1671, 1672, 1673, 1674, 1675, 1676, 1677,
              1682, 1690, 2049, 2050, 2051, 2052, 2053, 2054, 2055, 2056, 2057, 2058, 2059, 2060,
              2061, 2062, 2063, 2064, 2065, 2559, 2560, 2561, 2562, 2563, 2564, 2565, 2566, 2567,
              2568, 2569,
            ],
          },
          {
            id: 6,
            datasource: 'NHMIS-DHIS2 (Facility-based)',
            full_name: 'National Health Management Information System (DHIS2)',
            description:
              'National Health Management Information System: Nigeria has adopted the DHIS2 as the National tool for the reporting of routine health-related data. This data is reported and aggregated monthly using this platform.',
            year_available: '2013 - 2024',
            period_available: '2023',
            methodology:
              "Facility level aggregate data that is reported by health facilities routinely on a monthly basis using DHIS2. Health facilities are expected to report by the month's data by the 15th of the next month. Due to incomplete reporting by the health facilities, poor reporting by private facilities, the data may be biased.",
            subnational_data: 'Yes',
            classification: 'Routine',
            groups: [],
            link: 'https://dhis2nigeria.org.ng',
            created_at: '2022-10-20T08:13:15.757413Z',
            updated_at: '2024-05-15T09:46:43.792173Z',
            indicators: [
              1, 2, 4, 5, 6, 7, 10, 13, 16, 17, 18, 19, 20, 21, 22, 23, 29, 30, 31, 32, 62, 212,
              397, 398, 409, 410, 412, 413, 414, 415, 416, 417, 418, 584, 585, 586, 587, 1685, 1686,
              1687, 1688,
            ],
          },
          {
            id: 30,
            datasource: 'NHMIS-DHIS2 (monthly)',
            full_name: 'National Health Management Information System (Monthly) - DHIS2',
            description:
              'National Health Management Information System: Nigeria has adopted the DHIS2 as the National tool for the reporting of routine health-related data. This data is reported and aggregated monthly using this platform.',
            year_available: 'Not Available',
            period_available: 'Not Available',
            methodology:
              "Facility level aggregate data that is reported by health facilities routinely on a monthly basis using DHIS2. Health facilities are expected to report by the month's data by the 15th of the next month. Due to incomplete reporting by the health facilities, poor reporting by private facilities, the data may be biased.",
            subnational_data: 'Not Available',
            classification: 'Routine',
            groups: [],
            link: 'https://dhis2nigeria.org.ng',
            created_at: '2022-10-20T08:13:15.793993Z',
            updated_at: '2022-10-20T08:13:15.794000Z',
            indicators: [
              1, 2, 4, 5, 6, 7, 10, 13, 16, 17, 18, 19, 20, 21, 22, 23, 29, 30, 31, 32, 212, 397,
              398, 409, 410, 584, 585, 586, 587, 1688,
            ],
          },
          {
            id: 5,
            datasource: 'NNHS',
            full_name: 'National Nutrition and Health Survey',
            description:
              'National Nutrition and Health Survey is a national survey conducted in all 36 states of Nigeria and Federal Capital Territory (FCT) to assess the nutritional and health status of women and children.',
            year_available: '2014, 2015, 2018',
            period_available: 'Not Available',
            methodology:
              'A nationally representative survey conducted using SMART methods and a two stage cluster sampling to provide results representative at the state level. The sample for the 2015 NNHS is nationally representative and covers the entire population residing in non-institutional dwelling units in the country. The survey uses the national sample frame, which is a list of Enumeration Areas (EAs) prepared for the 2006 Population Census.',
            subnational_data: 'Yes',
            classification: 'Survey',
            groups: [],
            link: 'https://www.unicef.org/nigeria/reports/national-nutrition-and-health-survey-nnhs-2018',
            created_at: '2022-10-20T08:13:15.755921Z',
            updated_at: '2022-10-20T08:13:15.755929Z',
            indicators: [
              4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 25, 28, 212, 406, 589, 590,
              1646, 2570, 2571, 2572, 2573, 2574, 2576, 2577, 2578,
            ],
          },
          {
            id: 9,
            datasource: 'WHO-GHO',
            full_name: 'World Health Organization - Global Health Observatory',
            description:
              'The Global Health Observatory (GHO) is a data portal developed by WHO containing health-related data and statistics to provide easy access to country data and statistics with a focus on comparable estimates.',
            year_available: '1984 - 2021',
            period_available: '2021',
            methodology:
              'Some of the data reported are national estimates. Others represent the best estimates of WHO using methodologies for specific indicators that aim for comparability across countries and time. They are updated as more recent or revised data become available, or when there are changes to the methodology being used.',
            subnational_data: 'No',
            classification: 'Estimate',
            groups: [],
            link: 'https://www.who.int/data/gho/data/indicators/indicator-details/GHO/measles-containing-vaccine-second-dose-(mcv2)-immunization-coverage-by-the-nationally-recommended-age-(-)',
            created_at: '2022-10-20T08:13:15.762148Z',
            updated_at: '2022-10-20T08:13:15.762155Z',
            indicators: [
              2, 4, 6, 7, 10, 12, 13, 14, 15, 16, 17, 18, 20, 26, 29, 30, 31, 32, 69, 96, 216, 217,
              218, 219, 220, 222, 397, 514, 549, 550, 551, 589, 590, 591, 887, 888, 889, 890, 891,
              892, 1785, 1786, 1787, 1788, 1789, 1790,
            ],
          },
          {
            id: 7,
            datasource: 'World Bank',
            full_name: 'World Bank',
            description:
              'Health Nutrition and Statistics data obtained from World Bank open data catalog. It contains key health, nutrition and population statistics gathered from a variety of sources.',
            year_available: '1960 - 2021',
            period_available: '2022',
            methodology:
              'The World Bank Group developed a data source portal and is updated quarterly. The data reported are estimates from the United Nations World Population Prospects,',
            subnational_data: 'No',
            classification: 'Estimate',
            groups: [],
            link: 'https://databank.worldbank.org/data/source/health-nutrition-and-population-statistics',
            created_at: '2022-10-20T08:13:15.758917Z',
            updated_at: '2022-10-20T08:13:15.758924Z',
            indicators: [
              2, 3, 4, 5, 6, 7, 8, 10, 13, 14, 15, 16, 17, 18, 20, 22, 23, 26, 29, 30, 31, 32, 62,
              63, 65, 67, 69, 70, 71, 72, 74, 75, 76, 77, 79, 80, 81, 90, 91, 216, 217, 218, 219,
              220, 222, 393, 394, 547, 548,
            ],
          },
        ];
        const dataPromises = indicators?.flatMap((indicator) =>
          datasources?.map((datasource) =>
            this.dlQuery({
              indicator: indicator.id,
              datasource: datasource.id,
              period: values.year,
              location: { level: 3 },
            })
          )
        );

        function getDatasourceById(data) {
          // Early return if data or data.datasource is undefined/null
          if (!data?.datasource) {
            console.warn('Invalid data passed to getDatasourceById:', data);
            return null;
          }

          console.log(data.datasource);

          const result = datasources.find((source) => source.id === data.datasource);

          console.log(result);

          if (!result) {
            console.warn(`No datasource found for id: ${data.datasource}`);
          }

          return result || null;
        }

        function getIndicatorById(data) {
          if (!data?.indicator) {
            console.warn('Invalid data passed to getDatasourceById:', data);
            return null;
          }

          console.log(indicators, 'INDI');
          

          console.log(data);

          const result = indicators.find((source) => source.id === data.indicator);

          console.log(result);

          if (!result) {
            console.warn(`No indicator found for id: ${data.indicator}`);
          }

          return result || null;
        }

        const allResults = await Promise.all(dataPromises);
        // console.log(results0, '@@<>@@');
        // const results = results0.flat();

        const results = allResults.filter((item) => Array.isArray(item) && item.length > 0);

        console.log(results, '@@<>@@');

        /**
         * Map the display factors for the different indicators
         */
        if (indicators.length) {
          const yTitles = [];
          // for (let i = 0; i < results.length; i += 1) {
          //   const indicator = indicators[i];
          //   console.log(indicator, '@@<>@@ 2');
          //   const displayFactor = this.dlGetFactor(indicator?.factor_id) || { display_factor: '' };
          //   yTitles.push(displayFactor.display_factor);
          // }
          // for (let i = 0; i < results.length; i += 1) {
          //   // Determine which indicator this result belongs to
          //   const indicatorIndex = Math.floor(i / datasources.length);
          //   const indicator = indicators[indicatorIndex];

          //   console.log(indicator, '@@<>@@ 2');

          //   const displayFactor = this.dlGetFactor(indicator?.factor_id) || { display_factor: '' };
          //   yTitles.push(displayFactor.display_factor);
          // }

          for (let i = 0; i < results.length; i += 1) {
            // formate result to HighChart Format
            const indicator = indicators[i];
            const data = results[i];
            const toHighChartFormat = data?.map((item) => [
              this.dlGetLocation(item.location).name,
              parseFloat(item.value),
            ]);
            const displayFactor = this.dlGetFactor(indicator?.factor_id) || { display_factor: '' };
            const yAxis = {
              yAxis: [
                {
                  plotLines: [],
                  labels: {
                    style: {
                      fontFamily: 'Work Sans, sans-serif',
                      fontSize: '11px',
                    },
                  },
                  title: {
                    style: {
                      ...defaultOptions.yAxis.title.style,
                      fontSize: '10px',
                    },
                  },
                },
              ],
              title: {
                ...defaultOptions.yAxis.title,
                // text: displayFactor.display_factor,
                text: [...new Set(yTitles)].join(' | '),
              },
              opposite: !!i, // this will become either true of false as 0 or 1
            };

            console.log(data, '@@(X)@@');

            const obj = {
              // color: this.color[i],
              dataLabels: {
                enabled: true,
                format: `{y}${this.displayFactorSign(displayFactor.display_factor)}`,
                style: {
                  ...defaultOptions.yAxis.title.style,
                  fontSize: '10px',
                },
              },

              // name: indicator.full_name,
              name: `${getIndicatorById(data[0])?.full_name} ${
                displayFactor.display_factor.trim() ? `(${displayFactor.display_factor})` : ''
              }`,
              data: toHighChartFormat,
            };
            if (i === 0) highChartOptions.yAxis.push(yAxis);
            highChartOptions.series.push(obj);
          }
          return highChartOptions;
        }
      }
    },

    async plotForNational(values) {
      const highChartOptions = {
        chart: {
          type: 'column',
        },
        series: [],
        yAxis: [],
        exporting: {
          filename: `datasource-${values.datasource.datasource}`,
        },
        plotOptions: {
          series: {
            grouping: true,
            pointWidth: 10,
            connectNulls: false,
            pointPlacement: 'between',
            // borderWidth: 0,
          },
        },
      };
      let indicators = '';
      if (!Array.isArray(values.indicator)) {
        indicators = [values.indicator];
      } else {
        indicators = values.indicator;
      }
      const dataPromises = indicators?.map((item) =>
        this.dlQuery({
          indicator: item.id,
          datasource: values.datasource.id,
          period: values.year,
          location: {
            level: 1,
          },
        })
      );

      const results = await Promise.all(dataPromises);

      console.log(results, '@@<>@@');

      /**
       * Map the display factors for the different indicators
       */
      const yTitles = [];
      for (let i = 0; i < results.length; i += 1) {
        const indicator = indicators[i];
        const displayFactor = this.dlGetFactor(indicator.factor) || { display_factor: '' };
        yTitles.push(displayFactor.display_factor);
      }

      for (let i = 0; i < results.length; i += 1) {
        // formate result to HighChart Format
        const indicator = indicators[i];
        const data = results[i];
        const toHighChartFormat = data?.map((item) => [
          this.dlGetLocation(item.location).name,
          parseFloat(item.value),
        ]);
        const displayFactor = this.dlGetFactor(indicator.factor) || { display_factor: '' };
        const yAxis = {
          yAxis: [
            {
              plotLines: [],
              labels: {
                style: {
                  fontFamily: 'Work Sans, sans-serif',
                  fontSize: '11px',
                },
              },
              title: {
                style: {
                  ...defaultOptions.yAxis.title.style,
                  fontSize: '10px',
                },
              },
            },
          ],
          title: {
            ...defaultOptions.yAxis.title,
            // text: displayFactor.display_factor,
            text: [...new Set(yTitles)].join(' | '),
          },
          opposite: !!i, // this will become either true of false as 0 or 1
        };

        const obj = {
          // color: this.color[i],
          dataLabels: {
            enabled: true,
            format: `{y}${this.displayFactorSign(displayFactor.display_factor)}`,
            style: {
              ...defaultOptions.yAxis.title.style,
              fontSize: '10px',
            },
          },
          // name: indicator.full_name,
          name: `${indicator.full_name} ${
            displayFactor.display_factor.trim() ? `(${displayFactor.display_factor})` : ''
          }`,
          data: toHighChartFormat,
        };
        if (i === 0) highChartOptions.yAxis.push(yAxis);
        highChartOptions.series.push(obj);
      }
      return highChartOptions;
    },

    async plotForZonal(values) {
      const highChartOptions = {
        chart: {
          type: 'column',
        },
        series: [],
        yAxis: [],
        exporting: {
          filename: `datasource-${values.datasource.datasource}`,
        },
        plotOptions: {
          series: {
            grouping: true,
            pointWidth: 10,
            connectNulls: false,
            pointPlacement: 'between',
            // borderWidth: 0,
          },
        },
      };
      let indicators = '';
      if (!Array.isArray(values.indicator)) {
        indicators = [values.indicator];
      } else {
        indicators = values.indicator;
      }
      const dataPromises = indicators?.map((item) =>
        this.dlQuery({
          indicator: item.id,
          datasource: values.datasource.id,
          period: values.year,
          location: {
            level: 2,
          },
        })
      );

      const results = await Promise.all(dataPromises);

      console.log(results, '@@<>@@');

      /**
       * Map the display factors for the different indicators
       */
      const yTitles = [];
      for (let i = 0; i < results.length; i += 1) {
        const indicator = indicators[i];
        const displayFactor = this.dlGetFactor(indicator.factor) || { display_factor: '' };
        yTitles.push(displayFactor.display_factor);
      }

      for (let i = 0; i < results.length; i += 1) {
        // formate result to HighChart Format
        const indicator = indicators[i];
        const data = results[i];
        const toHighChartFormat = data?.map((item) => [
          this.dlGetLocation(item.location).name,
          parseFloat(item.value),
        ]);
        const displayFactor = this.dlGetFactor(indicator.factor) || { display_factor: '' };
        const yAxis = {
          yAxis: [
            {
              plotLines: [],
              labels: {
                style: {
                  fontFamily: 'Work Sans, sans-serif',
                  fontSize: '11px',
                },
              },
              title: {
                style: {
                  ...defaultOptions.yAxis.title.style,
                  fontSize: '10px',
                },
              },
            },
          ],
          title: {
            ...defaultOptions.yAxis.title,
            // text: displayFactor.display_factor,
            text: [...new Set(yTitles)].join(' | '),
          },
          opposite: !!i, // this will become either true of false as 0 or 1
        };

        const obj = {
          // color: this.color[i],
          dataLabels: {
            enabled: true,
            format: `{y}${this.displayFactorSign(displayFactor.display_factor)}`,
            style: {
              ...defaultOptions.yAxis.title.style,
              fontSize: '10px',
            },
          },
          // name: indicator.full_name,
          name: `${indicator.full_name} ${
            displayFactor.display_factor.trim() ? `(${displayFactor.display_factor})` : ''
          }`,
          data: toHighChartFormat,
        };
        if (i === 0) highChartOptions.yAxis.push(yAxis);
        highChartOptions.series.push(obj);
      }
      return highChartOptions;
    },
    /**
     * This method loops through the list of indicators
     * and creates the SDG target line object if the
     * target exists and finally adds it to the chart
     */
    toggleSDGTargetLine(val) {
      let indicators = null;
      const plotLines = [];
      const options = { ...this.chartOptions };
      if (val) {
        if (!Array.isArray(this.values.indicator)) {
          indicators = [this.values.indicator];
        } else {
          indicators = this.values.indicator;
        }
        for (let n = 0; n < indicators.length; n++) {
          if (indicators[n].sdg_target) {
            plotLines.push({
              width: 0.5,
              id: 'sdgTarget',
              color: '#222222',
              value: indicators[n].sdg_target,
              dashStyle: 'longdashdot',
              label: {
                text: 'SDG',
                verticalAlign: 'top',
                rotation: 0,
                textAlign: 'right',
                y: 0,
                x: 0,
                style: {
                  fontSize: '10px',
                  fontFamily: '"Open Sans", sans-serif',
                },
              },
            });
            // Checks if the plotLines object exists
            if (options.yAxis[0]?.plotLines) {
              options.yAxis[0].plotLines.push(...plotLines);
            } else {
              options.yAxis[0].plotLines = [];
              options.yAxis[0].plotLines.push(...plotLines);
            }
            this.chartOptions = { ...options };
          }
        }
      } else {
        // Checks if the plotLines object exists
        if (options.yAxis[0]?.plotLines) {
          const temp = options.yAxis[0].plotLines.filter((line) => line.id !== 'sdgTarget');
          options.yAxis[0].plotLines = temp;
        } else {
          options.yAxis[0].plotLines = [];
          const temp = options.yAxis[0].plotLines.filter((line) => line.id !== 'sdgTarget');
          options.yAxis[0].plotLines = temp;
        }
        this.chartOptions = { ...options };
      }
    },
    /**
     * This method loops through the list of indicators
     * and creates the national target line object if the
     * target exists and finally adds it to the chart
     */
    toggleNationalTargetLine(val) {
      let indicators = null;
      const plotLines = [];
      const options = { ...this.chartOptions };
      if (val) {
        if (!Array.isArray(this.values.indicator)) {
          indicators = [this.values.indicator];
        } else {
          indicators = this.values.indicator;
        }
        for (let n = 0; n < indicators.length; n++) {
          if (indicators[n].national_target) {
            plotLines.push({
              width: 0.5,
              color: '#222222',
              id: 'ntLine',
              value: indicators[n].national_target,
              label: {
                text: 'NT',
                verticalAlign: 'top',
                rotation: 0,
                textAlign: 'left',
                y: 0,
                x: -13,
                style: {
                  fontSize: '10px',
                  fontFamily: '"Open Sans", sans-serif',
                },
              },
            });
            // Checks if the plotLines object exists
            if (options.yAxis[0]?.plotLines) {
              options.yAxis[0].plotLines.push(...plotLines);
            } else {
              options.yAxis[0].plotLines = [];
              options.yAxis[0].plotLines.push(...plotLines);
            }
            this.chartOptions = { ...options };
          }
        }
      } else {
        // Checks if the plotLines object exists
        if (options.yAxis[0]?.plotLines) {
          const temp = options.yAxis[0].plotLines.filter((line) => line.id !== 'ntLine');
          options.yAxis[0].plotLines = temp;
        } else {
          options.yAxis[0].plotLines = [];
          const temp = options.yAxis[0].plotLines.filter((line) => line.id !== 'ntLine');
          options.yAxis[0].plotLines = temp;
        }

        this.chartOptions = { ...options };
      }
    },
    async plotForPeriods(values) {
      const highChartOptions = {
        chart: {
          type: 'line',
        },
        yAxis: [],
        series: [],
        exporting: {
          filename: `datasource-${values.datasource.datasource}`,
        },
      };
      let indicators = '';
      if (!Array.isArray(values.indicator)) {
        indicators = [values.indicator];
      } else {
        indicators = values.indicator;
      }

      const dataPromises = indicators?.map((item) =>
        this.dlQuery({
          indicator: item.id,
          datasource: values.datasource.id,
          location: values.location.id,
        })
      );

      const results = await Promise.all(dataPromises);
      // debugger;
      /**
       * Map the display factors for the different indicators
       */
      const yTitles = [];
      for (let i = 0; i < results.length; i += 1) {
        const indicator = indicators[i];
        const displayFactor = this.dlGetFactor(indicator.factor) || { display_factor: '' };
        yTitles.push(displayFactor.display_factor);
      }

      if (values.datasource.id === 30) {
        for (let i = 0; i < results.length; i += 1) {
          const result = results[i];
          const indicator = indicators[i];
          // const filterOnlyYearlyValues = result.filter((item) => moment(item.period, 'YYYY', true).isValid());
          const formatToHighChartFormat = result?.map((item) => [
            item.period,
            Number.parseFloat(item.value),
          ]);
          // const sortTheYear = formatToHighChartFormat.sort((a, b) => a[0] - b[0]);

          const displayFactor = this.dlGetFactor(indicator.factor) || { display_factor: '' };
          if (i === 0) {
            highChartOptions.yAxis.push({
              yAxis: [
                {
                  plotLines: [],
                  labels: {
                    style: {
                      fontFamily: 'Work Sans, sans-serif',
                      fontSize: '11px',
                    },
                  },
                  title: {
                    style: {
                      ...defaultOptions.yAxis.title.style,
                      fontSize: '10px',
                    },
                  },
                },
              ],
              title: {
                ...defaultOptions.yAxis.title,
                // text: displayFactor.display_factor,
                text: [...new Set(yTitles)].join(' | '),
              },
              opposite: !!i, // this will become either true of false as 0 or 1
            });
          }
          const obj = {
            color: this.color[i],
            lineWidth: 3,
            // name: indicator.full_name,
            name: `${indicator.full_name} ${
              displayFactor.display_factor.trim() ? `(${displayFactor.display_factor})` : ''
            }`,
            data: formatToHighChartFormat,
          };
          highChartOptions.series.push(obj);
        }

        // this functions checks to make years apear from smallest to highest when the first selected indicator
        // year have higher values than that of the second selected indicator
        if (
          highChartOptions.series.length > 1 &&
          highChartOptions.series[0].data[0] > highChartOptions.series[1].data[0]
        ) {
          const temporary = highChartOptions.series[1];
          highChartOptions.series[1] = highChartOptions.series[0];
          highChartOptions.series[0] = temporary;
        }
        return highChartOptions;
      }

      for (let i = 0; i < results.length; i += 1) {
        const result = results[i];
        const indicator = indicators[i];
        const filterOnlyYearlyValues = result.filter((item) =>
          moment(item.period, 'YYYY', true).isValid()
        );
        const formatToHighChartFormat = filterOnlyYearlyValues?.map((item) => [
          item.period,
          Number.parseFloat(item.value),
        ]);
        const sortTheYear = formatToHighChartFormat.sort((a, b) => a[0] - b[0]);

        const displayFactor = this.dlGetFactor(indicator.factor) || { display_factor: '' };
        if (i === 0) {
          highChartOptions.yAxis.push({
            yAxis: [
              {
                plotLines: [],
                labels: {
                  style: {
                    fontFamily: 'Work Sans, sans-serif',
                    fontSize: '11px',
                  },
                },
                title: {
                  style: {
                    ...defaultOptions.yAxis.title.style,
                    fontSize: '10px',
                  },
                },
              },
            ],
            title: {
              ...defaultOptions.yAxis.title,
              // text: displayFactor.display_factor,
              text: [...new Set(yTitles)].join(' | '),
            },
            opposite: !!i, // this will become either true of false as 0 or 1
          });
        }
        const obj = {
          color: this.color[i],
          lineWidth: 3,
          // name: indicator.full_name,
          name: `${indicator.full_name} ${
            displayFactor.display_factor.trim() ? `(${displayFactor.display_factor})` : ''
          }`,
          data: sortTheYear,
        };
        highChartOptions.series.push(obj);
      }

      //  console.log(highChartOptions, 'formatToHighChartFormat 4');
      // this functions checks to make years apear from smallest to highest when the first selected indicator
      // year have higher values than that of the second selected indicator
      if (
        highChartOptions.series.length > 1 &&
        highChartOptions.series[0].data[0] > highChartOptions.series[1].data[0]
      ) {
        const temporary = highChartOptions.series[1];
        highChartOptions.series[1] = highChartOptions.series[0];
        highChartOptions.series[0] = temporary;
      }
      return highChartOptions;
    },

    async renderChart(panelValues) {
      const { sdg, national } = this.values.target;
      this.chartOptions = {};
      if (panelValues.compareBy.name === 'Period') {
        const highChartOptions = await this.plotForPeriods(panelValues);
        this.chartOptions = { ...highChartOptions };
        /**
         * the purpose of the if check is to make sure we
         * don't try to add plotlines before the chart is
         * rendered
         */
        if (Object.keys(this.chartOptions).length !== 0) {
          this.toggleSDGTargetLine(sdg);
          this.toggleNationalTargetLine(national);
        }
      }

      if (panelValues.compareBy.name === 'State') {
        const highChartOptions = await this.plotForState(panelValues);
        this.chartOptions = { ...highChartOptions };
        if (Object.keys(this.chartOptions).length !== 0) {
          this.toggleSDGTargetLine(sdg);
          this.toggleNationalTargetLine(national);
        }
      }

      if (panelValues.compareBy.name === 'National') {
        const highChartOptions = await this.plotForNational(panelValues);
        this.chartOptions = { ...highChartOptions };
        if (Object.keys(this.chartOptions).length !== 0) {
          this.toggleSDGTargetLine(sdg);
          this.toggleNationalTargetLine(national);
        }
      }
      if (panelValues.compareBy.name === 'Zonal') {
        const highChartOptions = await this.plotForZonal(panelValues);
        this.chartOptions = { ...highChartOptions };
        if (Object.keys(this.chartOptions).length !== 0) {
          this.toggleSDGTargetLine(sdg);
          this.toggleNationalTargetLine(national);
        }
      }
    },
    validateRequiredValues(values) {
      if (!values) return false;

      // Basic validation of values object
      if (!values.datasource?.id || !values.indicator) return false;

      // For Period comparison
      if (values.compareBy?.name === 'Period' && !values.location?.id) return false;

      // For State comparison
      if (values.compareBy?.name === 'State' && !values.year) return false;

      // If indicator is an array, validate each item
      if (Array.isArray(values.indicator)) {
        return values.indicator.every((ind) => ind && ind.id);
      }

      // If single indicator
      return !!values.indicator.id;
    },
    async safeRenderChart(values) {
      if (!this.validateRequiredValues(values)) {
        console.log('Missing required values for chart rendering');
        return;
      }

      this.loading = true;
      try {
        await this.renderChart(values);
      } catch (error) {
        console.error('Error rendering chart:', error);
      } finally {
        this.loading = false;
      }
    },
  },
  watch: {
    values: {
      immediate: true, // This ensures the watcher runs on component creation
      handler(newValues) {
        if (this.validateRequiredValues(newValues)) {
          this.safeRenderChart(newValues);
        }
      },
      deep: true,
    },

    'values.compareBy': {
      async handler(data) {
        if (data.name === 'Period') {
          this.TOGGLE_VISIBILITY({
            panelIndex: this.controlIndex,
            key: 'year',
            value: false,
          });
          this.TOGGLE_VISIBILITY({
            panelIndex: this.controlIndex,
            key: 'location',
            value: true,
          });
        } else if (data.name === 'State') {
          this.TOGGLE_VISIBILITY({
            panelIndex: this.controlIndex,
            key: 'year',
            value: true,
          });
          this.TOGGLE_VISIBILITY({
            panelIndex: this.controlIndex,
            key: 'location',
            value: false,
          });

          // get the list of years by datasource
          const setYearDropdown = await this.setYearDropdown();
          // period dropdown;
          this.SET_CONTROL_OPTIONS({
            panelIndex: 2,
            controlIndex: 2,
            values: setYearDropdown,
          });
          this.loading = true;
          await this.renderChart(this.values);
          this.loading = false;
        } else if (data.name === 'National') {
          this.TOGGLE_VISIBILITY({
            panelIndex: this.controlIndex,
            key: 'year',
            value: true,
          });
          this.TOGGLE_VISIBILITY({
            panelIndex: this.controlIndex,
            key: 'location',
            value: false,
          });

          // get the list of years by datasource
          const setYearDropdown = await this.setYearDropdown();
          // period dropdown;
          this.SET_CONTROL_OPTIONS({
            panelIndex: 2,
            controlIndex: 2,
            values: setYearDropdown,
          });
          this.loading = true;
          await this.renderChart(this.values);
          this.loading = false;
        } else if (data.name === 'Zonal') {
          this.TOGGLE_VISIBILITY({
            panelIndex: this.controlIndex,
            key: 'year',
            value: true,
          });
          this.TOGGLE_VISIBILITY({
            panelIndex: this.controlIndex,
            key: 'location',
            value: false,
          });

          // get the list of years by datasource
          const setYearDropdown = await this.setYearDropdown();
          // period dropdown;
          this.SET_CONTROL_OPTIONS({
            panelIndex: 2,
            controlIndex: 2,
            values: setYearDropdown,
          });
          this.loading = true;
          await this.renderChart(this.values);
          this.loading = false;
        }
      },
      immediate: false,
    },
    /**
     * This adds or removes the target line
     * without re-plotting the entire chart
     */
    'values.target.sdg': {
      handler(val) {
        this.toggleSDGTargetLine(val);
      },
    },
    /**
     * This adds or removes the target line
     * without re-plotting the entire chart
     */
    'values.target.national': {
      handler(val) {
        this.toggleNationalTargetLine(val);
      },
    },
  },

  async mounted() {
    // Initial render if we have the required values
    if (this.validateRequiredValues(this.values)) {
      this.$nextTick(() => {
        this.safeRenderChart(this.values);
      });
    }
    if (!Array.isArray(this.values.indicator.length)) {
      this.title = ` Comparison Of ${this.values.indicator.short_name} according to the ${this.values.datasource.datasource} across ${this.values.compareBy.name}`;
    } else {
      this.title = ` Comparison Of ${this.values.indicator[0].short_name} and ${this.values.indicator[1].short_name} according to the ${this.values.datasource.datasource} across ${this.values.compareBy.name}s`;
    }
  },
};
</script>

<style lang="scss" scoped>
div.ics_wrapper {
  position: relative;
  div.no_data {
    position: absolute;
    top: 0;

    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
}
.no_ind_data {
  position: fixed;
  top: 280px;
  right: 110px;
  padding: 10px;
  background-color: #ffffff;
  z-index: 1;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 4px;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    position: sticky;
  }

  li {
    font-size: 12px;
    font-weight: 400;
    color: #000000;
    line-height: 1.5;
    letter-spacing: 0.5px;
    text-align: left;
    margin-bottom: 0.5rem;
  }
}
</style>
