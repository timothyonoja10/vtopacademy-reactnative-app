import React from 'react';
import { TextInput, type TextInputProps, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'filled' | 'outlined';
};

export function ThemedTextInput({
  style,
  lightColor,
  darkColor,
  type = 'outlined',
  ...rest
}: ThemedTextInputProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'primary');
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'surfContainerHighest');
  const outlineColor = useThemeColor({ light: lightColor, dark: darkColor }, 'outline');
  const placeholderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'onSurfaceVar');

  return (
    <TextInput
      style={[
        styles.input,
        type === 'filled' ? { color, backgroundColor } : undefined,
        type === 'outlined' ? { color, borderColor: outlineColor, borderWidth: 1  } : undefined,
        style,
      ]}
      placeholderTextColor={placeholderColor}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 56,
    borderRadius: 4,
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  filled: {

  },
  outlined: {
    
  },
});
