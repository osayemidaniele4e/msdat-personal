/**
 * export to use
 * * dataset comparison control panel configuration
 * ! current configuration has a bug with multi-selection
 * TODO: fix multi select bug - status Done
 */

export default {
  label: 'Dataset Comparison',
  setup: [
    {
      type: 'dropdown',
      class: ['col-md-4'],
      dropdownProps: {
        'group-values': 'indicators',
        'group-label': 'program_area',
        label: 'full_name',
      },
      label: 'indicator(s)',
      key: 'indicator',
      options: [],
    },
    {
      type: 'dropdown',
      class: ['col-md-4', 'col-lg-6'],
      dropdownProps: {
        'group-values': 'options',
        'group-label': 'datasource',
        multiple: true,
        max: 3,
        'preselect-first': true,
        'track-by': 'id',
        label: 'item',
        'allow-empty': false,
      },

      label: 'Data source(s)',
      key: 'datasource',
      options: [],
    },
  ],
  payload: {
    indicator: 'indicator 2',
    location: '',
    datasource: [],
    year: '',
    compareBy: '',
    visualization: 'state_map',
    target: {
      national: true,
      sdg: true,
    },
    numdenum: false,
  },
};
