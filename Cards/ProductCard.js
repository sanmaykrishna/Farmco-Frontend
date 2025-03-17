import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MapPin, Phone, User } from "lucide-react-native";

const ProductCard = ({ productsolo, url, goback, setTopbar, setCartItems }) => {
  const [profile, setProfile] = useState({});
  const [users, setUsers] = useState({});

  useEffect(() => {
    setTopbar("notmain");

    const fetchProfile = async () => {
      try {
        setTopbar("new");
        const apiUrl = `http://${url}:3000/profile/${productsolo.user_id}`;
        const response = await axios.get(apiUrl);
        setProfile(response.data);
      } catch (error) {
        console.error("❌ Error fetching profile:", error.response?.data || error.message);
      }
    };

    const fetchUser = async () => {
      try {
        const apiUrl2 = `http://${url}:3000/users/${productsolo.user_id}`;
        const response2 = await axios.get(apiUrl2);
        setUsers(response2.data);
      } catch (error) {
        console.error("❌ Error fetching users:", error.response?.data || error.message);
      }
    };

    if (productsolo.user_id) {
      fetchProfile();
      fetchUser();
    }
  }, [productsolo.user_id, url]);

  const addToCart = () => {
    const productToAdd = {
      product_id: productsolo.product_id,
      item_name: productsolo.item_name,
      price: parseFloat(productsolo.price),
      available_quantity: productsolo.quantity,
      quantity: 1,
    };

    setCartItems((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem.product_id === productToAdd.product_id
      );
      return existingItem ? prevCart : [...prevCart, productToAdd];
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=1000" }}
            style={styles.image}
          />
        </View>
        <View style={styles.productInfo}>
          <View style={styles.productDetails}>
            <View style={styles.productHeader}>
              <Text style={styles.productName}>Fresh {productsolo.item_name}</Text>
              <Text style={styles.productPrice}>₹{productsolo.price}/kg</Text>
            </View>
            <Text style={styles.productDescription}>
              Premium quality farm-fresh {productsolo.item_name}, perfect for daily cooking needs.
            </Text>
          </View>

          <View style={styles.farmerDetails}>
            <View style={styles.farmerHeader}>
              <User color="#22C55E" size={20} />
              <Text style={styles.farmerHeaderText}>Product Owner Details</Text>
            </View>
            <Text style={styles.farmerName}>{users.user_name}</Text>
            <View style={styles.farmerContact}>
              <View style={styles.farmerAddress}>
                <MapPin color="#22C55E" size={20} />
                <Text style={styles.farmerAddressText}>
                  {productsolo.address} {profile.place} {productsolo.location_name} - {profile.pincode}
                </Text>
              </View>
              <View style={styles.farmerPhone}>
                <Phone color="#22C55E" size={20} />
                <Text style={styles.farmerPhoneText}>{profile.phone}</Text>
              </View>
            </View>
          </View>

          <View style={styles.quantitySection}>
            <Text style={styles.quantityHeader}>Available Quantity</Text>
            <Text style={styles.quantityValue}>{productsolo.quantity} Kg</Text>
          </View>

          <TouchableOpacity style={styles.addButton} onPress={addToCart}>
            <Text style={styles.addButtonText}>Add To Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  imageContainer: { width: "100%", height: 288 },
  image: { width: "100%", height: "100%" },
  productInfo: { padding: 16, gap: 24 },
  productDetails: { gap: 8 },
  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  productName: { fontSize: 24, fontWeight: "bold" },
  productPrice: { fontSize: 20, fontWeight: "bold" },
  productDescription: { color: "#6B7280" },
  farmerDetails: {
    backgroundColor: "#E8FFE8",
    padding: 16,
    borderRadius: 8,
    gap: 12,
  },
  farmerHeader: { flexDirection: "row", alignItems: "center", gap: 8 },
  farmerHeaderText: { fontSize: 16, fontWeight: "600" },
  farmerName: { fontSize: 18, fontWeight: "600" },
  farmerContact: { gap: 8 },
  farmerAddress: { flexDirection: "row", alignItems: "center", gap: 8 },
  farmerPhone: { flexDirection: "row", alignItems: "center", gap: 8 },
  farmerAddressText: { color: "#6B7280" },
  farmerPhoneText: { color: "#6B7280" },
  quantitySection: {
    backgroundColor: "#E8FFE8",
    padding: 16,
    borderRadius: 8,
    gap: 12,
  },
  quantityHeader: { fontSize: 16, fontWeight: "600" },
  quantityValue: { fontSize: 28, fontWeight: "bold", color: "#22C55E" },
  addButton: {
    backgroundColor: "#22C55E",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: { color: "white", fontSize: 16, fontWeight: "600" },
});

export default ProductCard;
