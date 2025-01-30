import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import axios from "axios";

export default function Register({ setNavigation, data, setData,url }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    // Validation checks
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    if (!email.endsWith("@gmail.com")) {
      Alert.alert("Error", "Email must end with @gmail.com.");
      return;
    }

    if (password.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    // Generate the next ID
    const nextId = Object.keys(data).length + 1;

    // Save user data to the object
    const newUser = {
      user_name: username,
      email: email,
      password: password,
    };

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    try {
      await axios.post(
        `http://${url}:3000/users/newuser`,
        newUser,
        config
      );
      Alert.alert("Success", "Registration Successful!");
      setNavigation(2); // Navigate to Login page
    } catch (error) {
      if (error.response?.status === 409) {
        Alert.alert(
          
          "Error",
          "Email already exists. Please use a different email."
        );
      } else {
        console.error("Error posting data:", error);
        Alert.alert(
          "Error",
          "Failed to register user. Please try again later."
        );
      }
    }
  };

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <Text style={styles.header}>Hi There!!</Text>
      <Text style={styles.header}>Register Below</Text>
      <View style={{ rowGap: 25, marginLeft: 40, marginTop: 25 }}>
        <TextInput
          style={styles.Inputbox}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.Inputbox}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.Inputbox}
          placeholder="Password"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.Inputbox}
          placeholder="Confirm Password"
          value={confirmPassword}
          secureTextEntry
          onChangeText={setConfirmPassword}
        />
        <Pressable onPress={handleRegister}>
          <Text style={[styles.Buttonlike, styles.Inputbox]}>
            Agree and Register
          </Text>
        </Pressable>
      </View>
      <View style={styles.Lastview}>
        <Text style={styles.Lasttext}>Already have an account?</Text>
        <Pressable onPress={() => setNavigation(2)}>
          <Text style={styles.Login}>Login Here</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 35,
    paddingLeft: 40,
    marginTop: 20,
    fontWeight: "bold",
  },
  Inputbox: {
    width: 300,
    height: 50,
    borderColor: "gray",
    borderWidth: 1.5,
    borderRadius: 7,
    paddingHorizontal: 10,
  },
  Buttonlike: {
    backgroundColor: "black",
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
    padding: 10,
    textAlign: "center",
  },
  Lastview: {
    marginTop: 35,
    alignItems: "center",
    width: "100%",
  },
  Lasttext: {
    textAlign: "center",
    fontSize: 17,
  },
  Login: {
    textAlign: "center",
    fontSize: 17,
    color: "#2CA4BC",
    fontWeight: "bold",
  },
});
