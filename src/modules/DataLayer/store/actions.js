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
    const lastDate = localStorage.getItem('dataTimestamp');
    if (lastDate) {
      const lastDateMoment = moment(lastDate);
      const now = moment();
      const diff = now.diff(lastDateMoment, 'days');
      // eslint-disable-next-line no-restricted-globals
      if (diff === 10 && confirm('Data is older than 10 days. Clear data?')) {
        localStorage.setItem('dataTimestamp', moment().format());
        localStorage.removeItem('defaultClear');
        await DB.delete();
        window.location.reload();
        Promise.resolve(true);
      }
    }
    Promise.resolve(false);
  },
};
