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
    return {
      configObjects: {
        name: 'Health_Outcomes',
        title: 'Health Outcomes and Service Coverage',
        indicators: [],
        defaultIndicators: [],
        dataSources: [],
        initialIndicator: 0,
        initialDataSource: 0,
        initialLocation: 1,
      },

    };
  },

  computed: {
    fieldsArray() {
      return this.$store.getters.arrangedSections;
    },
    configObject() {
      const ids = [];
      const sourcesID = [];
      // For setting the Indicators
      this.$store.getters.getprogramArea.map((element) => {
        if (element.parent.isChildSelected == true) {
          element.children.map((child) => {
            if (child.selected == true) {
              ids.push(child.id);
            }
          });

          console.log('ids', ids);
        }
      });
      this.configObjects.indicators = ids;
      this.configObjects.initialIndicator = this.configObjects.indicators[0];

      // For Setting the Datasources
      this.$store.getters.getDataSource.map((element) => {
        element.children.map((child) => {
          if (child.selected == true) {
            sourcesID.push(child.id);
          }
        });
      });
      this.configObjects.dataSources = sourcesID;
      this.configObjects.initialDataSource = this.configObjects.dataSources[0];
      console.log('configObjects', this.configObjects);
      return this.configObjects;
    },
  },
};
</script>
