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
          <form
            class="subscribe-form"
            @submit.prevent="newsLetter"
          >
            <div class="form-group mb-0">
              <label for="name" class="sr-only">Email address</label>
              <input
                type="email"
                class="form-control"
                name="EMAIL"
                id="mce-EMAIL"
                aria-describedby="helpId"
                placeholder="Email address"
                v-model="email"
                required
                autocomplete="email"
              />
            </div>

            <div aria-hidden="true" style="position: absolute; left: -5000px;">
              <input
                type="text"
                name="b_78b4bf71f180a0ed0b6d72aad_2e22273e05"
                tabindex="-1"
                value=""
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

export default {
  name: 'NewsLetterModal',
  components: {},
  data() {
    return {
      email: '',
      loading: false,
    };
  },
  computed: {
    modalShown() {
      return localStorage.getItem('modalShown') === 'true'; // Convert to boolean
    },
  },
  methods: {
    showModal() {
      this.$root.$emit('bv::show::modal', 'modal-newsLetter', '#btnShow');
    },
    hideModal() {
      this.$root.$emit('bv::hide::modal', 'modal-newsLetter', '#btnShow');
      localStorage.setItem('modalShown', 'true');
    },
    newsLetter() {
      if (!this.email) return;

      this.loading = true;
      const callbackName = `mcCallback_${Date.now()}`;
      const baseUrl
        = 'https://fmohconnect.us18.list-manage.com/subscribe/post-json?u=78b4bf71f180a0ed0b6d72aad&id=2e22273e05&f_id=00a4aae6f0';
      const script = document.createElement('script');

      const cleanup = () => {
        delete window[callbackName];
        if (script && script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };

      window[callbackName] = (response) => {
        this.loading = false;
        const isSuccess = response && response.result === 'success';

        this.$swal({
          toast: true,
          position: 'top-right',
          showConfirmButton: false,
          timer: 5000,
          icon: isSuccess ? 'success' : 'info',
          title: isSuccess ? 'Success' : 'Attention',
          text: isSuccess
            ? 'You have successfully subscribed to our newsletter.'
            : (response && response.msg) || 'An Error Occured, Please try again',
        });

        if (isSuccess) {
          this.email = '';
          this.hideModal();
          this.modalhasShown();
        }

        cleanup();
      };

      script.onerror = () => {
        this.loading = false;
        this.$swal({
          toast: true,
          position: 'top-right',
          showConfirmButton: false,
          timer: 5000,
          icon: 'info',
          title: 'Attention',
          text: 'An Error Occured, Please try again',
        });
        cleanup();
      };

      script.src = `${baseUrl}&EMAIL=${encodeURIComponent(this.email)}&c=${callbackName}`;
      document.body.appendChild(script);
    },

    modalhasShown() {
      this.loading = false;
      // eslint-disable-next-line no-unused-expressions
      localStorage.setItem('modalShown', 'true');
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
