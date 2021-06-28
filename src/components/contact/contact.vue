<template>
  <div class="lineHeight">
        <!-- <h1 slot="title">Contact Us</h1> -->
        <p slot="body_msg" class="bold my-0" > Send a message to the MSDAT Team</p>
         <p v-show="nofields" class="alert alert-warning mt-3">Please fill all fields correctly</p>
          <p v-show="successmessage"
             class="alert alert-success fonttxt mt-2"
             role="alert">
             Thank you.
             We will keep you informed about any latest updates </p>
          <p v-show="errormessage"
           class="alert alert-danger rounded">
           An error occured, please try again later.</p>
        <div class= " newGrid grid mt-4" slot="top1">

        <span>
           <label>Name</label>
        <input
            slot="top1"
            type="text"
            class="form-control fonttxt"
             placeholder="First name"
            v-model="firstName"
        />
        </span>
        <span class="mt-2">
          <!-- <label> Last name</label> -->
          <input
            slot="top1"
            type="text"
            class="form-control fonttxt inputMargin"
             placeholder="Last name"
            v-model="lastName"
        />
        </span>
        <span>
              <label> Email </label>
         <input
            slot="top1"
            type="email"
            class="form-control fonttxt"
            placeholder="mail@example.com"
            v-model="contactFormFields.email"
        />
        </span>

        <span>
        <label > Phone number</label>
         <input
            slot="top1"
            type="number"
            class="form-control fonttxt"
            placeholder="Phone number"

        />
        </span>

        <!-- <span>
          <label> Category</label> <br>
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
         </span> -->

         </div>
        <span >
            <label class="mt-2" > Organisation</label>
         <input
            slot="top1"
            type="text"
            class="form-control fonttxt"
            placeholder="Place of work"
            v-model="contactFormFields.organization"
        />
        </span>
        <textarea
          slot="top2"
          class="form-control fonttxt mt-3"
          placeholder="Type your message"
          v-model="contactFormFields.feedback"
          cols="55"
          rows="5"/>

        <div class=" d-flex flex-row-reverse">
              <a class="mt-2" href = "mailto:msdatfeedback@e4email.net?subject = Feedback&body = Message">
            or send an e-mail to msdatfeedback@e4email.net
            </a>
        </div>

         <div slot="footer" class="sendButton send--send ml-5">

              </div>
        <!-- <strong slot="bottom1"> send an email </strong> -->

  </div>
</template>

<script>
import axios from 'axios';

export default {
  components: {

  },
  data() {
    return {
      contactbtn: true,
      nofields: false,
      successmessage: false,
      errormessage: false,
      selected: 'Select a Category',
      firstName: '',
      lastName: '',
      contactFormFields: {
        organization: '',
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
  props: {
    submitForm: {
      type: Boolean,
      default: () => false,
    },
  },
  watch: {
    submitForm(newValue) {
      console.log('yada');
      if (newValue) {
        console.log('it has changed o');
        console.log(newValue);
        this.conformSend();
      } else {
        console.log('other one');
      }
    },
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
      this.firstName = '';
      this.lastName = '';
      this.submitForm = false;
      // this.contactFormFields.organization = '';
      // this.contactFormFields.category = this.selected;
    },

    conformSend() {
      if (
        this.validFields(this.firstName)
       && this.validEmail(this.contactFormFields.email)

      ) {
        console.log('passed validation ish');

        this.errormessage = false;
        this.nofields = false;
        if (
          this.firstName
          && this.contactFormFields.email
        ) {
          this.contactFormFields.name = `${this.firstName} ${this.lastName}`;
          console.log(this.contactFormFields.name);
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

</style>
