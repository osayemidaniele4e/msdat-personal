<template>
  <div
    class="
      container-fluid
      d-flex
      align-items-center
      justify-content-center
    "
  >
    <table
      class="table table-light shadow table-bordered"
    >
      <thead class="thead-dark">
        <tr>
          <th scope="col">S/N</th>
          <th scope="col">INDICATORS</th>
          <th scope="col">SOURCE</th>
          <th scope="col">VALUES</th>
        </tr>
      </thead>
      <tbody v-for="(el, i) in dataArray" :key="i">
        <tr class="">
          <th scope="row" :rowspan="100">{{ i + 1 }}</th>
          <th scope='row' :rowspan="100">{{ el.indicator }}</th>
        </tr>
        <tr v-for="(ef, j) in el.datasourceArr" :key="j">
          <td scope="col" :colspan="100">
            <div class='d-flex justify-content-around' v-for="(ed, m) in ef.dataValues" :key="m">
              <td class=""> <span>{{ ef.datasourceName }}</span>  {{ ed.period }}</td>
              <td>{{ ed.value }} %</td>
            </div>
          </td>
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
