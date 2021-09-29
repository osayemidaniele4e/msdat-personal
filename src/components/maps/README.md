## About

## dependencies

- highcharts
- vue-highcharts
- @highcharts/map-collection;

## props
## How to uses
This BaseMap Component is when initialized has a default map object set the option set in the highchart plotOption api visit highchart docs
### example
 ```js
 <BaseMap 
 :mapObject="{
         series :[{
          name: 'Nigeria',
          data: [
            ['Kano', 10],
            ['Delta', 200],
            ['Ondo', 123],
            ['Osun', 45],
            ['Enugu', 780],
            ['Nassarawa', 780],
            ['Federal Capital Territory', 780],
            ['South East',200],
          ],
         }],
          chart:{
            name:'Testing object',
          },
          title:{
            text:'Hello world'
          },
}" 
:level="level" 
:lgaState="'Kano'"  
/>


```