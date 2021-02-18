<template>
  <header>
    <nav class="contain py-2">
      <div class="d-flex">
        <!--Logos here -->
        <div class="d-flex">
          <img src="@/assets/img/Logo.svg" alt="Logo" />

          <div class="vl ml-5 mr-4"></div>

          <div class="d-flex flex-column mx-2 pt-2 align-items-center">
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

              <router-link class="nav-link" to="/Analysis">
                <li>NHMIS Analysis</li>
              </router-link>

              <router-link class="nav-link" to="/facility">
                <li>Health Facility Survey</li>
              </router-link>

              <router-link class="nav-link" to="/updtake">
                <li>COVID-19: Service Uptake</li>
              </router-link>

              <router-link class="nav-link" to="/other">
                <li>Other Dashboards</li>
              </router-link>

              <router-link class="nav-link" to="/dot">
                <li>three dots</li>
              </router-link>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

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
</style>
