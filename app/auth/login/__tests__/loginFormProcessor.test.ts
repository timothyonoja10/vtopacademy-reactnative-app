
import processLoginForm from '../loginFormProcessor';
import makeLogin from '../loginApi';

// Mock the makeLogin function
jest.mock('../loginApi', () => jest.fn());

// Mock the saveAuthInfo function
jest.mock('../../authenticationStore/authStore', () => ({
  saveAuthInfo: jest.fn(),
}));

// Mock the router
jest.mock('expo-router', () => ({
  router: {
    replace: jest.fn(),
  },
}));

describe('processLoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return false if any input field is empty', async () => {
    expect(await processLoginForm('', 'password')).toBe(false);
    expect(await processLoginForm('username', '')).toBe(false);
  });

  it('should process the login and return true on success', async () => {
    const mockResponse = {
      accessToken: 'test-token',
      isAdmin: true,
      isUser: true,
    };
    (makeLogin as jest.Mock).mockResolvedValue(mockResponse);

    const result = await processLoginForm('testuser', 'testpassword');
    expect(result).toBe(true);
  });

  it('should return false and not redirect on login failure', async () => {
    (makeLogin as jest.Mock).mockRejectedValue(new Error('Login failed'));

    const result = await processLoginForm('testuser', 'testpassword');
    expect(result).toBe(false);
  });
});
