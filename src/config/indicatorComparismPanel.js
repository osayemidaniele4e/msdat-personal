/**
 * export to use
 * * indicator comparism control panel configuration
 */
export default [
  {
    label: 'indicator comparison',
    setup: [
      {
        class: ['col'],
        type: 'dropdown',
        label: 'compare by',
        key: 'location',
        options: [],
        dropdownProps: {
          label: 'name',
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
        class: ['col-md-1'],
        type: 'dropdown',
        label: 'Year',
        key: 'year',
        dropdownProps: {
          'preselect-first': true,
        },
        options: [],
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
  },

];
