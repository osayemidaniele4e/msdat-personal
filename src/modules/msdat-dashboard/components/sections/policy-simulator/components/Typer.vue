<template>
  <div>
    <span v-for="(char, index) in typedText" :key="index">{{ char }}</span>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    typingSpeed: {
      type: Number,
      default: 0.0008, // Adjust the speed as needed (milliseconds per character)
    },
  },
  data() {
    return {
      typedText: '',
      hasTyped: false,
    };
  },
  methods: {
    simulateTyping() {
      if (!this.hasTyped) {
        let currentIndex = 0;
        const textLength = this.text.length;

        const typingInterval = setInterval(() => {
          this.typedText += this.text[currentIndex];

          currentIndex++;

          if (currentIndex === textLength) {
            clearInterval(typingInterval);
            this.hasTyped = true;
          }
        }, this.typingSpeed);
      }
    },
  },
  mounted() {
    this.simulateTyping();
  },
  watch: {
    text: 'simulateTyping',
  },
};
</script>

<style scoped>
/* Add your styles here if needed */
</style>
