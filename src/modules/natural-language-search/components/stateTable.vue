<template>
  <div class="container-fluid">
    <!-- <pre>{{ optionsArray }}</pre> -->
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">S/N</th>
          <th scope="col">STATES</th>
          <th scope="col">VALUES</th>
        </tr>
      </thead>
      <tbody>
        <tr  v-for="(el, i) in optionsArray" :key="i">
          <th scope="row">{{i+1}}</th>
          <td>{{el[0]}}</td>
          <td>{{el[1]}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'StateTable',
  props: {
    optionsArray: Array,
    details: Array,
  },
};
</script>

<style>
</style>
