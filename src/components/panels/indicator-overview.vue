<template>
  <div class="d-flex t">
    <!-- Indicator here -->
    <div class="d-flex flex-column w-30">
      <label class="panel-label">Indicator</label>

      <div>
        <multiselect
          v-model="value"
          :options="options"
          :multiple="true"
          :close-on-select="false"
          :clear-on-select="false"
          :preserve-search="true"
          placeholder="Pick some"
          label="name"
          track-by="name"
          :preselect-first="true"
        ></multiselect>
      </div>
    </div>

    <!-- Location here -->
    <div class="d-flex flex-column w-20">
      <label class="panel-label">location</label>

      <div>
        <multiselect
          v-model="value"
          :options="options"
          :multiple="true"
          :close-on-select="false"
          :clear-on-select="false"
          :preserve-search="true"
          placeholder="Pick some"
          label="name"
          track-by="name"
          :preselect-first="true"
        ></multiselect>
      </div>
    </div>

    <!-- Data sources here -->
    <div class="d-flex flex-column w-20">
      <label class="panel-label">data sources</label>

      <div>
        <multiselect
          v-model="value"
          :options="options"
          :multiple="true"
          :close-on-select="false"
          :clear-on-select="false"
          :preserve-search="true"
          placeholder="Pick some"
          label="name"
          track-by="name"
          :preselect-first="true"
        ></multiselect>
      </div>
    </div>

    <!-- year here -->
    <div class="d-flex flex-column w-20">
      <label class="panel-label">year</label>

      <div>
        <multiselect
          v-model="value"
          :options="options"
          :multiple="true"
          :close-on-select="false"
          :clear-on-select="false"
          :preserve-search="true"
          placeholder="Pick some"
          label="name"
          track-by="name"
          :preselect-first="true"
        ></multiselect>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';

export default {
  data() {
    return {
      activetab: 1,
      value: [],
      options: [
        { name: 'Vue.js', language: 'JavaScript' },
        { name: 'Adonis', language: 'JavaScript' },
        { name: 'Rails', language: 'Ruby' },
        { name: 'Sinatra', language: 'Ruby' },
        { name: 'Laravel', language: 'PHP' },
        { name: 'Phoenix', language: 'Elixir' },
      ],
    };
  },
  components: { Multiselect },
};
</script>

<style scoped>
.t {
  justify-content: space-between;
}

.w-30 {
  width: 421px;
}
.w-20 {
  width: 165px;
}
</style>
