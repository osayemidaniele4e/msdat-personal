<template>
  <div class="vh-100 d-flex flex-column">
  <the-header ref="theHeader" />
  <main @click="$refs.theHeader.close()" class="w-100 h-100 d-flex flex-column align-items-center justify-content-center">
    <span class="h1 text-secondary">
      Dashboard currently awaiting approval!
    </span>
    <button @click="$router.push('/custom')" class="btn btn-secondary rounded-pill px-3 mt-3">
      <b-icon class="mr-2 rounded-circle bg-primary text-white" icon="arrow-left-short" font-scale="2"></b-icon>
      <span class="h4 text-primary">Home</span>
    </button>
  </main>
  <the-footer/>
  </div>
</template>

<script>
import theHeader from '@/modules/msdat-dashboard/views/about/layout/theHeader.vue';
import theFooter from '@/modules/msdat-dashboard/views/about/layout/theFooter.vue';

export default {
  components: {
    theHeader,
    theFooter,
  },
};
</script>
