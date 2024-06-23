import * as SecureStore from 'expo-secure-store';

export default class MobileAuthStorage {

  async isAdmin(): Promise<boolean> {
    let result = await SecureStore.getItemAsync('isAdmin');
    return result !== null;
  }

  async hasAccessToken(): Promise<boolean> {
    try {
      const accessToken = await SecureStore.getItemAsync('accessToken');
      if (accessToken === null) {
        return false;
      }
      const expiryDay = await SecureStore.getItemAsync('expiryDay');
      const expiryMonth = await SecureStore.getItemAsync('expiryMonth');
      const expiryYear = await SecureStore.getItemAsync('expiryYear');
      const expiryHour = await SecureStore.getItemAsync('expiryHour');
      const expiryMinute = await SecureStore.getItemAsync('expiryMinute');

      if (expiryDay && expiryMonth && expiryYear && expiryHour && expiryMinute) {
        const expiryDate = new Date(
          parseInt(expiryYear),
          parseInt(expiryMonth) - 1, // Month is zero-based in JavaScript Date
          parseInt(expiryDay),
          parseInt(expiryHour),
          parseInt(expiryMinute)
        );

        if (new Date() < expiryDate) {
          return true;
        } else {
          await this.deleteAuthInfo();
          return false;
        }
      }
      return false;
    } catch (e) {
      // error reading value
    }
    return false;
  }

  async getAccessToken(): Promise<string> {
    if (await this.hasAccessToken()) {
      try {
        const result = await SecureStore.getItemAsync('accessToken');
        return result ?? '';
      } catch (e) {
        // error reading value
        return '';
      }
    } else {
      return '';
    }
  }

  async saveAuthInfo(accessToken: string, isAdmin: boolean, isUser: boolean, expiryInDays: number): Promise<boolean> {
    try {
      await SecureStore.setItemAsync('accessToken', accessToken);
      if (isAdmin) {
        await SecureStore.setItemAsync('isAdmin', 'true');
      }
      if (isUser) {
        await SecureStore.setItemAsync('isUser', 'true');
      }

      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + expiryInDays);

      await SecureStore.setItemAsync('expiryDay', expiryDate.getDate().toString());
      await SecureStore.setItemAsync('expiryMonth', (expiryDate.getMonth() + 1).toString()); // Month is zero-based in JavaScript Date
      await SecureStore.setItemAsync('expiryYear', expiryDate.getFullYear().toString());
      await SecureStore.setItemAsync('expiryHour', expiryDate.getHours().toString());
      await SecureStore.setItemAsync('expiryMinute', expiryDate.getMinutes().toString());

      return true;
    } catch (error) {
      return false;
    }
  }

  async deleteAuthInfo(): Promise<boolean> {
    try {
      await SecureStore.deleteItemAsync('isAdmin');
      await SecureStore.deleteItemAsync('isUser');
      await SecureStore.deleteItemAsync('accessToken');
      await SecureStore.deleteItemAsync('expiryDay');
      await SecureStore.deleteItemAsync('expiryMonth');
      await SecureStore.deleteItemAsync('expiryYear');
      await SecureStore.deleteItemAsync('expiryHour');
      await SecureStore.deleteItemAsync('expiryMinute');
      return true;
    } catch (error) {
      return false;
    }
  }
}
