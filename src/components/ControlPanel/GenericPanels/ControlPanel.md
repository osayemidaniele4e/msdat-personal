# Control Panel
The Control Panel component encompassed the [SelectDropdown](./SelectDropdown.md) the Toggle an National target checkbox. follow the MSDAT design mockup it loop through all the inputs for a single control panel

## Diagram


## Props

| Name               | Type     | Description   | Default   |
| ------------------ | -------- | ------------- | --------- |
| `setup` | `Array`  | The setup prop take an object for the of a control panel and all it required feature|
| `defaultIndicator` | `Array`  | This takes in the default indicator for initialization usually and indicator object | 
| `defaultDataSource` | `Array`  |  This takes in the default datasource for initialization usually and datasource object |
| `defaultLocation` | `Array`  | This takes in the default location for initialization usually and locations object|
| `defaultYear` | `String`  | This takes in the default year for initialization using a string|
 

 ## more the setup
 ```js
[
      {
        label: 'indicator Overview',
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
            label: 'indicator 1',
            key: 'indicator',
            options: [],
          },
          {
            class: ['col'],
            type: 'dropdown',
            label: 'data Source',
            key: 'datasource',
            dropdownProps: {
              label: 'datasource',
            },
            options: [],
          },
          {
            class: ['col'],
            type: 'dropdown',
            label: 'location',
            key: 'location',
            dropdownProps: {
              label: 'name',
            },
            options: [],
          },
          {
            class: ['col'],
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
            class: ['col'],
            type: 'toggle',
            label: 'Num/Denum',
            key: 'numdenum',
          },
        ],
      },
      {
        label: 'indicator Overview 2',
        setup: [
          {
            type: 'dropdown',
            class: ['col-md-4'],
            label: 'indicator 1',
            key: 'indicator',
            options: [],
            dropdownProps: {
               multiple: true,
              'group-values': 'indicators',
              'group-label': 'program_area',
              label: 'short_name',
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
            label: 'location',
            key: 'location',
            options: [],
            dropdownProps: {
              label: 'name',
            },
          },
          {
            class: ['col'],
            type: 'dropdown',
            label: 'Year',
            key: 'year',
            dropdownProps: {
              'preselect-first': true,
            },
            options: [],
          },
          {
            class: ['col'],
            type: 'checkbox',
            label: 'Target',
            key: 'target',
          },
          {
            class: ['col'],
            type: 'toggle',
            label: 'Num/Denum',
            key: 'numdenum',
          },
        ],
      },
    ]
```

### explanation of the key  available  in the setup object

| Name   | Type     | Description  | example   |
| -------| -------- | ------------ | --------- |
| `label` | `string`| this is the title of the control panel passed into the base [ControlBase Component](../BaseComponents/ControlBase.vue) |
| `setup` | `array`| this is array of allowing the you set the form component that will exist in the Panels  |
| `setup[].key` | `string`| The set the the available key to unique identify the each form input component | available keys "{indicator,datasource,year,numdenum,target}"  |
| `setup[].type` | `string`| The type of input that you will to see | available input "{dropdown,toggle,checkbox}"|
| `setup[].class` | `Array`| An array of classes to be added on the form component |
| `setup[].dropdownProps`| `Object`| Prop to be passed to the multi-select component |
  



## Contributing

## License

> use **ctrl+shift+v** to preview in MD file
