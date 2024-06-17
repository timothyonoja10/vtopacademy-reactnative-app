
import generateForgotPasswordCode from "./forgotPasswordApi";
import { router } from 'expo-router';

export default async function processForgotPasswordForm(
    username: string 
): Promise<Boolean> {
  if (username === '') {
    return false;
  }
  try {
    const jsonData = await generateForgotPasswordCode(username);
    router.replace(`/change-password/${username}`);
    return true;
  } catch (error) {
    
  }
  return false;
}