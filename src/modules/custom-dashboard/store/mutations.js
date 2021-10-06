export default {
  updateStep(state, payload) {
    state.step = payload;
  },
  setIndicators(state, payload) {
    state.indicators = payload;
  },
  setRmnchs(state, payload) {
    state.rmnchs = payload;
  },

  setPArea(state, payload) {
    // console.log("mutations", payload);
    state.program_area = payload;
  },

  selectedIndicator(state, payload) {
    state.selectedIndicator = payload;
  },

  // ******** Data Source Selection ***************** //

  setDataSource(state, payload) {
    state.dataSource = payload;
  },

  setDArea(state, payload) {
    state.SurveyArray = payload;
  },

  getByProgramAreaData(state, payload) {
    state.indicatorValue = payload;
  },

  // ******** Indicator Levels ***************** //
  getLevels(state, payload) {
    state.levels.push(payload.data_level);
    const array = state.levels;
    let newArr = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i].includes(',')) {
        // console.log(array[i]);
        const arr = array[i].split(',');
        arr.map((x) => newArr.push(x));
      } else {
        newArr.push(array[i]);
      }
    }
    const distinctArray = [...new Set(newArr)];
    newArr = distinctArray;

    state.levels = newArr;
  },

  // *************** INDICATOR YEARS *************** //

  getYears(state, payload) {
    // state.years = payload.years

    payload.years.map((x) => state.years.push(x));

    const yearsArray = state.years;

    // console.log('years Array');
    // console.log(yearsArray);

    const distinctArray = [...new Set(yearsArray)];
    state.years = distinctArray;
  },

  popLevels(state, payload) {
    const newLevels = state.levels.filter((c) => c.id != payload);
    state.levels = newLevels;
  },

};
