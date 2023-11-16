<template>
    <div class="position-fixed zIndex">
      <div class="header d-flex justify-content-center position-relative">
        <div>
          <h1>Intelligent Indicator Search</h1>
        </div>
        <p @click="toggleComponent" class="close-icon">x</p>
      </div>
      <div>
        <!-- Search client is running, show search functionality -->
      </div>
      <footer>Powered by eHealth4everyone</footer>
    </div>
  </template>

<script>
// import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';

export default {
  name: 'IndicatorPluginView',
  components: {
  },
  data() {
    // return {
    //   searchClient: instantMeiliSearch(
    //     'http://172.93.48.72:7700/',
    //     'E4E_ADMIN',
    //   ),
    //   isSearchClientRunning: false,
    //   itemData: null,
    //   items: [

    //   ],
    // };
  },

  async mounted() {
    await this.checkSearchClientStatus();
  },

  methods: {
    toggleVisibility() {
      localStorage.setItem('indicatorPlugin', 'false');
    },
    toggleComponent() {
      this.$emit('setActiveComponent', 'main');
    },
    async checkSearchClientStatus() {
      try {
        // Check if the search client is running by making a test search request
        const results = await this.searchClient.search('');
        if (results) {
          this.isSearchClientRunning = true;
        }
      } catch (error) {
        console.error('Error occurred:', error);
      }
    },
    loadMore() {
      this.$refs.infiniteHits.loadMore();
    },

  },
};
</script>
  <style scoped>
  .header {
    background-color: inherit;
    height: 77px;
    padding: 20px;
    padding-right: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .header h1 {
    font-size: 1px;
    text-align: center;
    font: normal normal bold 22px/14px Work Sans;
    letter-spacing: 0px;
    color: var(--green);
    opacity: 1;
    margin: 0;
  }

  .search-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5em;
    margin-top: -15px;
  }

  .search-input {
    height: 2.2em;
    width: 26em;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    border: none;
    padding-inline: 1.8em;
  }

  .search-input:focus {
    outline: 2px solid #5cb85c;

  }

  .search-icon {
    height: 2.2em;
    width: 2.2em;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    color: green;

  }

  .init {
    top: 15%;
  }

  .search-results {
    margin-top: 0.5em;
    max-height: 450px;
    /* Adjust the height as needed */
    overflow-y: scroll;
    background-color: white;

  }

  /* Adjust the styles for the hits and item as needed */

  .zIndex {
    position: fixed;
    z-index: 9999;
    right: 0px;
    top: 70px;
    background-color: whitesmoke;
    width: 500px;
    height: 777px;
    border: 1px groove #1c6d90;
    border-radius: 8px;
    bottom: 50px;
  }

  .content {
    width: 90%;
    margin-top: 20px;
  }

  footer {
    width: 100%;
    border-top: 1px solid;
    position: fixed;
    bottom: 0px;
    font-size: 0.75em;
    padding: 0.5em;
    background-color: white;
  }

  .header p {
    background-color: whitesmoke;
    height: 25px;
    width: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    cursor: pointer;
    position: absolute;
    right: -5px;
    top: -5px;
  }

  .result-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-inline: 1em;
  }
  </style>
