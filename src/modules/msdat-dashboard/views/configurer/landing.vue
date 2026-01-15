<template>
    <div>
        <h1>Configurer Landing Page</h1>
        <router-link to="/configure/account">Create Account</router-link>
    </div>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  components: {
    RouterLink,
  },
};
</script>
