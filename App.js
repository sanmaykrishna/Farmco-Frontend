import { View, Text, StyleSheet, Platform, StatusBar } from "react-native";
import Buypage from "./Buypage";
import Navbar from "./component/Navbar";
import { use, useState } from "react";
import Sellpage from "./Sellpage";
import axios from "axios";
import Cropyield from "./Cropyield";
import Login from "./authorize/Login";
import Register from "./authorize/Register";
import Cart from "./carts/Cart";
import AccountSettings from "./settings/AccountSettings";

//settings->14
//Register->1
//Login->2

const App = () => {
  const [navigation, setNavigation] = useState(3);
  const [city, setCity] = useState("None");
  const [collabcity, setCollabcity] = useState("None");
  const [data, setData] = useState({});
  const [userId, setUserId] = useState(1);
  const [uname, setUname] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [navbar, setNavbar] = useState("main");

  const url = "192.168.1.23";
  const containerStyle =
    navigation === 1 || navigation === 2
      ? styles.container1
      : styles.container2;
  return (
    <View style={containerStyle}>
      {navigation === 1 ? (
        <Register
          setNavbar={setNavbar}
          navigation={navigation}
          setNavigation={setNavigation}
          data={data}
          setData={setData}
          url={url}
        />
      ) : navigation === 2 ? (
        <Login
          setNavbar={setNavbar}
          navigation={navigation}
          setNavigation={setNavigation}
          data={data}
          setData={setData}
          userId={userId}
          setUserId={setUserId}
          url={url}
          setUname={setUname}
          setPassword={setPassword}
          setEmail={setEmail}
          email={email}
          password={password}
        />
      ) : navigation === 3 ? (
        <Buypage
          city={city}
          setCity={setCity}
          url={url}
          setNavigation={setNavigation}
          setCartItems={setCartItems}
        />
      ) : navigation == 4 ? (
        <Sellpage
          userId={userId}
          setUserId={setUserId}
          url={url}
          navigation={navigation}
          setNavigation={setNavigation}
          collabcity={collabcity}
          setCollabcity={setCollabcity}
        />
      ) : navigation == 5 ? (
        <Cropyield url={url} />
      ) : navigation == 6 ? (
        <Cart url={url} cartItems={cartItems} setCartItems={setCartItems} />
      ) : navigation == 14 ? (
        <AccountSettings
          userId={userId}
          setUname={setUname}
          setPassword={setPassword}
          setEmail={setEmail}
          email={email}
          password={password}
          uname={uname}
          url={url}
        />
      ) : null}
      {navbar == "main" ? (
        <Navbar
          navigation={navigation}
          setNavigation={setNavigation}
          url={url}
        />
      ) : null}
    </View>
  );
};
export default App;

const styles = StyleSheet.create({
  container2: { flex: 1, backgroundColor: "#F2FBD4" },
  container1: { flex: 1, backgroundColor: "white", paddingTop: 50 },
});
