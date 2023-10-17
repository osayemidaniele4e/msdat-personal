<template>
  <div>
    <div>
      <b-embed type="iframe" aspect="21by9" :src="url" :width="width" :height="height"></b-embed>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'GISIndicatorComparison',

  data() {
    return {
      url: 'https://public.tableau.com/views/Demographicsmulti-source/Dashboard12?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link:showVizHome=no&:embed=true',
      height: '400',
      showComing: true,
    };
  },
  methods: {
    ...mapMutations('MSDAT_STORE', ['ADD_CONTROL_PANEL', 'CLEAR_CONTROL_PANEL']),
  },
  created() {
  
  },
};
</script>

<style scoped>
.heading {
  margin: 10px;
}
.main-text {
  font-size: 25px;
  text-align: center;
  color: black;
}

.sub-text {
  color: black;
  font-size: 15px;
  text-align: left;
  font-weight: 100;
}

.show-coming {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.svg1 {
  width: 400px;
}

.coming-soon-text {
  font-size: 15px;
  font-weight: 500;
  margin: 30px;
}
</style>
