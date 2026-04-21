<template>
  <div class="metadata-qa-container">
    <!-- Sidebar -->
    <div class="sidebar">
      <div class="new-chat-btn" @click="clearChat">
        <b-icon icon="plus-lg"></b-icon>
        <span>New chat</span>
      </div>
      <div class="history-list">
        <div
          v-for="history in chatHistory"
          :key="history.id"
          :class="['history-item', { active: history.id === sessionId }]"
          @click="loadSession(history.id)"
        >
          <b-icon icon="chat-left-text"></b-icon>
          <span>{{ history.title }}</span>
          <b-icon
            icon="trash"
            class="delete-icon"
            @click.stop="deleteSession(history.id)"
          ></b-icon>
        </div>
      </div>
      <div class="sidebar-footer">
        <div class="user-profile">
          <div class="avatar">
            <b-icon icon="person-fill"></b-icon>
          </div>
          <span>User</span>
        </div>
      </div>
    </div>

    <!-- Main Chat Area -->
    <div class="main-chat-area">
      <div class="chat-messages" ref="messagesContainer">
        <div v-if="messages.length === 0" class="empty-state">
          <div class="logo-container">
            <img src="../modules/msdat-dashboard/components/assets/ai-launcher.svg" alt="MSDAT AI" class="ai-logo-large">
          </div>
          <h2>How can I help you today?</h2>
        </div>

        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="['message-row', message.type]"
        >
          <div class="message-content-wrapper">
            <div class="message-avatar">
              <div v-if="message.type === 'bot'" class="bot-avatar">
                <img src="../modules/msdat-dashboard/components/assets/ai-launcher-green.svg" alt="AI">
              </div>
              <div v-else class="user-avatar">
                <b-icon icon="person-fill"></b-icon>
              </div>
            </div>
            <div class="message-text">
              <div class="sender-name">{{ message.type === 'bot' ? 'Soma' : 'You' }}</div>
              <div class="markdown-body" v-if="message.type === 'bot'" v-html="renderMarkdown(message.text)"></div>
              <div class="text-body" v-else>{{ message.text }}</div>

              <div v-if="message.suggestions && message.suggestions.length > 0" class="suggestions">
                <button
                  v-for="(suggestion, sIndex) in message.suggestions"
                  :key="sIndex"
                  class="suggestion-chip"
                  @click="sendSuggestedMessage(suggestion)"
                >
                  {{ suggestion }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="isLoading" class="message-row bot">
          <div class="message-content-wrapper">
            <div class="message-avatar">
              <div class="bot-avatar">
                <img src="../modules/msdat-dashboard/components/assets/ai-launcher-green.svg" alt="AI">
              </div>
            </div>
            <div class="message-text">
              <div class="sender-name">Soma</div>
              <div class="typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <div class="input-area-wrapper">
        <div class="input-container">
          <textarea
            v-model="userInput"
            @input="autoResizeInput"
            @keyup.enter.exact="sendMessage"
            placeholder="Message Soma..."
            :disabled="isLoading"
            ref="chatInput"
            rows="1"
          ></textarea>
          <button
            class="send-btn"
            @click="sendMessage"
            :disabled="isLoading || !userInput.trim()"
          >
            <b-icon icon="arrow-up"></b-icon>
          </button>
        </div>
        <div class="disclaimer">
          Soma can make mistakes. Consider checking important information.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { marked } from 'marked';

export default {
  name: 'MetadataQA',
  data() {
    return {
      userInput: '',
      messages: [],
      isLoading: false,
      sessionId: '',
      chatHistory: [],
    };
  },
  methods: {
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
      // Save current session to localStorage
      const currentSession = {
        id: this.sessionId,
        title: this.getSessionTitle(),
        messages: this.messages,
        timestamp: Date.now(),
      };

      // Get all sessions from localStorage
      let allSessions = this.getAllSessions();

      // Update or add current session
      const existingIndex = allSessions.findIndex((s) => s.id === this.sessionId);
      if (existingIndex !== -1) {
        allSessions[existingIndex] = currentSession;
      } else {
        allSessions.unshift(currentSession);
      }

      // Keep only last 50 sessions
      if (allSessions.length > 50) {
        allSessions = allSessions.slice(0, 50);
      }

      // Save to localStorage
      localStorage.setItem('metadata_qa_sessions', JSON.stringify(allSessions));

      // Update chatHistory
      this.loadChatHistory();
    },
    getAllSessions() {
      const stored = localStorage.getItem('metadata_qa_sessions');
      return stored ? JSON.parse(stored) : [];
    },
    getSessionTitle() {
      // Generate title from first user message or use default
      const firstUserMessage = this.messages.find((m) => m.type === 'user');
      if (firstUserMessage) {
        const text = firstUserMessage.text.trim();
        return text.length > 40 ? `${text.substring(0, 40)}...` : text;
      }
      return `Chat ${new Date().toLocaleDateString()}`;
    },
    loadChatHistory() {
      this.chatHistory = this.getAllSessions();
    },
    loadSession(sessionId) {
      if (sessionId === this.sessionId) return;

      const sessions = this.getAllSessions();
      const session = sessions.find((s) => s.id === sessionId);

      if (session) {
        this.sessionId = session.id;
        this.messages = session.messages || [];
        this.$nextTick(() => this.scrollToBottom());
      }
    },
    deleteSession(sessionId) {
      if (confirm('Are you sure you want to delete this conversation?')) {
        let sessions = this.getAllSessions();
        sessions = sessions.filter((s) => s.id !== sessionId);
        localStorage.setItem('metadata_qa_sessions', JSON.stringify(sessions));
        this.loadChatHistory();

        // If we deleted the current session, create a new one
        if (sessionId === this.sessionId) {
          this.clearChat();
        }
      }
    },
    clearChat() {
      this.sessionId = this.generateSessionId();
      this.messages = [
        {
          type: 'bot',
          text: "👋 Hi there! I’m <span class='soma-name'>**Soma**</span> — **MSDAT Data Assistant**.\n\nI can help you explore Nigeria’s health data on the MSDAT platform.\n\nAsk me about **metadata, indicators, data sources**, reporting periods, or even how to interpret key health metrics.",
        },
      ];
      this.persistSession();
      this.$nextTick(() => this.scrollToBottom());
    },
    restoreSession() {
      const storedId = sessionStorage.getItem('metadata_qa_session_id');
      const storedMessages = sessionStorage.getItem('metadata_qa_messages');
      if (storedId) {
        this.sessionId = storedId;
      } else {
        this.sessionId = this.generateSessionId();
        sessionStorage.setItem('metadata_qa_session_id', this.sessionId);
      }
      if (storedMessages) {
        try {
          this.messages = JSON.parse(storedMessages);
        } catch (e) {
          // fallback
        }
      } else {
        // Initialize with welcome message if no history
        this.messages = [
          {
            type: 'bot',
            text: "👋 Hi there! I'm <span class='soma-name'>**Soma**</span> — **MSDAT Data Assistant**.\n\nI can help you explore Nigeria's health data on the MSDAT platform.\n\nAsk me about **metadata, indicators, data sources**, reporting periods, or even how to interpret key health metrics.",
          },
        ];
      }

      // Load chat history first
      this.loadChatHistory();

      // Try to restore last active session from localStorage
      const lastSessionId = localStorage.getItem('metadata_qa_last_session');

      if (lastSessionId && this.chatHistory.length > 0) {
        const lastSession = this.chatHistory.find((s) => s.id === lastSessionId);

        if (lastSession) {
          this.sessionId = lastSession.id;
          this.messages = lastSession.messages || [];
          return;
        }
      }

      // If no valid session found, check if there are any existing sessions
      if (this.chatHistory.length > 0) {
        // Load the most recent session
        const mostRecent = this.chatHistory[0];
        this.sessionId = mostRecent.id;
        this.messages = mostRecent.messages || [];
      } else if (!storedId) {
        // Only persist new session if we created it fresh
        this.persistSession();
      }

      // Remember last active session
      localStorage.setItem('metadata_qa_last_session', this.sessionId);
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

      // Reset height
      this.$nextTick(() => {
        if (this.$refs.chatInput) this.$refs.chatInput.style.height = 'auto';
      });

      try {
        // Webhook integration
        const response = await fetch('https://n8n.e4eweb.space/webhook/7038e292-511b-49ca-94ba-92738219de03', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId: this.sessionId,
            chatInput: userMessage,
          }),
        });

        const raw = await response.text();
        let data = null;
        try {
          data = raw ? JSON.parse(raw) : null;
        } catch (e) {
          data = null;
        }

        if (!response.ok) {
          console.error('Chatbot fetch error', response.status, response.statusText, raw);
          const serverMessage = (data && (data.error || data.message)) ? (data.error || data.message) : raw || `${response.status} ${response.statusText}`;
          this.messages.push({
            type: 'bot',
            text: `Error from server: ${serverMessage}`,
          });
        } else {
          const botText = (data && (data.text || data.message || data.response))
            ? (data.text || data.message || data.response)
            : (raw || 'Sorry, I did not understand the response.');

          this.messages.push({
            type: 'bot',
            text: botText,
          });
        }
      } catch (error) {
        console.error('Chatbot network/error', error);
        const errMsg = error && error.message ? error.message : '';
        this.messages.push({
          type: 'bot',
          text: `Sorry, I encountered an error. ${errMsg}`,
        });
      } finally {
        this.isLoading = false;
        this.persistSession();
        localStorage.setItem('metadata_qa_last_session', this.sessionId);
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
    this.$nextTick(() => this.scrollToBottom());
  },
};
</script>

