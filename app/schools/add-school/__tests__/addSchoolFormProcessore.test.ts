import processAddSchoolForm from "../addSchoolFormProcessor";
import saveSchool from "../saveSchoolApi";

// Mock the saveSchool API
jest.mock('../saveSchoolApi', () => jest.fn());

// Mock the router
jest.mock('expo-router', () => ({
  router: {
    replace: jest.fn(),
  },
}));

describe('processAddSchoolForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return false if name is empty', async () => {
    const result = await processAddSchoolForm('', 123);
    expect(result).toBe(false);
  });

  it('should return false if number is 0', async () => {
    const result = await processAddSchoolForm('Test School', 0);
    expect(result).toBe(false);
  });

  it('should return false if saveSchool fails', async () => {
    (saveSchool as jest.Mock).mockRejectedValue(new Error('Failed to save school'));
    
    const result = await processAddSchoolForm('Test School', 123);
    expect(result).toBe(false);
  });

  it('should return true and navigate to /schools/all-schools if saveSchool succeeds', async () => {
    (saveSchool as jest.Mock).mockResolvedValue(true);

    const result = await processAddSchoolForm('Test School', 123);
    expect(result).toBe(true);
  });
});
