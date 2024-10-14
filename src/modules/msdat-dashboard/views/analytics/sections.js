import DescriptiveAnalysisConfig from '../../components/sections/advanced/descriptive-section/descriptive-section-config';
import CorrelationAnalysisConfig from '../../components/sections/advanced/correlation-section/correlation-section-config';
import IndicatorComparisonConfig from '../../components/sections/advanced/indicator-comparison-section/indicator-comparison-section-config';
import PredictiveAnalysisConfig from '../../components/sections/advanced/predictive-section/predictive-section-config';
import AdvancedMultiSourceConfig from '../../components/sections/advanced/multisource-section/Multisource-section-config';
import BubbleChartConfig from '../../components/sections/advanced/scatterplot-section/scatterplot-section-config';

export const advancedSections = [
  CorrelationAnalysisConfig,
  DescriptiveAnalysisConfig,
  IndicatorComparisonConfig,
  PredictiveAnalysisConfig,
  AdvancedMultiSourceConfig,
  BubbleChartConfig,
];

export const advancedTitles = advancedSections.map((section) => section.label);
