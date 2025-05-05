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
      defaultYear: '2022',
      defaultIndicatorDropdown: [],
      defaultDataSourceDropdown: [],
      defaultLocationDropdown: [],
      defaultYearDropdown: [],
      cpIsLoading: false,
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
      this.defaultIndicator = this.dlGetIndicator(this.$store.state.MSDAT_STORE.default.indicator);
      this.defaultDataSource = this.dlGetDataSource(
        this.$store.state.MSDAT_STORE.default.datasource,
      );
      this.defaultLocation = this.dlGetLocation(this.$store.state.MSDAT_STORE.default.location);

      console.log('default indicator:', this.defaultIndicator);
      console.log('default datasource:', this.defaultDataSource);
      console.log('default location:', this.defaultLocation);
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
      let locations = this.dlGetLocation({ level: 3 });
      locations.unshift(this.dlGetLocation(1));
      locations = locations.filter(({ id }) => data.includes(id));

      this.$store.commit('MSDAT_STORE/SET_ALL_CONTROL_OPTIONS', {
        key: 'location',
        payload: locations,
      });

      this.$store.commit('MSDAT_STORE/SET_PAYLOAD', {
        controlIndex,
        key: 'location',
        value: locations[0] || this.dlGetLocation(1),
      });
    },

    // Get available DataSources
    async setDataSourcesDropdown(indicatorID = this.defaultIndicator.id) {
      const data = await this.getDataSourcesFromIndicator(indicatorID);
      return data;
    },
    // Get available Indicator
    // async setIndicatorDropdown(datasourceID = this.defaultDataSource.id) {
    //   const data = await this.getIndicatorFromDexie(datasourceID);

    //   console.log(data, 'indicator world');
    //   console.log(datasourceID, 'indicator world');

    //   const indicatorWithData = data.filter(async (indicatorItem) => {
    //     const indicatorData = await this.dlQuery({
    //       indicator: indicatorItem.id,
    //       datasource: datasourceID,
    //     });

    //     // Keep only items where indicatorData is not an empty array
    //     return indicatorData.length > 0;
    //   });
    //   const formattedData = groupIndicator(indicatorWithData, 'program_area');
    //   console.log(formattedData, 'indicatorWithData');
    //   return formattedData;
    // },
    async setIndicatorDropdown(datasourceID = this.defaultDataSource.id) {
      const data = await this.getIndicatorsFromDatasource(datasourceID);

      // console.log(data, 'indicator world');
      // console.log(datasourceID, 'indicator world');

      const indicatorWithDataPromises = data.map(async (indicatorItem) => {
        const indicatorData = await this.dlQuery({
          indicator: indicatorItem.id,
          datasource: datasourceID,
        });

        // Return the item if indicatorData has content, else return null
        return indicatorData.length > 0 ? indicatorItem : null;
      });

      // Await all promises and filter out any null values
      const indicatorWithData = (await Promise.all(indicatorWithDataPromises)).filter(Boolean);

      // console.log(indicatorWithData, 'indicator world');

      const formattedData = groupIndicator(indicatorWithData, 'program_area');
      return formattedData;
    },

    async getAllDatasources() {
      const datasources = await this.getEveryDatasource();
      return datasources;
    },
  },
};
