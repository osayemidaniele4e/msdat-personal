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
            @click.prevent="buttonClicked"
            type="submit"
            class="btn btn-lg btn-primary px-4 py-2"
          >
            <b-icon-facebook class="mr-2"></b-icon-facebook>
            {{ getButtonText }}
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
import {
  loadFbSdk, getFbLoginStatus, fbLogout, fbLogin,
} from '@/config/facebook';

// import VueCookies from 'vue-cookies';

export default {
  props: {
    version: {
      type: String,
      default: 'v2.10',
    },
    logoutLabel: {
      type: String,
      default: 'Log out ',
    },
    loginLabel: {
      type: String,
      default: 'Facebook',
    },
    loginOptions: {
      type: Object,
      default() {
        return {
          scope: 'email',
        };
      },
    },
  },
  data() {
    return {
      username: '',
      password: '',
      clientId: process.env.VUE_APP_FACEBOOK_APP_ID,
      isWorking: false,
      isConnected: false,
    };
  },

  computed: {
    getButtonText() {
      switch (this.isConnected) {
        case true:
          return this.logoutLabel;
        case false:
          return this.loginLabel;
        default:
          return 'this is default';
      }
    },
  },
  methods: {
    ...mapActions('AUTH_STORE', ['LOGIN_USER', 'AUTHENTICATE']),

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
        console.log(googleUser, 'User');
        const data = {
          auth_token: googleUser.getAuthResponse().access_token,
          provider: 'google',
        };

        await this.AUTHENTICATE(data)
          .then((res) => {
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
            console.log('res', err);
            this.$swal({
              toast: true,
              position: 'bottom',
              showConfirmButton: false,
              timer: 5000,
              icon: 'error',
              title: 'Something went wrong',
              text: 'Something went wrong signing you in with google',
            });
          });
      } catch (error) {
        console.error(error);
        return null;
      }
    },

    async loginWithLinkedIn() {
      window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.VUE_APP_API_LINKEDIN_ID}&scope=r_liteprofile%20r_emailaddress&state=123456&redirect_uri=https://localhost:8080`;
    },

    async loginWithFacebook() {
      try {
        window.FB.login(
          async (response) => {
            const data = {
              accessToken: response.authResponse.accessToken,

              provider: 'facebook',
            };
            console.log(data);
            // await this.AUTHENTICATE(data)
            //   .then((res) => {
            //     console.log('res', res);
            //     if (res.status == 200) {
            //       this.$swal({
            //         toast: true,
            //         position: 'bottom',
            //         showConfirmButton: false,
            //         timer: 5000,
            //         icon: 'success',
            //         title: 'Success',
            //         text: 'Login successful',
            //       });
            //     }
            //   })
            //   .catch((err) => {
            //     console.log(err);
            //     this.$swal({
            //       toast: true,
            //       position: 'bottom',
            //       showConfirmButton: false,
            //       timer: 5000,
            //       icon: 'error',
            //       title: 'Something went wrong',
            //       text: 'Something went wrong signing you in with facebook',
            //     });
            //   });

            // console.log('fb response', data);
          },
          {
            scope: 'email',
            return_scopes: true,
          },
        );
      } catch (error) {
        return null;
      }
    },

    async facebookLogin() {
      window.open(
        'https://www.facebook.com/v2.11/dialog/oauth?&response_type=token&display=popup&client_id=1528751870549294&display=popup&redirect_uri=http://localhost:8088/facebook-auth.html&scope=email',
        '',
        'width=600,height=400',
      );
    },

    getUserData(item) {
      console.log(item);
    },

    // async Logout() {
    //   // firebase.auth().signOut();
    //   const response = await this.$gAuth.signOut();
    //   console.log(response);

    //   console.log('clicked');
    // },

    buttonClicked() {
      this.$emit('click');
      if (this.isConnected) {
        this.logout();
      } else {
        this.loginWFB();
      }
    },
    loginWFB() {
      this.isWorking = true;
      fbLogin(this.loginOptions).then((response) => {
        if (response.status === 'connected') {
          console.log(response);
          this.isConnected = true;
        } else {
          this.isConnected = false;
        }
        this.isWorking = false;
        this.$emit('login', {
          response,
          FB: window.FB,
        });
      });
    },
    logout() {
      this.isWorking = true;
      fbLogout().then((response) => {
        this.isWorking = false;
        this.isConnected = false;
        this.$emit('logout', response);
      });
    },
  },
  async mounted() {
    // initFbsdk();

    this.isWorking = true;
    loadFbSdk(this.appId, this.version)
      .then(getFbLoginStatus)
      .then((response) => {
        if (response.status === 'connected') {
          this.isConnected = true;
        }
        this.isWorking = false;
        /** Event `get-initial-status` to be deprecated in next major version! */
        this.$emit('get-initial-status', response);
        this.$emit('sdk-loaded', {
          isConnected: this.isConnected,
          FB: window.FB,
        });
      });

    const code = this.$route.query.code;
    if (code !== undefined) {
      alert(code);

      const query = { ...this.$route.query };
      delete query.code;
      delete query.state;

      this.$router.replace({ query });

      // this.$router.replace('/');
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
.button {
  border: none;
  color: #fff;
  position: relative;
  line-height: 34px;
  min-width: 225px;
  padding: 0 15px 0px 46px;
  background-image: linear-gradient(#4c69ba, #3b55a0);
}
</style>
