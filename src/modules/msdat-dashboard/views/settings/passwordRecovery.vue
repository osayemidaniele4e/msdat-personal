<template>
  <div>
    <Header v-on:tour="runIntro"></Header>
    <section v-if="step == 1">
      <h4>Recover password</h4>
      <span>Instructions to reset your password have been sent to:</span>
      <strong>mail@example.com</strong>
      <span>Click on the link in the email to reset your password</span>
      <b-button @click="step = 2" class="m-2 px-4" variant="primary">CHECK MAIL</b-button>
      <p class="pt-3">
        <span>Didn’t receive any link? </span>
        <router-link to="#">Resend link</router-link>
      </p>
    </section>
    <section v-else-if="step == 2">
      <h4>Reset password</h4>
      <b-form-group label="Password" label-for="password" label-size="sm">
        <b-form-input id="password" v-model="password" type="text" placeholder="*******************"
        required class="m-0"></b-form-input>
      </b-form-group>
      <b-form-group label="Re-type password" label-for="confirmPassword" label-size="sm">
        <b-form-input id="confirmPassword" v-model="confirmPassword" type="text"
        placeholder="*******************" required class="m-0"></b-form-input>
      </b-form-group>
      <b-button @click="step = 3" class="m-2 px-4" variant="primary">RESET PASSWORD</b-button>
    </section>
    <section v-else-if="step == 3">
      <h4>Password Successfully Changed!</h4>
      <span>Your password has been successfully changed, <br/> please login to have access to your account.</span>
      <b-button class="m-2 mt-5 px-4" variant="primary">LOG IN</b-button>
    </section>
    <Footer style="z-index: 10;"> </Footer>
  </div>
</template>

<script>
import Header from '../about/layout/theHeader.vue';
import Footer from '../about/layout/theFooter.vue';
import tour from '../onboarding/tour';

export default {
  name: 'PasswordRecovery',
  mixins: [tour],
  components: {
    Header, Footer,
  },
  data() {
    return {
      step: 1,
      password: '',
      confirmPassword: '',
    };
  },
  methods: {

  },
  mounted() {

  },
};
</script>

<style scoped>
  section {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  input {
    width: 300px;
  }
</style>
