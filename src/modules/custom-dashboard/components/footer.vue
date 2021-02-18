<template>
  <b-jumbotron
    fluid="true"
    container-fluid
    text-variant="black"
    border-variant="null"
  >

    <b-row class="text-left">
      <b-col
        > <p>Platform</p>
        <ul>
          <li>Features</li>
          <li>Use Cases</li>
          <li>Plans</li>
          <li>How it Works</li>
        </ul>
      </b-col>
      <b-col
        > <p>Support</p>
        <ul>
          <li>FAQs</li>
          <li>Terms of Use</li>
          <li>Privacy Policy</li>
        </ul>
      </b-col>
      <b-col
        > <p>Company</p>
        <ul>
          <li>
            The Custom Dashboard is a product of eHealth4everyone, a leading digital health
            enterprise.
          </li>
          <li>About eHealth4everyone</li>
          <li>More Products</li>
          <li>Careers</li>
        </ul>
      </b-col>
      <b-col
        > <p>Stay Updated</p>
        <ul>
          <li>Subscribe to the newsletter for updated on new features, discounts.</li>
        </ul>
        <b-form-input v-model="text" placeholder="Your Email Address"></b-form-input>
        <b-button>Subscribe</b-button>
      </b-col>
    </b-row>
    <b-row class="text-left">
      <b-col>
        <p class="copy-right">Copyright © 2020 Custom Dashboard. All rights reserved.</p>
      </b-col>
    </b-row>
  </b-jumbotron>
</template>

<script>
export default {
  name: 'footer',
};
</script>

<style lang="scss">
@import '../scss/custom.scss';
@import url('https://fonts.googleapis.com/css2?family=DM+Sans&display=swap');
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  line-height: 30px;
}
.btn-secondary {
  background-color: #0172ac;
  height: 65px;
  width: 135.3px;
  margin-top: 12.3px;
  border: none;
}
.form-control {
    height: 61.5px;
    margin-top: 18.4px
}
.jumbotron{
    background-color: #00262F;
    color: #FFFFFF;
    font-family: 'DM Sans', sans-serif;
    padding-left: 80px;
    padding-right: 80px;
}
p {
  font-weight: 900;
  font-style: medium;
  font-size: 21px;
}
.copy-right {
    font-size: 15px;
  }
</style>
