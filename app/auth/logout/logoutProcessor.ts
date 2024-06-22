import { router } from "expo-router";
import { deleteAuthInfo } from "../authenticationStore/authStore";

export default async function processLogout(): Promise<boolean> {
  const deleted = await deleteAuthInfo();
  if (!deleted) {
    return false;
  }
  router.replace('/');
  return true;
}