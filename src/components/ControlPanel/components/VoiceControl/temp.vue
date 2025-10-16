<template lang="">
  <BaseModal :showModal="show" @hidden="$emit('close')" size="" centered>
    <div class="container mt-4">
      <div class="card shadow-sm">
        <div class="card-body">
          <h5 class="card-title mb-3">🎤 Voice to Text (with API)</h5>

          <!-- Transcript Display -->
          <div
            class="border rounded p-3 mb-3"
            :class="{ 'bg-light': listening }"
            style="min-height: 80px"
          >
            <p v-if="transcript" class="mb-0">{{ transcript }}</p>
            <p v-else class="text-muted fst-italic mb-0">Say something...</p>
          </div>

          <!-- Buttons -->
          <div class="d-flex justify-content-center gap-2 mb-2">
            <button class="btn btn-primary" @click="startListening" :disabled="listening">
              Start
            </button>
            <button class="btn btn-danger" @click="stopListening" :disabled="!listening">
              Stop
            </button>
            <button class="btn btn-secondary" @click="clearTranscript">Clear</button>
          </div>

          <!-- Status messages -->
          <div v-if="errorMessage" class="alert alert-danger py-2 mt-2 mb-0">
            {{ errorMessage }}
          </div>
          <div v-if="apiResponse" class="alert alert-success py-2 mt-2 mb-0">
            {{ apiResponse }}
          </div>
        </div>
      </div>
    </div>
  </BaseModal>
</template>
<script>
import BaseModal from '@/components/ui-components/_base-modal.vue'; // Adjust
export default {
  name: 'VoiceControlModal',
  components: { BaseModal },
  props: { show: { type: Boolean, default: false } },
  data() {
    return {
      transcript: '',
      listening: false,
      recognition: null,
      errorMessage: '',
      apiResponse: '',
    };
  },
  mounted() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      this.errorMessage = 'Speech recognition is not supported in this browser.';
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'en-US';
    this.recognition.continuous = true;
    this.recognition.interimResults = true;

    this.recognition.onstart = () => {
      this.listening = true;
      this.errorMessage = '';
    };

    this.recognition.onerror = (event) => {
      this.errorMessage = `Error: ${event.error}`;
      this.listening = false;
    };

    this.recognition.onend = () => {
      this.listening = false;
      if (this.transcript) {
        this.sendTranscriptToAPI(this.transcript);
        console.log(this.transcript, '@@@');
      }
    };

    this.recognition.onresult = (event) => {
      let text = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }
      this.transcript = text.trim();
    };
  },
  methods: {
    startListening() {
      if (this.recognition && !this.listening) {
        this.recognition.start();
      }
    },
    stopListening() {
      if (this.recognition && this.listening) {
        this.recognition.stop();
      }
    },
    clearTranscript() {
      this.transcript = '';
      this.errorMessage = '';
      this.apiResponse = '';
    },
    async sendTranscriptToAPI(text) {
      try {
        const response = await fetch('https://cloud.activepieces.com/api/v1/webhooks/ofFJumlrn1gBaz0mBF8Mo/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text }),
        });

        if (!response.ok) {
          throw new Error(`API responded with status ${response.status}`);
        }

        const data = await response.json();
        this.apiResponse = data.message || 'Transcript sent successfully ✅';
        console.log('API response:', data);
      } catch (error) {
        console.error('Network/API error:', error);
        this.errorMessage = 'Network error: could not send transcript.';
      }
    },
  },
};
</script>
<style lang=""></style>
