import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Feather from '@expo/vector-icons/Feather';

const Selltopbar = ({url}) => {
  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.header}>
        <Text style={styles.texthello}>Hello there</Text>
        <Feather name="shopping-cart" size={24} color="black" />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#255957" style={styles.icon} />
        <TextInput
          style={styles.textinput}
          placeholder="Search Organic Products"
        />
      </View>
      <Text ></Text>
      {/* Delivery */}
      <View style={styles.delivery}>
      
        <View style={{flexDirection:"row",gap:3}}>
          <EvilIcons name="location" size={24} color="black" />
          <Text style={styles.location}>Chengannur</Text>
        </View>

        <Ionicons name="settings-outline" size={24} color="black" />
      </View>
    </View>
  );
};

export default Selltopbar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#C1E899",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  texthello: {
    fontSize: 28,
    color: "#4F7726",
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#F2FBD4",
    borderRadius: 10,
    marginVertical: 15,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  textinput: {
    flex: 1,
    color: "#255957",
    height: 40,
  },
  delivery: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deliveryText: {
    fontSize: 12,
    color: "#6C757D",
  },
  location: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4F7726",
  },
});
