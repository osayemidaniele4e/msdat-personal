<template>
  <b-container class="justify-content-content p-5">
    <b-row class="justify-content-center" style="margin-bottom: 48.75px">
      <span class="header">Register your account</span>
    </b-row>
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
      <!-- <b-form slot-scope="{ validate }" @submit.prevent="validate().then(handleSubmit)"> -->
      <b-form @submit.stop.prevent="handleSubmit(onSubmit)">
        <b-row>
          <b-col style="margin-bottom: 28.5px">
            <ValidationProvider
              name="Name"
              :rules="{ required: true, min: 3 }"
              v-slot="validationContext"
            >
              <b-form-group id="name-group" label="Name" label-for="name">
                <b-form-input
                  id="name"
                  v-model="form.name"
                  placeholder="Full name"
                  :state="getValidationState(validationContext)"
                ></b-form-input>
                <b-form-invalid-feedback id="input-1-live-feedback">{{
                  validationContext.errors[0]
                }}</b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
          </b-col>
          <b-col style="margin-bottom: 28.5px">
            <ValidationProvider
              name="User name"
              :rules="{ required: true, min: 3 }"
              v-slot="validationContext"
            >
              <b-form-group id="user-name-group" label="Username" label-for="user-name">
                <b-form-input
                  id="username"
                  v-model="form.username"
                  placeholder="Team name"
                  :state="getValidationState(validationContext)"
                ></b-form-input>
                <b-form-invalid-feedback id="input-1-live-feedback">{{
                  validationContext.errors[0]
                }}</b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
          </b-col>
        </b-row>
        <b-row>
          <b-col style="margin-bottom: 28.5px; width: 100%">
            <ValidationProvider
              name="profession"
              :rules="{ required: true, min: 3 }"
              v-slot="validationContext"
            >
              <b-form-group id="name-group" label="Profession" label-for="Profession">
                <b-form-input
                  id="Profession"
                  v-model="form.profession"
                  placeholder="Your Profession"
                  :state="getValidationState(validationContext)"
                ></b-form-input>
                <b-form-invalid-feedback id="input-1-live-feedback">{{
                  validationContext.errors[0]
                }}</b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
          </b-col>
          <b-col style="margin-bottom: 28.5px">
            <ValidationProvider
              name="Organisation"
              :rules="{ required: true }"
              v-slot="validationContext"
            >
              <b-form-group id="organisation-group" label="Organisation" label-for="organisation">
                <b-form-input
                  id="organisation"
                  v-model="form.organisation"
                  placeholder="Place of work"
                  :state="getValidationState(validationContext)"
                  type="text"
                ></b-form-input>
                <b-form-invalid-feedback id="input-1-live-feedback">{{
                  validationContext.errors[0]
                }}</b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
          </b-col>
        </b-row>
        <b-row style="margin-bottom: 69.75px">
          <b-col>
            <ValidationProvider
              name="Password"
              :rules="{ required: true }"
              v-slot="validationContext"
              vid="password"
            >
              <b-form-group id="password-group" label="Password" label-for="password" class="position-relative">
                <b-form-input
                  id="password"
                  v-model="form.password"
                  :type="passwordVisible ? 'text' : 'password'"
                  :state="getValidationState(validationContext)"
                  placeholder="******************"
                ></b-form-input>
                <b-icon @click="passwordVisible = !passwordVisible" v-if="passwordVisible"
                  icon="eye-slash" class="position-absolute p-3" style="right: 1rem; top: 2rem; cursor: pointer;"></b-icon>
                <b-icon @click="passwordVisible = !passwordVisible" v-else icon="eye"
                  class="position-absolute p-3" style="right: 1rem; top: 2rem; cursor: pointer;"></b-icon>
                <b-form-invalid-feedback id="input-1-live-feedback">{{
                  validationContext.errors[0]
                }}</b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
          </b-col>

          <b-col style="margin-bottom: 28.5px">
            <ValidationProvider
              name="Email"
              :rules="{ required: true, email: true }"
              v-slot="validationContext"
            >
              <b-form-group id="email-group" label="Work email" label-for="email">
                <b-form-input
                  id="email"
                  v-model="form.email"
                  type="email"
                  :state="getValidationState(validationContext)"
                  placeholder="mail@example.com"
                ></b-form-input>
                <b-form-invalid-feedback id="input-1-live-feedback">{{
                  validationContext.errors[0]
                }}</b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
          </b-col>
        </b-row>
        <b-row class="justify-content-center" style="margin-bottom: 17.25px">
          <ValidationProvider
            name="terms and conditions"
            :rules="{ is: 'true' }"
            v-slot="validationContext"
          >
            <b-form-group>
              <b-form-checkbox
                v-model="form.terms"
                :state="getValidationState(validationContext)"
                value="true"
                unchecked-value="false"
              />
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <span>I accept all Terms and Conditions</span>
        </b-row>
        <b-row class="justify-content-center" style="margin-bottom: 17.25px">
          <b-button class="create-button" type="submit" @click.prevent="register()"
            >CREATE AN ACCOUNT</b-button
          >
        </b-row>
        <b-row class="justify-content-center" style="margin-bottom: 17.25px">
          <span>Already have an account?</span>
        </b-row>
        <b-row class="justify-content-center">
          <b-button class="login-button" @click="$router.push('/custom/login')">LOGIN</b-button>
        </b-row>
      </b-form>
    </ValidationObserver>
  </b-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      form: {
        name: '',
        organisation: '',
        email: '',
        username: '',
        password: '',
        password2: '',
        profession: '',
        terms: false,
      },
      passwordVisible: false,
    };
  },
  methods: {
    ...mapActions('AUTH_STORE', ['CREATE_USER']),

    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    resetForm() {
      this.form = {
        name: '',
        organisation: '',
        email: '',
        username: '',
        password: '',
        password2: '',
        terms: false,
        profession: '',
      };

      this.$nextTick(() => {
        this.$refs.observer.reset();
      });
    },
    async register() {
      const data = {
        username: this.form.username,
        email: this.form.email,
        first_name: this.form.name,
        last_name: 'this.form.name',
        profession: this.form.profession,
        organization: this.form.organisation,
        password: this.form.password,
      };
      try {
        await this.CREATE_USER(data);
        this.$swal('Congratulations, Successfully Registered, Please Login');
      } catch (err) {
        const { username, email, password } = err;
        const errorMsg = (username ? `Username: ${username[0]}` : '')
          || (email ? `, Email: ${email[0]}` : '')
          || (password ? `, Password: ${password[0]}` : '');
        this.$swal(errorMsg);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.create-button {
  width: 219px;
  height: 48px;
  background: #3f8994 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 10px;
  opacity: 1;
  text-align: center;
  letter-spacing: 0px;
  color: #ffffff;
  text-transform: uppercase;
  opacity: 1;
}
.login-button {
  width: 105px;
  height: 48px;
  background: #eaeaea 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 10px;
  opacity: 1;
}
.form-control {
  height: 48px;
  font-size: 16.5px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 0.5px solid #030303;
  border-radius: 2px;
  opacity: 0.6;
}
.header {
  font-size: 21px;
  font-weight: bold;
}
label {
  cursor: default;
  font-size: 16.5px;
}
</style>
