<template>
  <div>

    <Modal  v-on:closeContact="closeContactform"
    v-on:submitContact="conformSend"
     :nofields="nofields" :successmessage="successmessage">

        <h1 slot="title">Contact Us</h1>
        <strong slot="body_msg" > Send a message to the MSDAT Team</strong>

        <div class= " newGrid grid mt-4" slot="top1">

         <input
            slot="top1"
            type="email"
            class="form-control fonttxt"
            placeholder="E-mail"
            v-model="contactFormFields.email"
        />

        <input
            slot="top1"
            type="text"
            class="form-control fonttxt"
             placeholder="Type your name"
            v-model="contactFormFields.name"
        />

         <input
            slot="top1"
            type="text"
            class="form-control fonttxt"
            placeholder="Profession"
            v-model="contactFormFields.profession"
        />

         <input
            slot="top1"
            type="text"
            class="form-control fonttxt"
            placeholder="organization"
            v-model="contactFormFields.organization"
        />
        </div>

        <select
          slot="top1" class="fonttxt"
         v-model="contactFormFields.category" :value="selected">
          <option
           :value="selected" selected disabled>
            {{selected}}</option>
           <option  v-for="item in categories" :key="item.id" >
           {{item}}
          </option>
         </select>

        <textarea
          slot="top2"
          class="form-control fonttxt"
          placeholder="Type your message"
          v-model="contactFormFields.feedback"
          cols="55"
          rows="5"/>
        <span slot="top3" class="feedback">*we will get back to you as soon as possible</span>
        <!-- <strong slot="bottom1"> send an email </strong>
        <input
            slot="bottom2"
            type="email"
            class="form-control emailField"
            placeholder="Send an e-mail to hello@msdat-team.com"
            v-model="contactFormFields.email"
        /> -->

    </Modal>
  </div>
</template>

<script>
import axios from 'axios';
import Modal from '../ui-components/modal/modal.vue';

export default {
  components: {
    Modal,
  },
  data() {
    return {
      contactbtn: true,
      nofields: false,
      successmessage: false,
      errormessage: false,
      selected: 'Select a Category',
      contactFormFields: {
        profession: '',
        organization: '',
        category: '',
        name: '',
        email: '',
        feedback: '',
      },
      categories:
       ['Suggestion', 'Complaints',
         'Ideas', 'General Feedback',
       ],
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
    noInputs() {
      this.contactFormFields.name = '';
      this.contactFormFields.feedback = '';
      this.contactFormFields.email = '';
      this.contactFormFields.feedback = '';
      this.contactFormFields.profession = '';
      this.contactFormFields.organization = '';
      this.contactFormFields.category = this.selected;
    },

    conformSend() {
      if (
        this.validFields(this.contactFormFields.name)
       && this.validEmail(this.contactFormFields.email)

      ) {
        console.log('passed validation ish');

        this.errormessage = false;
        this.nofields = false;
        if (
          this.contactFormFields.name
          && this.contactFormFields.email
        ) {
          console.log(`bout to post${this.contactFormFields}`);
          axios
            .post(
              'http://209.182.232.228:7000/api/account/contact/',
              this.contactFormFields,
            )
            .then((response) => {
              if (response.status === 201) {
                this.successmessage = true;
                this.noInputs();
              } else {
                this.errormessage = true;
                console.log('failed to post');
              }
            })
            .catch((e) => {
              console.log(e);
              this.errormessage = true;
            });
        } else {
          this.nofields = true;
          console.log('failed to post');
        }
      } else {
        this.nofields = true;
      }
    },

    closeContactform() {
      this.contactbtn = false;
      this.toggleModal = false;
      this.contactForm = false;
      this.errormessage = false;
      this.loader = false;
      this.nofields = false;
      this.successmessage = false;
      this.noInputs();
      this.$emit('closeContact');
    },
  },

  mounted() {
    this.contactFormFields.category = this.selected;
  },

};
</script>

<style src='./contact.css' scoped>

.newGrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
/*
.secondGrid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
} */

</style>
