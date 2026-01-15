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
        <b-form @submit.prevent="updateProfile">
          <b-row>
            <b-col cols="6">
              <b-form-group id="input-group-1" label="First Name" label-for="fname" label-size="sm">
                <b-form-input id="fname" v-model="user.first_name" type="text" required ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group id="input-group-2" label="Last Name" label-for="lname" label-size="sm">
                <b-form-input id="lname" v-model="user.last_name" type="text" required ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group id="input-group-3" label="Email Address" label-for="email" label-size="sm">
                <b-form-input id="email" v-model="user.email" type="email" required ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group id="input-group-4" label="Organization" label-for="organization" label-size="sm">
                <b-form-input id="organization" v-model="user.organization" type="text" required ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group id="input-group-5" label="Job Title" label-for="jobTitle" label-size="sm">
                <b-form-input id="jobTitle" v-model="user.profession" type="text" required ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group id="input-group-6" label="Location" label-for="location" label-size="sm">
                <b-form-input id="location" v-model="user.location" type="text" ></b-form-input>
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
import { mapGetters } from 'vuex';
import axios from 'axios';
import Layout from './layout.vue';

export default {
  name: 'Profile',
  components: {
    Layout,
  },
  data() {
    return {
      user: { },
      password: '',
      defaultImg: 'https://msdat-api.fmohconnect.gov.ng/media/user/profile_picture/default.jpeg',
    };
  },
  computed: {
    ...mapGetters('AUTH_STORE', ['getUser', 'isAuthenticated']),
    imgsrc() {
      return (this.user.picture || this.defaultImg);
    },
  },
  methods: {
    previewThumbnail: function getPreview(event) {
      const input = event.target;
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        // eslint-disable-next-line no-return-assign
        reader.onload = (e) => (this.user.picture = e.target.result);
        reader.readAsDataURL(input.files[0]);
      }
    },
    async getProfile() {
      const url = `http://172.93.52.240:3001/api/users/${this.getUser.id}/`;
      await axios.get(url).then((response) => {
        this.user = response.data;
      }).catch((error) => console.log(error));
    },
    async updateProfile() {
      const url = `http://172.93.52.240:3001/api/users/${this.getUser.id}/`;
      this.$swal.fire({
        title: 'Enter your password',
        html: '<input type="password" id="password" class="form-input">',
        confirmButtonText: 'Update',
        focusConfirm: false,
        preConfirm: () => {
          const password = this.$swal.getPopup().querySelector('#password').value;
          if (!password) {
            this.$swal.showValidationMessage('Please enter your password');
          }
          return { password };
        },
      }).then(async (result) => {
        await axios.put(url, { ...this.user, password: result.value.password, picture: undefined })
          .then((response) => {
            console.log(response.data);
          }).catch((error) => console.log(error));
      });
    },
  },
  watch: {
    isAuthenticated: {
      async handler(auth) {
        if (auth) {
          await this.getProfile();
        } else {
          this.$swal('Kindly login to view your profile.');
        }
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>

</style>
