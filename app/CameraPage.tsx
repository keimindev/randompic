import { AntDesign } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PhotoPreviewSection from "../components/PhotoPreviewSection";

export default function CameraPage() {
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<any>(null);
  const [countdown, setCountdown] = useState(0);
  const cameraRef = useRef<CameraView | null>(null);

  const mode = "threecut"; // threecut | fourcut
  const aspect = mode === "threecut" ? 4 / 3 : 3 / 4;

  if (!permission) {
    // Camera permissions are still loading.
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
    setCountdown(10); // 카운트다운 시작

    let time = 10;

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
    }
  };

  const handleRetakePhoto = () => setPhoto(null);

  if (photo)
    return (
      <PhotoPreviewSection
        photo={photo}
        handleRetakePhoto={handleRetakePhoto}
      />
    );

  return (
    <View style={styles.container}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
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
