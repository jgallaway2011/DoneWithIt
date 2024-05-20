import { createStackNavigator } from "@react-navigation/stack";

import { ListingDetailsScreen, ListingsScreen } from "../screens";
import routes from "./routes";

const Stack = createStackNavigator();

export default FeedNaviagtor = () => (
  <Stack.Navigator
    screenOptions={{
      gestureEnabled: true,
      headerShown: false,
      presentation: "modal",
    }}
  >
    <Stack.Screen component={ListingsScreen} name={routes.LISTINGS} />
    <Stack.Screen
      component={ListingDetailsScreen}
      name={routes.LISTING_DETAILS}
    />
  </Stack.Navigator>
);
