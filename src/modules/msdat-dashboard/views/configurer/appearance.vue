<template>
    <div>
        <h1>Appearance Page</h1>
        <router-link to="/configure/user/settings">Other Settings</router-link>
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
