/* eslint-disable no-param-reassign */
// import { uniq, sortBy, groupBy } from 'lodash';
import { sortBy, uniq } from 'lodash';
import { groupIndicator, isDataYearly } from '@/util/helper';

export default {
  data() {
    return {
      defaultIndicator: '',
      defaultDataSource: '',
      defaultLocation: '',
      defaultYear: '2016',
      defaultIndicatorDropdown: [],
      defaultDataSourceDropdown: [],
      defaultLocationDropdown: [],
      defaultYearDropdown: [],
      cpIsLoading: false,
      additionalLocation: [
        {
          id: 2,
          name: 'North-Central',
          parent: 1,
          level: 2,
          created_at: '2022-10-20T09:08:41.900629Z',
          updated_at: '2022-10-20T09:08:41.900636Z',
        },
        {
          id: 3,
          name: 'North-East',
          parent: 1,
          level: 2,
          created_at: '2022-10-20T09:08:41.901842Z',
          updated_at: '2022-10-20T09:08:41.901848Z',
        },
        {
          id: 4,
          name: 'North-West',
          parent: 1,
          level: 2,
          created_at: '2022-10-20T09:08:41.902790Z',
          updated_at: '2022-10-20T09:08:41.902797Z',
        },
        {
          id: 5,
          name: 'South-East',
          parent: 1,
          level: 2,
          created_at: '2022-10-20T09:08:41.903856Z',
          updated_at: '2022-10-20T09:08:41.903866Z',
        },
        {
          id: 6,
          name: 'South-South',
          parent: 1,
          level: 2,
          created_at: '2022-10-20T09:08:41.905143Z',
          updated_at: '2022-10-20T09:08:41.905153Z',
        },
        {
          id: 7,
          name: 'South-West',
          parent: 1,
          level: 2,
          created_at: '2022-10-20T09:08:41.906410Z',
          updated_at: '2022-10-20T09:08:41.906420Z',
        },
      ],
    };
  },
  watch: {
    // The is the updated the control panels dropdown as indicator are gotten from the API
    // in the background (async)
    dlGetAvailableIndicators(newValue) {
      this.$store.commit('MSDAT_STORE/SET_ALL_CONTROL_OPTIONS', {
        key: 'indicator',
        payload: groupIndicator(newValue, 'program_area'),
      });
    },
  },
  methods: {
    cpGetAvailableYears(dataValues) {
      const years = dataValues?.map((item) => item.period);
      const uniqueYears = uniq(years);
      return sortBy(uniqueYears);
    },
    setUpControlPanelDropDown() {
      // debugger;
      this.defaultIndicatorDropdown = groupIndicator(this.dlGetAvailableIndicators, 'program_area');

      this.$store.commit('MSDAT_STORE/SET_ALL_CONTROL_OPTIONS', {
        key: 'indicator',
        payload: this.defaultDataSourceDropdown,
      });
      this.defaultDataSourceDropdown = this.dlGetDashboardDataSource();

      this.$store.commit('MSDAT_STORE/SET_ALL_CONTROL_OPTIONS', {
        key: 'datasource',
        payload: this.defaultDataSourceDropdown,
      });

      this.defaultLocationDropdown = this.dlGetLocation({
        level: 3,
      });

      const location = this.dlGetLocation(1); // get nigerian Location object
      // add nigeria to the top of the array
      this.defaultLocationDropdown.unshift(location);

      this.defaultDataSourceDropdown = this.dlGetDashboardDataSource();

      this.$store.commit('MSDAT_STORE/SET_ALL_CONTROL_OPTIONS', {
        key: 'location',
        payload: this.defaultLocationDropdown,
      });
    },
    setDefaults() {
      const { query } = this.$route;
      const {
        indicator: queryIndicator,
        datasource: queryDatasource,
        location: queryLocation,
        // year: queryYear,
      } = query;

      // Check if query parameters for indicator, datasource, location, and year are present
      // const hasQueryParams = queryIndicator !== undefined
      //   || queryDatasource !== undefined
      //   || queryLocation !== undefined
      //   || queryYear !== undefined;

      this.defaultIndicator = queryIndicator
        ? this.dlGetIndicator(Number(queryIndicator))
        : this.dlGetIndicator(this.$store.state.MSDAT_STORE.default.indicator);

      this.defaultDataSource = queryDatasource
        ? this.dlGetDataSource(Number(queryDatasource))
        : this.dlGetDataSource(this.$store.state.MSDAT_STORE.default.datasource);

      this.defaultLocation = queryLocation
        ? this.dlGetLocation(Number(queryLocation))
        : this.dlGetLocation(this.$store.state.MSDAT_STORE.default.location);
    },

    async setYearDropdown(
      indicatorID = this.defaultIndicator.id,
      dataSourceID = this.defaultDataSource.id,
      locationID = this.defaultLocation.id,
    ) {
      const data = await this.dlQuery({
        indicator: indicatorID,
        datasource: dataSourceID,
        location: locationID,
      });
      // console.log(data);
      // const onlyYearData = data?.filter((item) => {
      //   if (isDataYearly(item.period)) {
      //     return item.period;
      //   }
      //   return false;
      // });
      const years = data?.map((item) => item.period);
      const uniqueYears = uniq(years);
      return uniqueYears;
    },
    // get years by datasource
    async setYearDropdownByDatasource(dataSourceID = this.defaultDataSource.id) {
      const data = await this.queryDBForYearByDs(dataSourceID);
      // debugger;
      const onlyYearData = data?.filter((item) => {
        if (isDataYearly(item.period)) {
          return item.period;
        }
        return false;
      });
      const years = onlyYearData?.map((item) => item.period);
      const uniqueYears = uniq(years);
      return uniqueYears.sort((a, b) => b - a);
    },

    async setLocationDropdown(
      dataSourceID = this.defaultDataSource.id,
      indicatorID = this.defaultIndicator.id,
      controlIndex = 0,
    ) {
      if (!dataSourceID || !indicatorID) return;
      let data = [];
      if (Array.isArray(indicatorID)) {
        // eslint-disable-next-line no-restricted-syntax
        for (const ind of indicatorID) {
          // eslint-disable-next-line no-await-in-loop
          data = data.concat(await this.queryDBForAvailableLocation(dataSourceID, ind));
        }
      } else if (Array.isArray(dataSourceID)) {
        // eslint-disable-next-line no-restricted-syntax
        for (const dat of dataSourceID) {
          // eslint-disable-next-line no-await-in-loop
          data = data.concat(await this.queryDBForAvailableLocation(dat, indicatorID));
        }
      } else {
        data = await this.queryDBForAvailableLocation(dataSourceID, indicatorID);
      }
      const locations = this.dlGetLocation({ level: 3 });
      const zonalLocation = this.dlGetLocation({ level: 2 });
      let allLocations = [...locations, ...zonalLocation];

      allLocations.unshift(this.dlGetLocation(1));
      allLocations = allLocations.filter(({ id }) => data.includes(id));
      // locations.push(...this.additionalLocation);
      const uniqueItems = Array.from(new Map(allLocations.map((obj) => [obj.id, obj])).values());

      this.$store.commit('MSDAT_STORE/SET_ALL_CONTROL_OPTIONS', {
        key: 'location',
        payload: uniqueItems,
      });

      this.$store.commit('MSDAT_STORE/SET_PAYLOAD', {
        controlIndex,
        key: 'location',
        value: this.dlGetLocation(1),
      });
    },

    // Get available DataSources
    async setDataSourcesDropdown(indicatorID = this.defaultIndicator.id) {
      const data = await this.getDataSourcesFromDexie(indicatorID);
      return data;
    },
    // Get available Indicator
    async setIndicatorDropdown(datasourceID = this.defaultDataSource.id) {
      const data = await this.getIndicatorFromDexie(datasourceID);
      const indicatorWithData = data.filter(async (indicatorItem) => {
        const indicatorData = await this.dlQuery({
          indicator: indicatorItem.id,
          datasource: datasourceID,
        });

        // Keep only items where indicatorData is not an empty array
        return indicatorData.length > 0;
      });

      const formattedData = groupIndicator(indicatorWithData, 'program_area');
      return formattedData;
    },
    async setIDCIndicatorDropdown(datasourceID = this.defaultDataSource.id) {
      const data = await this.getIndicatorFromDexie(datasourceID);

      const indicatorWithData = data.filter(async (indicatorItem) => {
        const indicatorData = await this.dlQuery({
          indicator: indicatorItem.id,
          datasource: datasourceID,
        });

        // Keep only items where indicatorData is not an empty array
        return indicatorData.length > 0;
      });

      // this.$store.commit('MSDAT_STORE/SET_IDC_INDICATOR_PAYLOAD', {
      //   key: 'indicator',
      //   value: indicatorWithData[1],
      // });

      const formattedData = groupIndicator(indicatorWithData, 'program_area');
      return formattedData;
    },
  },
};
