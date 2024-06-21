// fetchSchoolsFromApi.test.ts

import fetchMock from 'fetch-mock';
import fetchSchoolsFromApi from '../fetchSchoolsApi';
import { API_BASE_URL } from '@/constants/BaseUrl';

describe('fetchSchoolsFromApi', () => {
  
  const url = API_BASE_URL + 'schools';

  afterEach(() => {
    fetchMock.restore();
  });

  it('should return data when the API call is successful', async () => {
    const mockData = [{ id: 1, name: 'School 1' }, { id: 2, name: 'School 2' }];
    fetchMock.get(url, {
      status: 200,
      body: mockData,
    });

    const result = await fetchSchoolsFromApi();
    expect(result).toEqual(mockData);
  });

  it('should return an empty array when the API call fails', async () => {
    fetchMock.get(url, {
      status: 500,
    });

    const result = await fetchSchoolsFromApi();
    expect(result).toEqual([]);
  });

  it('should return an empty array when there is an exception', async () => {
    fetchMock.get(url, {
      throws: new Error('Network Error'),
    });

    const result = await fetchSchoolsFromApi();
    expect(result).toEqual([]);
  });
});
