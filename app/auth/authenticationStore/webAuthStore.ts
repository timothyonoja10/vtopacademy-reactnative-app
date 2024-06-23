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
      if (value === null) {
        return false;
      }
      const expiryDay = await AsyncStorage.getItem('expiryDay');
      const expiryMonth = await AsyncStorage.getItem('expiryMonth');
      const expiryYear = await AsyncStorage.getItem('expiryYear');
      const expiryHour = await AsyncStorage.getItem('expiryHour');
      const expiryMinute = await AsyncStorage.getItem('expiryMinute');

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
        const value = await AsyncStorage.getItem('accessToken');
        if (value !== null) {
          return value;
        }
        return '';
      } catch (e) {
        // error reading value
        return '';
      }
    } else {
      return '';
    }
  }

  async saveAuthInfo(
    accessToken: string, isAdmin: boolean, isUser: boolean, expiryInDays: number
  ): Promise<boolean> {
    try {
      if (isAdmin) {
        await AsyncStorage.setItem('isAdmin', 'true');
      }
      if (isUser) {
        await AsyncStorage.setItem('isUser', 'true');
      }
      await AsyncStorage.setItem('accessToken', accessToken);

      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + expiryInDays);

      await AsyncStorage.setItem('expiryDay', expiryDate.getDate().toString());
      // Month is zero-based in JavaScript Date
      await AsyncStorage.setItem('expiryMonth', (expiryDate.getMonth() + 1).toString()); 
      await AsyncStorage.setItem('expiryYear', expiryDate.getFullYear().toString());
      await AsyncStorage.setItem('expiryHour', expiryDate.getHours().toString());
      await AsyncStorage.setItem('expiryMinute', expiryDate.getMinutes().toString());

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
      await AsyncStorage.removeItem('expiryDay');
      await AsyncStorage.removeItem('expiryMonth');
      await AsyncStorage.removeItem('expiryYear');
      await AsyncStorage.removeItem('expiryHour');
      await AsyncStorage.removeItem('expiryMinute');
      return true;
    } catch (e) {
      // error removing value
      return false;
    }
  }
}
