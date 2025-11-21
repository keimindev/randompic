import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CameraPage() {
  const [isPermittedCamera, setIsPermittedCamera] = useState(false);
  const getCameraPermission = async () => {
    MediaLibrary.requestPermissionsAsync();
    const cameraPermission = await Camera.requestMicrophonePermissionsAsync();
    setIsPermittedCamera(cameraPermission.status === "granted");
  };

  useEffect(() => {
    getCameraPermission();
  }, []);
  return (
    <SafeAreaView>
      {!isPermittedCamera ? (
        <Text>카메라 권한이 없습니다.</Text>
      ) : (
        <Text>카메라 권한이 있습니다.</Text>
      )}
    </SafeAreaView>
  );
}
