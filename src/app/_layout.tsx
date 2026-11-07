import { Stack } from "expo-router";
import { MenuProvider } from "../context/menu-context";

export default function Layout() {
  return (
    <MenuProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </MenuProvider>
  );
}