<style lang="scss" scoped>
.metadata-qa-container {
  display: flex;
  height: 100vh;
  width: 100%;
  background-color: #ffffff;
  font-family: 'Inter', sans-serif;
  overflow: hidden;
}

/* Sidebar */
.sidebar {
  width: 260px;
  background-color: #007d53;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  flex-shrink: 0;

  @media (max-width: 768px) {
    display: none; /* Hide sidebar on mobile for now */
  }
}

.new-chat-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s;
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 1rem;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  span {
    font-size: 0.875rem;
  }
}

.history-list {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.history-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.375rem;
  cursor: pointer;
  color: #ececf1;
  font-size: 0.875rem;
  position: relative;

  span {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .delete-icon {
    opacity: 0;
    transition: opacity 0.2s;
    cursor: pointer;
    flex-shrink: 0;

    &:hover {
      color: #ff4444;
    }
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);

    .delete-icon {
      opacity: 1;
    }
  }

  &.active {
    background-color: rgba(255, 255, 255, 0.1);
  }
}

.sidebar-footer {
  padding-top: 0.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.375rem;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .avatar {
    width: 32px;
    height: 32px;
    background-color: #f3f3f3ff;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
  }
}

/* Main Chat Area */
.main-chat-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: #ffffff;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 150px; /* Space for input area */
  scroll-behavior: smooth;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #333;

  .logo-container {
    background: #ffffff;
    padding: 20px;
    border-radius: 50%;
    margin-bottom: 20px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  }

  .ai-logo-large {
    width: 80px;
    height: 80px;
  }

  h2 {
    font-weight: 600;
    margin-bottom: 0;
  }
}

