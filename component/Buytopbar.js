import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Button,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import Feather from "@expo/vector-icons/Feather";
const Buytopbar = ({
  search,
  setSearch,
  locpage,
  setLocpage,
  city,
  setCity,
  url,
  setNavigation,
  setBuyorcollab,
  buyorcollab
}) => {
  const handleLoc = () => {
    setLocpage(2);
  };

  const handleCart = () => {
    setNavigation(6);
  };

  const handleSettings = () => {
    setNavigation(14);
  };

  const handlecollab1=()=>{
    setBuyorcollab(2);
  }
  const handlecollab2=()=>{
    setBuyorcollab(1);
  }
  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.header}>
        <Text style={styles.texthello}>Hello there</Text>
        <Pressable onPress={handleCart}>
          <Feather name="shopping-cart" size={24} color="black" />
        </Pressable>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#255957" style={styles.icon} />
        <TextInput
          style={styles.textinput}
          placeholder="Search Organic Products"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Delivery */}
      <View style={styles.delivery}>
        <View>
          <Pressable onPress={handleLoc}>
            <Text style={styles.deliveryText}>LOCATION SELECT</Text>
          </Pressable>
          <Text style={styles.location}>{city}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 35 }}>

          
          {buyorcollab==1?<Button title="COLLABS"  onPress={handlecollab1}></Button>:
          <Button title="NORMAL"  onPress={handlecollab2}></Button>}
          

          <Pressable onPress={handleSettings}>
            <Ionicons
              name="settings-outline"
              size={24}
              color="black"
              marginVertical="6"
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Buytopbar;

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
