import { View, Text, StyleSheet } from "react-native";
import Selltopbar from "./sell/Selltopbar";
import Sellmain from "./sell/Sellmain";

const Sellpage = ({ userId, setUserId ,url}) => {
  return (
    <View style={styles.container}>
      <Selltopbar url={url}/>
      <Sellmain userId={userId} setUserId={setUserId} url={url}/>
    </View>
  );
};
export default Sellpage;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2FBD4" },
});
