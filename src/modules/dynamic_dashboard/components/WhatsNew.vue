<template>
  <div class="datasource-container">
    <div class="whats-new-content">
      <div @click="closeComponent" class="close-btn">
        <img src="../../../assets/close-icon.png" alt="" />
      </div>
      <div class="d-flex w-100 justify-content-center mt-2 title">
        <h1>What's New!</h1>
      </div>
      <div v-for="(items, category) in whatsNew" :key="category" class="w-100 new-item d-flex">
        <div v-if="category === 'Dataset'" class="icon">
          <img src="../../../assets/new-dataset.png" alt="" />
        </div>
        <div v-if="category === 'Dashboard'" class="icon">
          <img src="../../../assets/dashboard.png" alt="" />
        </div>
        <div v-if="category === 'Feature'" class="icon">
          <img src="../../../assets/feature.png" alt="" />
        </div>
        <div class="info">
          <div v-if="category === 'Dashboard'" class="">
            <h3>{{ category }}</h3>
            <ul v-if="items && items.length > 0">
              <li v-for="item in items.slice(0, 3)" :key="item.id">
                <h3>{{ item.content }}</h3>
                <div class="w-100 d-flex justify-content-end">
                  <span @click="navigateToDashboard(item.title)" class="link">View Dashboard</span>
                </div>
              </li>
            </ul>
            <p v-else class="no-items-message">No New Dashboard available.</p>
          </div>
          <div v-else class="">
            <h2>{{ category }}</h2>
            <ul v-if="items && items.length > 0">
              <li v-for="item in items.slice(0, 3)" :key="item.id">
                <h3>{{ item.content }}</h3>
              </li>
            </ul>
            <p v-else class="no-items-message">No items available in this category.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import ApiServices from '@/modules/data-layer/services/ApiServices';

export default {
  data() {
    return {
      whatsNew: [],
    };
  },
  methods: {
    ...mapMutations('MSDAT_STORE', ['toggleShowWhatsNew', 'closeShowWhatsNew']),

    closeComponent() {
      console.log('@@@@@');
      this.closeShowWhatsNew();
    },
    async getWhatsNew() {
      const { data } = await ApiServices.getWhatsNew();
      const temp = this.groupByCategory(data.results);
      console.log(temp, '@Response');
      this.whatsNew = temp;
    },
    groupByCategory(data) {
      return data.reduce((acc, item) => {
        acc[item.category_name] = acc[item.category_name] || [];
        acc[item.category_name].push(item);
        return acc;
      }, {});
    },

    navigateToDashboard(str) {
      const link = str.split(' ').join('_');
      console.log(link, '@Response');
      const origin = window.location.origin;
      const url = `/dashboard/${link}`;
      // Construct the full URL
      const fullUrl = origin + url;
      // Open the full URL in a new tab
      window.open(fullUrl, '_blank');
    },
  },
  mounted() {
    this.getWhatsNew();
  },
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

.datasource-container {
  position: relative;
  border: 1px solid #c3c3c3;
  background-color: rgba(0, 0, 0, 0.4); // Adjust opacity only for the background
  height: 100%;
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 16px;
  }
  h2 {
    font-size: 14px;
    font-weight: bold;
  }
}

.close-btn {
  position: absolute;
  top: 5px;
  right: 5px;
}

.close-btn img {
  width: 32px;
  height: 32px;
  cursor: pointer;
}
.whats-new-content {
  position: relative;
  //   right: 20px;
  min-height: 300px;
  width: 600px;
  // top: 5rem;
  background-color: white;
  padding: 30px;
  border-radius: 10px;
}

.title h1 {
  font-size: 24px;
  color: #348481;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  line-height: 24px;
  line-height: 28px;
}
.new-item {
  margin: 10px 0;
  display: flex;
}
.icon img {
  height: 35px;
  width: 35px;
}
.info {
  width: 100%;
  margin: 0 10px;
}
.info h2 {
  margin: 0;
  font-size: 16px;
  font-family: 'DM Sans', sans-serif;
  font-weight: 600;
  line-height: 18px;
  color: #202020;
}

.info h3 {
  margin: 0;
  font-size: 14px;
  font-family: 'DM Sans', sans-serif;
  font-weight: 600;
  line-height: 18px;
  color: #202020;
}
.info p {
  font-size: 14px;
  font-family: 'DM Sans', sans-serif;
  font-weight: 400;
  line-height: 20px;
  color: #202020;
}

.link {
  font-size: 14px;
  color: #348461;
  font-family: 'DM Sans', sans-serif;
  font-weight: 400;
  line-height: 20px;
  color: #202020;
  cursor: pointer;
}
.link:hover {
  text-decoration: underline;
  color: #0e3a27;
  cursor: pointer;
}
</style>
