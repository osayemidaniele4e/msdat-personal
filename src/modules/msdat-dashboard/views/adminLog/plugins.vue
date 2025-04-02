<template>
 <div class="plugins-page">
   <!-- Page Header -->
   <div class="d-flex justify-content-between align-items-center mb-4">
     <h4>Plug-Ins</h4>
     <b-button variant="success">Upload New Plug-In</b-button>
   </div>

   <!-- Tabs for Available and Pending Plug-Ins -->
   <b-tabs card>
     <b-tab title="Available Plug-Ins" active>
       <div class="plugin-list">
         <b-row v-for="(plugin) in availablePlugins" :key="plugin" class="plugin-card mb-3" :class="{'highlighted': plugin.highlighted}">
           <b-col cols="8">
             <h5>{{ plugin }}</h5>
             <p>This plugin is available</p>
           </b-col>
           <b-row  >
             <!-- Toggle Switch -->
             <b-col>
                <small>Last Updated: 10th April, 2024</small>
              <b-row class="check-form">

                <!-- <b-form-checkbox
                  v-model="plugin.enabled"
                  switch
                  size="lg"
                  :value="true"
                  :unchecked-value="false"
                ></b-form-checkbox> -->
                <!-- Action Dropdown -->
                <b-dropdown right variant="link" class="ml-2">
                  <template #button-content>
                    <b-icon-three-dots-vertical></b-icon-three-dots-vertical>
                  </template>
                  <b-dropdown-item @click="disablePlugin(plugin.id)">Disable Plug-In</b-dropdown-item>
                  <!-- <b-dropdown-item @click="updatePlugin(plugin.id)">Update Plug-In</b-dropdown-item> -->
                  <b-dropdown-item @click="deletePlugin(plugin.id)">Delete Plug-In</b-dropdown-item>
                </b-dropdown>
              </b-row>
              </b-col>
           </b-row>
         </b-row>
       </div>
     </b-tab>

     <!-- Pending Plug-Ins Tab -->
     <b-tab title="Pending Plug-Ins">
       <p>No pending plug-ins.</p>
     </b-tab>
   </b-tabs>
 </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      availablePlugins: [],
    };
  },

  computed: {
    ...mapGetters(['getPluginsImported']),
  },

  methods: {
    disablePlugin(pluginId) {
      console.log('Disable plugin:', pluginId);
      // Logic to disable the plugin
    },
    deletePlugin(pluginId) {
      console.log('Delete plugin:', pluginId);
      // Logic to delete the plugin
    },
  },

  mounted() {
    this.availablePlugins = this.getPluginsImported;
    this.availablePlugins.forEach((plugin) => {
      console.log('Plugin details:', plugin);
    });
  },
};
</script>

<style scoped>
.plugins-page {
 padding: 30px;
}

.plugin-card {
display: flex;
justify-content: space-between;
 padding: 15px;
 background-color: #f8f9fa;
 border-radius: 8px;
 box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.check-form{
  display: flex;
  justify-content: end;
  align-items: flex-end;
}

plugin-card.highlighted {
 background-color: #eaf7f4; /* For highlighted plugin (like the second one) */
}

.plugin-list {
 display: flex;
 flex-direction: column;
 justify-content: space-between;
}
.plugin-list p {
 margin: 0;
 color: #6c757d;
}

.b-tabs-card {
 margin-top: 20px;
}
</style>
