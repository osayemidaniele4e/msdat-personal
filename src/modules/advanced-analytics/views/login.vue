<template>
  <div class="">
    <header class="header sticky-top"></header>
    <section class="container-fluid">
      <div class="container">
        <h3 class="w-100 text-center mx-auto">Log in to your account</h3>
        <div class="loader" v-if="isLoading">
          <the-loader />
        </div>
        <div class="row">
          <div class="col-12 mx-auto h-50px">
            <form>
              <div class="mb-3 w-50 mx-auto mt-3">
                <ul v-if="!formIsValid" class="mx-auto text-center">
                  <li style="color: red; list-style: none">{{ msg }}</li>
                </ul>

                <label for="" class="form-label">Username</label>
                <input
                  type="text"
                  v-model="userName"
                  class="form-control"
                  aria-describedby="helpId"
                  placeholder="Enter your user name"
                />
              </div>
              <div class="mb-3 w-50 mx-auto mt-3 pos-rel">
                <label for="" class="form-label">Password</label>
                <input
                  type="password"
                  v-model="password"
                  class="form-control"
                  aria-describedby="helpId"
                  placeholder="******************"
                />

                <a href="" class="forgot-abs">Forgot?</a>
              </div>
              <div class="text-center lg">
                <button
                  type="submit"
                  @click.prevent="submitForm"
                  class="btn btn-lg btn-primary px-5"
                  style="font-size: 15px"
                >
                  LOG IN
                  <!-- <router-link :to="to" @click="submitForm"> LOG IN </router-link> -->
                </button>
              </div>
            </form>
            <div class="row">
              <div class="col-12 text-center">
                <h4 class="py-3" style="font-size: 15px">
                  Don't have an account?
                </h4>
                <button
                  class="btn btn-lg btn-light btn-outline-dark"
                  style="font-size: 15px"
                >
                  CREATE AN ACCOUNT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <footer class="footer fixed-bottom">
      <div class="container text-right pt-2">
        <small class="text-right pr-5"
          >Built with ❤️️ by eHealth4everyone</small
        >
      </div>
    </footer>
  </div>
</template>

<script>
import axios from 'axios';
import TheLoader from '../components/Loading/TheLoader.vue';

export default {
  components: { TheLoader },
  data() {
    return {
      userName: '',
      password: '',
      formIsValid: true,
      isLoading: false,
      msg: 'Please enter Username and Password.',
    };
  },
  mounted() {
    sessionStorage.removeItem('username');
  },
  methods: {
    async submitForm() {
      this.isLoading = true;
      this.formIsValid = true;
      if (this.userName === '' || this.password.length === '') {
        this.formIsValid = false;
        this.isLoading = false;
      } else {
        const formData = {
          username: this.userName,
          password: this.password,
        };
        await axios
          .post('http://135.181.212.168:9234/api/account/login/', formData, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'token 23351f769e41a7726eb18e8bb89d3de84be96845',
            },
          })
          .then((res) => {
            this.isLoading = false;
            sessionStorage.setItem('username', res.data.username);
            this.$router
              .push({ path: '/my-dashboard/details' })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            this.isLoading = false;
            this.formIsValid = false;
            this.msg = 'user not found, confirm username and password';
            console.log(err.message);
          });
      }
    },
  },
};
</script>

<style scoped>
.loader {
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  z-index: 999999;
  align-items: center;
  height: 67% !important;
  /* transform: translate(-50%, -50%); */
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
}
h4::before,
h4::after {
  display: inline-block;
  content: '';
  border-top: 1px solid rgb(116, 116, 116);
  width: 4rem;
  margin: 0 1rem;
  transform: translateY(-0.5rem);
}
.login-button {
  background: #3f8994;
  color: white;
}
.pos-rel {
  position: relative !important;
}
.input-label {
  top: 223px;
  left: 702px;
  width: 54px;
  height: 29px;
  text-align: left;
  font: normal normal normal 22px/29px DM Sans;
  letter-spacing: 0px;
  color: #000000;
  opacity: 1;
}
.forgot-abs {
  position: absolute;
  bottom: 0;
  top: 45px;
  right: 0;
  margin-right: 20px;
  text-decoration: underline;
}
.input-field {
  top: 399px;
  left: 702px;
  width: 516px;
  height: 64px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 0.5px solid #000000;
  border-radius: 2px;
  opacity: 0.6;
}
.header {
  width: 100%;
  height: 50px;
  background: #035c6e;
  opacity: 1;
}
.h-50px input {
  height: 50px;
}
.footer {
  width: 100%;
  height: 50px;
  background: #035c6e;
  opacity: 1;
}
.footer small {
  width: 100%;
  font-size: 16px;
  letter-spacing: 1px;
  color: #ffffff;
  opacity: 1;
}
</style>
