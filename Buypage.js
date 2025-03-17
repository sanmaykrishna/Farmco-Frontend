import { View, Text, StyleSheet, Platform, StatusBar } from "react-native";
import Buytopbar from "./component/Buytopbar";
import Buymain from "./component/Buymain";
import Buymaincollab from "./component/Buymaincollab";
import Navbar from "./component/Navbar";
import { useState } from "react";
import Searchlocation from "./component/Searchlocation";

const Buypage = ({ city, setCity, url, setNavigation, setCartItems }) => {
  const [search, setSearch] = useState("");
  const [locpage, setLocpage] = useState(1);
  const [buyorcollab,setBuyorcollab]=useState(1);
  const [topbar, setTopbar] = useState("main");


  return (
    <View style={styles.container}>
      {locpage === 1 ? (
        <>
        {topbar == "main" ? (
          <Buytopbar
            search={search}
            setSearch={setSearch}
            locpage={locpage}
            setLocpage={setLocpage}
            city={city}
            setCity={setCity}
            url={url}
            setNavigation={setNavigation}
            setBuyorcollab={setBuyorcollab}
            buyorcollab={buyorcollab}
          />): null}
          {buyorcollab==1?
          <Buymain
            setTopbar={setTopbar}
            search={search}
            city={city}
            setCity={setCity}
            url={url}
            setCartItems={setCartItems}
          />:<Buymaincollab search={search}
          city={city}
          setCity={setCity}
          url={url}
          setCartItems={setCartItems}/>}
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
