import DB from '../config/dexie';

export default {
  /**
   *
   * Delete dexie database
   */
  async DELETE_DB() {
    await DB.delete();
    console.log('Database deleted');
    Promise.resolve(true);
  },
};
