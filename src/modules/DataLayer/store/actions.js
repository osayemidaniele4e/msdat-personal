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
    const lastDate = '2022-04-20T11:54:13.824Z';
    if (lastDate) {
      const lastDateMoment = moment(lastDate);
      const now = moment();
      const diff = now.diff(lastDateMoment, 'days');
      console.log('diff', diff, '2');
      if (diff > 7) {
        console.log('diff', diff);
        //     await DB.clear();
        //     console.log('Database cleared');
        //     localStorage.setItem('dataTimestamp', moment().format());
        //     Promise.resolve(true);
      }
    }
    Promise.resolve(false);
  },
};
