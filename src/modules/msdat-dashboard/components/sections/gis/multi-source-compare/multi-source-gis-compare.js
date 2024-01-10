const indicatorSetConfig = [
  {
    type: 'dropdown',
    class: ['col-md-12'],
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
  {
    class: ['col-md-4'],
    type: 'dropdown',
    label: 'Year',
    key: 'year',
    options: [],
    dropdownProps: {
      'preselect-first': true,
    },
  },
];
const indicatorSetConfig2 = [
  {
    type: 'dropdown',
    class: ['col-md-12'],
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
  {
    class: ['col-md-4'],
    type: 'dropdown',
    label: 'Year',
    key: 'year',
    options: [],
    dropdownProps: {
      'preselect-first': true,
    },
  },
];
const indicatorSetConfig3 = [
  {
    type: 'dropdown',
    class: ['col-md-12'],
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
  {
    class: ['col-md-4'],
    type: 'dropdown',
    label: 'Year',
    key: 'year',
    options: [],
    dropdownProps: {
      'preselect-first': true,
    },
  },
];
const payload = {
  indicator: 'indicator 2',
  location: '',
  datasource: 'NHMIS 1',
  year: '',
  compareBy: '',
  visualization: 'line',
  target: {
    national: false,
    sdg: false,
  },
  numdenum: false,
};

export default {
  label: 'Multi-Source Comparison',
  grouped: true,
  setup: [[...indicatorSetConfig], [...indicatorSetConfig2], [...indicatorSetConfig3]],
  payload: [{ ...payload }, { ...payload }, { ...payload }],
};
