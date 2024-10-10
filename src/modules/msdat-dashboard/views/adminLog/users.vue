<template>
 <div class="user-dashboard">
   <!-- User Summary Section -->
   <b-row class="summary-section">
     <b-col class="">
       <div class="d-flex justify-content-between align-items-center">
         <h4>User Summary</h4>
         <button class="btn-user">Add User</button>
       </div>

       <div class="user-summary mt-3">
         <b-row>
           <!-- Active Users Card -->
           <b-col cols="4">
             <div class="user-card">
               <div class="left-top w-70">
                 <h3 class="summary-number">{{ activeUsers }}</h3>
                 <p class="summary-title">Active Users</p>
                 <small>Last Updated: {{ lastUpdatedActiveUsers }}</small>
                </div>
                <div class="w-30"><a href="#" class="view-all">View All</a></div>
             </div>
           </b-col>

           <!-- Admin Profiles Card -->
           <b-col cols="4">
             <div class="user-card">
               <div class="w-70">
                 <h3 class="summary-number">{{ adminProfiles }}</h3>
                 <p class="summary-title">Admin Profiles</p>
                 <small>Last Updated: {{ lastUpdatedAdminProfiles }}</small>
                </div>
                <div class="w-30" ><a href="#" class="view-all">View All</a></div>
             </div>
           </b-col>

           <!-- Public Dashboards Card -->
           <b-col cols="4">
             <div class="user-card">
               <div class="w-70">
                 <h3 class="summary-number">{{ publicDashboards }}</h3>
                 <p class="summary-title">Public Dashboards</p>
                 <small>Last Updated: {{ lastUpdatedPublicDashboards }}</small>
                </div>
                <div class="w-30" ><a href="#" class="view-all">View All</a></div>
             </div>
           </b-col>
         </b-row>
       </div>
     </b-col>
   </b-row>

   <!-- Search and Table Section -->
   <b-row class="mt-4">
     <b-col>
       <div class="d-flex mb-2">
         <b-form-input v-model="searchQuery" placeholder="Search Users" class="mr-2"></b-form-input>
         <button class="btn-user" @click="searchUsers">Search</button>
         <b-form-select v-model="filterRole" class="ml-2">
           <option value="">All Users</option>
           <option value="Admin">Admin</option>
           <option value="User">User</option>
         </b-form-select>
       </div>

       <!-- Users Table with Checkboxes -->
       <b-table :items="users" :fields="fields" striped hover responsive>

         <!-- Checkbox Column -->
         <template #cell(select)="row">
           <b-form-checkbox v-model="selectedUsers" :value="row.item.id"></b-form-checkbox>
         </template>

         <!-- Custom Avatar Cell -->
         <template #cell(imgUrl)="row">
           <b-img :src="row.item.imgUrl || 'https://via.placeholder.com/100'" fluid rounded="circle" alt="User Avatar" width="100" height="100"></b-img>
         </template>

         <template #cell(actions)="row">
           <b-dropdown right variant="link" toggle-class="text-decoration-none">
             <template #button-content>
               <b-icon-three-dots-vertical></b-icon-three-dots-vertical>
             </template>
             <b-dropdown-item @click="editUser(row.item)">Edit</b-dropdown-item>
             <b-dropdown-item @click="deleteUser(row.item)">Delete</b-dropdown-item>
             <b-dropdown-item @click="assignRole(row.item)">Assign Role</b-dropdown-item>
           </b-dropdown>
         </template>
       </b-table>
     </b-col>
   </b-row>
 </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      Users: [],
      adminProfiles: 0,
      publicDashboards: '',
      lastUpdatedActiveUsers: '30th July, 2023',
      lastUpdatedAdminProfiles: '20th June, 2023',
      lastUpdatedPublicDashboards: '10th April, 2023',
      searchQuery: '',
      filterRole: '',
      selectedUsers: [], // Array to store multiple selected user IDs
      fields: [
        { key: 'select', label: '', class: 'text-center' },
        { key: 'imgUrl', label: '' },
        { key: 'username', label: 'User' },
        { key: 'status', label: 'Status' },
        { key: 'email', label: 'Email Address' },
        { key: 'profession', label: 'Role' },
        { key: 'lastLogin', label: 'Last Login' },
        { key: 'actions', label: '', class: 'text-right' },
      ],
    };
  },

  computed: {
    ...mapGetters(['usersCount', 'activeDashboardsCount', 'availablePluginsCount', 'getAllusers']),
    users() {
      return this.getAllusers;
    },
    activeUsers() {
      return this.usersCount;
    },

  },
  methods: {
    ...mapActions(['GET_USERS', 'GET_ACTIVE_DASHBOARDS', 'SET_PLUGINS_IMPORTED']),
    // console log getAllUsers

    searchUsers() {
      // Implement search functionality
      console.log('Search query:', this.searchQuery);
    },
    editUser(user) {
      // Implement edit functionality
      console.log('Edit user:', user);
    },
    deleteUser(user) {
      // Implement delete functionality
      console.log('Delete user:', user);
    },
    assignRole(user) {
      // Implement assign role functionality
      console.log('Assign role to:', user);
    },
  },
  async mounted() {
    // console log getAllUsers
    await this.GET_USERS();
    await this.GET_ACTIVE_DASHBOARDS();
    this.$store.dispatch('getDashboards').then(({ data }) => {
      if (data) {
      // public dashboard length
        this.publicDashboards = Object.values(data).filter((request) => request.isConfirmed || !request.isConfirmed).length;
      }
    }).catch((err) => {
      console.log(err);
    });
  },
};
</script>

<style scoped>
.user-dashboard {
 padding: 70px;
}

.summary-section {
 padding: 20px 70px;
 margin-bottom: 30px;
}

.user-card{
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color:#F2FAFA;
  border-radius: 8px;
  max-width: 280px;

}

.user-card small{
 text-wrap: nowrap;
}
.summary-number {
 font-size: 2.5rem;
 font-weight: bold;
}

.summary-title {
 font-size: 1.2rem;
 text-wrap: nowrap;
}

.view-all {
 font-size: 0.65rem;
 color:#007D53;
 text-wrap: nowrap;
 text-decoration: none;
}
.btn-user{
  background-color: #007D53;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
}

.view-all:hover {
 text-decoration: underline;
}

table {
 margin-top: 20px;
}

.table tr td {
 vertical-align: middle;

}

.b-form-checkbox {
 display: flex;
 justify-content: center;
}
</style>
