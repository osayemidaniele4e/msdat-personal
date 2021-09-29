import mutations from './mutations';
import actions from './actions';
import getters from './getters'

export default{
    namespaced: true,
    state(){
        return{
            indicators: [],
            dataSource: [],
            rmnchs:[],
            program_area: [],
            SurveyArray: [],
            levels: [],
            years: [],
            indicatorValue: ''
        }
    },
    mutations,
    actions,
    getters 
}