import { router } from "expo-router";
import { deleteAuthInfo } from "../authenticationStore/authStore";

export default async function processLogout(): Promise<boolean> {
  const response = await deleteAuthInfo();
  router.replace('/');
  return true;
}