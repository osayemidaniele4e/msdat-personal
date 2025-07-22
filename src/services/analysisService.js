const API_URL = 'https://cloud.activepieces.com/api/v1/webhooks/rX9dFZKJid6b8j2h8XAIH/sync';

const analysisService = {
  async generateChartAnalysis(indicatorData, chartImage) {
    try {
      if (!indicatorData || !chartImage) {
        throw new Error('Missing required data for analysis');
      }

      // Remove the data URL prefix if it exists
      const cleanBase64 = chartImage.replace(/^data:image\/[a-z]+;base64,/, '');

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          indicator_name: indicatorData.short_name,
          image_base64: cleanBase64,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      return (
        data.model_response || data.analysis || data.message || 'Analysis completed successfully.'
      );
    } catch (error) {
      throw new Error(`Failed to generate analysis: ${error.message}`);
    }
  },
};

export default analysisService;
