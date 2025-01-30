import { View, Text, StyleSheet, Platform, StatusBar } from "react-native";
import Buypage from "./Buypage";
import Navbar from "./component/Navbar";
import { useState } from "react";
import Sellpage from "./Sellpage";
import axios from "axios";
import Cropyield from "./Cropyield";
import Login from "./authorize/Login";
import Register from "./authorize/Register";
const App = () => {
  const [navigation, setNavigation] = useState(3);
  const [city, setCity] = useState("None");
  const [data, setData] = useState({});
  const [userId, setUserId] = useState(null);

  const url="192.168.0.190";
  const containerStyle = navigation === 1 || navigation === 2 ? styles.container1 : styles.container2;
  return (
    <View style={containerStyle}>
      {navigation === 1 ? (
        <Register
          navigation={navigation}
          setNavigation={setNavigation}
          data={data}
          setData={setData}
          url={url}
        />
      ) : navigation === 2 ? (
        <Login
          navigation={navigation}
          setNavigation={setNavigation}
          data={data}
          setData={setData}
          userId={userId}
          setUserId={setUserId}
          url={url}
        />
      ) : navigation === 3 ? (
        <Buypage city={city} setCity={setCity} url={url}/>
      ) : navigation == 4 ? (
        <Sellpage userId={userId} setUserId={setUserId} url={url}/>
      ) : navigation == 5 ? (
        <Cropyield url={url}/>
      ) : null}
      <Navbar navigation={navigation} setNavigation={setNavigation} url={url} />
    </View>
  );
};
export default App;

const styles = StyleSheet.create({
  container2: { flex: 1, backgroundColor: "#F2FBD4" },
  container1: { flex: 1, backgroundColor: "white", paddingTop: 50 },
});
