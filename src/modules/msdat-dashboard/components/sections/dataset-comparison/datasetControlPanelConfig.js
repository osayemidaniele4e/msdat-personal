/**
 * export to use
 * * dataset comparism control panel configuration
 * ! currrent configuration has a bug with multi-selection
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
        label: 'short_name',
      },
      label: 'indicator',
      key: 'indicator',
      options: [],
    },
    {
      type: 'dropdown',
      class: ['col-md-4'],
      dropdownProps: {
        multiple: true,
        label: 'datasource',
        'track-by': 'id',
      },
      label: 'Data source(s)',
      key: 'datasource',
      options: [],
    },
  ],
  defaults: {
    indicator: null,
    dataSource: null,
    location: null,
    year: null,
  },
};
