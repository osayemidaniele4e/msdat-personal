/**
 * Confidence Engine for MSDAT Indicators
 * Computes a confidence score (0-100%) based on data quality factors.
 */

const CLASSIFICATION_RULES = {
  HIGH: { min: 80, max: 100, label: 'High' },
  MEDIUM: { min: 50, max: 79, label: 'Medium' },
  LOW: { min: 0, max: 49, label: 'Low' },
};

/**
 * Calculate confidence score based on weighted factors
 * @param {Object} data - The indicator data and context
 * @returns {Object} - { score, level, explanation }
 */
function calculateConfidence(indicatorId, context = {}) {
  const {
    timeSeries = [],
    reportingPeriods = [],
    sources = [],
    metadata = {},
  } = context;

  if (!timeSeries || timeSeries.length === 0) {
    return {
      score: null,
      level: 'Unknown',
      explanation: 'No data available',
    };
  }

  // 1. Data Completeness (40%)
  // Ratio of available data points to expected reporting periods
  const expectedPoints = reportingPeriods.length || 12; // Default to 12 if not provided
  const actualPoints = timeSeries.filter((d) => d.value !== null && d.value !== undefined).length;
  const completenessScore = Math.min(100, (actualPoints / expectedPoints) * 100);

  // 2. Source Consistency (20%)
  // If multiple sources are consistent (low variance between them for same period)
  // For MVP, we'll use the number of sources as a proxy if detail isn't available
  const sourceScore = sources.length > 1 ? 90 : 70;

  // 3. Volatility (20%)
  // High variability in time series reduces confidence
  let volatilityScore = 100;
  if (timeSeries.length > 2) {
    const values = timeSeries.map((d) => Number(d.value)).filter((v) => !isNaN(v));
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const variance = values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length;
    const stdDev = Math.sqrt(variance);
    const cv = mean !== 0 ? stdDev / mean : 0; // Coefficient of Variation

    // Higher CV means lower confidence. If CV > 0.5, start penalizing
    volatilityScore = Math.max(0, 100 - (cv * 100));
  }

  // 4. Reporting Gaps (10%)
  // Identify gaps in reporting sequence
  let gapScore = 100;
  let maxGap = 0;
  let currentGap = 0;

  // Simple gap detection: nulls in sequence
  timeSeries.forEach((d) => {
    if (d.value === null || d.value === undefined) {
      currentGap++;
    } else {
      maxGap = Math.max(maxGap, currentGap);
      currentGap = 0;
    }
  });
  maxGap = Math.max(maxGap, currentGap);

  if (maxGap > 0) {
    gapScore = Math.max(0, 100 - (maxGap * 20)); // Penalty of 20% per consecutive missing period
  }

  // 5. Sample Size Patterns (10%)
  // Logic based on sample size if available
  const sampleSizeScore = metadata.hasLargeSampleSize ? 100 : 80;

  // Weighted sum
  const finalScore = Math.round(
    (completenessScore * 0.4)
    + (sourceScore * 0.2)
    + (volatilityScore * 0.2)
    + (gapScore * 0.1)
    + (sampleSizeScore * 0.1),
  );

  // Classification
  let level = 'Low';
  if (finalScore >= CLASSIFICATION_RULES.HIGH.min) level = CLASSIFICATION_RULES.HIGH.label;
  else if (finalScore >= CLASSIFICATION_RULES.MEDIUM.min) level = CLASSIFICATION_RULES.MEDIUM.label;

  // Explanation Generation
  let explanation = '';
  if (finalScore >= 80) {
    explanation = `Based on consistent reporting from ${timeSeries[0].period || 'previous years'}–${timeSeries[timeSeries.length - 1].period || 'current'}`;
  } else if (finalScore >= 50) {
    if (maxGap > 0) {
      explanation = 'Data has minor reporting gaps but overall trend is stable';
    } else {
      explanation = 'Moderate variability in reported values across sources';
    }
  } else if (actualPoints < expectedPoints / 2) {
    explanation = 'Data has significant missing periods and high variability';
  } else {
    explanation = 'Limited data points reduce reliability';
  }

  return {
    score: finalScore,
    level,
    explanation,
  };
}

module.exports = {
  calculateConfidence,
};
