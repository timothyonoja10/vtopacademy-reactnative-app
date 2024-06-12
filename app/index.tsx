
import { Link, Stack } from 'expo-router';
import { StyleSheet, Pressable, Text, View, StatusBar, SafeAreaView, ActivityIndicator } from 'react-native';
import { hasAccessToken } from './authenticationStore/authStore';
import { useEffect, useState } from 'react';

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
        <View style={styles.container}>
          <Text>Home page</Text>
          <Link href="/schools" asChild >
            <Pressable>
              <Text>Schools</Text>
            </Pressable>
          </Link>
          {isLoggedOut && (
            <Link href="/register" asChild >
              <Pressable>
                <Text>Register</Text>
              </Pressable>
            </Link>
          )}
          {isLoggedOut && (
            <Link href="/login" asChild >
              <Pressable>
                <Text>Login</Text>
              </Pressable>
            </Link>
          )}
          {isLoggedIn && (
            <Link href="/logout" asChild >
              <Pressable>
                <Text>Logout</Text>
              </Pressable>
            </Link>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  }
});