<template>
  <div class="user-dashboard">
    <!-- User Summary Section -->
    <b-row class="summary-section">
      <b-col>
        <div class="d-flex justify-content-between align-items-center">
          <h4>User Summary</h4>
          <button class="btn-user" @click="showAddUserModal">Add User</button>
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
                 <div class="w-30"><a href="#" class="view-all">View All</a></div>
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
                 <!-- <div class="w-30"><a href="#" class="view-all">View All</a></div> -->
              </div>
            </b-col>
          </b-row>
        </div>
      </b-col>
    </b-row>

    <!-- Enhanced Add User Modal -->
    <b-modal
      id="add-user-modal"
      title="Add User"
      @ok="handleSubmit"
      @hidden="resetForm"
      :busy="isLoading"
    >
      <b-form @submit.stop.prevent="handleSubmit">
        <b-form-group label="Username" label-for="username">
          <b-form-input
            id="username"
            v-model="newUser.username"
            :state="validateState('username')"
            required
            pattern="^[\w.@+-]+$"
            maxlength="150"
          ></b-form-input>
          <b-form-invalid-feedback>Username is required and must contain only letters, numbers, and @/./+/-/_ characters</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="Email" label-for="email">
          <b-form-input
            id="email"
            v-model="newUser.email"
            :state="validateState('email')"
            type="email"
            required
            maxlength="254"
          ></b-form-input>
          <b-form-invalid-feedback>Please enter a valid email address</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="First Name" label-for="first_name">
          <b-form-input
            id="first_name"
            v-model="newUser.first_name"
            :state="validateState('first_name')"
            maxlength="150"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Last Name" label-for="last_name">
          <b-form-input
            id="last_name"
            v-model="newUser.last_name"
            :state="validateState('last_name')"
            maxlength="150"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Profession" label-for="profession">
          <b-form-input
            id="profession"
            v-model="newUser.profession"
            :state="validateState('profession')"
            required
            maxlength="255"
          ></b-form-input>
          <b-form-invalid-feedback>Profession is required</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="Organization" label-for="organization">
          <b-form-input
            id="organization"
            v-model="newUser.organization"
            :state="validateState('organization')"
            required
            maxlength="255"
          ></b-form-input>
          <b-form-invalid-feedback>Organization is required</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="Password" label-for="password">
          <b-form-input
            id="password"
            v-model="newUser.password"
            :state="validateState('password')"
            type="password"
            required
          ></b-form-input>
          <b-form-invalid-feedback>Password is required</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="Role" label-for="role">
          <b-form-select
            id="role"
            v-model="newUser.role"
            :state="validateState('role')"
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="moderator">Moderator</option>
            <option value="admin">Admin</option>
          </b-form-select>
          <b-form-invalid-feedback>Please select a role</b-form-invalid-feedback>
        </b-form-group>
      </b-form>

      <template #modal-footer="{ ok, cancel }">
        <b-button
          variant="secondary"
          @click="cancel()"
          :disabled="isLoading"
        >
          Cancel
        </b-button>
        <b-button
          variant="primary"
          @click="ok()"
          :disabled="isLoading"
        >
          <b-spinner small v-if="isLoading"></b-spinner>
          {{ isLoading ? 'Adding...' : 'Add User' }}
        </b-button>
      </template>
    </b-modal>

    <!-- Enhanced Search and Filter Section -->
    <b-row class="mt-4">
      <b-col>
        <div class="d-flex mb-2 align-items-center">
          <div class="search-filter-container">
            <b-form-input
              v-model="searchQuery"
              placeholder="Search users by name, email..."
              class="mr-2"
              @input="handleSearch"
            ></b-form-input>
          </div>
          <div class="role-filter-container ml-2">
            <b-form-select
              v-model="filterRole"
              @change="handleFilter"
            >
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
              <option value="user">User</option>
            </b-form-select>
          </div>
        </div>

        <!-- Enhanced Users Table -->
        <b-overlay :show="isLoading" rounded="sm">
          <b-table
            :items="filteredUsers"
            :fields="fields"
            striped
            hover
            responsive
            :busy="isLoading"
            show-empty
            empty-text="No users found"
          >
            <!-- Checkbox Column -->
            <template #cell(select)="row">
          <b-form-checkbox
            v-model="row.item.selected"
            @change="handleUserSelection(row.item)"
          ></b-form-checkbox>
            </template>

            <!-- Avatar Column -->
            <template #cell(imgUrl)>
              <b-img
                :src="'https://via.placeholder.com/100'"
                fluid
                rounded="circle"
                alt="U.a"
                width="30"
                height="50"
              ></b-img>
            </template>

            <!-- Actions Column -->
            <template #cell(actions)="row">
              <b-dropdown right variant="link" toggle-class="text-decoration-none" no-caret>
                <template #button-content>
                  <b-icon-three-dots-vertical></b-icon-three-dots-vertical>
                </template>
                <b-dropdown-item @click="confirmDeleteUser(row.item)">
                  <b-icon-trash class="mr-2"></b-icon-trash> Delete
                </b-dropdown-item>
                <b-dropdown-item @click="assignRole(row.item)">
                  <b-icon-person-badge class="mr-2"></b-icon-person-badge> Assign Role
                </b-dropdown-item>
              </b-dropdown>
            </template>
          </b-table>

