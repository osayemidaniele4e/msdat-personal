import Dexie from 'dexie';

const db = new Dexie('msdat-database3');

db.version(1).stores({
  datasources:
    '&id,datasource,full_name,description, year_available, period_available, methodology,subnational_data, classification, created_at, updated_at',
  countries: 'id, country, created_at, updated_at',
  indicators:
    '&id, full_name, short_name, desirable_slope, indicator_type, program_area, national_target, national_source, national_information, sdg_target, sdg_information, first_related, second_related, third_related, fourth_related, created_at, updated_at, factor',
  location: '&id, name, parent, created_at, updated_at, level',
  valuetypes: 'id, value_type, created_at, updated_at',
  factors: '&id, multiplier_factor, display_factor, created_at, updated_at',
  datasource_specific_indicator:
    '++id, datasource_indicator, measurement_numerator, measurement_denominator, frequency, methodology_estimation, indicator_definition, data_level, national,  zonal, state, senatorial, lga, created_at, updated_at, datasource, indicator',
  links: '&id, period, link, created_at, updated_at, datasource, indicator',
  data:
    '&id, value, period, indicator,  datasource, value_type, location, created_at, updated_at, [value+period+indicator+datasource+value_type+location],[indicator+datasource],[indicator+datasource+location],[indicator+period]',
  location_hierarchy_level: 'id, name, created_at, updated_at',
  stateNumDen: '++id',
  lgaNumDen: '++id',
  users: '++id, user_id, name, email, profession, organization, username, password',
  sub_dashboard_interests: '++id, email, dashboard, created',
  transactions: '++id',
});

export default db;
