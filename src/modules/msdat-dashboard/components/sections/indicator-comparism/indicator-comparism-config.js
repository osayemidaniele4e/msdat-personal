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
        { id: 2, name: 'National' },
        { id: 3, name: 'Zonal' },
        { id: 4, name: 'State' },
        { id: 5, name: 'State & All Datasources' },
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
      visibility: false,
      class: ['col'],
      type: 'dropdown',
      label: 'Period',
      key: 'year',
      // options: [
      //   { id: 1, year: '2010' },
      //   { id: 2, year: '2015' },
      // ],
      dropdownProps: {
        'preselect-first': true,
      },
      options: [],
    },
    {
      visibility: true,
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
        'preselect-first': false,
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
