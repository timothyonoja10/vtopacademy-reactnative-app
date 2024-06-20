import * as SecureStore from 'expo-secure-store';

export default class MobileAuthStorage {

  async isAdmin(): Promise<boolean> {
    let result = await SecureStore.getItemAsync('isAdmin');
    if (result) {
      return true;
    } else {
      return false;
    }
  }

  async hasAccessToken(): Promise<boolean> {
    let result = await SecureStore.getItemAsync('accessToken');
    if (result) {
      return true;
    } else {
      return false;
    }
  }

  async getAccessToken(): Promise<string> {
    let result = await SecureStore.getItemAsync('accessToken');
    if (result) {
      return result;
    } else {
      return '';
    }
  }

  async saveAuthInfo(
    accessToken: string, isAdmin: boolean, isUser: boolean
  ): Promise<boolean> {
    await SecureStore.setItemAsync('accessToken', accessToken);
    if (isAdmin) {
      await SecureStore.setItemAsync('isAdmin', 'true');
    }
    if (isUser) {
      await SecureStore.setItemAsync('isUser', 'true');
    }
    return true;
  }

  async deleteAuthInfo(): Promise<boolean> {
    await SecureStore.deleteItemAsync('isAdmin');
    await SecureStore.deleteItemAsync('isUser');
    await SecureStore.deleteItemAsync('accessToken');
    return true;
  }
}