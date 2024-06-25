
import { View, type ViewProps, StyleSheet, Text } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from './ThemedText';
import { Ionicons } from '@expo/vector-icons';

export type ThemedListItemProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  title: string;
};

export function ThemedListItem({ 
  style, 
  lightColor, 
  darkColor,
  title, 
  ...otherProps 
}: ThemedListItemProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'surface');
  const iconColor = useThemeColor({ light: lightColor, dark: darkColor }, 'onSurfaceVar');
  
  return (
    <View 
      style={[
        styles.item,
        { backgroundColor },
        style
      ]}
      {...otherProps}
    >
      <ThemedText type='headlineSmall' style={styles.text}> {title} </ThemedText>
      <Ionicons name="arrow-forward-circle" size={24} color={iconColor} />
    </View>
  ); 
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginVertical: 8,
    height: 56,
  },
  text: {
    flex: 1,
  },
});
