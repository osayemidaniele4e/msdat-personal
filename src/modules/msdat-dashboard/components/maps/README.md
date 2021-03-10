## This is Readme docs for the Map Component

## dependencies

- highcharts
- vue-highcharts
- @highcharts/map-collection;

## props
## how to uses

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