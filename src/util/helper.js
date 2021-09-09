import moment from 'moment';
import { groupBy } from 'lodash';

export const formatFactor = (key) => {
  let displayFactor = '';
  switch (key) {
    case 'in percentage':
      displayFactor = '%';
      break;
    default:
      displayFactor = '';
      break;
  }
  return displayFactor;
};

export const isDataYearly = (item) => moment(item, 'YYYY', true).isValid();

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
