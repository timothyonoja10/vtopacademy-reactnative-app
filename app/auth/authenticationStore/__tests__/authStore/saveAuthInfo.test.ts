import { isMobilePlatform } from "@/app/utilities";
import MobileAuthStorage from "../../mobileAuthStore";
import { saveAuthInfo } from "../../authStore";
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

describe('saveAuthInfo', () => {
  it('should save auth info if platform is mobile', async () => {
    (isMobilePlatform as jest.Mock).mockReturnValue(true);
    const mockMobileAuthStorage = new MobileAuthStorage();
    (MobileAuthStorage as jest.Mock).mockImplementation(() => mockMobileAuthStorage);
    mockMobileAuthStorage.saveAuthInfo = jest.fn().mockResolvedValue(true);

    const result = await saveAuthInfo('test-token', true, true);
    expect(result).toBe(true);
    expect(mockMobileAuthStorage.saveAuthInfo).toHaveBeenCalledWith('test-token', true, true);
  });

  it('should save auth info if platform is web', async () => {
    (isMobilePlatform as jest.Mock).mockReturnValue(false);
    const mockWebAuthStorage = new WebAuthStorage();
    (WebAuthStorage as jest.Mock).mockImplementation(() => mockWebAuthStorage);
    mockWebAuthStorage.saveAuthInfo = jest.fn().mockResolvedValue(true);

    const result = await saveAuthInfo('test-token', true, true);
    expect(result).toBe(true);
    expect(mockWebAuthStorage.saveAuthInfo).toHaveBeenCalledWith('test-token', true, true);
  });

  it('should return false if saving auth info fails on mobile', async () => {
    (isMobilePlatform as jest.Mock).mockReturnValue(true);
    const mockMobileAuthStorage = new MobileAuthStorage();
    (MobileAuthStorage as jest.Mock).mockImplementation(() => mockMobileAuthStorage);
    mockMobileAuthStorage.saveAuthInfo = jest.fn().mockResolvedValue(false);

    const result = await saveAuthInfo('test-token', true, true);
    expect(result).toBe(false);
    expect(mockMobileAuthStorage.saveAuthInfo).toHaveBeenCalledWith('test-token', true, true);
  });

  it('should return false if saving auth info fails on web', async () => {
    (isMobilePlatform as jest.Mock).mockReturnValue(false);
    const mockWebAuthStorage = new WebAuthStorage();
    (WebAuthStorage as jest.Mock).mockImplementation(() => mockWebAuthStorage);
    mockWebAuthStorage.saveAuthInfo = jest.fn().mockResolvedValue(false);

    const result = await saveAuthInfo('test-token', true, true);
    expect(result).toBe(false);
    expect(mockWebAuthStorage.saveAuthInfo).toHaveBeenCalledWith('test-token', true, true);
  });
});