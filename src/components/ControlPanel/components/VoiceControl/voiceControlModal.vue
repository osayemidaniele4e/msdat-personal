<template>
 <BaseModal :showModal="show" @hidden="$emit('close')" size=""  centered>
   <template #title>
     MSDAT Assistant
   </template>
   <template #default>
     <div class="voice-assistant-container p-3">
       <!-- Title and introduction -->
       <div class="text-center mb-4">
         <p class="">Hello! Welcome to the MSDAT Platform. How can I help you?</p>
       </div>

       <!-- Transcript display -->
       <div v-if="transcript" class="mb-4 p-3 bg-light rounded border">
         <p>
           <strong>You said:</strong> {{ transcript }}
         </p>
       </div>

       <!-- Loading spinner -->
       <div v-if="status === 'processing'" class="mb-4 p-3 bg-light rounded border text-center">
         <div class="d-flex align-items-center justify-content-center">
           <div class="rolling-spinner mr-2"></div>
           <span>Processing your request...</span>
         </div>
       </div>

       <!-- Text response display -->
       <div v-if="textResponse" class="mb-4 p-3 bg-info-light rounded border">
         <p>
           <strong>Assistant:</strong> {{ textResponse }}
         </p>
       </div>

       <!-- Microphone permission warning -->
       <b-alert
         :show="micPermission !== 'granted'"
         variant="warning"
         class="d-flex align-items-center mb-4"
       >
         <b-icon icon="info-circle-fill" class="mr-2"></b-icon>
         <span>
           {{ micPermission === "denied"
             ? "Microphone access denied. Please enable microphone access in your browser settings."
             : "Microphone permission required. Click the button below to grant access." }}
         </span>
       </b-alert>

       <!-- Browser compatibility warning -->
       <b-alert
         :show="!recognitionSupported"
         variant="danger"
         class="d-flex align-items-center mb-4"
       >
         <b-icon icon="exclamation-triangle-fill" class="mr-2"></b-icon>
         <span>
           Speech recognition is not supported in this browser. Please try Chrome, Edge, or Safari.
         </span>
       </b-alert>

       <!-- Microphone control -->
       <div class="mic-control text-center mb-4">
         <p class="mb-3">{{ statusText }}</p>
         <b-button
           :variant="micButtonVariant"
           class="rounded-circle mic-button d-flex align-items-center justify-content-center"
           style="width: 80px; height: 80px;"
           :class="micButtonClass"
           @click="micPermission !== 'granted' ? requestMicrophoneAccess() : null"
           @mousedown="micPermission === 'granted' ? startListening() : null"
           @mouseup="micPermission === 'granted' ? stopListening() : null"
           @touchstart.prevent="micPermission === 'granted' ? startListening() : null"
           @touchend.prevent="micPermission === 'granted' ? stopListening() : null"
         >
           <b-icon icon="mic-fill" font-scale="2" class="text-white"></b-icon>
         </b-button>
       </div>

       <!-- Test API button -->
       <div class="my-4">
         <b-button
           variant="light"
           block
           @click="testAPIDirectly"
         >
           Test API with Sample Command
         </b-button>
       </div>

       <!-- Debug information panel -->
       <div class="mt-4 border-top pt-3">
         <details>
           <summary class="cursor-pointer">Debug Information</summary>
           <div class="mt-2 bg-light p-2 rounded border" style="max-height: 150px; overflow-y: auto;">
             <div v-if="debugInfo.length === 0">
               <p>No debug information available</p>
             </div>
             <div v-else>
               <div v-for="(info, index) in debugInfo" :key="index" class="mb-1">
                 {{ info }}
               </div>
             </div>
           </div>
         </details>
       </div>

       <!-- Audio element -->
       <audio
         ref="audioRef"
         controls
         class="mt-4 w-100"
         @error="(e) => addDebugInfo(`Audio error: ${e.target.error?.message || 'Unknown error'}`)"
         @play="() => addDebugInfo('Audio started playing')"
         @pause="() => addDebugInfo('Audio paused')"
         @ended="() => addDebugInfo('Audio playback completed')"
       >
         Your browser does not support the audio element.
       </audio>
     </div>
   </template>
   <template #footer-btn>
     <button type="button" class="btn btn-secondary" @click="$emit('close')">Close</button>
   </template>
 </BaseModal>
</template>

<script>
import BaseModal from '@/components/ui-components/_base-modal.vue'; // Adjust path if necessary
import {
  ref, computed, onMounted, onBeforeUnmount,
} from 'vue';

