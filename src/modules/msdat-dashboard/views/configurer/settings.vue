<template>
    <div>
        <h1>Settings Page</h1>
        <router-link to="/configure/user/preview">Preview</router-link>
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
