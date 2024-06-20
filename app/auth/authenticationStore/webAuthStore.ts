import AsyncStorage from "@react-native-async-storage/async-storage";

export default class WebAuthStorage {
  
  async isAdmin(): Promise<boolean> {
    try {
      const value = await AsyncStorage.getItem('isAdmin');
      if (value !== null) {
        return true;
      }
    } catch (e) {
      // error reading value
    }
    return false;
  }

  async hasAccessToken(): Promise<boolean> {
    try {
      const value = await AsyncStorage.getItem('accessToken');
      if (value !== null) {
        return true;
      }
    } catch (e) {
      // error reading value
    }
    return false;
  }

  async getAccessToken(): Promise<string> {
    try {
      const value = await AsyncStorage.getItem('accessToken');
      if (value !== null) {
        return value;
      }
      return '';
    } catch (e) {
      // error reading value
      return '';
    }
  }

  async saveAuthInfo(accessToken: string, isAdmin: boolean, isUser: boolean): Promise<boolean> {
    try {
      if (isAdmin) {
        await AsyncStorage.setItem('isAdmin', 'true');
      }
      if (isUser) {
        await AsyncStorage.setItem('isUser', 'true');
      }
      await AsyncStorage.setItem('accessToken', accessToken);
      return true;
    } catch (e) {
      // error saving value
      return false;
    }
  }

  async deleteAuthInfo(): Promise<boolean> {
    try {
      await AsyncStorage.removeItem('isAdmin');
      await AsyncStorage.removeItem('isUser');
      await AsyncStorage.removeItem('accessToken');
      return true;
    } catch (e) {
      // error removing value
      return false;
    }
  }
}