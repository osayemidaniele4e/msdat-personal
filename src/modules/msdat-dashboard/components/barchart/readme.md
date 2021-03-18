## Barchart Component

## Dependencies
- highcharts
- vue-highcharts
- @highcharts/map-collection;

<br /><br />
## Props

| Name            | Type            | Description                                                                                                                                                  | Default                      |
| --------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------- |
| `barObject`       | `Array`        |  This Take an object of the map options |   

<br /><br />

## Need to Know
The Base Barchart is the source of truth. As the name implies, it houses our base component. It is however subject to receiving a prop `barObject`; as highlighted in the section above. `barObject` on its end, bascically houses the chart optios which are gotten from the official high charts documentation  [official high charts documentation](https://www.highcharts.com/docs/index ) 

<br /><br />



**Example**

```js
<template>
  <div>
    <BaseBar :barObject="barObject" />
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
      barObject: {},
    };
  },
};
</script>

```
    

**Note**
use `ctrl+shift+v` to preview Md file in vscode
