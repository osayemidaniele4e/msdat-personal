import axios from 'axios';

export default {

  async loadIndicators({ commit, dispatch }) {
    await axios.get('http://135.181.212.168:9234/api/crud/indicators/')
      .then((res) => {
        const { data } = res;

        commit('setIndicators', data);

        const array = data.map((pArea) => pArea.program_area);
        const distinctArray = [...new Set(array)];
        const composedData = [];

        distinctArray.forEach(((distItem) => {
          composedData.push({
            children: data.filter(
              (x) => {
                if (x.program_area === distItem) {
                  x.selected = false;
                  // x.selected = Math.random()>0.5;
                  return x;
                }
                // x.years = dispatch('loadYears', x.id);
              },

            ),
            parent: distItem.toUpperCase(),
          });
        }));
        const IndicatorsShortName = data.map((e) => e.short_name);
        console.log('asfdwrftg', IndicatorsShortName);
        console.log('cDATA', composedData);
        commit('setPArea', composedData);
      }).catch((err) => (err));
  },
  async loadDataSource({ commit }) {
    await axios.get('http://135.181.212.168:9234/api/crud/datasources/')
      .then((res) => {
        const { data } = res;

        commit('setDataSource', data);

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
        console.table(SurveyArray);
        commit('setDArea', SurveyArray);
        // commit('setRmnchs',data.filter(x=> x.program_area === 'RMNCH'))
      }).catch((err) => (err));
  },
  async loadCoverageLevels({ commit }, payload) {
    await axios.get(`http://135.181.212.168:9234/api/crud/datasource_specific_indicator/${payload}`)
      .then((res) => {
        const { data } = res;

        // console.log(data);
        commit('getLevels', data);
      });
  },

  async loadYears({ commit, state }, payload) {
    console.log('payload  id ', payload.id);
    const childId = payload.id;
    await axios.get(`http://135.181.212.168:9234/api/crud/indicators/${payload.id}/years_available/`)
      .then((res) => {
        const { data } = res;
        const dataObj = { id: payload.id, childName: payload.childName, years: data.years };
        // debugger
        // let yearsObject = data.years.map(d=>(
        //   {
        //   id : payload,
        //   year : d
        // }
        // ));

        state.hierarchSelectedYear.push(dataObj);
        console.log('HSY', state.hierarchSelectedYear);

        commit('getYears', data);
      });
  },

  _isNotExistYear({ commit, state }, payload) {
    alert('running');
    let b = false;
    state.hierarchSelectedYear.forEach((element) => {
      for (let i = 0; i < element.years.length; i++) {
        if (payload == element.years[i]) {
          b = true;

          break;
        } else {
          b = false;
        }
      }
      if (b) {

      } else {
        state.isNotExistYear.push({ fieldName: element.childName, year: payload });
        console.log('payload  year ', payload);
        // console.log('year.years ', year);
      }

      b = false;
    });
  },

  // forSelectedIndicator({commit}, payload){
  //   commit('selectionIndicator',payload)
  // },

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

  //    async getByProgramAreaData({context, state}, payload){

  //         //(payload);
  //         //(state.indicators);

  //         const selectedData = state.indicators.filter(x => x.program_area == payload);
  //         (selectedData);
  //         /*await axios.get('http://209.182.232.228:7000/api/crud/indicators/')
  //         .then(res => {
  //             const data = res.data

  //             // context.commit('getByProgramAreaData', payload)
  //          context.commit('setRmnchs',data.filter(x=> x.program_area === payload))

  //         }).catch(err => {
  //             (err);
  //         });
  //         */

  //     }
};
