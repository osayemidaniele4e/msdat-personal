<template>
  <div class="chatbot-container">
    <!-- Chat Window -->
    <div v-if="isOpen" class="chat-window">
      <!-- Chat Header -->
      <div class="chat-header">
        <div class="header-left">
          <div class="bot-icon-header">
           <img src="./assets/ai-launcher.svg" alt="AI" class="ai-icons">
          </div>
          <div class="header-title">
            <span>Metdata Chatbot</span>
            <span class="online-status">• Online</span>
          </div>
        </div>
        <div class="header-right">
          <img src="../views/about/assets/expand.svg" alt="Expand" class="header-icon expand-icon">
          <img src="../views/about/assets/cancel.svg" alt="Close" class="close-icon" @click="toggleChat">
        </div>
      </div>

      <!-- Chat Messages -->
      <div class="chat-messages" ref="messagesContainer">
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="['message', message.type]"
        >
          <div v-if="message.type === 'bot'" class="message-icon">
           <img src="./assets/ai-launcher-green.svg" alt="AI" class="ai-icons">
          </div>
          <div v-else class="message-icon user-icon">
             <b-icon icon="person-fill"></b-icon>
          </div>
          <div class="message-content">
            <div class="message-text">{{ message.text }}</div>
            <div v-if="message.suggestions && message.suggestions.length > 0" class="suggestions">
              <span
                v-for="(suggestion, sIndex) in message.suggestions"
                :key="sIndex"
                class="suggestion-chip"
                @click="sendSuggestedMessage(suggestion)"
              >
                {{ suggestion }}
              </span>
            </div>
            <!-- Timestamps can be added here if needed -->
            <!-- <div class="timestamp">{{ message.timestamp }}</div> -->
          </div>
        </div>
        <div v-if="isLoading" class="message bot">
           <div class="message-icon">
            <b-icon icon="robot"></b-icon>
          </div>
          <div class="message-content">
            <div class="message-text">
              <b-spinner small></b-spinner>
              Thinking...
            </div>
          </div>
        </div>
      </div>

      <!-- Chat Input -->
      <div class="chat-input">
        <input
          v-model="userInput"
          @keyup.enter="sendMessage"
          placeholder="Type your message here..."
          :disabled="isLoading"
        />          <button
          @click="sendMessage"
          :disabled="isLoading || !userInput.trim()"
        >
          <img src="./assets/Vector.png" alt="Send" class="send-icon">
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatBot',
  data() {
    return {
      isOpen: false,
      userInput: '',
      messages: [
        {
          type: 'bot',
          text: "Hi there! I'm a bot designed to help you understand and explore Indicator metadata. You can ask me things like:",
          suggestions: [
            "What's the latest on malaria cases?",
            "Where can I find last year's data?",
            'What is this page about?',
          ],
        },
      ],
      isLoading: false,
    };
  },
  methods: {
    toggleChat() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      }
    },
    async sendMessage() {
      if (!this.userInput.trim() || this.isLoading) return;

      // Add user message
      this.messages.push({
        type: 'user',
        text: this.userInput,
      });

      const userMessage = this.userInput; // userMessage is used below for clarity, could be removed later
      this.userInput = '';
      this.isLoading = true;

      try {
        // TODO: Replace with actual Activepieces webhook integration
        // Simulated response for now
        await new Promise((resolve) => setTimeout(resolve, 1000));
        this.messages.push({
          type: 'bot',
          text: `You asked: "${userMessage}". This is a simulated response. The actual integration with Activepieces webhook will be implemented here.`,
        });
      } catch (error) {
        console.error('Error sending message:', error); // Log the error
        this.messages.push({
          type: 'bot',
          text: 'Sorry, I encountered an error. Please try again.',
        });
      } finally {
        this.isLoading = false;
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      }
    },
    sendSuggestedMessage(suggestion) {
      this.userInput = suggestion; // Set the input to the suggestion
      this.sendMessage(); // Send the message;
    },
    scrollToBottom() {
      const container = this.$refs.messagesContainer;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.chatbot-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
}

