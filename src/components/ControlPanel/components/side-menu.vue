<template>
  <transition name="fade">
    <div class="card-holder pt-3 pb-3">
      <!-- First Section here -->
      <div class="d-flex flex-column px-25">
        <button
          @click="$router.push('')"
          type="button"
          class="dotted-btn menu-item d-flex align-items-center mb-3"
        >
          <img src="@/assets/img/Hamburger Icons/ic_info.svg" alt="info" />
          <span class="ml-25">About Dashboard</span>
        </button>
        <button
          @click="$router.push('')"
          type="button"
          class="dotted-btn menu-item d-flex align-items-center mb-2"
        >
          <img src="@/assets/img/Hamburger Icons/ic_play.svg" alt="play" />
          <span class="ml-25">Play Tour Guide</span>
        </button>
      </div>

      <hr />

      <!-- Second Section here -->
      <div class="d-flex flex-column px-25">
        <button
          @click="$router.push('')"
          type="button"
          class="dotted-btn menu-item d-flex align-items-center mb-3"
        >
          <img src="@/assets/img/Hamburger Icons/ic_autorenew.svg" alt="autorenew" />
          <span class="ml-25">Change/Select Datasets</span>
        </button>
        <button
          @click="$router.push('')"
          type="button"
          class="dotted-btn menu-item d-flex align-items-center mb-3"
        >
          <img src="@/assets/img/Hamburger Icons/ic_upload.svg" alt="upload" />
          <span class="ml-25">Submit New Data Source</span>
        </button>
        <button
          @click="$router.push('')"
          type="button"
          class="dotted-btn menu-item d-flex align-items-center mb-3"
        >
          <img src="@/assets/img/Hamburger Icons/ic_recommendation.svg" alt="recommendation" />
          <span class="ml-25">Suggest Indicator/Data Source</span>
        </button>
        <button
          @click="$router.push('')"
          type="button"
          class="dotted-btn menu-item d-flex align-items-center mb-3"
        >
          <img src="@/assets/img/Hamburger Icons/ic_save.svg" alt="save" />
          <span class="ml-25">Save Dashboard Current State</span>
        </button>
        <button
          @click="$router.push('')"
          type="button"
          class="dotted-btn menu-item d-flex align-items-center mb-2"
        >
          <img src="@/assets/img/Hamburger Icons/ic_folder.svg" alt="folder" />
          <span class="ml-25">Load Saved Dashboard States</span>
        </button>
      </div>

      <hr />

      <!-- Third Section here -->
      <div class="d-flex flex-column px-25">
        <button
          @click="$router.push('')"
          type="button"
          class="dotted-btn menu-item d-flex align-items-center mb-3"
        >
          <img src="@/assets/img/Hamburger Icons/ic_share.svg" alt="share" />
          <span class="ml-25">Share</span>
        </button>
        <button
          @click="$router.push('')"
          type="button"
          class="dotted-btn menu-item d-flex align-items-center mb-3"
        >
          <img src="@/assets/img/Hamburger Icons/ic_print.svg" alt="print" />
          <span class="ml-25">Print</span>
        </button>
        <button
          @click="$router.push('')"
          type="button"
          class="dotted-btn menu-item d-flex align-items-center mb-3"
        >
          <img src="@/assets/img/Hamburger Icons/ic_download.svg" alt="download" />
          <span class="ml-25">Download Data</span>
        </button>
        <button
          @click="$router.push('')"
          type="button"
          class="dotted-btn menu-item d-flex align-items-center mb-2"
        >
          <img src="@/assets/img/Hamburger Icons/ic_zoom.svg" alt="zoom" />
          <span class="ml-25">View Fullscreene</span>
        </button>
      </div>

      <hr />

      <!-- Fourth Section here -->
      <div class="d-flex flex-column px-25">
        <button
          @click="$router.push('')"
          type="button"
          class="dotted-btn menu-item d-flex align-items-center mb-3 d-none"
        >
          <img src="@/assets/img/Hamburger Icons/ic_update.svg" alt="share" />
          <span class="ml-25">See Updates</span>
        </button>
        <button
          @click="$router.push('')"
          type="button"
          class="dotted-btn menu-item d-flex align-items-center mb-3"
        >
          <img src="@/assets/img/Hamburger Icons/ic_feedback.svg" alt="print" />
          <span class="ml-25">Feedback</span>
        </button>
        <button
          @click="$router.push('')"
          type="button"
          class="dotted-btn menu-item d-flex align-items-center mb-3"
        >
          <img src="@/assets/img/Hamburger Icons/ic_contact.svg" alt="contact" />
          <span class="ml-25">Contact</span>
        </button>
        <button
          @click="$router.push('')"
          type="button"
          class="dotted-btn menu-item d-flex align-items-center mb-3"
        >
          <img src="@/assets/img/Hamburger Icons/ic_help.svg" alt="help" />
          <span class="ml-25">Help and FAQs</span>
        </button>
        <button
          @click="$router.push('')"
          type="button"
          class="dotted-btn menu-item d-flex align-items-center"
        >
          <img src="@/assets/img/Hamburger Icons/ic_email.svg" alt="email" />
          <span class="ml-25">Subscribe to our newsletter</span>
        </button>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.card-holder {
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 3px 5px 7px #00000029;
  border: 1px solid #cfcfcf;
  border-radius: 0px 5px 5px 5px;
  width: 346px;
  font-family: 'Work Sans', sans-serif;
}

.menu-item {
  color: #000000;
  font-weight: 400;
  font-size: 0.875rem;
}
.px-25 {
  padding: 0rem 0.875rem;
}
.ml-25 {
  margin-left: 0.7rem;
}
</style>
