<template>
 <button
   class="feedbtn"
   @click.prevent="activateUserHelp"
 >
 Feedback
 </button>
</template>

<script>
export default {
  methods: {

    activateUserHelp(event) {
      event.preventDefault();
      if (window.isUserHelpReady === true) {
        window.openUserHelpButton();
      }
    },
  },
};
</script>

<style scoped>
.feedbtn{
  background-color: rgba(0, 125, 83, 0.707);;
  border: none;
  color: white;
  /* padding: 15px 32px; */
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  position: fixed;
  top: 60%;
  right: 0;
  z-index: 9999;
  transform: rotate(-90deg);
  transform-origin: bottom right;
  margin-top: -75px;
  margin-right: -10px;

}
</style>