.chat-window {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 350px;
  height: 500px;
  background: white;
  border-radius: 8px; /* Adjusted border radius */
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15); /* Adjusted box shadow */
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chat-header {
  background: #007d53; /* Adjusted background color */
  color: white;
  padding: 0.6rem 1rem; /* Adjusted padding */
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;

  .header-left {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .bot-icon-header {
        width: 30px; /* Adjusted size */
        height: 30px; /* Adjusted size */
        display: flex;
        justify-content: center;
        align-items: center;

        .b-icon {
            font-size: 1.2rem; /* Adjusted icon size */
            color: #007d53; /* Icon color */
        }
    }

    .header-title {
      display: flex;
      flex-direction: column;
      font-weight: 600;

      span:first-child {
          font-size: 1rem; /* Adjusted font size */
      }

      .online-status {
        font-size: 0.7rem; /* Adjusted font size */
        font-weight: 400;
      }
    }
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 0.5rem; /* Adjusted gap */

    .header-icon, .close-icon {
      cursor: pointer;
      padding: 4px; /* Adjusted padding */
      border-radius: 50%;
      transition: background-color 0.2s;
      width: 30px; /* Adjusted icon size */
      height: 30px; /* Adjusted icon size */

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }
  }
}

.chat-messages {
  flex: 1;
  padding: 1rem; /* Adjusted padding */
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem; /* Adjusted gap */
  background-color: #f8f9fa; /* Adjusted background color */

  /* Scrollbar styles */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc; /* Adjusted scrollbar thumb color */
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent; /* Adjusted scrollbar track color */
  }
}

.message {
  display: flex;
  gap: 0.5rem;
  max-width: 85%;
  padding: 0;
  border-radius: 0;

  .message-icon {
    font-size: 1.5rem;
    color: #007d53;
    align-self: flex-start;
  }

  .user-icon {
      color: #333; /* User icon color */
  }

  .message-content {
     padding: 0.75rem 1rem; /* Padding around the message bubble */
     border-radius: 8px; /* Adjusted border radius */
     display: flex;
     flex-direction: column;
     gap: 0.5rem;
     word-break: break-word;
     box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08); /* Added subtle box shadow */
  }

  .message-text {
      font-size: 14px;
  }

  &.user {
    align-self: flex-end;
    .message-content {
      background: #e0f2f1; /* User message bubble color */
      color: #333;
      border-bottom-right-radius: 2px; /* Adjusted corner radius */
    }
  }

  &.bot {
    align-self: flex-start;
     .message-content {
      background: #ffffff; /* Bot message bubble color */
      color: #333;
      border-bottom-left-radius: 2px; /* Adjusted corner radius */
    }
  }

  .timestamp {
    font-size: 0.7rem;
    color: #666;
    margin-top: 0.3rem;
    text-align: end;
  }

  .suggestions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;
    padding-top: 0.5rem; /* Added padding top */
    border-top: 1px solid #eee; /* Added border top */

    .suggestion-chip {
      background-color: #ffffff; /* Suggestion chip background */
      color: #007d53;
      padding: 0.4rem 0.8rem;
      border-radius: 16px;
      font-size: 0.8rem;
      cursor: pointer;
      transition: background-color 0.2s;
      border: 1px solid #007d53; /* Added border */

      &:hover {
        background-color: #e0f2f1; /* Darker background on hover */
      }
    }
  }
}

.chat-input {
  padding: 0.8rem 1rem;
  border-top: 1px solid #eee;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #f8f9fa; /* Adjusted background color */

  input {
    flex: 1;
    padding: 0.6rem 0.8rem;
    border: 1px solid #ddd;
    border-radius: 20px;
    font-size: 14px;
    outline: none;

    &:focus {
      border-color: #007d53;
    }
  }

  button {
    width: 36px;
    height: 36px;
    border: none;
    background: #bfffe7;
    color: white;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;    font-size: 1.2rem;

    .send-icon {
      width: 20px;
      height: 20px;
    }

    &:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  }
}
</style>
