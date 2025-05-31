import { Stack, SplashScreen } from "expo-router";
import '../global.css';
import { useFonts, Inter_400Regular, Inter_700Bold } from "@expo-google-fonts/inter";
import { useEffect } from "react";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return <Stack
     screenOptions={{
           animation: 'fade',
           contentStyle: {
             backgroundColor: "#282828",
           }, // 👈 tu color de fondo global
     }}>
    <Stack.Screen name="(auth)/index" options={{ headerShown: false }} />
    <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
    <Stack.Screen name="(auth)/register" options={{ headerShown: false }} />
    <Stack.Screen name="(auth)/generosIniciales" options={{ headerShown: false }} />
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    <Stack.Screen name="podcast/[id]" options={{ headerShown: false }} />
  </Stack>;
}
