import axios from 'axios';

export default {
  // ***** Indicators Data ******* //

  async loadIndicators({ commit, state }) {
    if (state.masterData.length == 0) {
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

            });
          }));
          commit('setPArea', composedData);
        }).catch((err) => (err));
    }
  },

  // ******** Data Sources ********** //

  async loadDataSource({ commit }) {
    await axios.get('http://135.181.212.168:9234/api/crud/datasources/')
      .then((res) => {
        const { data } = res;
        const array = data.map((dArea) => dArea.classification);

        const distinctDataArray = [...new Set(array)];
        const SurveyArray = [];

        distinctDataArray.forEach(((distItem) => {
          SurveyArray.push({
            children: data.filter(
              (x) => x.classification === distItem,
            ),
            parent: distItem.toUpperCase(),
          });
        }));
        commit('setDArea', SurveyArray);
      }).catch((err) => (err));
  },

  // ******** Coverage Levels ********* //

  async loadCoverageLevels({ commit }, payload) {
    let levelsObj = {};
    if (payload.checked === true) {
      await axios.get(`http://135.181.212.168:9234/api/crud/datasource_specific_indicator/${payload.id}`)
        .then((res) => {
          const { data } = res;
          const dataLevels = data.data_level.split(',');
          // console.log(dataLevels);
          const levels = dataLevels.map((level) => ({ selected: false, value: level }));
          levelsObj = { id: payload.id, Datalevels: levels, checked: payload.checked };
        });
    } else {
      levelsObj = { id: payload.id, Datalevels: [], checked: payload.checked };
    }
    commit('getLevels', levelsObj);
  },

  // ********* For Years ******** //

  async loadYears({ commit }, payload) {
    let dataObj = {};
    debugger;
    if (payload.checked === true) {
      await axios.get(`http://135.181.212.168:9234/api/crud/indicators/${payload.id}/years_available/`)
        .then((res) => {
          const { data } = res;
          const yearsData = data.years.map((year) => ({ selected: false, value: year }));
          dataObj = {
            id: payload.id, childName: payload.child, years: yearsData, parentName: payload.parent, checked: payload.checked,
          };
        });
    } else {
      dataObj = {
        id: payload.id, childName: payload.child, years: [], parentName: payload.parent, checked: payload.checked,
      };
    }
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
};
