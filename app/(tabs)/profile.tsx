// app/(tabs)/profile.tsx

import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Profile = () => {
  const router = useRouter();


  const handleLogout = async () => {
    const rememberMe = await AsyncStorage.getItem('rememberMe');
    const usuarioStr = await AsyncStorage.getItem("usuario");

    await AsyncStorage.clear();

    if (rememberMe === 'true' && usuarioStr) {
      await AsyncStorage.setItem('usuario', usuarioStr);
      await AsyncStorage.setItem('rememberMe', 'true');
    } else if (usuarioStr) {
      await AsyncStorage.setItem('usuario', usuarioStr);
    }

    router.replace('/(auth)/login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Perfil</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/profile/info")}
      >
        <View style={styles.buttonLeft}>
          <Ionicons name="person-outline" size={22} color="white" />
          <Text style={styles.buttonText}>Datos de Usuario</Text>
        </View>
        <Ionicons name="chevron-forward" size={22} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/profile/recomendaciones")}
      >
        <View style={styles.buttonLeft}>
          <MaterialCommunityIcons name="apps" size={22} color="white" />
          <Text style={styles.buttonText}>Géneros Recomendados</Text>
        </View>
        <Ionicons name="chevron-forward" size={22} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.logout]}
        onPress={handleLogout}
      >
        <View style={styles.buttonLeft}>
          <Entypo name="log-out" size={22} color="white" />
          <Text style={styles.buttonText}>Cerrar Sesión</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1c1c1e",
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  header: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#2c2c2e",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logout: {
    backgroundColor: "#1f1f1f",
  },
  buttonLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Profile;
