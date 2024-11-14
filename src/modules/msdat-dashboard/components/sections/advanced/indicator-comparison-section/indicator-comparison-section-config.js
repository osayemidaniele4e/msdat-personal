export default {
  label: 'Indicator Comparison',
  setup: [
    {
      class: ['col'],
      type: 'dropdown',
      label: 'compare by',
      key: 'compareBy',
      options: [
        { id: 1, name: 'Period' },
        { id: 2, name: 'State' },
      ],
      dropdownProps: {
        label: 'name',
        'preselect-first': true,
      },
    },
    {
      class: ['col'],
      type: 'dropdown',
      label: 'data Source ',
      key: 'datasource',
      options: [],
      dropdownProps: {
        label: 'datasource',
      },
    },
    {
      visibility: true,
      class: ['col'],
      type: 'dropdown',
      label: 'Year',
      key: 'year',
      dropdownProps: {
        'preselect-first': true,
      },
    },
    {
      visibility: false,
      class: ['col-md-2'],
      type: 'dropdown',
      label: 'location',
      key: 'location',
      dropdownProps: {
        label: 'name',
        // 'preselect-first': true
      },
      options: [],
    },
    {
      type: 'dropdown',
      class: ['col-md-6'],
      label: 'indicator(s)',
      key: 'indicator',
      options: [],
      dropdownProps: {
        multiple: true,
        'track-by': 'id',
        max: 20,
        'group-values': 'indicators',
        'group-label': 'program_area',
        label: 'full_name',
      },
    },
  ],
  payload: {
    indicator: [],
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
