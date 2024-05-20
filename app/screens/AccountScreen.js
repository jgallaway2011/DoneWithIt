import { useContext } from "react";
import { FlatList, View, StyleSheet } from "react-native";

import { Icon, Screen } from "../components";
import { ListItem, ListItemSeparator } from "../components/lists";
import authStorage from "../auth/storage";
import colors from "../config/colors";

const menuItems = [
  {
    targetScreen: "MyListings",
    title: "My Listings",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.primary,
    },
  },
  {
    targetScreen: "MyMessages",
    title: "My Messages",
    icon: {
      name: "email",
      backgroundColor: colors.secondary,
    },
  },
];

function AccountScreen({ navigation }) {
  const { user, setUser } = useContext(AuthContext);

  const handleLogOut = () => {
    setUser(null);
    authStorage.removeToken();
  };

  return (
    <Screen style={styles.screen}>
      <ListItem
        title={user.name}
        subTitle={user.email}
        image={require("../assets/photos/me.jpg")}
      />
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          ItemSeparatorComponent={ListItemSeparator}
          keyExtractor={(menuItem) => menuItem.title}
          renderItem={({ item }) => (
            <ListItem
              IconCompenent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen)}
              showChevrons
              subTitle={item.subTitle}
              title={item.title}
            />
          )}
        />
      </View>
      <ListItem
        IconCompenent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={handleLogOut}
        showChevrons
        title="Log Out"
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  screen: {
    backgroundColor: colors.light,
    padding: 0,
  },
});

export default AccountScreen;
