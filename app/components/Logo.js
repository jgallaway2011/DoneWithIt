import { Image, StyleSheet } from "react-native";

function Logo() {
  return (
    <Image
      style={styles.logo}
      source={require("../assets/photos/logo-red.png")}
    />
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});

export default Logo;
