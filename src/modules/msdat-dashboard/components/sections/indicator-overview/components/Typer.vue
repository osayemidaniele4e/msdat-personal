<template>
  <div>
    <span v-for="(char, index) in typedText" :key="index">{{ char }}</span>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    typingSpeed: {
      type: Number,
      default: 0.002, // Adjust the speed as needed (milliseconds per character)
    },
  },
  data() {
    return {
      typedText: '',
      hasTyped: false,
      isDestroyed: false,
    };
  },
  computed: {
    ...mapGetters('MSDAT_STORE', ['getIsTypingEffect']),
  },
  methods: {
    ...mapMutations('MSDAT_STORE', ['SET_ISTYPINGEFFECT']),
    simulateTyping() {
      if (!this.hasTyped && !this.isDestroyed) {
        this.SET_ISTYPINGEFFECT(true);
        let currentIndex = 0;
        const textLength = this.text.length;

        const typingInterval = setInterval(() => {
          this.typedText += this.text[currentIndex];

          currentIndex++;

          if (currentIndex === textLength) {
            clearInterval(typingInterval);
            this.hasTyped = true;
            this.SET_ISTYPINGEFFECT(false);
          }
        }, this.typingSpeed);
      }
    },
  },
  mounted() {
    this.simulateTyping();
  },
  beforeDestroy() {
    this.isDestroyed = true;
  },
  watch: {
    text: 'simulateTyping',
  },
};
</script>

<style scoped>
/* Add your styles here if needed */
span {
  white-space: pre-line;
  font-size: 18px;
}
</style>
