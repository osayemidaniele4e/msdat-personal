import Database from '../../DataLayer/mixin';
import Db from '../../DataLayer/config/dexie';
import DatasetColumnChartConfiguration from '../../../config/datasetColumnChartConfig';

export default {
  mixin: [Database],
  data() {
    return {
      test: 'here',
    };
  },
  methods: {

    /**
     * removeGeoPoliticalZonesFromArray
     * * removes all Geopolitical zones from array of national data
     * @param {Array [ Object ]} locationsWithValue
     * @returns
     */
    removeGeoPoliticalZonesFromArray(locationsWithValue = []) {
      const el = [];
      locationsWithValue.forEach((items) => {
        if (items.level !== 2) {
          el.push(items);
        }
      });
      return el;
    },
    /**
     * getLocations
     * *return all location names
     * @param { Array[ number ]} ids location id
     * @returns
     */
    async getLocations(ids) {
      return Db.location.bulkGet(ids);
    },

    /**
     *mapLocationsToValues
     ** return Locations with their values
     *! location ids must be associated with value id
     * @param { Array[ Objects ] } locations
     * @param { Array[ Objects ] } values
     * @returns
     */
    mapLocationsToValues(locations = [], values = []) {
      const locate = locations;
      const local = values;
      let i = 1;
      const chart = [];
      for (i = 0; i < locate.length; i += 1) {
        if (local[i].location === locate[i].id) {
          chart.push({
            name: locate[i].name,
            value: local[i].value,
            level: locate[i].level,
            parent: locate[i].parent,
            id: locate[i].id,
          });
        }
      }
      return chart;
    },

    /**
     *groupStateByTheirGeoPoliticalZones
     ** group states based on their zones
     * @param { Array [ Object ] } locationsWithValue
     * @param { Number } zoneId
     * @returns Array []
     */
    groupStateByTheirGeoPoliticalZones(locationsWithValue = [], zoneId = 0) {
      const el = [];
      locationsWithValue.forEach((items) => {
        if (items.parent === zoneId) {
          el.push([items.name, Number(items.value)]);
        }
      });

      return el;
    },

    /**
     *groupByOnlyGeoPoliticalZones
     **group all Geo-Political zones for national level data,
     *! modify method with caution. Its currently used to generate data
     *! for dataset section
     * @param { Array[ Objects ] } items
     * @returns Array[ Objects ]
     */
    groupByOnlyGeoPoliticalZones(items = [{}]) {
      const colors = ['#474746', '#8E7796', '#BAC6FC', '#7B9A9B', '#CCCC17', '#6D8ADE', '#736A33'];
      const el = [];
      items.forEach((data, index) => {
        if (data.parent === 1) {
          el.push({
            name: data.name,
            y: Number(data.value),
            color: colors[index],
          });
        }
      });
      return el;
    },

    /**
     * generateGeoPoliticalZoneValues
     * * returns all states grouped to their Geo Political zones
     * @param { Array[ Objects ] } locationsWithValue
     * @returns { Array [ Objects ] }
     */
    generateGeoPoliticalZoneValues(locationsWithValue = [{}]) {
      const national = this.groupByOnlyGeoPoliticalZones(locationsWithValue);
      const northEast = this.groupStateByTheirGeoPoliticalZones(locationsWithValue, 3);
      const northCentral = this.groupStateByTheirGeoPoliticalZones(locationsWithValue, 2);
      const northWest = this.groupStateByTheirGeoPoliticalZones(locationsWithValue, 4);
      const southEast = this.groupStateByTheirGeoPoliticalZones(locationsWithValue, 5);
      const southsouth = this.groupStateByTheirGeoPoliticalZones(locationsWithValue, 6);
      const southWest = this.groupStateByTheirGeoPoliticalZones(locationsWithValue, 7);

      return [
        national, northEast, northCentral, northWest, southEast, southsouth, southWest,
      ];
    },

    /**
     * mapStatesToXaxisAndValues
     * * return data to plot data comparism chart
     * @param { Array[ Objects ] } locationsWithValues
     * @returns { Array [ Objects ] }
     */
    mapStatesToXaxisAndValues(locationsWithValues = []) {
      const local = this.removeGeoPoliticalZonesFromArray(locationsWithValues);
      const xAxis = [];
      const data = [];
      for (let i = 0; i < local.length; i += 1) {
        xAxis.push(local[i].name);
        data.push(Number(local[i].value));
      }

      return this.plotDatasetComparismChart(xAxis, data);
    },

    /**
     * plotDatasetComparismChart
     */
    plotDatasetComparismChart(axis, data) {
      const config = DatasetColumnChartConfiguration;
      config.options.xAxis.categories = axis;
      config.options.series[0].data = data;
      config.options.series[1].name = 'text';
      return config;
    },
  },
};
