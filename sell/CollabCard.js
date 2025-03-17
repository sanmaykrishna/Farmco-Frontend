import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Image ,Modal,Pressable,TouchableOpacity,TextInput,Alert} from "react-native";
import axios from "axios";

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

      {/* <Button title="Back" onPress={() => { goBack(); bringTopbar(); }} /> */}


const CollabCard = ({ userId,collab, goBack, url, setTopbar }) => {
  const [profile, setProfile] = useState({}); // State to hold profile data
  const [users, setUsers] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [quantity, setQuantity] = useState('');
  const [total,setTotal]=useState(0);
  const [count,setCount]=useState(0);
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setTopbar("new");
        const apiUrl = `http://${url}:3000/profile/${collab.user_id}`;
        const response = await axios.get(apiUrl);
        setProfile(response.data); // Set the profile data
        
      } catch (error) {
        console.error(
          "❌ Error fetching profile:",
          error.response ? error.response.data : error.message
        );
      }
    };

    const fetchUser = async () => {
        try {
          const apiUrl2 = `http://${url}:3000/users/${collab.user_id}`;
          const response2 = await axios.get(apiUrl2);
          setUsers(response2.data); // Set the profile data
        } catch (error) {
          console.error(
            "❌ Error fetching users:",
            error.response ? error.response.data : error.message
          );
        }
      };

      


    if (collab.user_id) {
      fetchProfile(); // Fetch profile if user_id is available
      fetchUser();
      
    }
  }, [collab.user_id, url]); // Dependency array includes user_id and url

  useEffect(() => {
    const fetchTotalQuantity = async () => {
      try {
        const apiUrl3 = `http://${url}:3000/quantity/total?collabid=${collab.collab_id}`;
        const response3 = await axios.get(apiUrl3);
        console.log("✅ Full Response:", response3.data);
        if (response3.data.totalQuantity !== undefined) {
          setTotal(response3.data.totalQuantity);
        } else {
          console.error("❌ Error: totalQuantity is missing in response");
        }
      } catch (error) {
        console.error("❌ Error fetching total quantity:", error);
      }
    };


    const fetchTotalCount = async () => {
        try {
          const apiUrl4 = `http://${url}:3000/quantity/user-count?collabid=${collab.collab_id}`;
          const response4 = await axios.get(apiUrl4);
          console.log("✅ Full Response:", response4.data);
          if (response4.data.userCount !== undefined) {
            setCount(response4.data.userCount);
          } else {
            console.error("❌ Error: userCount is missing in response");
          }
        } catch (error) {
          console.error("❌ Error fetching user count:", error);
        }
      };
  
    if (collab.collab_id) {
      fetchTotalQuantity();
      fetchTotalCount();
    }
  }, [collab.collab_id, url]);
  
  
  const bringTopbar = () => {
    setTopbar("view");
  };

  // Get the image source based on the item name
const imageSource = imageMap[collab.item_name.toLowerCase()] || null;

const handlePress = async () => {
    console.log(collab.collab_id);
    if (!quantity) {
        Alert.alert("Error", "Quantity is required");
        return;
    }

    if (!collab.collab_id) {
        Alert.alert("Error", "Collab ID is missing!");
        return;
    }

    const objqty = {
        collabid: Number(collab.collab_id), // Convert to number
        empid: Number(userId), // Convert to number
        qty: Number(quantity), // Convert to number
    };

    console.log("📤 Sending Request:", JSON.stringify(objqty)); // Debugging Log

    try {
        const response = await axios.post(`http://${url}:3000/quantity/alternate`, objqty, {
            headers: { "Content-Type": "application/json" },
        });

        console.log("✅ Response Data:", response.data); // Debugging Log
        Alert.alert("Success", "Adding Collab Successful!");
    } catch (error) {
        console.error(
            "❌ Error adding collab:",
            error.response ? error.response.data : error.message
        );
        Alert.alert("Error", error.response ? JSON.stringify(error.response.data) : error.message);
    }
};


  return (
    <View style={styles.container}>

<Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            {/* Display Items */}
            <Text style={styles.itemText}>Item 1</Text>
            <Text style={styles.itemText}>Item 2</Text>
            <Text style={styles.itemText}>Item 3</Text>
            <Text style={styles.itemText}>Item 4</Text>

            {/* Quantity Input Field */}
            <Text style={styles.label}>Enter Quantity:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Quantity"
              keyboardType="numeric"
              value={quantity}
              onChangeText={(text) => setQuantity(text)}
            />

            {/* Close Button */}
            <TouchableOpacity style={styles.closeButton} onPress={() => {setModalVisible(false),handlePress()}}>
              <Text style={styles.closeButtonText}>ADD To Collab</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>


      <View style={styles.imageContainer}>
        {imageSource ? (
          <Image source={imageSource} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderText}>No Image</Text>
          </View>
        )}
      </View>

      <View style={styles.detailsContainer}>

        <View style={{flex:1,flexDirection:"row",marginTop:0,marginBottom:0}}>
            <View style={{flex:1,gap:0}}>
                <Text style={styles.VegnameText}>{collab.item_name}</Text>
                <Text style={styles.FreshText}>Fresh Vegetables</Text>
            </View>
            <Text style={styles.PriceText}>Rs:{collab.price}<Text style={styles.KgText}>/Kg</Text></Text>
        </View>

        <View style={{flex:1,flexDirection:"row",backgroundColor:"orange"}}>
            <View style={{flex:1,marginLeft:1}}>
                <Text style={styles.CollabText}>Collab Owner</Text>
                <Text style={styles.NameText}>{users.user_name}</Text>
            </View>
            <View style={{flex:1,marginLeft:100}}>
                <Text style={styles.CollabText}>Icon</Text>
                <Text style={styles.NameText}>{count}</Text>
            </View>
        </View>
        <View style={{flex:1,flexDirection:"column",backgroundColor:"pink"}}>
            <Text style={styles.AddressText}>Address                                                                                       </Text>
            <Text>{collab.address} {collab.location_name} {profile.place}  {profile.pincode}{users.address} {collab.pincode}</Text>
        </View>


        <View style={styles.quantityBox}>
          <Text style={styles.quantityText}>Initial Quantity: {collab.quantity} Kg</Text>
        </View>
        <View style={styles.quantityBox}>
          <Text style={styles.quantityText}>Final Quantity: {total} Kg</Text>
        </View>
        <Pressable onPress={() => setModalVisible(true)}>
        <View style={styles.buttonBox}>
          <Text style={styles.buttonText}>Add Collab</Text>
        </View>
        </Pressable>
        
      </View>
    </View>

      
  );
};

