<template>
  <div class="new_update">
    <div class="icon_space">
      <img src="../assets/update1.svg" alt="update" class="img-fluid" />
    </div>
    <div class="p-4 position-relative">
      <span class="icon_cancel" @click="onClose">X</span>
      <h4>New Update!</h4>
      <p>Introducing the MSDAT 2.0 Platform with up to 9 sub-dashboards</p>
      <!-- <p>What's new? <a href="http://" target="_blank" rel="noopener noreferrer">Click here</a></p> -->
      <div class="w-100 text-right">
        <a href="https://msdat.fmohconnect.gov.ng/" target="_blank" rel="noopener noreferrer">
          <button class="btn btn-sm py-2">GO BACK TO MSDAT 1.5</button>
        </a>
      </div>
    </div>
  </div>
</template>

<script type="js">
export default {
  name: 'BaseUpdate',
  props: {
    showPopUp: {
      type: Boolean,
      default: false,
    },
  },
  // data() {
  //   return {};
  // },
  methods: {
    onClose() {
      this.$emit('closePopUp');
    },
  },
};
</script>

<style lang="scss" scoped>
div.new_update {
  transition: all 0.5s ease-in-out;
  max-width: 634px;
  height: 155px;
  /* UI Properties */
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 5px 10px #00000029;
  border: 1px solid #f8ad2a;
  border-radius: 0px 5px 5px 0px;
  z-index: 9999999;
  position: absolute;
  top: 1rem;
  right: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h4 {
    font-size: 30px;
    font-weight: bold;
    color: #404040;
  }
  p {
    color: #111110;
    font-size: 22px;
    a {
      color: #111110;
      text-decoration: underline;
    }
  }
  button {
    font-size: 13px;
    background-color: #ffffff;
    // box-shadow: 0px 7px 15px #00000033;
    border: 1px solid #007d53;
    color: #111110;
    &:hover {
      background-color: #007d53;
      color: white;
    }
  }
  span.icon_cancel {
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
  }
}
div.icon_space {
  background: #f8ad2a 0% 0% no-repeat padding-box;
  box-shadow: 0px 5px 10px #00000029;
  border-radius: 5px 0px 0px 5px;
  height: 100%;
  width: 30%;
  display: flex;
  align-items: center;
}
</style>
