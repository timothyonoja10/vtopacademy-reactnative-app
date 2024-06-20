
import { Link, Stack } from 'expo-router';
import { StyleSheet, Pressable, Text, View, StatusBar, SafeAreaView, ActivityIndicator } from 'react-native';
import { hasAccessToken } from './authenticationStore/authStore';
import { useEffect, useState } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function Page() {
  const [isLoading, setLoading] = useState(true);
  const [isLoggedIn, setLogin] = useState(false);
  const [isLoggedOut, setLogout] = useState(false);

  const checkAdminStatus = async () => {
    const response = await hasAccessToken();
    setLogin(response);
    setLogout(!response);
    setLoading(false);
  }

  useEffect(() => {
    checkAdminStatus();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Home',
        }}
      />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ThemedView style={styles.container}>
          <ThemedText>Home page</ThemedText>
          <Link href="/schools" asChild >
            <Pressable><ThemedText>Schools</ThemedText></Pressable>
          </Link>
          {isLoggedOut && (
            <>
              <Link href="/register" asChild >
                <Pressable><ThemedText>Register</ThemedText></Pressable>
              </Link>
              <Link href="/login" asChild >
                <Pressable><ThemedText>Login</ThemedText></Pressable>
              </Link>
              <Link href="/forgot-password" asChild >
                <Pressable><ThemedText>Forgot Password</ThemedText></Pressable>
              </Link>
            </> 
          )}
          {isLoggedIn && (
            <Link href="/logout" asChild >
              <Pressable>
                <ThemedText>Logout</ThemedText>
              </Pressable>
            </Link>
          )}
        </ThemedView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});