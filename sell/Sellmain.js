import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Sellitem from "./Sellitem";

const Sellmain = ({userId,setUserId}) => {
  const [selected, setSelected] = useState(null);
  const [showSellItem, setShowSellItem] = useState(false); // To toggle Sellitem view

  const options = [
    { id: 1, label: "Sell An Item", icon: "shopping-bag" },
    { id: 2, label: "Post Collab", icon: "upload" },
    { id: 3, label: "View Collabs", icon: "archive" },
  ];

  if (showSellItem) {
    return <Sellitem userId={userId} setUserId={setUserId}/>;
  }

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <Pressable
          key={option.id}
          onPressIn={() => {
            setSelected(option.id);
            if (option.id === 1) {
              setShowSellItem(true); // Show Sellitem page for "Sell An Item"
            }
          }}
          style={[
            styles.box,
            selected === option.id && styles.selectedBox,
          ]}
        >
          <Feather
            name={option.icon}
            size={24}
            color={selected === option.id ? "white" : "black"}
          />
          <Text
            style={[
              styles.label,
              selected === option.id && styles.selectedLabel,
            ]}
          >
            {option.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default Sellmain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    backgroundColor: "#F2FBD4",
  },
  box: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    width: "80%",
    height: "18%",
    borderRadius: 18,
    elevation: 4,
  },
  selectedBox: {
    backgroundColor: "#88B04B",
    transform: [{ scale: 1.05 }],
  },
  label: {
    fontSize: 18,
    marginLeft: 10,
    color: "black",
    fontWeight: "bold",
  },
  selectedLabel: {
    color: "white",
  },
});
