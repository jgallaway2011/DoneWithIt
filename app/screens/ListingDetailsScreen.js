import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Image } from "react-native-expo-image-cache";

import ContactSellerForm from "../components/ContactSellerForm";
import { Screen, Text } from "../components";
import { ListItem } from "../components/lists";
import colors from "../config/colors";

function ListingDetailsScreen({ route }) {
  return (
    <Screen style={styles.screen}>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
      >
        <Image
          preview={{ uri: route.params.images[0].thumbnailUrl }}
          style={styles.image}
          tint="light"
          uri={route.params.images[0].url}
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{route.params.title}</Text>
          <Text style={styles.price}>${route.params.price}</Text>
          <View style={styles.userContainer}>
            <ListItem
              image={require("../assets/photos/me.jpg")}
              title="Joshua Gallaway"
              subTitle="5 Listings"
            />
          </View>
          <ContactSellerForm listing={route.params} />
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  screen: {
    padding: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  userContainer: {
    marginVertical: 40,
  },
});

export default ListingDetailsScreen;
