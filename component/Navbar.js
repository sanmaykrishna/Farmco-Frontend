import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const Navbar = ({ navigation, setNavigation,url }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPressOut={() => setNavigation(3)}
        style={styles.button}
      >
        <Ionicons name="cart" size={28} color="#4F7726" />
        <Text style={styles.text}>Buy</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPressOut={() => setNavigation(4)}
        style={styles.button}
      >
        <Ionicons name="add" size={28} color="#4F7726" />
        <Text style={styles.text}>Sell</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPressOut={() => setNavigation(5)}
        style={styles.button}
      >
        <Ionicons name="leaf" size={28} color="#4F7726" />
        <Text style={styles.text}>Yield</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 3,
    borderTopColor: "#E0E0E0",
  },
  button: {
    alignItems: "center",
  },
  text: {
    fontSize: 15,
    color: "#4F7726",
    marginTop: 5,
  },
});
