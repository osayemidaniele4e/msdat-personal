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
      <tbody>
        <tr>
          <th scope="row" rowspan="5">1</th>
          <td rowspan="5">under 5 mortality rate</td>
        </tr>
        <tr>
          <td>MICS 2010</td>
          <td>50%</td>
        </tr>
         <tr>
          <td>MICS 2010</td>
          <td>50%</td>
        </tr>
        <tr>
          <td>MICS 2010</td>
          <td>50%</td>
        </tr>
      </tbody>

      <tbody></tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'IndicatorTable',
};
</script>
