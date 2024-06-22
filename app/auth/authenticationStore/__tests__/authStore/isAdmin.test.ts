import { isMobilePlatform } from "@/app/utilities";
import MobileAuthStorage from "../../mobileAuthStore";
import WebAuthStorage from "../../webAuthStore";
import { isAdmin } from "../../authStore";


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

describe('isAdmin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
      
  it('should return true if platform is mobile and user is admin', async () => {
    (isMobilePlatform as jest.Mock).mockReturnValue(true);
    const mockMobileAuthStorage = new MobileAuthStorage();
    (MobileAuthStorage as jest.Mock).mockImplementation(() => mockMobileAuthStorage);
    mockMobileAuthStorage.isAdmin = jest.fn().mockResolvedValue(true);

    const result = await isAdmin();
    expect(result).toBe(true);
  });

  it('should return false if platform is mobile and user is not admin', async () => {
    (isMobilePlatform as jest.Mock).mockReturnValue(true);
    const mockMobileAuthStorage = new MobileAuthStorage();
    (MobileAuthStorage as jest.Mock).mockImplementation(() => mockMobileAuthStorage);
    mockMobileAuthStorage.isAdmin = jest.fn().mockResolvedValue(false);

    const result = await isAdmin();
    expect(result).toBe(false);
  });

  it('should return true if platform is web and user is admin', async () => {
    (isMobilePlatform as jest.Mock).mockReturnValue(false);
    const mockWebAuthStorage = new WebAuthStorage();
    (WebAuthStorage as jest.Mock).mockImplementation(() => mockWebAuthStorage);
    mockWebAuthStorage.isAdmin = jest.fn().mockResolvedValue(true);

    const result = await isAdmin();
    expect(result).toBe(true);
  });

  it('should return false if platform is web and user is not admin', async () => {
    (isMobilePlatform as jest.Mock).mockReturnValue(false);
    const mockWebAuthStorage = new WebAuthStorage();
    (WebAuthStorage as jest.Mock).mockImplementation(() => mockWebAuthStorage);
    mockWebAuthStorage.isAdmin = jest.fn().mockResolvedValue(false);

    const result = await isAdmin();
    expect(result).toBe(false);
  });
});