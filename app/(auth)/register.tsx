import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    Keyboard,
    KeyboardAvoidingView, Platform,
    ScrollView,
    Text, TextInput, TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import Toast from 'react-native-toast-message';

export default function RegisterScreen() {
    const router = useRouter();
    const [nombre, setNombre] = useState('');
    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    const [errors, setErrors] = useState({
        nombre: false, usuario: false, email: false, password: false, confirm: false,
    });

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    const handleContinue = async () => {
        const camposIncompletos = {
            nombre: !nombre,
            usuario: !usuario,
            email: !email,
            password: !password,
            confirm: !confirm,
        };
        const contraseñasNoCoinciden = confirm !== password;

        setErrors({
            ...camposIncompletos,
            confirm: camposIncompletos.confirm || contraseñasNoCoinciden,
        });

        const hayCamposInvalidos = Object.values(camposIncompletos).some(Boolean) || contraseñasNoCoinciden;

        if (hayCamposInvalidos) {
            Toast.show({
                type: 'error',
                text1: 'Error en el formulario',
                text2: contraseñasNoCoinciden ? 'Las contraseñas no coinciden' : 'Completá todos los campos',
            });
            return;
        }

        try {
            const response = await fetch('https://chillcast-backend.onrender.com/api/v1/auth/register-user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: usuario,
                    email: email,
                    password: password,
                    nombre: nombre,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                const mensajeError = data?.error || 'Ocurrió un error inesperado';
                Toast.show({
                    type: 'error',
                    text1: 'Error al registrarse',
                    text2: mensajeError,
                });
                return;
            }

            // Guardar username para usar después (géneros)
            await AsyncStorage.setItem('usuario', usuario);
            await AsyncStorage.setItem("username", email);

            router.push('/(auth)/generosIniciales');
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error de red',
                text2: 'No se pudo conectar con el servidor',
            });
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: keyboardVisible ? 'flex-start' : 'center',
                    }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View className="bg-background px-6">
                        <Text className="text-white text-3xl font-bold mb-10 text-center font-inter">Crear Cuenta</Text>

                        <TextInput
                            className={`bg-[#1f1f1f] text-white px-4 py-3 rounded-xl mb-6 font-inter border ${errors.nombre ? 'border-red-400' : 'border-transparent'}`}
                            placeholder="Nombre y Apellido"
                            placeholderTextColor="#888"
                            value={nombre}
                            onChangeText={(text) => {
                                setNombre(text);
                                if (text) setErrors((e) => ({ ...e, nombre: false }));
                            }}
                        />

                        <TextInput
                            className={`bg-[#1f1f1f] text-white px-4 py-3 rounded-xl mb-6 font-inter border ${errors.usuario ? 'border-red-400' : 'border-transparent'}`}
                            placeholder="Usuario"
                            placeholderTextColor="#888"
                            value={usuario}
                            onChangeText={(text) => {
                                setUsuario(text);
                                if (text) setErrors((e) => ({ ...e, usuario: false }));
                            }}
                        />

                        <TextInput
                            className={`bg-[#1f1f1f] text-white px-4 py-3 rounded-xl mb-6 font-inter border ${errors.email ? 'border-red-400' : 'border-transparent'}`}
                            placeholder="Email"
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
                            className={`bg-[#1f1f1f] text-white px-4 py-3 rounded-xl mb-6 font-inter border ${errors.password ? 'border-red-400' : 'border-transparent'}`}
                            placeholder="Contraseña"
                            placeholderTextColor="#888"
                            value={password}
                            onChangeText={(text) => {
                                setPassword(text);
                                if (text) setErrors((e) => ({ ...e, password: false }));
                            }}
                            secureTextEntry
                        />

                        <TextInput
                            className={`bg-[#1f1f1f] text-white px-4 py-3 rounded-xl mb-6 font-inter border ${errors.confirm ? 'border-red-400' : 'border-transparent'}`}
                            placeholder="Confirmar contraseña"
                            placeholderTextColor="#888"
                            value={confirm}
                            onChangeText={(text) => {
                                setConfirm(text);
                                if (text === password) setErrors((e) => ({ ...e, confirm: false }));
                            }}
                            secureTextEntry
                        />

                        <TouchableOpacity className="bg-purple-600 py-3 rounded-full mb-6" onPress={handleContinue}>
                            <Text className="text-white text-center text-lg font-inter">Continuar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => router.back()}>
                            <Text className="text-gray-400 text-center font-inter">¿Ya tenés cuenta? Iniciá sesión</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}
