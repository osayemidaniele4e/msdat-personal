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
    getRouteIndicatorRelatedIndicators() {
      return [
        Number(this.$route.query.indicator),
        Number(this.$route.query.first_related),
        Number(this.$route.query.second_related),
      ];
    },
    checkIfRouteQueryHasKey() {
      const queryObject = this.$route.query;
      return Object.keys(queryObject).some((item) => this.queryKey.includes(item));
    },

    setRouteQueryToControlPanel() {
      this.$store.commit('MSDAT_STORE/SET_PAYLOAD', {
        controlIndex: this.$route.query.section,
        key: 'indicator',
        value: this.dlGetIndicator(Number(this.$route.query.indicator)),
      });
      this.$store.commit('MSDAT_STORE/SET_PAYLOAD', {
        controlIndex: this.$route.query.section,
        key: 'datasource',
        value: this.dlGetDataSource(Number(this.$route.query.datasource)),
      });
      this.$store.commit('MSDAT_STORE/SET_PAYLOAD', {
        controlIndex: this.$route.query.section,
        key: 'location',
        value: this.dlGetLocation(Number(this.$route.query.location)),
      });
      this.$store.commit('MSDAT_STORE/SET_PAYLOAD', {
        controlIndex: this.$route.query.section,
        key: 'year',
        value: this.$route.query.year,
      });
    },
  },
};
