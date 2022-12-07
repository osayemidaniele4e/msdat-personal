<template>
  <div class="container-fluid d-flex align-items-center justify-content-center h-75">
    <table style="width: 75%" class="table table-light shadow h-20">
      <thead class="thead-dark" style="position: sticky; top: 0">
        <tr>
          <th scope="col">S/N</th>
          <th scope="col">INDICATORS</th>
          <th scope="col">SOURCE</th>
          <th scope="col">VALUE</th>
        </tr>
      </thead>
      <tbody v-for='(el, i) in dataArray' :key="i">
        <pre>{{el.dataSources}}</pre>
        <tr>
          <th scope="row">{{i + 1}}</th>
          <!-- :rowspan="el.dataSources?.length + 1" -->
          <td >{{el.indicator}}</td>
        </tr>
        <tr v-for="et in loop(el.dataSources)" :key='et'>
          <pre>{{et}}</pre>
          <td>{{et.datasource}}</td>
          <td>{{et.value}} %</td>
        </tr>
      </tbody>

      <tbody></tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'IndicatorTable',
  props: {
    dataArray: Array,
  },
  methods: {
    loop(datasource) {
      return datasource;
    },
  },
};

</script>
