<template>
  <div class="w-100">
    <Header />
    <!-- Header -->
    <div class="p-4 position-relative">
      <div class="d-flex header-wrapper justify-content-between align-items-center mb-3">
        <h4 class="">Tag Management</h4>
        <button class="btn"><i class="bi bi-plus-lg"></i> Create New Tag</button>
      </div>

      <!-- Search -->
      <div class="mb-3">
        <input
          type="text"
          v-model="search"
          placeholder="Search..."
          class="form-control w-25 py-4"
        />
      </div>

      <!-- Table -->
      <div class="table-responsive">
        <table class="table table-hover align-middle">
          <thead class="table-light">
            <tr>
              <th>Tag Name</th>
              <th>Description</th>
              <th>Associated Indicators</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(tag, index) in filteredTags" :key="index">
              <td>{{ tag.name }}</td>
              <td>{{ tag.description }}</td>
              <td>
                <div class="tag">{{ tag.indicators }}</div>
              </td>
              <td>{{ tag.createdAt }}</td>
              <td>
                <button class="btn btn-sm btn-outline-primary mr-2">
                  <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger">
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="d-flex justify-content-between align-items-center mt-5">
        <small class="text-muted showing">
          Showing {{ startIndex + 1 }}–{{ endIndex }} of {{ tags.length }} tags
        </small>
        <nav>
          <ul class="pagination pagination-sm mb-0">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <a class="page-link px-3 py-2" href="#" @click.prevent="prevPage">‹</a>
            </li>
            <li
              v-for="page in totalPages"
              :key="page"
              class="page-item"
              :class="{ active: currentPage === page }"
            >
              <a class="page-link px-3 py-2" href="#" @click.prevent="goToPage(page)">{{ page }}</a>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <a class="page-link px-3 py-2" href="#" @click.prevent="nextPage">›</a>
            </li>
          </ul>
        </nav>
      </div>
      <div class="position-absolute create-wrapper">
        <div class="create-header">
          <h1>kkkkkk</h1>
        </div>
        <div v-if="indicators.length" class="create-content g-3">
          <div class="mb-3 mt-4">
            <label>Tag Name</label>
            <input type="text" />
          </div>
          <div class="mb-3">
            <label>Tag Name</label>
            <input type="text" />
          </div>
          <div class="mb-3">
            <label>Tag Name</label>
            <input type="text" />
          </div>
          <div class="">
            <label>Associated Indicators ( {{ chosen.length }})</label>
            <div class="w-100 drop-list-wrapper">
              <DropdownCheckbox :items="indicators" v-model="chosen" />
            </div>
          </div>
        </div>
        <div v-else class="w-100 h-100 d-flex flex-column align-items-center loading-item">
          <div class="spinner-border fs-4 text-success mx-3 mb-2" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <h4>Please wait while Indicators data load</h4>
        </div>
        <div class="create-footer">
          <span>hhhhhh</span>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '../about/layout/theHeader.vue';
import Footer from '../about/layout/theFooter.vue';
import apiServices from '@/modules/data-layer/services/ApiServices';
import DropdownCheckbox from './components/DropdownCheckbox.vue';

export default {
  components: {
    Header,
    Footer,
    DropdownCheckbox,
  },
  data() {
    return {
      search: '',
      currentPage: 1,
      perPage: 8,
      indicators: [],
      selectedIndicators: [],
      tags: [
        {
          name: 'Maternal Health',
          description: 'Indicators related to maternal health outcomes and services',
          indicators: 12,
          createdAt: '2023-05-15',
        },
        {
          name: 'Maternal Health',
          description: 'Indicators related to maternal health outcomes and services',
          indicators: 10,
          createdAt: '2023-06-10',
        },
        {
          name: 'Maternal Health',
          description: 'Indicators related to maternal health outcomes and services',
          indicators: 8,
          createdAt: '2023-07-22',
        },
        // Add more sample data as needed
      ],
      chosen: [],
    };
  },
  computed: {
    filteredTags() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.tags
        .filter((t) => t.name.toLowerCase().includes(this.search.toLowerCase()))
        .slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.tags.length / this.perPage);
    },
    startIndex() {
      return (this.currentPage - 1) * this.perPage;
    },
    endIndex() {
      return Math.min(this.startIndex + this.perPage, this.tags.length);
    },
  },
  methods: {
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    goToPage(page) {
      this.currentPage = page;
    },
    async getAllIndicators() {
      const { data } = await apiServices.fetchAllIndicators();
      this.indicators = data.results;
      console.log(this.indicators);
    },
  },

  mounted() {
    this.getAllIndicators();
  },
};
</script>

<style>
.table td,
.table th {
  vertical-align: middle;
}

.table th {
  background-color: #f1ecec;
}

.table td {
  font-size: 16px;
  font-weight: 400;
}

.table td .tag {
  background-color: #e6f0eb;
  height: 24px;
  width: 24px;
  border-radius: 12px;
  font-size: 10px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-wrapper h4 {
  font-size: 24px;
  font-weight: 700;
  color: #007d53;
}

.header-wrapper button {
  background-color: #007d53;
  width: 165.58px;
  height: 41.33px;
  color: white;
  font-size: 14px;
}

.showing {
  font-size: 16px;
  font-weight: 400;
}

.create-wrapper {
  background-color: white;
  height: 80vh;
  width: 500px;
  top: 70px;
  right: 20px;
  z-index: 100;
  position: relative;
  border: 1px solid #f1f1f1;
  border-radius: 10px;
}

.create-header {
  height: 50px;
  width: 100%;
  position: absolute;
  top: 0;
  background-color: #fff;
  border-bottom: 1px solid #f1f1f1;
}

.create-footer {
  height: 50px;
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: #fff;
  border-top: 1px solid #f1f1f1;
  z-index: 0;
}
.create-content {
  padding-top: 60px;
  padding-left: 20px;
  padding-right: 20px;
}
.create-content label {
  font-size: 16px;
  font-weight: 400;
  color: #555555;
}
.create-content input {
  width: 100%;
  height: 46px;
  border-radius: 4px;
  border: 1px solid #dddddd;
}

.loading-item {
  margin-top: 200px;
}

.drop-list-wrapper {
  height: 350px;
  overflow-y: auto;
  width: 100%;
}
</style>
