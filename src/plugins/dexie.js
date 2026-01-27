import Dexie from 'dexie';

const db = new Dexie('my-database-testing');

db.version(1).stores({
  datasources: 'id,datasource,full_name,description,methodology,period_available,subnational_data,updated_at,year_available',
  indicators: '++id',
});

export default db;
