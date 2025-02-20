import { View, Text, StyleSheet, Platform, StatusBar } from "react-native";
import Buytopbar from "./component/Buytopbar";
import Buymain from "./component/Buymain";
import Navbar from "./component/Navbar";
import { useState } from "react";
import Searchlocation from "./component/Searchlocation";

const Buypage = ({ city, setCity, url, setNavigation, setCartItems }) => {
  const [search, setSearch] = useState("");
  const [locpage, setLocpage] = useState(1);

  return (
    <View style={styles.container}>
      {locpage === 1 ? (
        <>
          <Buytopbar
            search={search}
            setSearch={setSearch}
            locpage={locpage}
            setLocpage={setLocpage}
            city={city}
            setCity={setCity}
            url={url}
            setNavigation={setNavigation}
          />
          <Buymain
            search={search}
            city={city}
            setCity={setCity}
            url={url}
            setCartItems={setCartItems}
          />
        </>
      ) : (
        <Searchlocation
          locpage={locpage}
          setLocpage={setLocpage}
          city={city}
          setCity={setCity}
          url={url}
        />
      )}
    </View>
  );
};
export default Buypage;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2FBD4" },
});