export default CollabCard;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width:"100%",
      backgroundColor: "#FFFFFF",
      
    },
    imageContainer: {
      flex: 2, // Takes 20% of screen height
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#FFFFFF",
      width: "100%",
    },
    detailsContainer: {
      flex: 3, // Takes 30% of screen height
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F2FBD4",
      width: "100%",
      padding: 20,
      borderRadius: 10,
      gap:2
    },
    image: {
      width: 200,
      height: 168,
      resizeMode: "contain",
    },
    imagePlaceholder: {
      width: 100,
      height: 100,
      backgroundColor: "#FFFFFF",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
    },
    placeholderText: {
      fontSize: 12,
      color: "#555",
    },
    quantityBox: {
      backgroundColor: "#D2E99E",
      padding: 10,
      marginBottom: 10,
      borderRadius: 8,
      width: "80%",
      height:60,
      alignItems: "center",
      marginTop: 5,
    },
    quantityText: {
      marginTop:6,
      fontSize: 19,
      color: "#473232",
      fontWeight:"bold"
    },
    buttonBox: {
        backgroundColor: "#F39107",
        padding: 10,
        marginTop: 8,
        borderRadius: 13,
        width: "58%",
        height:60,
        alignItems: "center",
      },
      buttonText: {
        marginTop:6,
        fontSize: 19,
        color: "#FFFFFF",
        fontWeight:"bold"
      },
      VegnameText: {
        marginTop:6,
        fontSize: 28,
        fontFamily:"Urbanist",
        color: "black",
        fontWeight:"bold"
      },
      FreshText: {
        marginTop:6,
        marginLeft:2,
        fontSize: 14,
        fontFamily:"Urbanist",
        color: "gray",
        fontWeight:"bold"
      },
      PriceText: {
        marginTop:6,
        marginRight:5,
        fontSize: 35,
        fontFamily:"Urbanist",
        color: "black",
        fontWeight:"bold"
      },
      KgText: {
        marginTop:6,
        marginRight:5,
        fontSize: 20,
        fontFamily:"Urbanist",
        color: "gray",
        fontWeight:"bold"
      },
      CollabText: {
        marginTop:6,
        marginRight:5,
        fontSize: 20,
        fontFamily:"Urbanist",
        color: "black",
        fontWeight:"bold"
      },
      NameText: {
        marginTop:0,
        marginRight:5,
        fontSize: 20,
        fontFamily:"Urbanist",
        color: "black",
        fontWeight:"bold"
      },
      AddressText: {
        marginTop:0,
        marginRight:5,
        fontSize: 14,
        fontFamily:"Urbanist",
        color: "black",
        fontWeight:"bold"
      },
      overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dim background
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContainer: {
        width: "90%", // 90% of screen width
        height: "80%", // 80% of screen height
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      itemText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
      },
      input: {
        width: '80%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 16,
        marginTop: 5,
      },
      closeButton: {
        marginTop: 20,
        backgroundColor: '#ff4757',
        padding: 10,
        borderRadius: 8,
      },

  });