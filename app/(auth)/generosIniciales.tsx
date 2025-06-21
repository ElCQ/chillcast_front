import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Animated,
    ScrollView,
    Text,
    TouchableOpacity
} from 'react-native';
import Loader from '@/components/loader';

const GENRES = [
    'Noticias', 'Politica', 'Economia', 'Comedia', 'Educativo',
    'Idiomas', 'Ciencias', 'Historia', 'Psicología', 'Tecnología',
    'Cultura y sociedad', 'Salud y bienestar', 'Negocios', 'Cine y TV',
    'Música', 'Deportes', 'Crímenes reales', 'Terror y Suspenso', 'Ficción'
];

export default function WelcomeScreen() {
    const router = useRouter();
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [error, setError] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, []);

    const toggleGenre = (genre: string) => {
        setSelectedGenres((prev) => {
            setError(false);
            if (prev.includes(genre)) {
                return prev.filter((g) => g !== genre);
            } else if (prev.length < 10) {
                return [...prev, genre];
            } else {
                return prev;
            }
        });
    };

    const updateUserGenres = async (omit = false) => {
        setLoading(true);
        try {
            const usuarioStr = await AsyncStorage.getItem("usuario");
            const usuario = usuarioStr ? JSON.parse(usuarioStr) : null;
            if (!usuario?.username) throw new Error("No username found");
            const savedUsername = usuario?.username;

            const response = await fetch(
                `https://chillcast-backend.onrender.com/api/v1/auth/edit-user?username=${encodeURIComponent(savedUsername)}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ generos: omit ? [] : selectedGenres }),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al actualizar géneros');
            }

            router.push('/(tabs)/home');
        } catch (err: any) {
            Alert.alert('Error', err.message);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <>
        <Animated.View
            style={{ flex: 1, opacity: fadeAnim }}
            className="bg-background px-6 pt-20 pb-20"
        >
            <Text className="text-white text-3xl font-bold mb-2 text-center">Bienvenido!</Text>
            <Text className="text-white mb-10 text-center text-sm">
                Elegí los géneros que te interesan (máximo 10)
            </Text>

            <ScrollView
                contentContainerStyle={{ flexWrap: 'wrap', flexDirection: 'row' }}
                className="mb-6"
                showsVerticalScrollIndicator={false}
            >
                {GENRES.map((genre) => {
                    const isSelected = selectedGenres.includes(genre);
                    return (
                        <TouchableOpacity
                            key={genre}
                            onPress={() => toggleGenre(genre)}
                            className={`px-4 py-2 rounded-full border mb-2 mr-2 ${
                                isSelected ? 'bg-purple-600 border-purple-600' : 'border-white'
                            }`}
                        >
                            <Text className="text-white">{genre}</Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>

            {error && (
                <Text className="text-red-400 text-center mb-4 font-inter">
                    Debe seleccionar al menos un género
                </Text>
            )}

            <TouchableOpacity
                onPress={() => {
                    if (selectedGenres.length === 0) {
                        setError(true);
                        return;
                    }
                    updateUserGenres();
                }}
                className="bg-purple-600 py-3 rounded-full mb-4"
            >
                <Text className="text-white text-center font-semibold">Finalizar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => updateUserGenres(true)}>
                <Text className="text-gray-400 text-center font-inter">Omitir</Text>
            </TouchableOpacity>
        </Animated.View>
            <Loader visible={loading} />
        </>
    );
}
