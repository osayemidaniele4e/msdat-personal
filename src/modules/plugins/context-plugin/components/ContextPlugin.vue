<template>
  <div class="position-fixed zIndex">
    <!-- Header Section -->
    <div class="header d-flex position-relative">
      <div>
        <h1>Project Context Search</h1>
        <span>Get context data right away</span>
      </div>
      <p @click="toggleComponent" class="close-icon">x</p>
    </div>
    <div class="intro">
      <p>Search for keywords to get suggestions, articles and videos</p>
    </div>
    <!-- Search Form -->
    <form @submit.prevent="searchKeywords">
      <div class="search-container">
        <input type="text" class="form-control search-input" v-model="query" placeholder="Search For Keywords...">
        <button type="submit" class="btn search-icon p-2"><i class="fa fa-search"></i></button>
      </div>
    </form>

    <!-- Loading Spinner -->
    <div class="text-center mt-5" v-if="loading">
      <b-spinner variant="primary" label="Loading..."></b-spinner>
    </div>

    <!-- Display Results Section -->
    <div v-if="displayResults" class="mt-5 search-results">
      <!-- Tabs Section -->
      <b-tabs v-model="activeTab" pills card>
        <!-- Suggestions Tab -->
        <b-tab title="Suggestions" active>
          <div v-if="paginatedSuggestions.length > 0" class="suggestion">
            <h3>Suggestions:</h3>
            <ul>
              <li v-for="suggestion in paginatedSuggestions" :key="suggestion.id">{{ suggestion.name }}</li>
            </ul>
            <!-- Pagination Section -->
            <b-pagination
              v-model="currentSuggestionsPage"
              :total-rows="totalSuggestions"
              :per-page="perPage"
              aria-controls="suggestions-list"
              class="mt-3"
              align="center"
              size="md"
              @change="loadSuggestionsPage"
            ></b-pagination>
          </div>
          <div v-else>
            <p>No suggestions available.</p>
          </div>
        </b-tab>

        <!-- Articles Tab -->
        <b-tab title="Articles">
          <div v-if="paginatedArticles.length > 0">
            <div class="result-header">
              <h2>Articles</h2>
              <!-- Pagination Section -->
              <b-pagination
                v-model="currentPage"
                :total-rows="totalResults"
                :per-page="perPage"
                aria-controls="article-list"
                class="mt-3"
                align="center"
                size="md"
                @change="loadArticlesPage"
              ></b-pagination>
            </div>
            <div id="article-list" class="result-list">
              <div v-for="article in paginatedArticles" :key="article.id">{{ article.name }}</div>
            </div>
          </div>
          <div v-else>
            <p>No articles available.</p>
          </div>
        </b-tab>

        <!-- Videos Tab -->
        <b-tab title="Videos">
          <div v-if="videos.length > 0">
            <h2>Videos</h2>
            <div v-for="video in videos" :key="video.id">{{ video.name }}</div>
          </div>
          <div v-else>
            <p>No videos available.</p>
          </div>
        </b-tab>
      </b-tabs>

    </div>
    <!-- No Results Message -->
<div v-if="noResults || (displayResults && suggestions.length === 0 && articles.length === 0)">
  <p class="p-3 text-center">
    No Results Found!
  </p>
</div>

     <!-- Footer Section -->
<footer>
  Powered by eHealth4everyone
</footer>
  </div>
</template>

<script>
export default {
  name: 'ContextSearchPlugin',
  data() {
    return {
      // api url
      requestModel: 'https://dedaapi.e4eweb.space/keywords/',
      articles: [],
      suggestions: [],
      videos: [],
      query: '',
      loading: false,
      displayResults: false,
      noResults: false,
      currentPage: 1,
      currentSuggestionsPage: 1,
      perPage: 6,
      totalResults: 0,
      totalSuggestions: 0,
      activeTab: 'Suggestions',
    };
  },
  computed: {
    paginatedArticles() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.articles.slice(start, end);
    },
    paginatedSuggestions() {
      const start = (this.currentSuggestionsPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.suggestions.slice(start, end);
    },
  },
  methods: {
    async searchKeywords() {
      this.articles = [];
      this.suggestions = [];
      this.videos = [];
      this.noResults = false;
      this.loading = true;

      try {
        // initiate api call
        const response = await this.$axios.get(`${this.requestModel}?page=1&name=${this.query}`);
        const { count, results } = response.data;

        if (results.length > 0) {
          this.suggestions = results.filter((item) => item.name === this.query);
          this.articles = results.filter((item) => item.name !== this.query && item.type === 'article');
          this.videos = results.filter((item) => item.name !== this.query && item.type === 'video');
          this.loading = false;
          this.displayResults = true;
          this.totalResults = count;
          this.totalSuggestions = this.suggestions.length;
        } else {
          this.loading = false;
          this.noResults = true;
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    toggleComponent() {
      this.$emit('setActiveComponent', 'main');
    },
    loadArticlesPage(page) {
      this.currentPage = page;
    },
    loadSuggestionsPage(page) {
      this.currentSuggestionsPage = page;
    },
  },
};
</script>

 <style scoped>
    .header {
      background-color: #007d53;
      height: 77px;
      padding: 20px;
      padding-right: 40px;
      display: flex;
      align-items: center;
      }

    .header span {
      font: normal normal normal 15px/18px Work Sans;
      letter-spacing: 0px;
      color: #ffffff;
      opacity: 1;
      margin: 0;
      margin-top: -4px;
    }

    .header h1 {
      font-size: 1px;
      text-align: center;
      font: normal normal bold 22px/14px Work Sans;
      letter-spacing: 0px;
      color: var(--white);
      opacity: 1;
      margin: 0;
    }

    .intro{
      padding:20px;
      color: #007d53;
    }

    .intro p{
      font: normal normal normal 15px/18px Work Sans;
      letter-spacing: 0px;
      color: #007d53;
      opacity: 1;
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
      box-shadow: none;
    }
    .search-input::placeholder
    {
      color: lightgrey;
    }

    .search-input:focus {
      outline: 2px solid #5cb85c;

    }

    .search-icon{
      height: 2.2em;
      width: fit-content;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: white;
      color: green;
      font-size: medium;
      box-shadow: none;
    }

    .search-icon:focus, .search-icon:hover {
      outline: 2px solid #5cb85c;
      color: green;

    }

    .init {
      top: 15%;
    }

    .search-results {
      max-height: 450px;
      /* Adjust the height as needed */
      overflow-y: scroll;
      background-color: white;

    }

   

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
      margin-top: 10px;
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

    .suggestion{
      padding-inline: 1em;
    }

    .suggestion ul{
      list-style-type: none;
      padding-inline: 0;
    }

    .suggestion ul li{
      padding: 0.5em;
      border-bottom: 1px solid lightgrey;
    }

    p{
      font: normal normal normal 15px/18px Work Sans;
      letter-spacing: 0px;
      color: #007d53;
      opacity: 1;
    }
    </style>
