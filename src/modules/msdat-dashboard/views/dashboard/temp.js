const temp = [
  {
    NMIS: {
      complementarity: {
        score: 80,
        grades: {
          years_available: {
            score: 2,
            scale: 'Fair',
          },
          methodology: {
            score: 3,
            scale: 'Moderate',
          },
          area: {
            score: 4,
            scale: 'Good',
          },
          study_population: {
            score: 5,
            scale: 'Excellent',
          },
          research_design: {
            score: 5,
            scale: 'Excellent',
          },
          related_indicators: {
            score: 5,
            scale: 'Excellent',
          },
        },
      },
      consistency: {
        score: 80,
        grades: {
          variability: {
            score: 0,
            scale: 'not available',
          },
          metadata_documentation_quality: {
            score: 5,
            scale: 'Excellent',
          },
          source_credibility: {
            score: 5,
            scale: 'Excellent',
          },
          uniformity_of_data: {
            score: 5,
            scale: 'Excellent',
          },
          uniformity_in_findings: {
            score: 5,
            scale: 'Excellent',
          },
        },
      },
    },
  },
  {
    NDHS: {
      complementarity: {
        score: 90,
        grades: {
          years_available: {
            score: 4,
            scale: 'Good',
          },
          methodology: {
            score: 4,
            scale: 'Good',
          },
          area: {
            score: 4,
            scale: 'Good',
          },
          study_population: {
            score: 5,
            scale: 'Excellent',
          },
          research_design: {
            score: 5,
            scale: 'Excellent',
          },
          related_indicators: {
            score: 5,
            scale: 'Excellent',
          },
        },
      },
      consistency: {
        score: 80,
        grades: {
          variability: {
            score: 0,
            scale: 'not available',
          },
          metadata_documentation_quality: {
            score: 5,
            scale: 'Excellent',
          },
          source_credibility: {
            score: 5,
            scale: 'Excellent',
          },
          uniformity_of_data: {
            score: 5,
            scale: 'Excellent',
          },
          uniformity_in_findings: {
            score: 5,
            scale: 'Excellent',
          },
        },
      },
    },
  },
  {
    aggregate: {
      complementarity: {
        years_available: {
          score: 3,
          description: 'Covers part of the relevant period with noticeable gaps.',
        },
        methodology: {
          score: 3,
          description: 'Adequate methods but with noticeable weaknesses or biases.',
        },
        area: {
          score: 4,
          description: 'National, Regional, and State.',
        },
        study_population: {
          score: 5,
          description: 'Fully aligned with the study population; detailed demographic breakdowns available.',
        },
        research_design: {
          score: 5,
          description: 'Rigorous and well-documented design with high reliability and validity.',
        },
        related_indicators: {
          score: 5,
          description: 'Provides a broad set of complementary indicators for all program area (80-100%).',
        },
      },
      consistency: {
        variability: {
          score: 0,
          description: 0,
        },
        metadata_documentation_quality: {
          score: 5,
          description: 'Metadata is complete, well-documented, and well structured, with all necessary details clearly outlined.',
        },
        source_credibility: {
          score: 5,
          description: 'Source is highly reputable, peer-reviewed, and widely recognized; adheres to international standards.',
        },
        uniformity_of_data: {
          score: 5,
          description: 'Fully consistent data formats and reporting standards.',
        },
        uniformity_in_findings: {
          score: 5,
          description: 'Findings align well with compared source.',
        },
      },
    },
  },
];

export default temp;
