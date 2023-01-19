import apiServices from '@/modules/DataLayer/services/ApiServices';
import DB from '../config/dexie';

export default {
  /**
   *
   * Delete dexie database
   */
  async DELETE_DB() {
    // Since we've cleared the data, update the variable for the time prompt cache clear
    const { data } = await apiServices.getLatestDate();
    localStorage.setItem('lastUpdatedDate', data.results[0].updated_at);
    await DB.delete();
    Promise.resolve(true);
  },
  /**
   * Clear indexdb after 10 days from last data update
   */
  async CLEAR_DB() {
    localStorage.removeItem('defaultClear');
    const { data } = await apiServices.getLatestDate();
    localStorage.setItem('lastUpdatedDate', data.results[0].updated_at);
    await DB.delete();
    window.location.reload();
    Promise.resolve(true);
  },
};
