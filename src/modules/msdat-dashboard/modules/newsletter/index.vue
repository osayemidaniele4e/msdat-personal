<template>
  <div id="newsLetter">
    <b-button @click="showModal" ref="btnShow">Launch news_letter modal</b-button>

    <b-modal id="modal-newsLetter" class="newsLetter" centered title="">
      <div class="card border-0 rounded-0">
        <div class="card-header text-center pt-4 rounded-0">
          <img
            :src="require('@/assets/img/open_envelope.svg')"
            alt="envelope"
            class="mt-3"
            width="20%"
          />
        </div>
        <div class="card-body">
          <div class="text-center">
            <h6><strong>Keep me updated</strong></h6>
            <p class="small">
              Subscribe to our newsletter to receive latest updates on the MSDAT dashboard.
            </p>
          </div>
          <form action="" v-on:submit.prevent="newsLetter()">
            <div class="form-group">
              <label for="name" class="sr-only">Your name</label>
              <input
                type="text"
                class="form-control"
                name="name"
                id="name"
                aria-describedby="helpId"
                placeholder="Your name"
                v.model="name"
                required
                autocomplete="name"
              />
            </div>
            <div class="form-group">
              <label for="name" class="sr-only">Your email address</label>
              <input
                type="email"
                class="form-control"
                name="email"
                id="email"
                aria-describedby="helpId"
                placeholder="Your email address"
                v.model="email"
                required
                autocomplete="email"
              />
            </div>

            <div class="text-center">
              <button class="text-center btn btn-success btn-lg px-5 text-uppercase mb-2">
                Subscribe
              </button>
              <br />
              <small class="pointer-cursor" @click="hideModal">No, thank you</small>
            </div>
          </form>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import './style.scss';
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'Modal',
  components: {},
  data() {
    return {
      fullname: '',
      email: '',
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
      /**
       * TODO: key for authentication
       */
      this.loading = true;
      const url = `${process.env.VUE_APP_API_BASE_URL1}`;
      const now = moment().format('LLLL');
      const subscription = {
        email: this.email,
        name: this.fullname,
        created: now,
      };
      try {
        const resp = await axios.post(url, subscription);
        if (resp.data) {
          this.$swal({
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
            timer: 5000,
            icon: 'success',
            title: 'Success',
          });
        }
      } catch (error) {
        this.$swal({
          toast: true,
          position: 'top-right',
          showConfirmButton: false,
          timer: 5000,
          icon: 'success',
          title: `${error.message}`,
        });
      } finally {
        this.loading = false;
        this.fullname = '';
        this.email = '';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
small.pointer-cursor {
  cursor: pointer;
}
div.card {
  div.card-header {
    background-color: #007d53;
    border: 2px solid #007d53;
    height: 10rem;
    width: 100%;
  }
}
button.btn-success {
  background-color: #007d53;
  border: 2px solid #007d53;
  font-size: 0.9rem;
}
input.form-control {
  padding: 1.5rem 0.8rem;
  border-radius: 0.2rem;
  margin-bottom: 1.5rem;
}
</style>
