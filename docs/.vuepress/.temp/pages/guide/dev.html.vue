<template><h1 id="modular-structure" tabindex="-1"><a class="header-anchor" href="#modular-structure" aria-hidden="true">#</a> Modular Structure</h1>
<h2 id="overview" tabindex="-1"><a class="header-anchor" href="#overview" aria-hidden="true">#</a> Overview</h2>
<p>This guide lays down the description of the MSDAT project from a developers standpoint. The MSDAT platform is a fullstack application that was built using VueJs, Postgress, Express, .... as the core technologies.During the development process, a modular approach was adopted following the 'folder-by-feature' file structure. As shown in detail in the diagram below.</p>
<p>Following the best practices in developing a VueJs application. Most of what is seen the dash board.
For example, in the indicator overview section, there are 3 components as seen in the diagram below.</p>
<h2 id="file-structure-modular-approach" tabindex="-1"><a class="header-anchor" href="#file-structure-modular-approach" aria-hidden="true">#</a> File structure/ Modular approach</h2>
<p>As descibed earlier, a modular approach was adopted. Project was created using the vue CLI. Below shall give in more detail the folders and their uses present in the code base.
// add picture here of a screenshot of the folders showing in vs code.</p>
<p><img src="@source/guide/assets-api/file-structure.png" alt="An image"></p>
<h2 id="folders" tabindex="-1"><a class="header-anchor" href="#folders" aria-hidden="true">#</a> Folders</h2>
<h4 id="src-folder" tabindex="-1"><a class="header-anchor" href="#src-folder" aria-hidden="true">#</a> src folder</h4>
<p>These will be folders/files created with Vue CLI. In addition to these, the main source code for the application(main components, main views, store, router etc) will reside here.</p>
<h4 id="router" tabindex="-1"><a class="header-anchor" href="#router" aria-hidden="true">#</a> router</h4>
<p>This file will be responsible for combining all the route configuration from feature modules.</p>
<h4 id="store" tabindex="-1"><a class="header-anchor" href="#store" aria-hidden="true">#</a> store</h4>
<p>All the state management related configuration will be done in this file. For eg. Vuex related configuration will be done here. All the states from the different feature modules will be combined here and will be configured with the state management system.</p>
<h4 id="main-js" tabindex="-1"><a class="header-anchor" href="#main-js" aria-hidden="true">#</a> Main.js</h4>
<p>This file is responsible for bootstrapping the Vue application.</p>
<h4 id="assets" tabindex="-1"><a class="header-anchor" href="#assets" aria-hidden="true">#</a> assets</h4>
<p>Houses all images, and related assets of the project.</p>
<h4 id="components" tabindex="-1"><a class="header-anchor" href="#components" aria-hidden="true">#</a> components</h4>
<p>Some of the components have an index.js file in the folder. This exports whatever is in the folder globally. It is made global when it is imported in the root index.js file.</p>
<h4 id="config" tabindex="-1"><a class="header-anchor" href="#config" aria-hidden="true">#</a> config</h4>
<h4 id="modules" tabindex="-1"><a class="header-anchor" href="#modules" aria-hidden="true">#</a> modules</h4>
<h4 id="plugins" tabindex="-1"><a class="header-anchor" href="#plugins" aria-hidden="true">#</a> plugins</h4>
<p>Most of the plugins are in the plugins folder. Plugins such as axios.js, dexie.js, highchart.js, etc. are to be accessed globally.</p>
<h4 id="router-1" tabindex="-1"><a class="header-anchor" href="#router-1" aria-hidden="true">#</a> router</h4>
<h4 id="scss" tabindex="-1"><a class="header-anchor" href="#scss" aria-hidden="true">#</a> scss</h4>
<h4 id="store-1" tabindex="-1"><a class="header-anchor" href="#store-1" aria-hidden="true">#</a> store</h4>
<p>This is vuex store directory for all vuex related files.</p>
<h4 id="util" tabindex="-1"><a class="header-anchor" href="#util" aria-hidden="true">#</a> util</h4>
<p>Holds plugin configurations, Global component registration function and filters.</p>
<h4 id="views" tabindex="-1"><a class="header-anchor" href="#views" aria-hidden="true">#</a> views</h4>
<p>Where all the .vue pages are housed.</p>
<h2 id="files" tabindex="-1"><a class="header-anchor" href="#files" aria-hidden="true">#</a> Files</h2>
<h4 id="app-vue" tabindex="-1"><a class="header-anchor" href="#app-vue" aria-hidden="true">#</a> App.vue</h4>
<p>This is the root component which will contain the main view of the application.</p>
<h4 id="env" tabindex="-1"><a class="header-anchor" href="#env" aria-hidden="true">#</a> .env</h4>
<p>The configuration text file that is used to define variables to be passed into the applications environment. Common used for API_BASE_URL variables.</p>
<h4 id="env-local" tabindex="-1"><a class="header-anchor" href="#env-local" aria-hidden="true">#</a> .env.local</h4>
<p>Same function as the .env file, but not being tracked by Git.</p>
<h4 id="eslintrc-js" tabindex="-1"><a class="header-anchor" href="#eslintrc-js" aria-hidden="true">#</a> .eslintrc.js</h4>
<p>Configuration file for identifying and reporting on patterns found in ECMAScript/JavaScript code. This makes the code more consistent and avoid bugs.</p>
<h4 id="gitlab-ci-yml" tabindex="-1"><a class="header-anchor" href="#gitlab-ci-yml" aria-hidden="true">#</a> .gitlab-ci.yml</h4>
<p>Defines the project's Pipelines, Jobs, and Environments.</p>
<h4 id="prettierrc" tabindex="-1"><a class="header-anchor" href="#prettierrc" aria-hidden="true">#</a> .prettierrc</h4>
<p>configuration file used by Prettier to automate code formatting.</p>
<h4 id="cypress-json" tabindex="-1"><a class="header-anchor" href="#cypress-json" aria-hidden="true">#</a> cypress.Json</h4>
<h4 id="jest-config-js" tabindex="-1"><a class="header-anchor" href="#jest-config-js" aria-hidden="true">#</a> jest.config.js</h4>
<p>This is used for configuring Jest which is the JavaScript testing library used for writing unit and integration tests.</p>
<h4 id="package-json" tabindex="-1"><a class="header-anchor" href="#package-json" aria-hidden="true">#</a> package.json</h4>
<p>Records important metadata about a project.</p>
<h4 id="readme-md" tabindex="-1"><a class="header-anchor" href="#readme-md" aria-hidden="true">#</a> readme.md</h4>
<h4 id="vue-config-js" tabindex="-1"><a class="header-anchor" href="#vue-config-js" aria-hidden="true">#</a> vue.config.js</h4>
<p>config file for the vue project</p>
<h2 id="hierachy-of-folders" tabindex="-1"><a class="header-anchor" href="#hierachy-of-folders" aria-hidden="true">#</a> Hierachy of folders</h2>
<p>display a chart diagram here</p>
<h2 id="modules-1" tabindex="-1"><a class="header-anchor" href="#modules-1" aria-hidden="true">#</a> Modules</h2>
<p>display a chart diagram here</p>
<h2 id="api-schema" tabindex="-1"><a class="header-anchor" href="#api-schema" aria-hidden="true">#</a> API schema</h2>
<p>display a chart diagram</p>
<h3 id="api-endpoints" tabindex="-1"><a class="header-anchor" href="#api-endpoints" aria-hidden="true">#</a> API endpoints</h3>
<h3 id="account" tabindex="-1"><a class="header-anchor" href="#account" aria-hidden="true">#</a> /account</h3>
<h4 id="get-account-contact" tabindex="-1"><a class="header-anchor" href="#get-account-contact" aria-hidden="true">#</a> (GET) /account/contact/</h4>
<p>Description: to get the user.</p>
<p>id(integer), email(string), profession(string), organization(string), category(string),
feedback(string), created_at(string), updated_at(string).</p>
<h4 id="post-account-contact" tabindex="-1"><a class="header-anchor" href="#post-account-contact" aria-hidden="true">#</a> (POST) /account/contact/</h4>
<p>Description: to get the user.</p>
<p>name(string), email(string), profession(string), organization(string), category(string),
feedback(string), newsletter(string).</p>
<h4 id="get-account-contact-id" tabindex="-1"><a class="header-anchor" href="#get-account-contact-id" aria-hidden="true">#</a> (GET) /account/contact/{id}</h4>
<p>id(integer), email(string), profession(string), organization(string), category(string),
feedback(string), created_at(string), updated_at(string).</p>
<h4 id="put-account-contact-id" tabindex="-1"><a class="header-anchor" href="#put-account-contact-id" aria-hidden="true">#</a> (PUT) /account/contact/{id}</h4>
<p>name(string), email(string), profession(string), organization(string), category(string),
feedback(string), newsletter(string).</p>
<h4 id="patch-account-contact-id" tabindex="-1"><a class="header-anchor" href="#patch-account-contact-id" aria-hidden="true">#</a> (PATCH) /account/contact/{id}</h4>
<p>name(string), email(string), profession(string), organization(string), category(string),
feedback(string), newsletter(string).</p>
<h4 id="delete-account-contact-id" tabindex="-1"><a class="header-anchor" href="#delete-account-contact-id" aria-hidden="true">#</a> (DELETE) /account/contact/{id}</h4>
<p>id(integer)</p>
<h4 id="post-account-login" tabindex="-1"><a class="header-anchor" href="#post-account-login" aria-hidden="true">#</a> (POST) /account/login</h4>
<p>email(string), password(string)</p>
<h3 id="caches" tabindex="-1"><a class="header-anchor" href="#caches" aria-hidden="true">#</a> /caches</h3>
<h4 id="get-caches-data-caches" tabindex="-1"><a class="header-anchor" href="#get-caches-data-caches" aria-hidden="true">#</a> (GET) /caches/data/caches/</h4>
<p>none</p>
<h4 id="get-caches-man-refresh" tabindex="-1"><a class="header-anchor" href="#get-caches-man-refresh" aria-hidden="true">#</a> (GET) /caches/man/refresh</h4>
<p>none</p>
<h4 id="get-caches-man-status" tabindex="-1"><a class="header-anchor" href="#get-caches-man-status" aria-hidden="true">#</a> (GET) /caches/man/status</h4>
<p>none</p>
<h3 id="crud" tabindex="-1"><a class="header-anchor" href="#crud" aria-hidden="true">#</a> /crud</h3>
<h4 id="get-caches-data-caches-1" tabindex="-1"><a class="header-anchor" href="#get-caches-data-caches-1" aria-hidden="true">#</a> (GET) /caches/data/caches/</h4>
<p>id, name, created_at, user, indicators</p>
<h4 id="get-caches-man-refresh-1" tabindex="-1"><a class="header-anchor" href="#get-caches-man-refresh-1" aria-hidden="true">#</a> (GET) /caches/man/refresh</h4>
<h4 id="get-caches-man-status-1" tabindex="-1"><a class="header-anchor" href="#get-caches-man-status-1" aria-hidden="true">#</a> (GET) /caches/man/status</h4>
<h4 id="put-account-contact-id-1" tabindex="-1"><a class="header-anchor" href="#put-account-contact-id-1" aria-hidden="true">#</a> (PUT) /account/contact/{id}</h4>
<h4 id="patch-account-contact-id-1" tabindex="-1"><a class="header-anchor" href="#patch-account-contact-id-1" aria-hidden="true">#</a> (PATCH) /account/contact/{id}</h4>
<h4 id="delete-account-contact-id-1" tabindex="-1"><a class="header-anchor" href="#delete-account-contact-id-1" aria-hidden="true">#</a> (DELETE) /account/contact/{id}</h4>
<h4 id="post-account-login-1" tabindex="-1"><a class="header-anchor" href="#post-account-login-1" aria-hidden="true">#</a> (POST) /account/login</h4>
<h3 id="api-e" tabindex="-1"><a class="header-anchor" href="#api-e" aria-hidden="true">#</a> API e</h3>
<h3 id="api-endpoints-1" tabindex="-1"><a class="header-anchor" href="#api-endpoints-1" aria-hidden="true">#</a> API endpoints</h3>
<h3 id="api-endpoints-2" tabindex="-1"><a class="header-anchor" href="#api-endpoints-2" aria-hidden="true">#</a> API endpoints</h3>
<h3 id="api-endpoints-3" tabindex="-1"><a class="header-anchor" href="#api-endpoints-3" aria-hidden="true">#</a> API endpoints</h3>
<h2 id="indexeddb-schema" tabindex="-1"><a class="header-anchor" href="#indexeddb-schema" aria-hidden="true">#</a> IndexedDB Schema</h2>
<p>display a chart diagram here</p>
<h2 id="data-layer-feature-implementation" tabindex="-1"><a class="header-anchor" href="#data-layer-feature-implementation" aria-hidden="true">#</a> Data layer feature/ implementation</h2>
<p>display a chart diagram here</p>
</template>
