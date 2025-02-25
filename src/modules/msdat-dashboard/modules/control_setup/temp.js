export default {
  data() {
    return {
      index: null,
    };
  },
  methods: {
    // Method to update route parameters
    updateParams() {
      const url = new URL(window.location.href);
      if (url.searchParams.has('section')) {
        const paramValue = url.searchParams.get('section');
        const {
          indicator, datasource, location, year,
        } = this.payload;

        const params = {
          indicator: indicator?.id,
          datasource: datasource?.id,
          location: location?.id,
          section: paramValue,
          // year,
        };
        console.log(datasource, '@datasource');
        const queryString = Object.keys(params)
          .filter((key) => params[key] !== undefined)
          .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
          .join('&');

        const newUrl = `${window.location.pathname}?${queryString}`;
        if (this.index === 0 || this.index === 1) {
          // Use pushState to update the URL
          window.history.pushState({
            indicator, datasource, location, year, paramValue,
          }, '', newUrl);
        }
      } else {
        const {
          indicator, datasource, location, year,
        } = this.payload;

        const params = {
          indicator: indicator?.id,
          datasource: datasource?.id,
          location: location?.id,
          // year,
        };
        console.log(datasource, '@datasource');
        const queryString = Object.keys(params)
          .filter((key) => params[key] !== undefined)
          .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
          .join('&');

        const newUrl = `${window.location.pathname}?${queryString}`;
        if (this.index === 0 || this.index === 1) {
          // Use pushState to update the URL
          window.history.pushState({
            indicator, datasource, location, year,
          }, '', newUrl);
        }
      }
    },
    initializeFromParams() {
      const { query } = this.$route;
      if (query) {
        const {
          indicator, datasource, location,
          // year,
        } = query;

        if (indicator !== undefined) {
          this.payload.indicator = { id: Number(indicator) };
        }

        if (datasource !== undefined) {
          this.payload.datasource = { id: Number(datasource) };
        }

        if (location !== undefined) {
          this.payload.location = { id: Number(location) };
        }

        // this.payload.year = year; // Uncomment if needed
      }
    },

    removeQuery() {
      // Remove the specified parameters from the URL
      const urlWithoutParams = new URL(window.location.href);
      urlWithoutParams.searchParams.delete('indicator');
      urlWithoutParams.searchParams.delete('datasource');
      urlWithoutParams.searchParams.delete('location');
      urlWithoutParams.searchParams.delete('year');

      window.history.pushState({}, '', urlWithoutParams.toString());
    },

    // Handle popstate events (back/forward navigation)
    handlePopstate(event) {
      const { state } = event;

      if (state) {
        this.payload.indicator = state.indicator;
        this.payload.datasource = state.datasource;
        this.payload.location = state.location;
        // this.payload.year = state.year;
      }
    },
  },
  watch: {
    // Watch for changes in payload properties and update route parameters
    'payload.indicator': 'updateParams',
    'payload.datasource': 'updateParams',
    'payload.location': 'updateParams',
    // 'payload.year': 'updateParams',
    controlIndex: {
      async handler(newValue) {
        this.index = newValue;
        if (newValue !== 0 && newValue !== 1) { this.removeQuery(); } else this.updateParams();
      },
      immediate: true,
      deep: true,
    },

  },
};
