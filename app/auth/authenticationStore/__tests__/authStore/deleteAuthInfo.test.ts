import { isMobilePlatform } from "@/app/utilities";
import { deleteAuthInfo } from "../../authStore";
import MobileAuthStorage from "../../mobileAuthStore";
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

describe('deleteAuthInfo', () => {
  it('should delete auth info if platform is mobile', async () => {
    (isMobilePlatform as jest.Mock).mockReturnValue(true);
    const mockMobileAuthStorage = new MobileAuthStorage();
    (MobileAuthStorage as jest.Mock).mockImplementation(() => mockMobileAuthStorage);
    mockMobileAuthStorage.deleteAuthInfo = jest.fn().mockResolvedValue(true);

    const result = await deleteAuthInfo();
    expect(result).toBe(true);
    expect(mockMobileAuthStorage.deleteAuthInfo).toHaveBeenCalled();
  });

  it('should delete auth info if platform is web', async () => {
    (isMobilePlatform as jest.Mock).mockReturnValue(false);
    const mockWebAuthStorage = new WebAuthStorage();
    (WebAuthStorage as jest.Mock).mockImplementation(() => mockWebAuthStorage);
    mockWebAuthStorage.deleteAuthInfo = jest.fn().mockResolvedValue(true);

    const result = await deleteAuthInfo();
    expect(result).toBe(true);
    expect(mockWebAuthStorage.deleteAuthInfo).toHaveBeenCalled();
  });

  it('should return false if deleting auth info fails on mobile', async () => {
    (isMobilePlatform as jest.Mock).mockReturnValue(true);
    const mockMobileAuthStorage = new MobileAuthStorage();
    (MobileAuthStorage as jest.Mock).mockImplementation(() => mockMobileAuthStorage);
    mockMobileAuthStorage.deleteAuthInfo = jest.fn().mockResolvedValue(false);

    const result = await deleteAuthInfo();
    expect(result).toBe(false);
    expect(mockMobileAuthStorage.deleteAuthInfo).toHaveBeenCalled();
  });

  it('should return false if deleting auth info fails on web', async () => {
    (isMobilePlatform as jest.Mock).mockReturnValue(false);
    const mockWebAuthStorage = new WebAuthStorage();
    (WebAuthStorage as jest.Mock).mockImplementation(() => mockWebAuthStorage);
    mockWebAuthStorage.deleteAuthInfo = jest.fn().mockResolvedValue(false);

    const result = await deleteAuthInfo();
    expect(result).toBe(false);
    expect(mockWebAuthStorage.deleteAuthInfo).toHaveBeenCalled();
  });
});