import { Link } from "expo-router";
import {Text, SafeAreaView, Pressable, Button } from "react-native";
import processLogout from "./logoutProcessor";

export default function Page() {
  
  return(
    <SafeAreaView>
      <Text>Logout</Text>
      <Text>Are you sure you want to log out?</Text>
      <Link href="/" asChild >
        <Pressable>
          <Text>No</Text>
        </Pressable>
      </Link>
      <Button
        title="Yes"
        onPress={() => processLogout()}
      />
    </SafeAreaView>
  );
}