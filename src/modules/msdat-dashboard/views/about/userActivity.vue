<template>
    <div>
        <Header />
        <Footer />
    </div>
</template>

<script>
import Header from './layout/theHeader.vue';
import Footer from './layout/theFooter.vue';

export default {
  name: 'Dashboard',
  components: {
    Header,
    Footer,
  },
};
</script>

<style>

</style>
