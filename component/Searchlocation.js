import { View, Text, StyleSheet ,Pressable} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useState, useEffect } from "react";
import axios from "axios";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
const Searchlocation = ({ locpage, setLocpage, city, setCity }) => {
  const [locopen, setLocopen] = useState(true);
  const [locvalue, setLocvalue] = useState(null);
  const [locitems, setLocitems] = useState([]);

  useEffect(() => {
    const getLocation = async () => {
      try { 
        const { data } = await axios.get("http://192.168.133.188:3000/locations");
        const formattedLocations = data.map((location) => ({
          label: location.location_name,
          value: location.location_name, // Changed to location_name to match API requirements
        }));
        setLocitems(formattedLocations);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    getLocation();
  }, []);

  const handleSearch = () => {
    setCity(locvalue);
    
  };
  const handlePress=()=>{
    setLocpage(1);
  }

  return (
    <View style={styles.container}>
      <DropDownPicker
        style={styles.Textbox}
        open={locopen}
        value={locvalue}
        items={locitems}
        setOpen={setLocopen}
        setItems={setLocitems}
        setValue={setLocvalue}
        placeholder={
          <View style={styles.field}>
            <Ionicons
              name="search"
              size={20}
              color="#255957"
              style={styles.icon}
            />
            <Text style={styles.placeholderText}>Search for your city</Text>
          </View>
        }
        searchable={true}
        searchPlaceholder="Search locations..."
        onChangeValue={handleSearch}
      ></DropDownPicker>
      
      <Pressable onPress={handlePress}>
        <View style={{margin:30,height:40,width:90,backgroundColor:"green",alignItems:"center",justifyContent:"center",borderRadius:9}}>
      <Text style={{textAlign:"center",fontSize:16,fontWeight:"bold"}} >Done</Text>
      </View>
      </Pressable>
    </View>
  );
};
export default Searchlocation;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2FBD4",
    paddingTop: 50,
    alignItems: "center",
  },
  Textbox: {
    borderRadius: 0,
    borderWidth: 0,
    borderColor: "gray",
    padding: 0,
    width: "100%",
    height: 45,
    backgroundColor: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 17,
  },
  icon: {
    marginRight: 10,
  },
  field: { flexDirection: "row" },
  placeholderText: { fontWeight: "condensed", fontSize: 14, color: "gray" },
});
