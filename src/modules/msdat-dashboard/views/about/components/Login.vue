<template>
  <div class="" >
    <section class="container-fluid">
      <div class="container">
        <h2 class="w-100 text-center mx-auto">Log in to your account</h2>
        <!-- <div class="loader" v-if="isLoading">
          <the-loader />
        </div> -->
        <div class="row">
          <div class="col-12 mx-auto h-50px">
            <form>
              <div class="mb-3 w-100 mx-auto mt-3">
                <!-- <ul v-if="!formIsValid" class="mx-auto text-center">
                  <li style="color: red; list-style: none">{{ msg }}</li>
                </ul> -->

                <label for="" class="form-label">Username</label>
                <input
                  type="text"
                  v-model="username"
                  class="form-control"
                  placeholder="Enter your user name"
                />
              </div>
              <div class="mb-3 w-100 mx-auto mt-3 pos-rel">
                <label for="" class="form-label">Password</label>
                <input
                  type="password"
                  v-model="password"
                  class="form-control"
                  placeholder="******************"
                />

                <a href="#" class="forgot-abs text-dark">Forgot?</a>
              </div>
              <div class="text-center lg">
                <button
                  type="submit"
                  @click.prevent="login"
                  class="btn btn-lg btn-primary px-5"
                  style="font-size: 15px"
                >
                  LOG IN
                  <!-- <router-link :to="to" @click="submitForm"> LOG IN </router-link> -->
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
// import VueCookies from 'vue-cookies';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    ...mapActions('AUTH_STORE', ['LOGIN_USER']),
    async login() {
      try {
        const formData = {
          username: this.username,
          password: this.password,
        };
        await this.LOGIN_USER(formData)
          .then((res) => {
            // console.log(res);
            // eslint-disable-next-line eqeqeq
            if (res.status == 200) {
              this.$swal({
                toast: true,
                position: 'bottom',
                showConfirmButton: false,
                timer: 5000,
                icon: 'success',
                title: 'Success',
                text: 'Login successful',
              });
            }
          })
          .catch((err) => {
            console.log(err);
            this.$swal({
              toast: true,
              position: 'bottom',
              showConfirmButton: false,
              timer: 5000,
              icon: 'error',
              title: 'Something went wrong',
              text: 'Confirm username and password',
            });
          });
      } catch (err) {
        this.isLoading = false;
        this.formIsValid = false;
        this.$swal('user not found, confirm username and password');
        this.msg = 'user not found, confirm username and password';
        console.log(err.message);
      }
    },
  },
};
</script>

<style scoped>
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
</style>
