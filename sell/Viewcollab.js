import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Pressable } from "react-native";
import axios from "axios";
import CollabCard from "./CollabCard"; // Import CollabCard

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
};

const Viewcollab = ({ search, city, url,setTopbar,userId }) => {
  const [collabs, setCollabs] = useState([]);
  const [activeScreen, setActiveScreen] = useState("list");
  const [selectedCollab, setSelectedCollab] = useState(null);

  useEffect(() => {
    const fetchCollabs = async () => {
      try {
        const apiUrl = `http://${url}:3000/collab/location?location_name=${encodeURIComponent(city)}`;
        const response = await axios.get(apiUrl);
        setCollabs(response.data || []);
      } catch (error) {
        console.error("❌ Error fetching collabs:", error.response ? error.response.data : error.message);
      }
    };

    if (city) {
      fetchCollabs();
    }
  }, [city]);

  const filteredCollabs = collabs.filter((item) => {
    const itemName = item.item_name?.toLowerCase() || "";
    const searchQuery = search.toLowerCase();
    return itemName.includes(searchQuery);
  });

  // If active screen is "collabCard", show the details page
  if (activeScreen === "collabCard" && selectedCollab) {
    return <CollabCard userId={userId} setTopbar={setTopbar} url={url} collab={selectedCollab} goBack={() => setActiveScreen("list")} />;
  }

  // Main list of collaborations
  return (
    <ScrollView style={styles.container}>
      {filteredCollabs.length > 0 ? (
        filteredCollabs.map((item) => {
          const imageSource = imageMap[item.item_name.toLowerCase()];

          return (
            <Pressable
              key={item.collab_id}
              style={styles.card}
              onPress={() => {
                setSelectedCollab(item);
                setActiveScreen("collabCard");
              }}
            >
              {imageSource ? (
                <Image source={imageSource} style={styles.image} />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Text style={styles.placeholderText}>No Image</Text>
                </View>
              )}

              <View style={styles.info}>
                <Text style={styles.name}>{item.item_name}</Text>
                <Text style={styles.price}>₹{item.price}</Text>
                <Text style={styles.location}>{item.location_name}</Text>
              </View>
              <View>
                <Text style={styles.name}>{item.quantity}</Text>
              </View>
            </Pressable>
          );
        })
      ) : (
        <Text style={styles.noResults}>No collaborations found</Text>
      )}
    </ScrollView>
  );
};

export default Viewcollab;

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, marginTop: 18 },
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
    height: 120,
    width: "98%",
  },
  image: { width: 80, height: 80, resizeMode: "contain" },
  imagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  placeholderText: { fontSize: 12, color: "#555" },
  info: { flex: 1, marginHorizontal: 15, justifyContent: "space-evenly" },
  name: { fontSize: 18, fontWeight: "bold", color: "#333" },
  price: { fontSize: 16, color: "#4F7726", fontWeight: "500" },
  location: { fontSize: 14, color: "#6C757D" },
  noResults: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#6C757D",
  },
});
