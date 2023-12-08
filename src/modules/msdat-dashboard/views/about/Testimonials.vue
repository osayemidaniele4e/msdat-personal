<template>
  <div>
    <the-header ref="theHeader" />
    <main @click="$refs.theHeader.close()" class="text-center">

      <!-- navigation sections  -->

      <nav class="nav-links d-flex justify-content-center align-items-center shadow py-3">
        <router-link class="mx-3 nav-link-item" to="/about?#program-areas">Program Areas</router-link>
        <router-link class="mx-3 nav-link-item" to="/about?#logical-framework">Logical Framework</router-link>
        <router-link class="mx-3 nav-link-item" to="/about?#available-data">Available Data</router-link>
        <router-link class="mx-3 nav-link-item" to="/about?#data-sources">Data Sources</router-link>
      </nav>
      <h2>What Our Users Say</h2>
      <span class="top-text">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod <br>
        tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
      </span>
    </main>
    <footer class="footer">
      This dashboard is developed and managed by the Department of Health Planning Research and Statistics (DHPRS)
    </footer>
    <the-footer />
  </div>
</template>

<script>
import theHeader from './layout/theHeader.vue';
import theFooter from './layout/theFooter.vue';

export default {
  components: {
    theHeader,
    theFooter,
  },

};
</script>

<style scoped>
.nav-links {
  height: 50px;
}
.nav-link-item {
  cursor: pointer;
  font-weight: 500;
  color: black
}
.nav-link-item:hover {
  color: green;
  text-decoration: none;
}
h2 {
  font-weight: bold;
  padding: 4rem 0 2rem;
}
.top-text {
  font-size: 1.4rem;
  font-weight: 400
}
.footer{
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}
</style>
