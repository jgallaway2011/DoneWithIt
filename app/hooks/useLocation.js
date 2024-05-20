import { useEffect, useState } from "react";
import * as Location from "expo-location";

export default useLocation = () => {
  const [location, setLocation] = useState();

  const getLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return;
    } catch (error) {
      console.log("Error requesting location permission: ", error);
    }

    try {
      const {
        coords: { latitude, longitude },
      } = await Location.getLastKnownPositionAsync();
      setLocation({ latitude, longitude });
    } catch (error) {
      console.log("Error getting location coordinates: ", error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return location;
};
