<template>
        <div class="container">
        <!-- <h1>MSDAT Apps Plugins: Simplifying Plugin Development</h1> -->
        <h4>Introduction:</h4>
        <span>The MSDAT (Multi-Source Data Analytic and Triangulation) Apps Plugins offer a streamlined approach to extending the functionality of various applications within the MSDAT ecosystem. These plugins empower developers to enhance and customize the capabilities of MSDAT tailoring them to specific needs.</span>
        <br><br>
        <h4>Step 1: Cloning the Boilerplate</h4>
        <ol>
            <li>Visit the GitHub Repository: Navigate to the official MSDAT repository on GitHub 
      <a href="https://github.com/e4edevops/msdat-plugin-project-context.git" target=”_blank”>MSDAT Plugins repository</a>
              . Here, you'll find the boilerplate code that serves as the foundation for creating plugins.</li>
            <li>Clone the Boilerplate: Clone the boilerplate code repository to your local development environment. This boilerplate serves as a pre-configured template, saving you time and effort in setting up the initial structure for your plugin.</li>
        </ol>
        <p>For detailed instructions on using the MSDAT boilerplate, refer to the comprehensive documentation provided below. This documentation walks you through the process of utilizing the MSDAT boilerplate effectively, ensuring you understand how to harness its capabilities to craft robust app plugins.</p>
        <h4>Step 2: Plugin Development and Packaging</h4>
        <ol>
            <li>Develop Your Plugin: Leverage the bioilerplate as a starting point. Implement your desired features, integrations, or improvements within the plugin's codebase.</li>
            <li>Create a Zip Folder: Once your plugin development is complete, organize the plugin files and resources into a structured directory. Then, create a compressed zip folder containing these files. This packaged zip folder will be used for submission and review.</li>
        </ol>
        <h4>Step 3: Submission and Explanation</h4>
        <ol>
            <li>Upload the Zip File: Access the designated submission portal provided by MSDAT. Use the portal to upload the zip folder containing your plugin's codebase and resources.</li>
            <li>Explain Your Plugin: Accompany the submission with a clear and concise explanation of your plugin's purpose, functionalities, and any notable features. Provide insights into how your plugin enhances the user experience or extends the application's capabilities.</li>
        </ol>
        <div class="d-flex justify-content-center m-10">
      <b-button v-b-toggle.collapse-3 class="m-1" variant="primary">Submit plugin</b-button>
    </div>  <b-collapse visible id="collapse-3">
    <b-card>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.name"
          placeholder="Enter name"
          required
        ></b-form-input>
      </b-form-group>
    
          <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Phone" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.phone"
          placeholder="Enter phone number"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Purpose" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.purpose"
          placeholder="Purpose"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Description" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.description"
          placeholder="Enter description"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Plugin file" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.plugin_file"
          placeholder="Enter file link"
          required
        ></b-form-input>
        <b-icon v-b-tooltip.hover title="Upload link to a remote drive where you uploaded the zip file." icon="exclamation-circle-fill" variant="success"></b-icon>
      </b-form-group>
 
      <!-- <b-form-textarea
      id="textarea"
      v-model="text"
      placeholder="Enter something..."
      rows="3"
      max-rows="6"
    ></b-form-textarea> -->

      <!-- <input type="file"> -->
      

      <!-- <b-button @click="onSubmit()" type="submit" variant="primary">Submit</b-button> -->
      
      <b-button type="submit" variant="primary">Submit</b-button>

<b-modal id="upload_plugin_success" title="Success" hide-footer>
  <p class="my-4">Your plugin has been submittted successfully</p>
</b-modal>

<b-modal id="upload_plugin_error" title="Error" hide-footer >
  <p class="my-4">There was an error while submitting your plugin</p>
</b-modal>
    </b-form>
    </b-card>
  </b-collapse>
  <br> 
        <h4>Step 4: Review Process</h4>
        <ol>
            <li>Technical Review: The MSDAT team will assess your plugin's technical aspects, ensuring it adheres to coding standards, security practices, and compatibility requirements.</li>
            <li>Functionality Review: The functionality of your plugin will be evaluated against the expectations and objectives outlined during the submission.</li>
        </ol>
        <p>Upon completion of the review, you'll receive notification of whether your plugin meets the specified requirements.</p>
        <h4>Step 5: Plugin Deployment</h4>
        <ol>
            <li>Confirmation: Upon meeting the requirements, you'll receive confirmation that your plugin has been approved for deployment.</li>
            <li>Voila, Ready to Use: Your plugin is now available for users to integrate seamlessly into their MSDAT application.</li>
        </ol>
        <p>In conclusion, MSDAT Apps Plugins offer a systematic approach to plugin development, submission, and deployment within the MSDAT ecosystem. By following these steps, you'll be able to create impactful plugins that contribute to a more tailored and efficient user experience across MSDAT applications.</p>
    </div>
</template>


<style scoped>
.container {
    margin: 20px auto;
    /* padding: 20px; */
    background-color: #fff;
    /* box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); */
    border-radius: 5px;
    max-height: 70vh;
    overflow-x: scroll;
}
h1 {
    color: #333;
}
h4 {
    color: #555;
}
p {
    color: #777;
}
</style>


<script>
import { mapActions } from 'vuex';

  export default {
    data() {
      return {
        form: {
          email: '',
          name: '',
          phone: null,
          purpose: '',
          description: '',
          plugin_file: ''
        },
        foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
        show: true
      }
    },
    methods: {
  ...mapActions(['SUBMIT_PLUGIN']), // Assuming SUBMIT_PLUGIN is an action provided by Vuex

  // Define a method for form submission
  onSubmit() {
    this.SUBMIT_PLUGIN(this.form)
      .then(() => {
        // Handle success
        this.$bvModal.show('upload_plugin_success');
      })
      .catch(error => {
        // Handle error
        console.error(error);
        this.$bvModal.show('upload_plugin_error');
        // You can show a different modal or handle errors in an appropriate way here
      });
  },

  onReset(event) {
    event.preventDefault();
    // Reset your form values here
    // ...
  }
}
  }
</script>
