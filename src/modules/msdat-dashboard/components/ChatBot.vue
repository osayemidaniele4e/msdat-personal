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
            <span>Metadata Chatbot</span>
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
            <div class="message-text" v-if="message.type === 'bot'" v-html="renderMarkdown(message.text)"></div>
            <div class="message-text" v-else>{{ message.text }}</div>
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
        <textarea
          v-model="userInput"
          @input="autoResizeInput"
          @keyup.enter.exact="sendMessage"
          placeholder="Type your message here..."
          :disabled="isLoading"
          ref="chatInput"
          rows="1"
        ></textarea>
        <button
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
import { marked } from 'marked';

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
            'what datasources does under5 mortality rate have?',
          ],
        },
      ],
      isLoading: false,
      sessionId: '',
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
    // UUID generator (RFC4122 version 4 compliant)
    generateSessionId() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.floor(Math.random() * 16);
        let v;
        if (c === 'x') {
          v = r;
        } else {
          v = (r % 4) + 8;
        }
        return v.toString(16);
      });
    },
    persistSession() {
      sessionStorage.setItem('chatbot_session_id', this.sessionId);
      sessionStorage.setItem('chatbot_messages', JSON.stringify(this.messages));
    },
    restoreSession() {
      const storedId = sessionStorage.getItem('chatbot_session_id');
      const storedMessages = sessionStorage.getItem('chatbot_messages');
      if (storedId) {
        this.sessionId = storedId;
      } else {
        this.sessionId = this.generateSessionId();
        sessionStorage.setItem('chatbot_session_id', this.sessionId);
      }
      if (storedMessages) {
        try {
          this.messages = JSON.parse(storedMessages);
        } catch (e) {
          // fallback to default if parse fails
        }
      }
    },
    async sendMessage() {
      if (!this.userInput.trim() || this.isLoading) return;

      // Add user message
      this.messages.push({
        type: 'user',
        text: this.userInput,
      });
      this.persistSession();

      const userMessage = this.userInput;
      this.userInput = '';
      this.isLoading = true;

      try {
        // Webhook integration
        const response = await fetch('https://cloud.activepieces.com/api/v1/webhooks/y4MNr1MBY7n2RzmVnYM8E/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: userMessage,
            overrideConfig: { sessionId: this.sessionId },
          }),
        });
        const data = await response.json();
        // Accepts either {text: ...} or fallback
        const botText = data && data.text ? data.text : 'Sorry, I did not understand the response.';
        this.messages.push({
          type: 'bot',
          text: botText,
        });
      } catch (error) {
        this.messages.push({
          type: 'bot',
          text: 'Sorry, I encountered an error. Please try again.',
        });
      } finally {
        this.isLoading = false;
        this.persistSession();
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      }
    },
    sendSuggestedMessage(suggestion) {
      this.userInput = suggestion;
      this.sendMessage();
    },
    scrollToBottom() {
      const container = this.$refs.messagesContainer;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    },
    renderMarkdown(text) {
      return marked.parse(text || '');
    },
    autoResizeInput() {
      this.$nextTick(() => {
        const input = this.$refs.chatInput;
        if (input) {
          input.style.height = 'auto';
          input.style.height = `${input.scrollHeight}px`;
        }
      });
    },
  },
  mounted() {
    this.restoreSession();
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
  align-items: flex-end;
  gap: 0.5rem;
  background-color: #f8f9fa; /* Adjusted background color */

  textarea {
    flex: 1;
    padding: 0.6rem 0.8rem;
    border: 1px solid #ddd;
    border-radius: 20px;
    font-size: 14px;
    outline: none;
    min-height: 36px;
    max-height: 120px;
    resize: none;
    overflow-y: auto;
    line-height: 1.4;
    transition: border-color 0.2s;

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
