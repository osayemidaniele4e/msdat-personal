<template>
  <div class="">
    <section class="container-fluid">
      <div class="container">
        <h2 class="w-100 text-center mx-auto">Create an account</h2>
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

                <label for="" class="form-label">Name</label>
                <div class="d-flex">
                <input
                  type="text"
                  v-model="first_name"
                  class="form-control"
                  placeholder="First name"
                />
                <input
                  type="text"
                  v-model="last_name"
                  class="form-control ml-2"
                  placeholder="Last name"
                />
                </div>
              </div>
              <div class="mb-3 w-100 mx-auto mt-3 pos-rel">
                <label for="" class="form-label">Email</label>
                <input
                  type="email"
                  v-model="email"
                  class="form-control"
                  placeholder="mail@example.com"
                />
              </div>
              <div class="mb-3 w-100 mx-auto mt-3 pos-rel">
                <label for="" class="form-label">Username</label>
                <input
                  type="text"
                  v-model="username"
                  class="form-control"
                  placeholder="Username"
                />
              </div>
              <div class="mb-3 w-100 mx-auto mt-3 pos-rel">
                <label for="" class="form-label">Organisation</label>
                <input
                  type="text"
                  v-model="organisation"
                  class="form-control"
                  placeholder="Place of work"
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
              </div>
              <div class="mb-3 w-100 mx-auto mt-3 pos-rel">
                <label for="" class="form-label">Re-type Password</label>
                <input
                  type="password"
                  v-model="confirmPassword"
                  class="form-control"
                  placeholder="******************"
                />
              </div>
              <input type="checkbox" class="mr-2" v-model="terms">
              <span style="font-size: 14px">I accept all Terms and Conditions</span>
              <div class="text-center lg">
                <button
                  type="submit"
                  @click.prevent="signUp"
                  class="btn btn-lg btn-primary px-5 mt-3"
                  style="font-size: 15px"
                >
                  CREATE AN ACCOUNT
                  <!-- <router-link :to="to" @click="submitForm"> LOG IN </router-link> -->
                </button>
                <div class="justify-content-center mt-3" style="margin-bottom: 17.25px;">
                    <span>Already have an account?</span>
                </div>
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
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    };
  },
  methods: {
    ...mapActions('AUTH_STORE', ['CREATE_USER']),
    async signUp() {
      try {
        await this.CREATE_USER({
          username: this.username,
          email: this.email,
          first_name: this.first_name,
          last_name: this.last_name,
          organization: this.organisation,
          password: this.password,
          profession: 'kosi',

        })
          .then((res) => {
            console.log(res);
            // eslint-disable-next-line eqeqeq
            if (res.status == 201) {
              this.$swal('Congratulations, Successfully Registered, Please Login');
            //   this.$router.push('/custom/login');
            } else {
              // alert('something went wrong');
              this.$swal('OOPS, something went wrong');
            }
          })
          .catch((err) => {
            console.log(err);
            this.$swal('OOPS, something went wrong');
          });
      } catch (err) {
        console.log(err);
      }
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
</style>
