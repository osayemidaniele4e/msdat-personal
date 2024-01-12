<template>
  <div v-if="true">
    <div class="top">
      <h1>National Policy on Reproductive Health and Rights</h1>
      <button @click="toggleOverlay" class="dropdown">
        View more policies
        <b-icon class="" style="color: #ffffff" icon="caret-down-fill" />
      </button>
    </div>
    <transition name="overlay-fade">
      <div v-if="overlayOpen" class="overlay">
        <div v-for="(policy, index) in options" :key="index" class="policy">
          {{ policy }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      selectedPolicy: 'Policy 1',
      options: ['Policy 1', 'Policy 2', 'Policy 3'],
      selected: 'Policy 1',
      overlayOpen: false,
    };
  },
  methods: {
    toggleOverlay() {
      this.overlayOpen = !this.overlayOpen;
      console.log('Overlay:', this.overlayOpen);
    },
  },
};
</script>

<style lang="scss" scoped>
.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: opacity 0.3s;
}
.overlay-fade-enter, .overlay-fade-leave-to /* .overlay-fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
div {
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding-block: 10px;
    padding-inline: 40px;

    .dropdown {
      width: 240px;
      height: 52px;
      // border: 2px solid red;
    }
  }
  .overlay {
    padding-inline: 40px;
    background-color: #085856;
    max-height: 500px; /* Adjust the maximum height as needed */
    overflow: hidden;
    width: 100%;
    display: flex;
    gap: 46px;
    align-items: center;
    justify-content: start;
    background-color: #348481;
    color: white;
    height: 125px;
  }
  .policy {
    padding: 12px 16px;
    border: 1px solid white;
    border-radius: 6px;
    cursor: pointer;
  }
}
</style>
