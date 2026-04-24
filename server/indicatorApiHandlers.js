/**
 * Shared handlers for /api/indicator/* routes.
 * Used by server/index.js and vue.config.js devServer.before so local dev works
 * without a separate process on PORT 3000.
 */
const { calculateConfidence } = require('./confidenceEngine');

function handleGetMetadata(req, res) {
  res.json({
    name: 'Sample Indicator',
    definition: 'Total observed events as a proportion of the expected population.',
    formula: '(Numerator / Denominator) * 100',
    source: 'National Health Information Server',
  });
}

function handleGetConfidence(req, res) {
  const { id } = req.params;
  const {
    location, datasource, year,
    rangeActive, rangeN, rangeSpread,
  } = req.query;

  const idInt = parseInt(id, 10) || (id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0));
  const yearInt = parseInt(year, 10) || 2024;
  const locInt = parseInt(location, 10) || 0;

  const seed = (idInt * 13 + locInt * 7 + (year ? yearInt : 99)) % 100;

  let completeness = 0.5 + (seed % 50) / 100;
  let sources = (seed % 2 === 0) ? ['NHMIS', 'DHS'] : ['NHMIS'];
  let hasLargeSampleSize = (seed % 3 !== 0);

  if (seed < 15 || String(id).includes('low')) {
    completeness = 0.3 + (seed % 15) / 100;
    sources = ['NHMIS'];
    hasLargeSampleSize = false;
  }

  const rangeActiveOn = rangeActive === '1' || rangeActive === 'true';
  const rangeNInt = parseInt(rangeN, 10);
  const spread = parseFloat(rangeSpread);

  if (rangeActiveOn) {
    sources = ['NHMIS', 'IHME'];
  }

  if (Number.isFinite(spread) && spread >= 0) {
    const tight = Math.max(0, 1 - Math.min(spread, 2) / 2);
    completeness = Math.max(0.3, Math.min(0.98, completeness * 0.5 + tight * 0.5));
  }

  const seriesLen = Number.isFinite(rangeNInt) && rangeNInt > 0
    ? Math.min(12, Math.max(2, rangeNInt))
    : 6;
  const baseYear = 2019;
  const reportingPeriods = Array.from(
    { length: seriesLen },
    (_, i) => (baseYear + i).toString(),
  );
  const mockContext = {
    indicatorId: id,
    location: location || 'National',
    datasource: datasource || 'NHMIS',
    year: year || '2024',
    timeSeries: Array.from({ length: seriesLen }, (_, i) => {
      const p = reportingPeriods[i];
      const valSeed = (seed + i * 11) % 100;
      return (valSeed / 100 < completeness) ? { period: p, value: 50 + valSeed } : null;
    }).filter(Boolean),
    reportingPeriods,
    sources,
    metadata: { hasLargeSampleSize, confidenceRange: rangeActiveOn },
  };

  const result = calculateConfidence(id, mockContext);
  res.json(result);
}

module.exports = {
  handleGetMetadata,
  handleGetConfidence,
};
