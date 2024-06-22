import { getAccessToken } from "@/app/auth/authenticationStore/authStore";
import deleteSchool from "../deleteSchoolApi";

// Mock the getAccessToken function
jest.mock('@/app/auth/authenticationStore/authStore', () => ({
  getAccessToken: jest.fn(),
}));

describe('deleteSchool', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });

  it('should return false if schoolId is invalid', async () => {
    const result = await deleteSchool(0);
    expect(result).toBe(false);
  });

  it('should return false if access token is missing', async () => {
    (getAccessToken as jest.Mock).mockResolvedValue(null);

    const result = await deleteSchool(123);
    expect(result).toBe(false);
  });

  it('should return false if fetch fails', async () => {
    (getAccessToken as jest.Mock).mockResolvedValue('fake-token');
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      text: jest.fn().mockResolvedValue('Fetch failed'),
    });

    const result = await deleteSchool(123);
    expect(result).toBe(false);
  });

  it('should return true if fetch succeeds', async () => {
    (getAccessToken as jest.Mock).mockResolvedValue('fake-token');
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
    });

    const result = await deleteSchool(123);
    expect(result).toBe(true);
  });
});
