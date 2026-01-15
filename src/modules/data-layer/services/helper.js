import apiServices from './ApiServices';
/**
   *
   * @param {string} theDate, a date string in JSON format
   * @returns a date object formatted to fit the API requirements
   */
export const formatDate = (theDate) => {
  const theDateParts = theDate.split('T');
  const theTime = theDateParts[1]?.split('.');
  const date = theDateParts[0];
  if (!theTime) {
    return date;
  // eslint-disable-next-line no-else-return
  } else if (!date) {
    return `${theTime[0]}`;
  }
  const formatted = `${theDateParts[0]} ${theTime[0]}`;
  return formatted;
};

/**
   *
   * @param {array|number} indicators
   * @returns {array} all data objects in the database related to
   * the given indicator(s)
   */
export const getIndicatorsFromApi = async (indicators) => {
  let data;
  if (Array.isArray(indicators)) {
    data = await Promise.all(indicators.map((id) => apiServices.getSingleIndicator(id)));
    return data;
  }
  data = await apiServices.getSingleIndicator(indicators);
  return data;
};
