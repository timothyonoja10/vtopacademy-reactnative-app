import { saveAuthInfo } from "../authenticationStore/authStore";
import { router } from 'expo-router';
import changePassword from "./changePasswordApi";

export default async function processChangePasswordForm(
  username: string, newPassword: string, code: string
): Promise<Boolean> {
  if (username === '' || newPassword === '' || code === '') {
    return false;
  }
  try {
    console.log('username 2:', username);
    const jsonData = await changePassword(username, newPassword, code);
    let isAdmin = jsonData.isAdmin === true; 
    let isUser = jsonData.isUser === true;
    await saveAuthInfo(jsonData.accessToken, isAdmin, isUser);
    router.replace('/');
    return true;
  } catch (error) {
   
  }
  return false;
}