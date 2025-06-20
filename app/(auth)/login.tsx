import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    Alert,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import Toast from 'react-native-toast-message';

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState({ email: false, password: false });
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const showSub = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
        const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);

    const handleLogin = async () => {
        const newErrors = {
            email: !email,
            password: !password,
        };

        setErrors(newErrors);
        const hasError = Object.values(newErrors).some(Boolean);
        if (hasError) return;

        try {
            const response = await fetch('https://chillcast-backend.onrender.com/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: email,
                    password: password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                Toast.show({
                    type: 'error',
                    text1: 'Login inválido',
                    text2: 'Usuario o contraseña incorrectos',
                });
                return;
            }

            if (data.user && data.user.length > 0) {
                const usuario = data.user[0];
                if (rememberMe) {
                    await AsyncStorage.setItem('userEmail', email);
                    await AsyncStorage.setItem("username", email);
                } else {
                    await AsyncStorage.removeItem('userEmail');
                    await AsyncStorage.removeItem("username");

                }
                await AsyncStorage.setItem('usuario', JSON.stringify(usuario));
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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View className={`flex-1 bg-background px-6 ${keyboardVisible ? 'pt-10' : 'justify-center'}`}>
                        <View className="items-center mb-10">
                            <Image
                                source={require('@/assets/images/Logo.png')}
                                className="w-40 h-40"
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
                                <Text className="font-inter text-purple-400 text-sm">
                                    ¿Olvidaste tu contraseña?
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {(errors.email || errors.password) && (
                            <Text className="text-red-400 text-center mb-4 font-inter">
                                Completá todos los campos obligatorios
                            </Text>
                        )}

                        <TouchableOpacity
                            className="bg-purple-600 py-3 rounded-full mb-4"
                            onPress={handleLogin}
                        >
                            <Text className="text-white text-center text-lg font-inter">Ingresar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                            <Text className="text-gray-400 text-center font-inter">
                                ¿No tenés cuenta? Registrate
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

