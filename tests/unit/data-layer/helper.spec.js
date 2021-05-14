import { formatDate } from '@/modules/DataLayer/services/helper';

describe('formatDate', () => {
  it('check Data formatDate return proper format', () => {
    expect(formatDate('2021-05-11T15:35:35.984Z')).toEqual('2021-05-11 15:35:35');
  });
});
