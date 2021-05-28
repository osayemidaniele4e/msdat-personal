/* eslint-disable import/prefer-default-export */
/**
   *
   * @param {string} theDate, a date string in JSON format
   * @returns a date object formatted to fit the API requirements
   */
export const formatDate = (theDate) => {
  const theDateParts = theDate.split('T');
  const theTime = theDateParts[1].split('.');
  const formatted = `${theDateParts[0]} ${theTime[0]}`;
  return formatted;
};

// export const formatDate2 = (theDate) => {
//   const theDateParts = theDate.split('T');
//   const theTime = theDateParts[1].split('.');
//   const formatted = `${theDateParts[0]} ${theTime[0]}`;
//   console.log(formatted);
//   return formatted;
// };
