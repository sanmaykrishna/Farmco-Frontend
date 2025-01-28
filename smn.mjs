import { View, Text, Pressable } from "react-native";
import axios from "axios";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const Sellitem = () => {
  const getItem = async () => {
    try {
      const { data } = await axios.get("http://10.0.2.2:3000/items");
      console.log(data); // Log data after fetching it
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  

  return (
    <View>
        <Pressable onPress={getItem}>
      <Text>dsdsd</Text>
      </Pressable>
    </View>
  );
};

export default Sellitem;
