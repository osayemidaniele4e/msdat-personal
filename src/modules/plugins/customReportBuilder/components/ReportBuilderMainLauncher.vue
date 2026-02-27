<template>
  <div @mouseover="showText = true" @mouseleave="showText = false" class="mainWrapper">
    <transition name="tooltip-slide">
      <div class="detail" v-if="showText">
        <b-icon icon="file-earmark-richtext" class="detail-icon" />
        <span>Report Builder</span>
      </div>
    </transition>
    <div @click="handleClick" class="wrapper" :class="{ 'is-hovered': showText }">
      <div class="pulse-ring" v-if="!hasBeenClicked"></div>
      <b-icon icon="file-earmark-richtext" class="fab-icon" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReportBuilderMainLauncher',
  data() {
    return {
      showText: false,
      hasBeenClicked: false,
    };
  },
  mounted() {
    // Check if user has used the report builder before
    try {
      this.hasBeenClicked = !!localStorage.getItem('customReportBuilderState');
    } catch (e) { /* ignore */ }
  },
  methods: {
    handleClick() {
      this.hasBeenClicked = true;
      this.$emit('setActiveComponent', 'main');
    },
  },
};
</script>

<style scoped>
.mainWrapper {
  position: fixed;
  z-index: 9999;
  right: 2rem;
  bottom: 2rem;
  display: flex;
  align-items: center;
}

.wrapper {
  height: 56px;
  width: 56px;
  background: #1c6d90;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(28, 109, 144, 0.35);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.wrapper:hover,
.wrapper.is-hovered {
  transform: scale(1.08);
  box-shadow: 0 6px 24px rgba(28, 109, 144, 0.45);
  border-radius: 18px;
}

.wrapper:active {
  transform: scale(0.95);
}

.fab-icon {
  color: #ffffff;
  font-size: 24px;
  transition: transform 0.3s ease;
}

.wrapper:hover .fab-icon {
  transform: rotate(-8deg) scale(1.1);
}

/* Pulse ring for first-time users */
.pulse-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  border: 2px solid rgba(28, 109, 144, 0.4);
  animation: pulse-ring 2s ease-out infinite;
}

@keyframes pulse-ring {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.6);
    opacity: 0;
  }
}

/* Tooltip */
.detail {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #fff;
  margin-right: 12px;
  padding: 8px 14px;
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  font-family: 'Work Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: #1c6d90;
  white-space: nowrap;
  border: 1px solid rgba(28, 109, 144, 0.1);
}

.detail-icon {
  font-size: 16px;
  opacity: 0.7;
}

/* Tooltip transition */
.tooltip-slide-enter-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.tooltip-slide-leave-active {
  transition: all 0.2s ease;
}
.tooltip-slide-enter,
.tooltip-slide-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
</style>
