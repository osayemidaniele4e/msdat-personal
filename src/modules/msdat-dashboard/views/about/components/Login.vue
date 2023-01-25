<!-- eslint-disable no-alert -->
<!-- eslint-disable no-alert -->
<template>
  <div class="">
    <section class="container-fluid">
      <div class="container">
        <h2 class="w-100 text-center mx-auto">Log in to your account</h2>
        <!-- <div class="loader" v-if="isLoading">
          <the-loader />
        </div> -->
        <h2 class="w-100 text-center mx-auto mt-3">Login with</h2>
        <div class="d-flex w-100 justify-content-center">
          <button
            type="submit"
            class="btn btn-lg btn-primary px-4 py-2"
            @click="handleClickSignIn()"
          >
            <b-icon-google class="mr-2"></b-icon-google>
            GOOGLE
            <!-- <router-link :to="to" @click="submitForm"> LOG IN </router-link> -->
          </button>
          <button
            @click="logInWithFacebook()"
            type="submit"
            class="btn btn-lg btn-primary px-4 py-2"
          >
            <b-icon-facebook class="mr-2"></b-icon-facebook>
            FACEBOOK
            <!-- <router-link :to="to" @click="submitForm"> LOG IN </router-link> -->
          </button>
          <button
            @click="loginWithLinkedIn()"
            type="submit"
            class="btn btn-lg btn-primary px-4 py-2"
          >
            <b-icon-linkedin class="mr-2"></b-icon-linkedin>
            LinkedIn
            <!-- <router-link :to="to" @click="submitForm"> LOG IN </router-link> -->
          </button>
        </div>
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
import axios from 'axios';
import axiosInstance from '@/config/axios';

// import VueCookies from 'vue-cookies';

// "ya29.a0AVvZVsrx-2eK4kRE4Ed4moROas9ASzuIvLiDmTMZ8yB8x8p6chI-D00X2v0MkwPDIqsfLAPLJVq0zKhzHP-3-vCyXu1aleQd1pyEYZNjo0EAMv5-3El8g8CzowsDLjy4HA8PPPFdJB0AHTm7KjsQNQDBi-y8dAaCgYKAZ0SARESFQGbdwaILHCye5hUytMSpXyhRgq-eQ0165"

export default {
  data() {
    return {
      username: '',
      password: '',
      client_id: '774lsdliz8nidi',
      client_secret: '7Sb74ygbihcJUzCH',
      urlEncode: 'http%3A%2F%2Flocalhost%3A8080',
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
      if (window.innerWidth < 700) {
        this.$router.push('/account');
      }
    },

    async googleAuth() {
      const googleUser = await this.$gAuth.signIn();
      console.log(googleUser);
    },
    handleClickLogin() {
      this.$gAuth
        .getAuthCode()
        .then((authCode) => {
          console.log('authCode', authCode);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // eslint-disable-next-line consistent-return
    async handleClickSignIn() {
      try {
        const googleUser = await this.$gAuth.signIn();
        if (!googleUser) {
          return null;
        }
        console.log('googleUser', googleUser);
        console.log('getId', googleUser.getId());
        console.log('getBasicProfile', googleUser.getBasicProfile());
        console.log('getAuthResponse', googleUser.getAuthResponse());
        console.log('getAuthResponse', this.$gAuth.GoogleAuth.currentUser.get().getAuthResponse());
        this.isSignIn = this.$gAuth.isAuthorized;
      } catch (error) {
        console.error(error);
        return null;
      }
    },

    async loginWithLinkedIn() {
      // try {
      //   const response = await axiosInstance.post(
      //     'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=774lsdliz8nidi&scope=r_liteprofile%20r_emailaddress&state=123456&redirect_uri=http://208.87.128.190:3030/'
      //   );
      //   console.log('Baby_George', response);
      // } catch (error) {
      //   console.log('samuel =>', error);
      // }
      window.location.href = 'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=774lsdliz8nidi&scope=r_liteprofile%20r_emailaddress&state=123456&redirect_uri=https://msdat3.e4eweb.space';
    },

    async logInWithFacebook() {
      console.log(window);
      await this.loadFacebookSDK(document, 'script', 'facebook-jssdk');
      await this.initFacebook();
      window.FB.login((response) => {
        if (response.authResponse) {
          console.log(response);
          // Now you can redirect the user or do an AJAX request to
          // a PHP script that grabs the signed request from the cookie.
        } else {
          console.log('User cancelled login or did not fully authorize.');
        }
      });
      return false;
    },

    async initFacebook() {
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: '1231947387726582', // You will need to change this
          cookie: true, // This is important, it's not enabled by default
          version: 'v13.0',
        });
      };
    },
    async loadFacebookSDK(d, s, id) {
      let js;
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    },

    async Logout() {
      // firebase.auth().signOut();
      const response = await this.$gAuth.signOut();
      console.log(response);

      console.log('clicked');
    },
  },
  async mounted() {
    // window.location =
    //   'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=774lsdliz8nidi&scope=scope=r_liteprofile%20r_emailaddress&state=123456&redirect_uri=http://208.87.128.190:3030/';
    // (function () {
    //   var e = document.createElement('script');
    //   e.type = 'text/javascript';
    //   e.async = true;
    //   e.src = 'http://platform.linkedin.com/in.js?async=true';
    //   var t = document.getElementsByTagName('script')[0];
    //   t.parentNode.insertBefore(e, t);
    // })();
    // console.log(window);

    const code = this.$route.query.code;
    if (code !== undefined) {
      try {
        const response = await axiosInstance.post(
          `https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&client_id=774lsdliz8nidi&client_secret=7Sb74ygbihcJUzCH&code=${code}8&redirect_uri=https://msdat3.e4eweb.space`,
        );
        const tokenResponse = await axiosInstance.get(
          `https://api.linkedin.com/v2/me?oauth2_access_token=${response.access_token}`,
        );
        console.log('Baby_George', response, tokenResponse);
      } catch (error) {
        console.log('samuel =>', error);
      }
    }
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
