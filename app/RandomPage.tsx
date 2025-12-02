import { useAppContext } from "@/context/AppContext";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const RandomPage = () => {
  const { dispatch } = useAppContext();
  
  const handlePressButton = (value: "normal" | "random") => {
    dispatch({ type: "SET_MODE", payload: value })
    router.push(`/FramePage`);
  };

  return (
    <SafeAreaView>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View>
          <Text style={styles.question}>Step 1</Text>
        </View>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.randombox}
            onPress={() => handlePressButton("random")}
          >
            <Text style={styles.text}>Random</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.randombox}
            onPress={() => handlePressButton("normal")}
          >
            <Text style={styles.text}>Be Yourself</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RandomPage;

const styles = StyleSheet.create({
  question: {
    fontSize: 38,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: -120,
    marginBottom: 50,
    color: "#000000",
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  randombox: {
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DDDDDD",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: "blue",
  },
});
