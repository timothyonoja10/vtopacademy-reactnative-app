import { getAccessToken } from "@/app/auth/authenticationStore/authStore";
import getSchool from "../getSchoolApi";


// Mock the getAccessToken function
jest.mock('@/app/auth/authenticationStore/authStore', () => ({
  getAccessToken: jest.fn(),
}));

describe('getSchool', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
    console.log = jest.fn();  // Mock console.log to verify log messages
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });

  it('should return default school if access token is missing', async () => {
    (getAccessToken as jest.Mock).mockResolvedValue(null);

    const result = await getSchool(123);
    expect(result).toEqual({ schoolId: 0, name: '', number: 0 });
  });

  it('should return default school if fetch fails', async () => {
    (getAccessToken as jest.Mock).mockResolvedValue('fake-token');
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });

    const result = await getSchool(123);
    expect(result).toEqual({ schoolId: 0, name: '', number: 0 });
  });

  it('should return default school if fetch throws an error', async () => {
    (getAccessToken as jest.Mock).mockResolvedValue('fake-token');
    (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

    const result = await getSchool(123);
    expect(result).toEqual({ schoolId: 0, name: '', number: 0 });
  });

  it('should return the correct school data if fetch succeeds', async () => {
    const schoolData = { school: 123, name: 'Test School', number: 456 };
    (getAccessToken as jest.Mock).mockResolvedValue('fake-token');
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(schoolData),
    });

    const result = await getSchool(123);
    expect(result).toEqual({ schoolId: 123, name: 'Test School', number: 456 });
  });
});
