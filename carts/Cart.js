import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const Cart = ({ cartItems, setCartItems }) => {
  const updateQuantity = (id, increment) => {
    const item = cartItems.find((item) => item.product_id === id);
    if (!item) return;

    const newQuantity = item.quantity + increment;

    // Check if the new quantity exceeds available quantity
    if (newQuantity > item.available_quantity) {
      alert(
        `Cannot add more than ${item.available_quantity} of ${item.item_name}`
      );
      return;
    }

    const updatedItems = cartItems.map((cartItem) =>
      cartItem.product_id === id
        ? { ...cartItem, quantity: newQuantity }
        : cartItem
    );

    setCartItems(updatedItems);
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.cartInfo}>
        <Text style={styles.cartName}>{item.item_name}</Text>
        <Text style={styles.cartPrice}>
          ₹{(item.price * (item.quantity || 1)).toFixed(2)}
        </Text>
      </View>
      <View style={styles.cartActions}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => updateQuantity(item.product_id, -1)}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity || 1}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => updateQuantity(item.product_id, 1)}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyCartContainer}>
        <MaterialIcons name="shopping-cart" size={64} color="#ccc" />
        <Text style={styles.emptyCartText}>Your cart is empty</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.product_id.toString()}
      />
      <View style={styles.footer}>
        <Text style={styles.total}>
          Total: ₹
          {cartItems
            .reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
            .toFixed(2)}
        </Text>
        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={() => console.log("Place Order")}
        >
          <Text style={styles.placeOrderText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 70,
    backgroundColor: "#fff",
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  cartInfo: {
    flex: 3,
  },
  cartName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cartPrice: {
    fontSize: 14,
    color: "#4caf50",
    marginVertical: 4,
  },
  cartActions: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#4caf50",
    borderRadius: 4,
    padding: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 8,
  },
  footer: {
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingTop: 16,
    alignItems: "center",
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
  },
  placeOrderButton: {
    backgroundColor: "#4caf50",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  placeOrderText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  emptyCartText: {
    fontSize: 18,
    color: "#888",
    marginTop: 16,
  },
});

export default Cart;
