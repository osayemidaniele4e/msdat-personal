export default {
  indicators(state) {
    return state.indicators;
  },

  getRmnchs(state) {
    return state.rmnchs;
  },
  getprogramArea(state) {
    // console.log("Working", state.program_area);
    return state.program_area;
  },

  // ******* Data Source Selection ************** //

  dataSource(state) {
    return state.dataSource;
  },
  getDataSource(state) {
    return state.SurveyArray;
  },

  selectedIndicator(state) {
    return state.selectedIndicator;
  },
  selectedDataSource(state) {
    return state.selectedDataSource;
  },
  selectedYears(state) {
    return state.selectedYears;
  },
  selectedLevels(state) {
    return state.selectedLevels;
  },

  // ******* Indicators Levels ************** //

  indicatorsLevels(state) {
    return state.levels;
  },
  indicatorsYear(state) {
    // console.log("State Years Get");
    // console.log(state.years);
    return state.years;
  },

};
