import React from 'react';
import { Text, type TouchableOpacityProps, StyleSheet, Pressable } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedButtonProps = TouchableOpacityProps & {
  lightColor?: string;
  darkColor?: string;
  title: string;
  type?: 'elevated' | 'filled' | 'tonal' | 'outlined' | 'text';
};

export function ThemedButton({
  style,
  lightColor,
  darkColor,
  title,
  type = 'filled',
  ...rest
}: ThemedButtonProps) {
  const colorSurfContainerLow = useThemeColor({ light: lightColor, dark: darkColor }, 'surfContainerLow');
  const colorPrimary = useThemeColor({ light: lightColor, dark: darkColor }, 'primary');
  const colorOnPrimary = useThemeColor({ light: lightColor, dark: darkColor }, 'onPrimary');
  const colorSecondaryContainer = useThemeColor({ light: lightColor, dark: darkColor }, 'secondaryContainer');
  const colorOnSecondaryContainer = useThemeColor({ light: lightColor, dark: darkColor }, 'onSecondaryContainer');
  const colorSurface = useThemeColor({ light: lightColor, dark: darkColor }, 'surface');
  const colorOutline = useThemeColor({ light: lightColor, dark: darkColor }, 'outline');

  return (
    <Pressable
      style={[
        styles.button,
        type === 'elevated' ? { backgroundColor: colorSurfContainerLow } : undefined,
        type === 'filled' ? { backgroundColor: colorPrimary } : undefined,
        type === 'tonal' ? { backgroundColor: colorSecondaryContainer } : undefined,
        type === 'outlined' ? { 
          backgroundColor: colorSurface, borderColor: colorOutline, borderWidth: 1 
        } : undefined,
        style,
      ]}
      {...rest}
    >
      <Text style={[
        type === 'elevated' ? { color: colorPrimary } : undefined,
        type === 'filled' ? { color: colorOnPrimary } : undefined,
        type === 'tonal' ? { color: colorOnSecondaryContainer } : undefined,
        type === 'text' ? { color: colorPrimary } : undefined,
        type === 'outlined' ? { color: colorPrimary } : undefined,
        style,
      ]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
