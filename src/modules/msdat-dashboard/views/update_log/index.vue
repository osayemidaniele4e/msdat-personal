<template>
  <div class="">
    <TheHeader />
    <div class="container-fluid">
      <div class="align-items-center my-3 row work-sans">
        <div class="col-1">
          <b-icon
            @click="$router.go(-1)"
            class="back-icn"
            icon="chevron-left"
          />
        </div>
        <div class="col m-auto text-center">
          <h5 class="font-weight-bold">MSDAT Platform Release Note</h5>
          <p>
            The Platform is updated regularly for optimum experience and data
            quality
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <iframe
            width="100%"
            height="900px"
            src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTPhLZh8bbWsn-qCazbfqVnl30TR4GixSPABmZN9RP6MlMT12urWnu1yjZvi9ItUFONnS6ocLI5TP6X/pubhtml?gid=0&amp;single=true&amp;widget=true&amp;headers=false"
          ></iframe>
        </div>
      </div>
    </div>

    <TheFooter class="footer" />
  </div>
</template>

<script>
import TheHeader from '../about/layout/theHeader.vue';
import TheFooter from '../about/layout/theFooter.vue';

export default {
  name: 'UpdateLog',
  components: {
    TheHeader,
    TheFooter,
  },
};
</script>

<style lang="scss" scoped>
$msdat-green: #007d53;
.back-icn {
  padding: 8px;
  background-color: #007d537f;
  border-radius: 100%;
  font-size: 40px;
  color: #ffffff;
  transition: all 0.4s;

  &:hover {
    background-color: $msdat-green;
  }
}
</style>
