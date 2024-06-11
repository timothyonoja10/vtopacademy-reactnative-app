import { saveAuthInfo } from "../authStore";
import { router } from 'expo-router';
import makeRegistration from "./registerApi";

export default async function processRegistrationForm(
  username: string, password: string
): Promise<Boolean> {
  if (username === '' || password === '') {
    return false;
  }
  try {
    const jsonData = await makeRegistration(username, password);
    let isAdmin = jsonData.isAdmin === true; 
    let isUser = jsonData.isUser === true;
    await saveAuthInfo(jsonData.accessToken, isAdmin, isUser);
    router.replace('/');
    return true;
  } catch (error) {

  }
  return false;
}