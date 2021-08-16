<template>
  <div>
    <Navbar />
    <div class="body-profile">
      <!-- icons tile -->
      <IconsTile />

      <!-- Basic Profile -->

      <!-- <BasicProfile /> -->

      <!-- Preferences -->
      <!-- <Preferences /> -->
      <!-- delete profile account -->
      <!-- <Delete /> -->
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from '../../components/navbar.vue';
import Footer from '../../components/footer.vue';
// import Delete from '../../components/profile/tabs/delete.vue';
// import Preferences from '../../components/profile/tabs/preferences.vue';
// import BasicProfile from '../../components/profile/tabs/basic-profile.vue';
import IconsTile from '../../components/profile/icons-tile.vue';

export default {
  name: 'profile',
  components: {
    Footer,
    // Delete,
    Navbar,
    // Preferences,
    // BasicProfile,
    IconsTile,
  },
};
</script>

<style scoped>
.body-profile {
  background-color: #f5f5f5;
  padding: 5rem;
  margin: 0;
}
.try {
  direction: flex;
  flex-direction: row;
}
.test {
  display: inline;
}

h3 {
  text-align: left;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0px;
}
h4 {
  text-align: left;
  font-size: 16px;
  /* font-weight: 700; */
  letter-spacing: 0px;
}
</style>
