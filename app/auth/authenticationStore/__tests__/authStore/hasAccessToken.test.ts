import { isMobilePlatform } from "@/app/utilities";
import MobileAuthStorage from "../../mobileAuthStore";
import { hasAccessToken } from "../../authStore";
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

describe('hasAccessToken', () => {
  it('should return true if platform is mobile and accessToken exists', async () => {
    (isMobilePlatform as jest.Mock).mockReturnValue(true);
    const mockMobileAuthStorage = new MobileAuthStorage();
    (MobileAuthStorage as jest.Mock).mockImplementation(() => mockMobileAuthStorage);
    mockMobileAuthStorage.hasAccessToken = jest.fn().mockResolvedValue(true);

    const result = await hasAccessToken();
    expect(result).toBe(true);
  });

  it('should return false if platform is mobile and accessToken does not exist', async () => {
    (isMobilePlatform as jest.Mock).mockReturnValue(true);
    const mockMobileAuthStorage = new MobileAuthStorage();
    (MobileAuthStorage as jest.Mock).mockImplementation(() => mockMobileAuthStorage);
    mockMobileAuthStorage.hasAccessToken = jest.fn().mockResolvedValue(false);

    const result = await hasAccessToken();
    expect(result).toBe(false);
  });

  it('should return true if platform is web and accessToken exists', async () => {
    (isMobilePlatform as jest.Mock).mockReturnValue(false);
    const mockWebAuthStorage = new WebAuthStorage();
    (WebAuthStorage as jest.Mock).mockImplementation(() => mockWebAuthStorage);
    mockWebAuthStorage.hasAccessToken = jest.fn().mockResolvedValue(true);

    const result = await hasAccessToken();
    expect(result).toBe(true);
  });

  it('should return false if platform is web and accessToken does not exist', async () => {
    (isMobilePlatform as jest.Mock).mockReturnValue(false);
    const mockWebAuthStorage = new WebAuthStorage();
    (WebAuthStorage as jest.Mock).mockImplementation(() => mockWebAuthStorage);
    mockWebAuthStorage.hasAccessToken = jest.fn().mockResolvedValue(false);

    const result = await hasAccessToken();
    expect(result).toBe(false);
  });
});