import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Sellitem from "./Sellitem";
import Postcollab from "./Postcollab";
import Viewcollab from "./Viewcollab";

const Sellmain = ({userId,setUserId,url,navigation,setNavigation,setTopbar,showSellItem,setShowSellItem,search,setSeachCollab,city}) => {
  const [selected, setSelected] = useState(null);
 
 
  const options = [
    { id: 1, label: "Sell An Item", icon: "shopping-bag"},
    { id: 2, label: "Post Collab", icon: "upload" },
    { id: 3, label: "View Collabs", icon: "archive" },
  ];

  const handleOptionPress = (optionId) => {
    setSelected(optionId);
    if (optionId === 1) {
      setTopbar("main");
      setShowSellItem(1); // Show Sellitem page for "Sell An Item"
    } else if (optionId === 2) {
      setTopbar("main");
      setShowSellItem(2); // Navigate to Postcollab
    } else if (optionId === 3) {
      setTopbar("view");
      setShowSellItem(3); // Navigate to Viewcollab
    }
  };
  
 
  return (
    <View style={styles.container}>
      {showSellItem === 1 ? (
        <Sellitem userId={userId} setUserId={setUserId} url={url} />
      ) : showSellItem ===2 ? <Postcollab userId={userId} setUserId={setUserId} url={url}/> : showSellItem === 3 ? <Viewcollab userId={userId} city={city} search={search} setSearch={setSeachCollab} url={url} setTopbar={setTopbar} /> : (
        options.map((option) => (
          <Pressable
            key={option.id}
            onPressIn={() => handleOptionPress(option.id)}
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
        ))
      )}
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
