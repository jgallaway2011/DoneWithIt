import { createStackNavigator } from "@react-navigation/stack";

import { AccountScreen, ListingsScreen, MessagesScreen } from "../screens";
import routes from "./routes";

const Stack = createStackNavigator();

export default AccountNaviagtor = () => (
  <Stack.Navigator screenOptions={{ headerMode: "none" }}>
    <Stack.Screen name={routes.ACCOUNT_HOME} component={AccountScreen} />
    <Stack.Screen name={routes.MY_LISTINGS} component={ListingsScreen} />
    <Stack.Screen name={routes.MY_MESSAGES} component={MessagesScreen} />
  </Stack.Navigator>
);
