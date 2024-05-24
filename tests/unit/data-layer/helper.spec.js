import axios from 'axios';
import apiEndpoints from '@/modules/data-layer/config/endpoint';
import mockResponseData from '@/modules/data-layer/sample_data';

import { formatDate, getIndicatorsFromApi } from '@/modules/data-layer/services/helper';

jest.mock('axios', () => ({
  create: jest.fn().mockReturnThis(),
  get: jest.fn(),
}));

describe('formatDate', () => {
  it('returns proper format for date string', () => {
    expect(formatDate('2021-05-11')).toEqual('2021-05-11');
  });

  it('returns proper format for time string', () => {
    expect(formatDate('T15:35:35.984Z')).toEqual('15:35:35');
  });

  it('returns proper format for datetime string', () => {
    expect(formatDate('2021-05-11T15:35:35.984Z')).toEqual('2021-05-11 15:35:35');
  });
});

describe('getIndicatorsFromApi', () => {
  it('makes necessary api call', async () => {
    axios.get.mockResolvedValueOnce(mockResponseData);
    const result = await getIndicatorsFromApi(1);
    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(`${apiEndpoints.getData}?indicator=1`);
    expect(result).toEqual(mockResponseData);
  });

  it('returns result array for an array of indicator ids', async () => {
    axios.get.mockResolvedValueOnce(mockResponseData);
    const result = await getIndicatorsFromApi([1, 2]);
    expect(Array.isArray(result)).toBe(true);
  });
});
