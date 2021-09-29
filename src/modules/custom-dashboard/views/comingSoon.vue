<template>
  <div>
    <the-header />
    <div class="container-fluid px-5 content">
      <div class="row">
        <div class="col-lg-6 col-md-6 col-12">
          <b-button class="btn btn-outline-primary disabled">COMING SOON</b-button>
          <p class=" mt-3 mb-4 tittle">
            Custom Dashboard
          </p>

          <div class="mb-5 mr-3">
              <p class="text-left mb-3 msg">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore, vel. Voluptas, nulla
            sint error repudiandae, itaque totam velit quo voluptatem officia corporis modi facere
            nisi illo rem similique magni maxime provident hic aut laboriosam debitis ipsum ex
            cupiditate doloribus! Labore architecto fugit perspiciatis quae mollitia sequi esse
            numquam eligendi doloribus dolor minima modi consectetur blanditiis accusantium rem,
            rerum illo nisi fuga commodi voluptatem totam velit eos sint illum. Unde amet magni quo
            illum ad, praesentium laudantium quasi repudiandae, impedit nisi assumenda similique
            isunt!
          </p>

          <p class="text-left msg2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque labore provident
            doloremque quisquam eaque optio delectus sequi velit. Rerum temporibus alias cupiditate
            facilis earum quos debitis minus ad laudantium voluptates?
          </p>
          </div>

          <form class="mb-4" v-on:submit.prevent="newInterest()">
            <b-row class="mt-4" no-gutters>
              <b-col cols="12" sm="7" class="">
                <b-form-input
                  type="email"
                  name="email"
                  class="form-control ml-0 rounded-0"
                  placeholder="Your e-mail address"
                  required
                />
              </b-col>
              <b-col cols="12" sm="5" class="">
                <b-button type="submit" class="btn btn-primary rounded-0 ml-0">
                  Keep me Updated!
                </b-button>
              </b-col>
            </b-row>
          </form>

          <p class="link-text mt-4 mb-4 ml-1">
            <router-link to="/" style="color: #007D53"
              ><i style="padding-top:2px;" class="fas fa-angle-left" aria-hidden="true"></i>
              <b-icon icon="chevron-left"></b-icon> Back to MSDAT</router-link
            >
          </p>
        </div>
        <div class="col-lg-6 col-md-6 col-12 bg-white" id="image">
            <img
              src="../../../assets/state-profile/img/stateprofile.jpg"
              class="img-fluid"
              alt="State Profile Image"
            />
        </div>
      </div>
    </div>
    <the-footer />
  </div>
</template>

<script>
import theHeader from '../../msdat-dashboard/views/about/layout/theHeader.vue';
import theFooter from '../../msdat-dashboard/views/about/layout/theFooter.vue';

export default {
  name: 'Coming Soon',
  components: {
    theHeader,
    theFooter,
  },
};
</script>

<style lang="scss" scoped>
.msg {
  font-weight: normal;
  font-size: 1rem;
  color: #000000;
  font-family: 'Muli', sans-serif;
}
.msg2 {
  font-weight: normal;
  font-family: 'Muli', sans-serif;
  font-size: 0.95rem;
  color: #505050;
}
button.btn-outline-primary {
  border: 2px solid #ff8f0f !important;
  color: #ff8f0f !important;
  font-weight: bold;
}
.tittle {
  color: #232323 !important;
  font-weight: bold;
  background-color: white !important;
  opacity: 1;
  font-size: 43px;
  line-height: 55px;
  font-family: 'Muli', sans-serif;
}

button.btn-primary {
  color: #fff;
  font-weight: bold;
  border: 2px solid #ff8f0f;
  background-color: #ff8f0f;
  opacity: 1;
  font-size: 0.95rem;
  font-family: 'Muli', sans-serif;
  text-transform: none;
  height: 2.4rem;
  margin-top: 0;
}
div.content {
  min-height: 82vh;
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
}
</style>
