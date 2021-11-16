import axios from 'axios';

export default {

  // ********** Configuration Details ********** //

  dashboardConfiguration({ commit }, payload) {
    commit('dashboardDetails', payload);
  },

  // ***** Indicators Data ******* //

  async loadIndicators({ commit, state }) {
    if (state.masterData.length == 0) {
      state.loader.indicator = true;
      await axios.get('http://135.181.212.168:9234/api/crud/indicators/')
        .then((res) => {
          const { data } = res;
          const array = data.map((pArea) => pArea.program_area);
          const distinctArray = [...new Set(array)];
          const composedData = [];

          distinctArray.forEach(((distItem) => {
            composedData.push({
              children: data.filter(
                (x) => {
                  if (x.program_area === distItem) {
                    x.selected = false;
                    x.sources = [];
                    x.years = [];
                    x.levels = [];
                    return x;
                  }
                },

              ),
              parent: { selected: false, isChildSelected: false, value: distItem.toUpperCase() },
              showList: false,
              showNotes: false,

            });
          }));
          state.loader.indicator = false;
          commit('setPArea', composedData);
        }).catch((err) => {
          (err);
          state.loader.indicator = false;
        });
      // commit('loading', Loading)
    }
    // state.loader.indicators = false
  },

  // ******** Data Sources ********** //

  // Load DataSources From API for the First time.
  async loadDataSource({ commit, state }) {
    if (state.SurveyArray.length == 0) {
      state.loader.datasource = true;
      // state.indicatorloading = true;
      await axios.get('http://135.181.212.168:9234/api/crud/datasources/')
        .then((res) => {
          const { data } = res;
          const array = data.map((dArea) => dArea.classification);

          const distinctDataArray = [...new Set(array)];
          const SurveyArray = [];

          distinctDataArray.forEach(((distItem) => {
            SurveyArray.push({
              children: data.filter(
                (x) => {
                  if (x.classification === distItem) {
                    x.selected = false;
                    return x;
                  }
                },
              ),
              parent: distItem.toUpperCase(),

            });

            SurveyArray.sort((a, b) => {
              const keyA = a.parent;
              if (keyA == 'ROUTINE') return -1;
              return 0;
            });
          // function SortArray(x, y){
          //   return x.parent.localeCompare(y.parent);
          // }
          // SurveyArray = SurveyArray.sort(SortArray)
          }));
          state.loader.datasource = false;
          commit('setDArea', SurveyArray);
        }).catch((err) => {
          (err);
          state.loader.datasource = false;
        });
    }
  },

  // ******** Coverage Levels ********* //

  async loadCoverageLevels({ commit, state }, payload) {
    let levelsObj = {};
    if (payload.checked === true) {
      state.loader.levels = true;
      await axios.get(`http://135.181.212.168:9234/api/crud/datasource_specific_indicator/${payload.id}`)
        .then((res) => {
          const { data } = res;
          const dataLevels = data.data_level.split(',');
          // console.log(dataLevels);
          const levels = dataLevels.map((level) => ({ selected: false, value: level }));
          levelsObj = { id: payload.id, Datalevels: levels, checked: payload.checked };
          // state.loader.levels = false;
        });
    } else {
      state.loader.levels = false;
      levelsObj = { id: payload.id, Datalevels: [], checked: payload.checked };
    }
    state.loader.levels = false;
    commit('getLevels', levelsObj);
  },

  // ********* For Years ******** //

  async loadYears({ commit, state }, payload) {
    let dataObj = {};
    if (payload.checked === true) {
      state.loader.years = true;
      await axios.get(`http://135.181.212.168:9234/api/crud/indicators/${payload.id}/years_available/`)
        .then((res) => {
          const { data } = res;
          const yearsData = data.years.map((year) => ({ selected: false, value: year }));
          dataObj = {
            id: payload.id, childName: payload.child, years: yearsData, parentName: payload.parent, checked: payload.checked,
          };
          state.loader.years = false;
        });
    } else {
      dataObj = {
        id: payload.id, childName: payload.child, years: [], parentName: payload.parent, checked: payload.checked,
      };
    }
    state.loader.years = false;
    commit('getYears', dataObj);
  },

  levelclick({ commit }, payload) {
    commit('levelsHandler', payload);
  },

  _isNotExistYear({ commit }, payload) {
    commit('yearsHandler', payload);
  },

  selectedYear({ commit }, payload) {
    commit('selectedYear', payload);
  },

  forSelectedIndicator({ commit }, payload) {
    commit('selectionIndicator', payload);
  },
  forAllSelectedIndicator({ commit }, payload) {
    commit('AllselectionIndicator', payload);
  },

  forSelectedDataSource({ commit }, payload) {
    commit('selectionDataSource', payload);
  },

  selectedIndicator({ commit }, payload) {
    commit('selectedIndicator', payload);
  },

  selectedDataSource({ commit }, payload) {
    commit('selectedDataSource', payload);
  },
  selectedYears({ commit }, payload) {
    commit('selectedYears', payload);
  },
  selectedLevels({ commit }, payload) {
    commit('selectedLevels', payload);
  },

  // For Arrangment of Sections
  arrangedSection({ commit }, payload) {
    commit('arrangedSections', payload);
  },
};