<div class="mt-3">
   <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        align="center"
        first-number
        last-number
        class="my-0"
      ></b-pagination>
</div>
        </b-overlay>

        <!-- Bulk Actions (if needed) -->
        <div v-if="selectedUsers.length" class="bulk-actions mt-3">
          <b-button
            variant="danger"
            size="sm"
            @click="confirmDeleteSelected"
          >
            Delete Selected ({{ selectedUsers.length }})
          </b-button>
        </div>
      </b-col>
    </b-row>

    <!-- Delete Confirmation Modal -->
    <b-modal
      id="delete-confirmation-modal"
      title="Confirm Deletion"
      @ok="handleDelete"
      ok-variant="danger"
      ok-title="Delete"
    >
      <p>Are you sure you want to delete {{ deleteTarget.type === 'single' ? 'this user' : 'these users' }}?</p>
      <p class="text-danger">This action cannot be undone.</p>
    </b-modal>
  </div>
 </template>

<script>
import axios from 'axios';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'UserDashboard',

  data() {
    return {
      isLoading: false,
      formValidated: false,
      perPage: 20,
      currentPage: 1,
      errors: {},
      searchQuery: '',
      filterRole: '',
      selectedUsers: [],
      searchTimeout: null,
      deleteTarget: {
        type: 'single',
        items: [],
      },
      adminProfiles: 1,
      publicDashboards: '',
      lastUpdatedActiveUsers: '30th January, 2025',
      lastUpdatedAdminProfiles: '20th February, 2025',
      lastUpdatedPublicDashboards: '10th February, 2025',
      fields: [
        { key: 'select', label: '' },
        { key: 'imgUrl', label: '' },
        { key: 'username', label: 'User', sortable: true },
        { key: 'email', label: 'Email Address', sortable: true },
        { key: 'role', label: 'Role', sortable: true },
        { key: 'lastLogin', label: 'Last Login', sortable: true },
        { key: 'actions', label: '' },
      ],

      newUser: {
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        profession: '',
        organization: '',
        password: '',
        role: '',
      },
    };
  },

  computed: {
    ...mapGetters(['usersCount', 'activeDashboardsCount', 'availablePluginsCount', 'getAllusers']),

    users() {
      return this.getAllusers || [];
    },

    activeUsers() {
      return this.usersCount;
    },

    // First, get filtered data without pagination
    filteredData() {
      let filtered = [...this.users];

      // Apply search filter
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase().trim();
        filtered = filtered.filter((user) => (
          (user.username && user.username.toLowerCase().includes(query))
        || (user.email && user.email.toLowerCase().includes(query))
        || (user.first_name && user.first_name.toLowerCase().includes(query))
        || (user.last_name && user.last_name.toLowerCase().includes(query))
        ));
      }

      // Apply role filter
      if (this.filterRole) {
        filtered = filtered.filter((user) => user.role && user.role.toLowerCase() === this.filterRole.toLowerCase());
      }
      return filtered.map((user) => ({
        ...user,
        selected: this.selectedUsers.includes(user.id),
      }));
    },

    // Total number of filtered rows for pagination
    totalRows() {
      return this.filteredData.length;
    },

    // Apply pagination to filtered data
    filteredUsers() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;

      // Return a slice of the filtered data based on current page
      return this.filteredData.slice(start, end);
    },
  },

  methods: {
    ...mapActions(['GET_USERS', 'GET_ACTIVE_DASHBOARDS', 'SET_PLUGINS_IMPORTED']),

    validateState(field) {
      if (!this.formValidated) return null;
      return !this.errors[field];
    },

    validateForm() {
      this.errors = {};
      this.formValidated = true;

      if (!this.newUser.username) {
        this.errors.username = true;
      }
      if (!this.newUser.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.newUser.email)) {
        this.errors.email = true;
      }
      if (!this.newUser.password) {
        this.errors.password = true;
      }
      if (!this.newUser.role) {
        this.errors.role = true;
      }
      if (!this.newUser.profession) {
        this.errors.profession = true;
      }
      if (!this.newUser.organization) {
        this.errors.organization = true;
      }

      return Object.keys(this.errors).length === 0;
    },

    showAddUserModal() {
      this.$bvModal.show('add-user-modal');
    },

    async handleSubmit(evt) {
      evt.preventDefault();
      if (!this.validateForm()) {
        return;
      }

      this.isLoading = true;
      try {
        await axios.post('https://msdat2api.e4eweb.space/api/users/', this.newUser, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        this.$bvToast.toast('User added successfully', {
          title: 'Success',
          variant: 'success',
          solid: true,
        });

        await this.GET_USERS();
        this.$bvModal.hide('add-user-modal');
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to add user';
        this.$bvToast.toast(errorMessage, {
          title: 'Error',
          variant: 'danger',
          solid: true,
        });
      } finally {
        this.isLoading = false;
      }
    },

    resetForm() {
      this.newUser = {
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        profession: '',
        organization: '',
        password: '',
        role: '',
      };
      this.formValidated = false;
      this.errors = {};
    },

    handleSearch() {
      this.currentPage = 1; // Reset to first page when searching
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
      // Filtering is handled by computed property
      }, 300);
    },

    handleFilter() {
      this.currentPage = 1; // Reset to first page when filtering
    },

    handleUserSelection(user) {
      if (user.selected) {
        if (!this.selectedUsers.includes(user.id)) {
          this.selectedUsers.push(user.id);
        }
      } else {
        this.selectedUsers = this.selectedUsers.filter((id) => id !== user.id);
      }
    },

    async editUser(user) {
      try {
        this.isLoading = true;
        const response = await fetch(`https://msdat2api.e4eweb.space/api/users/${user.id}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });

        if (!response.ok) {
          throw new Error('Failed to update user');
        }

        await this.GET_USERS();
        this.$bvToast.toast('User updated successfully', {
          title: 'Success',
          variant: 'success',
          solid: true,
        });
      } catch (error) {
        this.$bvToast.toast(error.message, {
          title: 'Error',
          variant: 'danger',
          solid: true,
        });
      } finally {
        this.isLoading = false;
      }
    },

    confirmDeleteUser(user) {
      this.deleteTarget = {
        type: 'single',
        items: [user],
      };
      this.$bvModal.show('delete-confirmation-modal');
    },

    confirmDeleteSelected() {
      this.deleteTarget = {
        type: 'multiple',
        items: this.selectedUsers,
      };
      this.$bvModal.show('delete-confirmation-modal');
    },

    async handleDelete() {
      try {
        this.isLoading = true;
        const items = this.deleteTarget.items;

        if (this.deleteTarget.type === 'single') {
          await this.deleteUser(items[0]);
        } else {
          await Promise.all(items.map((id) => this.deleteUser({ id })));
        }

        this.selectedUsers = [];
        await this.GET_USERS();

        this.$bvToast.toast('User(s) deleted successfully', {
          title: 'Success',
          variant: 'success',
          solid: true,
        });
      } catch (error) {
        this.$bvToast.toast(error.message, {
          title: 'Error',
          variant: 'danger',
          solid: true,
        });
      } finally {
        this.isLoading = false;
      }
    },

    async deleteUser(user) {
      const response = await fetch(`https://msdat2api.e4eweb.space/api/users/${user.id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
    },

    async assignRole(user) {
      try {
        this.isLoading = true;
        const newRole = user.role === 'admin' ? 'user' : 'admin';
        const response = await fetch(`https://msdat2api.e4eweb.space/api/users/${user.id}/role/`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ role: newRole }),
        });

        if (!response.ok) {
          throw new Error('Failed to assign role');
        }

        await this.GET_USERS();
        this.$bvToast.toast('Role assigned successfully', {
          title: 'Success',
          variant: 'success',
          solid: true,
        });
      } catch (error) {
        this.$bvToast.toast(error.message, {
          title: 'Error',
          variant: 'danger',
          solid: true,
        });
      } finally {
        this.isLoading = false;
      }
    },
  },

  async mounted() {
    console.log(this.getAllusers);
    try {
      this.isLoading = true;
      await this.GET_USERS();
      await this.GET_ACTIVE_DASHBOARDS();

      const { data } = await this.$store.dispatch('getDashboards');
      if (data) {
        this.publicDashboards = Object.values(data).filter(
          (request) => request.isConfirmed || !request.isConfirmed,
        ).length;
      }
      // Log total rows and current data to verify pagination
      console.log('Total rows:', this.totalRows);
      console.log('Current page data:', this.filteredUsers);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      this.$bvToast.toast('Error loading dashboard data', {
        title: 'Error',
        variant: 'danger',
        solid: true,
      });
    } finally {
      this.isLoading = false;
    }
  },

  beforeDestroy() {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
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

.user-card {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #F2FAFA;
  border-radius: 8px;
  max-width: 280px;
  transition: all 0.3s ease;
}

.user-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.user-card small {
  text-wrap: nowrap;
  color: #666;
}

.summary-number {
  font-size: 2.5rem;
  font-weight: bold;
  color: #007D53;
}

.summary-title {
  font-size: 1.2rem;
  text-wrap: nowrap;
  color: #333;
  margin-bottom: 0.5rem;
}

.view-all {
  font-size: 0.65rem;
  color: #007D53;
  text-wrap: nowrap;
  text-decoration: none;
  transition: color 0.3s ease;
}

.btn-user {
  background-color: #007D53;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.btn-user:hover {
  background-color: #006443;
  transform: translateY(-1px);
}

.view-all:hover {
  text-decoration: underline;
  color: #006443;
}

.search-filter-container {
  flex: 1;
  max-width: 300px;
}

.role-filter-container {
  width: 200px;
}

table {
  margin-top: 20px;
  border-radius: 8px;
  overflow: hidden;
}

.table tr td {
  vertical-align: middle;
  padding: 1rem;
}

.table thead th {
  background-color: #f8f9fa;
  border-bottom: 2px solid #dee2e6;
  color: #495057;
}

.b-form-checkbox {
  display: flex;
  justify-content: center;
}

.bulk-actions {
  display: flex;
  gap: 10px;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 5px;
}

/* Modal Styles */
::v-deep .modal-content {
  border-radius: 8px;
}

::v-deep .modal-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
}

::v-deep .modal-footer {
  background-color: #f8f9fa;
  border-top: 1px solid #dee2e6;
}

/* Form Styles */
.form-group {
  margin-bottom: 1rem;
}

.form-control {
  border-radius: 4px;
}

/* Loading Overlay */
::v-deep .b-overlay {
  border-radius: 8px;
}
.pagination {
  margin-top: 1rem;
}

.page-item.active .page-link {
  background-color: #007D53;
  border-color: #007D53;
}

.page-link {
  color: #007D53;
}

.page-link:hover {
  color: #006443;
}
</style>
