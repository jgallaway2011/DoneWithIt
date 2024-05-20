import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { ListingEditScreen } from "../screens";
import AccountNavigator from "./AccountNavigator";
import FeedNaviagtor from "./FeedNavigator";
import NewListingButton from "./NewListingButton";
import routes from "./routes";

const Tab = createBottomTabNavigator();

export default AppNavigator = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen
      component={FeedNaviagtor}
      name="Feed"
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons color={color} name="home" size={size} />
        ),
      }}
    />
    <Tab.Screen
      component={ListingEditScreen}
      name="ListingEdit"
      options={({ navigation }) => ({
        tabBarButton: () => (
          <NewListingButton
            onPress={() => navigation.navigate(routes.LISTING_EDIT)}
          />
        ),
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            color={color}
            name="plus-circle"
            size={size}
          />
        ),
      })}
    />
    <Tab.Screen
      component={AccountNavigator}
      name="Account"
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons color={color} name="account" size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);
