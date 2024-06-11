import AsyncStorage from "@react-native-async-storage/async-storage";

export async function isAdmin(): Promise<boolean> {
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

export async function hasAccessToken(): Promise<boolean> {
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

export async function getAccessToken(): Promise<String> {
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
export async function saveAuthInfo(
  accessToken: string, isAdmin: boolean, isUser: boolean
): Promise<boolean> {
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
    // error reading value
    return false;
  }
}

export async function deleteAuthInfo(): Promise<boolean> {
  try {
    await AsyncStorage.removeItem('isAdmin');
    await AsyncStorage.removeItem('isUser');
    await AsyncStorage.removeItem('accessToken');
    return  true;
  } catch(e) {
    // remove error
    return false;
  }
}