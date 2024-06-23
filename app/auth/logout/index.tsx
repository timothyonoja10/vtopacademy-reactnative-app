import { Link, Stack } from "expo-router";
import { Pressable} from "react-native";
import processLogout from "./logoutProcessor";
import { ThemedText } from "@/components/ThemedText";
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { ThemedButton } from "@/components/ThemedButton";

export default function Page() {
  return(
    <ThemedSafeAreaView>
      <Stack.Screen
        options={{ title: 'Log out' }}
      />

      <ThemedText>Are you sure you want to log out?</ThemedText>
      <Link replace href="/" asChild >
        <Pressable><ThemedText>No</ThemedText></Pressable>
      </Link>
      <ThemedButton
        title="Yes"
        onPress={() => processLogout()}
      />
    </ThemedSafeAreaView>
  );
}