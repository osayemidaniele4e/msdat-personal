const indicatorSetConfig = [
  {
    type: 'dropdown',
    class: ['col-md-12'],
    dropdownProps: {
      // multiple: true,
      'group-values': 'indicators',
      'group-label': 'program_area',
      label: 'full_name',
    },
    label: 'indicator',
    key: 'indicator',
    options: [],
  },
  {
    class: ['col-md-12'],
    type: 'visualization',
    label: 'select visualizations',
    key: 'visualization',
  },
  {
    class: ['col-md-4'],
    type: 'dropdown',
    label: 'data Source',
    key: 'datasource',
    dropdownProps: {
      label: 'datasource',
    },
    options: [],
  },
  // {
  //   class: ['col-md-4'],
  //   type: 'dropdown',
  //   label: 'location',
  //   key: 'location',
  //   dropdownProps: {
  //     label: 'name',
  //   },
  //   options: [],
  // },
  {
    class: ['col-md-4'],
    type: 'dropdown',
    label: 'Year',
    key: 'year',
    options: ['2015', '2010'],
    dropdownProps: {
      'preselect-first': true,
    },
  },
];
export default {
  label: 'Multi-source comparison',
  setup: [indicatorSetConfig, indicatorSetConfig, indicatorSetConfig],
  defaults: {
    indicator: null,
    dataSource: null,
    location: null,
    year: null,
  },
};
