import { Inter_400Regular, Inter_700Bold, useFonts } from "@expo-google-fonts/inter";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import '../global.css';

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
           },
     }}>
    <Stack.Screen name="(auth)/index" options={{ headerShown: false }} />
    <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
    <Stack.Screen name="(auth)/register" options={{ headerShown: false }} />
    <Stack.Screen name="(auth)/generosIniciales" options={{ headerShown: false }} />
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    <Stack.Screen name="podcast/[id]" options={{ headerShown: false }} />
    <Stack.Screen name="episodio/[id]" options={{ headerShown: false }} />
  </Stack>;
}
