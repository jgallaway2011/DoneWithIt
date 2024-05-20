import { StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

function ActivityIndicator({ visible = false }) {
  if (!visible) return null;

  return (
    <LottieView
      autoPlay
      loop
      source={require("../assets/animations/loader.json")}
      style={styles.animation}
    />
  );
}

const styles = StyleSheet.create({
  animation: {
    height: "100%",
    width: "100%",
  },
});

export default ActivityIndicator;
