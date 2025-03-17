import React, { useEffect, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";
import Feather from "@expo/vector-icons/Feather";

const Postcollab = ({ userId, setUserId, url }) => {
  
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const [locopen, setLocopen] = useState(false);
  const [locvalue, setLocvalue] = useState(null);
  const [locitems, setLocitems] = useState([]);

  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");

  useEffect(() => {
    const getItem = async () => {
      try {
        const { data } = await axios.get(`http://${url}:3000/items`);
        const formattedItems = data.map((item) => ({
          label: item.item_name,
          value: item.item_name, // Changed to item_name to match API requirements
        }));
        setItems(formattedItems);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    const getLocation = async () => {
      try {
        const { data } = await axios.get(`http://${url}:3000/locations`);
        const formattedLocations = data.map((location) => ({
          label: location.location_name,
          value: location.location_name, // Changed to location_name to match API requirements
        }));
        setLocitems(formattedLocations);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    getItem();
    getLocation();
  }, []);

  const handleAddData = async () => {
    if (!userId) {
      Alert.alert("Error", "User ID is required.");
      return;
    }
  
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) {
      Alert.alert("Error", "Price must be a valid number.");
      return;
    }
  
    const postCollabData = {
      item_name: value,
      location_name: locvalue,
      quantity: parseInt(quantity, 10),
      price: parsedPrice,
      address: address,
      pincode: parseInt(pincode, 10),
      user_id: userId,
    };
  
    console.log("Posting collaboration data:", postCollabData);
  
    const config = {
      headers: { "Content-Type": "application/json" },
    };
  
    try {
      const response = await axios.post(`http://${url}:3000/collab`, postCollabData, config);
      console.log("Response from backend:", response.data);
      
      const newCollabId = response.data.collab_id;
      if (!newCollabId) throw new Error("collab_id not returned from API");
  
      Alert.alert("Success", `Collaboration Posted! Collab ID: ${newCollabId}`);
  
      // 🔹 Convert values before sending the second request
      const quantityCollabData = {
        collabid: Number(newCollabId),
        empid: Number(userId),
        qty: Number(quantity),
      };
  
      const qtyResponse = await axios.post(`http://${url}:3000/quantity`, quantityCollabData, config);
      console.log("Quantity posted successfully:", qtyResponse.data);
      
    } catch (error) {
      console.error("Error posting quantity:", error.response?.data || error.message);
      Alert.alert("Error", `Failed to post quantity: ${error.response?.data?.message || "Unknown error"}`);
    }
  };
  return (
    <View style={styles.pview}>
      {/* Dropdown for selecting an item */}
      <View style={[styles.coneview, open ? { zIndex: 1000 } : { zIndex: 1 }]}>
        <DropDownPicker
          style={styles.Textbox}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setItems={setItems}
          setValue={setValue}
          placeholder="Select an Item"
          searchable={true}
          searchPlaceholder="Search items..."
        />
      </View>

      {/* Dropdown for selecting a location */}
      <View
        style={[styles.coneview, locopen ? { zIndex: 1000 } : { zIndex: 1 }]}
      >
        <DropDownPicker
          style={styles.Textbox}
          open={locopen}
          value={locvalue}
          items={locitems}
          setOpen={setLocopen}
          setItems={setLocitems}
          setValue={setLocvalue}
          placeholder="Select a Location"
          searchable={true}
          searchPlaceholder="Search locations..."
        />
      </View>

      {/* Input for Quantity */}
      <SafeAreaView style={styles.coneview}>
        <TextInput
          style={styles.Textbox}
          placeholder="Quantity"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
        />
      </SafeAreaView>

      {/* Input for Price */}
      <SafeAreaView style={styles.coneview}>
        <TextInput
          style={styles.Textbox}
          placeholder="Price"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
      </SafeAreaView>

      {/* Input for Address */}
      <SafeAreaView style={styles.coneview}>
        <TextInput
          style={styles.Textbox}
          placeholder="Enter Address"
          value={address}
          onChangeText={setAddress}
        />
      </SafeAreaView>

      {/* Input for Pincode */}
      <SafeAreaView style={styles.coneview}>
        <TextInput
          style={styles.Textbox}
          placeholder="Pincode"
          value={pincode}
          onChangeText={setPincode}
          keyboardType="numeric"
        />
      </SafeAreaView>

      <Pressable>
        <Text
          onPress={handleAddData}
          style={[styles.Buttonlike, styles.Inputbox]}
        >
          Post Collaboration
        </Text>
      </Pressable>
    </View>
  );
};

export default Postcollab;

const styles = StyleSheet.create({
  Textbox: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
    padding: 15,
    width: 250,
    height: 50,
    backgroundColor: "#88B04B",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 17,
  },
  pview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  coneview: {
    padding: 10,
  },
  Inputbox: {
    width: 180,
    height: 50,
    borderColor: "gray",
    borderWidth: 1.5,
    borderRadius: 7,
  },
  Buttonlike: {
    backgroundColor: "green",
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
    textAlign: "center",
    padding: 10,
  },
});
