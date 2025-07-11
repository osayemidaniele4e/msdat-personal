<template>
    <div>
        <h1>Account Page</h1>
        <span>This page should contain the following components:</span>
        <ul>
            <li>Sign up Component</li>
            <li>Log in Component</li>
            <li>Email Confirmation</li>
        </ul>
        <router-link to="/configure/user/customize">Customize</router-link>
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
