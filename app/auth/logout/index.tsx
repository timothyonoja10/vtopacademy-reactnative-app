import { Link, Stack } from "expo-router";
import {Text, SafeAreaView, Pressable, Button } from "react-native";
import processLogout from "./logoutProcessor";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

export default function Page() {
  
  return(
    <SafeAreaView>
      <Stack.Screen
        options={{
          title: 'Log out',
        }}
      />
      <ThemedView>
        <ThemedText>Logout</ThemedText>
        <ThemedText>Are you sure you want to log out?</ThemedText>
        <Link href="/" asChild >
          <Pressable><ThemedText>No</ThemedText></Pressable>
        </Link>
        <Button
          title="Yes"
          onPress={() => processLogout()}
        />
      </ThemedView>
      
    </SafeAreaView>
  );
}