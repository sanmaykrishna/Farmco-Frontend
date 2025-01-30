import {
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
    Alert,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import DropDownPicker from "react-native-dropdown-picker";
  import axios from "axios";
  import Feather from "@expo/vector-icons/Feather";
  
  const Sellitem = ({userId,setUserId,url}) => {
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
      const sellitemdata = {
        item_name: value,
        location_name: locvalue,
        quantity: parseInt(quantity, 10), // Ensure quantity is an integer
        price: parseFloat(price), // Ensure price is a float
        address: address,
        pincode: parseInt(pincode, 10), // Ensure pincode is an integer
        user_id: userId,
      };
  
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      try {
        const response = await axios.post(
          `http://${url}:3000/product`,
          sellitemdata,
          config
        );
        Alert.alert("Success", "Item Added");
      } catch (error) {
        console.error("Error adding item:", error.message, error.config);
        Alert.alert("Error", "Network Error: Unable to add item.");
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
        <View style={[styles.coneview, locopen ? { zIndex: 1000 } : { zIndex: 1 }]}>
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
            Add Data
          </Text>
        </Pressable>
      </View>
    );
  };
  
  export default Sellitem;
  
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
  