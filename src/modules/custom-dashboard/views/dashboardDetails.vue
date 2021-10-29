<template>
  <b-container class="text-justify px-5 pb-5">
    <p class="welcome">Welcome User,</p>
    <form @submit.prevent="submitForm">
      <b-row>
        <b-col cols="12" lg="6" class="forms">
          <div class="field-detail" :class="{ invalid: !dName.isValid }">
            <p>Give your dashboard a name</p>
            <b-form-input
              type="text"
              id="d-Name"
              v-model.trim="dName.val"
              @blur="clearValidity('dName')"
              placeholder="Hint: It should be easy to understand"
            ></b-form-input>
            <p v-if="!dName.isValid">This must not be empty.</p>
          </div>
          <div class="field-detail" :class="{ invalid: !description.isValid }">
            <p>Description of your dashboard</p>
            <b-form-input
              type="text"
              id="description"
              v-model.trim="description.val"
              @blur="clearValidity('description')"
              placeholder="Hint: Use easy to understand terms"
            ></b-form-input>
            <p v-if="!description.isValid">This must not be empty.</p>
          </div>
        </b-col>
        <b-col>
          <b-row class="text-left text-lg-center">
            <b-col cols="auto">
              <div>
                <input
                  type="file"
                  id="file-input"
                  accept="image/*"
                  hidden
                  @change="previewThumbnail"
                />
                <label class="file-input-label" for="file-input">
                  <customDashboardSvg :name="upload"></customDashboardSvg>
                </label>
              </div>
              <div class="image-preview" v-if="this.selectedImage.length > 0">
                <img :src="selectedImage" class="image-preview__img" />
              </div>
            </b-col>
            <b-col cols="12" lg="4">
              <p class="text-left my-4 my-md-0">
                Logo size should be 200px by 200px Not bigger than 5 MB Logo
                should be representative of your dashboard content
              </p>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <p><b>Select dashboard data</b></p>
      <p>
        Go through our database and select the data that is relevant to your
        dashboard.<br />
        Select your indicators, your preferred data source, the years and the
        coverage area (National or subnational).
      </p>
      <b-row id="bottom-row">
        <b-col cols="auto mb-5">
          <b-button id="individual" type="submit"
            >SELECT INDIVIDUAL DATA</b-button
          >
          <p class="help-text">
            I know the exact data I want, I will choose just the ones I need
          </p>
        </b-col>
        <!-- <b-col cols="auto" xl="3" md="6" sm="12">
        <p class="help-text">
          I know the exact data I want,<br />
          I will choose just the ones I need
        </p>
      </b-col> -->
        <b-col cols="auto" class="mt-5 mt-lg-5 mt-xl-0">
          <b-button id="available" disabled>SELECT all available DATA</b-button>
          <p class="help-text">
            Skip the data table, I want all the available data
          </p>
        </b-col>
        <!-- <b-col cols="auto" lg="3" md="6" sm="12" class="mt-0 mt-md-5 mt-xs-5 mt-xl-0">
        <p class="help-text">
          Skip the data table,<br />
          I want all the available data
        </p>
      </b-col> -->
      </b-row>
    </form>
  </b-container>
</template>

<script>
import customDashboardSvg from '../svg/customDashboardSvgs.vue';

export default {
  name: 'dasboard-details',
  components: {
    customDashboardSvg,
  },
  data() {
    return {
      selectedImage: '',
      dName: {
        val: '',
        isValid: true,
      },
      description: {
        val: '',
        isValid: true,
      },
      formIsValid: true,
    };
  },
  mounted() {
    this.$store.commit('updateStep', 1);
  },
  methods: {
    previewThumbnail: function getPreview(event) {
      const input = event.target;
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.selectedImage = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    clearValidity(input) {
      this[input].isValid = true;
    },
    onUpload() {
      const fd = new FormData();
      fd.append('Image', this.selectedImage, this.selectedImage.name);
    },
    validateForm() {
      this.formIsValid = true;
      if (this.dName.val === '') {
        this.dName.isValid = false;
        this.formIsValid = false;
      }
      if (this.description.val === '') {
        this.description.isValid = false;
        this.formIsValid = false;
      }
    },

    submitForm() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      const formData = {
        dashboardName: this.dName,
        description: this.description,
      };

      this.$store.dispatch('dashboardConfiguration', {
        name: this.dName.val,
        description: this.description.val
      });
      this.$emit('save-data', formData);
      this.$router.push('preference-table');
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  color: #202020;
  font-family: 'DM Sans', sans-serif;
}
.welcome {
  font-weight: normal;
  font-size: 30px;
  font-family: 'DM Sans', sans-serif;
}
.form-control {
  background-color: #eaeaea;
  height: 56.250000014px;
  border: none;
  border-radius: 0px;
  font-style: italic;
}
.forms {
  margin-bottom: 40.50000001px;
  p {
    margin-bottom: 0px;
  }
}
.field-detail:first-child {
  margin-bottom: 29.250000007px;
}
.btn {
  background-color: #3f8994;
  color: #ffffff;
  height: 48.000000012px;
  max-width: 241.50000006px;
  text-transform: uppercase;
  border: none;
  border-radius: 7.500000002px;
  font-weight: bold;
  padding: 0px 30px 0px 30px;
  white-space: nowrap;
}
#available {
  max-width: 267.750000067px;
  background-color: #eaeaea;
  color: #000000;
}
.help-text {
  color: #696767;
  display: inline;
  margin-right: 20px;
}
.invalid p {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
.file-input-label {
  :hover {
    cursor: pointer;
  }
}
#bottom-row {
  margin-top: 56.250000014px;
}
.image-preview {
  height: 300px;
  left: -4px;
  margin: 0 auto;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
}
.image-preview__img {
  border: 2px solid gray;
  height: 300px;
  object-fit: cover;
  object-position: center;
  width: 100%;
}
</style>
