export default {
  label: 'Zonal Analysis',
  setup: [
    {
      type: 'dropdown',
      class: ['col-md-4'],
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
      class: ['col-md-2'],
      type: 'dropdown',
      label: 'location',
      key: 'location',
      dropdownProps: {
        label: 'name',
      },
      options: [],
    },
    {
      class: ['col-md-2'],
      type: 'dropdown',
      label: 'data Source',
      key: 'datasource',
      dropdownProps: {
        label: 'datasource',
      },
      options: [],
    },
    {
      class: ['col-md-2'],
      type: 'dropdown',
      label: 'Year',
      key: 'year',
      options: [],
      dropdownProps: {
        'preselect-first': true,
      },
    },
    {
      class: ['col'],
      type: 'checkbox',
      label: 'Target',
      key: 'target',
    },
  ],
  payload: {
    indicator: 'indicator 2',
    location: '',
    datasource: 'NHMIS 1',
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
