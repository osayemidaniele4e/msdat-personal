<template>
  <section class="container">
    <div class="d-flex justify-content-center mt-5 p-5 ">
      <div class="col-4 ">
        <h2 class="text-center">Log in into your account.</h2>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <div class="row p-3">
              <label for="email ">E-mail</label>
              <input
                type="email"
                id="email"
                placeholder="mail@example.com"
                v-model="email"
                class="form-control"
              />
            </div>
            <div class="row p-3">
              <label for="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="*******"
                v-model="password"
                class="form-control"
              />
              <p v-if="!formIsValid" style="color: red">
                Please enter a valid email and password(must be at least 6
                characters long)
              </p>
            </div>
            <div class="text-center lg">
              <button class="btn btn-lg btn-primary ">Login</button>
              <h4>Don't have an account?</h4>
              <button class="btn btn-lg btn-light btn-outline-dark">Sign Up</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      formIsValid: true,
    };
  },
  methods: {
    submitForm() {
      this.formIsValid = true;
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
      } else {
        this.$store.dispatch("registerUser", { email: this.email });
        this.$router.replace("/inputDetails");
      }
    },
  },
};
</script>

<style scoped>
h4::before,
h4::after {
    display: inline-block;
    content: "";
    border-top: 1px solid rgb(116, 116, 116);
    width: 4rem;
    margin: 0 1rem;
    transform: translateY(-0.5rem);
}
</style>