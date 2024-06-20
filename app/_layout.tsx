import { shouldSupportOfflineStorage } from './utilities';
import { SQLiteProvider } from 'expo-sqlite';
import migrateDbIfNeeded from './database/migration';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Stack } from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const stackComponent = (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
      </Stack>
    </ThemeProvider>
  );

  if (shouldSupportOfflineStorage()) {
    return (
      <SQLiteProvider databaseName="test.db" onInit={migrateDbIfNeeded}>
        {stackComponent}
      </SQLiteProvider>
    );
  } else {
    return stackComponent;
  }
}