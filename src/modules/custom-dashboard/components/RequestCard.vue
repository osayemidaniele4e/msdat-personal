<template>
  <b-card class="shadow p-4">
    <p>
      <strong>Username: </strong>
      <span>{{ request.name }}</span>
    </p>
    <p>
      <strong>User Email: </strong>
      <span>{{ request.email }}</span>
    </p>
    <p>
      <strong>Dashboard Name: </strong>
      <span class="text-truncate">{{ request.name_of_dashboard }}</span>
    </p>
    <p>
      <strong>Description: </strong>
      <span class="text-truncate">{{ request.description }}</span>
    </p>
    <p>
      <strong>Category: </strong>
      <span>{{ request.category }}</span>
    </p>
    <p>
      <strong>Reason: </strong>
      <span class="text-truncate">{{ request.Reason }}</span>
    </p>
    <hr>
    <div class="actions">
      <b-button size="lg" @click="preview">Preview Dashboard</b-button>
      <b-button size="lg" @click="approve" variant="success">Approve</b-button>
      <b-button size="lg" @click="disapprove" variant="danger">Disapprove</b-button>
    </div>
  </b-card>
</template>

<script>

export default {
  props: {
    request: Object,
  },
  methods: {
    preview() {
      const config = JSON.parse(this.request.config);
      const {
        dashboardDetails, composedData, surveyArray, sectionsArray,
      } = config;

      this.$store.dispatch('resetState');
      this.$store.dispatch('dashboardConfiguration', dashboardDetails);
      this.$store.dispatch('customDashboard', true);

      this.$store.commit('setPArea', composedData);
      this.$store.commit('setDArea', surveyArray);
      this.$store.commit('arrangedSections', sectionsArray);

      const t = config.dashboardDetails.name.replace(/\s+/g, '_').toLowerCase();
      this.$router.push({
        path: `/dashboard/${t}?prev=1`,
        component: () => import('../../dynamic-dashboard/index.vue'),
      });
    },
    approve() {
      this.$swal.fire({
        title: 'Confirm Approve Dashboard',
        icon: 'info',
        showDenyButton: true,
        denyButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          this.$swal.fire({
            title: '<h4>Updating...</h4>',
            showConfirmButton: false,
            allowOutsideClick: false,
            showLoading: true,
          });
          // Update Dashboard Confirmation status
          this.$store.dispatch('updateDashboard', {
            id: this.request.id,
            isConfirmed: true,
          }).then(() => {
            this.$store.dispatch('getDashboards');
            this.$swal.fire('Dashboard approved successfully!');
            this.$emit('remove', this.request.id);
          }).catch(() => {
            this.$swal.fire('Check your internet connection!');
          });
        }
      });
    },
    disapprove() {
      this.$swal.fire({
        title: 'Confirm Disapprove Dashboard',
        icon: 'info',
        showDenyButton: true,
        denyButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          this.$swal.fire({
            title: '<h4>Updating...</h4>',
            showConfirmButton: false,
            allowOutsideClick: false,
            showLoading: true,
          });
          // Update Dashboard Confirmation status
          this.$store.dispatch('updateDashboard', {
            id: this.request.id,
            disapproved: true,
          }).then(() => {
            this.$swal.fire('Dashboard disapproved!');
            this.$emit('remove', this.request.id);
          }).catch(() => {
            this.$swal.fire('Check your internet connection!');
          });
        }
      });
    },
  },
};
</script>

<style scoped>
p {
  font-size: 20px;
  width: 420px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
}
.actions {
  display: flex;
  justify-content: flex-end;
  gap: 20px;
}
</style>
