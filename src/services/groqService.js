// groqService.js
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_API_KEY = process.env.VUE_APP_GROQ_API_KEY || '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';

/**
 * Generates a summary of the relationship between health indicators
 * @param {Object} indicator - The primary health indicator
 * @param {Array} relatedIndicators - List of related indicators
 * @param {Object} options - Additional options for the API call
 * @returns {Promise<string>} - The generated summary
 */
const generateRelationshipSummary = async (
  indicator,
  relatedIndicators,
  options = { maxWords: 80, format: 'markdown' }, // Default maxWords updated to 20
) => {
  try {
    // Updated prompt for conciseness
    const prompt = `
Concisely analyze the core relationship between the health indicator "${indicator.short_name}" (${
  indicator.program_area
}) 
and these related indicators: ${relatedIndicators
    .map((ri) => `"${ri.short_name}" (${ri.program_area})`)
    .join(', ')}.

Focus *only* on the most important connection or mutual impact. 
Keep the entire response under ${
  options.maxWords
} words. Do not use headings or lists. Just provide a single short paragraph.
`;

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
              'You are a public health expert specializing in analyzing relationships between health indicators. Provide extremely concise, key insights only.', // System prompt adjusted for conciseness
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.3, // Lowered temperature slightly for more focused output
        top_p: 0.9,
        max_tokens: 60, // Reduced max_tokens for shorter response
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
    console.error('Error generating relationship summary:', error);

    // Return a formatted error message that will display properly
    return `**Unable to Generate Relationship Analysis**

We encountered a technical issue while analyzing the relationship between these indicators. 

This could be due to:
* Temporary API service disruption
* Network connectivity issues
* Rate limiting on the API

Please try again in a few moments.`;
  }
};

export default generateRelationshipSummary;
