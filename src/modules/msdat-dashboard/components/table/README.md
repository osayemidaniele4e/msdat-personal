# MSDAT Table Component


## Description
The MSDAT Table Component represent the MSDAT Table Mockup and its features
## Visuals

## Installation

Importing the components into your files

```js
import TableComponent from "form/the/location/of/the/file/TableCompoent";
```

## Slots

| Name            | Description                                                           |
| --------------- | --------------------------------------------------------------------- |
| `NHMIS-DETAILS` | The Detail of the MSDAT Data Source usually for the Num denum feature |                          
| `indicator-*`   | This gives you access to the indicators column and data based on the data|

**Note**
 > The for the **inicator- ** slot are listed as the data parsed is order;
 > there indictor-1 is taking for the first indicator


## Props

| Name   | Type    | Description  | Default  |
| ------ | ------- | --------- | ------------|
| `dataArray` _required_ | `Array` | The dataObject follows a format to display the data according on the Table|                                                                                                                                                     |
| `orderSourceBy`         | `Array` | The has default order the data Sources should be displayed                | `['NHMIS', 'NDHS', 'MICS', 'NARHS', 'IHME', 'IHME SDG']`|

**Note**
 > The for the **dataObject** Prop the  arranged the first indicator of index 0 is taking to be the main indicator

**Note**
 > The for the **OrderSourceBy** Prop are arranged in there order of classification. routine, survery and estimates
## Data

| Name           | Type     | Description                                         | Initial value |
| -------------- | -------- | --------------------------------------------------- | ------------- |
| `source`       | `array`  | This value all source from the data Objected parsed | `""`          |
| `currentValue` | `string` |                                                     | `""`          |

## Events

| Name                     | Description                                         | value |
| ------------------------ | --------------------------------------------------- | ----- |
| `source:clicked`         | emits the dataSource Click                          |       |
| `source-info:clicked`    | emit when data Source info is clicked               |       |
| `indicator-info:clicked` | emit when the indicator info source info is clicked |       |
| `reset-table`            | emit when table reset button is clicked             | NULL  |

## Methods

### getValueForColumn(valueArray, column)

get the values for a particular column

**Syntax**

```js
getValueForColumn(valueArray, column) : Object|NULL
```

### getAvailableDataSources()
The Check and set the available data source in the Object passed the values for a particular column
**Syntax**

```js
getAvailableDataSources(): void
```

### getDataSourcesClassification()


This classifies the data sources based on the data parse into there various classification 

**Syntax**

```js
getDataSourcesClassification(): void
```
## Support

None of the features and implementation are set as stone so if have an idea or a better approach to using this components please reach out to your team lead or who ever is in charge.

## Roadmap

## Contributing

please feel free to summit Merge Request for any modification you require

## Usage
```js
     <table-component :dataArray="exampleData">
          <template #NHMIS-DETAILS>
            <div class="nhmis-details d-flex justify-content-between align-items-center">
              <div class="d-flex">
                <span class="mr-1">nhmis</span> <span>2016</span>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <b>numerator:</b>
                  <span>Total number of doses - 858,814</span>
                </div>
                <div>
                  <b>denominator:</b>
                  <span>total number of children - 923,456</span>
                </div>
              </div>
            </div>
          </template>
          
          <!-- main indicator dropdown select -->
          <template
            v-for="(n, index) in ['indicator-0', 'indicator-1', 'indicator-2']"
            v-slot:[n]
          >
            <select
              :key="index"
              @change="indicatorChanged"
              v-model="selectedIndicator"
              :class="`indicator-${index}`"
            >
              <optgroup>
                <option class="indicator-group" disabled>mortality</option>
                <option
                  class="py-3"
                  value="skilled attendance at delivery or birth"
                >skilled attendance at delivery Or birth</option>
                <option
                  class="py-3"
                  value="skilled attendance at delivery or birth2"
                >skilled attendance at delivery Or birth2</option>
              </optgroup>
            </select>
          </template>
        </table-component>
```

## Contributing

## License



> use **ctrl+shift+v** to preview in MD file
