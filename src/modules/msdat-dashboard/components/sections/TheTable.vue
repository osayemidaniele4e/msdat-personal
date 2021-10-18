/* eslint-disable no-await-in-loop */
<template>
<base-overlay :show="loading">
  <base-sub-card showControls v-if="values">
    <template #title>
      <h6 class="work-sans"><b>{{ values.indicator.short_name}}</b> And Related Indicators
        With Years Of Latest Value Across The <b>Country</b>
      </h6>
    </template>
    <TableComponent
    class="work-sans"
     v-if="TableData.length"
    :dataArray="TableData"
    />
  </base-sub-card>
</base-overlay>
</template>

<script>
import TableComponent from '@/modules/msdat-dashboard/components/table/TableComponent.vue';
import formatter from '../../mixins/formatter';

export default {
  mixins: [formatter],
  components: {
    TableComponent,
  },
  data() {
    return {
      TableData: [
        {
          indicator: {
            id: 5,
            full_name: 'ANC Coverage (at least 1 visit)',
            short_name: 'ANC Coverage (at least 1 visit)',
            desirable_slope: 'Positive',
            indicator_type: 'Outcome',
            program_area: 'RMNCH',
            national_target: null,
            national_source: null,
            national_information: null,
            sdg_target: null,
            sdg_information: null,
            first_related: 6,
            second_related: 7,
            third_related: 8,
            fourth_related: null,
            created_at: null,
            updated_at: null,
            factor: 2,
            group: [],
          },
          values: [
            {
              dataSources: 'MICS',
              value: '65.8',
              factor: '%',
              year: '2016',
              classification: 'Survey',
            },
            {
              dataSources: 'NDHS',
              value: '67.0',
              factor: '%',
              year: '2018',
              classification: 'Survey',
            },
            {
              dataSources: 'NARHS',
              value: '65.2',
              factor: '%',
              year: '2012',
              classification: 'Survey',
            },
            {
              dataSources: 'NMIS',
              value: '62.6',
              factor: '%',
              year: '2015',
              classification: 'Survey',
            },
            {
              dataSources: 'NNHS',
              value: '72.1',
              factor: '%',
              year: '2018',
              classification: 'Survey',
            },
            {
              dataSources: 'NHMIS',
              value: '60.01',
              factor: '%',
              year: '2021-01-01',
              classification: 'Routine',
            },
            {
              dataSources: 'World Bank',
              value: '67.0',
              factor: '%',
              year: '2018',
              classification: 'Estimate',
            },
          ],
        },
        {
          indicator: {
            id: 6,
            full_name: 'ANC Coverage (4 visits)',
            short_name: 'ANC Coverage (4 visits)',
            desirable_slope: 'Positive',
            indicator_type: 'Outcome',
            program_area: 'RMNCH',
            national_target: '80.00',
            national_source: 'NRHP 2017',
            national_information:
              'Target obtained from the National Reproductive Health Policy (NRHP) 2017 to 2021',
            sdg_target: null,
            sdg_information: null,
            first_related: 5,
            second_related: 8,
            third_related: 7,
            fourth_related: 29,
            created_at: null,
            updated_at: null,
            factor: 2,
            group: [],
          },
          values: [
            {
              dataSources: 'MICS',
              value: '49.1',
              factor: '%',
              year: '2016',
              classification: 'Survey',
            },
            {
              dataSources: 'NDHS',
              value: '56.8',
              factor: '%',
              year: '2018',
              classification: 'Survey',
            },
            {
              dataSources: 'NARHS',
              value: '60.0',
              factor: '%',
              year: '2012',
              classification: 'Survey',
            },
            {
              dataSources: 'NNHS',
              value: '55.1',
              factor: '%',
              year: '2015',
              classification: 'Survey',
            },
            {
              dataSources: 'NHMIS',
              value: '18.98',
              factor: '%',
              year: '2020-12-01',
              classification: 'Routine',
            },
            {
              dataSources: 'World Bank',
              value: '56.8',
              factor: '%',
              year: '2018',
              classification: 'Estimate',
            },
            {
              dataSources: 'WHO-GHO',
              value: '56.8',
              factor: '%',
              year: '2018',
              classification: 'Estimate',
            },
          ],
        },
        {
          indicator: {
            id: 7,
            full_name: 'Skilled attendance at delivery or birth',
            short_name: 'Skilled birth attendance',
            desirable_slope: 'Positive',
            indicator_type: 'Outcome',
            program_area: 'RMNCH',
            national_target: '57.00',
            national_source: 'NSHDP II & NRHP 2017',
            national_information:
              'Target obtained from the National Reproductive Health Policy (NRHP) 2017 to 2021',
            sdg_target: null,
            sdg_information: null,
            first_related: 6,
            second_related: 5,
            third_related: 8,
            fourth_related: 29,
            created_at: null,
            updated_at: null,
            factor: 2,
            group: [],
          },
          values: [
            {
              dataSources: 'MICS',
              value: '43.0',
              factor: '%',
              year: '2016',
              classification: 'Survey',
            },
            {
              dataSources: 'NDHS',
              value: '43.3',
              factor: '%',
              year: '2018',
              classification: 'Survey',
            },
            {
              dataSources: 'NARHS',
              value: '47.5',
              factor: '%',
              year: '2012',
              classification: 'Survey',
            },
            {
              dataSources: 'NNHS',
              value: '43.6',
              factor: '%',
              year: '2018',
              classification: 'Survey',
            },
            {
              dataSources: 'NHMIS',
              value: '84.72',
              factor: '%',
              year: '2020-12-01',
              classification: 'Routine',
            },
            {
              dataSources: 'World Bank',
              value: '43.4',
              factor: '%',
              year: '2018',
              classification: 'Estimate',
            },
            {
              dataSources: 'IHME',
              value: '35.65402224',
              factor: '%',
              year: '2017',
              classification: 'Estimate',
            },
            {
              dataSources: 'WHO-GHO',
              value: '43.0',
              factor: '%',
              year: '2018',
              classification: 'Estimate',
            },
          ],
        },
      ],
      loading: false,

    };
  },
  props: {
    /**
     * input values
     */
    values: {
      type: [Object, String, Array],
      required: true,
    },
  },
  watch: {
    'values.indicator': {
      async handler(newValues) {
        this.loading = true;
        const formattedData = [];
        const indicators = [newValues.id, newValues.first_related, newValues.second_related];

        for (let indicatorIndex = 0; indicatorIndex < indicators.length; indicatorIndex += 1) {
          const indicatorID = indicators[indicatorIndex];
          const data = [];
          const dataSources = this.dlGetDashboardDataSource();
          console.log('dS', dataSources);
          const indicatorObject = this.dlGetIndicator(indicatorID);
          for (let index = 0; index < dataSources.length; index += 1) {
            const element = dataSources[index];
            // eslint-disable-next-line no-await-in-loop
            const ab = await this.dlGetLatestSourceAndIndicatorData({
              indicator: indicatorID,
              datasource: element.id,
              location: 1,
            });
            data.push(ab);
          }
          formattedData.push(this.tableComponentDataFormatter(indicatorObject, data));
        }
        this.TableData = formattedData;
        // console.log('freemD', this.TableData);
        // console.log(JSON.stringify(this.TableData));
        this.loading = false;
      },
    },
  },
  methods: {

    /**
     * @param {Object} queryObject  The query Object
     * @param {number} queryObject.indicator The id of the indicator
     * @param {number} queryObject.datasource The id of the datasource
     * @returns {dataObjectType}
     */
    async dlGetLatestSourceAndIndicatorData(queryObject) {
      const filteredIndicator = await this.dlQuery(queryObject);
      // console.log(queryObject);
      // console.log(filteredIndicator);
      if (filteredIndicator.length > 0) {
        return filteredIndicator.reduce(
          (max, currentValues) => {
            // if (!(currentValues.period.length > 4)) {
            if (currentValues.period > max.period) {
              return currentValues;
            }
            return max;
            // }
            // return null;
          },
        );
      }
      return null;
    },
  },
};
</script>

<style lang="scss" scoped></style>
