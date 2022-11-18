import moment from 'moment';
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
  /**
   * Clear indexdb after 10 days from last data update
   */
  async CLEAR_DB() {
    localStorage.removeItem('defaultClear');
    localStorage.removeItem('lastUpdateDate');
    const newDate = moment().format();
    localStorage.setItem('lastUpdatedDate', newDate);
    await DB.delete();
    window.location.reload();
    Promise.resolve(true);
  },
};
