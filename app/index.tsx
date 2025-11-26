import { View } from "react-native";
import PhotoFrame from "./PhotoFrame";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <PhotoFrame />
    </View>
  );
}
