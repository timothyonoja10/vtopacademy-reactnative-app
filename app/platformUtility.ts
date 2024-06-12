import { Platform } from "react-native";

export function isWebPlatform() {
  return Platform.OS === 'web';
}

export default function isMobilePlatform() {
  return Platform.OS === 'ios' || Platform.OS == 'android';
}