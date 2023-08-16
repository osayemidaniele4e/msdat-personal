import DataBase from './../../../src/modules/data-layer/services/database.worker'; // Import the DataBase class
import dexie from "./../../../src/modules/data-layer/config/dexie"; // Import dexie or mock it if needed

describe('DataBase Initialization', () => {
  let database;

  beforeAll(() => {
    // Mocking dexie table methods for the test
    dexie.table = jest.fn((tableName) => ({
      orderBy: jest.fn(() => ({
        uniqueKeys: jest.fn(),
        toArray: jest.fn(),
      })),
    }));

    // Initialize the database instance
    database = new DataBase();
  });

  it('should create an instance of the DataBase class', () => {
    expect(database).toBeInstanceOf(DataBase);
  });

  it('should initialize the db property correctly', () => {
    expect(database.db).toEqual(dexie);
  });

  it('should initialize the data property correctly', () => {
    expect(database.data).toBeDefined();
  });

  it('should initialize the indicators property correctly', () => {
    expect(database.indicators).toBeDefined();
  });

  it('should initialize the location property correctly', () => {
    expect(database.location).toBeDefined();
  });

});