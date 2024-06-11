import { router } from "expo-router";
import { deleteAuthInfo } from "../authStore";

export default async function processLogout(): Promise<boolean> {
  const response = await deleteAuthInfo();
  router.navigate('/');
  return true;
}