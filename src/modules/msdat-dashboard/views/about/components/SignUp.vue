<template>
  <div class="">
    <section class="container-fluid">
      <div class="container">
        <h2 class="w-100 text-center mx-auto ">Create an account</h2>

        <!-- Social Sign-in buttons -->
        <div class="d-flex w-100 justify-content-center mt-4">
          <button
            type="submit"
            class="soc-btn px-2 py-2 mr-2"
            @click="handleClickSignIn()"
          >
            <b-icon-google  class="mr-4"></b-icon-google>
            GOOGLE
          </button>

          <button type="submit" class="soc-btn px-2 py-2 mr-2">
            <b-icon-facebook  class="mr-4"></b-icon-facebook> FACEBOOK
          </button>

          <a :href="linkedlnUrl" class="soc-btn px-2 py-2 d-inline-block">
            <b-icon-linkedin class="mr-4" ></b-icon-linkedin> LINKEDIN
          </a>
        </div>
        <p class="orp w-100 text-center mx-auto mt-4"> OR </p>

        <!-- Form Inputs -->
        <div class="row">
          <div class="col-12 mx-auto h-50px">
            <form>
              <div class="mb-3 w-100 mx-auto mt-3">
                <div class="d-flex">
                  <input
                    type="text"
                    v-model="first_name"
                    class="form-control"
                    placeholder="First Name"
                  />
                  <input
                    type="text"
                    v-model="last_name"
                    class="form-control ml-2"
                    placeholder="Last Name"
                  />
                </div>
              </div>

              <!-- Other form fields -->
              <div class="mb-3 w-100 mx-auto mt-3">
                <div class="d-flex">
                  <input
                  type="text"
                  v-model="username"
                  class="form-control"
                  placeholder="Username"
                />
                  <input
                    type="email"
                    v-model="email"
                    class="form-control ml-2"
                    placeholder="Email Address"
                  />
                </div>
              </div>
              <div class="mb-3 w-100 mx-auto mt-3">
                <div class="d-flex">
                  <input
                    type="text"
                    v-model="organisation"
                    class="form-control"
                    placeholder="Organisation"
                  />
                  <input
                  type="text"
                  v-model="role"
                  class="form-control ml-2"
                  placeholder="Role"
                  />
                </div>
              </div>
              <div class="mb-3 w-100 mx-auto mt-3">
                <div class="d-flex">
                  <input
                    type="password"
                    v-model="password"
                    class="form-control"
                    placeholder="Password"
                  />
                  <input
                    type="password"
                    v-model="confirmPassword"
                    class="form-control ml-2"
                    placeholder="Confirm Password"
                  />
                  </div>
              </div>

              <input type="checkbox" class="mr-2" v-model="terms" />
              <span style="font-size: 14px">I accept all Terms and Conditions</span>

              <div class="text-center lg">
                <button
                  type="submit"
                  @click.prevent="signUp"
                  class="submit-btnn mt-3"
                  style="font-size: 15px"
                >
                  CREATE AN ACCOUNT
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

export default {
  data() {
    return {
      first_name: '',
      last_name: '',
      username: '',
      organisation: '',
      role: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
      linkedlnUrl: `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.VUE_APP_API_LINKEDIN_ID}&redirect_uri=${encodeURIComponent(window.location.origin)}&scope=openid%20profile%20email`,
    };
  },
  methods: {
    ...mapActions('AUTH_STORE', ['CREATE_USER', 'AUTHENTICATE', 'AUTHENTICATE_LINKEDIN']),

    // Sign-up method
    async signUp() {
      try {
        await this.CREATE_USER({
          username: this.username,
          email: this.email,
          first_name: this.first_name,
          last_name: this.last_name,
          organization: this.organisation,
          password: this.password,
        });
        this.$swal('Congratulations, Successfully Registered, Please Login');
      } catch (err) {
        const { username, email, password } = err;
        const errorMsg = (username ? `Username: ${username[0]}` : '')
          || (email ? `, Email: ${email[0]}` : '')
          || (password ? `, Password: ${password[0]}` : '');
        this.$swal(errorMsg);
      }
    },

    // Google Sign-In method
    // eslint-disable-next-line consistent-return
    async handleClickSignIn() {
      try {
        const googleUser = await this.$gAuth.signIn();
        if (!googleUser) {
          return null;
        }

        const data = {
          auth_token: googleUser.getAuthResponse().access_token,
          provider: 'google',
        };

        // console.log(data);
        await this.AUTHENTICATE(data)
          .then((res) => {
            if (res.status === 200 || res.status === 201) {
              this.$emit('login-success');
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

    // LinkedIn Sign-In method
    async linkedlnSignin(data) {
      try {
        await this.AUTHENTICATE_LINKEDIN(data)
          .then((res) => {
            if (res.status === 200 || res.status === 201) {
              this.$emit('login-success');
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
              text: 'Something went wrong signing you in with linkedln',
            });
          });
      } catch (error) {
        console.error(error);
        return null;
      }
      return 0;
    },
  },
};
</script>

<style lang="scss" scoped>
// .create-button {
//   width: 219px;
//   height: 48px;
//   background: #3f8994 0% 0% no-repeat padding-box;
//   box-shadow: 0px 3px 6px #00000029;
//   border-radius: 10px;
//   opacity: 1;
//   text-align: center;
//   letter-spacing: 0px;
//   color: #ffffff;
//   text-transform: uppercase;
//   opacity: 1;
// }
// .login-button {
//   width: 105px;
//   height: 48px;
//   background: #eaeaea 0% 0% no-repeat padding-box;
//   box-shadow: 0px 3px 6px #00000029;
//   border-radius: 10px;
//   opacity: 1;
// }
// .form-control {
//   height: 48px;
//   font-size: 16.5px;
//   background: #ffffff 0% 0% no-repeat padding-box;
//   border: 0.5px solid #030303;
//   border-radius: 2px;
//   opacity: 0.6;
// }
// .header {
//   font-size: 21px;
//   font-weight: bold;
// }
// label {
//   cursor: default;
//   font-size: 16.5px;
// }
.orp{
  font-size: 16px;
  color: #000000;
}
.submit-btnn{
  width: 60%;
  height: 40px;
  background: #348481;
  font-size: 15px;
  border-radius: 4px;
  opacity: 1;
  text-align: center;
  letter-spacing: 0px;
  color: #fff;
  text-transform: uppercase;
  opacity: 1;
}

.form-control::placeholder {
  font-size: 16px !important;
}

.container {
  padding: 0px 70px;
}

.soc-btn {
  width: 100%;
  height: 36px;
  background: #fff;
  font-size: 15px;
  border: 1px solid #348481;
  border-radius: 4px;
  opacity: 1;
  text-align: center;
  letter-spacing: 0px;
  color: #348481;
  text-transform: uppercase;
  opacity: 1;
  text-decoration: none;
}
</style>
