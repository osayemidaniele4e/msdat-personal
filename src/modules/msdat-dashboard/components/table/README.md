# MSDAT Table Component

The MSDAT Table Component represent the MSDAT Table Mockup and its features 

## Description

## Visuals

## Installation

importing the components into your files

```js
import TableComponent from 'form/the/location/of/the/file/TableCompoent';
```

## Slots

| Name      | Description                             |
| --------- | --------------------------------------- |
| `NHMIS-DETAILS` |  The Detail of the MSDAT Data Source usually for the Num denum feature |
| `label`   | Use this slot to set the checkbox label |

## Props

| Name  | Type | Description| Default | Example |
| -------------------------------------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |--------------------------------- |
| `dataObject` *required*                                 | `Array`      | The dataObeject follw its format display the data according the the Table                                                                                                                                                                                                                                                                               |                                   |
| `orderSourceBy` | `Array`    | The has default order the data Sources should be displayed  | `['NHMIS', 'NDHS', 'MICS', 'NARHS', 'IHME', 'IHME SDG'] `  also takes note that the source are also arraged in there order of classification the routine,survery and estimates |  

## Data

| Name           | Type     | Description                                                                        | Initial value |
| -------------- | -------- | ---------------------------------------------------------------------------------- | ------------- |
| `source` | `array` | This  value all source from the data Objected parsed   | `""`          |
| `currentValue` | `string` |                                                                                    | `""`          |

## Events

| Name           | Type     | Description                                                                        | Initial value |
| -------------- | -------- | ---------------------------------------------------------------------------------- | ------------- |
| `source:clicked` | `sting` | emits the dataSource Click   | `""`          |
| `source-info:clicked` |    `string`|  emit when data Source info is clicked                                                                                  | `""`          |

## Methods

### getValueForColumn()

The Return the DataValue object from an array of data


## Support

None of the features and implementation are set as stone so if have an idea or a better approach to using this components please reach out to your team lead or who ever is in charge.


## Roadmap



## Contributing

please feel free to summit MERge Request for any modification you require

## Usage



## Contributing



## License
[MIT](https://choosealicense.com/licenses/mit/)

use `ctrl+shift+v` to preview in MD file