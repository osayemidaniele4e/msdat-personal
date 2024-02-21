<template>
  <div id="newsLetter">
    <!-- <b-button @click="showModal" ref="btnShow">Launch news_letter modal</b-button> -->

    <b-modal id="modal-newsLetter" class="newsLetter" centered="false" hide right title="">
      <div class="card border-5 rounded-5">
        <div class="card-header pt-5 p-4 rounded-0">
          <button
            type="button"
            class="close"
            @click="hideModal"
            style="margin-top: -30px; color: red"
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <h2>
            Subscribe To Our <span> <h1>Newsletter</h1> </span>
          </h2>
          <p class="small card-sub-text">Get exclusive news and articles from us!</p>
        </div>
        <div class="card-body">
          <div class="text-center"></div>
          <form action="" v-on:submit.prevent="newsLetter()" class="subscribe-form">
            <div class="form-group mb-0">
              <label for="name" class="sr-only">Email address</label>
              <input
                type="email"
                class="form-control"
                name="email"
                id="email"
                aria-describedby="helpId"
                placeholder="Email address"
                v-model="email"
                required
                autocomplete="email"
              />
            </div>

            <button
              class="btn btn-success btn-lg"
              type="submit"
              :disabled="loading"
              :class="{ submitting: loading }"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import './style.scss';
import axios from 'axios';

export default {
  name: 'NewsLetterModal',
  components: {},
  data() {
    return {
      email: '',
      loading: false,
    };
  },
  methods: {
    showModal() {
      this.$root.$emit('bv::show::modal', 'modal-newsLetter', '#btnShow');
    },
    hideModal() {
      this.$root.$emit('bv::hide::modal', 'modal-newsLetter', '#btnShow');
    },

    async newsLetter() {
      this.loading = true;
      const url = `${process.env.VUE_APP_API_STAGING_BASE_URL}/mailchimp/`;
      const data = {
        email: this.email,
      };
      try {
        const response = await axios.post(url, data);
        if (response.data) {
          this.email = '';
          this.$swal({
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
            timer: 5000,
            icon: 'success',
            title: 'Success',
            text: 'You have successfully subscribed to our newsletter.',
          });
          this.hideModal();
          this.modalShown();
        }
      } catch (error) {
        this.$swal({
          toast: true,
          position: 'top-right',
          showConfirmButton: false,
          timer: 5000,
          icon: 'info',
          title: 'Attention',
          text: 'An Error Occured, Please try again' || `${error.message}`,
        });
      } finally {
        this.loading = false;
      }
    },
    modalShown() {
      // eslint-disable-next-line no-unused-expressions
      localStorage.setItem('modalShown') === 'true';
    },
  },
};
</script>

<style lang="scss" scoped>
small.pointer-cursor {
  cursor: pointer;
}
.modal-body {
  width: 450px !important;
}
div.card {
  width: 420px;
  border: 2px solid #fff !important;
  // border-radius: 10px !important;

  div.card-header {
    border: 2px solid #fff;
    border-radius: 5px;
    height: 12rem;
    background-color: unset !important;
    // width: 100%;
  }
  h2 {
    color: #007d53;
  }
  div.card-header p {
    color: #000;
    font-size: 14px;
  }
}
.form-control {
  background-color: #dff3f3;
}
.subscribe-form {
  display: flex;
  // justify-content: space-between;
  align-items: center;
  margin-bottom: 0; /* Remove default bottom margin */
}

.subscribe-form .form-group {
  flex: 1; /* Let the input take up available space */
  margin-right: 0;
  // margin-right: 10px; /* Adjust as needed */
}

.subscribe-form button {
  flex-shrink: 0; /* Prevent the button from shrinking */
  background-color: #007d53;
  font-size: 13px;
  margin-left: 0; /* Remove left margin */
}
</style>
