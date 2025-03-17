import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const ChangePass = ({ goBack }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Function to validate password
  const validatePassword = (password) => {
    return /^(?=.*\d).{8,}$/.test(password); // At least 8 chars, 1 number
  };

  const handleSave = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (!validatePassword(newPassword)) {
      Alert.alert(
        "Error",
        "Password must be at least 8 characters and contain at least one number."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New Password and Confirm Password do not match.");
      return;
    }

    Alert.alert("Success", "Password changed successfully!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Change Password</Text>
      <Text style={styles.subHeader}>
        Secure your account by updating your password.
      </Text>

      {/* Current Password */}
      <View style={styles.inputContainer}>
        <Icon name="lock-closed-outline" size={20} color="#4F4F4F" />
        <TextInput
          style={styles.input}
          placeholder="Current Password"
          secureTextEntry={!showCurrent}
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />
        <TouchableOpacity onPress={() => setShowCurrent(!showCurrent)}>
          <Icon
            name={showCurrent ? "eye-outline" : "eye-off-outline"}
            size={20}
            color="#4F4F4F"
          />
        </TouchableOpacity>
      </View>

      {/* New Password */}
      <View style={styles.inputContainer}>
        <Icon name="lock-closed-outline" size={20} color="#4F4F4F" />
        <TextInput
          style={styles.input}
          placeholder="New Password"
          secureTextEntry={!showNew}
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TouchableOpacity onPress={() => setShowNew(!showNew)}>
          <Icon
            name={showNew ? "eye-outline" : "eye-off-outline"}
            size={20}
            color="#4F4F4F"
          />
        </TouchableOpacity>
      </View>

      {/* Confirm Password */}
      <View style={styles.inputContainer}>
        <Icon name="lock-closed-outline" size={20} color="#4F4F4F" />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={!showConfirm}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
          <Icon
            name={showConfirm ? "eye-outline" : "eye-off-outline"}
            size={20}
            color="#4F4F4F"
          />
        </TouchableOpacity>
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 55,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1C3A13",
  },
  subHeader: {
    fontSize: 14,
    color: "#6B6B6B",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F3F3",
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  saveButton: {
    backgroundColor: "#1C3A13",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  backButton: {
    marginTop: 15,
    alignItems: "center",
  },
  backButtonText: {
    color: "#1C3A13",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ChangePass;
