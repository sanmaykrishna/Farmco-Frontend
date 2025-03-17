import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  BackHandler,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import User from "./User";
import ChangePass from "./ChangePass";
import Location from "./Location";

const AccountSettings = ({
  userId,
  setUname,
  setPassword,
  setEmail,
  email,
  password,
  uname,url
}) => {
  const settingsOptions = [
    {
      id: "1",
      title: "Profile Information",
      subtitle: "Change your account information",
      icon: "person-outline",
    },
    {
      id: "2",
      title: "Change Password",
      subtitle: "Change your password",
      icon: "lock-closed-outline",
    },
    {
      id: "3",
      title: "Locations",
      subtitle: "Add or remove your delivery locations",
      icon: "location-outline",
    },
  ];
  const [activeScreen, setActiveScreen] = useState(null);

  // Handle Android back button
  useEffect(() => {
    const handleBackPress = () => {
      if (activeScreen) {
        setActiveScreen(null); // Go back to settings
        return true; // Prevent default back behavior
      }
      return false; // Allow default back behavior
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, [activeScreen]);

  // Render the selected screen
  if (activeScreen === "User")
    return (
      <User
        userid={userId}
        setUname={setUname}
        setPassword={setPassword}
        setEmail={setEmail}
        email={email}
        password={password}
        username={uname} url={url}
        goBack={() => setActiveScreen(null)}
      />
    );
  if (activeScreen === "ChangePass")
    return <ChangePass goBack={() => setActiveScreen(null)} />;
  if (activeScreen === "Location")
    return <Location goBack={() => setActiveScreen(null)} />;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Account Settings</Text>
      <Text style={styles.subHeader}>
        Update your settings like notifications, profile edit, etc.
      </Text>

      <FlatList
        data={settingsOptions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.option}
            onPress={() =>
              setActiveScreen(
                item.title === "Profile Information"
                  ? "User"
                  : item.title === "Change Password"
                  ? "ChangePass"
                  : item.title === "Locations"
                  ? "Location"
                  : null
              )
            }
          >
            <Icon
              name={item.icon}
              size={24}
              color="#4F4F4F"
              style={styles.icon}
            />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
            </View>
            <Icon name="chevron-forward-outline" size={20} color="#4F4F4F" />
          </TouchableOpacity>
        )}
      />
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
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA",
  },
  icon: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1C1C1C",
  },
  subtitle: {
    fontSize: 12,
    color: "#6B6B6B",
  },
});

export default AccountSettings;
