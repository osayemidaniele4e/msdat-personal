<template>
  <div class="position-relative panel">
    <!--Side Menu here-->
    <div class="position-absolute side-menu">
      <sideMenu v-show="isMenuVisible"></sideMenu>
    </div>

    <header>
      <nav class="contain py-2">
        <div class="d-flex">
          <!--Logos here -->
          <div class="d-flex">
            <div>
              <img src="@/assets/img/Logo.svg" alt="Logo" />
            </div>

            <div class="vl ml-5 mr-4"></div>

            <div class="d-flex flex-column mx-2 pt-2">
              <h1 class="header">MSDAT PLATFORM</h1>
              <h4 class="sub">ANALYSIS OF KEY HEALTH INDICATORS</h4>
            </div>
          </div>

          <div class="ml-auto py-3 align-items-center">
            <div class=" ">
              <ul class="d-inline-flex">
                <router-link class="nav-link" to="/">
                  <li>Main Dashboard</li>
                </router-link>

                <router-link class="nav-link" to="/update">
                  <li>COVID-19: Service Uptake</li>
                </router-link>

                <router-link class="nav-link" to="/custom">
                  <li>Custom Dashboard</li>
                </router-link>

                <button class="nav-link login-button d-flex align-items-center">
                  <li class="mr-1">OtherDashboards</li>
                  <img
                    src="@/assets/img/Hamburger Icons/ic_dropdown.svg"
                    alt="dropdown"
                    class="dropdown"
                    height="5"
                  />
                </button>

                <button class="nav-link login-button d-flex align-items-center">
                  <img
                    src="@/assets/img/Hamburger Icons/Icon awesome-user-circle.svg"
                    alt="user-icon"
                  />
                  <li class="ml-1">Login/Register</li>
                </button>

                <button class="dotted-btn text-white" to @click="showSideMenu">
                  <li>
                    <img
                      src="../../assets/img/Hamburger Icons/ic_dots.svg"
                      class="dots"
                      alt="dots"
                    />
                  </li>
                </button>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>

<script>
import sideMenu from '@/components/generic/side-menu.vue';

export default {
  data() {
    return {
      isMenuVisible: false,
    };
  },
  components: {
    sideMenu,
  },

  methods: {
    showSideMenu() {
      this.isMenuVisible = !this.isMenuVisible;
    },
  },
};
</script>

<style  scoped>
nav {
  background: var(--primary-green);
  height: 78px;
  width: 100%;
}
.header {
  color: #fbfbfb;
  font-size: 1.442rem;
  font-weight: 600;
  font-family: "Work Sans", sans-serif;
}
.sub {
  font-size: 0.817rem;
  font-weight: 400;
  color: #dfeee9;
  line-height: 7px;
  font-family: "Work Sans", sans-serif;
}
.vl {
  border-left: 2px solid #e8e8e8;
  opacity: 0.2;
  height: 55px;
}
ul li {
  padding: 0;
  margin: 0;
  list-style: none;
}
.nav-link li {
  align-content: center;
  align-items: center;
  font-size: 0.63rem;
}

.side-menu {
  top: 65px;
  right: 37px;
  z-index: 1;
}
.dots {
  position: relative;
  height: 30px;
  bottom: 5px;
}

.dotted-btn {
  height: 1px;
}
.login-button {
  border: none;
  background: inherit;
  color: white;
}
.login-button:focus {
  outline: none;
}
</style>
