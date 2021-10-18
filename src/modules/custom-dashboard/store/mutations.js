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
  selectedDataSource(state, payload) {
    state.selectedDataSource = payload;
  },
  selectedYears(state, payload) {
    state.selectedYears = payload;
    console.log(payload);
  },
  selectedLevels(state, payload) {
    state.selectedLevels = payload;
  },

  isNotExistYear(state, payload) {
    state.isNotExistYear.push(payload);
  },

  // selectionIndicator(state, payload) {
  //   console.log('selectionIndicator',payload);
  //    state.program_area.map(element => {
  //     element.children.map(child => {

  //       if(child.id == payload.id) {
  //         console.log('payload',payload.id);
  //         child.selected = payload.checked
  //       }
  //     })
  //   });

  // },

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
    // debugger;
    // state.years.push(payload.map(year => year.year))

    // // payload.year.map((x) => state.years.push(x));

    // const yearsArray = state.years;

    // // console.log('years Array');
    // // console.log(yearsArray);

    // const distinctArray = [...new Set(yearsArray)];
    // state.years = distinctArray;
    payload.years.map((x) => state.years.push(x));

    const yearsArray = state.years;
    state.program_area.map((child) => child.years = (payload));
    console.log('sdes', state.program_area);

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
