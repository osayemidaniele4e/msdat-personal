<template>
  <form @submit.prevent="submitForm">
    <div class="row p-3" style="background-color: #f6f6f6">
      <h4
        style="
          top: 302px;
          left: 140px;
          height: 52px;
          font: var(--unnamed-font-style-normal) normal
            var(--unnamed-font-weight-normal) 40px/52px
            var(--unnamed-font-family-dm-sans);
          letter-spacing: var(--unnamed-character-spacing-0);
          color: var(--unnamed-color-202020);
          text-align: left;
          font: normal normal normal 40px/52px DM Sans;
          letter-spacing: 0px;
          color: #202020;
          opacity: 1;
        "
      >
        Welcome {{ userDetails }}
      </h4>

      <div class="col-6">
        <div class="form-group" :class="{ invalid: !dName.isValid }">
          <label for="d-Name" class="text" style="height: 26px"
            >Give your dashboard a name</label
          >
          <input
            type="text"
            id="d-Name"
            v-model.trim="dName.val"
            @blur="clearValidity('dName')"
            placeholder="Hint: It should be Easy to Understand"
            class="form-control"
          />
          <p v-if="!dName.isValid">This must not be empty.</p>
        </div>
        <div class="form-group" :class="{ invalid: !description.isValid }">
          <label for="description" class="text mt-5" style="height: 26px"
            >Description of your dashboard</label
          >
          <input
            type="text"
            id="description"
            v-model.trim="description.val"
            @blur="clearValidity('description')"
            placeholder="Hint: Use easy to Understand terms"
            class="form-control"
          />
          <p v-if="!description.isValid">This must not be empty.</p>
          <slot class="text"></slot>
        </div>
      </div>

      <div class="col-6 p-5">
        <div class="photo-upload">
          <div class="file-upload-form">
            <input
              type="file"
              @change="previewThumbnail"
              name="photo-upload-button"
              id="photo-upload-button"
              accept="image/*"
              class="input-file"
            />
            
          <label for="photo-upload-button" class="col">
            <img  src="/image-upload-icon.png" style="height:50px;">
            <span >Upload Dashboard Logo</span></label>
            
          </div>
          <div class="image-preview" v-if="this.imageData.length > 0">
            <img :src="imageData" class="image-preview__img" />
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <button class="col-2 bg-primary mt-4">SELECT INDIVIDUAL DATA</button>
      <div class="col-3 m-3 mt-3" style="color: #696767">
        <span class="row">I know the exact data I want.</span>
        <span class="row">I will choose just the ones I need.</span>
      </div>

      <button class="col-2 m-3 mt-4" disabled>SELECT All DATA</button>
      <div class="col-3 mt-3" style="color: #696767">
        <span class="row">I know the exact data I want.</span>
        <span class="row">I will choose just the ones I need.</span>
      </div>
    </div>
  </form>

  <!-- <input type="file" name="" id=""> -->
</template>

<script>
export default {
  data() {
    return {
      imageData: "",
      dName: {
        val: "",
        isValid: true,
        
      },
      description: {
        val: "",
        isValid: true,
      },
      formIsValid: true,
    };
  },
  computed: {
    userDetails() {
      return this.$store.getters["user"];
    },
  },
  methods: {
    previewThumbnail: function getPreview(event) {
      const input = event.target;
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageData = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;
      if (this.dName.val === "") {
        this.dName.isValid = false;
        this.formIsValid = false;
      }
      if (this.description.val === "") {
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

      this.$emit("save-data", formData);
    },
  },
};
</script>

<style scoped>
input[type="text"] {
  top: 406px;
  left: 140px;

  height: 75px;
  background: #eaeaea 0% 0% no-repeat padding-box;
  opacity: 1;
}
input[type="file"] {
  top: 363px;
  left: 1012px;

  height: 301px;
  border: 1px solid #d3d3d3;
  opacity: 1;
}
.text {
  font: var(--unnamed-font-style-normal) normal
    var(--unnamed-font-weight-normal) var(--unnamed-font-size-20) /
    var(--unnamed-line-spacing-26) var(--unnamed-font-family-dm-sans);
  letter-spacing: var(--unnamed-character-spacing-0);
  color: var(--unnamed-color-202020);
  text-align: left;
  font: normal normal normal 20px/26px DM Sans;
  letter-spacing: 0px;
  color: #202020;
  opacity: 1;
}
.photo-upload {
		height: auto;
		margin: 20px 0;
		position: relative;
		text-align: center;
		width: 100%;
}
.input-file {
		height: 0.1px;
		opacity: 0;
		overflow: hidden;
		position: absolute;
		width: 0.1px;
		z-index: -1;					

}
.input-file + label {
background: transparent;
			border: 2px solid #D3D3D3;
			color: gray;
			display: inline-block;
			font-size: 12pt;
			font-weight: 500;
			height: 200px;
			line-height:200px ;
			text-align: center;
			width: 200px;
}

.input-file:focus + label {
  border-color: #D3D3D3
}


.input-file:hover,:focus {
  border-color: #D3D3D3;
		cursor: pointer;
}

.image-preview{		
		height: 200px;
		left: -4px;
		margin: 0 auto;
		pointer-events: none;
		position: absolute;
		right: 0;
		top: 0;
		width: 200px;
}
.image-preview__img{
			border: 2px solid gray;
			height: 200px;
			object-fit: cover;
			object-position: center;
			width: 200px;
}
/* .form-control {
  margin-bottom: 5px;
}

form {
  margin-left: 50px;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input {
  width: 20%;
  border: 1px solid #ccc;
  font: inherit;
  padding: 14px;
  background-color: #bcbcbc;
  color: rgb(0, 0, 0);
  margin-bottom: 39px;
}

input:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #004a61;
  border: 1px solid #3a0061;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  display: inline-block;
  margin: 6px;
  width: 20%;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: #270041;
  border-color: #270041;
} */

.invalid p {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
