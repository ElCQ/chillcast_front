import { useRouter } from 'expo-router';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons'; // Asegurate de tener esto instalado

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    return (
        <View className="flex-1 bg-background px-6 justify-center">

            <View className=" bg-background px-6 justify-center items-center">
                <Image
                    source={require('@/assets/images/Logo.png')}
                    className="w-40 h-40 mb-10"
                    resizeMode="contain"
                />
            </View>

            <Text className="text-white text-3xl font-bold mb-10 text-center">Iniciar Sesión</Text>

            <TextInput
                className="bg-[#1f1f1f] text-white px-4 py-3 rounded-xl mb-6"
                placeholder="Email"
                placeholderTextColor="#888"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                className="bg-[#1f1f1f] text-white px-4 py-3 rounded-xl mb-6"
                placeholder="Contraseña"
                placeholderTextColor="#888"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            {/* Checkbox */}
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

            <TouchableOpacity className="bg-purple-600 py-3 rounded-full mb-4" onPress={() => router.push('/(tabs)/home')}>
                <Text className="text-white text-center text-lg">Ingresar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                <Text className="text-gray-400 text-center">¿No tenés cuenta? Registrate</Text>
            </TouchableOpacity>
        </View>
    );
}
