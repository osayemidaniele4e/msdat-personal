<template>
  <div class="datasource-container">
    <div class="whats-new-content">
      <div @click="closeComponent" class="close-btn">
        <img src="../../../assets/close-icon.png" alt="" />
      </div>
      <div class="d-flex w-100 justify-content-center mt-2 title">
        <h1>What's New!</h1>
      </div>
      <div class="w-100 new-item d-flex">
        <div class="icon">
          <img src="../../../assets/new-dataset.png" alt="" />
        </div>
        <div class="info">
          <h2>New Data Set</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit Voluptate accusantium sapiente
            laboriosam repellat
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      datasources: [],
    };
  },
  methods: {
    ...mapMutations('MSDAT_STORE', ['toggleShowWhatsNew', 'closeShowWhatsNew']),

    closeComponent() {
      this.closeShowWhatsNew();
    },
  },
  mounted() {},
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
  height: 300px;
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
  height: 40px;
  width: 40px;
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
.info p {
  font-size: 14px;
  font-family: 'DM Sans', sans-serif;
  font-weight: 400;
  line-height: 20px;
  color: #202020;
}
</style>
