export default {
  indicators(state) {
    return state.indicators;
  },

  getRmnchs(state) {
    return state.rmnchs;
  },
  getprogramArea(state) {
    return state.masterData;
  },
  notesArea(state) {
    // console.log(state.isNotExistYear);
    return state.notes;
  },

  // IndicatorsShortName(state){
  //   return state.indicatorsShortName;
  // },

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
    return state.years;
  },

};
