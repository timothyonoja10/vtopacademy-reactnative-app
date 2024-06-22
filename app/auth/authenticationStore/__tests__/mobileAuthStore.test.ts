import * as SecureStore from 'expo-secure-store';
import MobileAuthStorage from '../mobileAuthStore';

// Mock the SecureStore functions
jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

describe('MobileAuthStorage', () => {
  const storage = new MobileAuthStorage();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('isAdmin', () => {
    it('should return true if isAdmin is stored', async () => {
      (SecureStore.getItemAsync as jest.Mock).mockResolvedValue('true');

      const result = await storage.isAdmin();
      expect(result).toBe(true);
    });

    it('should return false if isAdmin is not stored', async () => {
      (SecureStore.getItemAsync as jest.Mock).mockResolvedValue(null);

      const result = await storage.isAdmin();
      expect(result).toBe(false);
    });
  });

  describe('hasAccessToken', () => {
    it('should return true if accessToken is stored', async () => {
      (SecureStore.getItemAsync as jest.Mock).mockResolvedValue('some-token');

      const result = await storage.hasAccessToken();
      expect(result).toBe(true);
    });

    it('should return false if accessToken is not stored', async () => {
      (SecureStore.getItemAsync as jest.Mock).mockResolvedValue(null);

      const result = await storage.hasAccessToken();
      expect(result).toBe(false);
    });
  });

  describe('getAccessToken', () => {
    it('should return the accessToken if it is stored', async () => {
      const mockToken = 'some-token';
      (SecureStore.getItemAsync as jest.Mock).mockResolvedValue(mockToken);

      const result = await storage.getAccessToken();
      expect(result).toBe(mockToken);
    });

    it('should return an empty string if accessToken is not stored', async () => {
      (SecureStore.getItemAsync as jest.Mock).mockResolvedValue(null);

      const result = await storage.getAccessToken();
      expect(result).toBe('');
    });
  });

  describe('saveAuthInfo', () => {
    it('should save accessToken, isAdmin, and isUser correctly', async () => {
      (SecureStore.setItemAsync as jest.Mock).mockResolvedValue(undefined);

      const result = await storage.saveAuthInfo('some-token', true, true);
      expect(result).toBe(true);
    });

    it('should save accessToken and isAdmin correctly when isUser is false', async () => {
      (SecureStore.setItemAsync as jest.Mock).mockResolvedValue(undefined);

      const result = await storage.saveAuthInfo('some-token', true, false);
      expect(result).toBe(true);
    });

    it('should save accessToken and isUser correctly when isAdmin is false', async () => {
      (SecureStore.setItemAsync as jest.Mock).mockResolvedValue(undefined);

      const result = await storage.saveAuthInfo('some-token', false, true);
      expect(result).toBe(true);
    });

    it('should handle errors during saveAuthInfo', async () => {
      (SecureStore.setItemAsync as jest.Mock).mockRejectedValue(new Error('Failed to save'));

      const result = await storage.saveAuthInfo('some-token', true, true);
      expect(result).toBe(false);
    });
  });

  describe('deleteAuthInfo', () => {
    it('should delete isAdmin, isUser, and accessToken correctly', async () => {
      (SecureStore.deleteItemAsync as jest.Mock).mockResolvedValue(undefined);

      const result = await storage.deleteAuthInfo();
      expect(result).toBe(true);
    });

    it('should handle errors during deleteAuthInfo', async () => {
      (SecureStore.deleteItemAsync as jest.Mock).mockRejectedValue(new Error('Failed to delete'));

      const result = await storage.deleteAuthInfo();
      expect(result).toBe(false);
    });
  });
});
