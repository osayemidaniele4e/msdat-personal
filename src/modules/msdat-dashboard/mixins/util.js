import { groupBy } from 'lodash';

export const sortHighChartDataFormat = (a, b) => b[1] - a[1];

export const sortHighChartDataFormat1 = () => {};

/**
     * This return the array of indicators pass in the group and
     * formats to a format compatible for vue-multiselect
     * @param {*} indicators an array of indicator Objects
     * @param {*} by items you wish to group the indicator by
     * @returns
     */
export const groupIndicator = (indicators, by) => {
  const groupedIndicator = groupBy(indicators, by);
  const entries = Object.entries(groupedIndicator);
  const multiSelectFormat = entries.map((item) => ({
    [by]: item[0],
    indicators: item[1],
  }));
  console.log(multiSelectFormat);

  return multiSelectFormat;
};
