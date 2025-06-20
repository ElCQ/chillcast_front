import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import {useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function IntroScreen() {
    const router = useRouter();

    const items = [
        {
            id: 1,
            element: (
                <Image
                    source={require('@/assets/images/Logo.png')}
                    className="w-40 h-40 mb-10"
                    resizeMode="contain"
                />
            ),
        },
        {
            id: 2,
            element: (
                <Text className="font-inter text-white text-3xl font-bold mb-6 text-center">
                    Bienvenido a Chillast
                </Text>
            ),
        },
        {
            id: 3,
            element: (
                <Text className="font-inter text-gray-400 text-base text-center mb-12">
                    Descubrí, explorá y calificá tus podcasts favoritos.
                </Text>
            ),
        },
        {
            id: 4,
            element: (
                <TouchableOpacity
                    className="bg-purple-600 py-3 px-6 rounded-full mb-4 w-full"
                    onPress={() => router.push('/(auth)/login')}
                >
                    <Text className="font-inter text-white text-center text-lg">
                        Iniciar sesión
                    </Text>
                </TouchableOpacity>
            ),
        },
        {
            id: 5,
            element: (
                <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                    <Text className="font-inter text-gray-400 text-center">
                        ¿No tenés cuenta? Registrate
                    </Text>
                </TouchableOpacity>
            ),
        },
    ];

    useEffect(() => {
        const checkLogin = async () => {
            const username = await AsyncStorage.getItem('usuario');
            const rememberMe = await AsyncStorage.getItem('rememberMe');

            if (username && rememberMe === 'true') {
                router.replace('/(tabs)/home');
            } else if (username) {
                router.replace({ pathname: '/(auth)/login', params: { username } });
            } else {
                router.replace('/(auth)/login');
            }
        };

        checkLogin();
    }, []);

    return (
        <View className="flex-1 items-center justify-center bg-background px-6">
            {items.map((item, index) => (
                <MotiView
                    key={item.id}
                    from={{ opacity: 0, translateY: -20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{
                        delay: index * 300, // delay secuencial
                        duration: 500,
                        type: 'timing',
                    }}
                >
                    {item.element}
                </MotiView>
            ))}
        </View>
    );
}

