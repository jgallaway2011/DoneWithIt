import { useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";

import {
  ActivityIndicator,
  Button,
  Card,
  OfflineNotice,
  Screen,
  Text,
} from "../components";
import colors from "../config/colors";
import listingsAPI from "../api/listings";
import routes from "../navigation/routes";
import useAPI from "../hooks/useAPI";

function ListingsScreen({ navigation }) {
  const getListingsAPI = useAPI(listingsAPI.getListings);

  useEffect(() => {
    getListingsAPI.request();
  }, []);

  return (
    <>
      <ActivityIndicator visible={getListingsAPI.loading} />
      <Screen style={styles.screen}>
        <OfflineNotice />
        {getListingsAPI.error && (
          <>
            <Text>Couldn't retrieve the listings.</Text>
            <Button title="Retry" onPress={getListingsAPI.request} />
          </>
        )}
        <FlatList
          data={getListingsAPI.data}
          keyExtractor={(listing) => listing.id.toString()}
          renderItem={({ item }) => (
            <Card
              item={{ ...item, subTitle: "$" + item.price }}
              onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
            />
          )}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
});

export default ListingsScreen;
