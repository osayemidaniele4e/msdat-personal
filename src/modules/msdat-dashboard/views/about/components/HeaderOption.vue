<template>
  <div
    id="header-option"
  >
    <ul class="list-unstyled">
      <li>
        <router-link to="/">
          <img src="@/assets/img/icons/ic_info.svg" alt="">
          <span>About Dashboard</span>
        </router-link>
      </li>
      <li>
        <router-link to="/">
          <img src="@/assets/img/icons/ic_play.svg" alt="">
          <span>Play Tour Guide</span>
        </router-link>
      </li>
      <div class="divider"></div>
      <li>
        <router-link to="/">
          <img src="@/assets/img/icons/ic_share.svg" alt="">
          <span>Share</span>
        </router-link>
      </li>
      <li>
        <router-link to="/">
          <img src="@/assets/img/icons/ic_print.svg" alt="">
          <span>Print</span>
        </router-link>
      </li>
      <li>
        <router-link to="/">
          <img src="@/assets/img/icons/ic_download.svg" alt="">
          <span>Download Data</span>
        </router-link>
      </li>
      <li>
        <router-link to="/">
          <img src="@/assets/img/icons/ic_zoom.svg" alt="">
          <span>View Fullscreen</span>
        </router-link>
      </li>
      <div class="divider"></div>
      <li>
        <router-link to="/">
          <img src="@/assets/img/icons/ic_upload.svg" alt="">
          <span>Submit New Data Source</span>
        </router-link>
      </li>
      <li>
        <router-link to="/">
          <img src="@/assets/img/icons/ic_recommendation.svg" alt="">
          <span>Suggest Indicator/Data Source</span>
        </router-link>
      </li>
      <div class="divider"></div>
      <li>
        <router-link to="/">
          <img src="@/assets/img/icons/ic_update.svg" alt="">
          <span>See Updates</span>
        </router-link>
      </li>
      <li>
        <router-link to="/">
          <img src="@/assets/img/icons/ic_feedback.svg" alt="">
          <span>Feedback</span>
        </router-link>
      </li>
      <li>
        <router-link to="/">
          <img src="@/assets/img/icons/ic_contact.svg" alt="">
          <span>Contact</span>
        </router-link>
      </li>
      <li>
        <router-link to="/">
          <img src="@/assets/img/icons/ic_help.svg" alt="">
          <span>Help and FAQs</span>
        </router-link>
      </li>
      <li>
        <router-link to="/">
          <img src="@/assets/img/icons/ic_email.svg" alt="">
          <span>Subscribe to our newsletter</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>
  ::-webkit-scrollbar {
    width: 2px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #cccccc;
  }

  #header-option {
    height: 90vh;
    position: absolute;
    right: -11px;
    overflow: auto;
    transition: display 0.5s;
    z-index: 5;

    ul {
      border: 1px solid #dbdbdb;
      background-color: #ffffff;
      margin: 0;

      li {
        margin: 3% 0;
        a {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 5px 15px;
          text-decoration: none;
          color: #000000;
          transition: all 0.5s;

          &:hover {
            background-color: #FBFBFB;
            color: #007D53;
          }

          // icons
          &>:first-child {
            margin-right: 8px;
            width: 15px;
            height: 15px;

            // options
            &~* {
              font-size: 14px;
            }
          }
        }

        // divider
        &~div.divider {
          border-top: 1px solid #ededed;
          margin: 2% 0;
        }
      }
    }
  }

// MEDIA QUERY

/* EXTRA EXTRA SMALL */
@media (max-width: 576px) {
  #header-option {
    height: 78vh;

    ul {
      li {
        a {
          // icons
          &>:first-child {
            width: 14px;
            height: 14px;

            // options
            &~* {
              font-size: 13px;
            }
          }
        }

        // divider
        &~div.divider {
          margin: 1.5% 0;
        }
      }
    }
  }
}

/* SMALL */
@media (min-width: 576px) and (max-width: 768px) {
  #header-option {
    height: 80vh;
    right: 0;

    ul {
      li {
        a {
          // icons
          &>:first-child {
            margin-right: 8px;
            width: 14px;
            height: 14px;

            // options
            &~* {
              font-size: 13px;
            }
          }
        }

        // divider
        &~div.divider {
          margin: 2% 0;
        }
      }
    }
  }
}

/* MEDIUM */
@media (min-width: 768px) and (max-width: 992px) {
  #header-option {
    height: 80vh;

    &.open {
      right: -10px;
    }

    ul {
      li {
        a {
          // icons
          &>:first-child {
            margin-right: 8px;
            width: 14px;
            height: 14px;

            // options
            &~* {
              font-size: 14px;
            }
          }
        }

        // divider
        &~div.divider {
          border-top: 1px solid #ededed;
          margin: 2% 0;
        }
      }
    }
  }
}

/* LARGE */
@media (min-width: 992px) and (max-width: 1200px) {

}
</style>
