export default {
    indicators(state) {
        return state.indicators
    },

    getRmnchs(state){
       
        return state.rmnchs;
    },
    getprogramArea(state){
        return state.program_area;
    },

    // ******* Data Source Selection ************** //

    dataSource(state) {
        return state.dataSource
    },
    getDataSource(state){
        
        return state.SurveyArray;
    },

    // ******* Indicators Levels ************** //

    indicatorsLevels(state) {
        return state.levels
    },
    indicatorsYear(state) {
        console.log("State Years Get");
        console.log(state.years);
        return state.years
    },
    
};