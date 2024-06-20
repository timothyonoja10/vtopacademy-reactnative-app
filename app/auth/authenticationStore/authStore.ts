
import WebAuthStorage from "./webAuthStore";
import MobileAuthStorage from "./mobileAuthStore";
import { isMobilePlatform } from "../../utilities";

export async function isAdmin(): Promise<boolean> {
  if (isMobilePlatform()) {
    const mobileAuthStorage = new MobileAuthStorage();
    return await mobileAuthStorage.isAdmin();
  } else {
    const webAuthStorage = new WebAuthStorage();
    return await webAuthStorage.isAdmin();
  }
}

export async function hasAccessToken(): Promise<boolean> {
  if (isMobilePlatform()) {
    const mobileAuthStorage = new MobileAuthStorage();
    return await mobileAuthStorage.hasAccessToken();
  } else {
    const webAuthStorage = new WebAuthStorage();
    return await webAuthStorage.hasAccessToken();
  }
}

export async function getAccessToken(): Promise<String> {
  if (isMobilePlatform()) {
    const mobileAuthStorage = new MobileAuthStorage();
    return await mobileAuthStorage.getAccessToken();
  } else {
    const webAuthStorage = new WebAuthStorage();
    return await webAuthStorage.getAccessToken();
  }
}

export async function saveAuthInfo(
  accessToken: string, isAdmin: boolean, isUser: boolean
): Promise<boolean> {
  if (isMobilePlatform()) {
    const mobileAuthStorage = new MobileAuthStorage();
    return await mobileAuthStorage.saveAuthInfo(accessToken, isAdmin, isUser);
  } else {
    const webAuthStorage = new WebAuthStorage();
    return await webAuthStorage.saveAuthInfo(accessToken, isAdmin, isUser);
  }
}

export async function deleteAuthInfo(): Promise<boolean> {
  if (isMobilePlatform()) {
    const mobileAuthStorage = new MobileAuthStorage();
    return await mobileAuthStorage.deleteAuthInfo();
  } else {
    const webAuthStorage = new WebAuthStorage();
    return await webAuthStorage.deleteAuthInfo();
  }
}