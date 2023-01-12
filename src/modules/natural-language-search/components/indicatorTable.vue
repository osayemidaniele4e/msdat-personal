<template>
  <div
    class="
      d-flex m-auto
      align-items-center
      flex-column
    "
    style="max-height: 60vh; width:80vw; overflow: auto; flex-flow:column nowrap"
  >
    <table
      class="table-light shadow table-bordered flex-column w-100"
    >
      <thead class="thead bg-dark text-light p-2">
        <tr>
          <th scope="col">S/N</th>
          <th scope="col">INDICATORS</th>
          <th scope="col">SOURCE</th>
          <th scope="col">VALUES</th>
        </tr>
      </thead>
      <tbody v-for="(el, i) in dataArray" :key="i">
        <!-- <pre>{{el}}</pre> -->
        <tr class="w-100 border">
          <th scope="row"  class='border' :rowspan="100">{{ i + 1 }}</th>
          <th scope='row'  class='border' :rowspan="100">{{ el.indicator }}</th>
        </tr>
        <tr class="w-100 border" v-for="(ef, j) in el.datasourceArr" :key="j">
          <!-- <pre>{{ef}}</pre> -->
          <!-- <td scope="col" :colspan="100"> -->
            <div class='d-flex justify-content-between w-100 '  v-for="(ed, m) in ef.dataValues" :key="m">
              <td> <span><router-link :to='`/indicator-search/datasource-search/${el.indicatorId}/${ed.datasource}/${ed.period}/`'>{{ ef.datasourceName }}</router-link></span>  {{ ed.period }}</td>
              <td>{{ ed.value }} %</td>
            </div>
          <!-- </td> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  name: 'IndicatorTable',
  data() {
    return {};
  },
  props: {
    dataArray: Array,
  },
  methods: {},
};
</script>

<style scoped>
th{
  border: 2px black;
}
</style>
