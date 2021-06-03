## Bar Chart Component
The Bar Chart component is a wrapper of og the vue highchart component

The  Barchart is the source of truth. As the name implies, it houses our base component. It is however subject to receiving a prop `barObject`; as highlighted in the section above. `barObject` on its end, basically houses the chart optios which are gotten from the official high charts documentation  [official high charts documentation](https://www.highcharts.com/docs/index ) 

## Dependencies
- highcharts
- vue-highcharts
- @highcharts/map-collection;

## install

```js 
import BarChart from '../path/to/the/component/'


 components: {
    BaseBar,
  },


```
## Usage
```js
<template>
  <div>
    <BaseBar :chartOptions="yourBarObjectOptions" />
  </div>
</template>

<script>
export default{
 data() {
    return {
      barObject: {
        title: {
          text: 'HELLO',
        },
      },
    };
  },
}

</script>
```

### Caveat

Because of some limitation in javascript passing
object key created dynamically will not have reactivity avaliabl to them
please read the vue doc for more info

there they way to pass data into the **chartOptions**  Props
should be this
```js
 this.yourBarObjectOptions.series = ['10',20];
 this.yourBarObjectOptions = { ...this.yourBarObjectOptions }; 
```

OR
you could create a new object 

```js
 this.yourBarObjectOptions = Object.assign({},this.yourBarObjectOptions);
 ```

 
<br /><br />
## Props

| Name            | Type            | Description                                                                                                                                                  | Default                      |
| --------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------- |
| `chartOptions`       | `Array`        |  This Take an object of the map options | [default HighchartOption](./defaultOption.js)  

<br /><br />

## Need to Know
The BaseChart does not require you to pass the whole HighchartOption object therefore depending on the object key you wise to change that alone can be overrides

<br /><br />



**Example**

```js
<template>
  <div>
    <BaseBar :chartOptions="barObject" />
  </div>
</template>

<script>
import BaseBar from './BaseBarChart.vue';

export default {
  components: {
    BaseBar,
  },

  data() {
    return {
      barObject: {
        title: {
          text: 'HELLO',
        },
      },
    };
  },
};
</script>

```
    

**Note**
use `ctrl+shift+v` to preview Md file in vscode
