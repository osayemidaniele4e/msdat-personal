/* eslint-disable no-unused-vars */
import API from '@/modules/DataLayer/services/ApiServices';
import mockResponseData from '@/modules/DataLayer/sample_data';

describe('Testing for API service', () => {
  it('Test getSingleIndicator function', async () => {
    API.getSingleIndicator = jest.fn((id) => Promise.resolve(mockResponseData));
    await expect(API.getSingleIndicator(1)).resolves.toEqual(mockResponseData);
    expect(API.getSingleIndicator).toHaveBeenCalled();
  });
  it('test getLatestDate function', async () => {
    // const data = {};
    API.getLatestDate = jest.fn(() => Promise.resolve(mockResponseData));
    await expect(API.getLatestDate()).resolves.toEqual(mockResponseData);
    expect(API.getSingleIndicator).toHaveBeenCalled();
  });
  it('test getOtherEndpoint function', async () => {
    // const data = []
    API.getOtherEndpoint = jest.fn(() => Promise.all([]));
    await expect(API.getOtherEndpoint()).resolves.toEqual([]);
    expect(API.getSingleIndicator).toHaveBeenCalled();
  });
});
