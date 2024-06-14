// Third Party Imports
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
// import { StatusBar } from "expo-status-bar";

// Non-Third Party Imports
import AppNavigator from "./app/navigation/AppNavigator";
import AuthContext from "./app/auth/context";
import AuthNaviagtor from "./app/navigation/AuthNavigator";
import authStorage from "./app/auth/storage";
import navigationTheme from "./app/navigation/navigationTheme";
import { OfflineNotice } from "./app/components";
import { navigationRef } from "./app/navigation/rootNavigation";

SplashScreen.preventAutoHideAsync();

export default function App() {
  // <StatusBar style="auto" />;
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load restoreToken
        const user = await authStorage.getUser();
        if (user) setUser(user);
      } catch (error) {
        console.warn(error);
      } finally {
        // Tell the application to render
        setIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setIsReady, setUser }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <OfflineNotice />
        <NavigationContainer ref={navigationRef} theme={navigationTheme}>
          {user ? <AppNavigator /> : <AuthNaviagtor />}
        </NavigationContainer>
      </GestureHandlerRootView>
    </AuthContext.Provider>
  );
}
