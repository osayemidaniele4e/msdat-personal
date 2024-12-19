<template>
  <div class="datasource-container">
    <div class="whats-new-content">
      <div @click="closeComponent" class="close-btn">
        <img src="../../../../assets/close-icon.png" alt="" />
      </div>
      <div class="d-flex w-100 justify-content-center mt-2 title">
        <h1>What's New!</h1>
      </div>
      <div class="w-100">
        <span class="label">Name</span>
        <input class="styled-input" v-model="title" type="text" />
      </div>
      <div class="w-100 my-4">
        <span class="label">Type</span>
        <select class="styled-select" v-model="type">
          <option value="" disabled>Select an option</option>
          <option value="Dataset">Dataset</option>
          <option value="Dashboard">Dashboard</option>
          <option value="Feature">Feature</option>
        </select>
      </div>
      <div class="my-2">
        <span class="label">Description</span>
        <textarea
          placeholder="Enter your message"
          class="styled-textarea"
          v-model="description"
        ></textarea>
      </div>
      <div class="d-flex w-100 justify-content-between">
        <button class="add-btn">Add More Update</button>
        <button @click="submit" class="submit-btn">Submit Update</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import ApiServices from '@/modules/data-layer/services/ApiServices';

export default {
  data() {
    return {
      whatsNew: [],
      title: null,
      type: null,
      description: null,
    };
  },
  methods: {
    ...mapMutations('MSDAT_STORE', ['toggleShowWhatsNew', 'closeShowWhatsNew']),

    closeComponent() {
      this.$emit('closeModal');
    },
    validateObject(obj) {
      Object.entries(obj).forEach(([key, value]) => {
        if (value === null || value === undefined || value === '') {
          throw new Error(`The key "${key}" has an invalid value: ${value}`);
        }
      });
    },
    async submit() {
      const categoryMap = {
        Dashboard: 2,
        Dataset: 1,
        Feature: 3,
      };
      const data = {
        title: this.title,
        content: this.description,
        category: categoryMap[this.type],
      };
      try {
        this.validateObject(data);
        console.log('Object is valid!');
        console.log(data);
        const response = await ApiServices.saveWhatsNew(data);
        this.$emit('closeModal');
        console.log(response);
      } catch (error) {
        console.error(error.message);
      }
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

.datasource-container {
  position: relative;
  border: 1px solid #c3c3c3;
  background-color: rgba(0, 0, 0, 0.4); // Adjust opacity only for the background
  height: 100%;
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 16px;
  }
  h2 {
    font-size: 14px;
    font-weight: bold;
  }
}

.close-btn {
  position: absolute;
  top: 5px;
  right: 5px;
}

.close-btn img {
  width: 32px;
  height: 32px;
  cursor: pointer;
}
.whats-new-content {
  position: relative;
  //   right: 20px;
  min-height: 300px;
  width: 600px;
  // top: 5rem;
  background-color: white;
  padding: 30px;
  border-radius: 10px;
}

.title h1 {
  font-size: 24px;
  color: #348481;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  line-height: 24px;
  line-height: 28px;
}
.new-item {
  margin: 10px 0;
  display: flex;
}
.icon img {
  height: 35px;
  width: 35px;
}
.info {
  width: 100%;
  margin: 0 10px;
}
.info h2 {
  margin: 0;
  font-size: 16px;
  font-family: 'DM Sans', sans-serif;
  font-weight: 600;
  line-height: 18px;
  color: #202020;
}

.info h3 {
  margin: 0;
  font-size: 14px;
  font-family: 'DM Sans', sans-serif;
  font-weight: 600;
  line-height: 18px;
  color: #202020;
}
.info p {
  font-size: 14px;
  font-family: 'DM Sans', sans-serif;
  font-weight: 400;
  line-height: 20px;
  color: #202020;
}

.link {
  font-size: 14px;
  color: #348461;
  font-family: 'DM Sans', sans-serif;
  font-weight: 400;
  line-height: 20px;
  color: #202020;
  cursor: pointer;
}
.link:hover {
  text-decoration: underline;
  color: #0e3a27;
  cursor: pointer;
}
.styled-input {
  width: 100%; /* Make it responsive */
  padding: 10px; /* Add padding inside the input */
  border: 2px solid #ccc; /* Light gray border */
  border-radius: 5px; /* Rounded corners */
  font-size: 16px; /* Make text larger */
  outline: none; /* Remove default outline */
  transition: border-color 0.3s ease; /* Smooth transition for border color */
}

/* Input field on focus */
.styled-input:focus {
  border-color: #a1b6cc; /* Change border to blue on focus */
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Add a glowing shadow effect */
}

/* Placeholder styling */
.styled-input::placeholder {
  color: #888; /* Light gray placeholder text */
  font-style: italic; /* Italicize placeholder text */
}

/* Styling for the select dropdown */
.styled-select {
  width: 100%; /* Full width */
  padding: 10px; /* Inner spacing */
  border: 2px solid #ccc; /* Light gray border */
  border-radius: 5px; /* Rounded corners */
  font-size: 16px; /* Font size */
  outline: none; /* Remove default outline */
  appearance: none; /* Remove default OS dropdown styles */
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='gray'%3E%3Cpath d='M7 10l5 5 5-5H7z'/%3E%3C/svg%3E")
    no-repeat right 10px center; /* Custom dropdown arrow */
  background-color: #fff; /* Background color */
  background-size: 15px; /* Adjust arrow size */
  margin-bottom: 15px; /* Space below the select */
  transition: border-color 0.3s ease; /* Smooth transition for focus */
  cursor: pointer; /* Pointer cursor */
}

/* Select dropdown on focus */
.styled-select:focus {
  border-color: #a1b6cc; /* Blue border on focus */
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Glow effect */
}

/* Styling for the textarea */
.styled-textarea {
  width: 100%;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
  resize: vertical; /* Allow vertical resizing only */
  min-height: 100px; /* Set a minimum height */
  max-height: 300px; /* Optional: Limit the maximum height */
  margin-bottom: 15px;
  transition: border-color 0.3s ease;
}

.styled-textarea:focus {
  border-color: #a1b6cc;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

/* Placeholder styling for textarea */
.styled-textarea::placeholder {
  color: #888;
  font-style: italic;
}

.submit-btn {
  width: 240px;
  height: 44px;
  background-color: #007d53;
  border-radius: 4px;
  color: white;
  font-size: 20px;
  font-weight: 500;
  border: none;
}
.add-btn {
  width: 240px;
  height: 44px;
  background-color: #d4d4d4;
  border-radius: 4px;
  color: #007d53;
  font-size: 20px;
  font-weight: 500;
  border: none;
}
</style>
