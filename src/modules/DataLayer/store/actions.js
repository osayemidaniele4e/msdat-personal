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
  // clear all data in dexie database after 1week from value
  async CLEAR_DB() {
    // const lastDate = localStorage.getItem('dataTimestamp');
    const cleared = localStorage.getItem('defaultClear');
    const lastDate = '2022-06-20T07:00:00.824Z';
    if (lastDate) {
      const lastDateMoment = moment(lastDate);
      const now = moment();
      const diff = now.diff(lastDateMoment, 'days');
      console.log(diff);
      if (diff > 2 && (cleared === false || cleared === null)) {
        alert('DATA CLEARING SEQUENCE STARTED, please click okay to continue');
        localStorage.setItem('dataTimestamp', moment().format());
        localStorage.setItem('defaultClear', true);
        await DB.delete();
        window.location.reload();
        Promise.resolve(true);
      }
    }
    Promise.resolve(false);
  },
};
