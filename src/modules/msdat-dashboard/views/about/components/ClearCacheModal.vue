<template>
    <transition name="fade">
      <div v-if="isOpen" class="modal" @click="closeOnBackdrop">
        <transition name="slide">
          <div class="modal-content" @click.stop>
            <!-- Close Icon -->
            <span class="close-btn" @click="closeModal">&times;</span>

            <!-- Modal Body (Slot for dynamic content) -->
            <slot></slot>

            <!-- Footer Buttons -->
            <div class="modal-footer">
              <button class="btn clear" @click="$emit('clear')">
                {{ clearText }}
              </button>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </template>

<script>
export default {
  props: {
    isOpen: Boolean, // Controls modal visibility
    clearText: { type: String, default: 'Clear' }, // Customizable Clear button text
  },
  methods: {
    closeModal() {
      this.$emit('close'); // Emit event to parent
    },
    closeOnBackdrop(event) {
      if (event.target.classList.contains('modal')) {
        this.closeModal();
      }
    },
  },
};
</script>

  <style scoped>
  /* Fading Background Animation */
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease-in-out;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  /* Sliding Modal Animation */
  .slide-enter-active, .slide-leave-active {
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  }
  .slide-enter {
    transform: translateY(-20px);
    opacity: 0;
  }
  .slide-leave-to {
    transform: translateY(20px);
    opacity: 0;
  }

  /* Glassmorphism Modal Background */
  .modal {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.1); /* Light transparent background */
    backdrop-filter: blur(5px); /* Blur effect */
    -webkit-backdrop-filter: blur(10px);
    justify-content: center;
    align-items: center;
  }

  /* Modal Content */
  .modal-content {
    background: rgba(255, 255, 255, 0.3); /* Semi-transparent background */
    backdrop-filter: blur(30px); /* Stronger blur inside */
    -webkit-backdrop-filter: blur(30px);
    padding: 20px;
    border-radius: 12px;
    width: 500px;
    text-align: center;
    position: relative;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  /* Close Button */
  .close-btn {
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 30px;
    cursor: pointer;
  }

  /* Modal Footer */
  .modal-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  /* Buttons */
  .btn {
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }

  .btn.cancel {
    background: rgba(100, 100, 100, 0.6);
    color: white;
  }

  .btn.clear {
    background: rgba(255, 0, 0, 0.7);
    color: white;
    font-size: 16px;
  }

  /* Button Hover Effect */
  .btn:hover {
    opacity: 0.9;
  }
  </style>
