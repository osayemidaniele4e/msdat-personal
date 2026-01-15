/**
 * Get Config string from a Dashboard Form
 * @param {object} dashboard
 * @returns {string} - dashboard config
 */
export function getConfig(dashboard) {
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
    id,
    name,
    active: false,
    isShow: dashboard.sections.includes(name),
  }));
  return JSON.stringify({
    dashboardDetails,
    composedData,
    surveyArray,
    sectionsArray,
  });
}

/**
 * Get dashboard Form from dashboard object returned from database
 * @param {object} dashboard
 * @returns {object} - Dashboard Form
 */
export function getForm(dashboard) {
  const params = JSON.parse(dashboard.config);
  const indicators = params.composedData.reduce(
    (inds, pa) =>
      // eslint-disable-next-line implicit-arrow-linebreak
      inds.concat(pa.children.filter((child) => child.selected).map((child) => child.id)),
    [],
  );
  const datasources = params.surveyArray.reduce(
    (dats, grp) =>
      // eslint-disable-next-line implicit-arrow-linebreak
      dats.concat(grp.children.filter((child) => child.selected).map((child) => child.id)),
    [],
  );
  const sections = params.sectionsArray
    .sort((a, b) => a.id - b.id)
    .filter((sec) => sec.isShow)
    .map((sec) => sec.name);
  // eslint-disable-next-line
  const { id, indicator, datasource, created, name_of_dashboard, category, description } =
    dashboard;
  return {
    id,
    created,
    name: name_of_dashboard,
    category: category
      .split('_')
      .map((text) => text[0].toUpperCase() + text.slice(1))
      .join(' '),
    description,
    indicator: indicator || indicators[0],
    datasource: datasource || datasources[0],
    indicators,
    datasources,
    sections,
  };
}
