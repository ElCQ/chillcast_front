import { Stack, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Recomendaciones() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Géneros Recomendados",
          headerStyle: { backgroundColor: "#1c1c1e" },
          headerTintColor: "#B347FB",
          headerTitleStyle: { fontWeight: "bold", color: "white" },
          headerBackVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Text style={styles.text}>Aquí irán los géneros recomendados.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    marginLeft: 4,
    padding: 8,
  },
  backArrow: {
    color: "white", 
    fontSize: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#1c1c1e",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  text: {
    color: "white",
    fontSize: 16,
  },
});
