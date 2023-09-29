<template>
  <Layout :index="1">
    <b-row class="pr-2 pr-lg-0 pl-2 pl-sm-0">
      <b-col lg="7">
        <div class="profile-image border rounded p-2 mb-3 d-flex align-items-center">
          <div class="ml-3 mr-auto">
            <input
              type="file"
              id="file-input"
              accept="image/*"
              hidden
              @change="previewThumbnail"
            />
            <label for="file-input" style="margin: 0; cursor: pointer;">
              <img height="64" width="64" class="rounded-circle" :src="imgsrc" alt="profile image">
            </label>
          </div>
          <b-button disabled class="mr-3 py-2 px-4 bg-white text-primary"><strong>Upload</strong></b-button>
          <b-button disabled class="py-2 px-4 bg-white text-dark"><strong>Remove</strong></b-button>
        </div>
        <b-form>
          <b-row>
            <b-col cols="6">
              <b-form-group id="input-group-1" label="First Name" label-for="fname" label-size="sm">
                <b-form-input id="fname" v-model="form.fname" type="text" placeholder="First Name" required class="m-0"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group id="input-group-2" label="Last Name" label-for="lname" label-size="sm">
                <b-form-input id="lname" v-model="form.lname" type="text" placeholder="Last Name" required ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group id="input-group-3" label="Email Address" label-for="email" label-size="sm">
                <b-form-input id="email" v-model="form.email" type="email" placeholder="Email Address" required ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group id="input-group-4" label="Organization" label-for="organization" label-size="sm">
                <b-form-input id="organization" v-model="form.organization" type="text" placeholder="Organization" required ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group id="input-group-5" label="Job Title" label-for="jobTitle" label-size="sm">
                <b-form-input id="jobTitle" v-model="form.jobTitle" type="text" placeholder="Job Title" required ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group id="input-group-6" label="Location" label-for="location" label-size="sm">
                <b-form-input id="location" v-model="form.location" type="text" placeholder="Location" required ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-button type="submit" variant="primary" class="w-100 p-2 mt-5">UPDATE INFORMATION</b-button>
        </b-form>
      </b-col>
      <b-col lg="4" class="pl-sm-0 pl-lg-4 my-5 my-lg-0">
        <b-form class="border rounded px-5 pt-5 pb-4">
          <b-form-group id="input-group-7" label="Account Password" label-for="password" label-size="sm">
            <b-form-input id="password" v-model="password" type="password" placeholder="Password" required ></b-form-input>
            <b-form-text id="password-feedback">
              Strength: Very Good
            </b-form-text>
          </b-form-group>
          <b-button type="submit" variant="primary" class="w-100 p-2">CHANGE PASSWORD</b-button>
        </b-form>
      </b-col>
    </b-row>
  </Layout>
</template>

<script>
import Layout from './layout.vue';

export default {
  name: 'Profile',
  components: {
    Layout,
  },
  data() {
    return {
      form: {
        fname: '',
        lname: '',
        email: '',
        organization: '',
        jobTitle: '',
        location: '',
      },
      password: '',
      imgsrc: 'https://msdat-api.fmohconnect.gov.ng/media/user/profile_picture/default.jpeg',
    };
  },
  methods: {
    previewThumbnail: function getPreview(event) {
      const input = event.target;
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        // eslint-disable-next-line no-return-assign
        reader.onload = (e) => (this.imgsrc = e.target.result);
        reader.readAsDataURL(input.files[0]);
      }
    },
  },
};
</script>

<style scoped>

</style>
