import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ setNavbar,navigation, setNavigation, setUserId, setUname, url, setPassword, setEmail, email, password }) {
 
  

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "All fields are required");
      return;
    }
 
    const loginUser = { email, password };
    console.log("Attempting login with:", loginUser); // Debugging

    
 
    try {
      // Make sure Content-Type is set properly
      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const response = await axios.post(
        `http://${url}:3000/users/login`, 
        loginUser,
        config
      );
      
      console.log("Login response:", response.data); // Debugging
 
      if (response.data.token) {
        const { token, user } = response.data;
       
        setUserId(user.user_id);
        setUname(user.user_name);
        setEmail(user.email);
        setPassword(password);
 
        // Store token securely - use same key as in registration
        await AsyncStorage.setItem("authToken", token);
       
        Alert.alert("Success", "Login Successful");
        setNavbar("main");
        setNavigation(3); // Navigate to the dashboard
      } else {
        Alert.alert("Error", "Invalid login response");
      }
    } catch (error) {
      console.log("Login error details:", error);
      console.log("Login error response:", error.response ? {
        status: error.response.status,
        data: error.response.data
      } : "No response");
     
      if (error.response?.status === 401) {
        Alert.alert("Error", "Invalid email or password");
      } else if (error.response?.status === 404) {
        Alert.alert("Error", "User not found");
      } else {
        Alert.alert("Error", "An error occurred during login. Please check the console for details.");
      }
    }
  };
 
  return (
    <View style={{ flex: 1, width: "100%" }}>
      <Text style={styles.header}>Welcome back! Glad to see you, Again!</Text>
      <View style={{ marginLeft: 40, marginTop: 25, rowGap: 25 }}>
        <TextInput
          style={styles.Inputbox}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.Inputbox}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
        />
        <Pressable onPress={handleLogin}>
          <Text style={[styles.Buttonlike, styles.Inputbox]}>Login</Text>
        </Pressable>
      </View>
      <View style={styles.Lastview}>
        <Text style={styles.Lasttext}>Don't have an account?</Text>
        <Pressable onPress={() => {setNavigation(1)}}>
          <Text style={styles.Register}>Register Now</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { fontSize: 30, paddingLeft: 40, marginTop: 50, fontWeight: "bold" },
  Inputbox: { width: 300, height: 50, borderColor: "gray", borderWidth: 1.5, borderRadius: 7, paddingHorizontal: 10 },
  Buttonlike: { backgroundColor: "black", color: "white", fontWeight: "bold", fontSize: 17, textAlign: "center", padding: 10 },
  Lastview: { marginTop: 35, alignItems: "center" },
  Lasttext: { fontSize: 17 },
  Register: { fontSize: 17, color: "#2CA4BC", fontWeight: "bold" },
});