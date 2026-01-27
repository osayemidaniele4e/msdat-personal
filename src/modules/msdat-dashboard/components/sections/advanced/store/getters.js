export default {
  // Function to get predicted data from the store
  getPredictedData: (state) => state.predictedData,
  // Function to get section title from the store
  getSectionTitle(state) {
    return state.sectionTitle;
  },

  getSelectedDataSourceID: (state) => state.dataSource,
};
