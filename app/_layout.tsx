import "../languages/i18n";
import { useEffect } from "react";
import { useFonts, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import { Roboto_300Light, Roboto_500Medium, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { Slot, SplashScreen } from "expo-router";
import { AuthProvider } from "../contexts/auth";
import { ThemeProvider } from "styled-components/native";
import theme from "../global/styles/theme";

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Roboto_300Light,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Slot />
      </ThemeProvider>
    </AuthProvider>
  );
}
