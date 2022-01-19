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
import instance from '../components/Custom-dashboard-sections/Instance.vue';

export default {
  components: {
    customDashboard: instance,
  },
  data() {
    return {};
  },

  watch: {
    // configObject(newVal) {
    //   console.log('watch', newVal);
    //   // deep: true,
    //   // eslint-disable-next-line object-shorthand
    //   // handler: function (newVal) {
    //   //   console.log('sswwd', Val);
    //   // },
    // },
  },

  computed: {
    fieldsArray() {
      return this.$store.getters.arrangedSections;
    },
    configObject() {
      const configObjects = {
        name: 'Health_Outcomes',
        title: 'Health Outcomes and Service Coverage',
        indicators: [],
        defaultIndicators: [],
        dataSources: [],
        initialIndicator: 0,
        initialDataSource: 0,
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
