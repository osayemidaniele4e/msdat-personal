<template>
  <div class="datasource-container">
    <div @click="closeComponent" class="close-btn">
      <img src="../../../assets/svg/close-circle.svg" alt="" />
    </div>
    <h1 @click="fetchDataSources">Availabe Datasources</h1>

    <div v-for="data in datasources" :key="data.id" class="">
      <p>{{ data.datasource }}</p>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      datasources: [],
    };
  },
  methods: {
    ...mapMutations('MSDAT_STORE', ['toggleShowDataSourceList', 'closeShowDataSourceList']),
    async fetchDataSources() {
      const dataSources = this.dlGetDashboardDataSource();
      this.datasources = dataSources;
    },
    closeComponent() {
      this.closeShowDataSourceList();
    },
  },
  mounted() {
    this.fetchDataSources();
  },
};
</script>

<style lang="scss" scoped>
.datasource-container {
  position: relative;
  border: 1px solid #c3c3c3;
  background-color: white;
  height: 100%;
  width: 300px;
  border-radius: 10px;
  padding: 20px;
  overflow-y: auto;
  h1 {
    font-size: 16px;
  }
  h2 {
    font-size: 14px;
    font-weight: bold;
  }
}

.close-btn {
  position: absolute;
  top: 1px;
  right: 3px;
}

.close-btn img {
  width: 25px;
  height: 25px;
  cursor: pointer;
}
</style>
