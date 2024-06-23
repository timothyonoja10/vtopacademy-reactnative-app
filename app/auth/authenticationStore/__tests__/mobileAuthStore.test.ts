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
    it('should return true if accessToken is stored and not expired', async () => {
      (SecureStore.getItemAsync as jest.Mock).mockImplementation((key) => {
        if (key === 'accessToken') return Promise.resolve('some-token');
        if (key === 'expiryDay') return Promise.resolve((new Date().getDate()).toString());
        if (key === 'expiryMonth') return Promise.resolve((new Date().getMonth() + 1).toString());
        if (key === 'expiryYear') return Promise.resolve((new Date().getFullYear()).toString());
        if (key === 'expiryHour') return Promise.resolve((new Date().getHours() + 1).toString()); // Set to 1 hour later
        if (key === 'expiryMinute') return Promise.resolve((new Date().getMinutes()).toString());
        return Promise.resolve(null);
      });

      const result = await storage.hasAccessToken();
      expect(result).toBe(true);
    });

    it('should return false if accessToken is stored but expired', async () => {
      (SecureStore.getItemAsync as jest.Mock).mockImplementation((key) => {
        if (key === 'accessToken') return Promise.resolve('some-token');
        if (key === 'expiryDay') return Promise.resolve((new Date().getDate() - 1).toString());
        if (key === 'expiryMonth') return Promise.resolve((new Date().getMonth() + 1).toString());
        if (key === 'expiryYear') return Promise.resolve((new Date().getFullYear()).toString());
        if (key === 'expiryHour') return Promise.resolve((new Date().getHours()).toString());
        if (key === 'expiryMinute') return Promise.resolve((new Date().getMinutes()).toString());
        return Promise.resolve(null);
      });

      const result = await storage.hasAccessToken();
      expect(result).toBe(false);
    });

    it('should return false if accessToken is not stored', async () => {
      (SecureStore.getItemAsync as jest.Mock).mockResolvedValue(null);

      const result = await storage.hasAccessToken();
      expect(result).toBe(false);
    });

    it('should return false if there is an error reading accessToken', async () => {
      (SecureStore.getItemAsync as jest.Mock).mockRejectedValue(new Error('Failed to read'));

      const result = await storage.hasAccessToken();
      expect(result).toBe(false);
    });
  });

  describe('getAccessToken', () => {
    it('should return the accessToken if it is stored and not expired', async () => {
      const mockToken = 'some-token';
      (SecureStore.getItemAsync as jest.Mock).mockImplementation((key) => {
        if (key === 'accessToken') return Promise.resolve(mockToken);
        if (key === 'expiryDay') return Promise.resolve((new Date().getDate()).toString());
        if (key === 'expiryMonth') return Promise.resolve((new Date().getMonth() + 1).toString());
        if (key === 'expiryYear') return Promise.resolve((new Date().getFullYear()).toString());
        if (key === 'expiryHour') return Promise.resolve((new Date().getHours() + 1).toString()); // Set to 1 hour later
        if (key === 'expiryMinute') return Promise.resolve((new Date().getMinutes()).toString());
        return Promise.resolve(null);
      });

      const result = await storage.getAccessToken();
      expect(result).toBe(mockToken);
    });

    it('should return an empty string if accessToken is not stored', async () => {
      (SecureStore.getItemAsync as jest.Mock).mockResolvedValue(null);

      const result = await storage.getAccessToken();
      expect(result).toBe('');
    });

    it('should return an empty string if accessToken is expired', async () => {
      (SecureStore.getItemAsync as jest.Mock).mockImplementation((key) => {
        if (key === 'accessToken') return Promise.resolve('some-token');
        if (key === 'expiryDay') return Promise.resolve((new Date().getDate() - 1).toString());
        if (key === 'expiryMonth') return Promise.resolve((new Date().getMonth() + 1).toString());
        if (key === 'expiryYear') return Promise.resolve((new Date().getFullYear()).toString());
        if (key === 'expiryHour') return Promise.resolve((new Date().getHours()).toString());
        if (key === 'expiryMinute') return Promise.resolve((new Date().getMinutes()).toString());
        return Promise.resolve(null);
      });

      const result = await storage.getAccessToken();
      expect(result).toBe('');
    });

    it('should return an empty string if there is an error reading accessToken', async () => {
      (SecureStore.getItemAsync as jest.Mock).mockRejectedValue(new Error('Failed to read'));

      const result = await storage.getAccessToken();
      expect(result).toBe('');
    });
  });

  describe('saveAuthInfo', () => {
    it('should save accessToken, isAdmin, isUser, and expiry correctly', async () => {
      (SecureStore.setItemAsync as jest.Mock).mockResolvedValue(undefined);

      const result = await storage.saveAuthInfo('some-token', true, true, 30);
      expect(result).toBe(true);

      const currentDate = new Date();
      const expiryDate = new Date();
      expiryDate.setDate(currentDate.getDate() + 30);
    });

    it('should handle errors during saveAuthInfo', async () => {
      (SecureStore.setItemAsync as jest.Mock).mockRejectedValue(new Error('Failed to save'));

      const result = await storage.saveAuthInfo('some-token', true, true, 30);
      expect(result).toBe(false);
    });
  });

  describe('deleteAuthInfo', () => {
    it('should delete isAdmin, isUser, accessToken, and expiry correctly', async () => {
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
