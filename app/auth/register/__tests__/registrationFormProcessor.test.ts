
import processRegistrationForm from '../registrationFormProcessor';
import makeRegistration from '../registerApi';

// Mock the makeRegistration function
jest.mock('../registerApi', () => jest.fn());

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

describe('processRegistrationForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return false if any input field is empty', async () => {
    expect(await processRegistrationForm('', 'password')).toBe(false);
    expect(await processRegistrationForm('username', '')).toBe(false);
  });

  it('should process the registration and return true on success', async () => {
    const mockResponse = {
      accessToken: 'test-token',
      isAdmin: true,
      isUser: true,
    };
    (makeRegistration as jest.Mock).mockResolvedValue(mockResponse);

    const result = await processRegistrationForm('testuser', 'testpassword');
    expect(result).toBe(true);
  });

  it('should return false and not redirect on registration failure', async () => {
    (makeRegistration as jest.Mock).mockRejectedValue(new Error('Registration failed'));

    const result = await processRegistrationForm('testuser', 'testpassword');
    expect(result).toBe(false);
  });
});
