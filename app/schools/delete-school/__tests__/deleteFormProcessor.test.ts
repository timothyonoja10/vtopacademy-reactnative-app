import { router } from 'expo-router';
import deleteSchool from '../deleteSchoolApi';
import processDeleteSchoolForm from '../deleteFormProcessor';

// Mock the deleteSchool API
jest.mock('../deleteSchoolApi', () => jest.fn());

// Mock the router
jest.mock('expo-router', () => ({
  router: {
    replace: jest.fn(),
  },
}));

describe('processDeleteSchoolForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return true and navigate to /schools/all-schools if deleteSchool succeeds', async () => {
    (deleteSchool as jest.Mock).mockResolvedValue(true);

    const result = await processDeleteSchoolForm(123);
    expect(result).toBe(true);
    expect(router.replace).toHaveBeenCalledWith('/schools/all-schools');
  });

  it('should return false if deleteSchool fails', async () => {
    (deleteSchool as jest.Mock).mockResolvedValue(false);

    const result = await processDeleteSchoolForm(123);
    expect(result).toBe(false);
    expect(router.replace).not.toHaveBeenCalled();
  });

  it('should return false if deleteSchool throws an error', async () => {
    (deleteSchool as jest.Mock).mockRejectedValue(new Error('Failed to delete'));

    const result = await processDeleteSchoolForm(123);
    expect(result).toBe(false);
    expect(router.replace).not.toHaveBeenCalled();
  });
});
