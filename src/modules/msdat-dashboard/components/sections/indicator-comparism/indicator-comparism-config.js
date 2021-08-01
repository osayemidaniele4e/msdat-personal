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
        preselectFirst: true,
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
      class: ['col'],
      type: 'dropdown',
      label: 'Year',
      key: 'year',
      options: [
        { id: 1, year: '2010' },
        { id: 2, year: '2015' },
      ],
      dropdownProps: {
        'track-by': 'id',
        label: 'year',
        preselectFirst: true,
      },
    },
    {
      type: 'dropdown',
      class: ['col-md-6'],
      label: 'indicator',
      key: 'indicator',
      options: [],
      dropdownProps: {
        multiple: true,
        'track-by': 'id',
        max: 2,
        'group-values': 'indicators',
        'group-label': 'program_area',
        label: 'short_name',
      },
    },
    {
      class: ['col'],
      type: 'checkbox',
      label: 'Target',
      key: 'target',
    },
  ],
  defaults: {
    indicator: null,
    dataSource: null,
    location: null,
    year: null,
  },
};
