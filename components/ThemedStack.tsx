import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { Stack } from 'expo-router';

export type ThemedStackProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedStack({ style, lightColor, darkColor, ...otherProps }: ThemedStackProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'surface');
  const textColor = useThemeColor({ light: lightColor, dark: darkColor }, 'onSurface');

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: backgroundColor,
        },
        headerTintColor: textColor
      }}
    />
  )
}