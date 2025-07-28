<template>
  <div>
    <div v-if="!showWindow" class="export-fab" @click="showWindow = true">
      <svg width="32" height="32" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#1c6d90"/><path d="M16 12H8m4-4v8" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>
    </div>
    <div v-else class="export-window">
      <div class="export-header">
        <span>Data Export</span>
        <button class="close-btn" @click="showWindow = false">X</button>
      </div>
      <div class="export-content">
        <p>This is the Data Export plugin window.</p>
        <!-- Add export UI here -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DataExportMain',
  data() {
    return {
      showWindow: false,
    };
  },
};
</script>
<style scoped>
.export-fab {
  position: fixed;
  right: 3rem;
  bottom: 5rem;
  width: 60px;
  height: 60px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}
.export-window {
  position: fixed;
  right: 2rem;
  bottom: 7rem;
  width: 350px;
  background: #fff;
  border: 1px solid #1c6d90;
  border-radius: 8px;
  z-index: 10000;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}
.export-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1c6d90;
  color: #fff;
  padding: 0.5rem 1rem;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
.close-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
}
.export-content {
  padding: 1rem;
}
</style>
