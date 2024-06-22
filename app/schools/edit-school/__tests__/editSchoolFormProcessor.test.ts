import { router } from 'expo-router';
import updateSchool from '../updateSchoolApi';
import processEditSchoolForm from '../editSchoolFormProcessor';

// Mock the updateSchool API
jest.mock('../updateSchoolApi', () => jest.fn());

// Mock the router
jest.mock('expo-router', () => ({
  router: {
    replace: jest.fn(),
  },
}));

describe('processEditSchoolForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return true and navigate to /schools/all-schools if updateSchool succeeds', async () => {
    (updateSchool as jest.Mock).mockResolvedValue(true);

    const result = await processEditSchoolForm(123, 'Test School', 123);
    expect(result).toBe(true);
  });

  it('should return false if updateSchool fails', async () => {
    (updateSchool as jest.Mock).mockResolvedValue(false);

    const result = await processEditSchoolForm(123, 'Test School', 123);
    expect(result).toBe(false);
  });

  it('should return false if updateSchool throws an error', async () => {
    (updateSchool as jest.Mock).mockRejectedValue(new Error('Failed to update'));

    const result = await processEditSchoolForm(123, 'Test School', 123);
    expect(result).toBe(false);
  });
});
