import { View } from "react-native";
import CameraPage from "./CameraPage";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <CameraPage />
    </View>
  );
}
