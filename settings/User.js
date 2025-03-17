import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";

const User = ({ goBack, userid, email, username, url }) => {
  const [building, setBuilding] = useState("");
  const [place, setPlace] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://${url}:3000/profile/${userid}`
        );
        const profileData = response.data;

        if (profileData) {
          setBuilding(profileData.building || "");
          setPlace(profileData.place || "");
          setPincode(profileData.pincode || "");
          setPhone(profileData.phone || "");
        }
      } catch (err) {
        if (err.response?.status === 404) {
          try {
            await axios.post(`http://${url}:3000/profile`, {
              userid,
              email,
              username,
            });
            const newProfileResponse = await axios.get(
              `${url}/profile/${userid}`
            );
            const newProfileData = newProfileResponse.data;
            setBuilding(newProfileData.building || "");
            setPlace(newProfileData.place || "");
            setPincode(newProfileData.pincode || "");
            setPhone(newProfileData.phone || "");
          } catch (postError) {
            setError("Failed to create user profile");
          }
        } else {
          setError(
            err.response?.data?.message || "Error fetching user profile"
          );
        }
      }
    };

    if (userid) {
      fetchUserProfile();
    }
  }, [userid]);

  const handleSave = async () => {
    try {
      console.log("Sending profile update:", { userid, email, username, building, place, pincode, phone });
  
      const response = await axios.post(`http://${url}:3000/profile`, {
        userid,
        email,
        username,
        building,
        place,
        pincode,
        phone,
      });
  
      console.log("Profile saved successfully:", response.data);
      Alert.alert("Success", "Profile saved successfully.");
    } catch (err) {
      console.log("Profile Save Error:", err.response?.data || err.message);
      Alert.alert("Error", err.response?.data?.message || "Failed to save profile.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Profile</Text>
      {error && (
        <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
      )}

      <Text style={styles.label}>Username</Text>
      <TextInput style={styles.input} value={username} editable={false} />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} editable={false} />

      <Text style={styles.label}>Building Name</Text>
      <TextInput
        style={styles.input}
        value={building}
        onChangeText={setBuilding}
      />

      <Text style={styles.label}>Place</Text>
      <TextInput style={styles.input} value={place} onChangeText={setPlace} />

      <Text style={styles.label}>Pincode</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        maxLength={6}
        value={pincode}
        onChangeText={setPincode}
      />

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        keyboardType="phone-pad"
        maxLength={10}
        value={phone}
        onChangeText={setPhone}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1C3A13",
    marginBottom: 20,marginTop:50
  },
  label: { fontSize: 16, fontWeight: "500", color: "#333", marginTop: 10 },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 5,
    fontSize: 14,
  },
  saveButton: {
    backgroundColor: "#1C3A13",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  saveButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  backButton: { marginTop: 15, alignItems: "center" },
  backButtonText: { color: "#1C3A13", fontSize: 16, fontWeight: "bold" },
});

export default User;
