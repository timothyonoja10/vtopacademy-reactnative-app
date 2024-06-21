// fetchSchoolsFromApi.test.ts

import fetchMock from 'fetch-mock';
import fetchSchoolsFromApi from '../fetchSchoolsApi';

describe('fetchSchoolsFromApi', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('should return data when the API call is successful', async () => {
    const mockData = [{ id: 1, name: 'School 1' }, { id: 2, name: 'School 2' }];
    fetchMock.get('http://ec2-54-205-235-247.compute-1.amazonaws.com:3000/api/schools', {
      status: 200,
      body: mockData,
    });

    const result = await fetchSchoolsFromApi();
    expect(result).toEqual(mockData);
  });

  it('should return an empty array when the API call fails', async () => {
    fetchMock.get('http://ec2-54-205-235-247.compute-1.amazonaws.com:3000/api/schools', {
      status: 500,
    });

    const result = await fetchSchoolsFromApi();
    expect(result).toEqual([]);
  });

  it('should return an empty array when there is an exception', async () => {
    fetchMock.get('http://ec2-54-205-235-247.compute-1.amazonaws.com:3000/api/schools', {
      throws: new Error('Network Error'),
    });

    const result = await fetchSchoolsFromApi();
    expect(result).toEqual([]);
  });
});
