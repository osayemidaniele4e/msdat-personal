<template>
  <div class="p-2 px-5 mb-5 position-relative">
    <section class="d-flex justify-content-between py-3">
      <div class="">
        <h4 class="">Notifications</h4>
      </div>
      <div class="d-flex flex-row align-items-center notif-box">
        <select class="custom-select">
          <option selected>All Notifications</option>
          <option value="1">Unread</option>
          <option value="2">Read</option>
        </select>
      </div>
    </section>
    <section>
      <div class="d-flex justify-content-between w-100 align-items-center">
        <h5 v-if="newNot.length" style="font-size: 18px; margin-top: 30px">Unread Notifications</h5>
       <div class="d-flex">
        <button class="add-updates" @click="toggleShowCreateWhatsNew">Add Updates</button>
        <button class="add-updates mx-3" @click="showModal">Show Modal</button>
       </div>
      </div>
      <article
        v-for="(not, index) in newNot"
        :key="index"
        class="notification-item mt-3 p-2 mx-2 border rounded d-flex justify-content-between align-items-center"
      >
        <div class="not-title">
          <span class="d-block font-weight-bold">{{ not.title }}</span>
        </div>
        <div class="mr-auto">
          <span class="d-block">{{ not.text }}</span>
        </div>
        <div class="notification-actions flex-shrink-0 px-2 py-2 d-flex align-items-center">
          <b-button v-if="not.approvable" variant="link" class="text-success p-0 mr-2"
            >Approve</b-button
          >
          <b-button v-if="not.declinable" variant="link" class="text-danger p-0 mr-2"
            >Decline</b-button
          >
          <b-button v-if="not.viewable" variant="link" class="text-primary p-0 mr-2"
            >View Message</b-button
          >
          <p class="mb-0 text-muted">{{ moment(not.datetime).format('h:mm A') }}</p>
        </div>
      </article>
      <h5 v-if="oldNot.length" style="font-size: 18px; margin-top: 30px">Past Notifications</h5>
      <article
        v-for="(not, index) in oldNot"
        :key="index"
        class="notification-item mt-3 p-2 mx-2 border rounded d-flex justify-content-between align-items-center"
      >
        <div class="not-title">
          <span class="d-block font-weight-bold">{{ not.title }}</span>
        </div>
        <div class="mr-auto">
          <span class="d-block">{{ not.text }}</span>
        </div>
        <div class="notification-actions flex-shrink-0 px-2 py-2 d-flex align-items-center">
          <b-button v-if="not.approvable" variant="link" class="text-success p-0 mr-2"
            >Approve</b-button
          >
          <b-button v-if="not.declinable" variant="link" class="text-danger p-0 mr-2"
            >Decline</b-button
          >
          <b-button v-if="not.viewable" variant="link" class="text-primary p-0 mr-2"
            >View Message</b-button
          >
          <p class="mb-0 text-muted">{{ moment(not.datetime).format('h:mm A') }}</p>
        </div>
      </article>
    </section>
    <div v-if="showCreateWhatsNewComponent" class="position-fixed whats-new">
      <CreateWhatsNew @closeModal="closeModal" />
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import moment from 'moment';
import CreateWhatsNew from './CreateWhatsNew.vue';

export default {
  components: {
    CreateWhatsNew,
  },
  data() {
    return {
      notifications: [
        {
          title: 'Plug-In Request',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, volutpat sed.',
          datetime: new Date().getTime(),
          approvable: true,
          declinable: true,
          viewable: false,
          seen: false,
        },
        {
          title: 'Chinonso',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, volutpat enim sed.',
          datetime: new Date().getTime(),
          approvable: false,
          declinable: false,
          viewable: true,
          seen: false,
        },
        {
          title: 'Plug-In Request',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, volutpat sed.',
          datetime: new Date().getTime(),
          approvable: true,
          declinable: true,
          viewable: false,
          seen: false,
        },
        {
          title: 'Chinonso',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, volutpat enim sed.',
          datetime: new Date().getTime(),
          approvable: false,
          declinable: false,
          viewable: true,
          seen: false,
        },
        {
          title: 'Plug-In Request',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, volutpat sed.',
          datetime: new Date().getTime(),
          approvable: true,
          declinable: true,
          viewable: false,
          seen: true,
        },
        {
          title: 'Ejike',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, volutpat enim sed.',
          datetime: new Date().getTime(),
          approvable: false,
          declinable: false,
          viewable: true,
          seen: true,
        },
        {
          title: 'Plug-In Request',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, volutpat sed.',
          datetime: new Date().getTime(),
          approvable: true,
          declinable: true,
          viewable: false,
          seen: true,
        },
        {
          title: 'Demilade',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, volutpat enim sed.',
          datetime: new Date().getTime(),
          approvable: false,
          declinable: false,
          viewable: true,
          seen: true,
        },
      ],
      showCreateWhatsNewComponent: false,
    };
  },
  computed: {
    newNot() {
      return this.notifications.filter((not) => !not.seen);
    },
    oldNot() {
      return this.notifications.filter((not) => not.seen);
    },
  },
  methods: {
    ...mapMutations('MSDAT_STORE', ['UPDATE_LOADING_STATUS', 'toggleShowWhatsNew']),

    showModal() {
      this.toggleShowWhatsNew();
    },

    moment,

    toggleShowCreateWhatsNew() {
      this.showCreateWhatsNewComponent = !this.showCreateWhatsNewComponent;
    },
    closeModal() {
      this.showCreateWhatsNewComponent = false;
    },
  },
};
</script>

<style>
.notif-box {
  border: 1px;
}
.not-title {
  width: 20%;
}
.notification-item {
  background-color: #f9f9f9;
}

.notification-actions {
  display: flex;
  align-items: center;
}

.notification-actions b-button {
  margin-right: 10px;
}

@media (min-width: 992px) {
  article {
    width: 100%;
  }
}

.custom-select {
  width: 200px;
  padding: 5px;
  font-size: 16px;
}
.whats-new {
  position: fixed;
  right: 0;
  left: 0;
  z-index: 999999;
  top: 1px;
  height: 100vh;
}
.add-updates{
  height: 44px;
  border-radius: 4px;
  background-color: #007D53;
  color: white;
  font-size: 20px;
  font-weight: 500;
  border: none;
  line-height: 16px;
  padding: 0 20px;
}
</style>
