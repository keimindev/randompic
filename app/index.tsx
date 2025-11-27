import { View } from "react-native";
import RandomPage from "./RandomPage";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <RandomPage />
    </View>
  );
}
