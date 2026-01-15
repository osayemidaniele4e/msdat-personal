// services/ai-service.js
import axios from 'axios';

const AI_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const AI_API_KEY = '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';

export const aiService = {
  async getAnalysis(indicatorName, metadata) {
    const response = await axios.post(
      `${AI_API_URL}/analyze`,
      {
        indicatorName,
        metadata,
      },
      {
        headers: {
          Authorization: `Bearer ${AI_API_KEY}`,
        },
      },
    );
    return response.data;
  },
};

export default aiService;
