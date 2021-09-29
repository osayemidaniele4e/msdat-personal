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
    API.getLatestDate = jest.fn(() => Promise.resolve(mockResponseData));
    await expect(API.getLatestDate()).resolves.toEqual(mockResponseData);
    expect(API.getLatestDate).toHaveBeenCalled();
  });
  it('test getOtherEndpoint function', async () => {
    API.getOtherEndpoint = jest.fn(() => Promise.all([]));
    await expect(API.getOtherEndpoint()).resolves.toEqual([]);
    expect(API.getOtherEndpoint).toHaveBeenCalled();
  });
  it('test getMainData function', async () => {
    API.getMainData = jest.fn(() => Promise.resolve(mockResponseData));
    await expect(API.getMainData()).resolves.toEqual(mockResponseData);
    expect(API.getMainData).toHaveBeenCalled();
  });
  ///
  it('test getRequiredEndpoint function', async () => {
    API.getRequiredEndpoint = jest.fn(() => Promise.resolve([]));
    await expect(API.getRequiredEndpoint()).resolves.toEqual([]);
    expect(API.getRequiredEndpoint).toHaveBeenCalled();
  });
  it('test getUpdatedData function', async () => {
    API.getUpdatedData = jest.fn(() => Promise.resolve([]));
    await expect(API.getUpdatedData()).resolves.toEqual([]);
    expect(API.getUpdatedData).toHaveBeenCalled();
  });
});
