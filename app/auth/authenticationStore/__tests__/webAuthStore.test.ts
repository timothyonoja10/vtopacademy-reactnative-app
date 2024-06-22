import AsyncStorage from "@react-native-async-storage/async-storage";
import WebAuthStorage from "../webAuthStore";

// Mock the AsyncStorage functions
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe('WebAuthStorage', () => {
  const storage = new WebAuthStorage();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('isAdmin', () => {
    it('should return true if isAdmin is stored', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue('true');

      const result = await storage.isAdmin();
      expect(result).toBe(true);
    });

    it('should return false if isAdmin is not stored', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

      const result = await storage.isAdmin();
      expect(result).toBe(false);
    });

    it('should return false if there is an error reading isAdmin', async () => {
      (AsyncStorage.getItem as jest.Mock).mockRejectedValue(new Error('Failed to read'));

      const result = await storage.isAdmin();
      expect(result).toBe(false);
    });
  });

  describe('hasAccessToken', () => {
    it('should return true if accessToken is stored', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue('some-token');

      const result = await storage.hasAccessToken();
      expect(result).toBe(true);
    });

    it('should return false if accessToken is not stored', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

      const result = await storage.hasAccessToken();
      expect(result).toBe(false);
    });

    it('should return false if there is an error reading accessToken', async () => {
      (AsyncStorage.getItem as jest.Mock).mockRejectedValue(new Error('Failed to read'));

      const result = await storage.hasAccessToken();
      expect(result).toBe(false);
    });
  });

  describe('getAccessToken', () => {
    it('should return the accessToken if it is stored', async () => {
      const mockToken = 'some-token';
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(mockToken);

      const result = await storage.getAccessToken();
      expect(result).toBe(mockToken);
    });

    it('should return an empty string if accessToken is not stored', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

      const result = await storage.getAccessToken();
      expect(result).toBe('');
    });

    it('should return an empty string if there is an error reading accessToken', async () => {
      (AsyncStorage.getItem as jest.Mock).mockRejectedValue(new Error('Failed to read'));

      const result = await storage.getAccessToken();
      expect(result).toBe('');
    });
  });

  describe('saveAuthInfo', () => {
    it('should save accessToken, isAdmin, and isUser correctly', async () => {
      (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);

      const result = await storage.saveAuthInfo('some-token', true, true);
      expect(result).toBe(true);
    });

    it('should handle errors during saveAuthInfo', async () => {
      (AsyncStorage.setItem as jest.Mock).mockRejectedValue(new Error('Failed to save'));

      const result = await storage.saveAuthInfo('some-token', true, true);
      expect(result).toBe(false);
    });
  });

  describe('deleteAuthInfo', () => {
    it('should delete isAdmin, isUser, and accessToken correctly', async () => {
      (AsyncStorage.removeItem as jest.Mock).mockResolvedValue(undefined);

      const result = await storage.deleteAuthInfo();
      expect(result).toBe(true);
    });

    it('should handle errors during deleteAuthInfo', async () => {
      (AsyncStorage.removeItem as jest.Mock).mockRejectedValue(new Error('Failed to delete'));

      const result = await storage.deleteAuthInfo();
      expect(result).toBe(false);
    });
  });
});