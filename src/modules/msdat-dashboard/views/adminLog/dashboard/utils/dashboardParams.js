export default {
  name: 'Dashboard Title',
  category: 'Dashboard Category',
  datasource: 'Default Datasource',
  indicator: 'Default Indicator',
  created: 'Date Created',
  updated: 'Last Updated',
};

// set last updated to previous week, to be corrected with database managed value
const day = new Date();
day.setDate(day.getDate() - 7);
export const existingDashboards = [
  {
    id: 1,
    name: 'Demographics',
    category: 'Population',
    datasource: 'NPC',
    indicator: 'Total Population',
    created: '12/7/2020',
    updated: day.toLocaleDateString(),
    link: 'https://msdat.fmohconnect.gov.ng/dashboard/Demographics',
  },
  {
    id: 2,
    name: 'Health Facility',
    category: 'Health Input',
    datasource: 'NHFS',
    indicator: 'Percentage of Primary Health Facilities with Injectables',
    created: '12/7/2020',
    updated: day.toLocaleDateString(),
    link: 'https://msdat.fmohconnect.gov.ng/dashboard/Health_Facility',
  },
  {
    id: 3,
    name: 'Health Service Access',
    category: 'Health Output',
    datasource: 'NHFS',
    indicator:
      'Percentage of health facilities offering STI services that had ciprofloxacin tab/cap',
    created: '12/7/2020',
    updated: day.toLocaleDateString(),
    link: 'https://msdat.fmohconnect.gov.ng/dashboard/Health_Service_Access',
  },
  {
    id: 4,
    name: 'Health Outcomes and Service Coverage',
    category: 'Health Outcomes',
    datasource: 'NHMIS-DHIS',
    indicator: 'Skilled attendance at delivery or birth',
    created: '12/7/2020',
    updated: day.toLocaleDateString(),
    link: 'https://msdat.fmohconnect.gov.ng/dashboard/Health_Outcomes_and_Service_Coverage',
  },
  {
    id: 5,
    name: 'Advanced Analytics',
    category: 'Other Dashboard',
    datasource: 'NHMIS',
    indicator: 'Skilled attendance at delivery or birth',
    created: '12/7/2020',
    updated: day.toLocaleDateString(),
    link: 'https://msdat.fmohconnect.gov.ng/dashboard/Advanced_Analytics',
  },
];
