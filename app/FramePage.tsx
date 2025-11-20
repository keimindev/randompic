import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PhotoStrip from "./PhotoStrip";

const FramePage = () => {
  const [count, setCount] = useState(0);
  const onPress = () => setCount((prevCount) => prevCount + 1);

  return (
    <SafeAreaView>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View>
          <Text style={styles.question}>Step 2</Text>
        </View>
        <View style={styles.container}>
          <TouchableOpacity onPress={onPress}>
            <PhotoStrip />
          </TouchableOpacity>
          <TouchableOpacity  onPress={onPress}>
            <PhotoStrip frameCount={4} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FramePage;

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
});
