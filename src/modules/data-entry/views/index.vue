<template>
  <div>
    <the-header />
    <router-view></router-view>
    <theFooter />
  </div>
</template>

<script lang="js">
import theHeader from '../../msdat-dashboard/views/about/layout/theHeader.vue';
import theFooter from '../../msdat-dashboard/views/about/layout/theFooter.vue';

export default {
  name: 'data-entry',
  components: {
    theHeader,
    theFooter,
  },
  data() {
    return {

    };
  },
};
</script>
