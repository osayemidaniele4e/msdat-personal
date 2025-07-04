// groqService.js
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_API_KEY = process.env.VUE_APP_GROQ_API_KEY || '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';

/**
 * Generates a summary of health indicators - either relationships between multiple indicators or a single indicator summary
 * @param {Array} indicators - Array of health indicators to analyze
 * @param {Object} options - Additional options for the API call
 * @returns {Promise<string>} - The generated summary
 */
const generateIndicatorSummary = async (
  indicators,
  options = { maxWords: 50, format: 'markdown' },
) => {
  try {
    let prompt = '';

    if (indicators.length === 1) {
      // Single indicator summary
      const indicator = indicators[0];
      prompt = `
Provide a concise summary of the health indicator "${indicator.short_name}" (${indicator.program_area}).

Explain what this indicator measures, its significance in public health, and why it's important for monitoring health outcomes.
Keep the response under ${options.maxWords} words and ensure all sentences are complete and well-formed. Provide a single coherent paragraph.
`;
    } else {
      // Multiple indicators relationship analysis
      prompt = `
Analyze the core relationships between these health indicators: ${indicators.map((ind) => `"${ind.short_name}" (${ind.program_area})`).join(', ')}.

Focus on how these indicators interact with each other, their mutual impacts, and shared underlying factors.
Keep the response under ${
  options.maxWords
} words and ensure all sentences are complete and well-formed. Provide a single coherent paragraph.
`;
    }

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-70b-8192',
        messages: [
          {
            role: 'system',
            content:
              indicators.length === 1
                ? 'You are a public health expert specializing in health indicator analysis. Provide clear, concise explanations of health indicators and their importance. Always complete your sentences and ensure coherent, well-formed responses.'
                : 'You are a public health expert specializing in analyzing relationships between health indicators. Provide extremely concise, key insights only. Always complete your sentences and ensure coherent, well-formed responses.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.3, // Lowered temperature slightly for more focused output
        top_p: 0.9,
        max_tokens: 150, // Increased to allow complete sentences
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Groq API error:', errorData);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    // Trim potential leading/trailing whitespace which might affect word count perception
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating indicator summary:', error);

    // Return a formatted error message that will display properly
    return `**Unable to Generate Indicator Analysis**

We encountered a technical issue while analyzing the selected indicator(s). 

This could be due to:
* Temporary API service disruption
* Network connectivity issues
* Rate limiting on the API

Please try again in a few moments.`;
  }
};

export default generateIndicatorSummary;
