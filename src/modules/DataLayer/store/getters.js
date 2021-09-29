export default {

  indicators: (state) => state.data.filter((indicator) => indicator.datasource === 8),
};
