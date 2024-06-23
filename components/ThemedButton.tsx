import React from 'react';
import { TouchableOpacity, Text, type TouchableOpacityProps, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedButtonProps = TouchableOpacityProps & {
  lightColor?: string;
  darkColor?: string;
  title: string;
  type?: 'default' | 'primary' | 'secondary' | 'link';
};

export function ThemedButton({
  style,
  lightColor,
  darkColor,
  title,
  type = 'default',
  ...rest
}: ThemedButtonProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return (
    <TouchableOpacity
      style={[
        styles.button,
        type === 'default' ? styles.default : undefined,
        type === 'primary' ? [styles.primary, { backgroundColor }] : undefined,
        type === 'secondary' ? [styles.secondary, { backgroundColor }] : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    >
      <Text style={[styles.buttonText, { color }, type === 'link' ? styles.linkText : undefined]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  default: {
    backgroundColor: '#ccc',
  },
  primary: {
    backgroundColor: '#007bff',
  },
  secondary: {
    backgroundColor: '#6c757d',
  },
  link: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontSize: 16,
  },
  linkText: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
});
