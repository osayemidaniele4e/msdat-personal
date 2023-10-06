const getters = {
  getConfigObject: (state) => state.configObject,
  getSelectedConfig: (state) => state.selectedConfigurations,
  getLoadingStatus: (state) => state.loading,
  getSelectedState: (state) => state,
};

export default getters;
