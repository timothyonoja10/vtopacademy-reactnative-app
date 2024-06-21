
import generateForgotPasswordCode from "./forgotPasswordApi";
import { router } from 'expo-router';

export default async function processForgotPasswordForm(
    username: string 
): Promise<Boolean> {
  if (username === '') {
    return false;
  }
  try {
    const result = await generateForgotPasswordCode(username);
    if (result) {
      router.replace(`/auth/change-password/${username}`);
      return true;
    } 
  } catch (error) {
    
  }
  return false;
}