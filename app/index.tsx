
import { Link, Stack } from 'expo-router';
import { StyleSheet, Pressable, Text, View, StatusBar, SafeAreaView, ActivityIndicator } from 'react-native';
import { hasAccessToken } from './auth/authenticationStore/authStore';
import { useEffect, useState } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedSafeAreaView } from '@/components/ThemedSafeAreaView';

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
    <ThemedSafeAreaView>
      <Stack.Screen
        options={{
          title: 'Home',
        }}
      />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <ThemedText>Home page</ThemedText>
          <Link href="/schools/all-schools" asChild >
            <Pressable><ThemedText>Schools</ThemedText></Pressable>
          </Link>
          {isLoggedOut && (
            <>
              <Link href="/auth/register" asChild >
                <Pressable><ThemedText>Register</ThemedText></Pressable>
              </Link>
              <Link href="/auth/login" asChild >
                <Pressable><ThemedText>Login</ThemedText></Pressable>
              </Link>
              <Link href="/auth/forgot-password" asChild >
                <Pressable><ThemedText>Forgot Password</ThemedText></Pressable>
              </Link>
            </> 
          )}
          {isLoggedIn && (
            <Link href="/auth/logout" asChild >
              <Pressable><ThemedText>Logout</ThemedText></Pressable>
            </Link>
          )}
        </>
      )}
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});