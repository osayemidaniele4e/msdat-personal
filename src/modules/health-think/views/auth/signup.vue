<template>
  <div>
    <Navbar />
    <h1>signup</h1>
    <Footer />
  </div>
</template>

<script>
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';

export default {
  name: 'signup',
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style lang="scss">
.bg-text {
  color: $HEALTH_THINK_COLOR;
}
</style>
