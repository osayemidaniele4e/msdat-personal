<template>
  <div>
    <main class="container main_field">
      <Tableau :url="url" :width="width" :height="height" ref="tableau"></Tableau>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Testing',
  components: {},
  data() {
    return {
      url: 'https://public.tableau.com/views/UpdatedDemographic1/Population',
      width: '100vw',
      height: '70vh',
    };
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
main.main_field {
  min-height: 45vh;
  width: 100%;
}
</style>
