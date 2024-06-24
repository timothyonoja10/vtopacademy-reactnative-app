import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'displayLarge' | 'displayMedium' | 'displaySmall' | 
         'headlineLarge' | 'headlineMedium' | 'headlineSmall' | 
         'titleLarge' | 'titleMedium' | 'titleSmall' | 
         'bodyLarge' | 'bodyMedium' | 'bodySmall' | 
         'labelLarge' | 'labelMedium' | 'labelSmall';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'bodyLarge',
  ...rest
}: ThemedTextProps) {
  const textColor = useThemeColor({ light: lightColor, dark: darkColor }, 'onSurface');
  const colorStyle = { color: textColor };

  return (
    <Text
      style={[
        colorStyle,
        styles.default,
        type === 'displayLarge' ? styles.displayLarge : undefined,
        type === 'displayMedium' ? styles.displayMedium : undefined,
        type === 'displaySmall' ? styles.displaySmall : undefined, 
        type === 'headlineLarge' ? styles.headlineLarge : undefined,
        type === 'headlineMedium' ? styles.headlineSmall : undefined,
        type === 'headlineSmall' ? styles.headlineSmall : undefined,
        type === 'titleLarge' ? styles.titleLarge : undefined,
        type === 'titleMedium' ? styles.titleMedium : undefined,
        type === 'titleSmall' ? styles.titleSmall : undefined,
        type === 'bodyLarge' ? styles.bodyLarge : undefined,
        type === 'bodyMedium' ? styles.bodyMedium : undefined,
        type === 'bodySmall' ? styles.bodySmall : undefined,
        type === 'labelLarge' ? styles.labelLarge : undefined,
        type === 'labelMedium' ? styles.headlineSmall : undefined,
        type === 'labelSmall' ? styles.headlineSmall : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontFamily: 'Roboto',
    fontWeight: 400,
  },
  displayLarge: {
    fontSize: 57
  },
  displayMedium: {
    fontSize: 45,
  },
  displaySmall: {
    fontSize: 36
  },
  headlineLarge: {
    fontSize: 32
  },
  headlineMedium: {
    fontSize: 28
  },
  headlineSmall: {
    fontSize: 24
  },
  titleLarge: {
    fontSize: 22
  },
  titleMedium: {
    fontWeight: 500,
    fontSize: 16
  },
  titleSmall: {
    fontWeight: 500,
    fontSize: 14
  },
  bodyLarge: {
    fontSize: 16
  },
  bodyMedium: {
    fontSize: 14
  },
  bodySmall: {
    fontSize: 12
  },
  labelLarge: {
    fontWeight: 500,
    fontSize: 14
  },
  labelMedium: {
    fontWeight: 500,
    fontSize: 12
  },
  labelSmall: {
    fontWeight: 500,
    fontSize: 11,
  },
});