<template>
  <div>
    <button @click="contactbtn = true" class="send bi bi-alarm-fill"> Contact</button>

    <MODAL v-show="contactbtn" v-on:closeContact="closeContactform"
    v-on:submitContact="conformSend"
     :nofields="nofields" :successmessage="successmessage">

        <h1 slot="title">Contact Us</h1>
        <strong slot="body_msg"> Send a message to the MSDAT Team</strong>
        <input
            slot="top1"
            type="text"
            class="form-control"
            placeholder="Type your name"
            v-model="contactFormFields.name"
        />
        <textarea
          slot="top2"
          class="form-control"
          placeholder="Type your message"
          v-model="contactFormFields.feedback"
          cols="55"
          rows="5"/>
        <span slot="top3" class="feedback">*we will get back to you as soon as possible</span>
        <strong slot="bottom1"> or send an email </strong>
        <input
            slot="bottom2"
            type="email"
            class="form-control emailField"
            placeholder="Send an e-mail to hello@msdat-team.com"
            v-model="contactFormFields.email"
        />

    </MODAL>
  </div>
</template>

<script>
import axios from 'axios';
import MODAL from '../ui-components/modal/modal.vue';

export default {
  components: {
    MODAL,
  },
  data() {
    return {
      contactbtn: false,
      nofields: false,
      successmessage: false,
      errormessage: false,
      contactFormFields: {
        name: '',
        email: '',
        feedback: '',
      },
      error: false,
    };
  },
  methods: {
    validFields(field) {
      const re = /(.*[a-z]){3}/i;
      return re.test(field);
    },
    validEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },

    conformSend() {
      // this.loader = true;
      const headers = {
        Authorization: 'Bearer 054d817a3b1a3a2c5edf656959334969e1264e84',
      };
      if (
        this.validFields(this.contactFormFields.name)
        && this.validEmail(this.contactFormFields.email)
        && this.validFields(this.contactFormFields.feedback)
        // this.contactFormFields.name != "" ||
        // this.contactFormFields.email != "" ||
      ) {
        console.log('passed validation ish');
        console.log(this.apiFormat(this.contactFormFields));
        this.errormessage = false;
        if (
          this.contactFormFields.name
          && this.contactFormFields.email
          && this.contactFormFields.category
        ) {
          axios
            .post(
              'https://msdatapi.fmohconnect.gov.ng/api/account/contact/',
              this.contactFormFields,
              { headers },
            )
            .then((response) => {
              console.log(this.apiFormat(this.contactFormFields));

              if (response.status === 201) {
                this.successmessage = true;
                this.contactFormFields.name = '';
                this.contactFormFields.email = '';
                this.contactFormFields.feedback = '';
              } else {
                this.errormessage = true;
              }
            })
            .catch((e) => {
              console.log(e);
              this.errormessage = true;
            });
          // console.log("testing form");
        }
      } else {
        this.nofields = true;
      }
    },

    apiFormat(value) {
      const parentArray = [];
      const childArray = [];
      childArray.push(
        value.name,
        value.email,
        value.feedback,
      );
      parentArray.push(childArray);
      return JSON.stringify({ data: parentArray });
    },

    closeContactform() {
      this.contactbtn = false;
      this.toggleModal = false;
      this.contactForm = false;
      this.errormessage = false;
      this.loader = false;
      this.nofields = false;
      this.successmessage = false;
      this.contactFormFields.name = '';
      this.contactFormFields.feedback = '';
      this.contactFormFields.email_address = '';
    },
  },

};
</script>

<style scoped>
.fonttxt {
   font-family:  "adobe-clean", sans-serif
}
input {
  margin: 10px 0px;
  outline: none;
  -webkit-appearance: none;
}
.form-control:focus{

     box-shadow:none;
}

textarea {
    resize: none;
    outline: none;
    display: block;
}
.send {
    position: relative;
    color: white;
    background-color: #007D53;
    border-radius: 3px;
    font-size: 15px;
    border: none;
    cursor: pointer;
    padding: 13px 20px;
    margin: 10px;
    outline: none;
    }

h1 {
    font-weight: 1000;
    font-size: 17px;

    }
strong {
  color: rgb(78, 68, 68);
}

.modal {
    position: fixed;
    display: flex;
    align-items: center;
    inset: 0;
    }

.emailField {
    background-color:rgb(240, 247, 248);
    margin: 10px 0;
    width: 80%;
    padding: 15px 30px;
    border: 1px solid rgb(193, 223, 240);
    }
</style>
