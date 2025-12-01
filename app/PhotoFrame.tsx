import { useAppContext } from "@/context/AppContext";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PhotoFrame = () => {
  const { state, dispatch } = useAppContext();
  const handleSaveBtn = () => {
    // Save button logic here
  };

  const handleShareBtn = () => {
    // Share button logic here
  };

  const handleHomeBtn = () => {
    // Home button logic here
  };
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={styles.strip}>
        {state.photos.map((photo, i) => (
          <View key={i} style={styles.photoFrame}>
            <Image
              key={i}
              style={styles.photo}
              source={{
                uri: photo,
              }}
            />
          </View>
        ))}
        <Text style={styles.footerText}>{new Date().toDateString()}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSaveBtn}>
          <Feather name="save" size={35} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShareBtn}>
          <Ionicons name="share-social-outline" size={35} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleHomeBtn}>
          <Feather name="home" size={35} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PhotoFrame;
const styles = StyleSheet.create({
  strip: {
    width: 200, // 너비 (원하는 크기 조정)
    backgroundColor: "#000",
    padding: 20,
    borderRadius: 4,
    alignItems: "center",
  },
  photo: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  photoFrame: {
    width: "100%",
    aspectRatio: 1.2, // 사진 프레임 비율 (1:1.2 정도)
    backgroundColor: "#fff",
    marginBottom: 12,
  },
  footerText: {
    color: "#E8BE7B",
    marginTop: 4,
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50,
    gap: 40
  },
});
