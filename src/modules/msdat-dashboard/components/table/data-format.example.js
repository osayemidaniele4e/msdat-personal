export default [
  {
    indicators: { id: 7, name: 'Skilled Birth Attendance 1' },
    values: [
      {
        dataSources: { id: 7, datasources: 'NHMIS' },
        value: '20',
        factor: '%',
        year: 2020,
        classification: 'Routine',
      },
      {
        dataSources: { id: 7, datasource: 'NDHS' },
        value: '20',
        factor: '%',
        year: 2020,
        classification: 'Routine',
      },
      {
        dataSources: { id: 7, datasource: 'MICS' },
        value: '20',
        factor: '%',
        year: 2020,
        classification: 'Survey',
      },
      {
        dataSources: { id: 7, datasource: 'NARHS' },
        value: '20',
        factor: '%',
        year: 2020,
        classification: 'Estimates',
      },
      {
        dataSources: { id: 7, datasource: 'NHMIS' },
        value: '20',
        factor: '%',
        year: 2020,
        classification: 'Survey',
      },
      {
        dataSources: { id: 7, datasource: 'IHME' },
        value: '30',
        factor: '%',
        year: 2020,
        classification: 'Estimates',
      },
    ],
  },
  {
    indicators: 'Skilled Birth Attendance 2',
    values: [
      {
        dataSources: 'NHMIS',
        value: '20',
        factor: '%',
        year: 2020,
        classification: 'Routine',
      },
      {
        dataSources: 'NDHS',
        value: '20',
        factor: '%',
        year: 2020,
        classification: 'Routine',
      },
      {
        dataSources: 'NARHS',
        value: '20',
        factor: '%',
        year: 2020,
        classification: 'Estimates',
      },
    ],
  },
  {
    indicators: 'Skilled Birth Attendance 3',
    values: [
      {
        dataSources: 'IHME SDG',
        value: '200',
        factor: '%',
        year: 2020,
        classification: 'Routine',
      },
    ],
  },
];
