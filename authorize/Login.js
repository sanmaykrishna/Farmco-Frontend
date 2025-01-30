import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, Alert } from "react-native";
import axios from "axios";

export default function Login({ navigation, setNavigation, data,userId,setUserId,url }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    const loginUser = {
      email: email,
      password: password,
    };

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    try {
      const response = await axios.post(`http://${url}:3000/users/login`, loginUser, config);
      
      Alert.alert("Success", "Login Successful");
      
      setUserId(response.data.user.user_id); // Store the user_id in the state
      console.log("Logged in user_id:", response.data.user.user_id);
      
      setNavigation(3); // Navigate to the next screen
    } catch (error) {
      if (error.response?.status === 401) {
        Alert.alert("Error", "Invalid email or password");
      } else if (error.response?.status === 404) {
        Alert.alert("Error", "User not found");
      } else {
        Alert.alert("Error", "An error occurred during login");
        console.error("Login error:", error);
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
        />
        <TextInput
          style={styles.Inputbox}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Pressable onPress={handleLogin}>
          <Text style={[styles.Buttonlike, styles.Inputbox]}>Login</Text>
        </Pressable>
      </View>
      <View style={styles.Lastview}>
        <Text style={styles.Lasttext}>Don’t have an account?</Text>
        <Pressable onPress={() => setNavigation(1)}>
          <Text style={styles.Register}>Register Now</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    paddingLeft: 40,
    marginTop: 50,
    fontWeight: "bold",
  },
  Inputbox: {
    width: 300,
    height: 50,
    borderColor: "gray",
    borderStyle: "solid",
    borderWidth: 1.5,
    borderRadius: 7,
  },
  Buttonlike: {
    backgroundColor: "black",
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
    textAlign: "center",
    padding: 10,
  },
  Lastview: {
    marginTop: 35,
    alignItems: "center",
  },
  Lasttext: {
    textAlign: "center",
    fontSize: 17,
  },
  Register: {
    textAlign: "center",
    fontSize: 17,
    color: "#2CA4BC",
    fontWeight: "bold",
  },
});
