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
  options = { maxWords: 200, format: 'markdown' },
) => {
  try {
    const prompt = `
Analyze the relationship between the health indicator "${indicator.short_name}" (${indicator.program_area}) 
and these related indicators: ${relatedIndicators.map((ri) => `"${ri.short_name}" (${ri.program_area})`).join(', ')}.
 
Please format your response as follows:
1. Start with a title using **bold formatting**
2. Follow with a short introduction paragraph about the primary indicator
3. For each related indicator:
   * Use a **bolded subheading** with the indicator name
   * Explain how it connects to the primary indicator
   * Note any mutual impacts or causal relationships
4. End with a brief summary paragraph

Keep the explanation under ${options.maxWords} words. Use markdown formatting:
* **bold text** for headings and emphasis
* Bullet points (*) for listing key points
* Short paragraphs for readability
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
              'You are a public health expert specializing in analyzing relationships between health indicators. Provide clear, concise, evidence-based explanations.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.4, // Slightly lower for more consistent output
        top_p: 0.95,
        max_tokens: 500, // Setting a token limit
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Groq API error:', errorData);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
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
