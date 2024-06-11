import { saveAuthInfo } from "../authStore";
import makeLogin from "./loginApi";
import { router } from 'expo-router';

export default async function processLoginForm(
  username: string, password: string
): Promise<Boolean> {
  if (username === '' || password === '') {
    return false;
  }
  try {
    const jsonData = await makeLogin(username, password);
    let isAdmin = jsonData.isAdmin === true; 
    let isUser = jsonData.isUser === true;
    await saveAuthInfo(jsonData.accessToken, isAdmin, isUser);
    router.replace('/');
    return true;
  } catch (error) {
   
  }
  return false;
}