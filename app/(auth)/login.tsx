import { useRouter } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity, Image ,Alert} from 'react-native';
import { useState, useEffect} from 'react';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState({ email: false, password: false });

    const handleLogin = async () => {
        const newErrors = {
            email: !email,
            password: !password,
        };

        setErrors(newErrors);
        const hasError = Object.values(newErrors).some(Boolean);
        if (hasError) return;

        try {
            const response = await fetch('https://TU_BACKEND/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.status === 401) {
                // Error de credenciales
                Alert.alert('Error', 'Usuario o contraseña incorrectos');
                return;
            }

            const data = await response.json();

            if (data.username) {
                // Guardar email si está tildado
                if (rememberMe) {
                    await AsyncStorage.setItem('userEmail', email);
                } else {
                    await AsyncStorage.removeItem('userEmail');
                }

                // Redirigir
                router.push('/(tabs)/home');
            } else {
                Alert.alert('Error', 'Login inválido');
            }
        } catch (error) {
            Alert.alert('Error', 'No se pudo conectar al servidor');
            console.error(error);
        }
    };

    useEffect(() => {
        const loadRememberedEmail = async () => {
            const storedEmail = await AsyncStorage.getItem('userEmail');
            if (storedEmail) {
                setEmail(storedEmail);
                setRememberMe(true);
            }
        };

        loadRememberedEmail();
    }, []);

    return (
        <View className="flex-1 bg-background px-6 justify-center">
            <View className="bg-background px-6 justify-center items-center">
                <Image
                    source={require('@/assets/images/Logo.png')}
                    className="w-40 h-40 mb-10"
                    resizeMode="contain"
                />
            </View>

            <Text className="text-white text-3xl font-bold mb-10 text-center font-inter">
                Iniciar Sesión
            </Text>

            <TextInput
                className={`bg-[#1f1f1f] text-white px-4 py-3 rounded-xl mb-6 font-inter border ${
                    errors.email ? 'border-red-400' : 'border-transparent'
                }`}
                placeholder="Usuario o Email"
                placeholderTextColor="#888"
                value={email}
                onChangeText={(text) => {
                    setEmail(text);
                    if (text) setErrors((e) => ({ ...e, email: false }));
                }}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                className={`bg-[#1f1f1f] text-white px-4 py-3 rounded-xl mb-6 font-inter border ${
                    errors.password ? 'border-red-400' : 'border-transparent'
                }`}
                placeholder="Contraseña"
                placeholderTextColor="#888"
                value={password}
                onChangeText={(text) => {
                    setPassword(text);
                    if (text) setErrors((e) => ({ ...e, password: false }));
                }}
                secureTextEntry
            />

            <View className="flex-row justify-between items-center mb-10">
                <TouchableOpacity
                    onPress={() => setRememberMe(!rememberMe)}
                    className="flex-row items-center"
                >
                    <Ionicons
                        name={rememberMe ? 'checkbox-outline' : 'square-outline'}
                        size={24}
                        color="#aaa"
                    />
                    <Text className="font-inter text-gray-400 ml-2">Recordarme</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => alert('Recuperar contraseña')}>
                    <Text className="font-inter text-purple-400 text-sm">¿Olvidaste tu contraseña?</Text>
                </TouchableOpacity>
            </View>

            {(errors.email || errors.password) && (
                <Text className="text-red-400 text-center mb-4 font-inter">
                    Completá todos los campos obligatorios
                </Text>
            )}

            <TouchableOpacity className="bg-purple-600 py-3 rounded-full mb-4" onPress={handleLogin}>
                <Text className="text-white text-center text-lg font-inter">Ingresar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                <Text className="text-gray-400 text-center font-inter">¿No tenés cuenta? Registrate</Text>
            </TouchableOpacity>
        </View>
    );
}

