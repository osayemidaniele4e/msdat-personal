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
      visibility: false,
      class: ['col'],
      type: 'dropdown',
      label: 'Year',
      key: 'year',
      options: [
        { id: 1, year: '2010' },
        { id: 2, year: '2015' },
      ],
      dropdownProps: {
        preselectFirst: true,
      },
    },
    {
      visibility: true,
      class: ['col-md-2'],
      type: 'dropdown',
      label: 'location',
      key: 'location',
      dropdownProps: {
        label: 'name',
        // preselectFirst: true
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
        max: 2,
        'group-values': 'indicators',
        'group-label': 'program_area',
        label: 'full_name',
      },
    },
    // {
    //   class: ['col'],
    //   type: 'checkbox',
    //   label: 'Target',
    //   key: 'target',
    // },
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
