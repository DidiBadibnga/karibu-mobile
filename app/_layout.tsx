import { ThemeProvider, createTheme } from '@rneui/themed';




import { useFonts } from 'expo-font';
import { ClerkProvider, SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import Constants from "expo-constants"
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import { Button, Image, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import * as SecureStore from "expo-secure-store";
import algoliasearch from 'algoliasearch/lite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { client } from '@/api';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppProvider, DestinationProvider } from '@/context/GlobalProvider';


SplashScreen.preventAutoHideAsync();
const theme = createTheme({
  lightColors: {
    primary: '#fff',
    background: "#ff7c03",

  },
  darkColors: {
    primary: '#000',
  },
  mode: 'light',
});
export default function RootLayout() {
  const [status, requestPermission] = MediaLibrary.usePermissions();
  // ...rest of the code remains same

  if (status === null) {
    requestPermission();
  }
  const searchClient = algoliasearch('9IESW9NT13', '2d212c2260ca7be2b0a52cbb4f4babb9');
  const tokenCache = {
    async getToken(key: string) {
      try {
        return SecureStore.getItemAsync(key);
      } catch (err) {
        return null;
      }
    },
    async saveToken(key: string, value: string) {
      try {
        return SecureStore.setItemAsync(key, value);
      } catch (err) {
        return;
      }
    },
  };

  const router = useRouter()
  const clerkKey = "pk_test_Zmlyc3QtaGFnZmlzaC0zNi5jbGVyay5hY2NvdW50cy5kZXYk"
  const [loaded, error] = useFonts({
    // SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Nunito: require("../assets/fonts/Nunito-Regular.ttf")
  });
  const queryClient = new QueryClient()
  const SignOut = () => {

    const { isLoaded, signOut } = useAuth();
    if (!isLoaded) {
      return null;
    }
    return (
      <View>
        <Button
          title="Sign Out"
          onPress={() => {
            signOut();
          }}
        />
      </View>
    );
  };

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }


  return (
    <ClerkProvider publishableKey={clerkKey} tokenCache={tokenCache} >
      {/* <ApolloProvider client={client}> */}
      <GestureHandlerRootView>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <AppProvider>
              <Stack screenOptions={{
                animationDuration: 1000,
                animation: 'fade_from_bottom',
              }}>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="index" options={{ headerShown: false }} />
                {/* <Stack.Screen name="(modals)/login" options={{ headerShown: false }} /> */}
                <Stack.Screen name="destination/[id]" options={{
                }} />
                <Stack.Screen name="blog/[id]" options={{ headerShown: false }} />
                <Stack.Screen name="(modals)/filter" options={{ headerShown: false }} />
                {/* <Stack.Screen
                name="attractions"
                options={{
                  headerTitleAlign: "center",
                  // Set the presentation mode to modal for our modal route.
                  presentation: 'modal',
                }}
              /> */}
              </Stack>

            </AppProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
      {/* </ApolloProvider> */}


    </ClerkProvider>
  );


}
