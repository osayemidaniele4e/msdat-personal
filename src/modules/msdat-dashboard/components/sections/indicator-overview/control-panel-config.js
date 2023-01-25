export default {
  label: 'Indicator Overview',
  setup: [
    {
      type: 'dropdown',
      class: ['col-md-4 step-indicator'],
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
      class: ['col-lg col-md-2 col-4 step-datasource'],
      type: 'dropdown',
      label: 'data Source',
      key: 'datasource',
      dropdownProps: {
        label: 'datasource',
      },
      options: [],
    },
    {
      class: ['col-lg col-md-2 col-4 step-location'],
      type: 'dropdown',
      label: 'location',
      key: 'location',
      dropdownProps: {
        label: 'name',
      },
      options: [],
    },
    {
      class: ['col-lg col-md-2 col-4'],
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
    {
      class: ['col mx-sm-3'],
      type: 'toggle',
      label: 'Num/Denom',
      key: 'numdenum',
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
