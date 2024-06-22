
import { router } from 'expo-router';
import processForgotPasswordForm from '../forgotPasswordFormProcessor';
import generateForgotPasswordCode from '../forgotPasswordApi';

// Mock the generateForgotPasswordCode function
jest.mock('../forgotPasswordApi', () => jest.fn());

// Mock the router
jest.mock('expo-router', () => ({
  router: {
    replace: jest.fn(),
  },
}));

describe('processForgotPasswordForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return false if username is empty', async () => {
    const result = await processForgotPasswordForm('');
    expect(result).toBe(false);
    expect(router.replace).not.toHaveBeenCalled();
  });

  it('should return true and navigate to change-password page if generateForgotPasswordCode succeeds', async () => {
    (generateForgotPasswordCode as jest.Mock).mockResolvedValue(true);

    const result = await processForgotPasswordForm('testuser');
    expect(result).toBe(true);
  });

  it('should return false if generateForgotPasswordCode fails', async () => {
    (generateForgotPasswordCode as jest.Mock).mockResolvedValue(false);

    const result = await processForgotPasswordForm('testuser');
    expect(result).toBe(false);
  });

  it('should return false if generateForgotPasswordCode throws an error', async () => {
    (generateForgotPasswordCode as jest.Mock).mockRejectedValue(new Error('Failed to generate code'));

    const result = await processForgotPasswordForm('testuser');
    expect(result).toBe(false);
  });
});
