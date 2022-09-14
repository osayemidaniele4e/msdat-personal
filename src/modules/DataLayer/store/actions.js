import DB from '../config/dexie';
import apiServices from '@/modules/DataLayer/services/ApiServices';

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
    const { data } = await apiServices.getLatestDate();
    localStorage.setItem('lastUpdateDate', data.date);
    await DB.delete();
    window.location.reload();
    Promise.resolve(true);
  },
};
