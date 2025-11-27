import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PhotoStrip from "./PhotoStrip";

const FramePage = () => {
  const { filter } = useLocalSearchParams<{ filter: string }>();
  const onPress = () => {
    router.push("/CameraPage");
  };

  const handlePressReturnBtn = () => {
    router.back();
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center",}}>
      <View style={{ paddingTop: 30, paddingLeft: 30 }}>
        <TouchableOpacity onPress={handlePressReturnBtn}>
        <Ionicons name="return-up-back" size={45} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1,}}>
      <View style={{ paddingTop: 100 }}>
        <Text style={styles.question}>Step 2</Text>
      </View>
      <View style={styles.container}>
        <TouchableOpacity onPress={onPress}>
          <PhotoStrip frameCount={3} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress}>
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
    marginBottom: 40,
    color: "#000000",
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
});
