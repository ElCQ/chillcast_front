import { useRouter } from 'expo-router';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import { useState } from 'react';

export default function RegisterScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');

    return (
        <View className="flex-1 bg-background px-6 justify-center">

            <View className=" bg-background px-6 justify-center items-center">
                <Image
                    source={require('@/assets/images/Logo.png')}
                    className="w-40 h-40 mb-10"
                    resizeMode="contain"
                />
            </View>

            <Text className="text-white text-3xl font-bold mb-10 text-center">Crear Cuenta</Text>

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
            <TextInput
                className="bg-[#1f1f1f] text-white px-4 py-3 rounded-xl mb-10"
                placeholder="Confirmar contraseña"
                placeholderTextColor="#888"
                value={confirm}
                onChangeText={setConfirm}
                secureTextEntry
            />

            <TouchableOpacity className="bg-purple-600 py-3 rounded-full mb-6" onPress={() => router.push('/(auth)/generosIniciales')}>
                <Text className="text-white text-center text-lg">Registrarse</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.back()}>
                <Text className="text-gray-400 text-center">¿Ya tenés cuenta? Iniciá sesión</Text>
            </TouchableOpacity>
        </View>
    );
}
