export default {
  // getDashboard: 'dashboards/?size=1500',
  getDashboard: 'dashboards/?size=1500',
  getDashboardById: 'dashboards/',
  getDataSource: 'datasources/?size=1500',
  getLocation: 'location/?size=1500',
  getIndicator: 'indicators/?size=1500',
  getLHL: 'location_hierarchy_level/?size=1500',
  getValueType: 'valuetypes/?size=1500',
  getLinks: 'links/?size=1500',
  getFactors: 'factors/?size=1500',
  getDSI: 'datasource_specific_indicator/?size=1500',
  getData: 'data/?size=1500&',
  getUpdatedDataDate: 'after_datetime/?size=1500',
  getNhmisMonthly: `data/?datasource=${30}&page=3&size=1500`, // 30, nhmisMonthly ID
};

// https://msdat-api.fmohconnect.gov.ng/api/datasources/?size=2000&datasource=NHMIS-DHIS2%20(monthly)
/**
 * TODO: find a way to utilize the period indicator query
 */
