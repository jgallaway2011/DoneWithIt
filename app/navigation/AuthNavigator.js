import { createStackNavigator } from "@react-navigation/stack";

import { LoginScreen, RegisterScreen, WelcomeScreen } from "../screens";
import routes from "./routes";

const Stack = createStackNavigator();

export default AuthNaviagtor = () => (
  <Stack.Navigator>
    <Stack.Screen
      component={WelcomeScreen}
      name={routes.WELCOME}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      component={LoginScreen}
      name={routes.LOGIN}
      options={{ headerTitle: "" }}
    />
    <Stack.Screen
      component={RegisterScreen}
      name={routes.REGISTER}
      options={{ headerTitle: "" }}
    />
  </Stack.Navigator>
);
