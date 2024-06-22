import { isMobilePlatform } from "@/app/utilities";
import MobileAuthStorage from "../../mobileAuthStore";
import { getAccessToken } from "../../authStore";
import WebAuthStorage from "../../webAuthStore";

// Mock dependencies
jest.mock('../../webAuthStore');
jest.mock('../../mobileAuthStore');
jest.mock('@/app/utilities', () => ({
  isMobilePlatform: jest.fn(),
}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn((key) => {
    return new Promise((resolve) => {
      resolve(key === 'isAdmin' ? 'true' : null);
    });
  }),
  setItem: jest.fn(() => {
    return new Promise((resolve) => {
      resolve(null);
    });
  }),
  removeItem: jest.fn(() => {
    return new Promise((resolve) => {
      resolve(null);
    });
  }),
  clear: jest.fn(() => {
    return new Promise((resolve) => {
      resolve(null);
    });
  }),
}));

describe('getAccessToken', () => {
    it('should return accessToken if platform is mobile and accessToken exists', async () => {
      (isMobilePlatform as jest.Mock).mockReturnValue(true);
      const mockMobileAuthStorage = new MobileAuthStorage();
      (MobileAuthStorage as jest.Mock).mockImplementation(() => mockMobileAuthStorage);
      mockMobileAuthStorage.getAccessToken = jest.fn().mockResolvedValue('test-token');

      const result = await getAccessToken();
      expect(result).toBe('test-token');
      expect(mockMobileAuthStorage.getAccessToken).toHaveBeenCalled();
    });

    it('should return empty string if platform is mobile and accessToken does not exist', async () => {
      (isMobilePlatform as jest.Mock).mockReturnValue(true);
      const mockMobileAuthStorage = new MobileAuthStorage();
      (MobileAuthStorage as jest.Mock).mockImplementation(() => mockMobileAuthStorage);
      mockMobileAuthStorage.getAccessToken = jest.fn().mockResolvedValue('');

      const result = await getAccessToken();
      expect(result).toBe('');
      expect(mockMobileAuthStorage.getAccessToken).toHaveBeenCalled();
    });

    it('should return accessToken if platform is web and accessToken exists', async () => {
      (isMobilePlatform as jest.Mock).mockReturnValue(false);
      const mockWebAuthStorage = new WebAuthStorage();
      (WebAuthStorage as jest.Mock).mockImplementation(() => mockWebAuthStorage);
      mockWebAuthStorage.getAccessToken = jest.fn().mockResolvedValue('test-token');

      const result = await getAccessToken();
      expect(result).toBe('test-token');
      expect(mockWebAuthStorage.getAccessToken).toHaveBeenCalled();
    });

    it('should return empty string if platform is web and accessToken does not exist', async () => {
      (isMobilePlatform as jest.Mock).mockReturnValue(false);
      const mockWebAuthStorage = new WebAuthStorage();
      (WebAuthStorage as jest.Mock).mockImplementation(() => mockWebAuthStorage);
      mockWebAuthStorage.getAccessToken = jest.fn().mockResolvedValue('');

      const result = await getAccessToken();
      expect(result).toBe('');
      expect(mockWebAuthStorage.getAccessToken).toHaveBeenCalled();
    });
  });