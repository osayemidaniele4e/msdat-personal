// // mixins/updateQueryParams.js

// export default {
//   beforeRouteUpdate(to, from, next) {
//     this.initializeFromParams();
//     next();
//   },
//   beforeCreate() {
//     this.initializeFromParams();
//   },
//   methods: {
//     // Method to update route parameters
//     async updateParams() {
//       const {
//         indicator, datasource, location, year,
//       } = this.payload;

//       // No need for await if this.$router.push is synchronous
//       this.$router.push({
//         query: {
//           indicator: indicator?.id,
//           datasource: datasource?.id,
//           location: location?.id,
//           // year,
//         },
//       });
//     },

//     // Method to initialize data from route parameters
//     initializeFromParams() {
//       const { query } = this.$route;
//       if (query) {
//         const {
//           indicator, datasource, location, year,
//         } = query;
//         this.payload.indicator = { id: Number(indicator) };
//         this.payload.datasource = { id: Number(datasource) };
//         this.payload.location = { id: Number(location) };
//         // this.payload.year = year;
//       }
//     },
//   },
//   watch: {
//     // Watch for changes in payload.indicator and update route parameters
//     'payload.indicator': 'updateParams',

//     // Watch for changes in payload.datasource and update route parameters
//     'payload.datasource': 'updateParams',

//     // Watch for changes in payload.location and update route parameters
//     'payload.location': 'updateParams',

//     // Watch for changes in payload.year and update route parameters
//     'payload.year': 'updateParams',
//   },
// };

// mixins/updateQueryParams.js

export default {
  // beforeCreate() {
  //   this.initializeFromParams();

  //   // Add a popstate event listener to handle back/forward navigation
  //   window.addEventListener('popstate', this.handlePopstate);
  // },
  // beforeDestroy() {
  //   // Remove the popstate event listener when the component is destroyed
  //   window.removeEventListener('popstate', this.handlePopstate);
  // },
  // onMount() {
  //   this.initializeFromParams();
  // },
  methods: {
    // Method to update route parameters
    updateParams() {
      const {
        indicator, datasource, location, year,
      } = this.payload;

      const params = {
        indicator: indicator?.id,
        datasource: datasource?.id,
        location: location?.id,
        // year,
      };

      const queryString = Object.keys(params)
        .filter((key) => params[key] !== undefined)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');

      const newUrl = `${window.location.pathname}?${queryString}`;

      // Use pushState to update the URL without triggering a full page refresh
      window.history.pushState({
        indicator, datasource, location, year,
      }, '', newUrl);
    },

    // Method to initialize data from route parameters
    // initializeFromParams() {
    //   const { search } = window.location;
    //   const params = new URLSearchParams(search);

    //   const indicator = params.get('indicator');
    //   const datasource = params.get('datasource');
    //   const location = params.get('location');
    //   // const year = params.get('year');

    //   // Update payload only if the parameters are present in the URL
    //   if (indicator !== null) {
    //     this.payload.indicator = { id: Number(indicator) };
    //   }

    //   if (datasource !== null) {
    //     this.payload.datasource = { id: Number(datasource) };
    //   }

    //   if (location !== null) {
    //     this.payload.location = { id: Number(location) };
    //   }

    //   // Handle the case for 'year' if needed
    //   // if (year !== null) {
    //   // this.payload.year = year;
    //   // }
    // },
    initializeFromParams() {
      const { query } = this.$route;
      if (query) {
        const {
          indicator, datasource, location, year,
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
  },
};
