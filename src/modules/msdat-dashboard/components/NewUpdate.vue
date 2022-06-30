<template>
  <div class="new_update">
    <div class="icon_space">hello</div>
    <div class="p-4">
      <h4>New Update!</h4>
      <p>Introducing the MSDAT 2.0 Platform with up to 9 sub-dashboards</p>
      <p>What's new? <a href="http://" target="_blank" rel="noopener noreferrer">Click here</a></p>
      <div class="w-100 text-right">
        <button>GO BACK TO MSDAT 1.5</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseUpdate',
  // data() {
  //   return {};
  // },
  // methods: {},
};
</script>

<style lang="scss" scoped>
div.new_update {
  top: 6px;
  left: 178px;
  max-width: 634px;
  height: 229px;
  /* UI Properties */
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 5px 10px #00000029;
  border: 1px solid #f8ad2a;
  border-radius: 0px 5px 5px 0px;
  z-index: 5000;
  position: absolute;
  top: 1rem;
  right: 1rem;
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
  }
  button {
    font-size: 13px;
    background-color: #ffffff;
    box-shadow: 0px 7px 15px #00000033;
    border: 1px solid #007d53;
  }
}
div.icon_space {
  background: #f8ad2a 0% 0% no-repeat padding-box;
  box-shadow: 0px 5px 10px #00000029;
  border-radius: 5px 0px 0px 5px;
  height: 100%;
  width: 30%;
}
</style>
