import axios from 'axios';

export default {

    async loadIndicators({ commit }, payload, state) {
        await axios.get('http://135.181.212.168:9234/api/crud/indicators/')
            .then(res => {
                const data = res.data;
                commit('setIndicators', data)

                const array = data.map(pArea => pArea.program_area)
                let distinctArray = [...new Set(array)];
                let composedData = [];

                distinctArray.map((distItem => {
                    composedData.push({ children: data.filter(x => x.program_area == distItem), parent: distItem })
                }))
                console.table(composedData);
                commit('setPArea', composedData)

                //commit('setRmnchs',data.filter(x=> x.program_area === state.indicatorValue))

            }).catch(err => {
                (err);
            });

    },
    async loadDataSource({ commit }, payload) {
        await axios.get('http://135.181.212.168:9234/api/crud/datasources/')
            .then(res => {
                const data = res.data

                commit('setDataSource', data)

                const array = data.map(dArea => dArea.classification)


                const distinctDataArray = [...new Set(array)]
                let SurveyArray = [];

                distinctDataArray.map((distItem => {
                    SurveyArray.push({ children: data.filter(x => x.classification == distItem), parent: distItem })
                }))
                console.table(SurveyArray);
                commit('setDArea', SurveyArray)
                // commit('setRmnchs',data.filter(x=> x.program_area === 'RMNCH'))

            }).catch(err => {
                (err);
            });

    },
    async loadCoverageLevels({ commit }, payload) {
        await axios.get('http://135.181.212.168:9234/api/crud/datasource_specific_indicator/'+ payload)
            .then(res => {
                let data = res.data
                
            console.log(data);
                commit('getLevels', data)
            })
    },

    async loadYears({ commit }, payload) {
        await axios.get('http://135.181.212.168:9234/api/crud/indicators/'+payload+'/years_available/')
            .then(res => {
                const data = res.data
                

                commit('getYears', data)
            })
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
}