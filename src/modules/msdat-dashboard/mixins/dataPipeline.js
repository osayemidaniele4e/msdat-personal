export default {

  data() {
    return {
      test: 'here',
    };
  },
  methods: {

    anotherFunction(locationsWithValue) {
      const national = this.IsNationalLevel(locationsWithValue);
      const northEast = this.groupStateByTheirGeoPoliticalZones(locationsWithValue, 3, 'North East', '#8E7796');
      const northCentral = this.groupStateByTheirGeoPoliticalZones(locationsWithValue, 2, 'North Central', '#BAC6FC');
      const northWest = this.groupStateByTheirGeoPoliticalZones(locationsWithValue, 4, 'North West', '#7B9A9B');
      const southEast = this.groupStateByTheirGeoPoliticalZones(locationsWithValue, 5, 'South East', '#CCCC17');
      const southsouth = this.groupStateByTheirGeoPoliticalZones(locationsWithValue, 6, 'South South', '#6D8ADE');
      const southWest = this.groupStateByTheirGeoPoliticalZones(locationsWithValue, 7, 'South West', '#736A33');
      return [
        national, northEast, northCentral, northWest, southEast, southsouth, southWest,
      ];
    },

    IsNationalLevel(items) {
      const colors = ['#474746', '#8E7796', '#BAC6FC', '#7B9A9B', '#CCCC17', '#6D8ADE', '#736A33'];
      const mapData = [];
      const el = {};
      items.forEach((data, index) => {
        if (data.parent === 1) {
          mapData.push({
            name: data.name,
            y: Number(data.value),
            color: colors[index],
          });
        }
      });

      el.name = 'National';
      el.color = '#474746';
      el.data = mapData;
      el.pointWidth = 15;
      el.pointWidth = 13;
      el.groupPadding = 0.5;
      return el;
    },

    /**
     *groupStateByTheirGeoPoliticalZones
     ** group states based on their zones
     * @param { Array [ Object ] } locationsWithValue
     * @param { Number } zoneId
     * @returns Array []
     */
    groupStateByTheirGeoPoliticalZones(locationsWithValue = [], zoneId = 0, name, color) {
      const el = [];
      locationsWithValue.forEach((items) => {
        if (items.parent === zoneId) {
          el.push([items.name, Number(items.value)]);
        }
      });
      const val = {};
      val.allAreas = false;
      val.name = name;
      val.data = el;
      val.color = color;
      val.pointWidth = 13;
      val.groupPadding = 0.5;
      val.pointPadding = 5;
      return val;
    },

    /**
     * generateGeoPoliticalZoneValues
     * * returns all states grouped to their Geo Political zones
     * @param { Array[ Objects ] } locationsWithValue
     * @returns { Array [ Objects ] }
     */
    generateGeoPoliticalZoneValues(locationsWithValue = [{}]) {
      const national = this.groupStateByTheirGeoPoliticalZones(locationsWithValue, 1, 'National', '#474746');
      const northEast = this.groupStateByTheirGeoPoliticalZones(locationsWithValue, 3, 'North East', '#8E7796');
      const northCentral = this.groupStateByTheirGeoPoliticalZones(locationsWithValue, 2, 'North Central', '#BAC6FC');
      const northWest = this.groupStateByTheirGeoPoliticalZones(locationsWithValue, 4, 'North West', '#7B9A9B');
      const southEast = this.groupStateByTheirGeoPoliticalZones(locationsWithValue, 5, 'South East', '#CCCC17');
      const southsouth = this.groupStateByTheirGeoPoliticalZones(locationsWithValue, 6, 'South South', '#6D8ADE');
      const southWest = this.groupStateByTheirGeoPoliticalZones(locationsWithValue, 7, 'South West', '#736A33');

      return [
        national, northEast, northCentral, northWest, southEast, southsouth, southWest,
      ];
    },
  },
};
