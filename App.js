// Third Party Imports
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { jwtDecode } from "jwt-decode";
// import { StatusBar } from "expo-status-bar";

// Non-Third Party Imports
import AppNavigator from "./app/navigation/AppNavigator";
import AuthContext from "./app/auth/context";
import AuthNaviagtor from "./app/navigation/AuthNavigator";
import authStorage from "./app/auth/storage";
import navigationTheme from "./app/navigation/navigationTheme";
import { OfflineNotice } from "./app/components";

// SplashScreen.preventAutoHideAsync();

export default function App() {
  // <StatusBar style="auto" />;
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load restoreToken
        const token = await authStorage.getToken();
        if (!token) return;
        setUser(jwtDecode(token));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setIsReady, setUser }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <OfflineNotice />
        <NavigationContainer theme={navigationTheme}>
          {user ? <AppNavigator /> : <AuthNaviagtor />}
        </NavigationContainer>
      </GestureHandlerRootView>
    </AuthContext.Provider>
  );
}
