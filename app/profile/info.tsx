import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

export default function InfoUsuario() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const raw = await AsyncStorage.getItem("usuario");
      if (!raw) return;
      const u = JSON.parse(raw);
      setName(u.nombre || u.name || "");
      setEmail(u.email || "");
    })();
  }, []);

  const guardarCambios = async () => {
    try {
      await AsyncStorage.setItem("userName", name);
      await AsyncStorage.setItem("userEmail", email);
      Toast.show({
        type: "success",
        text1: "¡Éxito!",
        text2: "Tus cambios se guardaron correctamente",
      });
    } catch {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No pudimos guardar tus cambios.",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Datos de Usuario",
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

      <Image
        source={require("@/assets/images/default-profile.webp")}
        style={styles.image}
      />
      <Text style={styles.nameText}>{name}</Text>
      <Text style={styles.emailText}>{email}</Text>

      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        placeholderTextColor="#666"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Correo electrónico</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo"
        placeholderTextColor="#666"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={guardarCambios}>
        <Text style={styles.buttonText}>Guardar Cambios</Text>
      </TouchableOpacity>
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
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
  },
  nameText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 8,
  },
  emailText: {
    color: "#aaa",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    color: "white",
    fontWeight: "bold",
    marginTop: 12,
  },
  input: {
    backgroundColor: "#2c2c2e",
    color: "white",
    padding: 12,
    borderRadius: 8,
    marginTop: 6,
  },
  button: {
    backgroundColor: "#B347FB",
    padding: 14,
    borderRadius: 10,
    marginTop: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
