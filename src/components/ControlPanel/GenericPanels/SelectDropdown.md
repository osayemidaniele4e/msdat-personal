# Select DropDown

The select dropdown is a wrapper of the vue multi-select [multiselect-dropdown](https://vue-multiselect.js.org/) dropdown

## Installation

Importing the components into your files

```js
import SelectDropDown from 'form/the/location/of/the/file/SelectDropdown';

export default {
  component: {
    SelectDropDown
  }
};
```

## Props

| Name               | Type     | Description   | Default   |
| ------------------ | -------- | ------------- | --------- |
| `multiSelectProps` | `Object` | The allow us to pass props related to the multi-select in form of an object|
 
## example using the prop
```js
 {
    multiple: true,
    'group-values': 'indicators',
    'group-label': 'program_area',
    label: 'short_name',
},

```
**Note**

> You also use v-model on the component to watch you data

## Contributing

## License

> use **ctrl+shift+v** to preview in MD file
