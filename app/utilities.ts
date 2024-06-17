import { Platform } from "react-native";

export function isWebPlatform() {
  return Platform.OS === 'web';
}

export function isMobilePlatform() {
  return Platform.OS === 'ios' || Platform.OS == 'android';
}

export function convertToString(username: string | string[] | undefined): string {
  if (Array.isArray(username)) {
      // If username is an array, join the elements with a comma or any delimiter you prefer
      return username.join(", ");
  } else if (typeof username === "string") {
      // If username is already a string, return it as is
      return username;
  } else {
      // If username is undefined, return an empty string or a default value
      return "";
  }
}