<template>
  <div>
    <the-header ref="theHeader" />
 
    <div class="main d-flex flex-column">
      <br>
         <!-- <span>
          <b-icon-info-circle-fill />
      Dashboard developed by NCDC to show the outbreak of diseases across states in Nigeria from 2006 - 2021.
    </span> -->
      <base-sub-card :backgroundColor="'header'" class="my-2 shadow-sm base">
        <template #title>
          <h5 class="font-weight-bold work-sans text-white">National Data Repository Dashboard 1</h5>
        </template>
        
        <b-embed type="iframe" aspect="16by9" :src="url" :width="width" :height="height"></b-embed>
      </base-sub-card>
    </div>
    <the-footer />
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import theHeader from '../../about/layout/theHeader.vue';
import theFooter from '../../about/layout/theFooter.vue';

export default {
  name: 'NCDC',
  components: {
    theHeader,
    theFooter,
  },
  data() {
    return {
      title: '',
      configObject: {}, // This should be an Object initially
      url: 'https://ndr.nascp.gov.ng/public/wallboard',
      width: '70%',
      height: '400',
      showComing: true,
    };
  },
};
</script>

<style scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.base {
  height: 75vh;
  width: 70vw;
}
.heading {
  margin: 10px;
}
</style>