.message-row {
  padding: 1.5rem;
  border-bottom: 1px solid rgba(0,0,0,0.05);

  &.bot {
    background-color: #f7f7f8;
  }

  &.user {
    background-color: #ffffff;
  }
}

.message-content-wrapper {
  max-width: 768px;
  margin: 0 auto;
  display: flex;
  gap: 1.5rem;
}

.message-avatar {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
}

.bot-avatar, .user-avatar {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bot-avatar {
  background-color: #10a37f; /* OpenAI green-ish, or use MSDAT green */
  background-color: transparent;
  img {
      width: 100%;
      height: 100%;
  }
}

.user-avatar {
  background-color: #5436da; /* Or any user color */
  color: white;
  border-radius: 4px;
}

.message-text {
  flex: 1;
  font-size: 1.25rem;
  line-height: 1.7;
  color: #374151;
  overflow-wrap: break-word;

  .sender-name {
    font-weight: 600;
    margin-bottom: 0.25rem;
    font-size: 1.125rem;
    color: #111;
  }
}

.typing-indicator {
  display: flex;
  gap: 4px;
  padding: 10px 0;

  span {
    width: 8px;
    height: 8px;
    background-color: #ccc;
    border-radius: 50%;
    animation: bounce 1.4s infinite ease-in-out both;

    &:nth-child(1) { animation-delay: -0.32s; }
    &:nth-child(2) { animation-delay: -0.16s; }
  }
}

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

/* Input Area */
.input-area-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0) 0%, #ffffff 20%);
  padding: 2rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-container {
  width: 100%;
  max-width: 768px;
  position: relative;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 0.75rem;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0,0,0,0.05);
  display: flex;
  align-items: flex-end;
  padding: 0.75rem;

  &:focus-within {
    border-color: #007d53;
    box-shadow: 0 0 10px rgba(0, 125, 83, 0.1);
  }

  textarea {
    flex: 1;
    border: none;
    resize: none;
    max-height: 200px;
    padding: 0 0.5rem;
    font-family: inherit;
    font-size: 1rem;
    line-height: 1.5;
    outline: none;
    background: transparent;
    color: #333;

    &::placeholder {
      color: #9ca3af;
    }
  }

  .send-btn {
    background-color: #007d53;
    color: white;
    border: none;
    border-radius: 0.375rem;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-left: 0.5rem;

    &:disabled {
      background-color: #e5e7eb;
      color: #9ca3af;
      cursor: default;
    }

    &:not(:disabled):hover {
      background-color: #006040;
    }
  }
}

.disclaimer {
  font-size: 0.75rem;
  color: #9ca3af;
  margin-top: 0.75rem;
  text-align: center;
}

.suggestions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;

  .suggestion-chip {
    background-color: #ffffff;
    border: 1px solid #d1d5db;
    color: #374151;
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background-color: #f3f4f6;
      border-color: #9ca3af;
    }
  }
}

/* Markdown Styles */
::v-deep .markdown-body {
  font-size: 1.25rem !important;
  line-height: 1.7;

  p {
    margin-bottom: 1rem;
    &:last-child { margin-bottom: 0; }
    font-size: 1.25rem;
  }

  strong {
    font-weight: 600;
    color: #111;
  }

  ul, ol {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
  }

  li {
    margin-bottom: 0.25rem;
  }

  code {
    background-color: #f3f4f6;
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
    font-family: monospace;
    font-size: 0.875rem;
  }

  pre {
    background-color: #f3f4f6;
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin-bottom: 1rem;

    code {
      background-color: transparent;
      padding: 0;
    }
  }

  .soma-name {
     color: #007d53;
     font-weight: 700;
  }
}
</style>
