
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from "axios";

// Mapping of item names to image imports
const imageMap = {
  tomato: require("../assets/tomato.png"),
  carrot: require("../assets/carrot.png"),
  potato: require("../assets/potato.png"),
  onion: require("../assets/onion.png"),
  coconut: require("../assets/coconut.png"),
  papaya: require("../assets/papaya.png"),
  wheat: require("../assets/wheat.png"),
  banana: require("../assets/banana.png"),
  ginger: require("../assets/ginger.png"),
  
  // Add more mappings as needed
};

const Buymain = ({ search, city, setCity,url,setCartItems }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getItem = async () => {
      try {
        const { data } = await axios.get(`http://${url}:3000/product/location?location_name=${encodeURIComponent(city)}`);
        setProducts(data); // Assuming the API returns an array of products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (city) {
      getItem();
    }
  }, [city]);

  // Filter products based on search query (case-insensitive)
  const filteredProducts = products.filter((item) =>
    item.item_name.toLowerCase().includes(search.toLowerCase())
  
  );

  const addToCart = (item) => {
    const productToAdd={
      product_id: item.product_id,
      item_name: item.item_name,
      price: parseFloat(item.price),
      available_quantity: item.quantity, // Available quantity from the product
      quantity: 1,
    };
    setCartItems((prevCart) => {
      const existingItem = prevCart.find(cartItem => cartItem.product_id === productToAdd.product_id);
      if (existingItem) {
        // If the item already exists in the cart, do not add it again
        return prevCart;
      }
      return [...prevCart, productToAdd]; // Add the new item to the cart
    });
  };


  return (
    <ScrollView style={styles.container}>
      {filteredProducts.map((item) => (
        <View key={item.product_id} style={styles.card}>
          {/* Larger Image */}
          <Image source={imageMap[item.item_name.toLowerCase()]} style={styles.image} />

          {/* Text Content */}
          <View style={styles.info}>
            <Text style={styles.name}>{item.item_name}</Text>
            <Text style={styles.price}>{item.price}</Text>
            <Text style={styles.location}>{item.location_name}</Text>
          </View>

          {/* Add Icon */}
          <TouchableOpacity onPress={() => addToCart(item)}>
          <Ionicons name="add-circle" size={36} color="#4F7726" />
          </TouchableOpacity>
        </View>
      ))}

      {/* No results message */}
      {filteredProducts.length === 0 && (
        <Text style={styles.noResults}>No products found</Text>
      )}
    </ScrollView>
  );
};

export default Buymain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 18,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    height: 120, // Fixed height for each card
  },
  image: {
    width: 80, // Increased image size
    height: 80,
    resizeMode: "contain",
  },
  info: {
    flex: 1,
    marginHorizontal: 15,
    justifyContent: "space-evenly",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  price: {
    fontSize: 16,
    color: "#4F7726",
    fontWeight: "500",
  },
  location: {
    fontSize: 14,
    color: "#6C757D",
  },
  noResults: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#6C757D",
  },
});







