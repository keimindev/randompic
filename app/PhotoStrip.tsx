import { StyleSheet, Text, View } from "react-native";

export default function PhotoStrip({ frameCount = 3 }) {
  return (
    <>
      {" "}
      {frameCount === 3 ? (
        <>
          <View style={styles.strip}>
            {Array.from({ length: frameCount }).map((_, i) => (
              <View key={i} style={styles.photoFrame} />
            ))}
            <Text style={styles.footerText}>{new Date().toDateString()}</Text>
          </View>
        </>
      ) : (
        <>
          <View style={styles.fourStrip}>
            {Array.from({ length: frameCount }).map((_, i) => (
              <View key={i} style={styles.fourPhotoFrame} />
            ))}
            <View style={{ width: '100%', alignItems: 'center' }}>
            <Text style={styles.footerText}>{new Date().toDateString()}</Text>
            </View>
          </View>
        </>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  strip: {
    width: 150, // 너비 (원하는 크기 조정)
    backgroundColor: "#000",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
  },
fourStrip: {
    width: 200,
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: "center",
  },
  photoFrame: {
    width: "100%",
    aspectRatio: 1.2, // 사진 프레임 비율 (1:1.2 정도)
    backgroundColor: "#fff",
    marginBottom: 12,
  },
  fourPhotoFrame: {
    width: '48%', // 2개 들어가도록
    height: '100%',
    aspectRatio: 0.6,
    backgroundColor: '#fff',
    marginBottom: 10,
  },

  footerText: {
    color: "#E8BE7B",
    marginTop: 4,
    fontSize: 14,
  },
});
