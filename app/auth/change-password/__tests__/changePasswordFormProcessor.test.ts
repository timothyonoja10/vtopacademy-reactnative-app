
import processChangePasswordForm from '../changePasswordFormProcessor';
import changePassword from '../changePasswordApi';

// Mock the changePassword function
jest.mock('../changePasswordApi', () => jest.fn());

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

describe('processChangePasswordForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return false if any input field is empty', async () => {
    expect(await processChangePasswordForm('', 'newpassword123', 'code123')).toBe(false);
    expect(await processChangePasswordForm('testuser', '', 'code123')).toBe(false);
    expect(await processChangePasswordForm('testuser', 'newpassword123', '')).toBe(false);
  });

  it('should process the password change and return true on success', async () => {
    const mockResponse = {
      accessToken: 'test-token',
      isAdmin: true,
      isUser: true,
    };
    (changePassword as jest.Mock).mockResolvedValue(mockResponse);

    const result = await processChangePasswordForm('testuser', 'newpassword123', 'code123');
    expect(result).toBe(true);
  });

  it('should return false and not redirect on password change failure', async () => {
    (changePassword as jest.Mock).mockRejectedValue(new Error('Change password failed'));

    const result = await processChangePasswordForm('testuser', 'newpassword123', 'code123');
    expect(result).toBe(false);
  });
});
