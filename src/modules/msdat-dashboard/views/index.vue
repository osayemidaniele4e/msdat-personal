<template>
    <div>
        <h1 @click="runStuff">MSDAT DASHBOARD</h1>
    </div>
</template>

<script>
export default {
  methods: {
    runStuff() {
      this.$DL.setup({
        dashboardIndicators: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 5, 16, 17, 18],
        defaultIndicators: [7, 5, 8],
      });
      this.$DL.init().then(() => {

      });
    },
  },
  created() {
  },
};
</script>

<style lang="scss" scoped>

</style>
