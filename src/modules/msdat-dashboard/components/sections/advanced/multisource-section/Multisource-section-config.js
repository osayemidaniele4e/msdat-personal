const programAreaSetConfig = [
  {
    type: 'dropdown',
    class: ['col-md-12'],
    dropdownProps: {
      // multiple: true,
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
    options: ['2015', '2010'],
    dropdownProps: {
      'preselect-first': true,
    },
  },
];
const payload = {
  indicator: '',
  location: '',
  datasource: '',
  year: '',
  compareBy: '',
  visualization: '',
  target: {
    national: false,
    sdg: false,
  },
  numdenum: false,
};
export default {
  label: 'Multi-Source Indicator Comparison',
  grouped: true,
  setup: [[...programAreaSetConfig], [...programAreaSetConfig], [...programAreaSetConfig]],
  payload: [{ ...payload }, { ...payload }, { ...payload }],
};
