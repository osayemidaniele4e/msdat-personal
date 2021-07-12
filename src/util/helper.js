import moment from 'moment';

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
