<template>
  <div class="w-100">
    <Header />
    <div class="container-fluid mt-5 position-relative">
      <div class="d-flex mt-4 header-wrapper justify-content-between align-items-center px-5 mb-3">
        <h4 class="">Tag Management</h4>
        <button @click="toggleModal" class="btn">
          <i class="bi bi-plus-lg"></i> Create New Tag
        </button>
      </div>
      <div class="card shadow-sm">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <div class="search-box">
              <i class="bi bi-search search-icon"></i>
              <input
                type="text"
                class="form-control"
                placeholder="Search tags..."
                v-model="searchQuery"
              />
            </div>
          </div>

          <div class="table-responsive">
            <table class="table table-hover align-middle">
              <thead class="table-light">
                <tr>
                  <th scope="col">Tag Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Associated Indicators</th>
                  <th scope="col">Created Date</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="paginatedTags.length === 0">
                  <td colspan="5" class="text-center text-muted">No tags found.</td>
                </tr>
                <tr v-for="tag in paginatedTags" :key="tag.id">
                  <td>{{ tag.name }}</td>
                  <td>{{ tag.description }}</td>
                  <td>
                    <span class="badge indicator-badge">{{ tag.indicators.length }}</span>
                  </td>
                  <td>{{ new Date(tag.created_at).toLocaleString() }}</td>
                  <td>
                    <img src="../../../../assets/svg/Edit.svg" alt="edit" />
                    <img src="../../../../assets/svg/delete.svg" alt="edit" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination Controls -->
          <div class="d-flex justify-content-between align-items-center mt-3">
            <span class="text-muted small">
              Showing {{ startItem }}-{{ endItem }} of {{ filteredTags.length }} tags
            </span>
            <nav>
              <ul class="pagination mb-0">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                  <button class="page-link" @click="prevPage">‹</button>
                </li>
                <li
                  v-for="page in totalPages"
                  :key="page"
                  class="page-item"
                  :class="{ active: page === currentPage }"
                >
                  <button class="page-link" @click="changePage(page)">
                    {{ page }}
                  </button>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                  <button class="page-link" @click="nextPage">›</button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div v-if="openCreateModal" class="">
        <CreateTagModal @close="cancelCreate" @refresh="getAllTags" />
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
import CreateTagModal from './components/createTagModal.vue';

export default {
  components: {
    Header,
    Footer,
    DropdownCheckbox,
    CreateTagModal,
  },
  data() {
    return {
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 5,
      indicators: [],
      selectedIndicators: [],
      tags: [],
      chosen: [],
      open: false,
      selected: [],
      options: [
        { id: '1', label: 'Option 1' },
        { id: '2', label: 'Option 2' },
        { id: '3', label: 'Option 3' },
      ],
      selectedOption: '',
      description: '',
      openCreateModal: false,
    };
  },
  computed: {
    filteredTags() {
      const q = this.searchQuery.trim().toLowerCase();
      return q
        ? this.tags.filter(
            (tag) => tag.name.toLowerCase().includes(q) || tag.description.toLowerCase().includes(q)
          )
        : this.tags;
    },
    totalPages() {
      return Math.max(1, Math.ceil(this.filteredTags.length / this.itemsPerPage));
    },
    paginatedTags() {
      const page = Math.min(this.currentPage, this.totalPages);
      const start = (page - 1) * this.itemsPerPage;
      return this.filteredTags.slice(start, start + this.itemsPerPage);
    },
    startItem() {
      if (!this.filteredTags.length) return 0;
      return (this.currentPage - 1) * this.itemsPerPage + 1;
    },
    endItem() {
      return Math.min(this.currentPage * this.itemsPerPage, this.filteredTags.length);
    },
  },
  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    prevPage() {
      this.changePage(this.currentPage - 1);
    },
    nextPage() {
      this.changePage(this.currentPage + 1);
    },
    async getAllIndicators() {
      const { data } = await apiServices.fetchAllIndicators();
      this.indicators = data.results;
      console.log(this.indicators);
    },

    async getAllTags() {
      const { data } = await apiServices.getTags();
      // this.indicators = data.results;
      console.log(data.data.results, 'Tags');
      this.tags = data.data.results;
    },

    toggleModal() {
      this.openCreateModal = true;
    },

    cancelCreate() {
      this.openCreateModal = false;
    },

    toggleOption(option) {
      const index = this.selected.findIndex((o) => o.id === option.id);
      if (index > -1) {
        // remove if already selected
        this.selected.splice(index, 1);
      } else {
        // add if not selected
        this.selected.push(option);
      }
    },
    isSelected(option) {
      return this.selected.some((o) => o.id === option.id);
    },
  },
  watch: {
    searchQuery() {
      this.currentPage = 1;
    },
    filteredTags() {
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
      }
    },
  },
  mounted() {
    this.getAllTags();
  },
};
</script>

<style scoped>
.header-wrapper {
  padding: 0 20px;
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

.container {
  max-width: 1200px;
}
.card {
  border: none;
  border-radius: 0.75rem;
}
.search-box {
  position: relative;
  width: 250px;
}
.search-icon {
  position: absolute;
  left: 10px;
  top: 40%;
  transform: translateY(-50%);
  color: #aaa;
  width: 14px;
  height: 14px;
}
.search-box .form-control {
  padding-left: 35px;
  border-radius: 0.5rem;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  width: 350px;
  height: 37px;
}
.table {
  font-size: 0.9rem;
}

.table td,
.table th {
  vertical-align: middle;
}

.table thead th {
  font-weight: 400;
  color: #333333;
  background-color: #f8f9fa;
  border-bottom-width: 1px;
  font-size: 16px;
}

tbody tr td {
  font-size: 14px;
  font-weight: 400;
  padding: 14px 10px;
  border-bottom: 1px solid #e0e0e0;
}

tbody tr td img {
  width: 20px;
  height: 20px;
  margin-right: 5px;
  cursor: pointer;
}
.indicator-badge {
  background-color: #eaf3f2;
  color: #0d6e66;
  width: 24px;
  height: 24px;
  font-size: 0.8rem;
  font-weight: 500;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-icon {
  color: #6c757d;
}
.btn-icon:hover {
  color: #000;
}
.pagination .page-item .page-link {
  border: none;
  border-radius: 4px;
  color: #6c757d;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 2px;
}

.pagination .page-item.active .page-link {
  background-color: #007d53;
  color: white;
}
.pagination .page-item.disabled .page-link {
  color: #ced4da;
}
.pagination .page-item .page-link:hover {
  background-color: #f1f1f1;
}
.pagination .page-item.active .page-link:hover {
  background-color: #0a5651;
}
</style>
