
import { router } from 'expo-router';
import { deleteAuthInfo } from '../../authenticationStore/authStore';
import processLogout from '../logoutProcessor';

// Mock the deleteAuthInfo function
jest.mock('../../authenticationStore/authStore', () => ({
  deleteAuthInfo: jest.fn(),
}));

// Mock the router
jest.mock('expo-router', () => ({
  router: {
    replace: jest.fn(),
  },
}));

describe('processLogout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return true and navigate to / if deleteAuthInfo succeeds', async () => {
    (deleteAuthInfo as jest.Mock).mockResolvedValue(true);

    const result = await processLogout();
    expect(result).toBe(true);
    expect(router.replace).toHaveBeenCalledWith('/');
  });

  it('should return false if deleteAuthInfo fails', async () => {
    (deleteAuthInfo as jest.Mock).mockResolvedValue(false);

    const result = await processLogout();
    expect(result).toBe(false);
    expect(router.replace).not.toHaveBeenCalled();
  });
});
