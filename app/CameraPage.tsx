import { useAppContext } from "@/context/AppContext";
import { AntDesign } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CameraPage() {
  const { state, dispatch } = useAppContext();
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<any>(null);
  const [countdown, setCountdown] = useState(0);
  const cameraRef = useRef<CameraView | null>(null);

  const mode = state.cutCount;
  const aspect = mode === 3 ? 4 / 3 : 3 / 4;


  useEffect(() => {
    if (state.photos.length === 4) {
      router.push("/PhotoFrame");
    }
  }, [state.photos.length]);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const handleTakePhoto = async () => {
    setCountdown(3); // 카운트다운 시작

    let time = 3;

    const timer = setInterval(() => {
      time -= 1;
      setCountdown(time);

      if (time === 0) {
        clearInterval(timer);
        takePhoto();
      }
    }, 1000);
  };

  const takePhoto = async () => {
    if (cameraRef.current) {
      const options = {
        quality: 1,
        base64: true,
        exif: false,
      };
      const takedPhoto = await cameraRef.current.takePictureAsync(options);

      setPhoto(takedPhoto);
      dispatch({ type: "SET_PHOTOS", payload: [takedPhoto.uri] }); // 사진 URI를 컨텍스트에 저장
    }
  };

  const handlePressReturnBtn = () => {
    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View style={{ paddingTop: 5, paddingLeft: 20 }}>
        <TouchableOpacity onPress={handlePressReturnBtn}>
          <Ionicons name="return-up-back" size={32} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={{ marginTop: 20, fontSize: 18 }}>
          현재 촬영된 사진 수: {state.photos.length} / 6
        </Text>
        <CameraView
          style={[styles.camera, { aspectRatio: aspect }]}
          facing={"front"}
          mirror={true}
          ref={cameraRef}
        >
          {countdown > 0 && (
            <View style={styles.countdownContainer}>
              <Text style={styles.countdownText}>{countdown}</Text>
            </View>
          )}
        </CameraView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
            <AntDesign name="camera" size={44} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "95%",
    justifyContent: "center",
  },
  camera: {
    aspectRatio: 3 / 4,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  button: {
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "gray",
    borderRadius: 50,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  countdownContainer: {
    position: "absolute",
    top: "40%",
    alignSelf: "center",
  },
  countdownText: {
    fontSize: 80,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
});
