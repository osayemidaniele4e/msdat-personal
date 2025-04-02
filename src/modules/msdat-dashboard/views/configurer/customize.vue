<template>
  <div class="view-container">
    <b-form @submit.prevent="onSubmit" class="card p-5 mb-5">
      <h3 class="text-center">Customize MSDAT</h3>
      <small class="text-center text-grey d-block mb-5">
        Use the panel below to create your custom MSDAT. Changes will appear on the right.
      </small>

      <b-form-group id="input-group-1" label="Select Category" label-for="input-1">
        <b-form-select
          id="input-1"
          v-model="form.category"
          :options="options.categoies"
          required
          class="w-100"
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-2" :label="`Select ${form.category}`" label-for="input-2">
        <b-form-select
          id="input-2"
          v-model="form[form.category.toLowerCase()]"
          :options="options[form.category.toLowerCase()]"
          required
          class="w-100"
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-3" label="MSDAT name: eg. MSDAT Nigeria" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.msdat_name"
          placeholder=""
          required
        ></b-form-input>
      </b-form-group>
      <b-button class="mt-4" type="submit" size="lg" variant="primary">
        <span>Proceed</span>
      </b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        category: 'Country',
        country: '',
        agency: '',
        msdat_name: '',
      },
      options: {
        categoies: ['Country', 'Agency'],
        country: ['Nigeria'],
        agency: ['World Health Organization'],
      },
    };
  },
  methods: {
    onSubmit() {
      console.log(this.form);
      this.$router.push('/configure/user/appearance');
    },
  },
};
</script>

<style>
.view-container {
  display: flex;
  justify-content: center;
}
form {
  max-width: 600px;
}
form :is(small, label) {
  color: #838383;
  font-size: 1rem;
}
form button span {
  font-size: 1rem;
}
</style>
