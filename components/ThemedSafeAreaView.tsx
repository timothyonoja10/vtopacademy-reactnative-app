import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { SafeAreaViewProps } from 'react-native-safe-area-context';

export type ThemedSafeAreaViewProps = SafeAreaViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedSafeAreaView({
  style,
  lightColor,
  darkColor,
  ...rest
}: ThemedSafeAreaViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'surfContainerLowest');

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor },
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});