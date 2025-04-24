/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
// import { uniq, sortBy, groupBy } from 'lodash';
import { sortBy, uniq } from 'lodash';
import { groupIndicator } from '@/util/helper';
import ApiServices from '@/modules/data-layer/services/ApiServices';

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

      // this.$store.commit('MSDAT_STORE/SET_ALL_CONTROL_OPTIONS', {
      //   key: 'indicator',
      //   payload: this.defaultDataSourceDropdown,
      // });
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
      const { data } = await ApiServices.getPeriod({
        indicator: indicatorID,
        datasource: dataSourceID,
        location: locationID,
      });
      const years = data.periods;
      return years.sort((a, b) => b - a);
    },
    // get years by datasource
    async setYearDropdownByDatasource(dataSourceID = this.defaultDataSource.id) {
      const data = await this.queryDBForYearByDs(dataSourceID);
      // debugger;
      // const onlyYearData = data?.filter((item) => {
      //   if (isDataYearly(item.period)) {
      //     return item.period;
      //   }
      //   return false;
      // });
      // const years = onlyYearData?.map((item) => item.period);
      // const uniqueYears = uniq(years);
      return data.sort((a, b) => b - a);
    },

    /**
     * Method to set the location dropdown based on the selected data source and indicator.
     * It fetches available locations from the database and updates the store with the unique locations.
     *
     * @param {number} dataSourceID - The ID of the selected data source. Defaults to the default data source ID.
     * @param {number} indicatorID - The ID of the selected indicator. Defaults to the default indicator ID.
     * @param {number} controlIndex - The index of the control to update. Defaults to 0.
     */
    async setLocationDropdown(
      dataSourceID = this.defaultDataSource.id,
      indicatorID = this.defaultIndicator.id,
      // eslint-disable-next-line no-unused-vars
      controlIndex = 0,
    ) {
      // Return if either dataSourceID or indicatorID is not provided
      if (!dataSourceID || !indicatorID) return;

      let data = [];

      // Fetch available locations for each indicator if indicatorID is an array
      if (Array.isArray(indicatorID)) {
        for (const ind of indicatorID) {
          data = data.concat(await this.queryDBForAvailableLocation(dataSourceID, ind));
        }
      // Fetch available locations for each data source if dataSourceID is an array
      } else if (Array.isArray(dataSourceID)) {
        for (const dat of dataSourceID) {
          data = data.concat(await this.queryDBForAvailableLocation(dat, indicatorID));
        }
      // Fetch available locations for the given dataSourceID and indicatorID
      } else {
        data = await this.queryDBForAvailableLocation(dataSourceID, indicatorID);
      }

      // Commit the unique locations to the store
      this.$store.commit('MSDAT_STORE/SET_ALL_CONTROL_OPTIONS', {
        key: 'location',
        payload: data,
      });

      // Set the default location (Nigeria) in the store
      // this.$store.commit('MSDAT_STORE/SET_PAYLOAD', {
      //   controlIndex,
      //   key: 'location',
      //   value: this.dlGetLocation(1),
      // });
    },

    // Get available DataSources
    async setDataSourcesDropdown(indicatorID = this.defaultIndicator.id) {
      const data = await this.getDataSourcesFromIndicator(indicatorID);
      return data;
    },
    // Get available Indicator
    async setIndicatorDropdown(datasourceID = this.defaultDataSource.id) {
      const data = await this.getIndicatorsFromDatasource(datasourceID);

      const formattedData = groupIndicator(data, 'program_area');
      return formattedData;
    },
    async setAllIndicatorDropdown(indicators) {
      const formattedData = groupIndicator(indicators, 'program_area');
      return formattedData;
    },
    async setIDCIndicatorDropdown(datasourceID = this.defaultDataSource.id) {
      const data = await this.getIndicatorsFromDatasource(datasourceID);

      const formattedData = groupIndicator(data, 'program_area');
      return formattedData;
    },
  },
};