export default {
  name: 'VoiceControlModal',
  components: {
    BaseModal,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    // Add this function at the start of the setup function, before other declarations
    const sanitizeJsonResponse = (text) => {
      try {
        // First try parsing as-is
        return JSON.parse(text);
      } catch (e) {
        // If that fails, try to fix common issues with the response
        const cleanText = text.replace(/"\s*"([^"]+)"\s*"/, '"$1"'); // Remove double quotes around string values
        return JSON.parse(cleanText);
      }
    };

    const isListening = ref(false);
    const transcript = ref('');
    const textResponse = ref(''); // Added for text response
    const status = ref('idle'); // idle, listening, processing, response
    const audioUrl = ref(null);
    const audioRef = ref(null);
    const recognitionRef = ref(null);
    const debugInfo = ref([]);
    const micPermission = ref('prompt'); // granted, denied, prompt
    const recognitionSupported = ref(true);

    // Add this function to log debug information
    const addDebugInfo = (message) => {
      console.log(message);
      debugInfo.value.push(`${new Date().toLocaleTimeString()}: ${message}`);
    };

    // Process audio responses
    const processAudioResponse = (audioResponse) => {
      addDebugInfo(`Audio response URL received: ${audioResponse}`);
      audioUrl.value = audioResponse;
      status.value = 'response';
      // Play the audio
      if (audioRef.value) {
        addDebugInfo('Setting audio source and attempting to play...');
        audioRef.value.src = audioResponse;
        audioRef.value.load();
        audioRef.value.play().catch((error) => {
          addDebugInfo(`Error playing audio: ${error.message}`);
        });
        addDebugInfo('Audio playback initiated');
      } else {
        addDebugInfo('Audio element reference is null');
      }
    };

    // Send command to API
    const sendCommandToAPI = async (command) => {
      addDebugInfo(`Preparing to send command to API: "${command}"`);
      const payload = JSON.stringify({ command });
      addDebugInfo(`API request payload: ${payload}`);
      textResponse.value = ''; // Clear previous text response
      try {
        addDebugInfo('Sending request to API endpoint...');
        // Try with direct fetch first
        try {
          const response = await fetch('https://cloud.activepieces.com/api/v1/webhooks/ofFJumlrn1gBaz0mBF8Mo/sync', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: payload,
          });
          addDebugInfo(`API response status: ${response.status}`);
          const responseText = await response.text(); // Get raw text first

          addDebugInfo('--- BEGIN RAW API RESPONSE TEXT (INITIAL) ---');
          addDebugInfo(responseText); // Log raw text directly
          addDebugInfo('--- END RAW API RESPONSE TEXT (INITIAL) ---');

          if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}. Response: ${responseText}`);
          }

          addDebugInfo('Parsing API response...');
          let data;
          try {
            data = sanitizeJsonResponse(responseText);
          } catch (parseError) {
            const errorMessage = parseError instanceof Error ? parseError.message : String(parseError);
            addDebugInfo(`Error parsing JSON. Details: ${errorMessage}`);
            addDebugInfo('--- BEGIN RAW API RESPONSE TEXT (CAUSING PARSE ERROR) ---');
            addDebugInfo(responseText);
            addDebugInfo('--- END RAW API RESPONSE TEXT (CAUSING PARSE ERROR) ---');
            throw new Error(`Failed to parse JSON response: ${errorMessage}. Check debug logs for raw response text.`);
          }

          addDebugInfo(`API response data: ${JSON.stringify(data)}`);
          if (data.text_response) {
            textResponse.value = data.text_response;
            addDebugInfo(`Text response received: ${data.text_response}`);
          }
          if (data.audio_response) {
            processAudioResponse(data.audio_response);
          } else {
            addDebugInfo('No audio response in API response');
            if (!data.text_response) status.value = 'idle'; // Only set to idle if no text response either
          }
        } catch (error) {
          // If direct fetch fails, try with a CORS proxy
          addDebugInfo(`Direct API call failed: ${error instanceof Error ? error.message : String(error)}`);
          addDebugInfo('Attempting with CORS proxy...');
          const corsResponse = await fetch(
            `https://corsproxy.io/?${encodeURIComponent('https://cloud.activepieces.com/api/v1/webhooks/ofFJumlrn1gBaz0mBF8Mo/sync')}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: payload,
            },
          );
          addDebugInfo(`CORS proxy API response status: ${corsResponse.status}`);
          const corsResponseText = await corsResponse.text(); // Get raw text first

          addDebugInfo('--- BEGIN RAW CORS PROXY API RESPONSE TEXT (INITIAL) ---');
          addDebugInfo(corsResponseText); // Log raw text directly
          addDebugInfo('--- END RAW CORS PROXY API RESPONSE TEXT (INITIAL) ---');

          if (!corsResponse.ok) {
            throw new Error(`API request with CORS proxy failed with status ${corsResponse.status}. Response: ${corsResponseText}`);
          }

          addDebugInfo('Parsing API response from CORS proxy...');
          let corsData;
          try {
            corsData = sanitizeJsonResponse(corsResponseText);
          } catch (parseError) {
            const errorMessage = parseError instanceof Error ? parseError.message : String(parseError);
            addDebugInfo(`Error parsing JSON from CORS proxy. Details: ${errorMessage}`);
            addDebugInfo('--- BEGIN RAW CORS PROXY API RESPONSE TEXT (CAUSING PARSE ERROR) ---');
            addDebugInfo(corsResponseText);
            addDebugInfo('--- END RAW CORS PROXY API RESPONSE TEXT (CAUSING PARSE ERROR) ---');
            throw new Error(`Failed to parse JSON response from CORS proxy: ${errorMessage}. Check debug logs for raw response text.`);
          }

          addDebugInfo(`API response data from CORS proxy: ${JSON.stringify(corsData)}`);
          if (corsData.text_response) {
            textResponse.value = corsData.text_response;
            addDebugInfo(`Text response from CORS proxy: ${corsData.text_response}`);
          }
          if (corsData.audio_response) {
            processAudioResponse(corsData.audio_response);
          } else {
            addDebugInfo('No audio response in API response from CORS proxy');
            if (!corsData.text_response) status.value = 'idle';
          }
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        addDebugInfo(`All API attempts failed: ${errorMessage}`);
        status.value = 'idle';
      }
    };

    // Initialize speech recognition
    const initializeSpeechRecognition = () => {
      addDebugInfo('Initializing speech recognition...');
      if (typeof window !== 'undefined') {
        // Check if SpeechRecognition is available
        const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognitionAPI) {
          addDebugInfo('Speech recognition API is available');
          recognitionRef.value = new SpeechRecognitionAPI();
          // Configure the recognition
          recognitionRef.value.continuous = false;
          recognitionRef.value.interimResults = true;
          recognitionRef.value.lang = 'en-US';
          // Set up event handlers
          recognitionRef.value.onstart = () => {
            addDebugInfo('Speech recognition started');
            isListening.value = true;
          };
          recognitionRef.value.onresult = (event) => {
            const current = event.resultIndex;
            const transcriptText = event.results[current][0].transcript;
            // Using string concatenation instead of template literal with escaped quotes
            addDebugInfo(`Speech recognized (interim): "${transcriptText}"`);
            // If this is a final result
            if (event.results[current].isFinal) {
              // Using string concatenation instead of template literal with escaped quotes
              addDebugInfo(`Speech recognized (final): "${transcriptText}"`);
              transcript.value = transcriptText;
              isListening.value = false;
              status.value = 'processing';
              sendCommandToAPI(transcriptText);
              // Emit the command
              emit('command', transcriptText);
            }
          };
          recognitionRef.value.onerror = (event) => {
            addDebugInfo(`Speech recognition error: ${event.error}`);
            isListening.value = false;
            status.value = 'idle';
          };
          recognitionRef.value.onend = () => {
            addDebugInfo('Speech recognition ended');
            isListening.value = false;
            if (status.value === 'listening') {
              status.value = 'idle';
            }
          };
          recognitionSupported.value = true;
        } else {
          addDebugInfo('Speech recognition is NOT supported in this browser');
          recognitionSupported.value = false;
        }
      }
    };

    // Check for microphone permissions
    const checkMicrophonePermission = async () => {
      try {
        addDebugInfo('Checking microphone permission...');
        const permissionStatus = await navigator.permissions.query({ name: 'microphone' });
        micPermission.value = permissionStatus.state;
        addDebugInfo(`Microphone permission status: ${permissionStatus.state}`);
        permissionStatus.onchange = () => {
          micPermission.value = permissionStatus.state;
          addDebugInfo(`Microphone permission changed to: ${permissionStatus.state}`);
        };
      } catch (error) {
        addDebugInfo(`Error checking microphone permission: ${error}`);
      }
    };

    // Request microphone access explicitly
    const requestMicrophoneAccess = async () => {
      try {
        addDebugInfo('Requesting microphone access...');
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        micPermission.value = 'granted';
        addDebugInfo('Microphone access granted');
        // Clean up the stream immediately since we just needed it for permissions
        stream.getTracks().forEach((track) => track.stop());
        // Initialize speech recognition after permission is granted
        initializeSpeechRecognition();
      } catch (error) {
        micPermission.value = 'denied';
        addDebugInfo(`Microphone access denied: ${error}`);
      }
    };

    // Start listening function
    const startListening = () => {
      addDebugInfo('Starting to listen...');
      // Clear previous results
      transcript.value = '';
      textResponse.value = ''; // Clear previous text response
      audioUrl.value = null;
      status.value = 'listening';
      // Check if we have microphone permission
      if (micPermission.value !== 'granted') {
        addDebugInfo('No microphone permission, requesting access...');
        requestMicrophoneAccess();
        return;
      }
      // Check if speech recognition is supported and initialized
      if (!recognitionSupported.value) {
        addDebugInfo('Speech recognition not supported in this browser');
        return;
      }
      if (!recognitionRef.value) {
        addDebugInfo('Speech recognition not initialized, initializing now...');
        initializeSpeechRecognition();
      }
      // Start recognition
      try {
        addDebugInfo('Attempting to start speech recognition');
        recognitionRef.value.start();
      } catch (error) {
        addDebugInfo(`Error starting speech recognition: ${error}`);
        // If already started, stop and restart
        if (error instanceof DOMException && error.name === 'InvalidStateError') {
          addDebugInfo('Recognition was already running, stopping and restarting');
          try {
            recognitionRef.value.stop();
            setTimeout(() => {
              recognitionRef.value.start();
            }, 100);
          } catch (stopError) {
            addDebugInfo(`Error stopping recognition: ${stopError}`);
          }
        }
      }
    };

    // Stop listening function
    const stopListening = () => {
      addDebugInfo('Stopping listening...');
      if (recognitionRef.value) {
        try {
          recognitionRef.value.stop();
          addDebugInfo('Speech recognition stopped successfully');
        } catch (error) {
          addDebugInfo(`Error stopping speech recognition: ${error}`);
        }
      } else {
        addDebugInfo('Speech recognition not initialized');
      }
    };

    // Test API directly
    const testAPIDirectly = () => {
      const testCommand = 'what is the value for Skill birth attendance for kiti state in twenty twenty two';
      addDebugInfo(`Testing API with command: "${testCommand}"`);
      sendCommandToAPI(testCommand);
    };

    // Computed properties
    const micButtonVariant = computed(() => {
      if (isListening.value) return 'danger'; // Red when listening
      if (micPermission.value !== 'granted') return 'warning'; // Yellow if permission needed
      return 'primary'; // Green if granted and idle
    });
    const micButtonClass = computed(() => {
      if (isListening.value) {
        return 'bg-red-500 text-white';
      } if (micPermission.value !== 'granted') {
        return 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-400';
      }
      return 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-400';
    });

    const statusText = computed(() => {
      if (isListening.value) {
        return 'Listening...';
      } if (status.value === 'processing') {
        return 'Processing your request...';
      } if (status.value === 'response') {
        return 'Playing response...';
      } if (micPermission.value !== 'granted') {
        return 'Click the microphone to grant access';
      }
      return 'Press and hold the microphone to speak';
    });

    // Lifecycle hooks
    onMounted(() => {
      addDebugInfo('Voice assistant component mounted');
      checkMicrophonePermission();
      // Check if speech recognition is supported
      if (typeof window !== 'undefined') {
        const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognitionAPI) {
          addDebugInfo('Speech recognition is NOT supported in this browser');
          recognitionSupported.value = false;
        } else {
          addDebugInfo('Speech recognition API is available');
          // Only initialize if we already have microphone permission
          if (micPermission.value === 'granted') {
            initializeSpeechRecognition();
          }
        }
      }
    });

    onBeforeUnmount(() => {
      addDebugInfo('Cleaning up voice assistant...');
      if (recognitionRef.value) {
        try {
          recognitionRef.value.abort();
        } catch (error) {
          addDebugInfo(`Error aborting recognition: ${error}`);
        }
      }
      if (audioRef.value) {
        audioRef.value.pause();
      }
    });

    return {
      isListening,
      transcript,
      textResponse, // Return textResponse
      status,
      audioUrl,
      audioRef,
      debugInfo,
      micPermission,
      recognitionSupported,
      micButtonVariant,
      micButtonClass,
      statusText,
      startListening,
      stopListening,
      requestMicrophoneAccess,
      testAPIDirectly,
      addDebugInfo,
    };
  },
};
</script>

<style scoped>
/* Optional: Add minor adjustments if Bootstrap defaults aren't perfect */
.mic-button:active {
  /* Slightly darken the button on click if needed */
  filter: brightness(90%);
}

.mic-control {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.voice-assistant-container p {
  margin: 0;
  font-size: 0.9rem;
}

.bg-info-light {
  background-color: #e6f7ff; /* A light blue, adjust as needed */
}

/* Rolling spinner animation */
.rolling-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #007bff;
  border-radius: 50%;
  animation: roll 1s linear infinite;
}

@keyframes roll {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
