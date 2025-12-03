import { useAppContext } from "@/context/AppContext";
import { Image, StyleSheet, Text, View } from "react-native";

export default function PhotoStrip({ frameCount = 3 }) {
  const { state } = useAppContext();

  return (
    <>
      {state.cutCount === 3 ? (
        state.photos.length === 0 ? (
          <View style={styles.strip}>
            {Array.from({ length: frameCount }).map((_, i) => (
              <View key={i} style={styles.photoFrame} />
            ))}
            <Text style={styles.footerText}>{new Date().toDateString()}</Text>
          </View>
        ) : (
          <View>
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
        )
      ) : state.photos.length === 0 ? (
        <View style={styles.fourStrip}>
          {Array.from({ length: frameCount }).map((_, i) => (
            <View key={i} style={styles.fourPhotoFrame} />
          ))}
          <View style={{ width: "100%", alignItems: "center" }}>
            <Text style={styles.footerText}>{new Date().toDateString()}</Text>
          </View>
        </View>
      ) : (
        <View>
          {state.photos.map((photo, i) => (
            <View key={i} style={styles.fourPhotoFrame}>
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
      )}
    </>
  );
}
const styles = StyleSheet.create({
  strip: {
    width: 150, // 너비 (원하는 크기 조정)
    backgroundColor: "#000",
    padding: 20,
    borderRadius: 4,
    alignItems: "center",
  },
  fourStrip: {
    width: 200,
    height: 380,
    backgroundColor: "#000",
    padding: 18,
    borderRadius: 4,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  photoFrame: {
    width: "100%",
    aspectRatio: 1.2, // 사진 프레임 비율 (1:1.2 정도)
    backgroundColor: "#fff",
    marginBottom: 12,
  },
  fourPhotoFrame: {
    width: "48%", // 2개 들어가도록
    aspectRatio: 0.6,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  photo: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  footerText: {
    color: "#E8BE7B",
    marginTop: 4,
    fontSize: 14,
  },
});
