/**
 * Get Config from Dashboard params
 * @param {object} dashboard - dashboard params
 * @returns {string} - dashboard config
 */
function getConfig(dashboard) {
  const dashboardDetails = {
    name: dashboard.name,
    description: dashboard.description,
    category: dashboard.category.replace(' ', '_').toLowerCase(),
  };
  const composedData = [
    {
      parent: { isChildSelected: true },
      children: dashboard.indicators.map((ind) => ({ id: ind, selected: true })),
    },
  ];
  const surveyArray = [
    {
      children: dashboard.datasources.map((dat) => ({ id: dat, selected: true })),
    },
  ];
  const sectionsArray = [
    ...new Set([
      ...dashboard.sections,
      'Indicator Overview',
      'Zonal Analysis',
      'Indicator Comparison',
      'Dataset Comparison',
      'Multi-source Comparison',
    ]),
  ].map((name, id) => ({
    id, name, active: false, isShow: dashboard.sections.includes(name),
  }));
  return {
    dashboardDetails, composedData, surveyArray, sectionsArray,
  };
}

/**
 * Resize Dashboard config object
 * @param {object} config - Dashboard config object
 * @returns {object} - Resized config
 */
export default function resize(config) {
  const indicators = config.composedData.reduce((inds, pa) => inds.concat(pa.children.filter((child) => child.selected).map((child) => child.id)), []);
  const datasources = config.surveyArray.reduce((dats, grp) => dats.concat(grp.children.filter((child) => child.selected).map((child) => child.id)), []);
  const sections = config.sectionsArray
    .sort((a, b) => a.id - b.id)
    .filter((sec) => sec.isShow)
    .map((sec) => sec.name);

  const {
    name, category, description,
  } = config.dashboardDetails;
  return getConfig({
    name,
    category,
    description,
    indicators,
    datasources,
    sections,
  });
}
