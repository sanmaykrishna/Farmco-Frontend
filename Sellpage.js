import { View, Text, StyleSheet } from "react-native";
import Selltopbar from "./sell/Selltopbar";
import Sellmain from "./sell/Sellmain";
import { useState } from "react";
import ViewcollabTopbar from "./sell/ViewcollabTopbar";
import CollabLoc from "./sell/CollabLoc";
const Sellpage = ({ userId, setUserId, url, navigation, setNavigation,collabcity,setCollabcity }) => {
  const [topbar, setTopbar] = useState("main");
  const [searchcollab, setSearchcollab] = useState("");
  const [collablocation, setCollabLocation] = useState(1);

  const [showSellItem, setShowSellItem] = useState(0);

  return (
    <View style={styles.container}>
      {collablocation == 1 ? (
        <>
          {topbar == "main" ? (
            <Selltopbar url={url} />
          ) : topbar == "view" ? (
            <ViewcollabTopbar
              search={searchcollab}
              setCollabseach={setCollabLocation}
              setNavigation={setNavigation}
              url={url}
              city={collabcity}
              setCollabLocation={setCollabLocation}
              showSellItem={showSellItem}
              setShowSellItem={setShowSellItem}
            />
          ) : null}

          <Sellmain
            city={collabcity}
            setCollabcity={setCollabcity}
            search={searchcollab}
            setSearchcollab={setSearchcollab}
            userId={userId}
            setUserId={setUserId}
            url={url}
            navigation={navigation}
            setNavigation={setNavigation}
            setTopbar={setTopbar}
            setCollabLocation={setCollabLocation}
            showSellItem={showSellItem}
            setShowSellItem={setShowSellItem}
          />
        </>
      ) : (
        <CollabLoc
          setCollabcity={setCollabcity}
          setCollabLocation={setCollabLocation}
          url={url}
          city={collabcity}
        />
      )}
    </View>
  );
};
export default Sellpage;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2FBD4" },
});
