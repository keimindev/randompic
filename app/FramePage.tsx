import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

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
          <TouchableOpacity style={styles.randombox} onPress={onPress}>
            <Text style={styles.text}>3 frames</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.randombox} onPress={onPress}>
            <Text style={styles.text}>4 frames</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default FramePage


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
