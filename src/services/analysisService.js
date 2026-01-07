const API_URL = 'https://cloud.activepieces.com/api/v1/webhooks/rX9dFZKJid6b8j2h8XAIH/sync';

const analysisService = {
  async generateChartAnalysis(indicatorData, chartImage, compiledData) {
    try {
      if (!indicatorData || !chartImage) {
        throw new Error('Missing required data for analysis');
      }

      // Remove the data URL prefix if it exists (handles png, jpeg, svg+xml, etc.)
      const cleanBase64 = chartImage.replace(/^data:image\/[\w+\-\.]+;base64,/, '');

      const payload = {
        indicator_name: indicatorData.full_name,
        image_base64: cleanBase64,
      };

      // Add the smart analysis data if provided
      if (compiledData) {
        payload.analysis_data = compiledData;
      }

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
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
