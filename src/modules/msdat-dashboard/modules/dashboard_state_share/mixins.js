export default {
  data() {
    return {
      queryKey: ['indicator', 'datasource', 'period', 'location'],
    };
  },
  methods: {
    /**
     * this add  query parameter to  the *silently* (without reloading page)
     * @param {*} params - object with parameters
     * #example { name: 'value' }
     */
    addHashToLocation(params) {
      const objectString = Object.keys(params)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
      // const getParameterArray = Object.entries(params).map(([key, value]) => `${key}=${value}`);
      window.history.pushState({}, null, `${this.$route.path}?${objectString}`);
    },
    extractIdsOfObject(optionsObject) {
      const ObjectKey = {};
      Object.entries(optionsObject).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          const ids = value.map((item) => item.id).join(',');
          ObjectKey[key] = ids;
        } else if (typeof value === 'object') {
          ObjectKey[key] = value.id;
        } else {
          ObjectKey[key] = value;
        }
      });
      return ObjectKey;
    },
    /**
     * This function could be reused in other components
     * @param {} indicator
     */
    getIndicatorRelatedIndicators(indicator) {
      console.log(indicator);
      const indicatorObject = this.dlGetIndicator(indicator);
      console.log(indicatorObject);
      return [indicatorObject.id, indicatorObject.first_related, indicatorObject.second_related];
    },
    checkIfRouteQueryHasKey() {
      const queryObject = this.$route.query;
      return Object.keys(queryObject).some((item) => this.queryKey.includes(item));
    },
  },
};
