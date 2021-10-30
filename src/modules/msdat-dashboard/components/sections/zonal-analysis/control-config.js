export default {
  label: 'Zonal analysis',
  setup: [
    {
      type: 'dropdown',
      class: ['col-md-4'],
      dropdownProps: {
        // multiple: true,
        'group-values': 'indicators',
        'group-label': 'program_area',
        label: 'short_name',
      },
      label: 'indicator',
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
      options: ['2015', '2010'],
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
      national: false,
      sdg: false,
    },
    numdenum: false,
  },
};
