import { View, Text, StyleSheet, Platform, StatusBar } from "react-native";
import Buytopbar from "./component/Buytopbar";
import Buymain from "./component/Buymain";
import Navbar from "./component/Navbar";
import { useState } from "react";
import Searchlocation from "./component/Searchlocation";

const Buypage = ({city,setCity}) => {
  const [search, setSearch] = useState("");
  const [locpage, setLocpage] = useState(1);
  
  return (
    <View style={styles.container}>
      {locpage === 1 ? (
        <>
          <Buytopbar search={search} setSearch={setSearch} locpage={locpage} setLocpage={setLocpage} city={city} setCity={setCity}/>
          <Buymain search={search} city={city} setCity={setCity}/>
        </>
      ) : (
        <Searchlocation locpage={locpage} setLocpage={setLocpage} city={city} setCity={setCity}/>
      )}
    </View>
  );
};
export default Buypage;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2FBD4" },
});
