import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";

const API_URL = "http://192.168.133.188:5000"; // For Android Emulator, use 10.0.2.2 as localhost

const Cropyield = () => {
  const [crops, setCrops] = useState({}); // Crop mappings
  const [soilTypes, setSoilTypes] = useState({}); // Soil types
  const [climates, setClimates] = useState({}); // Climate types
  const [crop, setCrop] = useState("");
  const [soil, setSoil] = useState("");
  const [climate, setClimate] = useState("");
  const [pH, setPH] = useState("");
  const [nitrogen, setNitrogen] = useState("");
  const [phosphorus, setPhosphorus] = useState("");
  const [potassium, setPotassium] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [predictedYield, setPredictedYield] = useState(null);
  const [yieldPercentage, setYieldPercentage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch mappings for crops, soil, and climate types
  useEffect(() => {
    const fetchMappings = async () => {
      try {
        const response = await axios.get(`${API_URL}/mappings`);
        setCrops(response.data.Crop_mapping || {});
        setSoilTypes(response.data.Soil_mapping || {});
        setClimates(response.data.Climate_mapping || {});
      } catch (error) {
        console.log("Error fetching mappings:", error.message);
        Alert.alert("Error", `Failed to fetch mappings: ${error.message}`);
      }
    };
    fetchMappings();
  }, []);

  const handlePrediction = async () => {
    if (
      !crop ||
      !soil ||
      !climate ||
      !pH ||
      !nitrogen ||
      !phosphorus ||
      !potassium ||
      !temperature ||
      !humidity ||
      !rainfall
    ) {
      Alert.alert("Error", "Please fill in all the fields.");
      return;
    }

    const numericFields = [
      pH,
      nitrogen,
      phosphorus,
      potassium,
      temperature,
      humidity,
      rainfall,
    ];
    for (let field of numericFields) {
      if (isNaN(field) || field < 0) {
        Alert.alert(
          "Error",
          "Please enter valid positive numbers for all numeric fields."
        );
        return;
      }
    }

    const cropEncoded = crops[crop];
    const soilEncoded = soilTypes[soil];
    const climateEncoded = climates[climate];

    if (
      cropEncoded === undefined ||
      soilEncoded === undefined ||
      climateEncoded === undefined
    ) {
      Alert.alert("Error", "Invalid selections for crop, soil, or climate.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/predict`, {
        Crop_Type: cropEncoded,
        Soil_Type: soilEncoded,
        Climate: climateEncoded,
        pH: parseFloat(pH),
        Nitrogen: parseFloat(nitrogen),
        Phosphorus: parseFloat(phosphorus),
        Potassium: parseFloat(potassium),
        Temperature: parseFloat(temperature),
        Humidity: parseFloat(humidity),
        Rainfall: parseFloat(rainfall),
      });

      if (
        response.data.predicted_yield !== undefined &&
        response.data.yield_percentage !== undefined
      ) {
        setPredictedYield(response.data.predicted_yield);
        setYieldPercentage(response.data.yield_percentage);
        setCrop("");
        setSoil("");
        setClimate("");
        setPH("");
        setNitrogen("");
        setPhosphorus("");
        setPotassium("");
        setTemperature("");
        setHumidity("");
        setRainfall("");
      } else {
        throw new Error("Invalid response from the server");
      }
    } catch (error) {
      Alert.alert(
        "Error",
        `Prediction failed. Please try again: ${error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Crop Yield Prediction</Text>
        <Text style={styles.label}>Crop Type</Text>
        <Picker
          selectedValue={crop}
          onValueChange={setCrop}
          style={styles.picker}
        >
          <Picker.Item label="Select a Crop" value="" />
          {Object.entries(crops).map(([key, value]) => (
            <Picker.Item label={key} value={key} key={key} />
          ))}
        </Picker>

        <Text style={styles.label}>Soil Type</Text>
        <Picker
          selectedValue={soil}
          onValueChange={setSoil}
          style={styles.picker}
        >
          <Picker.Item label="Select a Soil Type" value="" />
          {Object.entries(soilTypes).map(([key, value]) => (
            <Picker.Item label={key} value={key} key={key} />
          ))}
        </Picker>

        <Text style={styles.label}>Climate</Text>
        <Picker
          selectedValue={climate}
          onValueChange={setClimate}
          style={styles.picker}
        >
          <Picker.Item label="Select Climate" value="" />
          {Object.entries(climates).map(([key, value]) => (
            <Picker.Item label={key} value={key} key={key} />
          ))}
        </Picker>

        <TextInput
          style={styles.input}
          value={pH}
          onChangeText={setPH}
          keyboardType="numeric"
          placeholder="pH"
        />
        <TextInput
          style={styles.input}
          value={nitrogen}
          onChangeText={setNitrogen}
          keyboardType="numeric"
          placeholder="Nitrogen"
        />
        <TextInput
          style={styles.input}
          value={phosphorus}
          onChangeText={setPhosphorus}
          keyboardType="numeric"
          placeholder="Phosphorus"
        />
        <TextInput
          style={styles.input}
          value={potassium}
          onChangeText={setPotassium}
          keyboardType="numeric"
          placeholder="Potassium"
        />
        <TextInput
          style={styles.input}
          value={temperature}
          onChangeText={setTemperature}
          keyboardType="numeric"
          placeholder="Temperature"
        />
        <TextInput
          style={styles.input}
          value={humidity}
          onChangeText={setHumidity}
          keyboardType="numeric"
          placeholder="Humidity"
        />
        <TextInput
          style={styles.input}
          value={rainfall}
          onChangeText={setRainfall}
          keyboardType="numeric"
          placeholder="Rainfall"
        />

        <Button title="Predict" onPress={handlePrediction} disabled={loading} />

        {loading && <ActivityIndicator size="large" color="#0000ff" />}

        {predictedYield !== null && yieldPercentage !== null && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>
              Predicted Yield: {predictedYield} tons/ha
            </Text>
            <Text style={styles.resultText}>
              Yield Percentage: {yieldPercentage}%
            </Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2FBD4",marginTop:20 },
  scrollContainer: { flexGrow: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  label: { fontSize: 16, marginVertical: 10 },
  picker: { height: 50, width: "100%" },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
  resultText: { fontSize: 16, fontWeight: "bold" },
});

export default Cropyield;
