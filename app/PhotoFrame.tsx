import { useAppContext } from "@/context/AppContext";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as MediaLibrary from "expo-media-library";
import { router } from "expo-router";
import { useRef } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ViewShot, { captureRef } from "react-native-view-shot";
import PhotoStrip from "./PhotoStrip";

const PhotoFrame = () => {
  const { state, dispatch } = useAppContext();
  const viewShotRef = useRef<ViewShot>(null);

  const handleSaveBtn = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync(true);

      if (status !== "granted") {
        alert("갤러리 접근 권한이 필요합니다.");
        return;
      }
      const uri = await captureRef(viewShotRef, {
        format: "jpg",
        width: 720,
        quality: 0.85,
      });

      if (!uri) return;

      await MediaLibrary.saveToLibraryAsync(uri);
      alert("사진이 앨범에 저장되었습니다!");
    } catch (err) {
      console.log("Save Error:", err);
    }
  };

  const handleShareBtn = () => {
    // Share button logic here
  };

  const handleHomeBtn = () => {
    dispatch({ type: "RESET" });
    router.push("/");
  };

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ViewShot ref={viewShotRef} options={{ format: "jpg", quality: 0.9 }}>
        <View style={{ alignItems: "center" }}>
          <PhotoStrip frameCount={state.cutCount} />
        </View>
      </ViewShot>
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
  fourStrip: {
    width: 200,
    backgroundColor: "#000",
    padding: 20,
    borderRadius: 4,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
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
    gap: 40,
  },
});
