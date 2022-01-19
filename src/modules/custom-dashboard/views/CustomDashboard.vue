<template>
  <div>
    <customDashboard
      v-if="Object.entries(configObject).length"
      :indicators="configObject.indicators"
      :dataSources="configObject.dataSources"
      :defaultIndicators="configObject.defaultIndicators"
      :initialIndicator="configObject.initialIndicator"
      :initialDataSource="configObject.initialDataSource"
      :initialLocation="configObject.initialLocation"
      :fields="fieldsArray"
    />
  </div>
</template>

<script>
// import instance from '../components/Custom-dashboard-sections/Instance.vue';
// Using the current msdat instance
import instance from '../../msdat-dashboard/views/dashboard/instance.vue';

export default {
  components: {
    customDashboard: instance,
  },
  data() {
    return {

    };
  },

  watch: {
    // configObject(newVal) {
    //   console.log('watch', newVal);
    // deep: true,
    // eslint-disable-next-line object-shorthand
    // handler: function (newVal) {
    //   console.log('sswwd', Val);
    // },
    // },
  },
  // mounted() {
  //   const configObjects = {
  //     name: 'Health_Outcomes',
  //     title: 'Health Outcomes and Service Coverage',
  //     indicators: [
  //       1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
  //       27, 28, 29, 30, 31, 32, 33,
  //     ],
  //     defaultIndicators: [7, 6, 5],
  //     dataSources: [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 15, 16],
  //     initialIndicator: 7,
  //     initialDataSource: 6,
  //     initialLocation: 1,
  //   };
  // },
  computed: {
    fieldsArray() {
      return this.$store.getters.arrangedSections;
    },
    configObject() {
      const configObjects = {
        name: 'Health_Outcomes',
        title: 'Health Outcomes and Service Coverage',
        indicators: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
          27, 28, 29, 30, 31, 32, 33,
        ],
        defaultIndicators: [7, 6, 5],
        dataSources: [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 15, 16],
        initialIndicator: 7,
        initialDataSource: 6,
        initialLocation: 1,
      };
      const ids = [];
      const sourcesID = [];
      // For setting the Indicators
      this.$store.getters.getprogramArea.map((element) => {
        if (element.parent.isChildSelected === true) {
          element.children.map((child) => {
            if (child.selected === true) {
              ids.push(child.id);
            }
            return child;
          });

          console.log('ids', ids);
        }
        return element;
      });
      configObjects.indicators = ids;
      configObjects.initialIndicator = configObjects.indicators[0];

      // For Setting the Datasources
      this.$store.getters.getDataSource.map((element) => {
        element.children.map((child) => {
          if (child.selected === true) {
            sourcesID.push(child.id);
          }
          return child;
        });
        return element;
      });
      configObjects.dataSources = sourcesID;
      configObjects.initialDataSource = configObjects.dataSources[0];
      console.log('configObjects', configObjects);
      return configObjects;
    },
  },
};
</script>
